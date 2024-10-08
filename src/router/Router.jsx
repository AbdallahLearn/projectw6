import React from 'react'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Home from '../component/Home'
import Search from '../component/Search'
import View from '../component/View'
import Login from '../component/Login'
import Signup from '../component/Signup'
const router = createBrowserRouter([
    {
        path:'home',
        element: <Home/>
    },
    {
        path:'login',
        element: <Login/>
    },
    {
        path:'',
        element: <Signup/>
    },
    {
        path: "/search",
        element: <Search/>
      },
      {
        path: "/Video/:id",
        element: <View/>
      },
])

function Router() {
  return (
    <>
      <RouterProvider router ={router}/>
    </>
  )
}

export default Router
