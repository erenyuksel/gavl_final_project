import { useDispatch } from "react-redux"
import { moveProjectStructureItemDown, moveProjectStructureItemUp, removeProjectStructureItem } from "../../store/slices/newEventSlice"


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

  return(
      <div className="flex">
        <div>
          <button className="btn" onClick={handlMoveFieldUp}>UP</button>
          <button className="btn" onClick={handlMoveFieldDown}>DOWN</button>
        </div>
          <div className="flex">
            <p>{obj.name}</p>
            <p>{obj.type}</p>
          </div>
          <div>
            <button className="btn" onClick={handlRemoveField}>Remove Field</button>
          </div>
      </div>
  )
}

export default DataField