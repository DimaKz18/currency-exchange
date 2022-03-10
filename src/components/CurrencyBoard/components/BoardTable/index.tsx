import { Grid } from '@material-ui/core';
import { useExchangeRates } from '../../../../hooks';
import ConvertedValue from '../ConvertedValue';
import { useStyles } from './styles';

type Props = {
	currencyList: string[];
	baseCurrency: string;
};

const BoardTable = (props: Props) => {
	const classes = useStyles();

	const currencyList = props.currencyList.filter((currency) => currency !== props.baseCurrency);
	const exchangeInfo = useExchangeRates(props.baseCurrency, currencyList);

	return (
		<Grid container className={classes.currencyList}>
			{exchangeInfo.map((item) => (
				<Grid container key={item.currency}>
					<ConvertedValue convertedValue={item.rate} convertedCurrency={item.currency} baseCurrency={props.baseCurrency} />
				</Grid>
			))}
		</Grid>
	);
};

export default BoardTable;
