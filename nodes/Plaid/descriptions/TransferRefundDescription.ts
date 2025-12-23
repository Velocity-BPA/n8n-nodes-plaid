/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const transferRefundOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['transferRefund'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a refund for a transfer',
				action: 'Create a refund',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a refund by ID',
				action: 'Get a refund',
			},
		],
		default: 'create',
	},
];

export const transferRefundFields: INodeProperties[] = [
	// ----------------------------------
	//     transferRefund:create
	// ----------------------------------
	{
		displayName: 'Transfer ID',
		name: 'transferId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['transferRefund'],
				operation: ['create'],
			},
		},
		description: 'The ID of the transfer to refund',
	},
	{
		displayName: 'Amount',
		name: 'amount',
		type: 'string',
		required: true,
		default: '',
		placeholder: '10.00',
		displayOptions: {
			show: {
				resource: ['transferRefund'],
				operation: ['create'],
			},
		},
		description: 'The refund amount in decimal format (must not exceed original transfer amount)',
	},
	{
		displayName: 'Idempotency Key',
		name: 'idempotencyKey',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['transferRefund'],
				operation: ['create'],
			},
		},
		description: 'A unique key to prevent duplicate refunds',
	},
	// ----------------------------------
	//     transferRefund:get
	// ----------------------------------
	{
		displayName: 'Refund ID',
		name: 'refundId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['transferRefund'],
				operation: ['get'],
			},
		},
		description: 'The ID of the refund to retrieve',
	},
];
