import {Link} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import Logo from '../../assets/roundLogo.png'
import {useDispatch, useSelector} from "react-redux";
import {clearUser} from "../../store/slices/userSlice.js";
import defaultAvatar from '../../assets/default Avatar.png'

function Header() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const currentUser = useSelector((state) => state.user.user)
    console.log("HEADER currentUser", currentUser)

    const handleLogout = () => {
        localStorage.removeItem('token')
        dispatch(clearUser());
        navigate('/login')
    }

    return (
        <>
            <div className="shadow-xl m-6 rounded-full border-custom-primary">
                <div className="navbar bg-base-100  rounded-full border-custom-primary">
                    <div className="navbar-start">
                        <Link to="/" className="btn btn-ghost btn-circle">
                            <img src={Logo} alt="Gavl Logo" className="w-full h-full object-cover rounded-full"/>
                        </Link>
                    </div>
                    <div className="navbar-end">
                        {currentUser && <p className="text-xl p-3">{currentUser.username}</p>}
                        <Link to="/profile" className="btn btn-ghost btn-circle">
                            <div className="w-12">
                                {currentUser &&
                                    <img
                                        alt="Avatar User"
                                        src={
                                            currentUser.avatar
                                                ? typeof currentUser.avatar === 'string'
                                                    ? currentUser.avatar
                                                    : URL.createObjectURL(currentUser.avatar)
                                                : defaultAvatar
                                        }
                                        className="w-full h-full object-cover rounded-full"
                                    />
                                }
                            </div>
                        </Link>
                        <button className="btn btn-ghost btn-circle" onClick={handleLogout}>
                            <div className="indicator">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                          d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"/>
                                </svg>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header
