import React from 'react';

import { connect } from 'react-redux';
import {createStructuredSelector} from "reselect";
import { Link } from 'react-router-dom';

import './header.styles.scss'
import {ReactComponent as Logo } from "../../assets/crown.svg";
import CartIcon from '../cart-icon/cart-icon.component'
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import { selectCartHidden} from "../../redux/cart/cart.selectors";
import { selectCurrentUser} from "../../redux/user/user.selectors";

import { signOutStart } from "../../redux/user/user.actions";

const Header = ({currentUser, hidden, signOutStart}) => (
    <div className='header'>
        <Link className='logo-container' to='/'>
            <Logo className='logo'/>
        </Link>
        <div className='options'>
            <Link className='option' to='/shop'>
                SHOP
            </Link>
            <Link className='option' to='/shop'>
                CONTACT
            </Link>
            {
                currentUser ?
                    <div className='option' onClick={signOutStart}>SIGN OUT</div>
                    :<Link  className='option option__sign-in' to={'/signin'}>SIGN IN</Link>
            }
            <CartIcon/>
        </div>
        {hidden ?
            null
            : <CartDropdown/>
        }
    </div>
);

// const mapStateToProps = ({user: {currentUser},cart: {hidden}} ) => ({  // advanced destructuring // currentUser comes from state.user.currentUser and hidden come from state.cart.hidden
//     currentUser,
//     hidden
// });

// const mapStateToProps = (state) => ({
//     currentUser: selectCurrentUser(state),
//     hidden: selectCartHidden(state)
// });

//instead of doing like above // we use createStructuredSelector which does exact the same thing
const mapStateToProps = createStructuredSelector({ // this'll automatically pass the state to each selector
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
});

const mapDispatchToProps = dispatch => ({
    signOutStart: () => dispatch(signOutStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header); //connect is a higher order component //the first argument receives currentUser from root-reducer,so, we don't need to pass in currentUser from App.js