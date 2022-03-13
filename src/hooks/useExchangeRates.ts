import { useCallback } from 'react';
import { CurrencyModel } from '../service/models';
import { selectUaToEurRate, selectUaToUsdRate } from '../redux/currency-selectors';
import { EUR_CODE, UA_CODE, USD_CODE } from '../service/helpers';
import { useAppSelector } from '../store';

export const useExchangeRates = (fromCurrency: string, currencyList: string[], currAmount?: number) => {
	// We can use paid API to achieve same result
	const exchangeRatesResult = [] as CurrencyModel[];

	const uaToUsdRate = useAppSelector(selectUaToUsdRate);
	const uaToEurRate = useAppSelector(selectUaToEurRate);

	const currencyAmount = currAmount || 1;

	const getCurrencyInfo = (currency: string, rate: number) => {
		return {
			currency,
			rate,
		};
	};

	const getCurrencyInfoList = useCallback(
		(toCurrency: string) => {
			switch (fromCurrency) {
				case UA_CODE: {
					const exchangeRate = (toCurrency === EUR_CODE ? 1 / uaToEurRate : 1 / uaToUsdRate) * currencyAmount;

					const currencyInfo = getCurrencyInfo(toCurrency, parseFloat(exchangeRate.toFixed(3)));
					exchangeRatesResult.push(currencyInfo);
					break;
				}

				case USD_CODE: {
					const exchangeRate = (toCurrency === EUR_CODE ? uaToUsdRate / uaToEurRate : uaToUsdRate) * currencyAmount;

					const currencyInfo = getCurrencyInfo(toCurrency, parseFloat(exchangeRate.toFixed(3)));
					exchangeRatesResult.push(currencyInfo);
					break;
				}

				case EUR_CODE: {
					const exchangeRate = (toCurrency === USD_CODE ? uaToEurRate / uaToUsdRate : uaToEurRate) * currencyAmount;

					const currencyInfo = getCurrencyInfo(toCurrency, parseFloat(exchangeRate.toFixed(3)));
					exchangeRatesResult.push(currencyInfo);
					break;
				}

				default:
					return;
			}
		},
		[uaToUsdRate, uaToEurRate, uaToEurRate, currencyList]
	);

	currencyList.length > 0 && currencyList.map((currency) => getCurrencyInfoList(currency));

	return exchangeRatesResult;
};
