import { createRoot } from 'react-dom/client'
import './index.scss'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import 'my-react-component/dist/style.css'
import '@/i18n'
import { QueryClient, QueryClientProvider } from 'react-query'
import { RecoilRoot } from 'recoil'
import { Toast } from './components/toast/Toast'
import ResponsiveWindow from './layout/ResponsiveWindow'
const rootElement = document.querySelector('#root')

if (!rootElement) {
  throw new Error('Failed to find the root element')
}
const queryClient = new QueryClient({
  // defaultOptions: {
  //   queries: {
  //     suspense: true,
  //   },
  // },
})
const root = createRoot(rootElement)

root.render(
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      <ResponsiveWindow>
        <RouterProvider router={router} />
      </ResponsiveWindow>
      <Toast />
    </QueryClientProvider>
  </RecoilRoot>
)
