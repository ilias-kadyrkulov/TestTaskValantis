import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SkeletonTheme } from 'react-loading-skeleton'
import App from './App.tsx'
import './index.css'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
        <SkeletonTheme baseColor='#f0f0f037' highlightColor='#b9b9b937'>
            <App />
        </SkeletonTheme>
    </QueryClientProvider>
)
