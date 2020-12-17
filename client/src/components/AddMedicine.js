import React, {useState, useEffect} from 'react';
import axios from 'axios';
import history from '../history';

const AddMedicine = () => {
  const [selected, setSelected] = useState('no');
  // const [medType, setMedType] = useState('Tablet');
  // const onSelect = e => {
  //   setMedType(e.target.value);

  //   setMed({...med, medicine_type: e.target.value});
  // };
  const [med, setMed] = useState({
    trade_name: '',
    generic_name: '',
    company_name: '',
    // unit_price: 0,
    size_of_packet: 0,
    packet_price: 0,
    // discount_price: 0,
    description: '',
    medicine_type: '',
    over_the_counter: selected,
    image: '',
  });
  const {
    trade_name,
    generic_name,
    company_name,
    // unit_price,
    size_of_packet,
    packet_price,
    // discount_price,
    // description,
    medicine_type,
    image,
  } = med;
  const [genericNames, setGenericNames] = useState([]);
  const [companyNames, setCompanyNames] = useState([]);
  const [medicineType, setMedicineType] = useState([]);
  const onChange = async e => {
    setMed({...med, [e.target.name]: e.target.value});
    if (e.target.name === 'generic_name') {
      const res = await axios.get(`/search_by_generic_name/${e.target.value}`);
      // console.log(res.data.data);
      setGenericNames(res.data.data); // temporary data storage
    } else if (e.target.name === 'company_name') {
      const res = await axios.get(`/search_by_company_name/${e.target.value}`);
      // console.log(res.data.data);
      setCompanyNames(res.data.data); // temporary data storage
    } else if (e.target.name === 'medicine_type') {
      const res = await axios.get(`/search_by_medicine_type/${e.target.value}`);
      // console.log(res.data.data);
      setMedicineType(res.data.data); // temporary data storage
    }
  };
  const onSubmit = async e => {
    e.preventDefault();
    // const myForm = document.getElementById('myForm');
    // console.log(file);

    // const formData = new FormData(myForm);
    try {
      if (
        trade_name !== '' &&
        generic_name !== '' &&
        company_name !== '' &&
        packet_price > 0 &&
        size_of_packet > 0 &&
        medicine_type !== ''
      ) {
        const res = await axios.post('/', med);
        if (res.data.id) {
          alert('Medicine added!!!');
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
  const onRadioChange = e => {
    if (e.target.value === 'no') {
      setSelected('no');
    } else if (e.target.value === 'yes') {
      setSelected('yes');
    }
    setMed({...med, over_the_counter: e.target.value});
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

  useEffect(() => {
    const login = localStorage.getItem('login');
    if (login !== 'success') {
      history.push('/login');
    }
  });

  return (
    <div style={{width: '1000px'}} className='mx-auto'>
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
        {genericNames !== undefined &&
          genericNames.length > 0 &&
          genericNames.map((name, index) => (
            <p
              className='bg-gray-100 px-2 py-1 mt-2 cursor-pointer w-1/2 hover:bg-gray-300'
              onClick={() => {
                setMed({...med, generic_name: name.generic_name});
                setGenericNames([]);
              }}
              key={index}
            >
              {name.generic_name}
            </p>
          ))}
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
        {companyNames !== undefined &&
          companyNames.length > 0 &&
          companyNames.map((name, index) => (
            <p
              className='bg-gray-100 px-2 py-1 mt-2 cursor-pointer w-1/2 hover:bg-gray-300'
              onClick={() => {
                setMed({...med, company_name: name.company_name});
                setCompanyNames([]);
              }}
              key={index}
            >
              {name.company_name}
            </p>
          ))}
        <label className='mr-2 mt-8 block' htmlFor='packet_price'>
          Packet price
        </label>
        <input
          className='block border border-black bg-gray-100 rounded-sm px-2 py-1 w-1/2'
          type='number'
          id='packet_price'
          name='packet_price'
          value={packet_price}
          onChange={onChange}
        />
        <label className='mr-2 mt-8 block' htmlFor='size_of_packet'>
          Size of packet
        </label>
        <input
          className='block border border-black bg-gray-100 rounded-sm px-2 py-1 w-1/2'
          type='number'
          id='size_of_packet'
          name='size_of_packet'
          value={size_of_packet}
          onChange={onChange}
        />
        {/* <label className='mr-2 mt-8 block' htmlFor='discount_price'>
          Discount price
        </label>
        <input
          className='block border border-black bg-gray-100 rounded-sm px-2 py-1 w-1/2'
          type='number'
          id='discount_price'
          name='discount_price'
          value={discount_price}
          onChange={onChange}
        /> */}
        {/* <label className='mr-2 mt-8 block' htmlFor='description'>
          Description
        </label>
        <textarea
          className='block border border-black bg-gray-100 rounded-sm px-2 py-1 w-1/2'
          type=''
          id='description'
          name='description'
          value={description}
          onChange={onChange}
        ></textarea> */}

        {/* <select
          className='py-2 px-1 border rounded bg-gray-200 w-1/2'
          onChange={onSelect}
          value={medType}
        >
          <option value='Tablet'>Tablet</option>
          <option value='Capsule'>Capsule</option>
          <option value='Sachets'>Sachets</option>
          <option value='Powder'>Powder</option>
          <option value='Suspension'>Suspension</option>
          <option value='Syrup'>Syrup</option>
          <option value='Injection'>Injection</option>
          <option value='Suppository'>Suppository</option>
        </select> */}

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
        {medicineType !== undefined &&
          medicineType.length > 0 &&
          medicineType.map((name, index) => (
            <p
              className='bg-gray-100 px-2 py-1 mt-2 cursor-pointer w-1/2 hover:bg-gray-300'
              onClick={() => {
                setMed({...med, medicine_type: name.medicine_type});
                setMedicineType([]);
              }}
              key={index}
            >
              {name.medicine_type}
            </p>
          ))}
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

export default AddMedicine;
