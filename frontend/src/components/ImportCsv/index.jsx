import { useEffect, useState } from 'react'
import Papa from 'papaparse'
import JudgeAxios from '../../axios/JudgeAxios'
import SuccessMessage from '../Alerts/SuccessMessage'

function ImportCSV({ event_id }) {
  const [data, setData] = useState([])
  const [progress, setProgress] = useState(0)
  const [successMessage, setSuccessMessage] = useState('')

  const handleFileUpload = (e) => {
    const file = e.target.files[0]

    // Configure PapaParse to process the file in chunks
    Papa.parse(file, {
      header: true,
      chunkSize: 1024 * 1024, // 1 MB chunk size
      delimiter: ',', // Set your CSV delimiter if different
      dynamicTyping: true, // Enable automatic data type conversion
      encoding: 'utf8', // Set file encoding if necessary
      step: (results, parser) => {
        // Simulate a delay to make progress more visible
        setTimeout(() => {
          // Calculate progress based on the current position and total bytes processed
          const progress = (parser.streamer._inputPtr / file.size) * 100
          setProgress(progress)

          // Append the parsed data to the state
          setData((prevData) => [...prevData, results.data])
        }, 100) // Change the delay time if needed
      },
      complete: () => {
        // Reset progress when parsing is complete
        setProgress(100)
      },
    })
  }


  const handleProjectCreation = async (e) => {
    e.preventDefault()
    const projectsToCreate = data.filter((project) => project.name)

    // Create projects
    try {
      const projectIds = await Promise.all(
        projectsToCreate.map(async (project) => {
          const response = await JudgeAxios.post('/projects/', {
            name: project.name,
            content: JSON.stringify(project),
            description: project.description,
          })
          return response.data.id
        }),
      )

      // Update event with project IDs
      if (projectIds.length > 0) {
        try {
          const event_response = await JudgeAxios.get(`/events/${event_id}`)
          const current_ids = []
          for (let pj of event_response.data.projects) {
            current_ids.push(pj.id)
          }
          const combined_ids = [...current_ids, ...projectIds]
          await JudgeAxios.patch(`/events/${event_id}/`, {
            projects: combined_ids,
          })
          // if successful show the successmessage
          setSuccessMessage('Uploading Projects was successful')
          // hide successmessage after 3 seconds again
          setTimeout(() => {
            setSuccessMessage('')
          }, 3000)

        } catch (error) {
          console.error('Error updating event:', error)
        }
      }
    } catch (error) {
      console.error('Error creating projects:', error)
    }
  }

  return (
    <div className='card bg-base-100 p-5 shadow'>
      {successMessage && (
      <div>
        <SuccessMessage message={successMessage} />
      </div>
      )}
      <div>
      <h3>Data Importer: you can upload your CSV file here</h3>
      <br/>
      </div>
      <div>
      <input
        type="file"
        className="file-input w-full max-w-xs"
        accept=".csv"
        onChange={handleFileUpload}
      />
      {data.length > 1 && (
        <>
          <button className="btn ml-6" onClick={handleProjectCreation}>
            Upload File
          </button>
        </>
      )}
      </div>
    </div>
  )
}

export default ImportCSV
