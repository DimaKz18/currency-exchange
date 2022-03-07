import { useCallback } from 'react';
import { CurrencyModel } from '../service/models';
import { selectUaToEurRate, selectUaToRurRate, selectUaToUsdRate } from '../redux/currency-selectors';
import { EUR_CODE, RUR_CODE, UA_CODE, USD_CODE } from '../service/helpers';
import { useAppSelector } from '../store';

export const useExchangeRates = (fromCurrency: string, currencyList: string[], currAmount?: number) => {
	// We can use paid API to achieve same result
	const exchangeRatesResult = [] as CurrencyModel[];

	const uaToUsdRate = useAppSelector(selectUaToUsdRate);
	const uaToEurRate = useAppSelector(selectUaToEurRate);
	const uaToRurRate = useAppSelector(selectUaToRurRate);

	const currencyAmount = currAmount ? currAmount : 1;

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
					const exchangeRate =
						(toCurrency === EUR_CODE ? 1 / uaToEurRate : toCurrency === USD_CODE ? 1 / uaToUsdRate : 1 / uaToRurRate) * currencyAmount;

					const currencyInfo = getCurrencyInfo(toCurrency, parseFloat(exchangeRate.toFixed(2)));
					exchangeRatesResult.push(currencyInfo);
					break;
				}
				case USD_CODE: {
					const exchangeRate =
						(toCurrency === EUR_CODE ? uaToUsdRate / uaToEurRate : toCurrency === UA_CODE ? uaToUsdRate : uaToUsdRate / uaToRurRate) * currencyAmount;

					const currencyInfo = getCurrencyInfo(toCurrency, parseFloat(exchangeRate.toFixed(2)));
					exchangeRatesResult.push(currencyInfo);
					break;
				}

				case EUR_CODE: {
					const exchangeRate =
						(toCurrency === USD_CODE ? uaToEurRate / uaToUsdRate : toCurrency === UA_CODE ? uaToEurRate : uaToEurRate / uaToRurRate) * currencyAmount;

					const currencyInfo = getCurrencyInfo(toCurrency, parseFloat(exchangeRate.toFixed(2)));
					exchangeRatesResult.push(currencyInfo);
					break;
				}

				case RUR_CODE: {
					const exchangeRate =
						(toCurrency === USD_CODE ? uaToRurRate / uaToUsdRate : toCurrency === UA_CODE ? uaToRurRate : uaToRurRate / uaToEurRate) * currencyAmount;

					const currencyInfo = getCurrencyInfo(toCurrency, parseFloat(exchangeRate.toFixed(2)));
					exchangeRatesResult.push(currencyInfo);
					break;
				}

				default: {
				}
			}
		},
		[uaToUsdRate, uaToEurRate, uaToEurRate, currencyList]
	);

	currencyList.length > 0 && currencyList.map((currency) => getCurrencyInfoList(currency));

	return exchangeRatesResult;
};
