import React from 'react'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import { Layout } from '../pages/layout';
import { Home } from '../pages/home';
import { Dashboard } from '../pages/map';
export const Route: React.FC = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout/>,
            children: [
                {
                  path: "/",
                  element: <Home/>,
                },
                {
                  path: "/dashboard",
                  element: <Dashboard/>,
                },
              ],
        },
      
    ]);

    return (
        <div>
            <RouterProvider router={router} />
        </div>
    )
}
