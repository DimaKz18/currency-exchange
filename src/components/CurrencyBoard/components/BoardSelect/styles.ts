import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
	select: {
		marginTop: 20,
		width: 300,
		[theme.breakpoints.up('md')]: {
			width: 400,
		},
	},
}));
