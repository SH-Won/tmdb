import { createBrowserRouter } from 'react-router-dom'
import App from '@/app'
// import WidgetPage from '@/views/WidgetPage'
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
          loader: ({ params }) => {
            return {
              media: params.media,
              category: params.category,
            }
          },
          index: true,
        },
        {
          // element: <PersonPage />,
          Component: lazy(() => import('@/views/PersonPage')),
          path: '/person',
        },
        {
          Component: lazy(() => import('@/views/UserFavoritePage')),
          path: '/:username/favorites',
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
