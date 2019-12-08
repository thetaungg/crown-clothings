import React from 'react';
import './checkout-item.styles.scss';

import { connect } from 'react-redux';
import { clearItemFromCart,addItems,removeItem } from "../../redux/cart/cart.actions";

const CheckoutItem = ({cartItem,clearItem, addItems, removeItem}) => {
    const {name, imageUrl, price, quantity} = cartItem;
  return(
      <div className="checkout-item">
          <div className="image-container">
              <img src={imageUrl} alt='item'  />
          </div>
              <span className="name">{name}</span>
              <span className="quantity">
                  <div className="arrow" onClick={() => removeItem(cartItem)}>&#10094;</div>
                  <span className="value">{quantity}</span>
                  <div className="arrow" onClick={() => addItems(cartItem)}>&#10095;</div>
              </span>
              <span className="price">{price}</span>
          <div className="remove-button" onClick={() => clearItem(cartItem)}>&#10005;</div>  {/*UTF-8 wingdings*/}
      </div>
  )
};

const mapDispatchToProps = dispatch => ({
    clearItem: item => dispatch(clearItemFromCart(item)),
    addItems: item => dispatch(addItems(item)),
    removeItem: item => dispatch(removeItem(item))
});

export default connect(null,mapDispatchToProps)(CheckoutItem);