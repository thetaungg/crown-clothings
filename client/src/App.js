import React, {useEffect} from 'react';
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

import ReactGA from 'react-ga'; //package for google analytics in react



const App = ({checkUserSession, currentUser}) => {//using hooks

    useEffect(() => {
        checkUserSession();//checkUserSession is a prop ,so, it's not gonna change
    }, [checkUserSession]); //if we leave it empty, when the user is already signed in the components will re-render again,so, useEffect will run second time

    ReactGA.initialize('UA-157015392-3'); //adding google analytics
    ReactGA.pageview(window.location.pathname + window.location.search); //this tracks all the pages that user visits in this website

    return (
        <div>
            <Header />
            <Switch> {/*switch render the first component the path matches and ignore the rest */}
                <Route exact path='/' component={Homepage}/>
                <Route exact path='/checkout' component={CheckoutPage}/>
                <Route path='/shop' component={ShopPage}/>
                <Route exact path='/signin' render={() => currentUser ?
                    (<Redirect to='/'/>) : (<SignUpAndSignInPageContainer/>) }/> {/*if the user is signedIn we are redirecting to the homepage*/}
            </Switch>
        </div>
    );
};

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
