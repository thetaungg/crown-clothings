import { all, call } from 'redux-saga/effects';
import {shopSagas} from "./shop/shop.sagas";
import { userSagas } from "./user/user.sagas";
import {cartSagas} from "./cart/cart.sagas";

export default function* rootSaga() { //this is for replacing middleware.run codes because if we don't they'll flood the store
    //yield fetchCollectionsStart(); //we can do it like this without using all but if we do it run multiple sagas the second line will have to wait the first one to be resolved, so imaged if the first one is long API request //>>all<< solves that
    //yield fetchCollectionsStart2();
    yield all([
        call(shopSagas),
        call(userSagas),
        call(cartSagas)
    ])
}