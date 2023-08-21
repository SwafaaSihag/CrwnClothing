//combined place where all our redux happens, where the state lives and where we recieve actions and dispatch them into our reducers to update state.
//we generate our middleware inside the storejs and then add them in the store

import { compose, createStore, applyMiddleware } from 'redux';
// import logger from 'redux-logger';

import { rootReducer } from './root-reducer';

//making our own logger-middleware
const loggerMiddleware = (store) => (next) => (action) => {
    if(!action.type) {
        return next(action);
    }

    console.log('type: ', action.type);
    console.log('payload: ', action.payload);
    console.log('currentState: ', store.getState());

    next(action);

    console.log('next state: ', store.getState());
}

const middleWares = [loggerMiddleware];

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composedEnhancers);



