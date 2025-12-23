/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const transferLedgerOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['transferLedger'],
			},
		},
		options: [
			{
				name: 'Deposit',
				value: 'deposit',
				description: 'Deposit funds to ledger',
				action: 'Deposit to ledger',
			},
			{
				name: 'Distribute',
				value: 'distribute',
				description: 'Distribute funds between ledgers',
				action: 'Distribute between ledgers',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get ledger balance',
				action: 'Get ledger balance',
			},
			{
				name: 'Withdraw',
				value: 'withdraw',
				description: 'Withdraw funds from ledger',
				action: 'Withdraw from ledger',
			},
		],
		default: 'get',
	},
];

export const transferLedgerFields: INodeProperties[] = [
	// ----------------------------------
	//     transferLedger:get
	// ----------------------------------
	{
		displayName: 'Origination Account ID',
		name: 'originationAccountId',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['transferLedger'],
				operation: ['get'],
			},
		},
		description: 'The origination account ID (optional, uses default if not specified)',
	},
	// ----------------------------------
	//     transferLedger:deposit
	// ----------------------------------
	{
		displayName: 'Amount',
		name: 'amount',
		type: 'string',
		required: true,
		default: '',
		placeholder: '1000.00',
		displayOptions: {
			show: {
				resource: ['transferLedger'],
				operation: ['deposit'],
			},
		},
		description: 'The amount to deposit in decimal format',
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
			},
			{
				name: 'Same-Day ACH',
				value: 'same-day-ach',
			},
			{
				name: 'RTP',
				value: 'rtp',
			},
			{
				name: 'Wire',
				value: 'wire',
			},
		],
		displayOptions: {
			show: {
				resource: ['transferLedger'],
				operation: ['deposit'],
			},
		},
		description: 'The network to use for the deposit',
	},
	{
		displayName: 'Idempotency Key',
		name: 'idempotencyKey',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['transferLedger'],
				operation: ['deposit'],
			},
		},
		description: 'A unique key to prevent duplicate deposits',
	},
	{
		displayName: 'Additional Options',
		name: 'additionalOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['transferLedger'],
				operation: ['deposit'],
			},
		},
		options: [
			{
				displayName: 'Origination Account ID',
				name: 'originationAccountId',
				type: 'string',
				default: '',
				description: 'The origination account ID',
			},
			{
				displayName: 'Funding Account ID',
				name: 'fundingAccountId',
				type: 'string',
				default: '',
				description: 'The funding account ID',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Description for the deposit',
			},
		],
	},
	// ----------------------------------
	//     transferLedger:withdraw
	// ----------------------------------
	{
		displayName: 'Amount',
		name: 'amount',
		type: 'string',
		required: true,
		default: '',
		placeholder: '500.00',
		displayOptions: {
			show: {
				resource: ['transferLedger'],
				operation: ['withdraw'],
			},
		},
		description: 'The amount to withdraw in decimal format',
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
			},
			{
				name: 'Same-Day ACH',
				value: 'same-day-ach',
			},
			{
				name: 'RTP',
				value: 'rtp',
			},
			{
				name: 'Wire',
				value: 'wire',
			},
		],
		displayOptions: {
			show: {
				resource: ['transferLedger'],
				operation: ['withdraw'],
			},
		},
		description: 'The network to use for the withdrawal',
	},
	{
		displayName: 'Idempotency Key',
		name: 'idempotencyKey',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['transferLedger'],
				operation: ['withdraw'],
			},
		},
		description: 'A unique key to prevent duplicate withdrawals',
	},
	{
		displayName: 'Additional Options',
		name: 'additionalOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['transferLedger'],
				operation: ['withdraw'],
			},
		},
		options: [
			{
				displayName: 'Origination Account ID',
				name: 'originationAccountId',
				type: 'string',
				default: '',
				description: 'The origination account ID',
			},
			{
				displayName: 'Funding Account ID',
				name: 'fundingAccountId',
				type: 'string',
				default: '',
				description: 'The funding account ID',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Description for the withdrawal',
			},
		],
	},
	// ----------------------------------
	//     transferLedger:distribute
	// ----------------------------------
	{
		displayName: 'From Client ID',
		name: 'fromClientId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['transferLedger'],
				operation: ['distribute'],
			},
		},
		description: 'The client ID to distribute from',
	},
	{
		displayName: 'To Client ID',
		name: 'toClientId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['transferLedger'],
				operation: ['distribute'],
			},
		},
		description: 'The client ID to distribute to',
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
				resource: ['transferLedger'],
				operation: ['distribute'],
			},
		},
		description: 'The amount to distribute in decimal format',
	},
	{
		displayName: 'Idempotency Key',
		name: 'idempotencyKey',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['transferLedger'],
				operation: ['distribute'],
			},
		},
		description: 'A unique key to prevent duplicate distributions',
	},
	{
		displayName: 'Description',
		name: 'description',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['transferLedger'],
				operation: ['distribute'],
			},
		},
		description: 'Description for the distribution',
	},
];
