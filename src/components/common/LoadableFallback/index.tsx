import { useState } from 'react';
import { Box } from '@material-ui/core';
import CentredCircularProgress from '../CentredCircularProgress';
import { useMountEffect } from '../../../hooks';
import { BackgroundDarkColor } from '../../../utils';

const SHOW_LOADING_INDICATOR_DELAY = 200;

const LoadableFallback = () => {
	const [showLoadingIndicator, setShowLoadingIndicator] = useState(false);

	useMountEffect(() => {
		const timerId = window.setTimeout(() => setShowLoadingIndicator(true), SHOW_LOADING_INDICATOR_DELAY);
		return () => {
			clearTimeout(timerId);
		};
	});

	return (
		<Box height='100vh' bgcolor={BackgroundDarkColor}>
			{showLoadingIndicator && <CentredCircularProgress centred fullScreen />}
		</Box>
	);
};

export default LoadableFallback;
