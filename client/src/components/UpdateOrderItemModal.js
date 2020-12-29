import React, {useContext, useState, useEffect} from 'react';
import AppContext from '../context/appContext';
import axios from 'axios';

const UpdateOrderItemModal = ({order_item}) => {
  const appContext = useContext(AppContext);
  const {openUpdateModal} = appContext;

  const [unitPrice, setUnitPrice] = useState(0);

  const [orderItem, setOrderItem] = useState({
    ...order_item,
    price: unitPrice,
  });

  const {id, item_name, quantity} = orderItem;

  const onChange = e => {
    setOrderItem({...orderItem, [e.target.name]: e.target.value});
  };

  const onUpdate = async () => {
    const itemData = {
      item_name: item_name,
      quantity: parseInt(quantity),
      price: unitPrice,
    };
    await axios.put(`/api/guest/update_order_item/${id}`, itemData);
    openUpdateModal(false);
    window.location.reload();
  };

  const getUnitPrice = async () => {
    const res = await axios.get(`/get_unit_price/${item_name}`);
    // console.log(res.data);
    // return res.data.unit_price;
    setUnitPrice(res.data.unit_price);
  };

  useEffect(() => {
    getUnitPrice();
    setOrderItem({
      ...orderItem,
      price: unitPrice,
    });
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div
        onClick={() => {
          openUpdateModal(false);
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
          <div className='w-full'>
            <h2 className='my-4 text-center'>
              Update order Item - {order_item.id}
            </h2>
            <label className='block mt-4' htmlFor='item_name'>
              Item Name
            </label>
            <input
              className='bg-gray-300 px-2 py-1 w-11/12'
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
              className='bg-gray-300 px-2 py-1 w-11/12'
              type='number'
              id='quantity'
              name='quantity'
              onChange={onChange}
              value={quantity}
            />
            <div className='mt-2'>
              <p className='text-gray-600'>
                Unit Price: {unitPrice > 0 && unitPrice}
              </p>
              <p className='mt-2'>
                Total Price: {unitPrice > 0 && unitPrice * quantity}
              </p>
            </div>
            {/* <label className='block mt-4' htmlFor='price'>
              Unit Price
            </label>
            <input
              className='bg-gray-300 px-2 py-1 w-11/12'
              type='number'
              id='price'
              name='price'
              onChange={onChange}
              value={price}
            /> */}
            <button
              onClick={onUpdate}
              className='bg-blue-300 rounded mt-4 px-2 py-1 block mx-auto font-semibold text-sm'
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateOrderItemModal;
