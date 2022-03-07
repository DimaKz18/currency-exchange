import { makeStyles } from '@material-ui/core';
import { LightBlue, MainColor, White } from '../../../../utils';

export const useStyles = makeStyles((theme) => ({
	formContainer: {
		minHeight: 70,
	},
	formButton: {
		marginLeft: 20,
		backgroundColor: LightBlue,
		color: White,
		'&:hover': {
			color: LightBlue,
			backgroundColor: White,
		},
	},
	formError: {
		marginTop: 10,
		color: MainColor,
	},
}));
