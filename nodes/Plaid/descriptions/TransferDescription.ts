/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const transferOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['transfer'],
			},
		},
		options: [
			{
				name: 'Cancel',
				value: 'cancel',
				description: 'Cancel a transfer',
				action: 'Cancel a transfer',
			},
			{
				name: 'Create',
				value: 'create',
				description: 'Create a transfer',
				action: 'Create a transfer',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a transfer by ID',
				action: 'Get a transfer',
			},
			{
				name: 'List',
				value: 'list',
				description: 'List transfers',
				action: 'List transfers',
			},
		],
		default: 'create',
	},
];

export const transferFields: INodeProperties[] = [
	// ----------------------------------
	//         transfer:create
	// ----------------------------------
	{
		displayName: 'Authorization ID',
		name: 'authorizationId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['transfer'],
				operation: ['create'],
			},
		},
		description: 'The authorization ID from the transfer authorization step',
	},
	{
		displayName: 'Access Token',
		name: 'accessToken',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['transfer'],
				operation: ['create'],
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
				resource: ['transfer'],
				operation: ['create'],
			},
		},
		description: 'The Plaid account ID',
	},
	{
		displayName: 'Description',
		name: 'description',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['transfer'],
				operation: ['create'],
			},
		},
		description: 'Transfer description (max 15 characters for ACH)',
	},
	{
		displayName: 'Additional Options',
		name: 'additionalOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['transfer'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Idempotency Key',
				name: 'idempotencyKey',
				type: 'string',
				default: '',
				description: 'A unique key to prevent duplicate transfers',
			},
			{
				displayName: 'Metadata',
				name: 'metadata',
				type: 'json',
				default: '{}',
				description: 'Custom metadata as key-value pairs (max 50 keys)',
			},
		],
	},
	// ----------------------------------
	//         transfer:get
	// ----------------------------------
	{
		displayName: 'Transfer ID',
		name: 'transferId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['transfer'],
				operation: ['get'],
			},
		},
		description: 'The ID of the transfer to retrieve',
	},
	// ----------------------------------
	//         transfer:cancel
	// ----------------------------------
	{
		displayName: 'Transfer ID',
		name: 'transferId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['transfer'],
				operation: ['cancel'],
			},
		},
		description: 'The ID of the transfer to cancel',
	},
	// ----------------------------------
	//         transfer:list
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['transfer'],
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
				resource: ['transfer'],
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
				resource: ['transfer'],
				operation: ['list'],
			},
		},
		options: [
			{
				displayName: 'Start Date',
				name: 'startDate',
				type: 'dateTime',
				default: '',
				description: 'Filter transfers created on or after this date',
			},
			{
				displayName: 'End Date',
				name: 'endDate',
				type: 'dateTime',
				default: '',
				description: 'Filter transfers created on or before this date',
			},
			{
				displayName: 'Origination Account ID',
				name: 'originationAccountId',
				type: 'string',
				default: '',
				description: 'Filter by origination account',
			},
			{
				displayName: 'Originator Client ID',
				name: 'originatorClientId',
				type: 'string',
				default: '',
				description: 'Filter by originator client (for platforms)',
			},
			{
				displayName: 'Funding Account ID',
				name: 'fundingAccountId',
				type: 'string',
				default: '',
				description: 'Filter by funding account',
			},
		],
	},
];
