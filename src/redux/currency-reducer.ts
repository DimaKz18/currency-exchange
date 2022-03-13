import { Dispatch } from 'redux';
import { currencyAPI } from '../service';
import { UA_CODE, USD_CODE, EUR_CODE, BTC_CODE } from '../service/helpers';
import { ActionsTypes } from '../store';

const initialState = {
	currencyList: [''],
	ua_to_usd: 0,
	ua_to_eur: 0,
	loadingCurrencyList: false,
};

type InitialStateType = typeof initialState;

const currencyReducer = (state = initialState, action: ActionsType): InitialStateType => {
	switch (action.type) {
		case 'CURRENCY/SET_CURRENCY_LIST':
			return {
				...state,
				currencyList: action.data,
			};
		case 'CURRENCY/SET_CURRENCY_LIST_LOADING':
			return {
				...state,
				loadingCurrencyList: action.data,
			};
		case 'CURRENCY/SET_UA_TO_USD_RATE':
			return {
				...state,
				ua_to_usd: Number(action.data),
			};
		case 'CURRENCY/SET_UA_TO_EUR_RATE':
			return {
				...state,
				ua_to_eur: Number(action.data),
			};
		default:
			return state;
	}
};

type ActionsType = ActionsTypes<typeof actions>;

export const actions = {
	setCurrencyList: (data: string[]) => {
		return {
			type: 'CURRENCY/SET_CURRENCY_LIST',
			data,
		} as const;
	},
	setCurrencyListLoading: (data: boolean) => {
		return {
			type: 'CURRENCY/SET_CURRENCY_LIST_LOADING',
			data,
		} as const;
	},
	setUaToUsdRate: (data?: string) => {
		return {
			type: 'CURRENCY/SET_UA_TO_USD_RATE',
			data,
		} as const;
	},
	setUaToEurRate: (data?: string) => {
		return {
			type: 'CURRENCY/SET_UA_TO_EUR_RATE',
			data,
		} as const;
	},
};

type DispatchType = Dispatch<ActionsType>;

export const fetchCurrencyRate = () => {
	return async (dispatch: DispatchType) => {
		dispatch(actions.setCurrencyListLoading(true));
		const currencyRate = await currencyAPI.fetchCurrencyRateCall();

		const currencyList = currencyRate && Object.entries(currencyRate.data).map(([key, value]) => (value.ccy !== BTC_CODE ? value.ccy : UA_CODE));

		const ua_to_usd = currencyRate && currencyRate.data.find((currency) => currency.ccy === USD_CODE)?.buy;
		const ua_to_eur = currencyRate && currencyRate.data.find((currency) => currency.ccy === EUR_CODE)?.buy;

		dispatch(actions.setCurrencyList(currencyList));
		dispatch(actions.setCurrencyListLoading(false));
		dispatch(actions.setUaToUsdRate(ua_to_usd));
		dispatch(actions.setUaToEurRate(ua_to_eur));
	};
};

export default currencyReducer;
