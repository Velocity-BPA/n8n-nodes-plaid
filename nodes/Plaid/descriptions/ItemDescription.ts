/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const itemOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['item'],
			},
		},
		options: [
			{
				name: 'Exchange Public Token',
				value: 'exchangePublicToken',
				description: 'Exchange a public token for an access token',
				action: 'Exchange public token',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get information about an Item',
				action: 'Get an item',
			},
			{
				name: 'Remove',
				value: 'remove',
				description: 'Remove an Item',
				action: 'Remove an item',
			},
		],
		default: 'get',
	},
];

export const itemFields: INodeProperties[] = [
	// ----------------------------------
	//     item:exchangePublicToken
	// ----------------------------------
	{
		displayName: 'Public Token',
		name: 'publicToken',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['item'],
				operation: ['exchangePublicToken'],
			},
		},
		description: 'The public token from Plaid Link',
	},
	// ----------------------------------
	//     item:get, item:remove
	// ----------------------------------
	{
		displayName: 'Access Token',
		name: 'accessToken',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['item'],
				operation: ['get', 'remove'],
			},
		},
		description: "The user's Plaid access token",
	},
];
