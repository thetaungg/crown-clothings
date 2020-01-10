import { createStore, applyMiddleware} from "redux";
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';
import thunk from "redux-thunk"; //for handling async requests

import rootReducer from './root-reducer';

const middlewares = [thunk];

if(process.env.NODE_ENV === 'development') { //to hide the middleware in production //environmental variable node set up which only has 3 possible values ('development', 'production', and 'test')
    middlewares.push(logger);               //when we do npm run build it changes into 'production'
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));
export const persistor = persistStore(store);