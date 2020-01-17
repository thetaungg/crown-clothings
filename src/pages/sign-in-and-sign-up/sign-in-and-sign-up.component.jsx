import React from 'react';
import './sign-in-and-sign-up.styles.scss';
import SignIn from "../../components/signin/sign-in.component";
import SignUp from "../../components/sign-up/sign-up.component";

const SignUpAndSignInPage = () => (
    <div className='sign-in-and-sign-up'>
        <SignIn />
        <SignUp />
    </div>
);

//const SignUpAndSignInPageWithSpinner = WithSpinner(SignUpAndSignInPageForSpinner);

// const SignUpAndSignInPage = ({isFetching}) => (
//     <SignUpAndSignInPageWithSpinner isLoading={isFetching}/>
// );
//
// const mapStateToProps = createStructuredSelector({
//     isFetching: selectIsFetching
// });

export default SignUpAndSignInPage;