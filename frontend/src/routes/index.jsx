import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ListEventPage from './Event/ListEventPage'
import AddNewEvent from './Event/AddNewEvent'
import AddNewProject from './Event/AddNewProject'
import Login from './Auth/Login'
import SignUp from './Auth/SignUp'
import ViewEvent from './Event/ViewEvent'
import EditEvent from './Event/EditEvent'
import Project from './Event/Project'
import Layout from './Layout'
import NotFound from './NotFound'
import Profile from './Profile'
import ListProjectPage from './Event/ListProjectPage'
import Verification from './Auth/Verification'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/verification" element={<Verification />} />
        <Route element={<Layout />}>
          <Route path="/" element={<ListEventPage />} />
          <Route path="/new-event" element={<AddNewEvent />} />
          <Route path="/event/:id" element={<ViewEvent />} />
          <Route path="/event/edit/:id/" element={<EditEvent />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/project/:id" element={<Project />} />
          <Route path="/project/list" element={<ListProjectPage />} />
          <Route path="/new-projects" element={<AddNewProject />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
export default Router
