import React, {useState} from 'react';
import axios from 'axios';

const AddMedicine = () => {
  const [selected, setSelected] = useState('no');
  const [med, setMed] = useState({
    trade_name: '',
    generic_name: '',
    company_name: '',
    unit_price: 0,
    discount_price: 0,
    description: '',
    medicine_type: '',
    over_the_counter: selected,
  });
  const {
    trade_name,
    generic_name,
    company_name,
    unit_price,
    discount_price,
    description,
    medicine_type,
  } = med;
  const onChange = e => {
    setMed({...med, [e.target.name]: e.target.value});
  };
  const onSubmit = async e => {
    e.preventDefault();
    const myForm = document.getElementById('myForm');

    const formData = new FormData(myForm);

    await axios.post('http://localhost:8000', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };
  const onRadioChange = e => {
    if (e.target.value === 'no') {
      setSelected('no');
    } else if (e.target.value === 'yes') {
      setSelected('yes');
    }
    setMed({...med, over_the_counter: e.target.value});
  };

  return (
    <div className='mx-auto w-1/2 mb-12'>
      <form id='myForm' onSubmit={onSubmit}>
        <label className='mr-2 mt-8 block' htmlFor='trade_name'>
          Trade name
        </label>
        <input
          className='block border border-black bg-gray-100 rounded-sm px-2 py-1 w-64'
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
          className='block border border-black bg-gray-100 rounded-sm px-2 py-1 w-64'
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
          className='block border border-black bg-gray-100 rounded-sm px-2 py-1 w-64'
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
          className='block border border-black bg-gray-100 rounded-sm px-2 py-1 w-64'
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
          className='block border border-black bg-gray-100 rounded-sm px-2 py-1 w-64'
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
          className='block border border-black bg-gray-100 rounded-sm px-2 py-1 w-64'
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
          className='block border border-black bg-gray-100 rounded-sm px-2 py-1 w-64'
          type='text'
          id='medicine_type'
          name='medicine_type'
          value={medicine_type}
          onChange={onChange}
        />
        <div className='mt-8'>
          <h4>Over the counter</h4>
          <div className='mt-4'>
            <input
              className='border border-black bg-gray-100 rounded-sm px-2 py-1 mr-2'
              type='radio'
              id='yes'
              name='over_the_counter'
              value='yes'
              checked={selected === 'yes'}
              onChange={onRadioChange}
            />
            <label className='mr-8' htmlFor='yes'>
              Yes
            </label>
            <input
              className='border border-black bg-gray-100 rounded-sm px-2 py-1 mr-2'
              type='radio'
              id='no'
              name='over_the_counter'
              value='no'
              checked={selected === 'no'}
              onChange={onRadioChange}
            />
            <label htmlFor='no'>No</label>
          </div>
        </div>
        <label className='mr-2 mt-8 block' htmlFor='photo'>
          Image
        </label>
        <input type='file' name='photo' id='photo' />

        <input
          className='block bg-blue-400 px-4 py-1 mt-8 rounded'
          type='submit'
          value='Submit'
        />
      </form>
    </div>
  );
};

export default AddMedicine;
