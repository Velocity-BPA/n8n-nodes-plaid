/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const transferEventOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['transferEvent'],
			},
		},
		options: [
			{
				name: 'List',
				value: 'list',
				description: 'List transfer events',
				action: 'List transfer events',
			},
			{
				name: 'Sync',
				value: 'sync',
				description: 'Sync transfer events since last sync',
				action: 'Sync transfer events',
			},
		],
		default: 'list',
	},
];

export const transferEventFields: INodeProperties[] = [
	// ----------------------------------
	//     transferEvent:list
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['transferEvent'],
				operation: ['list'],
			},
		},
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		default: 25,
		typeOptions: {
			minValue: 1,
			maxValue: 100,
		},
		displayOptions: {
			show: {
				resource: ['transferEvent'],
				operation: ['list'],
				returnAll: [false],
			},
		},
		description: 'Max number of results to return',
	},
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['transferEvent'],
				operation: ['list'],
			},
		},
		options: [
			{
				displayName: 'Transfer ID',
				name: 'transferId',
				type: 'string',
				default: '',
				description: 'Filter events for a specific transfer',
			},
			{
				displayName: 'Start Date',
				name: 'startDate',
				type: 'dateTime',
				default: '',
				description: 'Filter events on or after this date',
			},
			{
				displayName: 'End Date',
				name: 'endDate',
				type: 'dateTime',
				default: '',
				description: 'Filter events on or before this date',
			},
			{
				displayName: 'Event Types',
				name: 'eventTypes',
				type: 'multiOptions',
				default: [],
				options: [
					{ name: 'Cancelled', value: 'cancelled' },
					{ name: 'Failed', value: 'failed' },
					{ name: 'Pending', value: 'pending' },
					{ name: 'Posted', value: 'posted' },
					{ name: 'Returned', value: 'returned' },
					{ name: 'Settled', value: 'settled' },
					{ name: 'Swept', value: 'swept' },
					{ name: 'Swept Settled', value: 'swept_settled' },
					{ name: 'Return Swept', value: 'return_swept' },
				],
				description: 'Filter by event types',
			},
			{
				displayName: 'Origination Account ID',
				name: 'originationAccountId',
				type: 'string',
				default: '',
				description: 'Filter by origination account',
			},
			{
				displayName: 'Account ID',
				name: 'accountId',
				type: 'string',
				default: '',
				description: 'Filter by user account ID',
			},
			{
				displayName: 'Transfer Type',
				name: 'transferType',
				type: 'options',
				default: '',
				options: [
					{ name: 'All', value: '' },
					{ name: 'Debit', value: 'debit' },
					{ name: 'Credit', value: 'credit' },
				],
				description: 'Filter by transfer type',
			},
		],
	},
	// ----------------------------------
	//     transferEvent:sync
	// ----------------------------------
	{
		displayName: 'After ID',
		name: 'afterId',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['transferEvent'],
				operation: ['sync'],
			},
		},
		description: 'The ID of the last transfer event fetched. Set to 0 for first sync.',
	},
	{
		displayName: 'Count',
		name: 'count',
		type: 'number',
		default: 25,
		typeOptions: {
			minValue: 1,
			maxValue: 25,
		},
		displayOptions: {
			show: {
				resource: ['transferEvent'],
				operation: ['sync'],
			},
		},
		description: 'Max number of events to return per sync',
	},
];
