import { createBrowserRouter } from 'react-router-dom'
import App from '@/app'
import DashBoard from '@/views/DashBoard'
import DetailPage from '@/views/DetailPage'
import SearchPage from '@/views/SearchPage'
import ActorPage from '@/views/ActorPage'
import MoviePage from '@/views/MoviePage'
import Overall from '@/overall'
// import WidgetPage from '@/views/WidgetPage'
import PersonPage from '@/views/PersonPage'
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

        // {
        //   path: '/widget',
        //   element: <WidgetPage />,
        // },
      ],
    },
    {
      element: <Overall />,
      children: [
        {
          element: <MoviePage />,
          path: '/overall/:media/:category',
          index: true,
        },
        {
          element: <PersonPage />,
          path: '/person',
        },
      ],
    },
  ],
  {
    basename: '/',
  }
)
