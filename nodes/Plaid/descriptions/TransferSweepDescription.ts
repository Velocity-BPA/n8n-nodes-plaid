/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const transferSweepOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['transferSweep'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Get a sweep by ID',
				action: 'Get a sweep',
			},
			{
				name: 'List',
				value: 'list',
				description: 'List sweeps',
				action: 'List sweeps',
			},
		],
		default: 'list',
	},
];

export const transferSweepFields: INodeProperties[] = [
	// ----------------------------------
	//     transferSweep:get
	// ----------------------------------
	{
		displayName: 'Sweep ID',
		name: 'sweepId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['transferSweep'],
				operation: ['get'],
			},
		},
		description: 'The ID of the sweep to retrieve',
	},
	// ----------------------------------
	//     transferSweep:list
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['transferSweep'],
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
				resource: ['transferSweep'],
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
				resource: ['transferSweep'],
				operation: ['list'],
			},
		},
		options: [
			{
				displayName: 'Start Date',
				name: 'startDate',
				type: 'dateTime',
				default: '',
				description: 'Filter sweeps on or after this date',
			},
			{
				displayName: 'End Date',
				name: 'endDate',
				type: 'dateTime',
				default: '',
				description: 'Filter sweeps on or before this date',
			},
			{
				displayName: 'Origination Account ID',
				name: 'originationAccountId',
				type: 'string',
				default: '',
				description: 'Filter by origination account',
			},
			{
				displayName: 'Funding Account ID',
				name: 'fundingAccountId',
				type: 'string',
				default: '',
				description: 'Filter by funding account',
			},
			{
				displayName: 'Transfer ID',
				name: 'transferId',
				type: 'string',
				default: '',
				description: 'Filter by transfer ID',
			},
		],
	},
];
