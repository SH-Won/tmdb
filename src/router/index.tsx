import { createBrowserRouter, RouterProvider, Route, Link } from 'react-router-dom'
import App from '@/app'
import DashBoard from '@/views/DashBoard'
import DetailPage from '@/views/DetailPage'

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
          path: '/detail/:movieId',
          element: <DetailPage />,
        },
      ],
    },
  ],
  {
    basename: '/',
  }
)
