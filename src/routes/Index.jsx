import React from 'react'
import {createBrowserRouter} from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import Home  from '../pages/Home'
import Browse from '../pages/Search'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true, 
        element: <div style={{ padding: '20px' }}><Home /></div>,
      },
      {
        path: 'browse',
        element: <div style={{ padding: '20px' }}><Browse /></div>,
      },
    ],
  },
]);