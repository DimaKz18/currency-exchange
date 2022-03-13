import { CurrencyDTO } from './../service/dtos/CurrencyDTO';
import { currencyAPI } from '../service';
import { actions, fetchCurrencyRate } from './currency-reducer';
import { AxiosResponse } from 'axios';
import { EUR_CODE, USD_CODE } from '../service/helpers';
jest.mock('../service');
const currencyAPIMock = currencyAPI as jest.Mocked<typeof currencyAPI>;

//@ts-ignore
const result: AxiosResponse<CurrencyDTO[]> = {
	data: [
		{
			ccy: '',
			base_ccy: '',
			buy: '',
			sale: '',
		},
	],
};

currencyAPIMock.fetchCurrencyRateCall.mockReturnValue(Promise.resolve(result));

test('success fetch currency rate', async () => {
	const thunk = fetchCurrencyRate();
	const dispatchMock = jest.fn();

	await thunk(dispatchMock);

	const ua_to_usd = result.data.find((currency) => currency.ccy === USD_CODE)?.buy;
	const ua_to_eur = result.data.find((currency) => currency.ccy === EUR_CODE)?.buy;

	expect(dispatchMock).toBeCalledTimes(5);
	expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.setCurrencyListLoading(true));
	expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.setCurrencyListLoading(false));
	expect(dispatchMock).toHaveBeenNthCalledWith(4, actions.setUaToUsdRate(ua_to_usd));
	expect(dispatchMock).toHaveBeenNthCalledWith(5, actions.setUaToEurRate(ua_to_eur));
});
