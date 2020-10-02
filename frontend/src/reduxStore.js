import { applyMiddleware, compose, createStore as createReduxStore } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';


const middleware = [
    thunk,
    // Chain more middleWares here
];

let composeEnhancers = compose;

if ( process.env.NODE_ENV === 'development' ) {
    if ( typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function' ) {
        composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    }
}

const createStore = () => {
    const store = createReduxStore(
        reducers,
        composeEnhancers(
            applyMiddleware(...middleware),
        ),
    );

    if ( process.env.NODE_ENV !== 'production' && module.hot ) {
        module.hot.accept('./reducers', () => {
            store.replaceReducer(reducers);
        });
    }

    if ( process.env.NODE_ENV === 'development' ) {
        window.store = store;
    }

    return store;
};


const store = createStore();

export default store;
