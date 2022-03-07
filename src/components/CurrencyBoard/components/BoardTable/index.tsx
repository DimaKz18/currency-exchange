import { Grid, Typography } from '@material-ui/core';
import { useExchangeRates } from '../../../../hooks';
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
					<Typography variant='h5' className={classes.currencyTitle}>
						1 {props.baseCurrency} = {item.rate} {item.currency}
					</Typography>
				</Grid>
			))}
		</Grid>
	);
};

export default BoardTable;
