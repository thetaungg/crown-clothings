import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, persistor } from "./redux/store";
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <PersistGate persistor={persistor}> {/*loading is optional to show loading screen when the persist is loading eg. loading={<Loading/>}*/}
                <App />
            </PersistGate>
        </BrowserRouter>
    </Provider>
    ,
    document.getElementById('root'));
