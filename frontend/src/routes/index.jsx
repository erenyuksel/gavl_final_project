import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ListEventPage from './Event/ListEventPage'
import AddNewEvent from './Event/AddNewEvent'
import Login from './Auth/Login'
import SignUp from './Auth/SignUp'
import ViewEvent from './Event/ViewEvent'
import EditEvent from './Event/EditEvent'
import Layout from './Layout'
import NotFound from './NotFound'
import Profile from './Profile'
import Verification from './Auth/Verification'
import InviteJury from './Auth/InviteJury'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="/invite/:token" element={<InviteJury />} />
        <Route element={<Layout />}>
          <Route path="/" element={<ListEventPage />} />
          <Route path="/new-event" element={<AddNewEvent />} />
          <Route path="/event/:id" element={<ViewEvent />} />
          <Route path="/event/id/edit" element={<EditEvent />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
export default Router
