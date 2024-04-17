import { useState } from 'react';
// import { useDispatch } from 'react-redux';


const AddProjectContent = () => {
  //  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    name: '',
    type: ''
  })



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handlAddField = (e) => {
    e.peventDefault()

  }



  return(
    <>
      <h2>Defining project information</h2>
      <p>Define here the information which the Contestants need to provide to participate in your event</p>
      <div className="join">
        <div className="flex">
          <div>
            <input 
            className="input input-bordered join-item" 
            placeholder="Name" 
            value={formData.name}
            type="text"
            name="name"
            onChange={handleInputChange}/>
          </div>
          <select className="select select-bordered join-item">
            <option disabled selected>Structure</option>
            <option>Section</option>
            <option disabled>File Type</option>
            <option>Text</option>
            <option>Image</option>
            <option>File</option>
          </select>
          <div className="indicator">
            <button 
            className="btn join-item"
            onClick={handlAddField}>Add Field</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddProjectContent