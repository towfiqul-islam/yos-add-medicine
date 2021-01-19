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
import AppState from './context/AppState';
import AddProduct from './components/products/AddProduct';
import AllProducts from './components/products/AllProducts';
import EditProduct from './components/products/EditProduct';
import UserOrders from './components/user_orders/UserOrders';
import UpdateUserOrder from './components/user_orders/UpdateUserOrder';

const App = () => {
  return (
    <AppState>
      <Router history={history}>
        <Nav />
        <Switch>
          <Route exact path='/' component={AddMedicine} />
          <Route exact path='/all' component={AllMedicines} />
          <Route exact path='/add-product' component={AddProduct} />
          <Route exact path='/all-products' component={AllProducts} />
          <Route exact path='/edit-product/:id' component={EditProduct} />
          <Route exact path='/update/:id' component={UpdateMedicine} />
          <Route exact path='/update-order/:id' component={UpdateOrder} />
          <Route
            exact
            path='/update-user-order/:id'
            component={UpdateUserOrder}
          />
          <Route exact path='/guest-orders' component={GuestOrders} />
          <Route exact path='/user-orders' component={UserOrders} />
          <Route exact path='/login' component={Login} />
        </Switch>
      </Router>
    </AppState>
  );
};

export default App;
