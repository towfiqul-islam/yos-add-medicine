import React from 'react';
import {useParams} from 'react-router-dom';

const UpdateMedicine = () => {
  const {id} = useParams();
  return (
    <div style={{width: '1000px'}} className='mx-auto'>
      <h2 className='text-center'>Update Medicine - {id}</h2>
    </div>
  );
};

export default UpdateMedicine;
