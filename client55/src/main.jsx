import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Users from './Components/Users.jsx';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Update from './Components/Update.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>  ,

    // errorElement: <ErrorPage />,
    // children: [
    //   {
    //     path: "/users",
    //     element: <Users></Users>,
    //   },
    // ],
  },
  {
    path: "/users/",
    element: <Users></Users> ,
    loader: () => fetch('http://localhost:5000/users/')
  },
  {
    path: "/users/:id",
    element: <Update></Update>,
    loader: ({params}) => fetch(`http://localhost:5000/users/${params.id}`)
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>,
)
