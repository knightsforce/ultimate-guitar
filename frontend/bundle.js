//import 'babel-polyfill'
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App, {store} from './components/App';
/*
	Использовать Reales groub
*/
render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);