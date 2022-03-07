import { Grid } from '@material-ui/core';
import { NavLink, useLocation } from 'react-router-dom';
import { currencyBoard, currencyConverter } from '../../routes/routes';
import { useStyles } from './styles';
import clsx from 'clsx';

const NavBar = () => {
	const classes = useStyles();
	const location = useLocation();

	const boardLinkClass = clsx(classes.link, location.pathname === currencyBoard ? classes.activeLink : classes.link);
	const converterLinkClass = clsx(classes.link, location.pathname === currencyConverter ? classes.activeLink : classes.link);

	return (
		<Grid container justifyContent='center'>
			<NavLink to='/board' className={boardLinkClass}>
				Board
			</NavLink>
			<NavLink to='/converter' className={converterLinkClass}>
				Converter
			</NavLink>
		</Grid>
	);
};

export default NavBar;
