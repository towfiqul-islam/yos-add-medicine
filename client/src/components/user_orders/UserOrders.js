import Axios from 'axios';
import React, {useEffect, useState} from 'react';
import history from '../../history';
import {discount} from '../../utils';

const UserOrders = () => {
  const [orders, setOrders] = useState([]);

  async function getAllOrders() {
    const res = await Axios.get('/api/user/get_orders');
    // console.log(res.data);
    setOrders(res.data.orders);
  }

  useEffect(() => {
    const login = localStorage.getItem('login');
    if (login === 'success') {
      getAllOrders();
    } else {
      history.push('/login');
    }
    // eslint-disable-next-line
  }, []);
  const onUpdateOrder = id => {
    history.push(`/update-user-order/${id}`);
  };
  return (
    <div className='mx-auto w-11/12'>
      <h2 className=' text-gray-700 text-xl my-5'>
        User Orders... Sorted by most recent
      </h2>
      <table className='table-fixed pt-8'>
        <thead className='text-sm'>
          <tr>
            <th className='px-4 py-2 border border-gray-400'>id</th>
            <th className='px-4 py-2 border border-gray-400'>Name</th>
            <th className='px-4 py-2 border border-gray-400'>Phone</th>
            <th className='px-4 py-2 border border-gray-400'>Address</th>
            <th className='px-4 py-2 border border-gray-400'>Prescription</th>
            {/* <th className='px-4 py-2 border border-gray-400'>Ordered At</th> */}
            <th className='px-4 py-2 border border-gray-400'>
              Delivery Status
            </th>
            <th className='px-4 py-2 border border-gray-400'>Payment Status</th>
            <th className='px-4 py-2 border border-gray-400'>Total amount</th>
            <th className='px-4 py-2 border border-gray-400'>
              Amount after disc - {discount}%
            </th>
            <th className='px-4 py-2 border border-gray-400'>Update</th>
          </tr>
        </thead>
        {orders.length > 0 &&
          orders.map((o, index) => (
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
                <td className='px-4 py-2 border border-gray-400'>
                  {o.prescription !== '' ? (
                    <a
                      className='underline text-blue-700'
                      href={o.prescription}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      Click to see
                    </a>
                  ) : (
                    <span className='text-red-600'>Not uploaded</span>
                  )}
                </td>
                {/* <td className='px-4 py-2 border border-gray-400'>
                  {o.ordered_at}
                </td> */}
                <td className='px-4 py-2 border border-gray-400'>
                  {o.delivery_status}
                </td>
                <td className='px-4 py-2 border border-gray-400'>
                  {o.payment_status}
                </td>
                <td className='px-4 py-2 border border-gray-400'>
                  {o.total_amount}
                </td>
                <td className='px-4 py-2 border border-gray-400 w-32'>
                  {o.amount_after_discount}
                </td>
                <td className='px-4 py-2 border border-gray-400'>
                  <button
                    onClick={() => onUpdateOrder(o.id)}
                    className='bg-gray-400 px-2 py-1 rounded'
                  >
                    Update
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
      </table>
    </div>
  );
};

export default UserOrders;
