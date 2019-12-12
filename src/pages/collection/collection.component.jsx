import React from 'react';
import './collection.styles.scss'

import { connect } from 'react-redux';
import { selectCollection } from "../../redux/shop/shop.selectors";
import CollectionItem from "../../components/collection-item/collection-item.components";

const CollectionPage = ({ collection }) => {
    const { title, items } = collection;
    return(
    <div className='collection-page'>
        <h2 className='title'> {title} </h2>
        <div className='items'>
            {
                items.map(item => <CollectionItem key={item.id} item={item}/>)
            }
        </div>
    </div>
    )
};

const mapStateToProps = (state, ownProps) => ({ //ownProps is second optional parameter which value is the same as this.props //and remember Route always passes in match props
    collection: selectCollection(ownProps.match.params.collectionId)(state) //now we need to pass in 2 parameters // state is as usual because we didn't use createStructuredSelector // the first parameter is for the first function the selector run i.e the function that receives collectionUrlParam
});

export default connect(mapStateToProps)(CollectionPage);