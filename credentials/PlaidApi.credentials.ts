/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class PlaidApi implements ICredentialType {
	name = 'plaidApi';
	displayName = 'Plaid API';
	documentationUrl = 'https://plaid.com/docs/';
	properties: INodeProperties[] = [
		{
			displayName: 'Client ID',
			name: 'clientId',
			type: 'string',
			default: '',
			required: true,
			description: 'Your Plaid Client ID from the Plaid Dashboard',
		},
		{
			displayName: 'Secret',
			name: 'secret',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description: 'Your Plaid Secret for the selected environment',
		},
		{
			displayName: 'Environment',
			name: 'environment',
			type: 'options',
			default: 'sandbox',
			options: [
				{
					name: 'Sandbox',
					value: 'sandbox',
					description: 'Test environment with fake data',
				},
				{
					name: 'Development',
					value: 'development',
					description: 'Development environment with real data (limited institutions)',
				},
				{
					name: 'Production',
					value: 'production',
					description: 'Production environment with real data',
				},
			],
			description: 'The Plaid environment to use',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.environment === "production" ? "https://production.plaid.com" : $credentials.environment === "development" ? "https://development.plaid.com" : "https://sandbox.plaid.com"}}',
			url: '/institutions/get',
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: {
				client_id: '={{$credentials.clientId}}',
				secret: '={{$credentials.secret}}',
				count: 1,
				offset: 0,
				country_codes: ['US'],
			},
		},
	};
}
