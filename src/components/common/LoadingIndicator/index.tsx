import { ReactNode } from 'react';
import CentredCircularProgress from '../CentredCircularProgress';

type Props = {
	show: boolean;
	children?: ReactNode;
	fullScreen?: boolean;
	className?: string;
	size?: number;
	centred?: boolean;
};

const LoadingIndicator = (props: Props) => {
	const { show, children, fullScreen, size, className, centred } = props;

	return show ? <CentredCircularProgress className={className} centred={centred} fullScreen={fullScreen} size={size} /> : <> {children} </>;
};

export default LoadingIndicator;
