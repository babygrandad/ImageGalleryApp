import { useState } from 'react';
import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import Register from './Components/LoginRegister/Register/Register';
import Login from './Components/LoginRegister/Login/Login';
import Home from './Components/HomePage/Home';
import ForgotPassword from './Components/LoginRegister/ForgotPassword/ForgotPassword';
import ResetPassword from './Components/LoginRegister/ResetPassword/ResetPassword';
import ImageSection from './Components/ImageSection/ImageSection';
import UploadSection from './Components/UploadSection/UploadSection';
import ImagePage from './Components/ImagePage/ImagePage';
import MyLibrary from './Components/MyLibrary/MyLibrary';
import Modal from './Components/SubComponents/Modal';
import ChangePassword from './Components/LoginRegister/ChangePassword/ChangePassword';



function App() {
  const [count, setCount] = useState(0)

const router = createBrowserRouter([
  {
    path:"/",
    element: <Login />
    
  },
  {
    path: "register",
    element: <Register />
  },

  {
    path: "changePassword",
    element: <ChangePassword />
  },
  {
    path: "",
    element: <Home />,
    children:[
      {
        path:"home",
        element: <ImageSection />
      },
      {
        path:"upload",
        element: <UploadSection />
      },
      {
        path:"mylibrary",
        element: <MyLibrary />
      },
      {
        path:"post/:imageID",
        element: <ImagePage />
      }
    ]
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
