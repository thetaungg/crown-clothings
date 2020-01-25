import React, {useState} from 'react'

import { connect } from 'react-redux'
import './sign-in.styles.scss'
import FormInput from "../formInput/formInput.component";
import CustomButton from "../custom-button/custom-button.component";
import { googleSignInStart, emailSignInStart } from "../../redux/user/user.actions";

const SignIn = ({googleSignInStart, emailSignInStart}) => { //using hooks
    const [useCredentials, setCredentials] = useState({email: '', password: ''});
    const {email, password} = useCredentials;

    const handleSubmit = async event => {
        event.preventDefault();
        emailSignInStart(email, password)
    };

    const handleChange = event => {
        const {value,name} = event.target; //if email, name=email and value = event.target.value

        setCredentials({...useCredentials, [name]: value}); //to be able to use variable as object property //we need to spread in other props because we're only changing one props
    };


    return(
        <div className='sign-in'>
            <h2 className='title'>I already have an account</h2>
            <span>Sign in with your email and password</span>

            <form onSubmit={handleSubmit}>
                <FormInput
                       name='email'
                       type='email'
                       value={email} //setting the value as the state//whenever you input the value it'll update the state
                       handleChange={handleChange}
                       label='Email'
                       required />
                <FormInput
                    name='password'
                    type='password'
                    value={password}
                    handleChange={handleChange}
                    label='Password'
                    required />
                <div className='buttons'>
                    <CustomButton type='submit'>Sign In </CustomButton>
                    <CustomButton type='button' onClick={googleSignInStart} isGoogleSignIn>Sign In With Google</CustomButton> {/*if we didn't specify type=button everything we click that button form submit will occur*/}
                </div>
            </form>
        </div>
    )
};

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email,password) => dispatch(emailSignInStart({email, password}))
});

export default connect(null, mapDispatchToProps)(SignIn);