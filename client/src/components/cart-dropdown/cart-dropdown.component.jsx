import React from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from "reselect";
import {withRouter} from 'react-router-dom';

import CustomButton from "../custom-button/custom-button.component";
import CartItem from "../cart-item/cart-item.component";
import {selectCartItems} from "../../redux/cart/cart.selectors";

import './cart-dropdown.styles.scss';
import {toggleCartHidden} from "../../redux/cart/cart.actions";

const CartDropdown = ({cartItems, history,dispatch}) => ( //connect pass down dispatch props if we didn't add in the second parameter
    <div className="cart-dropdown">
        <div className="cart-items">
            {cartItems.length ?
                cartItems.map(cartItem => <CartItem key={cartItem.id} item={cartItem}/>)
                : <span className='empty-message'>Your cart is empty</span>
            }
        </div>
            <CustomButton onClick={() => {
                history.push('/checkout');
                dispatch(toggleCartHidden()); // for dropdown menu to disappear on Click
            }}>GO TO CHECKOUT</CustomButton> {/* on button click go to checkout page */}
    </div>
);

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
});

export default withRouter(connect(mapStateToProps)(CartDropdown)); //with router is another higher order component // to use routing with buttons we need this