import { useState } from 'react'
import Papa from 'papaparse'

function ImportCSV() {
  const [data, setFile] = useState([])
  // parse CSV data & store it in component state
  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        setFile(results.data)
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
