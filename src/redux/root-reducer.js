import { combineReducers} from "redux";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; //local storage

import userReducer from "./user/user.reducer";
import cartReducer from "./cart/cart.reducer";
import directoryReducer from "./directory/directory.reducer";
import shopReducer from "./shop/shop.reducer";

const persistConfig = {
    key: 'root',
    storage, //local storage
    whitelist: ['cart'] //must be exported name from combineReducers// eg. if we want to persist userReducer , we'll also add 'user'
};

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    directory: directoryReducer,
    shop: shopReducer
});

export default persistReducer(persistConfig,rootReducer); //this will return modified version of rootReducer with storage persistence
//this is can be imported by connect()()