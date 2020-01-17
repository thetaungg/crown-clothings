import { createStore, applyMiddleware} from "redux";
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';
//import thunk from "redux-thunk"; //for handling async requests
import createSagaMiddleware from 'redux-saga'

import rootSaga from "./root-saga";
import rootReducer from './root-reducer';

const sagaMiddleware = createSagaMiddleware();

// const middlewares = [thunk]; //using thunk
const middlewares = [sagaMiddleware];

if(process.env.NODE_ENV === 'development') { //to hide the middleware in production //environmental variable node set up which only has 3 possible values ('development', 'production', and 'test')
    middlewares.push(logger);               //when we do npm run build it changes into 'production'
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));
//*** it has to be here // after creating store
//sagaMiddleware.run(fetchCollectionsStart); //every sagas we want to run in components also has to go through here // this is not the same as the function we wrote in shop.actions file// it was for using inside components
//instead of doing like above
sagaMiddleware.run(rootSaga); //this contains every sagas we want to run


export const persistor = persistStore(store);