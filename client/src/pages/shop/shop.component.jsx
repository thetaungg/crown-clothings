import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';

import CollectionsOverviewContainer from "../../components/collections-overview/collections-overview.container";
import CollectionPageContainer from "../collection/collection.container";

import { connect } from 'react-redux';
import { fetchCollectionsStart } from "../../redux/shop/shop.actions";

const  ShopPage = ({match, fetchCollectionsStart}) => {

    // componentDidMount() {
    //     const { fetchCollectionsStartAsync } = this.props;
    //     fetchCollectionsStartAsync(); //using redux-thunk //this is async request
    // }
    useEffect(() => {
        fetchCollectionsStart(); //using redux-saga
    }, [fetchCollectionsStart]); //same argument as in the App

    //const { match } = this.props; //one of the three props Route passed into ShopPage in App.js
    return(
        <div className='shop-page'>
            <Route exact path={`${match.path}`}
                   component={CollectionsOverviewContainer} />
            {/*<Route path={`${match.path}/:collectionId`}*/}
            {/*       render={(props) => <CollectionPageWithSpinner //this doesn't work with isCollectionFetching because the value we get for that is async request inside of componentdidmount which runs after render method, so, the state of fetching is only updated after we rendered the components,so, the loading doesn't appear*/}
            {/*           isLoading={!isCollectionsLoaded} {...props} /> }/> /!*if we want to make the url varying we don't want to make Route of ShopPage *exact* *!/*/}
            <Route path={`${match.path}/:collectionId`}
                   component={CollectionPageContainer} />
        </div>
    )
};
const mapDispatchToProps = dispatch => ({//with saga
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart()) //******
});

// const mapDispatchToProps = dispatch => ({//with thunk
//     fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync()) //*******
// });

export default connect(null, mapDispatchToProps)(ShopPage);