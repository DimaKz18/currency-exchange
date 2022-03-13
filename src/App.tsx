import './App.css';
import { Provider } from 'react-redux';
import { store } from './store';
import Routes from './routes';
import NavBar from './components/NavBar';

const App = () => {
	return (
		<Provider store={store}>
			<NavBar />
			<Routes />
		</Provider>
	);
};

export default App;
