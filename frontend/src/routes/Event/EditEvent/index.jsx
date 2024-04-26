import { useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import JudgeAxios from '../../../axios/JudgeAxios'
import ImportCSV from '../../../components/ImportCsv'

const EditEvent = () => {
  const { id } = useParams()

  const handleDelete = async () => {
    try {
      await JudgeAxios.delete(`events/${id}/`)
      Navigate('/events')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <div>
        <ImportCSV event_id={id} />
        <button className="btn mt-8" onClick={handleDelete}>
          Delete Event
        </button>
      </div>
    </>
  )
}

export default EditEvent
