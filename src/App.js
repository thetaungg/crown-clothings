import React from 'react';
import {Switch,Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from "reselect";

import './App.css';

import Homepage from "./pages/homepage/Homepage.components";
import ShopPage from "./pages/shop/shop.component";
import CheckoutPage from "./pages/checkout/checkout.component";

import Header from "./components/header/header.component";
import SignUpAndSignInPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import {selectCurrentUser} from "./redux/user/user.selectors";

import {auth, createUserProfileDocument} from "./firebase/firebase.utils";
import {setCurrentUser} from "./redux/user/user.actions";

class App extends React.Component {

    unSubscribeFromAuth = null;
    componentDidMount() {
        const {setCurrentUser} = this.props; // be sure to use setCurrentUser from props not imported setCurrentUser

        this.unSubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
            if (userAuth){
                const userRef = await createUserProfileDocument(userAuth); //userRef getting back by sending userAuth from createUserProfileDocument method we created which is all the information of the user logged in

                userRef.onSnapshot(snapShot => { //getting user's data
                    //console.log(snapShot.data()); //snapShot.data gives back all the information stored in for the user in database
                    setCurrentUser({
                            id: snapShot.id, //id is not in the snapShot.data()
                            ...snapShot.data()
                        }
                    );
                    // console.log(this.state)
                })
            }else {
                setCurrentUser(userAuth); //if the user failed to sign in userAuth is the same as null
            }
        });
    }

    componentWillUnmount() {
        this.unSubscribeFromAuth(); //to prevent memory leaks// when we unmount our app, we want to clear auth // this is not equal to signOut


    }

    render() {
        return (
            <div>
                <Header />
                <Switch> {/*switch render the first component the path matches and ignore the rest */}
                    <Route exact path='/' component={Homepage}/>
                    <Route exact path='/checkout' component={CheckoutPage}/>
                    <Route path='/shop' component={ShopPage}/>
                    <Route exact path='/signin' render={() => this.props.currentUser ?
                        (<Redirect to='/'/>) : (<SignUpAndSignInPage/>) }/> {/*if the user is signedIn we are redirecting to the homepage*/}
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({ //const mapStateToProps = ({user}) => ({ //destructuring the state
    currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user)) //setCurrentUser receives a user // if you change the name of the property of the object mapDispatchToProps returning, it'll still work //eg. a: user => dispatch(setCurrentUser(user)) // but you'll receive a prop called 'a' now
});

export default connect(mapStateToProps,mapDispatchToProps)(App); //by doing this App.js receives a prop call setCurrentUser
//connect accepts to arguments: mapStateToProps and mapDispatchToProps // mapStateToProps is for the components that need the value of the state // Dispatch is for components that need to change the state but don't use it
