import React from 'react';

export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {

        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.log('React info for crash: ', info);
        console.error('React ErrorBoundary message: ', error);
    }

    render() {
        if (this.state.hasError) {

            return (
                <>
                    <h3>The page you are looking for could not be found 😢</h3>
                    <a href="/">&larr; Go back</a>
                </>
            );
        }

        return this.props.children;
    }
}