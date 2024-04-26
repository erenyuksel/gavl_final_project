import { useDispatch } from "react-redux"
import { moveProjectStructureItemDown, moveProjectStructureItemUp, removeProjectStructureItem } from "../../store/slices/newEventSlice"
import PropTypes from 'prop-types';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa6'


const DataField = ({ obj }) => {

  const dispatch = useDispatch()

  const handlRemoveField = (e) => {
    e.preventDefault()
    dispatch(removeProjectStructureItem(obj.uuid))
  } 

  const handlMoveFieldUp = (e) => {
    e.preventDefault()
    dispatch(moveProjectStructureItemUp(obj))
  }

  const handlMoveFieldDown = (e) => {
    e.preventDefault()
    dispatch(moveProjectStructureItemDown(obj))
  }

  return (
    <div className="flex justify-center m-5 gap-20">
      <div className="flex flex-col justify-center items-center gap-1">
        <button
          className="btn-xs bg-primary rounded hover:scale-125 transition-transform"
          onClick={handlMoveFieldUp}
        >
          <FaChevronUp />
        </button>
        <button
          className="btn-xs bg-primary rounded hover:scale-125 transition-transform"
          onClick={handlMoveFieldDown}
        >
          <FaChevronDown />
        </button>
      </div>
      <div className="flex">
        <p className="flex justify-start items-center w-30 sm:w-40 md:w-80  overflow-hidden whitespace-nowrap text-ellipsis overflow-x-auto">
          {obj.name}
        </p>
        <p>{obj.type}</p>
      </div>
      <div className="flex justify-center items-center ">
        <button
          className="btn-xs rounded bg-red-400 hover:scale-125 transition-transform"
          onClick={handlRemoveField}
        >
          Remove Field
        </button>
      </div>
    </div>
  )
}

DataField.propTypes = {
  obj: PropTypes.object.isRequired,
}

export default DataField