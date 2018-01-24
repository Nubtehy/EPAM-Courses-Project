import React from 'react';
import { Link } from 'react-router';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

import Navbar from './containers/Navbar.jsx';
import TaskPage from './containers/TaskPage.jsx';
import Tasks from './containers/Tasks.jsx';
import './assets/styles/main.scss';



const FourOhFour = () => <h1>404</h1>


const App = () =>{
  return (
    <div className='App'>
        <div className='wrapper'>
          <div className='left-menu'>
            <Navbar />
          </div>
          <main>
              <div className='container'>
                <Switch>
                  <Route exact path='/tasks' component={Tasks} />
                  <Route path='/tasks/:id' component={TaskPage}/>
                  <Route component={FourOhFour}/>
                </Switch>
              </div>
          </main>
        </div>

    </div>
  );

}


export default App;