import './App.css';
import { Provider } from 'react-redux';
import { store } from './store';
import Routes from './routes';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './components/NavBar';

const App = () => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<NavBar />
				<Routes />
			</BrowserRouter>
		</Provider>
	);
};

export default App;
