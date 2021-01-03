import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import history from '../../history';
import axios from 'axios';

const EditProduct = () => {
  const {id} = useParams();
  const [product, setProduct] = useState({
    product_name: '',
    company_name: '',
    product_desc: '',
    packet_size: '',
    price: 0,
    discount: 0,
    product_category: 'baby-mom-care',
    product_image: '',
  });
  const {
    product_name,
    company_name,
    product_desc,
    packet_size,
    price,
    discount,
    product_category,
    product_image,
  } = product;
  const [companyNames, setCompanyNames] = useState([]);
  async function getSingleProduct(id) {
    const res = await axios.get(`/api/products/get_single/${id}`);
    setProduct(res.data.single_product);
  }
  const onChange = async e => {
    setProduct({...product, [e.target.name]: e.target.value});
    if (e.target.name === 'company_name') {
      const res = await axios.get(
        `/api/products/get_company_name/${e.target.value}`,
      );
      // console.log(res.data.data);
      setCompanyNames(res.data.companies); // temporary data storage
    }
  };
  const onSubmit = async e => {
    e.preventDefault();

    try {
      if (
        product_name !== '' &&
        company_name !== '' &&
        price !== '' &&
        product_category !== ''
      ) {
        const res = await axios.put(`/api/products/update/${id}`, product);
        if (res.data.row) {
          alert('Product updated!!!');
          window.location.reload();
        }
      } else {
        alert('Fill the form properly!!');
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
    formData.append('upload_preset', 'yos-product');
    const res = await axios.post(
      'https://api.cloudinary.com/v1_1/yos/image/upload',
      formData,
    );
    setProduct({...product, product_image: res.data.secure_url});
  };
  useEffect(() => {
    const login = localStorage.getItem('login');
    if (login === 'success') {
      getSingleProduct(id);
    } else {
      history.push('/login');
    }

    // eslint-disable-next-line
  }, []);
  return (
    <div className='mx-auto sm:w-3/4 w-11/12'>
      <h2 className='text-center text-xl text-gray-700 mt-4'>
        Update Product - {id}
      </h2>
      <form id='myForm' onSubmit={onSubmit}>
        <label className='mr-2 mt-8 block' htmlFor='product_name'>
          Product name
        </label>
        <input
          className='inline-block border border-black bg-gray-100 rounded-sm px-2 py-1 sm:w-1/2 w-full'
          type='text'
          id='product_name'
          name='product_name'
          value={product_name}
          onChange={onChange}
        />
        <label className='mr-2 mt-8 block' htmlFor='company_name'>
          Company name
        </label>
        <input
          className='inline-block border border-black bg-gray-100 rounded-sm px-2 py-1 sm:w-1/2 w-full'
          type='text'
          id='company_name'
          name='company_name'
          value={company_name}
          onChange={onChange}
        />

        {companyNames !== undefined &&
          companyNames.length > 0 &&
          companyNames.map((name, index) => (
            <p
              className='bg-gray-100 px-2 py-1 mt-2 cursor-pointer w-1/2 hover:bg-gray-300'
              onClick={() => {
                setProduct({...product, company_name: name.company_name});
                setCompanyNames([]);
              }}
              key={index}
            >
              {name.company_name}
            </p>
          ))}

        <label className='mr-2 mt-8 block' htmlFor='packet_size'>
          Packet size
        </label>
        <input
          className='block border border-black bg-gray-100 rounded-sm px-2 py-1 sm:w-1/2 w-full'
          type='text'
          id='packet_size'
          name='packet_size'
          value={packet_size}
          onChange={onChange}
        />

        <label className='mr-2 mt-8 block' htmlFor='packet_price'>
          Packet price
        </label>
        <input
          className='block border border-black bg-gray-100 rounded-sm px-2 py-1 sm:w-1/2 w-full'
          type='number'
          id='packet_price'
          name='price'
          value={price}
          onChange={onChange}
        />
        <label className='mr-2 mt-8 block' htmlFor='discount'>
          Discount Percentage
        </label>
        <input
          className='block border border-black bg-gray-100 rounded-sm px-2 py-1 sm:w-1/2 w-full'
          type='number'
          id='discount'
          name='discount'
          value={discount}
          onChange={onChange}
        />

        <label className='mr-2 mt-8 block' htmlFor='product_desc'>
          Product description
        </label>
        <textarea
          className='block border border-black bg-gray-100 rounded-sm px-2 py-1 sm:w-1/2 w-full'
          type=''
          id='product_desc'
          name='product_desc'
          value={product_desc}
          onChange={onChange}
          rows='10'
        ></textarea>

        <label htmlFor='product_category' className='mr-2 mt-8 block'>
          Product category
        </label>

        <select
          className='py-2 px-1 border rounded bg-gray-200 w-1/2'
          onChange={onChange}
          name='product_category'
          value={product_category}
        >
          <option value='baby-mom-care'>Baby & Mom Care</option>
          <option value='covid-care'>Covid Care</option>
          <option value='diabetes-care'>Diabetes Care</option>
          <option value='personal-care'>Personal Care & Hygiene</option>

          <option value='nutrition-supplements'>
            Nutrition & Health Supplements
          </option>
          <option value='medical-device'>Medical Devices & Accessories</option>
        </select>

        <label className='mr-2 mt-8 block' htmlFor='photo'>
          Product Image
        </label>
        <input
          className='mt-1'
          type='file'
          name='photo'
          id='photo'
          onChange={onFileChange}
        />

        {product_image === '' && file !== '' && (
          <p className='mt-4 text-gray-500'>Image is being uploaded ...</p>
        )}

        {product_image !== '' && (
          <img
            className='mt-4'
            src={product_image}
            width='100px'
            height='100px'
            alt=''
          />
        )}

        {product_image === '' && file === '' && (
          <p className='mt-4 text-gray-500'>
            Uplaoded image preview will be shown here
          </p>
        )}

        {product_image === '' && file !== '' ? (
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

export default EditProduct;
