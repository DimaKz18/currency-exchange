import { Grid } from '@material-ui/core';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { useStyles } from './styles';
import { selectCurrencyList, selectCurrencyListLoading } from '../../redux/currency-selectors';
import { useMountEffect } from '../../hooks';
import { fetchCurrencyRate } from '../../redux/currency-reducer';
import ConverterForm from './components/ConverterForm';
import ConverterResult from './components/ConverterResult';
import LoadingIndicator from '../common/LoadingIndicator';

export type FormTypes = {
	currencyConversion: string;
};

const CurrencyConverter = () => {
	const [incorrectFormat, setIncorrectFormat] = useState(false);
	const [fromCurrency, setFromCurrency] = useState('');
	const [toCurrency, setToCurrency] = useState('');
	const [currencyAmount, setCurrencyAmount] = useState(1);

	const classes = useStyles();

	const dispatch = useAppDispatch();
	const currencyList = useAppSelector(selectCurrencyList);
	const loadingCurrencyList = useAppSelector(selectCurrencyListLoading);

	useMountEffect(() => {
		dispatch(fetchCurrencyRate());
	});

	const checkIsCorrectFormat = (currencyData: string[]) => {
		return (
			currencyList.filter((currency) => currencyData[1] === currency || currencyData[3] === currency).length === 2 &&
			currencyData[1] !== currencyData[3] &&
			!isNaN(parseInt(currencyData[0])) &&
			currencyData.length <= 4
		);
	};

	const checkInputFormat = (currencyData: string[]) => {
		const isCorrectFormat = checkIsCorrectFormat(currencyData);
		if (!isCorrectFormat) setIncorrectFormat(true);
		else {
			const currencyAmount = Number(currencyData[0]);
			const fromCurrency = currencyData[1];
			const toCurrency = currencyData[3];
			setCurrencyAmount(currencyAmount);
			setFromCurrency(fromCurrency);
			setToCurrency(toCurrency);
			setIncorrectFormat(false);
		}
	};

	const handleSubmit = (values: FormTypes, props: any) => {
		checkInputFormat(values.currencyConversion.toUpperCase().split(' '));
		props.setSubmitting(false);
	};

	return (
		<LoadingIndicator centred fullScreen show={loadingCurrencyList}>
			<Grid container alignItems='center' direction='column' className={classes.root}>
				<ConverterForm onSubmit={handleSubmit} />
				{(incorrectFormat || fromCurrency) && (
					<ConverterResult
						incorrectFormat={incorrectFormat}
						currencyList={currencyList}
						fromCurrency={fromCurrency}
						toCurrency={toCurrency}
						currencyAmount={currencyAmount}
					/>
				)}
			</Grid>
		</LoadingIndicator>
	);
};

export default CurrencyConverter;
