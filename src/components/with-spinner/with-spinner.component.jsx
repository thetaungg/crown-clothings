import React from 'react';

import { SpinnerContainer, SpinnerOverlay} from "./with-spinner.styles";

const WithSpinner = WrappedComponent => ({isLoading, ...otherProps}) => { //higher order component that returns modified component if you pass in a component
    return isLoading ? (
        <SpinnerOverlay>
            <SpinnerContainer/>
        </SpinnerOverlay>
    ) : (
        <WrappedComponent {...otherProps}/>
    )
};

export default WithSpinner;