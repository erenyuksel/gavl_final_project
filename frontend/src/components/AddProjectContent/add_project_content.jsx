import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateEventProjectStructure } from '../../store/slices/newEventSlice';
import DataField from './project_data_field';
import { v4 as uuidv4 } from 'uuid';


const AddProjectContent = () => {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    uuid: uuidv4(),
    name: '',
    type: 'default',
    content: ''
  })

  const currentStructure = useSelector(state => state.event.eventProjectStructure)

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handlAddField = (e) => {
    e.preventDefault()
    dispatch(updateEventProjectStructure(formData))
    setFormData({
      uuid: uuidv4(),
      name: '',
      type: formData.type,
      content: ''
    })
  }

  return(
    <>
      <h2>Defining project information</h2>
      <p>Define here the information which the Contestants need to provide to participate in your event.
      </p>
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
          <select className="select select-bordered join-item" name="type" value={formData.type} onChange={handleInputChange}>
            <option value='default' disabled selected>File Type</option>
            <option value='text'>Text</option>
            <option value='image'>Image</option>
            <option value='file'>File</option>
          </select>
          <div className="indicator">
            <button 
            className="btn join-item"
            onClick={handlAddField}>Add Field</button>
          </div>
        </div>
      </div>
      {!currentStructure.length === 0 && (
        <>
          <p>There are no defined fields yet</p>
        </>
      )}
      {currentStructure && (
        <>
          {currentStructure.map(datafield => {
            return <DataField obj={datafield} key={datafield.uuid}/>
          }
          )}
        </>
      )}
    </>
  )
}

export default AddProjectContent