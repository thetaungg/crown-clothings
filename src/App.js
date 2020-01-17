import React from 'react';
import {Switch,Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from "reselect";

import './App.scss';

import Homepage from "./pages/homepage/Homepage.components";
import ShopPage from "./pages/shop/shop.component";
import CheckoutPage from "./pages/checkout/checkout.component";

import Header from "./components/header/header.component";
import {selectCurrentUser} from "./redux/user/user.selectors";

import { checkUserSession } from "./redux/user/user.actions";
import SignUpAndSignInPageContainer from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.container";

//import {setCurrentUser} from "./redux/user/user.actions";

class App extends React.Component {

    //unSubscribeFromAuth = null;
    componentDidMount() {
        const { checkUserSession } = this.props;
        checkUserSession();
    }

    // componentWillUnmount() {
    //     this.unSubscribeFromAuth(); //to prevent memory leaks// when we unmount our app, we want to clear auth // this is not equal to signOut
    //
    //
    // }

    render() {
        return (
            <div>
                <Header />
                <Switch> {/*switch render the first component the path matches and ignore the rest */}
                    <Route exact path='/' component={Homepage}/>
                    <Route exact path='/checkout' component={CheckoutPage}/>
                    <Route path='/shop' component={ShopPage}/>
                    <Route exact path='/signin' render={() => this.props.currentUser ?
                        (<Redirect to='/'/>) : (<SignUpAndSignInPageContainer/>) }/> {/*if the user is signedIn we are redirecting to the homepage*/}
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({ //const mapStateToProps = ({user}) => ({ //destructuring the state
    currentUser: selectCurrentUser
    //collectionsArray: selectCollectionsForPreview
});

const mapDispatchToProps = dispatch => ({
   // setCurrentUser: user => dispatch(setCurrentUser(user)) //setCurrentUser receives a user // if you change the name of the property of the object mapDispatchToProps returning, it'll still work //eg. a: user => dispatch(setCurrentUser(user)) // but you'll receive a prop called 'a' now
    checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(App); //by doing this App.js receives a prop call setCurrentUser
//connect accepts to arguments: mapStateToProps and mapDispatchToProps // mapStateToProps is for the components that need the value of the state // Dispatch is for components that need to change the state but don't use it
