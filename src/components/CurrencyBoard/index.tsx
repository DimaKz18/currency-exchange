import { Grid } from '@material-ui/core';
import { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useMountEffect } from '../../hooks';
import { fetchCurrencyRate } from '../../redux/currency-reducer';
import { selectCurrencyList, selectCurrencyListLoading } from '../../redux/currency-selectors';
import { UA_CODE } from '../../service/helpers';
import { useAppSelector } from '../../store';
import LoadingIndicator from '../common/LoadingIndicator';
import BoardSelect from './components/BoardSelect';
import BoardTable from './components/BoardTable';
import { useStyles } from './styles';

const CurrencyBoard = () => {
	const [baseCurrency, setBaseCurrency] = useState(UA_CODE);

	const classes = useStyles();
	const dispatch = useDispatch();

	const currencyList = useAppSelector(selectCurrencyList);
	const loadingCurrencyList = useAppSelector(selectCurrencyListLoading);

	useMountEffect(() => {
		dispatch(fetchCurrencyRate());
	});

	const handleSelectChange = (e: ChangeEvent<{ name?: string | undefined; value: unknown }>) => {
		setBaseCurrency(e.target.value as string);
	};

	return (
		<LoadingIndicator centred fullScreen show={loadingCurrencyList}>
			<Grid container direction='column' alignItems='center' className={classes.root}>
				<BoardSelect currencyList={currencyList} baseCurrency={baseCurrency} onHandleChange={handleSelectChange} />
				<BoardTable currencyList={currencyList} baseCurrency={baseCurrency} />
			</Grid>
		</LoadingIndicator>
	);
};

export default CurrencyBoard;
