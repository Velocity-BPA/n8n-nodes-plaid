/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const recurringTransferOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['recurringTransfer'],
			},
		},
		options: [
			{
				name: 'Cancel',
				value: 'cancel',
				description: 'Cancel a recurring transfer',
				action: 'Cancel a recurring transfer',
			},
			{
				name: 'Create',
				value: 'create',
				description: 'Create a recurring transfer',
				action: 'Create a recurring transfer',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a recurring transfer by ID',
				action: 'Get a recurring transfer',
			},
			{
				name: 'List',
				value: 'list',
				description: 'List recurring transfers',
				action: 'List recurring transfers',
			},
		],
		default: 'create',
	},
];

export const recurringTransferFields: INodeProperties[] = [
	// ----------------------------------
	//     recurringTransfer:create
	// ----------------------------------
	{
		displayName: 'Access Token',
		name: 'accessToken',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['recurringTransfer'],
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
				resource: ['recurringTransfer'],
				operation: ['create'],
			},
		},
		description: 'The Plaid account ID',
	},
	{
		displayName: 'Transfer Type',
		name: 'type',
		type: 'options',
		required: true,
		default: 'debit',
		options: [
			{
				name: 'Debit',
				value: 'debit',
				description: 'Pull money from the account',
			},
			{
				name: 'Credit',
				value: 'credit',
				description: 'Push money to the account',
			},
		],
		displayOptions: {
			show: {
				resource: ['recurringTransfer'],
				operation: ['create'],
			},
		},
		description: 'The direction of the recurring transfer',
	},
	{
		displayName: 'Network',
		name: 'network',
		type: 'options',
		required: true,
		default: 'ach',
		options: [
			{
				name: 'ACH',
				value: 'ach',
				description: 'Standard ACH transfer',
			},
			{
				name: 'Same-Day ACH',
				value: 'same-day-ach',
				description: 'Same-day ACH transfer',
			},
			{
				name: 'RTP',
				value: 'rtp',
				description: 'Real-Time Payments',
			},
		],
		displayOptions: {
			show: {
				resource: ['recurringTransfer'],
				operation: ['create'],
			},
		},
		description: 'The payment network to use',
	},
	{
		displayName: 'Amount',
		name: 'amount',
		type: 'string',
		required: true,
		default: '',
		placeholder: '100.00',
		displayOptions: {
			show: {
				resource: ['recurringTransfer'],
				operation: ['create'],
			},
		},
		description: 'The amount of each transfer in decimal format',
	},
	{
		displayName: 'ACH Class',
		name: 'achClass',
		type: 'options',
		required: true,
		default: 'ppd',
		options: [
			{
				name: 'PPD (Prearranged Payment and Deposit)',
				value: 'ppd',
			},
			{
				name: 'CCD (Corporate Credit or Debit)',
				value: 'ccd',
			},
			{
				name: 'WEB (Internet-Initiated)',
				value: 'web',
			},
		],
		displayOptions: {
			show: {
				resource: ['recurringTransfer'],
				operation: ['create'],
				network: ['ach', 'same-day-ach'],
			},
		},
		description: 'The ACH class to use',
	},
	{
		displayName: 'Description',
		name: 'description',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['recurringTransfer'],
				operation: ['create'],
			},
		},
		description: 'Description for each transfer (max 15 chars for ACH)',
	},
	{
		displayName: 'User Legal Name',
		name: 'userLegalName',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['recurringTransfer'],
				operation: ['create'],
			},
		},
		description: "The user's legal name",
	},
	{
		displayName: 'Schedule Interval Unit',
		name: 'intervalUnit',
		type: 'options',
		required: true,
		default: 'month',
		options: [
			{
				name: 'Week',
				value: 'week',
				description: 'Weekly recurring transfers',
			},
			{
				name: 'Month',
				value: 'month',
				description: 'Monthly recurring transfers',
			},
		],
		displayOptions: {
			show: {
				resource: ['recurringTransfer'],
				operation: ['create'],
			},
		},
		description: 'The interval unit for recurring transfers',
	},
	{
		displayName: 'Schedule Interval Count',
		name: 'intervalCount',
		type: 'number',
		required: true,
		default: 1,
		typeOptions: {
			minValue: 1,
		},
		displayOptions: {
			show: {
				resource: ['recurringTransfer'],
				operation: ['create'],
			},
		},
		description: 'Number of interval units between transfers (e.g., 2 weeks)',
	},
	{
		displayName: 'Schedule Start Date',
		name: 'startDate',
		type: 'dateTime',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['recurringTransfer'],
				operation: ['create'],
			},
		},
		description: 'The start date for the recurring transfers',
	},
	{
		displayName: 'Additional Options',
		name: 'additionalOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['recurringTransfer'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Schedule End Date',
				name: 'endDate',
				type: 'dateTime',
				default: '',
				description: 'The end date for the recurring transfers (optional)',
			},
			{
				displayName: 'User Email',
				name: 'userEmail',
				type: 'string',
				default: '',
				description: "The user's email address",
			},
			{
				displayName: 'User Phone Number',
				name: 'userPhoneNumber',
				type: 'string',
				default: '',
				description: "The user's phone number",
			},
			{
				displayName: 'Idempotency Key',
				name: 'idempotencyKey',
				type: 'string',
				default: '',
				description: 'A unique key to prevent duplicate recurring transfers',
			},
			{
				displayName: 'Funding Account ID',
				name: 'fundingAccountId',
				type: 'string',
				default: '',
				description: 'The funding account ID for the transfers',
			},
		],
	},
	// ----------------------------------
	//     recurringTransfer:get
	// ----------------------------------
	{
		displayName: 'Recurring Transfer ID',
		name: 'recurringTransferId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['recurringTransfer'],
				operation: ['get'],
			},
		},
		description: 'The ID of the recurring transfer to retrieve',
	},
	// ----------------------------------
	//     recurringTransfer:cancel
	// ----------------------------------
	{
		displayName: 'Recurring Transfer ID',
		name: 'recurringTransferId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['recurringTransfer'],
				operation: ['cancel'],
			},
		},
		description: 'The ID of the recurring transfer to cancel',
	},
	// ----------------------------------
	//     recurringTransfer:list
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['recurringTransfer'],
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
				resource: ['recurringTransfer'],
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
				resource: ['recurringTransfer'],
				operation: ['list'],
			},
		},
		options: [
			{
				displayName: 'Start Date',
				name: 'startDate',
				type: 'dateTime',
				default: '',
				description: 'Filter recurring transfers created on or after this date',
			},
			{
				displayName: 'End Date',
				name: 'endDate',
				type: 'dateTime',
				default: '',
				description: 'Filter recurring transfers created on or before this date',
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
