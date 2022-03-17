import { makeStyles } from '@material-ui/core';
import { LightBlue } from '../../../../utils';

export const useStyles = makeStyles((theme) => ({
	currencyList: {
		width: 300,
		marginTop: 30,
		padding: 10,
		borderRadius: 20,
		backgroundColor: LightBlue,
		[theme.breakpoints.up('md')]: {
			width: 400,
		},
	},
}));
