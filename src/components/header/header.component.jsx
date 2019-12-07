import React from 'react';
import {Link} from "react-router-dom";
import { connect } from 'react-redux';
import {createStructuredSelector} from "reselect";

import './header.styles.scss';
import {ReactComponent as Logo } from "../../assets/crown.svg";
import CartIcon from '../cart-icon/cart-icon.component'
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import { selectCartHidden} from "../../redux/cart/cart.selectors";
import { selectCurrentUser} from "../../redux/user/user.selectors";

import {auth} from "../../firebase/firebase.utils";

const Header = ({currentUser, hidden}) => (
    <div className='header'>
        <Link to='/' className='logo-container'>
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
                    <div className='option' onClick={()=> auth.signOut()}>SIGN OUT</div>
                    :<Link className='option' to={'/signin'}>SIGN IN</Link>
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


export default connect(mapStateToProps)(Header); //connect is a higher order component //the first argument receives currentUser from root-reducer,so, we don't need to pass in currentUser from App.js