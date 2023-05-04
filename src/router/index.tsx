import { createBrowserRouter } from 'react-router-dom'
import App from '@/app'
import DashBoard from '@/views/DashBoard'
import DetailPage from '@/views/DetailPage'
import SearchPage from '@/views/SearchPage'
import ActorPage from '@/views/ActorPage'
import MoviePage from '@/views/MoviePage'
import TVPage from '@/views/TVPage'
// import WidgetPage from '@/views/WidgetPage'

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
        {
          path: '/search',
          element: <SearchPage />,
        },
        {
          path: '/person/:personId',
          element: <ActorPage />,
        },
        {
          path: '/movie',
          element: <MoviePage />,
        },
        {
          path: '/tv',
          element: <TVPage />,
        },
        // {
        //   path: '/widget',
        //   element: <WidgetPage />,
        // },
      ],
    },
  ],
  {
    basename: '/',
  }
)
