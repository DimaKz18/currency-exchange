import { CircularProgress, Grid } from '@material-ui/core';
import { useStyles } from './styles';
import clsx from 'clsx';

type Props = {
	className?: string;
	fullScreen?: boolean;
	centred?: boolean;
	size?: number;
};

const CentredCircularProgress = (props: Props) => {
	const classes = useStyles();
	const progressClass = clsx(classes.progress, props.className);

	const renderLogo = () => {
		return <CircularProgress className={progressClass} size={props.size} />;
	};

	return (
		<Grid container justifyContent='center' alignItems='center' className={props.fullScreen ? classes.fullScreen : ''}>
			{renderLogo()}
		</Grid>
	);
};

export default CentredCircularProgress;
