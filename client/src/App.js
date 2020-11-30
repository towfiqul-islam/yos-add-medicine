import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import AddMedicine from './components/AddMedicine';
import AllMedicines from './components/AllMedicines';
import Nav from './components/Nav';

function App() {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route exact path='/' component={AddMedicine} />
        <Route exact path='/all' component={AllMedicines} />
      </Switch>
    </Router>
  );
}

export default App;
