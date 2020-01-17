import { takeEvery, put, call, all } from 'redux-saga/effects'
import ShopActionTypes from "./shop.types";
import {convertCollectionSnapshotToMap, firestore} from "../../firebase/firebase.utils";
import {fetchCollectionsFailure, fetchCollectionsSuccess} from "./shop.actions";

export function* fetchCollectionsAsync() { //using generator function //this replaces fetchCollectionsStartAsync function in shop.actions
    // yield console.log('I am fired')
    //this is similar to Async await function
    try{
        const collectionRef = firestore.collection('collections');
        const snapShot = yield collectionRef.get();
       // const collectionMap = convertCollectionSnapshotToMap(snapShot); //we can do it like this
        const collectionMap =yield call(convertCollectionSnapshotToMap, snapShot);//but this way with yield and call, redux can cancel our request if we want, we can use takeLatest to only use action that fired latest// and call function is for informing redux-saga that the function inside of it is to run and it is a function
        yield put(fetchCollectionsSuccess(collectionMap)); //put is exactly like dispatch in redux-thunk //inside the brackets go actions

    }catch (errorMessage) {
        yield put(fetchCollectionsFailure(errorMessage))
    }
}

export function* fetchCollectionsStart() { //this function is for using in redux store // to use in redux component, we write redux actions with the same action type specified here, names doesn't necessarily need to match, only action types matters**// which we usually write in our actions file
    yield takeEvery( //takeEvery use non-blocking calls // and if an action gets fired multiple times// this run every actions //but with takeLatest, it only run the latest action and cancels the first ones// it can cancel actions because of yields
        ShopActionTypes.FETCH_COLLECTIONS_START,
        fetchCollectionsAsync
    )
}

export function* shopSagas() {
    yield all([
        call(fetchCollectionsStart)
    ])
}

