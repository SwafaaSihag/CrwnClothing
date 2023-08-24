//combined place where all our redux happens, where the state lives and where we recieve actions and dispatch them into our reducers to update state.
//we generate our middleware inside the storejs and then add them in the store

import { compose, createStore, applyMiddleware } from 'redux';
//you can also use your own middleware logger 
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

import { rootReducer } from './root-reducer';

const persistConfig = {
    key:'root',
    storage,
    whitelist:['cart'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

//check section 15, lecture 170
const middleWares = [process.env.NODE_ENV === 'development' && logger, thunk].filter(Boolean);

const composeEnhanser = 
(process.env.NODE_ENV !== 'production' && 
window && 
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || 
compose;

const composedEnhancers = composeEnhanser(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composedEnhancers);

export const persistor = persistStore(store);



