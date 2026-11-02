import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const apiKey = env.FAVORIT_API_KEY || ''

  return {
    plugins: [react()],
    test: {
      environment: 'jsdom',
      setupFiles: './src/test/setup.js',
      css: true,
      coverage: {
        provider: 'v8',
        reporter: ['text', 'html'],
        include: ['src/**/*.{js,jsx}'],
        exclude: [
          'src/main.jsx',
          'src/**/index.js',
          'src/test/**',
        ],
        thresholds: {
          statements: 45,
          branches: 30,
          functions: 40,
          lines: 50,
        },
      },
    },
    server: {
      proxy: {
        '/api/parts': {
          target: 'http://api.favorit-parts.ru',
          changeOrigin: true,
          rewrite: (path) => {
            const apiPath = path.replace(
              /^\/api\/parts/,
              '/hs/hsprice/',
            )
            const separator = apiPath.includes('?') ? '&' : '?'
            return `${apiPath}${separator}key=${encodeURIComponent(apiKey)}`
          },
        },
      },
    },
  }
})
