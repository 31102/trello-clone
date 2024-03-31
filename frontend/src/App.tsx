
import Layout from "./components/Layout"
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Dashboard from './components/Dashboard.tsx'
import SignUp from "./components/SignUp"
import Login from "./components/Login"
import Board from "./components/Board"

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Dashboard />
        },
        {
          path: "board/:boardId",
          element: <Board />
        }
      ]
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "signup",
      element: <SignUp />
    },
  ])

  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App
