import React from 'react';
import './cart-item.styles.scss';

const CartItem = ({item : {imageUrl, price, name, quantity}}) => {
    //console.log('rendered'); check with this to see how many time this gets re-rendered
    return (
        <div className='cart-item'>
            <img src={imageUrl} alt="item"/>
            <div className='item-details'>
                <span className='name'>{name}</span>
                <span className='price'>
                    {quantity} x ${price}</span>
            </div>
        </div>
    )
};
//this component get re-rendered every time the cartItem array changes. In another words, every time its parent gets re-rendered
export default React.memo(CartItem); //we don't want that , so, we use react memo to memoize the props and only re-render the component if the props changes