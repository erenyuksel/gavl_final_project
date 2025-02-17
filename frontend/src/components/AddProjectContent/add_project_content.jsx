import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateEventProjectStructure } from '../../store/slices/newEventSlice'
import DataField from './project_data_field'
import { v4 as uuidv4 } from 'uuid'

const AddProjectContent = () => {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    uuid: uuidv4(),
    name: '',
    type: '',
    content: '',
  })

  const currentStructure = useSelector(
    (state) => state.event.eventProjectStructure,
  )

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handlAddField = (e) => {
    e.preventDefault()
    dispatch(updateEventProjectStructure(formData))
    setFormData({
      uuid: uuidv4(),
      name: '',
      type: formData.type,
      content: '',
    })
  }

  return (
    <div className='card shadow-lg p-5'>
      <div className="flex flex-col mb-5 items-center text-center ">
        <h2>Contestant file configuration</h2>
        <p>
          Which information should your contestants provide in their project profile? Define field name and type along with the structure.
        </p>
      </div>
      <div className="flex justify-center join">
        <div className="flex">
          <div className="w-full">
            <input
              className="input shadow input-bordered join-item"
              placeholder="Name"
              value={formData.name}
              type="text"
              name="name"
              onChange={handleInputChange}
            />
          </div>
          <select
            className="select shadow select-bordered join-item"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
          >
            <option value="default" disabled>
              File Type
            </option>
            <option value="text">Text</option>
            <option value="image">Image</option>
            <option value="file">File</option>
          </select>
          <div className="indicator">
            <button
              className="btn bg-primary hover:bg-gray-300 shadow-lg join-item"
              onClick={handlAddField}
            >
              Add Field
            </button>
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
          {currentStructure.map((datafield) => {
            return <DataField obj={datafield} key={datafield.uuid} />
          })}
        </>
      )}
    </div>
  )
}

export default AddProjectContent
