import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import history from '../history';
import axios from 'axios';
import GuestOrderItems from './GuestOrderItems';
import {discount} from '../utils';

const UpdateOrder = () => {
  const {id} = useParams();

  const [totalAmount, setTotalAmount] = useState(0);
  async function getOrderItems() {
    const res = await axios.get(`/api/guest/get_order_items/${id}`);

    getTotalAmount(res.data.orderItems);
  }
  function getTotalAmount(data) {
    if (data) {
      const sum = data.reduce((acc, curr) => acc + curr.price, 0);
      const discount_amount = (sum / 100) * discount;
      const amount_after_discount = sum - discount_amount;
      setTotalAmount(Math.round((sum + Number.EPSILON) * 100) / 100);
      return {sum, amount_after_discount};
    }
  }
  const [singleOrder, setSingleOrder] = useState({
    guest_name: '',
    delivery_status: '',

    customer_prescription: '',
    total_amount: totalAmount,
  });
  const [image, setImage] = useState('');
  const {
    customer_name,
    delivery_status,

    customer_prescription,
  } = singleOrder;

  async function getSingleOrder(id) {
    const res = await axios.get(`/api/guest/get_single_order/${id}`);
    setSingleOrder({
      customer_name: res.data.order.customer_name,
      delivery_status: res.data.order.delivery_status,

      customer_prescription: res.data.order.customer_prescription,
      total_amount: totalAmount > 0 && totalAmount,
    });
  }
  const onChange = e => {
    setSingleOrder({...singleOrder, [e.target.name]: e.target.value});
  };
  const onFileChange = async e => {
    setImage(e.target.files[0]);
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    formData.append('upload_preset', 'yos-prescription');
    const res = await axios.post(
      'https://api.cloudinary.com/v1_1/yos/image/upload',
      formData,
    );
    setSingleOrder({
      ...singleOrder,
      customer_prescription: res.data.secure_url,
    });
    setImage('');
  };
  const onUpdate = async () => {
    try {
      const res = await axios.put(`/api/guest/update_order/${id}`, singleOrder);
      if (res.data.msg !== 'Order cannot be updated') {
        alert('Order updated');
        history.push('/guest-orders');
      } else {
        alert('Order cannot be updated');
      }
    } catch (err) {
      alert('Something went wrong!! Order could not be updated');
      console.error(err);
    }
  };
  useEffect(() => {
    getSingleOrder(id);
    getOrderItems();
    // console.log(totalAmount);

    // eslint-disable-next-line
  }, [totalAmount]);
  return (
    <div className='sm:w-3/4 w-11/12 mx-auto'>
      <div className='flex flex-wrap justify-between'>
        <div>
          <h2 className='my-5 text-xl'>
            Update order for customer:{' '}
            <span className='font-medium'>{customer_name}</span>
          </h2>
          {/* Delivery status */}
          <label className='block' htmlFor='delivery_status'>
            Delivery Status
          </label>
          <select
            className='py-2 px-1 border rounded bg-gray-200'
            name='delivery_status'
            value={delivery_status}
            onChange={onChange}
            id='delivery_status'
          >
            <option value='received'>Received</option>
            <option value='completed'>Completed</option>
            <option value='cancelled'>Cancelled</option>
          </select>
          {/* Delivery status */}
          {/* <label className='block mt-4' htmlFor='payment_status'>
            Payment Status
          </label>
          <select
            className='py-2 px-1 border rounded bg-gray-200'
            name='payment_status'
            value={payment_status}
            onChange={onChange}
            id='payment_status'
          >
            <option value='pending'>Pending</option>
            <option value='paid'>Paid</option>
            <option value='n/a'>N/A</option>
          </select> */}

          <label className='block mt-4' htmlFor='prescription'>
            Customer prescriotion
          </label>
          <input type='file' onChange={onFileChange} />

          {customer_prescription === '' && image !== '' && (
            <div>Prescription uploading ...</div>
          )}

          {customer_prescription !== '' && image === '' && (
            <div>
              <img
                className='border mt-2'
                width='100px'
                height='100px'
                src={customer_prescription}
                alt=''
              />
            </div>
          )}

          {customer_prescription !== '' && image !== '' && (
            <div>Prescription uploading ...</div>
          )}
          <br />
          <div className='mt-4 bg-gray-800 text-gray-100 inline-block px-2 py-1 rounded'>
            <p>
              Total Amount:{' '}
              {Math.round((totalAmount + Number.EPSILON) * 100) / 100}
            </p>
          </div>
          {/* <label className='block mt-4' htmlFor='total_amount'>
            Update Total Amount
          </label>
          <input
            className='py-2 px-1 border rounded bg-gray-200'
            type='number'
            id='total_amount'
            placeholder={total_amount}
            onChange={onChange}
            name='total_amount'
            value={total_amount}
          /> */}
          {image !== '' && customer_prescription === '' ? (
            <button className='px-4 py-1 bg-blue-100 text-gray-300 rounded block mt-6 cursor-default'>
              Update order
            </button>
          ) : (
            <button
              className='px-4 py-1 bg-blue-300 rounded block mt-6'
              onClick={onUpdate}
            >
              Update order
            </button>
          )}
        </div>
        <div>
          <GuestOrderItems id={id} />
        </div>
      </div>
    </div>
  );
};

export default UpdateOrder;
