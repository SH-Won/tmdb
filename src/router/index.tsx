import { createBrowserRouter, RouterProvider, Route, Link } from 'react-router-dom'
import App from '@/app'
import DashBoard from '@/views/DashBoard'
import DetailPage from '@/views/DetailPage'
import DetailPageTV from '@/views/DetailPageTV'

export const router = createBrowserRouter(
  [
    {
      element: <App />,
      children: [
        {
          path: '/',
          element: <DashBoard />,
        },
        {
          path: '/:media_type/:id',
          element: <DetailPage />,
        },
      ],
    },
  ],
  {
    basename: '/',
  }
)
