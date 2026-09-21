import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  build: {
    target: "es2020",
    cssCodeSplit: true,
    sourcemap: false,
    assetsInlineLimit: 2048,
    reportCompressedSize: true,
    rollupOptions: {
      output: {
        // Chunking applies to the client build only — in an SSR build these
        // packages are externalised, and naming them here is an error.
        //
        // `three` is only ever reached through a dynamic import, so Rollup
        // already emits it as its own async chunk. Naming it is a guardrail:
        // it keeps the chunk name stable and makes an accidental static
        // import obvious in the build output instead of silently inflating
        // the entry chunk.
        manualChunks: isSsrBuild
          ? undefined
          : {
              react: ["react", "react-dom"],
              motion: ["framer-motion"],
              three: ["three"],
            },
      },
    },
  },
}));
