const exchangeRates = {
  USD: { USD: 1, EUR: 0.91, GBP: 0.78, JPY: 141.2, CNY: 7.2, CAD: 1.32, AUD: 1.49, CHF: 0.88, HKD: 7.83, SEK: 10.5 },
  EUR: { USD: 1.10, EUR: 1, GBP: 0.86, JPY: 155.3, CNY: 7.9, CAD: 1.45, AUD: 1.63, CHF: 0.97, HKD: 8.6, SEK: 11.5 },
  GBP: { USD: 1.28, EUR: 1.16, GBP: 1, JPY: 180.2, CNY: 9.1, CAD: 1.68, AUD: 1.9, CHF: 1.13, HKD: 9.7, SEK: 13.4 },
  JPY: { USD: 0.0071, EUR: 0.0064, GBP: 0.0055, JPY: 1, CNY: 0.051, CAD: 0.0093, AUD: 0.0105, CHF: 0.0063, HKD: 0.054, SEK: 0.075 },
  CNY: { USD: 0.139, EUR: 0.127, GBP: 0.11, JPY: 19.6, CNY: 1, CAD: 0.185, AUD: 0.206, CHF: 0.122, HKD: 1.09, SEK: 1.46 },
  CAD: { USD: 0.76, EUR: 0.69, GBP: 0.60, JPY: 107.5, CNY: 5.41, CAD: 1, AUD: 1.11, CHF: 0.66, HKD: 5.91, SEK: 7.9 },
  AUD: { USD: 0.67, EUR: 0.61, GBP: 0.53, JPY: 96.7, CNY: 4.85, CAD: 0.90, AUD: 1, CHF: 0.59, HKD: 5.3, SEK: 7.2 },
  CHF: { USD: 1.14, EUR: 1.03, GBP: 0.88, JPY: 163.2, CNY: 8.2, CAD: 1.51, AUD: 1.69, CHF: 1, HKD: 9.01, SEK: 12.0 },
  HKD: { USD: 0.13, EUR: 0.116, GBP: 0.10, JPY: 18.2, CNY: 0.91, CAD: 0.17, AUD: 0.188, CHF: 0.11, HKD: 1, SEK: 1.35 },
  SEK: { USD: 0.095, EUR: 0.087, GBP: 0.075, JPY: 13.3, CNY: 0.69, CAD: 0.127, AUD: 0.14, CHF: 0.083, HKD: 0.74, SEK: 1 }
};

export function convertCurrency(amount, fromCurrency, toCurrency) {
  const amt = parseFloat(amount);
  if (isNaN(amt)) return null;

  const rate = exchangeRates[fromCurrency]?.[toCurrency];
  if (!rate) return null;

  return +(amt * rate).toFixed(2);
}