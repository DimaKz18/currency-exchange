import { RootState } from '../store';

export const selectCurrencyList = (state: RootState) => {
	return state.currency.currencyList;
};

export const selectUaToUsdRate = (state: RootState) => {
	return state.currency.ua_to_usd;
};

export const selectUaToEurRate = (state: RootState) => {
	return state.currency.ua_to_eur;
};

export const selectUaToRurRate = (state: RootState) => {
	return state.currency.ua_to_rur;
};

export const selectCurrencyListLoading = (state: RootState) => {
	return state.currency.loadingCurrencyList;
};
