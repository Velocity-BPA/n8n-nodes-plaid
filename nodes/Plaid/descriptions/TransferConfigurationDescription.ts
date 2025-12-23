/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const transferConfigurationOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['transferConfiguration'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Get transfer configuration settings',
				action: 'Get transfer configuration',
			},
		],
		default: 'get',
	},
];

export const transferConfigurationFields: INodeProperties[] = [
	{
		displayName: 'Origination Account ID',
		name: 'originationAccountId',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['transferConfiguration'],
				operation: ['get'],
			},
		},
		description: 'The origination account ID (optional, uses default if not specified)',
	},
];
