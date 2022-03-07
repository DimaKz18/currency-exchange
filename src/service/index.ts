import { AxiosResponse } from 'axios';
import { CurrencyDTO } from './dtos';
import { currencyUrl } from './helpers';
import axios from 'axios';

export const currencyAPI = {
	async fetchCurrencyRateCall(): Promise<AxiosResponse<CurrencyDTO[]>> {
		return await axios.get(currencyUrl);
	},
};
