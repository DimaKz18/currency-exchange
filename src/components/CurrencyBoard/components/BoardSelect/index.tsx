import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { ChangeEvent } from 'react';
import { useStyles } from './styles';

type Props = {
	currencyList: string[];
	baseCurrency: string;
	onHandleChange: (e: ChangeEvent<{ name?: string | undefined; value: unknown }>) => void;
};

const BoardSelect = (props: Props) => {
	const classes = useStyles();

	return (
		<FormControl fullWidth className={classes.select}>
			<InputLabel id='demo-simple-select-label'>Base currency</InputLabel>
			<Select labelId='demo-simple-select-label' id='demo-simple-select' value={props.baseCurrency} onChange={props.onHandleChange}>
				{props.currencyList.map((currency) => (
					<MenuItem value={currency}>{currency}</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

export default BoardSelect;
