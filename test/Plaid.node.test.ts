/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import { Plaid } from '../nodes/Plaid/Plaid.node';

describe('Plaid Node', () => {
  let plaidNode: Plaid;

  beforeEach(() => {
    plaidNode = new Plaid();
  });

  describe('Node Description', () => {
    it('should have correct display name', () => {
      expect(plaidNode.description.displayName).toBe('Plaid');
    });

    it('should have correct node name', () => {
      expect(plaidNode.description.name).toBe('plaid');
    });

    it('should have version 1', () => {
      expect(plaidNode.description.version).toBe(1);
    });

    it('should require plaidApi credentials', () => {
      expect(plaidNode.description.credentials).toEqual([
        { name: 'plaidApi', required: true },
      ]);
    });

    it('should have single input and output', () => {
      expect(plaidNode.description.inputs).toEqual(['main']);
      expect(plaidNode.description.outputs).toEqual(['main']);
    });
  });

  describe('Resources', () => {
    it('should have all required resources', () => {
      const resourceProperty = plaidNode.description.properties.find(
        (p) => p.name === 'resource'
      );
      expect(resourceProperty).toBeDefined();
      
      const resourceValues = resourceProperty?.options?.map((o: any) => o.value) || [];
      
      // Core resources
      expect(resourceValues).toContain('account');
      expect(resourceValues).toContain('item');
      expect(resourceValues).toContain('transaction');
      expect(resourceValues).toContain('linkToken');
      
      // Transfer API resources
      expect(resourceValues).toContain('transferAuthorization');
      expect(resourceValues).toContain('transfer');
      expect(resourceValues).toContain('transferEvent');
      expect(resourceValues).toContain('recurringTransfer');
      expect(resourceValues).toContain('transferSweep');
      expect(resourceValues).toContain('transferRefund');
      expect(resourceValues).toContain('transferLedger');
      expect(resourceValues).toContain('transferCapabilities');
      expect(resourceValues).toContain('transferConfiguration');
      expect(resourceValues).toContain('originator');
    });
  });

  describe('Transfer Operations', () => {
    it('should have transfer create, get, list, cancel operations', () => {
      const transferOperations = plaidNode.description.properties.find(
        (p) => p.name === 'operation' && 
        p.displayOptions?.show?.resource?.includes('transfer')
      );
      
      expect(transferOperations).toBeDefined();
      const operationValues = transferOperations?.options?.map((o: any) => o.value) || [];
      
      expect(operationValues).toContain('create');
      expect(operationValues).toContain('get');
      expect(operationValues).toContain('list');
      expect(operationValues).toContain('cancel');
    });
  });

  describe('Transfer Authorization Operations', () => {
    it('should have transfer authorization create operation', () => {
      const authOperations = plaidNode.description.properties.find(
        (p) => p.name === 'operation' && 
        p.displayOptions?.show?.resource?.includes('transferAuthorization')
      );
      
      expect(authOperations).toBeDefined();
      const operationValues = authOperations?.options?.map((o: any) => o.value) || [];
      
      expect(operationValues).toContain('create');
    });
  });

  describe('Recurring Transfer Operations', () => {
    it('should have recurring transfer CRUD operations', () => {
      const recurringOperations = plaidNode.description.properties.find(
        (p) => p.name === 'operation' && 
        p.displayOptions?.show?.resource?.includes('recurringTransfer')
      );
      
      expect(recurringOperations).toBeDefined();
      const operationValues = recurringOperations?.options?.map((o: any) => o.value) || [];
      
      expect(operationValues).toContain('create');
      expect(operationValues).toContain('get');
      expect(operationValues).toContain('list');
      expect(operationValues).toContain('cancel');
    });
  });
});
