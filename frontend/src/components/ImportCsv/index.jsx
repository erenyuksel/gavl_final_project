import { useState } from 'react'
import Papa from 'papaparse'

function ImportCSV() {
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
      {data.length ? (
        <table className="table">
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>{row.password}</td>
                <td>{row.name}</td>
                <td>{row.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
    </div>
  )
}

export default ImportCSV
