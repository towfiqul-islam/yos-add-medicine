import React from 'react';
import './App.css';
import {Router, Route, Switch} from 'react-router-dom';
import history from './history';
import AddMedicine from './components/AddMedicine';
import AllMedicines from './components/AllMedicines';
import UpdateMedicine from './components/UpdateMedicine';
import Nav from './components/Nav';
import Login from './components/Login';
import GuestOrders from './components/GuestOrders';
import UpdateOrder from './components/UpdateOrder';

const App = () => {
  return (
    <Router history={history}>
      <Nav />
      <Switch>
        <Route exact path='/' component={AddMedicine} />
        <Route exact path='/all' component={AllMedicines} />
        <Route exact path='/update/:id' component={UpdateMedicine} />
        <Route exact path='/update-order/:id' component={UpdateOrder} />
        <Route exact path='/guest-orders' component={GuestOrders} />
        <Route exact path='/login' component={Login} />
      </Switch>
    </Router>
  );
};

export default App;
