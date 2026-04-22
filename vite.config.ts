import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import legacy from '@vitejs/plugin-legacy'
import crossOriginIsolation from 'vite-plugin-cross-origin-isolation'
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";
import checker from 'vite-plugin-checker';
import { serverRoot } from './src/serverRoot';

console.log("ROOT",serverRoot)

export default defineConfig({
  base: serverRoot,
  plugins: [
      react(),
      wasm(),
      topLevelAwait(),
      crossOriginIsolation(),
      checker({ typescript: {
          root: './',
          tsconfigPath: 'tsconfig.json'

      }}),
      legacy({
          modernTargets: ['defaults'],
          modernPolyfills: true,
          renderLegacyChunks: false,
      }),
      {
          name: "configure-response-headers",
          configureServer: (server) => {
              server.middlewares.use((_req, res, next) => {
                  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
                  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
                  next();
              });
          },
      },
  ],
  server: {
      proxy: {
        "/cod/" : {
          "target" : "https://www.crystallography.net",
          "changeOrigin" : true
        },
      },
      headers: {
          "Cross-Origin-Opener-Policy": "same-origin",
          "Cross-Origin-Embedder-Policy": "require-corp",
      },
      watch: {
          ignored: [
              '**/public/monomers/**',
              '**/public/wasm/**',
              '**/public/pixmaps/**',
              '**/public/tutorials/**'
          ]
      }
  },
});
