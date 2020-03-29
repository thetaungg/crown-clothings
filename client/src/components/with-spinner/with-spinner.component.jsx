import React from 'react';
import Spinner from "../spinner/spinner.component";

const WithSpinner = WrappedComponent => ({isLoading, ...otherProps}) => { //higher order component that returns modified component if you pass in a component
    return isLoading ? <Spinner/> : <WrappedComponent {...otherProps}/>
};

export default WithSpinner;