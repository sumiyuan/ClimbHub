import { createBrowserRouter } from "react-router-dom"
import App from "./App"
import Signin from "./components/signin"
import Signup from "./components/signup"
import Dashboard from "./components/dashboard"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
])

export default router