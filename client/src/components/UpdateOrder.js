import Axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

const UpdateOrder = () => {
  const [singleOrder, setSingleOrder] = useState({
    delivery_status: '',
    payment_status: '',
    customer_prescription: '',
    total_amount: 0,
  });
  const {
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
      delivery_status: res.data.order.delivery_status,
      payment_status: res.data.order.payment_status,
      customer_prescription: res.data.order.customer_prescription,
      total_amount: res.data.order.total_amount,
    });
  }
  const onChange = e => {
    setSingleOrder({...singleOrder, [e.target.name]: e.target.value});
  };
  const onUpdate = async () => {
    await Axios.put(`/api/guest/update_order/${id}`, singleOrder);
  };
  useEffect(() => {
    getSingleOrder(id);
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <input
        type='text'
        placeholder='delivery'
        name='delivery_status'
        onChange={onChange}
        value={delivery_status}
      />
      <input
        type='text'
        placeholder='payment'
        name='payment_status'
        onChange={onChange}
        value={payment_status}
      />
      <input
        type='text'
        placeholder='prescription'
        name='customer_prescription'
        onChange={onChange}
        value={customer_prescription}
      />
      <input
        type='number'
        placeholder={total_amount}
        onChange={onChange}
        name='total_amount'
        value={total_amount}
      />
      <button onClick={onUpdate}>Update order</button>
    </div>
  );
};

export default UpdateOrder;
