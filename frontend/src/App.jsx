import Router from './routes'
import {useEffect} from "react";
import JudgeAxios from "./axios/JudgeAxios.jsx";
import {setUser} from "./store/slices/userSlice.js";
import {useDispatch, useSelector} from "react-redux";

function App() {

    const dispatch = useDispatch()
    const token = localStorage.getItem('token')
    const user = useSelector((state) => state.user.user)

    const getCurrentUser = async () => {
        try {
            const response = await JudgeAxios.get(`/users/me/`)
            dispatch(setUser(response.data))

        } catch (error) {
            console.error('Error by showing my User Data', error)
        }
    }

    useEffect(() => {
        if ((token !== null) && (user === null)) {
            getCurrentUser()
            console.log('APPP')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    return (
        <>
            <Router/>
        </>
    )
}

export default App
