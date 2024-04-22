import {useState} from "react";
import Papa from "papaparse";

function App() {

    const [data, setFile] = useState([])
// parse CSV data & store it in component state
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        Papa.parse(file, {
            header: true,
            complete: (results) => {
                setFile(results.data);
            },
        });
    };

    return (
        <div className="App">
            <input type="file" accept=".csv" onChange={handleFileUpload}/>

            {data.length ? (
                <table className="table">
                    <thead>
                    <tr>
                        <th>password</th>
                        <th>name</th>
                        <th>location</th>
                    </tr>
                    </thead>
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
            <br/><br/>
            Eren Jaeger
        </div>
    );
}