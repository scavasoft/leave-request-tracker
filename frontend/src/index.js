import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import InitializationLayer from './initializationLayer';
import { Provider } from 'react-redux';
import store from "./reduxStore";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <InitializationLayer/>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your components to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();