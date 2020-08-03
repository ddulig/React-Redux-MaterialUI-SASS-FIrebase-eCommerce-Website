import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/createStore';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import App from './App';

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#000000'
		},
		secondary: {
			main: '#D9A404'
		}
	},

	typography: {
		fontFamily: ['Ubuntu', 'Raleway'].join(',')
	},
	spacing: 10
});

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<MuiThemeProvider theme={theme}>
				<App />
			</MuiThemeProvider>
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
);
