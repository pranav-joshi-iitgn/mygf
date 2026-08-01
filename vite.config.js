import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Pass a function to defineConfig so we can check the current command
export default defineConfig(({ command }) => {
  return {
    plugins: [react()],
    // If we are building for production (npm run deploy), use the repository name.
    // If we are running locally (npm run dev), use the standard root directory.
    base: command === 'build' ? '/mygf/' : '/',
  }
})