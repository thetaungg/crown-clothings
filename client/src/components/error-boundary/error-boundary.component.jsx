import React from 'react';
import { ErrorImageContainer, ErrorImageOverlay, ErrorImageText} from "./error-boundary.styles";

class ErrorBoundary extends React.Component{
    constructor() {
        super();
        this.state= {
            hasErrored: false
        }
    }
    static getDerivedStateFromError(error) { //for react to know this is error boundary component, we need to use these two functions
        return { hasErrored: true } //this one is to change the state when the error occurred
    }

    componentDidCatch(error, errorInfo) {//this one is to handle errors when it occurred
        console.log(error, errorInfo);
    }

    render() { //this is like a hoc // we wrap this around the components we to catch errors from
        if (this.state.hasErrored) {
            return (
                <ErrorImageOverlay> {/*the image is from this website https://www.kapwing.com/404-illustrations?ref=producthunt*/}
                    <ErrorImageContainer imageUrl={'https://i.imgur.com/yW2W9SC.png'}/>
                    <ErrorImageText>Sorry this page is broken</ErrorImageText>
                </ErrorImageOverlay>
            )
        }

        return this.props.children;
    }
}

export default ErrorBoundary;