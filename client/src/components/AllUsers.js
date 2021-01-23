import Axios from 'axios';
import React, {useEffect, useState} from 'react';
import history from '../history';

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  async function getAllUsers() {
    const res = await Axios.get('/get-all-users');
    // console.log(res.data);
    setUsers(res.data);
  }

  useEffect(() => {
    const login = localStorage.getItem('login');
    if (login === 'success') {
      getAllUsers();
    } else {
      history.push('/login');
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className='mx-auto w-11/12'>
      <h2 className=' text-gray-700 text-xl my-5'>
        Registered Users: {users ? users.length : 0}
      </h2>
      <table className='table-fixed pt-8'>
        <thead className='text-sm'>
          <tr>
            <th className='px-4 py-2 border border-gray-400'>id</th>
            <th className='px-4 py-2 border border-gray-400'>Name</th>
            <th className='px-4 py-2 border border-gray-400'>Phone</th>
            <th className='px-4 py-2 border border-gray-400'>Address</th>
            <th className='px-4 py-2 border border-gray-400'>Email</th>
            <th className='px-4 py-2 border border-gray-400'>Verified</th>
            <th className='px-4 py-2 border border-gray-400'>Total purchase</th>
            {/* <th className='px-4 py-2 border border-gray-400'>Ordered At</th> */}
          </tr>
        </thead>
        {users.length > 0 &&
          users.map((o, index) => (
            <tbody key={`${o.id}-${index}`}>
              <tr>
                <td className='px-4 py-2 border border-gray-400'>{o.id}</td>
                <td className='px-4 py-2 border border-gray-400'>
                  {o.first_name} {o.last_name}
                </td>
                <td className='px-4 py-2 border border-gray-400'>{o.phone}</td>
                <td className='px-4 py-2 border border-gray-400 w-32'>
                  {o.address}
                </td>
                <td className='px-4 py-2 border border-gray-400'>{o.email}</td>
                <td className='px-4 py-2 border border-gray-400'>
                  {o.isVerified}
                </td>
                <td className='px-4 py-2 border border-gray-400'>
                  {o.total_purchase}
                </td>
              </tr>
            </tbody>
          ))}
      </table>
    </div>
  );
};

export default AllUsers;
