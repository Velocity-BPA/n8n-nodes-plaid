/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import { getBaseUrl, validateTransferAmount, formatTransferDescription } from '../nodes/Plaid/GenericFunctions';

describe('GenericFunctions', () => {
  describe('getBaseUrl', () => {
    it('should return sandbox URL for sandbox environment', () => {
      expect(getBaseUrl('sandbox')).toBe('https://sandbox.plaid.com');
    });

    it('should return development URL for development environment', () => {
      expect(getBaseUrl('development')).toBe('https://development.plaid.com');
    });

    it('should return production URL for production environment', () => {
      expect(getBaseUrl('production')).toBe('https://production.plaid.com');
    });

    it('should return sandbox URL for unknown environment', () => {
      expect(getBaseUrl('unknown')).toBe('https://sandbox.plaid.com');
    });
  });

  describe('validateTransferAmount', () => {
    it('should return true for valid amount format', () => {
      expect(validateTransferAmount('10.00')).toBe(true);
      expect(validateTransferAmount('100.50')).toBe(true);
      expect(validateTransferAmount('0.01')).toBe(true);
      expect(validateTransferAmount('999999.99')).toBe(true);
    });

    it('should return false for invalid amount format', () => {
      expect(validateTransferAmount('10')).toBe(false);
      expect(validateTransferAmount('10.0')).toBe(false);
      expect(validateTransferAmount('10.000')).toBe(false);
      expect(validateTransferAmount('abc')).toBe(false);
      expect(validateTransferAmount('')).toBe(false);
    });
  });

  describe('formatTransferDescription', () => {
    it('should truncate description to 15 characters', () => {
      expect(formatTransferDescription('Short')).toBe('Short');
      expect(formatTransferDescription('Exactly15chars!')).toBe('Exactly15chars!');
      expect(formatTransferDescription('This is a very long description')).toBe('This is a very ');
    });

    it('should handle empty string', () => {
      expect(formatTransferDescription('')).toBe('');
    });
  });
});
