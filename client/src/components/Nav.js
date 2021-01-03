import React, {useState} from 'react';
import {Link} from 'react-router-dom';

import history from '../history';

const Nav = () => {
  const [menu, setMenu] = useState(false);
  const onLogout = () => {
    localStorage.removeItem('login');
    setMenu(false);
    history.push('/login');
  };
  return (
    <div className='bg-gray-300 '>
      <div className='sm:flex justify-center py-4  sm:w-3/4 w-11/12 mx-auto'>
        <span onClick={() => setMenu(!menu)} className='flex-grow sm:hidden'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            height='24'
            viewBox='0 0 24 24'
            width='24'
          >
            <path d='M0 0h24v24H0V0z' fill='none' />
            <path d='M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z' />
          </svg>
        </span>
        <div className='hidden sm:block'>
          <Link className='mr-12' to='/'>
            Add Medicine
          </Link>
          <Link className='mr-12' to='/all'>
            All Medicines
          </Link>
          <Link className='mr-12' to='/add-product'>
            Add Product
          </Link>
          <Link className='mr-12' to='/all-products'>
            All Products
          </Link>
          <Link className='mr-12' to='/guest-orders'>
            Guest Orders
          </Link>
          <button onClick={onLogout}>Logout</button>
        </div>
        <div className={` ${menu ? 'block' : 'hidden'}`}>
          <Link onClick={() => setMenu(false)} className='mt-4 block' to='/'>
            Add Medicine
          </Link>
          <Link onClick={() => setMenu(false)} className='mt-4 block' to='/all'>
            All Medicines
          </Link>
          <Link
            onClick={() => setMenu(false)}
            className='mt-4 block'
            to='/add-product'
          >
            Add Product
          </Link>
          <Link
            onClick={() => setMenu(false)}
            className='mt-4 block'
            to='/all-products'
          >
            All Products
          </Link>
          <Link
            onClick={() => setMenu(false)}
            className='mt-4 block'
            to='/guest-orders'
          >
            Guest Orders
          </Link>
          <button className='mt-4' onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Nav;
