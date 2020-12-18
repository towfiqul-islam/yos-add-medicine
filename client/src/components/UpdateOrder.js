import Axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import history from '../history';
import axios from 'axios';

const UpdateOrder = () => {
  const [singleOrder, setSingleOrder] = useState({
    guest_name: '',
    delivery_status: '',
    payment_status: '',
    customer_prescription: '',
    total_amount: 0,
  });
  const [image, setImage] = useState('');
  const {
    customer_name,
    delivery_status,
    payment_status,
    customer_prescription,
    total_amount,
  } = singleOrder;
  const {id} = useParams();
  async function getSingleOrder(id) {
    const res = await Axios.get(`/api/guest/get_single_order/${id}`);
    setSingleOrder({
      //   ...res.data.order,
      customer_name: res.data.order.customer_name,
      delivery_status: res.data.order.delivery_status,
      payment_status: res.data.order.payment_status,
      customer_prescription: res.data.order.customer_prescription,
      total_amount: res.data.order.total_amount,
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
    await Axios.put(`/api/guest/update_order/${id}`, singleOrder);
    alert('Order updated');
    history.push('/guest-orders');
  };
  useEffect(() => {
    getSingleOrder(id);
    // eslint-disable-next-line
  }, []);
  return (
    <div className='sm:w-3/4 w-11/12 mx-auto'>
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
      <label className='block mt-4' htmlFor='payment_status'>
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
      </select>

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

      <label className='block mt-4' htmlFor='total_amount'>
        Confirm Final Amount
      </label>
      <input
        className='py-2 px-1 border rounded bg-gray-200'
        type='number'
        id='total_amount'
        placeholder={total_amount}
        onChange={onChange}
        name='total_amount'
        value={total_amount}
      />
      <button
        className='px-4 py-1 bg-blue-400 rounded block mt-6'
        onClick={onUpdate}
      >
        Update order
      </button>
    </div>
  );
};

export default UpdateOrder;
