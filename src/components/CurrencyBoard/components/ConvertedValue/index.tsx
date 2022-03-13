import { Typography } from '@material-ui/core';
import { useSpring, animated } from 'react-spring';
import { useStyles } from './styles';

type Props = {
	convertedValue: number;
	convertedCurrency: string;
	baseCurrency: string;
};

const ConvertedValue = (props: Props) => {
	const classes = useStyles();

	const resultValue = useSpring({ val: props.convertedValue, from: { val: 0 } });

	return (
		<Typography variant='h5' className={classes.currencyTitle}>
			1 {props.baseCurrency} = <animated.span className='string'>{resultValue.val.interpolate((val) => parseFloat(val.toFixed(3)))}</animated.span>{' '}
			{props.convertedCurrency}
		</Typography>
	);
};

export default ConvertedValue;
