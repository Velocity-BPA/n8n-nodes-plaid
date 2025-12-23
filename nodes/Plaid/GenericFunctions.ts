/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type {
	IDataObject,
	IExecuteFunctions,
	IHookFunctions,
	ILoadOptionsFunctions,
	IWebhookFunctions,
	JsonObject,
} from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';

// Runtime licensing notice - logged once per module load
let licensingNoticeLogged = false;

export function logLicensingNotice(): void {
	if (!licensingNoticeLogged) {
		console.warn(`[Velocity BPA Licensing Notice]

This n8n node is licensed under the Business Source License 1.1 (BSL 1.1).

Use of this node by for-profit organizations in production environments requires a commercial license from Velocity BPA.

For licensing information, visit https://velobpa.com/licensing or contact licensing@velobpa.com.
`);
		licensingNoticeLogged = true;
	}
}

export function getBaseUrl(environment: string): string {
	switch (environment) {
		case 'production':
			return 'https://production.plaid.com';
		case 'development':
			return 'https://development.plaid.com';
		default:
			return 'https://sandbox.plaid.com';
	}
}

export async function plaidApiRequest(
	this: IExecuteFunctions | ILoadOptionsFunctions | IHookFunctions | IWebhookFunctions,
	endpoint: string,
	body: IDataObject = {},
): Promise<IDataObject> {
	const credentials = await this.getCredentials('plaidApi');
	const baseUrl = getBaseUrl(credentials.environment as string);

	const options = {
		method: 'POST' as const,
		uri: `${baseUrl}${endpoint}`,
		headers: {
			'Content-Type': 'application/json',
		},
		body: {
			client_id: credentials.clientId,
			secret: credentials.secret,
			...body,
		},
		json: true,
	};

	try {
		const response = await this.helpers.request(options);
		return response as IDataObject;
	} catch (error) {
		const errorData = (error as JsonObject).error as IDataObject | undefined;
		if (errorData) {
			throw new NodeApiError(this.getNode(), error as JsonObject, {
				message: errorData.error_message as string || 'Plaid API Error',
				description: `${errorData.error_type}: ${errorData.error_code}`,
			});
		}
		throw new NodeApiError(this.getNode(), error as JsonObject);
	}
}

export async function plaidApiRequestAllItems(
	this: IExecuteFunctions | ILoadOptionsFunctions,
	endpoint: string,
	body: IDataObject = {},
	propertyName: string,
	limit = 0,
): Promise<IDataObject[]> {
	const returnData: IDataObject[] = [];
	let responseData: IDataObject;
	const maxResults = 25;
	body.count = maxResults;
	body.offset = 0;

	do {
		responseData = await plaidApiRequest.call(this, endpoint, body);
		const items = responseData[propertyName] as IDataObject[];
		if (items) {
			returnData.push(...items);
		}
		body.offset = (body.offset as number) + maxResults;

		if (limit > 0 && returnData.length >= limit) {
			return returnData.slice(0, limit);
		}
	} while (
		responseData[propertyName] &&
		(responseData[propertyName] as IDataObject[]).length === maxResults
	);

	return returnData;
}

export function validateTransferAmount(amount: string): boolean {
	const regex = /^\d+\.\d{2}$/;
	return regex.test(amount);
}

export function formatTransferDescription(description: string): string {
	// ACH descriptions are limited to 15 characters
	return description.slice(0, 15);
}
