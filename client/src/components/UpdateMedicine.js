import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

import axios from 'axios';
import history from '../history';

const UpdateMedicine = () => {
  const [med, setMed] = useState({
    trade_name: '',
    generic_name: '',
    company_name: '',
    unit_price: 0,
    discount_price: 0,
    description: '',
    medicine_type: '',
    image: '',
  });
  const {
    trade_name,
    generic_name,
    company_name,
    unit_price,
    discount_price,
    description,
    medicine_type,
    image,
  } = med;
  const {id} = useParams();
  useEffect(() => {
    getSingleMed(id);

    // eslint-disable-next-line
  }, []);
  async function getSingleMed(id) {
    const res = await axios.get(`/get_single/${id}`);
    setMed(res.data);
    console.log(med);
  }
  const onChange = e => {
    setMed({...med, [e.target.name]: e.target.value});
  };
  const onSubmit = async e => {
    e.preventDefault();

    try {
      if (
        trade_name !== '' &&
        generic_name !== '' &&
        company_name !== '' &&
        unit_price > 0 &&
        medicine_type !== ''
      ) {
        const res = await axios.put(`/update/${id}`, med);
        if (res.data.affectedRows === 1) {
          alert('Medicine updated!!!');
          history.push('/all');
        }
      } else {
        alert('Update the form properly!!');
      }
    } catch (err) {
      console.error('Something went wrong!!', err);
      alert('Something went wrong!!');
    }
  };

  const [file, setFile] = useState('');

  const onFileChange = async e => {
    setFile(e.target.files[0]);
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    formData.append('upload_preset', 'yos-medicine');
    const res = await axios.post(
      'https://api.cloudinary.com/v1_1/yos/image/upload',
      formData,
    );
    setMed({...med, image: res.data.secure_url});
  };
  return (
    <div style={{width: '1000px'}} className='mx-auto'>
      <h2 className='text-center text-lg mt-2'>Update Medicine</h2>
      <form id='myForm' onSubmit={onSubmit}>
        <label className='mr-2 mt-8 block' htmlFor='trade_name'>
          Trade name
        </label>
        <input
          className='inline-block border border-black bg-gray-100 rounded-sm px-2 py-1 w-1/2'
          type='text'
          id='trade_name'
          name='trade_name'
          value={trade_name}
          onChange={onChange}
        />

        <label className='mr-2 mt-8 block' htmlFor='generic_name'>
          Generic name
        </label>
        <input
          className='block border border-black bg-gray-100 rounded-sm px-2 py-1 w-1/2'
          type='text'
          id='generic_name'
          name='generic_name'
          value={generic_name}
          onChange={onChange}
        />
        <label className='mr-2 mt-8 block' htmlFor='company_name'>
          Company name
        </label>
        <input
          className='block border border-black bg-gray-100 rounded-sm px-2 py-1 w-1/2'
          type='text'
          id='company_name'
          name='company_name'
          value={company_name}
          onChange={onChange}
        />
        <label className='mr-2 mt-8 block' htmlFor='unit_price'>
          Unit price
        </label>
        <input
          className='block border border-black bg-gray-100 rounded-sm px-2 py-1 w-1/2'
          type='number'
          id='unit_price'
          name='unit_price'
          value={unit_price}
          onChange={onChange}
        />
        <label className='mr-2 mt-8 block' htmlFor='discount_price'>
          Discount price
        </label>
        <input
          className='block border border-black bg-gray-100 rounded-sm px-2 py-1 w-1/2'
          type='number'
          id='discount_price'
          name='discount_price'
          value={discount_price}
          onChange={onChange}
        />
        <label className='mr-2 mt-8 block' htmlFor='description'>
          Description
        </label>
        <textarea
          className='block border border-black bg-gray-100 rounded-sm px-2 py-1 w-1/2'
          type=''
          id='description'
          name='description'
          value={description}
          onChange={onChange}
        ></textarea>
        <label className='mr-2 mt-8 block' htmlFor='medicine_type'>
          Medicine type
        </label>
        <input
          className='block border border-black bg-gray-100 rounded-sm px-2 py-1 w-1/2'
          type='text'
          id='medicine_type'
          name='medicine_type'
          value={medicine_type}
          onChange={onChange}
        />

        <label className='mr-2 mt-8 block' htmlFor='photo'>
          Image
        </label>
        <input
          className='mt-1'
          type='file'
          name='photo'
          id='photo'
          onChange={onFileChange}
        />

        {image === '' && file !== '' && (
          <p className='mt-4 text-gray-500'>Image is being uploaded ...</p>
        )}

        {image !== '' && (
          <img
            className='mt-4'
            src={image}
            width='100px'
            height='100px'
            alt=''
          />
        )}

        {image === '' && file === '' && (
          <p className='mt-4 text-gray-500'>
            Uplaoded image preview will be shown here
          </p>
        )}

        {image === '' && file !== '' ? (
          <div className='inline-block bg-gray-400 text-gray-300 px-4 py-1 mt-8 rounded mb-10'>
            Submit
          </div>
        ) : (
          <input
            className='block bg-blue-400 px-4 py-1 mt-8 rounded mb-10'
            type='submit'
            value='Submit'
          />
        )}
      </form>
    </div>
  );
};

export default UpdateMedicine;
