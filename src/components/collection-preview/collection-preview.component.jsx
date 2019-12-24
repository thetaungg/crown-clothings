import React from 'react';
import './collection-preview.styles.scss'
import CollectionItem from "../collection-item/collection-item.components";
import {withRouter} from 'react-router-dom';

const CollectionsPreview = ({title,items, history, match}) => (
    <div className='collection-preview'>
        <h1 className='title' onClick={() => history.push(`${match.url}/${title.toLowerCase()}`)}> {title.toUpperCase()}</h1>
        <div className='preview'>
            {items
                .filter((item,index) => index<4)//making sure there are only 4 items each (remember index starts from 0)
                .map(item => (
                    <CollectionItem key={item.id} item={item}/>
                ))
            }
        </div>
    </div>
);

export default withRouter(CollectionsPreview);