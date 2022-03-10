import { makeStyles } from '@material-ui/core';
import { BackgroundLightColor } from '../../../../utils';

export const useStyles = makeStyles((theme) => ({
	currencyList: {
		width: 400,
		marginTop: 30,
		padding: 10,
		backgroundColor: BackgroundLightColor,
		borderRadius: 20,
	},
}));
