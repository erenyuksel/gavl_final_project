import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className="layout-container">
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
