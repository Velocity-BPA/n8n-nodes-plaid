/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import { PlaidApi } from '../credentials/PlaidApi.credentials';

describe('PlaidApi Credentials', () => {
  let plaidCredentials: PlaidApi;

  beforeEach(() => {
    plaidCredentials = new PlaidApi();
  });

  describe('Credential Definition', () => {
    it('should have correct name', () => {
      expect(plaidCredentials.name).toBe('plaidApi');
    });

    it('should have correct display name', () => {
      expect(plaidCredentials.displayName).toBe('Plaid API');
    });

    it('should have documentation URL', () => {
      expect(plaidCredentials.documentationUrl).toBe('https://plaid.com/docs/');
    });
  });

  describe('Properties', () => {
    it('should have clientId property', () => {
      const clientIdProp = plaidCredentials.properties.find(p => p.name === 'clientId');
      expect(clientIdProp).toBeDefined();
      expect(clientIdProp?.required).toBe(true);
      expect(clientIdProp?.type).toBe('string');
    });

    it('should have secret property as password', () => {
      const secretProp = plaidCredentials.properties.find(p => p.name === 'secret');
      expect(secretProp).toBeDefined();
      expect(secretProp?.required).toBe(true);
      expect(secretProp?.type).toBe('string');
      expect(secretProp?.typeOptions?.password).toBe(true);
    });

    it('should have environment property with correct options', () => {
      const envProp = plaidCredentials.properties.find(p => p.name === 'environment');
      expect(envProp).toBeDefined();
      expect(envProp?.type).toBe('options');
      
      const envValues = envProp?.options?.map((o: any) => o.value) || [];
      expect(envValues).toContain('sandbox');
      expect(envValues).toContain('development');
      expect(envValues).toContain('production');
    });

    it('should default to sandbox environment', () => {
      const envProp = plaidCredentials.properties.find(p => p.name === 'environment');
      expect(envProp?.default).toBe('sandbox');
    });
  });

  describe('Authentication', () => {
    it('should have generic authentication type', () => {
      expect(plaidCredentials.authenticate).toBeDefined();
      expect(plaidCredentials.authenticate.type).toBe('generic');
    });
  });

  describe('Credential Test', () => {
    it('should have test request configured', () => {
      expect(plaidCredentials.test).toBeDefined();
      expect(plaidCredentials.test.request).toBeDefined();
      expect(plaidCredentials.test.request.method).toBe('POST');
      expect(plaidCredentials.test.request.url).toBe('/institutions/get');
    });
  });
});
