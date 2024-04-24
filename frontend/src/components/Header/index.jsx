import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function Header() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <>
      <div className="navbar bg-neutral text-neutral-content">
        <div className="navbar-start">
          {/* Dropdown menu left side */}
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              {/*SVG Menu Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
            {/* Dropdown List */}
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              style={{ backgroundColor: '#f9fafb', color: '#111827' }}
            >
              <li>
                <Link to="/" className="justify-between">
                  My Events
                </Link>
              </li>
              <li>
                <a>XXX</a>
              </li>
              <li>
                <a>XXXX</a>
              </li>
            </ul>
          </div>
        </div>
        {/* middle-Part*/}
        <div className="navbar-center">
          <a className="btn btn-ghost text-xl">Project Name</a>
        </div>

        {/* Right side of the header */}
        <div className="navbar-end">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Avatar User"
                  src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-150 rounded-box w-52"
              style={{ backgroundColor: '#f9fafb', color: '#111827' }}
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  onClick={handleLogout}
                  className="justify-between"
                >
                  <a>Logout</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
