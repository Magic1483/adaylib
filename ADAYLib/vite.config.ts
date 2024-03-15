import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import fs from "vite-plugin-fs"



export default defineConfig({
  plugins: [react(),fs()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  server:{
    host:true,
    port:80,
    proxy: {
      '/api': {
        target: "https://adaylib-serv.shrshishoshchov.repl.co",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
  }
  
}
})
