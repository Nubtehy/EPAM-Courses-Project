import React from 'react';
import { Link } from 'react-router';

const App = React.createClass({
    render() {
        return (
            <div className='App'>
                {this.props.children}
            </div>
        );
    },
});

export default App;