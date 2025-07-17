
import { formatNumber, getStatusColor } from '../goalHelpers';

describe('goalHelpers', () => {
  describe('formatNumber', () => {
    it('formats numbers less than 1000 as-is', () => {
      expect(formatNumber(999)).toBe('999');
      expect(formatNumber(100)).toBe('100');
      expect(formatNumber(0)).toBe('0');
    });

    it('formats numbers 1000 and above with k suffix', () => {
      expect(formatNumber(1000)).toBe('1.0k');
      expect(formatNumber(1500)).toBe('1.5k');
      expect(formatNumber(12345)).toBe('12.3k');
    });
  });

  describe('getStatusColor', () => {
    it('returns correct colors for known statuses', () => {
      expect(getStatusColor('active')).toBe('green');
      expect(getStatusColor('paused')).toBe('orange');
      expect(getStatusColor('completed')).toBe('blue');
    });

    it('returns default color for unknown status', () => {
      expect(getStatusColor('unknown')).toBe('default');
      expect(getStatusColor('')).toBe('default');
    });
  });
});
