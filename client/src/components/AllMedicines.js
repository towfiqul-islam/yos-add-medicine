import React, {useEffect, useState} from 'react';
import axios from 'axios';
import history from '../history';

const AllMedicines = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    getAllMedicines();

    // eslint-disable-next-line
  }, []);
  async function getAllMedicines() {
    const res = await axios.get('/get_all');

    setData(res.data);
    return data;
  }
  const onEdit = id => {
    // console.log(id);
    history.push(`/update/${id}`);
  };
  return (
    <div style={{width: '1200px'}} className='mx-auto'>
      <p className='my-2'>Total medicines: {data.length}</p>
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
          </tr>
        </thead>
        <tbody>
          {data !== undefined &&
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
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllMedicines;
