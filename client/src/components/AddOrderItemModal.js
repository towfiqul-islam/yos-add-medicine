import React, {useContext, useState} from 'react';
import AppContext from '../context/appContext';
import axios from 'axios';
import {useParams} from 'react-router-dom';

const AddOrderItemModal = ({order_item}) => {
  const {id} = useParams();
  const appContext = useContext(AppContext);
  const {openAddModal} = appContext;

  const [orderItem, setOrderItem] = useState({
    item_name: '',
    quantity: '',
    price: '',
    order_id: id,
  });

  const {item_name, quantity, price} = orderItem;

  const onChange = e => {
    setOrderItem({...orderItem, [e.target.name]: e.target.value});
  };

  const onAdd = async () => {
    const itemData = {
      item_name: item_name,
      quantity: parseInt(quantity),
      price: parseFloat(price),
      order_id: id,
    };
    await axios.post(`/api/guest/add_order_item`, itemData);
    openAddModal(false);
    window.location.reload();
  };

  return (
    <div>
      <div
        onClick={() => {
          openAddModal(false);
        }}
        className='top-0 left-0 fixed bg-black bg-opacity-75 z-40 h-screen w-full'
      ></div>

      <div
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        className='fixed sm:w-1/3 w-11/12  pb-8 px-4 z-50 text-lg mx-auto bg-white text-gray-700  rounded'
      >
        <div className='flex justify-center w-full'>
          <div>
            <h2 className='my-4'>Add order item</h2>
            <label className='block mt-4' htmlFor='item_name'>
              Item Name
            </label>
            <input
              className='bg-gray-400 px-2 py-1'
              type='text'
              id='item_name'
              name='item_name'
              onChange={onChange}
              value={item_name}
            />
            <label className='block mt-4' htmlFor='quantity'>
              Quantity
            </label>
            <input
              className='bg-gray-400 px-2 py-1'
              type='number'
              id='quantity'
              name='quantity'
              onChange={onChange}
              value={quantity}
            />
            <label className='block mt-4' htmlFor='price'>
              Unit Price
            </label>
            <input
              className='bg-gray-400 px-2 py-1'
              type='number'
              id='price'
              name='price'
              onChange={onChange}
              value={price}
            />
            <button
              onClick={onAdd}
              className='bg-blue-300 rounded mt-4 px-2 py-1 block mx-auto'
            >
              Add Order item
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddOrderItemModal;
