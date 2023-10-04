import { createBrowserRouter } from 'react-router-dom'
import App from '@/app'
import { lazy } from 'react'

export const router = createBrowserRouter(
  [
    {
      element: <App />,
      children: [
        {
          path: '/',
          Component: lazy(() => import('@/views/LandingPage')),
        },
        {
          path: '/:media_type/:id',
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
          Component: lazy(() => import('@/views/SearchPage')),
        },
        {
          path: '/person/:personId',
          Component: lazy(() => import('@/views/ActorPage')),
          loader: ({ params }) => {
            return {
              personId: params.personId,
            }
          },
        },
        {
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
          Component: lazy(() => import('@/views/PersonPage')),
          path: '/person',
        },
        {
          Component: lazy(() => import('@/views/UserFavoritePage')),
          path: '/:username/favorites',
        },
      ],
    },
  ],
  {
    basename: '/',
  }
)
