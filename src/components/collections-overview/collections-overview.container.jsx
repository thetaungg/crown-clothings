import {connect} from 'react-redux';
import { compose } from "redux";
import { createStructuredSelector } from "reselect";


import {selectIsCollectionFetching} from "../../redux/shop/shop.selectors";

import WithSpinner from "../with-spinner/with-spinner.component";
import CollectionOverview from "./collections-overview.component";

const mapStateToProps = createStructuredSelector({
    isLoading: selectIsCollectionFetching //property name should be the same as with-spinner's destructured props name which is isLoading
});                                         //the point is we can name is anything we want

//export const CollectionsOverviewContainer = connect(mapStateToProps)(WithSpinner(CollectionOverview)); //mapStateToProps is actually passing into WithSpinner hoc //so this container component is already packed with withSpinner which props are being passed from another hoc//connect
const CollectionsOverviewContainer = compose(//the same as above line
    connect(mapStateToProps), //in here goes the functions which we want to wrapped around CollectionOverview which is in separate brackets
    WithSpinner
)(CollectionOverview);

export default CollectionsOverviewContainer;