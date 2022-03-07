import { makeStyles } from '@material-ui/core';
import { MainColor } from '../../../utils';

export const useStyles = makeStyles((theme) => ({
	progress: {
		color: MainColor,
	},
	fullScreen: {
		width: '100%',
		height: '100%',
	},
}));
