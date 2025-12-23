/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const accountOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['account'],
			},
		},
		options: [
			{
				name: 'Get All',
				value: 'getAll',
				description: 'Get all accounts for an access token',
				action: 'Get all accounts',
			},
			{
				name: 'Get Balance',
				value: 'getBalance',
				description: 'Get real-time balance for accounts',
				action: 'Get account balance',
			},
		],
		default: 'getAll',
	},
];

export const accountFields: INodeProperties[] = [
	{
		displayName: 'Access Token',
		name: 'accessToken',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['getAll', 'getBalance'],
			},
		},
		description: "The user's Plaid access token",
	},
	{
		displayName: 'Account IDs',
		name: 'accountIds',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['getAll', 'getBalance'],
			},
		},
		description: 'Comma-separated list of account IDs to filter (optional)',
	},
];
