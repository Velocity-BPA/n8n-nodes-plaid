/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const transactionOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['transaction'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Get transactions for an access token',
				action: 'Get transactions',
			},
			{
				name: 'Refresh',
				value: 'refresh',
				description: 'Refresh transactions for an access token',
				action: 'Refresh transactions',
			},
			{
				name: 'Sync',
				value: 'sync',
				description: 'Sync transactions incrementally',
				action: 'Sync transactions',
			},
		],
		default: 'get',
	},
];

export const transactionFields: INodeProperties[] = [
	{
		displayName: 'Access Token',
		name: 'accessToken',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['transaction'],
				operation: ['get', 'refresh', 'sync'],
			},
		},
		description: "The user's Plaid access token",
	},
	// ----------------------------------
	//     transaction:get
	// ----------------------------------
	{
		displayName: 'Start Date',
		name: 'startDate',
		type: 'dateTime',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['transaction'],
				operation: ['get'],
			},
		},
		description: 'The start date for transactions (YYYY-MM-DD)',
	},
	{
		displayName: 'End Date',
		name: 'endDate',
		type: 'dateTime',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['transaction'],
				operation: ['get'],
			},
		},
		description: 'The end date for transactions (YYYY-MM-DD)',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['transaction'],
				operation: ['get'],
			},
		},
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		default: 100,
		typeOptions: {
			minValue: 1,
			maxValue: 500,
		},
		displayOptions: {
			show: {
				resource: ['transaction'],
				operation: ['get'],
				returnAll: [false],
			},
		},
		description: 'Max number of results to return',
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['transaction'],
				operation: ['get'],
			},
		},
		options: [
			{
				displayName: 'Account IDs',
				name: 'accountIds',
				type: 'string',
				default: '',
				description: 'Comma-separated list of account IDs to filter',
			},
			{
				displayName: 'Include Original Description',
				name: 'includeOriginalDescription',
				type: 'boolean',
				default: false,
				description: 'Whether to include the original transaction description',
			},
			{
				displayName: 'Include Personal Finance Category',
				name: 'includePersonalFinanceCategory',
				type: 'boolean',
				default: false,
				description: 'Whether to include detailed personal finance category',
			},
		],
	},
	// ----------------------------------
	//     transaction:sync
	// ----------------------------------
	{
		displayName: 'Cursor',
		name: 'cursor',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['transaction'],
				operation: ['sync'],
			},
		},
		description: 'The cursor for incremental sync (empty for first sync)',
	},
	{
		displayName: 'Count',
		name: 'count',
		type: 'number',
		default: 100,
		typeOptions: {
			minValue: 1,
			maxValue: 500,
		},
		displayOptions: {
			show: {
				resource: ['transaction'],
				operation: ['sync'],
			},
		},
		description: 'Number of transactions to fetch per page',
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['transaction'],
				operation: ['sync'],
			},
		},
		options: [
			{
				displayName: 'Include Original Description',
				name: 'includeOriginalDescription',
				type: 'boolean',
				default: false,
				description: 'Whether to include the original transaction description',
			},
			{
				displayName: 'Include Personal Finance Category',
				name: 'includePersonalFinanceCategory',
				type: 'boolean',
				default: false,
				description: 'Whether to include detailed personal finance category',
			},
		],
	},
];
