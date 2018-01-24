import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

import App from './App.jsx';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import store from './store';

store.subscribe( () => {
    console.log('Store was change')
})

render(
    <Provider store={store} >
        <BrowserRouter>
            <Route component={App}/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('app')
)
