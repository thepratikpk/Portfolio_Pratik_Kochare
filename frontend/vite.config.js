import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'




// https://vite.dev/config/
export default defineConfig(({ mode }) => {

  const env = loadEnv(mode, process.cwd());
  return {

    // server:{
    //   proxy:{
    //     "/api":{
    //       target: env.VITE_BACKEND_URI,
    //       changeOrigin: true,
    //       secure: false,
    //     }

    //   }
    // },
    plugins: [react(),
      tailwindcss(),
    ],
  }
})
