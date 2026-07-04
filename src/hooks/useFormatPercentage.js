import { useCallback } from 'react';

export function useFormatPercentage() {
  const formatPercentage = useCallback((value) => {
    // Handle null, undefined, or invalid number strings gracefully
    if (value == null || isNaN(Number(value))) return '0.00%';

    // Format to exactly 2 decimal places using localized decimal style
    const formattedValue = new Intl.NumberFormat('en-KE', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(Number(value));

    return `${formattedValue}%`;
  }, []);

  return formatPercentage;
}