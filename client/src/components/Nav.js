import React from 'react';
import {Link} from 'react-router-dom';

import history from '../history';

const Nav = () => {
  const onLogout = () => {
    localStorage.removeItem('login');
    history.push('/login');
  };
  return (
    <div className='bg-gray-300 flex justify-center py-4'>
      <Link className='mr-12' to='/'>
        Add Medicine
      </Link>
      <Link className='mr-12' to='/all'>
        All Medicines
      </Link>
      <Link className='mr-12' to='/guest-orders'>
        Guest Orders
      </Link>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default Nav;
