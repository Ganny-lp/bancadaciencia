import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    // ESSA LINHA É A CHAVE:
    base: '/bancadaciencia/',
    plugins: [react()],
})