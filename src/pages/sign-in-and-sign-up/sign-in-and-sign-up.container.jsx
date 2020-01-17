import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from "reselect";
import { selectIsFetching } from "../../redux/user/user.selectors";
import SignUpAndSignInPage from "./sign-in-and-sign-up.component";
import WithSpinner from "../../components/with-spinner/with-spinner.component";

const mapStateToProps = createStructuredSelector({
    isLoading: selectIsFetching
});

const SignUpAndSignInPageContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(SignUpAndSignInPage);

export default SignUpAndSignInPageContainer;