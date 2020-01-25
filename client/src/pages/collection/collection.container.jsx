import { connect } from 'react-redux';
import { createStructuredSelector } from "reselect";
import {compose} from "redux";

import WithSpinner from "../../components/with-spinner/with-spinner.component";
import CollectionPage from "./collection.component";
import { selectIsCollectionsLoaded} from "../../redux/shop/shop.selectors";

const mapStateToProps = createStructuredSelector({
    isLoading: state => !selectIsCollectionsLoaded(state) //selectIsCollectionsLoaded is a boolean value and the selectors need to be functions ,so, we make it a function
}); //remember, state is the props that automatically pass down from createStructuredSelector so that we don't need to do it manually

const CollectionPageContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(CollectionPage);

export default CollectionPageContainer;