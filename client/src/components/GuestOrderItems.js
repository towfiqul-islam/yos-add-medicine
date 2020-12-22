import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import UpdateOrderItemModal from './UpdateOrderItemModal';
import AppContext from '../context/appContext';
import AddOrderItemModal from './AddOrderItemModal';

const GuestOrderItems = ({id}) => {
  const [data, setData] = useState([]);
  const appContext = useContext(AppContext);
  const {updateModal, openUpdateModal, addModal, openAddModal} = appContext;
  async function getOrderItems() {
    const res = await axios.get(`/api/guest/get_order_items/${id}`);
    // console.log(res.data);
    setData(res.data.orderItems);
  }
  const [orderItem, setOrderItem] = useState();
  const onUpdateOrderItem = itemData => {
    openUpdateModal(true);
    setOrderItem(itemData);
  };
  const onDeleteItem = async itemId => {
    await axios.delete(`/api/guest/delete_order_item/${itemId}`);
    window.location.reload();
  };
  useEffect(() => {
    getOrderItems();
    // eslint-disable-next-line
  }, []);
  function getTotalAmount(data) {
    if (data) {
      const sum = data.reduce((acc, curr) => acc + curr.price, 0);
      const discount_amount = (sum / 100) * 3; // 3 is discount percentage
      const amount_after_discount = sum - discount_amount;
      return {sum, amount_after_discount};
    }
  }
  // console.log(getTotalAmount(data));
  return (
    <div>
      {updateModal && <UpdateOrderItemModal order_item={orderItem} />}
      {addModal && <AddOrderItemModal order_item={orderItem} />}

      <div className='flex justify-between items-center'>
        <h2 className='font-semibold my-4 text-xl'>Ordered Items</h2>
        <button
          className='bg-green-400 px-2 py-1 h-full rounded block text-sm'
          onClick={() => openAddModal(true)}
        >
          Add Order Item
        </button>
      </div>
      {data !== undefined && data.length > 0 && (
        <>
          <table className='table-fixed pt-8'>
            <thead>
              <tr>
                <th className='px-4 py-2 border border-gray-400'>id</th>
                <th className='px-4 py-2 border border-gray-400'>Item name</th>
                <th className='px-4 py-2 border border-gray-400'>Quantity</th>
                <th className='px-4 py-2 border border-gray-400'>Price</th>
                <th className='px-4 py-2 border border-gray-400'>Edit</th>
                <th className='px-4 py-2 border border-gray-400'>Delete</th>
              </tr>
            </thead>
            {data.map(item => (
              <tbody key={item.id}>
                <tr>
                  <td className='px-4 py-2 border border-gray-400'>
                    {item.id}
                  </td>
                  <td className='px-4 py-2 border border-gray-400'>
                    {item.item_name}
                  </td>
                  <td className='px-4 py-2 border border-gray-400'>
                    {item.quantity}
                  </td>
                  <td className='px-4 py-2 border border-gray-400'>
                    {item.price}
                  </td>
                  <td className='px-2 py-2 border border-gray-400'>
                    <button
                      onClick={() => onUpdateOrderItem(item)}
                      className='bg-gray-500 px-2 py-1'
                    >
                      Edit
                    </button>
                  </td>
                  <td className='px-2 py-2 border border-gray-400'>
                    <button
                      onClick={() => onDeleteItem(item.id)}
                      className='bg-red-400 px-2 py-1'
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
          <p className='mt-2 font-medium'>
            <span className='font-normal text-gray-700'>Total Amount:</span>{' '}
            {Math.round((getTotalAmount(data).sum + Number.EPSILON) * 100) /
              100}{' '}
            Tk
          </p>
          <p className='mt-2 font-medium'>
            <span className='font-normal text-gray-700'>
              Amount after discount:
            </span>{' '}
            {Math.round(
              (getTotalAmount(data).amount_after_discount + Number.EPSILON) *
                100,
            ) / 100}{' '}
            Tk
          </p>
        </>
      )}
    </div>
  );
};

export default GuestOrderItems;
