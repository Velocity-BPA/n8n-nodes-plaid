/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const originatorOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['originator'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create an originator (for platforms)',
				action: 'Create an originator',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get an originator by ID',
				action: 'Get an originator',
			},
			{
				name: 'List',
				value: 'list',
				description: 'List originators',
				action: 'List originators',
			},
		],
		default: 'list',
	},
];

export const originatorFields: INodeProperties[] = [
	// ----------------------------------
	//     originator:create
	// ----------------------------------
	{
		displayName: 'Company Name',
		name: 'companyName',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['originator'],
				operation: ['create'],
			},
		},
		description: "The originator's company name",
	},
	{
		displayName: 'Additional Options',
		name: 'additionalOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['originator'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Address Street',
				name: 'addressStreet',
				type: 'string',
				default: '',
				description: 'Street address',
			},
			{
				displayName: 'Address City',
				name: 'addressCity',
				type: 'string',
				default: '',
				description: 'City',
			},
			{
				displayName: 'Address Region',
				name: 'addressRegion',
				type: 'string',
				default: '',
				description: 'State or region',
			},
			{
				displayName: 'Address Postal Code',
				name: 'addressPostalCode',
				type: 'string',
				default: '',
				description: 'Postal code',
			},
			{
				displayName: 'Address Country',
				name: 'addressCountry',
				type: 'string',
				default: 'US',
				description: 'Country code (ISO 3166-1 alpha-2)',
			},
			{
				displayName: 'Tax ID',
				name: 'taxId',
				type: 'string',
				default: '',
				description: 'Company tax ID (EIN)',
			},
			{
				displayName: 'Website',
				name: 'website',
				type: 'string',
				default: '',
				description: 'Company website URL',
			},
		],
	},
	// ----------------------------------
	//     originator:get
	// ----------------------------------
	{
		displayName: 'Originator Client ID',
		name: 'originatorClientId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['originator'],
				operation: ['get'],
			},
		},
		description: 'The client ID of the originator to retrieve',
	},
	// ----------------------------------
	//     originator:list
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['originator'],
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
				resource: ['originator'],
				operation: ['list'],
				returnAll: [false],
			},
		},
		description: 'Max number of results to return',
	},
];
