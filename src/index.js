import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import Tasks from './containers/Tasks.jsx'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import store from './store'

store.subscribe( () => {
    console.log('Store was change')
})

const FourOhFour = () => <h1>404</h1>
render(
    <Provider store={store} >
        <BrowserRouter>
            <div>
                <Switch>
                    <Route exact path='/' component={Tasks}/>
                    <Route exact path='/edit/' component={Tasks}/>
                    <Route component={FourOhFour}/>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>,
    document.getElementById('app')
)
