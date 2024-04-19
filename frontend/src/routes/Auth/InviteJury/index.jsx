import { useState } from 'react'

const InviteJury = () => {
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [passwordRepeat, setPasswordRepeat] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    // Fügen Sie hier die Logik ein, die auszuführen ist, wenn das Formular eingereicht wird
    console.log('Submitting form...')
    // Überprüfen Sie z.B. ob die Passwörter übereinstimmen
    if (password !== passwordRepeat) {
      alert('Passwords do not match!')
      return
    }
    // Hier könnte z.B. ein API-Aufruf platziert werden, um die Daten zu speichern
  }
  return (
    <div className="flex justify-center items-start min-h-screen pt-8">
      <form
        onSubmit={handleSubmit}
        className="form-control w-full max-w-lg p-4"
      >
        <h1 className="text-2xl font-bold text-center mb-4">Hello USERNAME</h1>
        <div className="form-control w-full">
          <label className="input-group">
            <span className="w-32">E-Mail</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-Mail address"
              className="input input-bordered w-full"
              required
            />
          </label>
          <label className="input-group">
            <span className="w-32">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="input input-bordered w-full"
              required
            />
          </label>
          <label className="input-group">
            <span className="w-32">Repeat</span>
            <input
              type="password"
              value={passwordRepeat}
              onChange={(e) => setPasswordRepeat(e.target.value)}
              placeholder="Repeat password"
              className="input input-bordered w-full"
              required
            />
          </label>
        </div>
        <button type="submit" className="btn btn-primary mt-4 w-full">
          Finish registration
        </button>
      </form>
    </div>
  )
}

export default InviteJury
