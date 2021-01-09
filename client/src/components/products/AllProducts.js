import React, {useEffect, useState} from 'react';
import history from '../../history';
import axios from 'axios';

const AllProducts = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  async function getAllProducts() {
    const res = await axios.get('/api/products/get_all');
    setData(res.data.products);
  }
  const onSearch = async e => {
    setSearch(e.target.value);
    if (search.length >= 2) {
      const res = await axios.get(`/api/products/search_by_name/${search}`);
      setData(res.data.products);
    } else {
      getAllProducts();
    }
  };
  const onDelete = async id => {
    const confirm = prompt(
      'Are you sure? This will permanently delete the item!',
      'no',
    );
    if (confirm === 'yes') {
      await axios.delete(`/api/products/delete/${id}`);
      window.location.reload();
    } else {
      // do nothing
    }
  };
  const onEdit = id => {
    history.push(`/edit-product/${id}`);
  };
  useEffect(() => {
    const login = localStorage.getItem('login');
    if (login === 'success') {
      getAllProducts();
    } else {
      history.push('/login');
    }

    // eslint-disable-next-line
  }, []);
  return (
    <div className='mx-auto w-11/12'>
      <div className='flex'>
        <p className='my-2 mr-4'>
          Total products: {data !== undefined ? data.length : 0}
        </p>
        <input
          className='bg-gray-200 my-2 px-2 py-1 border w-1/2'
          name='search'
          type='text'
          placeholder='Search by product name'
          onChange={onSearch}
          value={search}
        />
      </div>
      <table className='table-fixed pt-8'>
        <thead className='text-sm'>
          <tr>
            <th className='px-4 py-2 border border-gray-400'>Product name</th>

            <th className='px-4 py-2 border border-gray-400'>Company name</th>
            <th className='px-4 py-2 border border-gray-400'>Packet Price</th>
            <th className='px-4 py-2 border border-gray-400'>Unit Price</th>
            <th className='px-4 py-2 border border-gray-400'>Discount</th>
            <th className='px-4 py-2 border border-gray-400'>
              Product category
            </th>
            <th className='px-4 py-2 border border-gray-400'>Image</th>

            <th className='px-4 py-2 border border-gray-400'>Edit</th>
            <th className='px-4 py-2 border border-gray-400'>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data !== undefined &&
            Array.isArray(data) &&
            data.map(d => (
              <tr key={d.id}>
                <td className='px-4 py-2 border border-gray-400'>
                  {d.product_name}
                </td>

                <td className='px-4 py-2 border border-gray-400'>
                  {d.company_name}
                </td>
                <td className='px-4 py-2 border border-gray-400'>
                  {d.price} Tk
                </td>
                <td className='px-4 py-2 border border-gray-400'>
                  {d.price / parseInt(d.packet_size)} Tk
                </td>
                <td className='px-4 py-2 border border-gray-400'>
                  {d.discount}%
                </td>
                <td className='px-4 py-2 border border-gray-400'>
                  {d.product_category}
                </td>
                <td className='px-4 py-2 border border-gray-400'>
                  {d.product_image !== '' ? (
                    <a
                      className='underline text-blue-600'
                      href={d.product_image}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      Click to see
                    </a>
                  ) : (
                    <p className='text-sm'>No image found</p>
                  )}
                </td>

                <td className='px-4 py-2 border border-gray-400'>
                  <button
                    className='bg-gray-400 px-4 py-1 text-sm rounded-sm'
                    onClick={() => onEdit(d.id)}
                  >
                    Edit
                  </button>
                </td>
                <td className='px-4 py-2 border border-gray-400'>
                  <button
                    className='bg-red-400 px-4 py-1 text-sm rounded-sm'
                    onClick={() => onDelete(d.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllProducts;
