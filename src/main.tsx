import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import 'my-react-component/dist/style.css'
import '@/i18n'
import { QueryClient, QueryClientProvider } from 'react-query'
import { OverLay, PageLoadingSpinner } from 'my-react-component'
import { RecoilRoot } from 'recoil'
// import { initializeApp } from 'firebase/app'
// import { firebaseConfig } from './networks/firebase'
import { Toast } from './components/toast/Toast'
// import { getFirestore } from 'firebase/firestore'
const rootElement = document.querySelector('#root')

// const app = initializeApp(firebaseConfig)
// const db = getFirestore(app)
if (!rootElement) {
  throw new Error('Failed to find the root element')
}
const queryClient = new QueryClient()
const root = createRoot(rootElement)

root.render(
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toast />
    </QueryClientProvider>
  </RecoilRoot>
)
