import React from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import './App.css';
import AddMedicine from './components/AddMedicine';
import AllMedicines from './components/AllMedicines';
import Nav from './components/Nav';
import UpdateMedicine from './components/UpdateMedicine';
import history from './history';

function App() {
  return (
    <Router history={history}>
      <Nav />
      <Switch>
        <Route exact path='/' component={AddMedicine} />
        <Route exact path='/all' component={AllMedicines} />
        <Route exact path='/update/:id' component={UpdateMedicine} />
      </Switch>
    </Router>
  );
}

export default App;
