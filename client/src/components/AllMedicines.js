import React, {useEffect, useState} from 'react';
import axios from 'axios';
import history from '../history';

const AllMedicines = () => {
  const [data, setData] = useState([]);

  async function getAllMedicines() {
    const res = await axios.get('/get_all');

    setData(res.data);
    return data;
  }
  const onEdit = id => {
    history.push(`/update/${id}`);
  };
  const [search, setSearch] = useState('');

  const onSearch = async e => {
    setSearch(e.target.value);
    if (search.length >= 2) {
      const res = await axios.get(`/search/${search}`);
      setData(res.data.data);
    } else {
      getAllMedicines();
    }
  };
  const onDelete = async id => {
    const confirm = prompt(
      'Are you sure? This will permanently delete the item!',
      'no',
    );
    if (confirm === 'yes') {
      await axios.delete(`/delete/${id}`);
      window.location.reload();
    } else {
      // do nothing
    }
  };
  useEffect(() => {
    getAllMedicines();

    // eslint-disable-next-line
  }, []);
  return (
    <div style={{width: '1200px'}} className='mx-auto'>
      <div className='flex'>
        <p className='my-2 mr-4'>
          Total medicines: {data !== undefined ? data.length : 0}
        </p>
        <input
          className='bg-gray-200 my-2 px-2 py-1 border w-1/2'
          name='search'
          type='text'
          placeholder='Search by trade name'
          onChange={onSearch}
          value={search}
        />
      </div>
      <table className='table-fixed pt-8'>
        <thead className='text-sm'>
          <tr>
            <th className='px-4 py-2 border border-gray-400'>Trade name</th>
            <th className='px-4 py-2 border border-gray-400'>Generic name</th>
            <th className='px-4 py-2 border border-gray-400'>Company name</th>
            <th className='px-4 py-2 border border-gray-400'>Unit price</th>
            <th className='px-4 py-2 border border-gray-400'>Discount</th>
            <th className='px-4 py-2 border border-gray-400'>Medicine type</th>
            <th className='px-4 py-2 border border-gray-400'>
              Over the counter
            </th>
            <th className='px-4 py-2 border border-gray-400'>Edit</th>
            <th className='px-4 py-2 border border-gray-400'>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data !== undefined &&
            Array.isArray(data) &&
            data.map(d => (
              <tr key={d.medicine_id}>
                <td className='px-4 py-2 border border-gray-400'>
                  {d.trade_name}
                </td>
                <td className='px-4 py-2 border border-gray-400'>
                  {d.generic_name}
                </td>
                <td className='px-4 py-2 border border-gray-400'>
                  {d.company_name}
                </td>
                <td className='px-4 py-2 border border-gray-400'>
                  {d.unit_price}
                </td>
                <td className='px-4 py-2 border border-gray-400'>
                  {d.discount_price}
                </td>
                <td className='px-4 py-2 border border-gray-400'>
                  {d.medicine_type}
                </td>
                <td className='px-4 py-2 border border-gray-400'>
                  {d.over_the_counter}
                </td>
                <td className='px-4 py-2 border border-gray-400'>
                  <button
                    className='bg-gray-400 px-4 py-1 text-sm rounded-sm'
                    onClick={() => onEdit(d.medicine_id)}
                  >
                    Edit
                  </button>
                </td>
                <td className='px-4 py-2 border border-gray-400'>
                  <button
                    className='bg-red-400 px-4 py-1 text-sm rounded-sm'
                    onClick={() => onDelete(d.medicine_id)}
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

export default AllMedicines;
