import ShopActionTypes from "./shop.types";
import {convertCollectionSnapshotToMap, firestore} from "../../firebase/firebase.utils";

export const fetchCollectionsStart = () => ({// if a component use this function, if its action type coincide with a saga, tha t saga will run
    type: ShopActionTypes.FETCH_COLLECTIONS_START,
});

export const fetchCollectionsSuccess = collectionsMap => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap
});

export const fetchCollectionsFailure = errorMessage => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage
});

export const fetchCollectionsStartAsync = () => { //thunk code // not needed now
    return dispatch => {//every time we want to dispatch a function instead of returning an object in redux thunk middleware gets called

        const collectionRef = firestore.collection('collections');
        dispatch(fetchCollectionsStart());//can do this because of thunk

        collectionRef.get().then(snapshot => {
            const collectionMap = convertCollectionSnapshotToMap(snapshot);
            dispatch(fetchCollectionsSuccess(collectionMap));
        })
            .catch(error => dispatch(fetchCollectionsFailure(error.message)));
    }
};
