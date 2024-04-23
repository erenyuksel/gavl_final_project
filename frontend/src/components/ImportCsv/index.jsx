import { useEffect, useState } from 'react'
import Papa from 'papaparse'
import JudgeAxios from '../../axios/JudgeAxios'

function ImportCSV({ event_id }) {
  const [data, setData] = useState([])
  const [progress, setProgress] = useState(0)

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

  useEffect(() => {
    console.log(data)
  }, [data])

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
        } catch (error) {
          console.error('Error updating event:', error)
        }
      }
    } catch (error) {
      console.error('Error creating projects:', error)
    }
  }

  return (
    <div className="App">
      <input
        type="file"
        className="file-input file-input-bordered w-full max-w-xs"
        accept=".csv"
        onChange={handleFileUpload}
      />
      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}>
          {progress}%
        </div>
      </div>
      {data.length > 1 && (
        <>
          <button className="btn" onClick={handleProjectCreation}>
            Upload File
          </button>
        </>
      )}
    </div>
  )
}

export default ImportCSV
