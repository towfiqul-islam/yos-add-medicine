import React, {useState} from 'react';
import axios from 'axios';

import history from '../history';

const Login = () => {
  const [admin, setAdmin] = useState({
    username: '',
    password: '',
  });

  const {username, password} = admin;
  const onChange = e => {
    setAdmin({...admin, [e.target.name]: e.target.value});
  };
  const onLogin = async () => {
    if (username === 'admin' && password === 'admin') {
      const res = await axios.post('/login', admin);
      if (res.data.msg === 'login successful') {
        localStorage.setItem('login', 'success');
        history.push('/');
      }
    } else {
      alert('Inavalid username or password!!');
    }
  };
  return (
    <>
      <h2 className='text-center text-xl font-medium mt-12'>Login</h2>
      <div className='flex justify-center'>
        <div>
          <label className='block mt-8' htmlFor='username'>
            Username
          </label>
          <input
            className='block border border-gray-600 px-2 py-1 rounded w-64'
            type='text'
            id='username'
            name='username'
            value={username}
            onChange={onChange}
          />
          <label className='block mt-4' htmlFor='password'>
            Password
          </label>
          <input
            className='block border border-gray-600 px-2 py-1 rounded w-64'
            type='password'
            id='password'
            name='password'
            value={password}
            onChange={onChange}
          />
          <button
            className='block bg-blue-300 px-6 py-1 rounded mt-8 mx-auto'
            onClick={onLogin}
          >
            Login
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
