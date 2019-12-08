import { createSelector } from 'reselect';

const selectCart = state => state.cart;

export const selectCartItems = createSelector(
    [selectCart], //input selector
    (cart => cart.cartItems) //output selector
);

export const selectCartItemsCount = createSelector( //without this cart-icon component will rerender every time the state changes
    [selectCartItems],
    cartItems => cartItems.reduce(
    (accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.quantity, 0) //javascript reduce function // 0 is initial accumulated Quantity
);

export const selectCartHidden = createSelector(
    [selectCart],
    cart => cart.hidden
);

export const selectCartTotal = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce(
        (accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.quantity * cartItem.price, 0)
    );
