import * as routes from './routes';
import loadable from '@loadable/component';
import { Redirect, Route, Switch } from 'react-router-dom';
import LoadableFallback from '../components/common/LoadableFallback';

const AsyncCurrencyBoard = loadable(() => import('../components/CurrencyBoard/index'), {
	fallback: <LoadableFallback />,
});

const AsyncCurrencyConverter = loadable(() => import('../components/CurrencyConverter/index'), {
	fallback: <LoadableFallback />,
});

const Routes = () => {
	return (
		<Switch>
			<Route exact path={routes.currencyBoard} component={AsyncCurrencyBoard} />
			<Route exact path={routes.currencyConverter} component={AsyncCurrencyConverter} />

			<Route>
				<Redirect to={routes.currencyBoard} />
			</Route>
		</Switch>
	);
};

export default Routes;
