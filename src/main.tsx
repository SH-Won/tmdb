import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import 'my-react-component/dist/style.css'
import '@/i18n'
import { QueryClient, QueryClientProvider } from 'react-query'
import { OverLay } from 'my-react-component'
import { RecoilRoot } from 'recoil'
const rootElement = document.querySelector('#root')

if (!rootElement) {
  throw new Error('Failed to find the root element')
}
const queryClient = new QueryClient()
const root = createRoot(rootElement)
root.render(
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      <Suspense
        fallback={
          <OverLay isOpen={true} opacity={0.8}>
            <img style={{ width: '250px', height: '250px' }} src="/assets/12.jpg" />
          </OverLay>
        }
      >
        <RouterProvider router={router}></RouterProvider>
      </Suspense>
    </QueryClientProvider>
  </RecoilRoot>
)
