/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const transferAuthorizationOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['transferAuthorization'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a transfer authorization',
				action: 'Create a transfer authorization',
			},
		],
		default: 'create',
	},
];

export const transferAuthorizationFields: INodeProperties[] = [
	// ----------------------------------
	//     transferAuthorization:create
	// ----------------------------------
	{
		displayName: 'Access Token',
		name: 'accessToken',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['transferAuthorization'],
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
				resource: ['transferAuthorization'],
				operation: ['create'],
			},
		},
		description: 'The Plaid account ID to debit or credit',
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
				resource: ['transferAuthorization'],
				operation: ['create'],
			},
		},
		description: 'The direction of the transfer',
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
				description: 'Standard ACH transfer (1-3 business days)',
			},
			{
				name: 'Same-Day ACH',
				value: 'same-day-ach',
				description: 'Same-day ACH transfer',
			},
			{
				name: 'RTP',
				value: 'rtp',
				description: 'Real-Time Payments (instant)',
			},
		],
		displayOptions: {
			show: {
				resource: ['transferAuthorization'],
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
		placeholder: '10.00',
		displayOptions: {
			show: {
				resource: ['transferAuthorization'],
				operation: ['create'],
			},
		},
		description: 'The amount of the transfer in decimal format (e.g., "10.00")',
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
				description: 'For consumer accounts',
			},
			{
				name: 'CCD (Corporate Credit or Debit)',
				value: 'ccd',
				description: 'For business accounts',
			},
			{
				name: 'WEB (Internet-Initiated)',
				value: 'web',
				description: 'For consumer accounts via web',
			},
		],
		displayOptions: {
			show: {
				resource: ['transferAuthorization'],
				operation: ['create'],
				network: ['ach', 'same-day-ach'],
			},
		},
		description: 'The ACH class to use for the transfer',
	},
	{
		displayName: 'User Legal Name',
		name: 'userLegalName',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['transferAuthorization'],
				operation: ['create'],
			},
		},
		description: "The user's legal name",
	},
	{
		displayName: 'Additional Options',
		name: 'additionalOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['transferAuthorization'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'User Email',
				name: 'userEmail',
				type: 'string',
				default: '',
				description: "The user's email address (recommended for risk assessment)",
			},
			{
				displayName: 'User Phone Number',
				name: 'userPhoneNumber',
				type: 'string',
				default: '',
				description: "The user's phone number (recommended for risk assessment)",
			},
			{
				displayName: 'User Address Street',
				name: 'userAddressStreet',
				type: 'string',
				default: '',
				description: "The user's street address",
			},
			{
				displayName: 'User Address City',
				name: 'userAddressCity',
				type: 'string',
				default: '',
				description: "The user's city",
			},
			{
				displayName: 'User Address Region',
				name: 'userAddressRegion',
				type: 'string',
				default: '',
				description: "The user's state or region",
			},
			{
				displayName: 'User Address Postal Code',
				name: 'userAddressPostalCode',
				type: 'string',
				default: '',
				description: "The user's postal code",
			},
			{
				displayName: 'User Address Country',
				name: 'userAddressCountry',
				type: 'string',
				default: 'US',
				description: "The user's country (ISO 3166-1 alpha-2)",
			},
			{
				displayName: 'Origination Account ID',
				name: 'originationAccountId',
				type: 'string',
				default: '',
				description: 'Plaid ledger origination account ID for multi-account setups',
			},
			{
				displayName: 'ISO Currency Code',
				name: 'isoCurrencyCode',
				type: 'string',
				default: 'USD',
				description: 'The currency of the transfer (defaults to USD)',
			},
			{
				displayName: 'Idempotency Key',
				name: 'idempotencyKey',
				type: 'string',
				default: '',
				description: 'A unique key to prevent duplicate authorizations',
			},
			{
				displayName: 'Wire Message',
				name: 'wireMessage',
				type: 'string',
				default: '',
				description: 'Message for wire transfers (only for wire network)',
			},
		],
	},
];
