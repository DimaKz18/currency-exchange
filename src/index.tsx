import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { i18next } from './translations/i18n';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<I18nextProvider i18n={i18next}>
				<App />
			</I18nextProvider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
);
