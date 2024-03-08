import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '')
    return {
        define: {
            'process.env.API_PSWD': JSON.stringify(env.API_PSWD)
        },
        plugins: [react()],
        resolve: {
            alias: {
                '@': '/src'
            }
        }
    }
})
