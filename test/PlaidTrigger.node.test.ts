/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import { PlaidTrigger } from '../nodes/Plaid/PlaidTrigger.node';

describe('PlaidTrigger Node', () => {
  let plaidTrigger: PlaidTrigger;

  beforeEach(() => {
    plaidTrigger = new PlaidTrigger();
  });

  describe('Node Description', () => {
    it('should have correct display name', () => {
      expect(plaidTrigger.description.displayName).toBe('Plaid Trigger');
    });

    it('should have correct node name', () => {
      expect(plaidTrigger.description.name).toBe('plaidTrigger');
    });

    it('should be in trigger group', () => {
      expect(plaidTrigger.description.group).toContain('trigger');
    });

    it('should have no inputs and one output', () => {
      expect(plaidTrigger.description.inputs).toEqual([]);
      expect(plaidTrigger.description.outputs).toEqual(['main']);
    });

    it('should have webhook configuration', () => {
      expect(plaidTrigger.description.webhooks).toBeDefined();
      expect(plaidTrigger.description.webhooks?.length).toBeGreaterThan(0);
    });
  });

  describe('Event Options', () => {
    it('should have transfer event options', () => {
      const eventProperty = plaidTrigger.description.properties.find(
        (p) => p.name === 'event'
      );
      expect(eventProperty).toBeDefined();
      
      const eventValues = eventProperty?.options?.map((o: any) => o.value) || [];
      
      // Check for transfer-related events
      expect(eventValues).toContain('*');
      expect(eventValues).toContain('TRANSFER_EVENTS_UPDATE');
      expect(eventValues).toContain('RECURRING_TRANSFER_SKIPPED');
      
      // Check for transaction events
      expect(eventValues).toContain('INITIAL_UPDATE');
      expect(eventValues).toContain('DEFAULT_UPDATE');
      expect(eventValues).toContain('SYNC_UPDATES_AVAILABLE');
      
      // Check for item events
      expect(eventValues).toContain('ERROR');
      expect(eventValues).toContain('PENDING_EXPIRATION');
    });
  });

  describe('Webhook Methods', () => {
    it('should have webhook lifecycle methods', () => {
      expect(plaidTrigger.webhookMethods).toBeDefined();
      expect(plaidTrigger.webhookMethods.default).toBeDefined();
      expect(typeof plaidTrigger.webhookMethods.default.checkExists).toBe('function');
      expect(typeof plaidTrigger.webhookMethods.default.create).toBe('function');
      expect(typeof plaidTrigger.webhookMethods.default.delete).toBe('function');
    });
  });
});
