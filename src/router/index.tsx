import { createBrowserRouter } from 'react-router-dom'
import App from '@/app'
import LandingPage from '@/views/LandingPage'
import DetailPage from '@/views/DetailPage'
import SearchPage from '@/views/SearchPage'
import ActorPage from '@/views/ActorPage'
import MoviePage from '@/views/MoviePage'
// import Overall from '@/overall'
// import WidgetPage from '@/views/WidgetPage'
import PersonPage from '@/views/PersonPage'
import { lazy } from 'react'

export const router = createBrowserRouter(
  [
    {
      element: <App />,
      children: [
        {
          path: '/',
          // element: <LandingPage />,
          Component: lazy(() => import('@/views/LandingPage')),
        },
        {
          path: '/:media_type/:id',
          // element: <DetailPage />,
          Component: lazy(() => import('@/views/DetailPage')),
          loader: ({ params }) => {
            return {
              media_type: params.media_type,
              id: params.id,
            }
          },
        },
        {
          path: '/search',
          // element: <SearchPage />,
          Component: lazy(() => import('@/views/SearchPage')),
        },
        {
          path: '/person/:personId',
          // element: <ActorPage />,
          Component: lazy(() => import('@/views/ActorPage')),
          loader: ({ params }) => {
            return {
              personId: params.personId,
            }
          },
        },

        // {
        //   path: '/widget',
        //   element: <WidgetPage />,
        // },
        {
          // element: <MoviePage />,
          path: '/overall/:media/:category',
          Component: lazy(() => import('@/views/MoviePage')),
          index: true,
        },
        {
          // element: <PersonPage />,
          Component: lazy(() => import('@/views/PersonPage')),
          path: '/person',
        },
      ],
    },
    // {
    //   element: <Overall />,
    //   children: [
    //     {
    //       element: <MoviePage />,
    //       path: '/overall/:media/:category',
    //       index: true,
    //     },
    //     {
    //       element: <PersonPage />,
    //       path: '/person',
    //     },
    //   ],
    // },
  ],
  {
    basename: '/',
  }
)
