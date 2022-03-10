import { Typography } from '@material-ui/core';
import { useExchangeRates } from '../../../../hooks';
import { useStyles } from './styles';

type Props = {
	incorrectFormat: boolean;
	currencyList: string[];
	fromCurrency: string;
	toCurrency: string;
	currencyAmount: number;
};

const ConverterResult = (props: Props) => {
	const classes = useStyles();

	const exchangeInfo = useExchangeRates(props.fromCurrency, [props.toCurrency], props.currencyAmount);
	const convertedCurrencyRate = exchangeInfo[0]?.rate;

	const exchangeResult = `${props.currencyAmount} ${props.fromCurrency} = ${convertedCurrencyRate} ${props.toCurrency}`;

	return (
		<Typography variant='body1' className={classes.root}>
			{props.incorrectFormat ? 'Incorrect input format, please enter like in example: 10 usd in ua' : `Result: ${exchangeResult} `}
		</Typography>
	);
};

export default ConverterResult;
