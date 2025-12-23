/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type {
	IDataObject,
	IHookFunctions,
	INodeType,
	INodeTypeDescription,
	IWebhookFunctions,
	IWebhookResponseData,
} from 'n8n-workflow';

import { logLicensingNotice } from './GenericFunctions';

// Log licensing notice once on module load
logLicensingNotice();

export class PlaidTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Plaid Trigger',
		name: 'plaidTrigger',
		icon: 'file:plaid.svg',
		group: ['trigger'],
		version: 1,
		subtitle: '={{$parameter["event"]}}',
		description: 'Starts the workflow when Plaid webhook events occur',
		defaults: {
			name: 'Plaid Trigger',
		},
		inputs: [],
		outputs: ['main'],
		credentials: [
			{
				name: 'plaidApi',
				required: true,
			},
		],
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: 'webhook',
			},
		],
		properties: [
			{
				displayName: 'Event',
				name: 'event',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'All Events',
						value: '*',
						description: 'Trigger on all Plaid webhook events',
					},
					{
						name: 'Transfer Events Update',
						value: 'TRANSFER_EVENTS_UPDATE',
						description: 'Transfer event status updates available',
					},
					{
						name: 'Recurring Transfer Skipped',
						value: 'RECURRING_TRANSFER_SKIPPED',
						description: 'A recurring transfer was skipped',
					},
					{
						name: 'Transactions Initial Update',
						value: 'INITIAL_UPDATE',
						description: 'Initial transaction data available',
					},
					{
						name: 'Transactions Historical Update',
						value: 'HISTORICAL_UPDATE',
						description: 'Historical transaction data available',
					},
					{
						name: 'Transactions Default Update',
						value: 'DEFAULT_UPDATE',
						description: 'New transactions available',
					},
					{
						name: 'Transactions Removed',
						value: 'TRANSACTIONS_REMOVED',
						description: 'Transactions were removed',
					},
					{
						name: 'Transactions Sync Updates Available',
						value: 'SYNC_UPDATES_AVAILABLE',
						description: 'New sync updates available',
					},
					{
						name: 'Item Error',
						value: 'ERROR',
						description: 'Item error occurred',
					},
					{
						name: 'Item Pending Expiration',
						value: 'PENDING_EXPIRATION',
						description: 'Item credentials will expire soon',
					},
					{
						name: 'Item User Permission Revoked',
						value: 'USER_PERMISSION_REVOKED',
						description: 'User revoked permissions',
					},
					{
						name: 'Auth Data Update',
						value: 'AUTOMATICALLY_VERIFIED',
						description: 'Auth data was automatically verified',
					},
				],
				default: '*',
				description: 'Which webhook event to listen for',
			},
			{
				displayName: 'Webhook Security',
				name: 'webhookSecurity',
				type: 'notice',
				default: '',
				displayOptions: {
					show: {},
				},
				// eslint-disable-next-line n8n-nodes-base/node-param-description-unneeded-backticks
				description: `For production use, you should verify Plaid webhooks using the webhook_verification_key from /webhook_verification_key/get endpoint. Configure this in your workflow after the trigger.`,
			},
		],
	};

	webhookMethods = {
		default: {
			async checkExists(this: IHookFunctions): Promise<boolean> {
				// Plaid webhooks are configured per-item, not globally
				// The webhook URL is set when creating Link tokens
				// We just return true to allow the webhook to be active
				return true;
			},
			async create(this: IHookFunctions): Promise<boolean> {
				// Plaid webhooks are set up during Link token creation
				// This node just listens for incoming webhooks
				return true;
			},
			async delete(this: IHookFunctions): Promise<boolean> {
				// Webhook deletion is handled by removing the item
				return true;
			},
		},
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const req = this.getRequestObject();
		const bodyData = this.getBodyData() as IDataObject;
		const selectedEvent = this.getNodeParameter('event') as string;

		// Get webhook type and code from Plaid's standard format
		const webhookType = bodyData.webhook_type as string;
		const webhookCode = bodyData.webhook_code as string;

		// Determine the event identifier
		let eventIdentifier = webhookCode || webhookType;

		// Filter events based on selection
		if (selectedEvent !== '*') {
			if (eventIdentifier !== selectedEvent) {
				return {
					webhookResponse: { status: 'ignored' },
				};
			}
		}

		// Return the webhook data
		return {
			workflowData: [
				this.helpers.returnJsonArray({
					...bodyData,
					_webhookType: webhookType,
					_webhookCode: webhookCode,
					_receivedAt: new Date().toISOString(),
					_headers: req.headers,
				}),
			],
		};
	}
}
