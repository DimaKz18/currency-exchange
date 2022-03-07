import { CurrencyDTO } from './../service/dtos/CurrencyDTO';
import { currencyAPI } from '../service';
import { actions, fetchCurrencyRate } from './currency-reducer';
import { AxiosResponse } from 'axios';
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

	const ua_to_usd = result.data.find((currency) => currency.ccy === 'USD')?.buy;
	const ua_to_eur = result.data.find((currency) => currency.ccy === 'EUR')?.buy;
	const ua_to_rur = result.data.find((currency) => currency.ccy === 'RUR')?.buy;

	expect(dispatchMock).toBeCalledTimes(6);
	expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.setCurrencyListLoading(true));
	expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.setCurrencyListLoading(false));
	expect(dispatchMock).toHaveBeenNthCalledWith(4, actions.setUaToUsdRate(ua_to_usd));
	expect(dispatchMock).toHaveBeenNthCalledWith(5, actions.setUaToEurRate(ua_to_eur));
	expect(dispatchMock).toHaveBeenNthCalledWith(6, actions.setUaToRurRate(ua_to_rur));
});
