import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Orders from "./views/orders/Orders";
import LeftBar from "./assets/tsx/LeftBar";
import Home from "./assets/tsx/Home";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import Settings from "./assets/tsx/Settings";
import Stats from "./assets/tsx/Stats";
import Customers from "./views/customers/Customers";
import Products from "./assets/tsx/Products";

interface MenuItem {
    text: string;
    link: string;
  }


const router = createBrowserRouter([
    {
        path: '/',
        element: <>
        <LeftBar/>
        <Home/>
        </>,
    },
    {
        path: '/home',
        element: <>
        <LeftBar/>
        <Home/>
        </>,
    },
    {
        path: '/orders',
        element: <Orders/>,
    },
    {
        path: '/products',
        element: <>
        <LeftBar/>
        <Products/>
        </>,
    },
    {
        path: '/customers',
        element: <>
        <LeftBar/>
        <Customers/>
        </>,
    },
    {
        path: '/stats',
        element: <>
        <LeftBar/>
        <Stats/>
        </>,
    },
    {
        path: '/settings',
        element: <>
        <LeftBar/>
        <Settings/>
        </>,
    },
])

function App_Test(){
    return  <RouterProvider router={router}/>
}

export default App_Test;