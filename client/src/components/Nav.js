import React from 'react';
import {Link} from 'react-router-dom';

const Nav = () => {
  return (
    <div className='bg-gray-300 flex justify-center py-4'>
      <Link className='mr-12' to='/'>
        Add Medicine
      </Link>
      <Link to='/all'>All Medicines</Link>
    </div>
  );
};

export default Nav;
