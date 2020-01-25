import { createSelector } from 'reselect';

const selectShop = state => state.shop; //name given in root-reducer

export const selectCollections = createSelector(
    [selectShop],
    shop => shop.collections
);

export const selectCollectionsForPreview = createSelector(
    [selectCollections],
    collections => collections ? Object.keys(collections).map(key => collections[key]): [] //Object.keys turns the keys of an object into an array//so that we can map
);

export const selectCollection = collectionUrlParam => createSelector( //collectionUrlParam received from collection component
    [selectCollections],
    collections => (collections ? collections[collectionUrlParam] : null)
);

export const selectIsCollectionFetching = createSelector(
    [selectShop],
    shop => shop.isFetching
);

export const selectIsCollectionsLoaded = createSelector(
    [selectShop],
    shop => !!shop.collections //shot hand notation for checking falsy values// it's exactly the same as shop.collection ? true: false
);