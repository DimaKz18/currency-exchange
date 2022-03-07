import { makeStyles } from '@material-ui/core';
import { MainColor, Black } from '../../utils';

export const useStyles = makeStyles((theme) => ({
	link: {
		padding: 10,
		textDecoration: 'none',
		color: Black,
	},
	activeLink: {
		color: MainColor,
	},
}));
