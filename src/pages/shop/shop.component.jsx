import React from 'react';
import { Route } from 'react-router-dom'
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";

import CollectionPage from "../collection/collection.component";

const  ShopPage = ({ match }) => ( //one of the three props Route passed into ShopPage in App.js
        <div className='shop-page'>
            <Route exact path={`${match.path}`} component={CollectionsOverview} />
            <Route path={`${match.path}/:collectionId`} component={CollectionPage}/> {/*if we want to make the url varying we don't want to make Route of ShopPage *exact* */}
        </div>
    );

export default ShopPage;