import { useState } from 'react';
import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import Register from './Components/LoginRegister/Register/Register';
import Login from './Components/LoginRegister/Login/Login';
import Home from './Components/HomePage/Home';
import ForgotPassword from './Components/LoginRegister/ForgotPassword/ForgotPassword';
import ResetPassword from './Components/LoginRegister/ResetPassword/ResetPassword';

function App() {
  const [count, setCount] = useState(0)

const router = createBrowserRouter([
  {
    path: "/",
    element: <Register />
  },
  {
    path:"login",
    element: <Login />
  },
  {
    path:"feed",
    element: <Home />
  },
  {
    path:"forgotPassword",
    element: <ForgotPassword />
  },
  {
    path:"resetPassword",
    element: <ResetPassword />
  }
]);



  return (
    <RouterProvider router={router} />
  )
}

export default App
