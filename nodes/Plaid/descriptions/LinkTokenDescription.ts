/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const linkTokenOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['linkToken'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a Link token for initializing Plaid Link',
				action: 'Create a link token',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get information about a Link token',
				action: 'Get a link token',
			},
		],
		default: 'create',
	},
];

export const linkTokenFields: INodeProperties[] = [
	// ----------------------------------
	//     linkToken:create
	// ----------------------------------
	{
		displayName: 'Client Name',
		name: 'clientName',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['linkToken'],
				operation: ['create'],
			},
		},
		description: 'The name of your application (displayed to end users)',
	},
	{
		displayName: 'User Client User ID',
		name: 'userClientUserId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['linkToken'],
				operation: ['create'],
			},
		},
		description: 'A unique ID representing the end user',
	},
	{
		displayName: 'Products',
		name: 'products',
		type: 'multiOptions',
		required: true,
		default: [],
		options: [
			{ name: 'Assets', value: 'assets' },
			{ name: 'Auth', value: 'auth' },
			{ name: 'Balance', value: 'balance' },
			{ name: 'Identity', value: 'identity' },
			{ name: 'Identity Verification', value: 'identity_verification' },
			{ name: 'Income', value: 'income' },
			{ name: 'Investments', value: 'investments' },
			{ name: 'Liabilities', value: 'liabilities' },
			{ name: 'Payment Initiation', value: 'payment_initiation' },
			{ name: 'Standing Orders', value: 'standing_orders' },
			{ name: 'Transactions', value: 'transactions' },
			{ name: 'Transfer', value: 'transfer' },
		],
		displayOptions: {
			show: {
				resource: ['linkToken'],
				operation: ['create'],
			},
		},
		description: 'Plaid products to initialize Link with',
	},
	{
		displayName: 'Country Codes',
		name: 'countryCodes',
		type: 'multiOptions',
		required: true,
		default: ['US'],
		options: [
			{ name: 'Canada', value: 'CA' },
			{ name: 'France', value: 'FR' },
			{ name: 'Germany', value: 'DE' },
			{ name: 'Ireland', value: 'IE' },
			{ name: 'Netherlands', value: 'NL' },
			{ name: 'Spain', value: 'ES' },
			{ name: 'United Kingdom', value: 'GB' },
			{ name: 'United States', value: 'US' },
		],
		displayOptions: {
			show: {
				resource: ['linkToken'],
				operation: ['create'],
			},
		},
		description: 'Countries to initialize Link with',
	},
	{
		displayName: 'Language',
		name: 'language',
		type: 'options',
		default: 'en',
		options: [
			{ name: 'Danish', value: 'da' },
			{ name: 'Dutch', value: 'nl' },
			{ name: 'English', value: 'en' },
			{ name: 'Estonian', value: 'et' },
			{ name: 'French', value: 'fr' },
			{ name: 'German', value: 'de' },
			{ name: 'Italian', value: 'it' },
			{ name: 'Latvian', value: 'lv' },
			{ name: 'Lithuanian', value: 'lt' },
			{ name: 'Norwegian', value: 'no' },
			{ name: 'Polish', value: 'pl' },
			{ name: 'Portuguese', value: 'pt' },
			{ name: 'Romanian', value: 'ro' },
			{ name: 'Spanish', value: 'es' },
			{ name: 'Swedish', value: 'sv' },
		],
		displayOptions: {
			show: {
				resource: ['linkToken'],
				operation: ['create'],
			},
		},
		description: 'The language to use for Link',
	},
	{
		displayName: 'Additional Options',
		name: 'additionalOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['linkToken'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Webhook URL',
				name: 'webhook',
				type: 'string',
				default: '',
				description: 'URL to receive webhooks',
			},
			{
				displayName: 'Access Token',
				name: 'accessToken',
				type: 'string',
				default: '',
				description: 'Access token for update mode (re-authentication)',
			},
			{
				displayName: 'Redirect URI',
				name: 'redirectUri',
				type: 'string',
				default: '',
				description: 'OAuth redirect URI',
			},
			{
				displayName: 'Android Package Name',
				name: 'androidPackageName',
				type: 'string',
				default: '',
				description: 'Android package name for OAuth',
			},
			{
				displayName: 'Transfer Intent ID',
				name: 'transferIntentId',
				type: 'string',
				default: '',
				description: 'Transfer intent ID for Transfer UI flow',
			},
			{
				displayName: 'User Email',
				name: 'userEmail',
				type: 'string',
				default: '',
				description: "User's email for pre-filling",
			},
			{
				displayName: 'User Phone Number',
				name: 'userPhoneNumber',
				type: 'string',
				default: '',
				description: "User's phone number for pre-filling",
			},
			{
				displayName: 'User Legal Name',
				name: 'userLegalName',
				type: 'string',
				default: '',
				description: "User's legal name",
			},
		],
	},
	// ----------------------------------
	//     linkToken:get
	// ----------------------------------
	{
		displayName: 'Link Token',
		name: 'linkToken',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['linkToken'],
				operation: ['get'],
			},
		},
		description: 'The Link token to get information about',
	},
];
