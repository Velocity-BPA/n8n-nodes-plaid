/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const transferCapabilitiesOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['transferCapabilities'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Get transfer capabilities for an account',
				action: 'Get transfer capabilities',
			},
		],
		default: 'get',
	},
];

export const transferCapabilitiesFields: INodeProperties[] = [
	{
		displayName: 'Access Token',
		name: 'accessToken',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['transferCapabilities'],
				operation: ['get'],
			},
		},
		description: "The user's Plaid access token",
	},
	{
		displayName: 'Account ID',
		name: 'accountId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['transferCapabilities'],
				operation: ['get'],
			},
		},
		description: 'The Plaid account ID to check capabilities for',
	},
	{
		displayName: 'Additional Options',
		name: 'additionalOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['transferCapabilities'],
				operation: ['get'],
			},
		},
		options: [
			{
				displayName: 'Payment Profile ID',
				name: 'paymentProfileId',
				type: 'string',
				default: '',
				description: 'Payment profile ID for additional context',
			},
		],
	},
];
