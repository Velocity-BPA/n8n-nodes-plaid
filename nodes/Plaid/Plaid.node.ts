/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type {
	IExecuteFunctions,
	IDataObject,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';

import { plaidApiRequest, plaidApiRequestAllItems, formatTransferDescription, logLicensingNotice } from './GenericFunctions';

// Log licensing notice once on module load
logLicensingNotice();

// Import descriptions
import { accountOperations, accountFields } from './descriptions/AccountDescription';
import { itemOperations, itemFields } from './descriptions/ItemDescription';
import { transactionOperations, transactionFields } from './descriptions/TransactionDescription';
import { linkTokenOperations, linkTokenFields } from './descriptions/LinkTokenDescription';
import { transferAuthorizationOperations, transferAuthorizationFields } from './descriptions/TransferAuthorizationDescription';
import { transferOperations, transferFields } from './descriptions/TransferDescription';
import { transferEventOperations, transferEventFields } from './descriptions/TransferEventDescription';
import { recurringTransferOperations, recurringTransferFields } from './descriptions/RecurringTransferDescription';
import { transferSweepOperations, transferSweepFields } from './descriptions/TransferSweepDescription';
import { transferRefundOperations, transferRefundFields } from './descriptions/TransferRefundDescription';
import { transferLedgerOperations, transferLedgerFields } from './descriptions/TransferLedgerDescription';
import { transferCapabilitiesOperations, transferCapabilitiesFields } from './descriptions/TransferCapabilitiesDescription';
import { transferConfigurationOperations, transferConfigurationFields } from './descriptions/TransferConfigurationDescription';
import { originatorOperations, originatorFields } from './descriptions/OriginatorDescription';

export class Plaid implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Plaid',
		name: 'plaid',
		icon: 'file:plaid.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Plaid API for banking data and transfers',
		defaults: {
			name: 'Plaid',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'plaidApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Account',
						value: 'account',
						description: 'Get account information and balances',
					},
					{
						name: 'Item',
						value: 'item',
						description: 'Manage Plaid Items (linked bank connections)',
					},
					{
						name: 'Link Token',
						value: 'linkToken',
						description: 'Create and manage Link tokens',
					},
					{
						name: 'Originator',
						value: 'originator',
						description: 'Manage originators (for platforms)',
					},
					{
						name: 'Recurring Transfer',
						value: 'recurringTransfer',
						description: 'Create and manage recurring transfers',
					},
					{
						name: 'Transaction',
						value: 'transaction',
						description: 'Get transaction history',
					},
					{
						name: 'Transfer',
						value: 'transfer',
						description: 'Create and manage ACH/RTP transfers',
					},
					{
						name: 'Transfer Authorization',
						value: 'transferAuthorization',
						description: 'Create transfer authorizations (required before transfer)',
					},
					{
						name: 'Transfer Capabilities',
						value: 'transferCapabilities',
						description: 'Get transfer capabilities for an account',
					},
					{
						name: 'Transfer Configuration',
						value: 'transferConfiguration',
						description: 'Get transfer configuration settings',
					},
					{
						name: 'Transfer Event',
						value: 'transferEvent',
						description: 'List and sync transfer events',
					},
					{
						name: 'Transfer Ledger',
						value: 'transferLedger',
						description: 'Manage transfer ledger balance',
					},
					{
						name: 'Transfer Refund',
						value: 'transferRefund',
						description: 'Create and manage transfer refunds',
					},
					{
						name: 'Transfer Sweep',
						value: 'transferSweep',
						description: 'Get and list transfer sweeps',
					},
				],
				default: 'transfer',
			},
			// Account
			...accountOperations,
			...accountFields,
			// Item
			...itemOperations,
			...itemFields,
			// Transaction
			...transactionOperations,
			...transactionFields,
			// Link Token
			...linkTokenOperations,
			...linkTokenFields,
			// Transfer Authorization
			...transferAuthorizationOperations,
			...transferAuthorizationFields,
			// Transfer
			...transferOperations,
			...transferFields,
			// Transfer Event
			...transferEventOperations,
			...transferEventFields,
			// Recurring Transfer
			...recurringTransferOperations,
			...recurringTransferFields,
			// Transfer Sweep
			...transferSweepOperations,
			...transferSweepFields,
			// Transfer Refund
			...transferRefundOperations,
			...transferRefundFields,
			// Transfer Ledger
			...transferLedgerOperations,
			...transferLedgerFields,
			// Transfer Capabilities
			...transferCapabilitiesOperations,
			...transferCapabilitiesFields,
			// Transfer Configuration
			...transferConfigurationOperations,
			...transferConfigurationFields,
			// Originator
			...originatorOperations,
			...originatorFields,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		for (let i = 0; i < items.length; i++) {
			try {
				let responseData: IDataObject | IDataObject[] = {};

				// ========================================
				//           ACCOUNT
				// ========================================
				if (resource === 'account') {
					if (operation === 'getAll') {
						const accessToken = this.getNodeParameter('accessToken', i) as string;
						const accountIds = this.getNodeParameter('accountIds', i) as string;

						const body: IDataObject = { access_token: accessToken };
						if (accountIds) {
							body.options = { account_ids: accountIds.split(',').map(id => id.trim()) };
						}

						responseData = await plaidApiRequest.call(this, '/accounts/get', body);
					}

					if (operation === 'getBalance') {
						const accessToken = this.getNodeParameter('accessToken', i) as string;
						const accountIds = this.getNodeParameter('accountIds', i) as string;

						const body: IDataObject = { access_token: accessToken };
						if (accountIds) {
							body.options = { account_ids: accountIds.split(',').map(id => id.trim()) };
						}

						responseData = await plaidApiRequest.call(this, '/accounts/balance/get', body);
					}
				}

				// ========================================
				//           ITEM
				// ========================================
				if (resource === 'item') {
					if (operation === 'exchangePublicToken') {
						const publicToken = this.getNodeParameter('publicToken', i) as string;
						responseData = await plaidApiRequest.call(this, '/item/public_token/exchange', {
							public_token: publicToken,
						});
					}

					if (operation === 'get') {
						const accessToken = this.getNodeParameter('accessToken', i) as string;
						responseData = await plaidApiRequest.call(this, '/item/get', {
							access_token: accessToken,
						});
					}

					if (operation === 'remove') {
						const accessToken = this.getNodeParameter('accessToken', i) as string;
						responseData = await plaidApiRequest.call(this, '/item/remove', {
							access_token: accessToken,
						});
					}
				}

				// ========================================
				//           TRANSACTION
				// ========================================
				if (resource === 'transaction') {
					if (operation === 'get') {
						const accessToken = this.getNodeParameter('accessToken', i) as string;
						const startDate = this.getNodeParameter('startDate', i) as string;
						const endDate = this.getNodeParameter('endDate', i) as string;
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const limit = this.getNodeParameter('limit', i, 100) as number;
						const options = this.getNodeParameter('options', i, {}) as IDataObject;

						const body: IDataObject = {
							access_token: accessToken,
							start_date: startDate.split('T')[0],
							end_date: endDate.split('T')[0],
							options: {},
						};

						if (options.accountIds) {
							(body.options as IDataObject).account_ids = (options.accountIds as string).split(',').map(id => id.trim());
						}
						if (options.includeOriginalDescription) {
							(body.options as IDataObject).include_original_description = true;
						}
						if (options.includePersonalFinanceCategory) {
							(body.options as IDataObject).include_personal_finance_category = true;
						}

						if (returnAll) {
							responseData = await plaidApiRequestAllItems.call(this, '/transactions/get', body, 'transactions');
						} else {
							(body.options as IDataObject).count = limit;
							const response = await plaidApiRequest.call(this, '/transactions/get', body);
							responseData = response.transactions as IDataObject[];
						}
					}

					if (operation === 'refresh') {
						const accessToken = this.getNodeParameter('accessToken', i) as string;
						responseData = await plaidApiRequest.call(this, '/transactions/refresh', {
							access_token: accessToken,
						});
					}

					if (operation === 'sync') {
						const accessToken = this.getNodeParameter('accessToken', i) as string;
						const cursor = this.getNodeParameter('cursor', i, '') as string;
						const count = this.getNodeParameter('count', i, 100) as number;
						const options = this.getNodeParameter('options', i, {}) as IDataObject;

						const body: IDataObject = {
							access_token: accessToken,
							count,
							options: {},
						};

						if (cursor) {
							body.cursor = cursor;
						}
						if (options.includeOriginalDescription) {
							(body.options as IDataObject).include_original_description = true;
						}
						if (options.includePersonalFinanceCategory) {
							(body.options as IDataObject).include_personal_finance_category = true;
						}

						responseData = await plaidApiRequest.call(this, '/transactions/sync', body);
					}
				}

				// ========================================
				//           LINK TOKEN
				// ========================================
				if (resource === 'linkToken') {
					if (operation === 'create') {
						const clientName = this.getNodeParameter('clientName', i) as string;
						const userClientUserId = this.getNodeParameter('userClientUserId', i) as string;
						const products = this.getNodeParameter('products', i) as string[];
						const countryCodes = this.getNodeParameter('countryCodes', i) as string[];
						const language = this.getNodeParameter('language', i) as string;
						const additionalOptions = this.getNodeParameter('additionalOptions', i, {}) as IDataObject;

						const body: IDataObject = {
							client_name: clientName,
							user: { client_user_id: userClientUserId },
							products,
							country_codes: countryCodes,
							language,
						};

						if (additionalOptions.webhook) {
							body.webhook = additionalOptions.webhook;
						}
						if (additionalOptions.accessToken) {
							body.access_token = additionalOptions.accessToken;
						}
						if (additionalOptions.redirectUri) {
							body.redirect_uri = additionalOptions.redirectUri;
						}
						if (additionalOptions.androidPackageName) {
							body.android_package_name = additionalOptions.androidPackageName;
						}
						if (additionalOptions.transferIntentId) {
							body.transfer = { intent_id: additionalOptions.transferIntentId };
						}

						// User info
						if (additionalOptions.userEmail || additionalOptions.userPhoneNumber || additionalOptions.userLegalName) {
							const user = body.user as IDataObject;
							if (additionalOptions.userEmail) user.email_address = additionalOptions.userEmail;
							if (additionalOptions.userPhoneNumber) user.phone_number = additionalOptions.userPhoneNumber;
							if (additionalOptions.userLegalName) user.legal_name = additionalOptions.userLegalName;
						}

						responseData = await plaidApiRequest.call(this, '/link/token/create', body);
					}

					if (operation === 'get') {
						const linkToken = this.getNodeParameter('linkToken', i) as string;
						responseData = await plaidApiRequest.call(this, '/link/token/get', {
							link_token: linkToken,
						});
					}
				}

				// ========================================
				//        TRANSFER AUTHORIZATION
				// ========================================
				if (resource === 'transferAuthorization') {
					if (operation === 'create') {
						const accessToken = this.getNodeParameter('accessToken', i) as string;
						const accountId = this.getNodeParameter('accountId', i) as string;
						const type = this.getNodeParameter('type', i) as string;
						const network = this.getNodeParameter('network', i) as string;
						const amount = this.getNodeParameter('amount', i) as string;
						const userLegalName = this.getNodeParameter('userLegalName', i) as string;
						const additionalOptions = this.getNodeParameter('additionalOptions', i, {}) as IDataObject;

						const body: IDataObject = {
							access_token: accessToken,
							account_id: accountId,
							type,
							network,
							amount,
							user: { legal_name: userLegalName },
						};

						// ACH class for ACH networks
						if (network === 'ach' || network === 'same-day-ach') {
							body.ach_class = this.getNodeParameter('achClass', i) as string;
						}

						// User details
						const user = body.user as IDataObject;
						if (additionalOptions.userEmail) user.email_address = additionalOptions.userEmail;
						if (additionalOptions.userPhoneNumber) user.phone_number = additionalOptions.userPhoneNumber;

						// Address
						if (additionalOptions.userAddressStreet) {
							user.address = {
								street: additionalOptions.userAddressStreet,
								city: additionalOptions.userAddressCity || '',
								region: additionalOptions.userAddressRegion || '',
								postal_code: additionalOptions.userAddressPostalCode || '',
								country: additionalOptions.userAddressCountry || 'US',
							};
						}

						if (additionalOptions.originationAccountId) {
							body.origination_account_id = additionalOptions.originationAccountId;
						}
						if (additionalOptions.isoCurrencyCode) {
							body.iso_currency_code = additionalOptions.isoCurrencyCode;
						}
						if (additionalOptions.idempotencyKey) {
							body.idempotency_key = additionalOptions.idempotencyKey;
						}
						if (additionalOptions.wireMessage && network === 'wire') {
							body.wire_details = { message: additionalOptions.wireMessage };
						}

						responseData = await plaidApiRequest.call(this, '/transfer/authorization/create', body);
					}
				}

				// ========================================
				//           TRANSFER
				// ========================================
				if (resource === 'transfer') {
					if (operation === 'create') {
						const authorizationId = this.getNodeParameter('authorizationId', i) as string;
						const accessToken = this.getNodeParameter('accessToken', i) as string;
						const accountId = this.getNodeParameter('accountId', i) as string;
						const description = this.getNodeParameter('description', i) as string;
						const additionalOptions = this.getNodeParameter('additionalOptions', i, {}) as IDataObject;

						const body: IDataObject = {
							authorization_id: authorizationId,
							access_token: accessToken,
							account_id: accountId,
							description: formatTransferDescription(description),
						};

						if (additionalOptions.idempotencyKey) {
							body.idempotency_key = additionalOptions.idempotencyKey;
						}
						if (additionalOptions.metadata) {
							body.metadata = typeof additionalOptions.metadata === 'string'
								? JSON.parse(additionalOptions.metadata)
								: additionalOptions.metadata;
						}

						responseData = await plaidApiRequest.call(this, '/transfer/create', body);
					}

					if (operation === 'get') {
						const transferId = this.getNodeParameter('transferId', i) as string;
						responseData = await plaidApiRequest.call(this, '/transfer/get', {
							transfer_id: transferId,
						});
					}

					if (operation === 'cancel') {
						const transferId = this.getNodeParameter('transferId', i) as string;
						responseData = await plaidApiRequest.call(this, '/transfer/cancel', {
							transfer_id: transferId,
						});
					}

					if (operation === 'list') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const limit = this.getNodeParameter('limit', i, 25) as number;
						const filters = this.getNodeParameter('filters', i, {}) as IDataObject;

						const body: IDataObject = {};

						if (filters.startDate) body.start_date = (filters.startDate as string).split('T')[0];
						if (filters.endDate) body.end_date = (filters.endDate as string).split('T')[0];
						if (filters.originationAccountId) body.origination_account_id = filters.originationAccountId;
						if (filters.originatorClientId) body.originator_client_id = filters.originatorClientId;
						if (filters.fundingAccountId) body.funding_account_id = filters.fundingAccountId;

						if (returnAll) {
							responseData = await plaidApiRequestAllItems.call(this, '/transfer/list', body, 'transfers');
						} else {
							body.count = Math.min(limit, 25);
							const response = await plaidApiRequest.call(this, '/transfer/list', body);
							responseData = response.transfers as IDataObject[];
						}
					}
				}

				// ========================================
				//           TRANSFER EVENT
				// ========================================
				if (resource === 'transferEvent') {
					if (operation === 'list') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const limit = this.getNodeParameter('limit', i, 25) as number;
						const filters = this.getNodeParameter('filters', i, {}) as IDataObject;

						const body: IDataObject = {};

						if (filters.transferId) body.transfer_id = filters.transferId;
						if (filters.startDate) body.start_date = (filters.startDate as string).split('T')[0];
						if (filters.endDate) body.end_date = (filters.endDate as string).split('T')[0];
						if (filters.eventTypes && (filters.eventTypes as string[]).length > 0) {
							body.event_types = filters.eventTypes;
						}
						if (filters.originationAccountId) body.origination_account_id = filters.originationAccountId;
						if (filters.accountId) body.account_id = filters.accountId;
						if (filters.transferType) body.transfer_type = filters.transferType;

						if (returnAll) {
							responseData = await plaidApiRequestAllItems.call(this, '/transfer/event/list', body, 'transfer_events');
						} else {
							body.count = Math.min(limit, 25);
							const response = await plaidApiRequest.call(this, '/transfer/event/list', body);
							responseData = response.transfer_events as IDataObject[];
						}
					}

					if (operation === 'sync') {
						const afterId = this.getNodeParameter('afterId', i) as number;
						const count = this.getNodeParameter('count', i, 25) as number;

						responseData = await plaidApiRequest.call(this, '/transfer/event/sync', {
							after_id: afterId,
							count: Math.min(count, 25),
						});
					}
				}

				// ========================================
				//        RECURRING TRANSFER
				// ========================================
				if (resource === 'recurringTransfer') {
					if (operation === 'create') {
						const accessToken = this.getNodeParameter('accessToken', i) as string;
						const accountId = this.getNodeParameter('accountId', i) as string;
						const type = this.getNodeParameter('type', i) as string;
						const network = this.getNodeParameter('network', i) as string;
						const amount = this.getNodeParameter('amount', i) as string;
						const description = this.getNodeParameter('description', i) as string;
						const userLegalName = this.getNodeParameter('userLegalName', i) as string;
						const intervalUnit = this.getNodeParameter('intervalUnit', i) as string;
						const intervalCount = this.getNodeParameter('intervalCount', i) as number;
						const startDate = this.getNodeParameter('startDate', i) as string;
						const additionalOptions = this.getNodeParameter('additionalOptions', i, {}) as IDataObject;

						const body: IDataObject = {
							access_token: accessToken,
							account_id: accountId,
							type,
							network,
							amount,
							description: formatTransferDescription(description),
							user: { legal_name: userLegalName },
							schedule: {
								interval_unit: intervalUnit,
								interval_count: intervalCount,
								start_date: startDate.split('T')[0],
							},
						};

						if (network === 'ach' || network === 'same-day-ach') {
							body.ach_class = this.getNodeParameter('achClass', i) as string;
						}

						const user = body.user as IDataObject;
						if (additionalOptions.userEmail) user.email_address = additionalOptions.userEmail;
						if (additionalOptions.userPhoneNumber) user.phone_number = additionalOptions.userPhoneNumber;

						const schedule = body.schedule as IDataObject;
						if (additionalOptions.endDate) schedule.end_date = (additionalOptions.endDate as string).split('T')[0];

						if (additionalOptions.idempotencyKey) body.idempotency_key = additionalOptions.idempotencyKey;
						if (additionalOptions.fundingAccountId) body.funding_account_id = additionalOptions.fundingAccountId;

						responseData = await plaidApiRequest.call(this, '/transfer/recurring/create', body);
					}

					if (operation === 'get') {
						const recurringTransferId = this.getNodeParameter('recurringTransferId', i) as string;
						responseData = await plaidApiRequest.call(this, '/transfer/recurring/get', {
							recurring_transfer_id: recurringTransferId,
						});
					}

					if (operation === 'cancel') {
						const recurringTransferId = this.getNodeParameter('recurringTransferId', i) as string;
						responseData = await plaidApiRequest.call(this, '/transfer/recurring/cancel', {
							recurring_transfer_id: recurringTransferId,
						});
					}

					if (operation === 'list') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const limit = this.getNodeParameter('limit', i, 25) as number;
						const filters = this.getNodeParameter('filters', i, {}) as IDataObject;

						const body: IDataObject = {};

						if (filters.startDate) body.start_date = (filters.startDate as string).split('T')[0];
						if (filters.endDate) body.end_date = (filters.endDate as string).split('T')[0];
						if (filters.fundingAccountId) body.funding_account_id = filters.fundingAccountId;

						if (returnAll) {
							responseData = await plaidApiRequestAllItems.call(this, '/transfer/recurring/list', body, 'recurring_transfers');
						} else {
							body.count = Math.min(limit, 25);
							const response = await plaidApiRequest.call(this, '/transfer/recurring/list', body);
							responseData = response.recurring_transfers as IDataObject[];
						}
					}
				}

				// ========================================
				//          TRANSFER SWEEP
				// ========================================
				if (resource === 'transferSweep') {
					if (operation === 'get') {
						const sweepId = this.getNodeParameter('sweepId', i) as string;
						responseData = await plaidApiRequest.call(this, '/transfer/sweep/get', {
							sweep_id: sweepId,
						});
					}

					if (operation === 'list') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const limit = this.getNodeParameter('limit', i, 25) as number;
						const filters = this.getNodeParameter('filters', i, {}) as IDataObject;

						const body: IDataObject = {};

						if (filters.startDate) body.start_date = (filters.startDate as string).split('T')[0];
						if (filters.endDate) body.end_date = (filters.endDate as string).split('T')[0];
						if (filters.originationAccountId) body.origination_account_id = filters.originationAccountId;
						if (filters.fundingAccountId) body.funding_account_id = filters.fundingAccountId;
						if (filters.transferId) body.transfer_id = filters.transferId;

						if (returnAll) {
							responseData = await plaidApiRequestAllItems.call(this, '/transfer/sweep/list', body, 'sweeps');
						} else {
							body.count = Math.min(limit, 25);
							const response = await plaidApiRequest.call(this, '/transfer/sweep/list', body);
							responseData = response.sweeps as IDataObject[];
						}
					}
				}

				// ========================================
				//          TRANSFER REFUND
				// ========================================
				if (resource === 'transferRefund') {
					if (operation === 'create') {
						const transferId = this.getNodeParameter('transferId', i) as string;
						const amount = this.getNodeParameter('amount', i) as string;
						const idempotencyKey = this.getNodeParameter('idempotencyKey', i) as string;

						responseData = await plaidApiRequest.call(this, '/transfer/refund/create', {
							transfer_id: transferId,
							amount,
							idempotency_key: idempotencyKey,
						});
					}

					if (operation === 'get') {
						const refundId = this.getNodeParameter('refundId', i) as string;
						responseData = await plaidApiRequest.call(this, '/transfer/refund/get', {
							refund_id: refundId,
						});
					}
				}

				// ========================================
				//          TRANSFER LEDGER
				// ========================================
				if (resource === 'transferLedger') {
					if (operation === 'get') {
						const originationAccountId = this.getNodeParameter('originationAccountId', i, '') as string;
						const body: IDataObject = {};
						if (originationAccountId) body.origination_account_id = originationAccountId;

						responseData = await plaidApiRequest.call(this, '/transfer/ledger/get', body);
					}

					if (operation === 'deposit') {
						const amount = this.getNodeParameter('amount', i) as string;
						const network = this.getNodeParameter('network', i) as string;
						const idempotencyKey = this.getNodeParameter('idempotencyKey', i) as string;
						const additionalOptions = this.getNodeParameter('additionalOptions', i, {}) as IDataObject;

						const body: IDataObject = {
							amount,
							network,
							idempotency_key: idempotencyKey,
						};

						if (additionalOptions.originationAccountId) body.origination_account_id = additionalOptions.originationAccountId;
						if (additionalOptions.fundingAccountId) body.funding_account_id = additionalOptions.fundingAccountId;
						if (additionalOptions.description) body.description = additionalOptions.description;

						responseData = await plaidApiRequest.call(this, '/transfer/ledger/deposit', body);
					}

					if (operation === 'withdraw') {
						const amount = this.getNodeParameter('amount', i) as string;
						const network = this.getNodeParameter('network', i) as string;
						const idempotencyKey = this.getNodeParameter('idempotencyKey', i) as string;
						const additionalOptions = this.getNodeParameter('additionalOptions', i, {}) as IDataObject;

						const body: IDataObject = {
							amount,
							network,
							idempotency_key: idempotencyKey,
						};

						if (additionalOptions.originationAccountId) body.origination_account_id = additionalOptions.originationAccountId;
						if (additionalOptions.fundingAccountId) body.funding_account_id = additionalOptions.fundingAccountId;
						if (additionalOptions.description) body.description = additionalOptions.description;

						responseData = await plaidApiRequest.call(this, '/transfer/ledger/withdraw', body);
					}

					if (operation === 'distribute') {
						const fromClientId = this.getNodeParameter('fromClientId', i) as string;
						const toClientId = this.getNodeParameter('toClientId', i) as string;
						const amount = this.getNodeParameter('amount', i) as string;
						const idempotencyKey = this.getNodeParameter('idempotencyKey', i) as string;
						const description = this.getNodeParameter('description', i, '') as string;

						const body: IDataObject = {
							from_client_id: fromClientId,
							to_client_id: toClientId,
							amount,
							idempotency_key: idempotencyKey,
						};

						if (description) body.description = description;

						responseData = await plaidApiRequest.call(this, '/transfer/ledger/distribute', body);
					}
				}

				// ========================================
				//       TRANSFER CAPABILITIES
				// ========================================
				if (resource === 'transferCapabilities') {
					if (operation === 'get') {
						const accessToken = this.getNodeParameter('accessToken', i) as string;
						const accountId = this.getNodeParameter('accountId', i) as string;
						const additionalOptions = this.getNodeParameter('additionalOptions', i, {}) as IDataObject;

						const body: IDataObject = {
							access_token: accessToken,
							account_id: accountId,
						};

						if (additionalOptions.paymentProfileId) body.payment_profile_id = additionalOptions.paymentProfileId;

						responseData = await plaidApiRequest.call(this, '/transfer/capabilities/get', body);
					}
				}

				// ========================================
				//       TRANSFER CONFIGURATION
				// ========================================
				if (resource === 'transferConfiguration') {
					if (operation === 'get') {
						const originationAccountId = this.getNodeParameter('originationAccountId', i, '') as string;
						const body: IDataObject = {};
						if (originationAccountId) body.origination_account_id = originationAccountId;

						responseData = await plaidApiRequest.call(this, '/transfer/configuration/get', body);
					}
				}

				// ========================================
				//           ORIGINATOR
				// ========================================
				if (resource === 'originator') {
					if (operation === 'create') {
						const companyName = this.getNodeParameter('companyName', i) as string;
						const additionalOptions = this.getNodeParameter('additionalOptions', i, {}) as IDataObject;

						const body: IDataObject = {
							company_name: companyName,
						};

						if (additionalOptions.addressStreet) {
							body.address = {
								street: additionalOptions.addressStreet,
								city: additionalOptions.addressCity || '',
								region: additionalOptions.addressRegion || '',
								postal_code: additionalOptions.addressPostalCode || '',
								country: additionalOptions.addressCountry || 'US',
							};
						}

						if (additionalOptions.taxId) body.tax_id = additionalOptions.taxId;
						if (additionalOptions.website) body.website = additionalOptions.website;

						responseData = await plaidApiRequest.call(this, '/transfer/originator/create', body);
					}

					if (operation === 'get') {
						const originatorClientId = this.getNodeParameter('originatorClientId', i) as string;
						responseData = await plaidApiRequest.call(this, '/transfer/originator/get', {
							originator_client_id: originatorClientId,
						});
					}

					if (operation === 'list') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const limit = this.getNodeParameter('limit', i, 25) as number;

						const body: IDataObject = {};

						if (returnAll) {
							responseData = await plaidApiRequestAllItems.call(this, '/transfer/originator/list', body, 'originators');
						} else {
							body.count = Math.min(limit, 25);
							const response = await plaidApiRequest.call(this, '/transfer/originator/list', body);
							responseData = response.originators as IDataObject[];
						}
					}
				}

				// Prepare output
				const executionData = this.helpers.constructExecutionMetaData(
					this.helpers.returnJsonArray(responseData as IDataObject | IDataObject[]),
					{ itemData: { item: i } },
				);
				returnData.push(...executionData);

			} catch (error) {
				if (this.continueOnFail()) {
					const executionData = this.helpers.constructExecutionMetaData(
						this.helpers.returnJsonArray({ error: (error as Error).message }),
						{ itemData: { item: i } },
					);
					returnData.push(...executionData);
					continue;
				}
				throw new NodeOperationError(this.getNode(), error as Error, { itemIndex: i });
			}
		}

		return [returnData];
	}
}
