
import Header from "./Header"
import { Outlet } from 'react-router-dom'
import { ToastContainer} from "react-toastify";
function Layout() {
  return (
    <>
    <ToastContainer hideProgressBar={true} autoClose={3000} />
    <Header/>
    <Outlet />
    </>
  )
}

export default Layout