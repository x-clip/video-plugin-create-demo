import { defineConfig, normalizePath } from "vite";
import react from "@vitejs/plugin-react";
import mkcert from "vite-plugin-mkcert";
//@ts-ignore
import path from 'path';

//@ts-ignore
const resolve = url => normalizePath(path.resolve(__dirname, url));

export default defineConfig({
  resolve: {
    alias: {
      "@sdk": resolve("./src/sdk"),
      "@utils": resolve("./src/utils"),
      "@plugins": resolve("./src/pages/editor/plugins"),
    },
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json"], // 省略扩展名
  },
  plugins: [
    mkcert({
      source: "coding",
      savePath: "./ssh",
    }),
    react({
      babel: {
        plugins: [
          ["@babel/plugin-proposal-decorators", { legacy: true }],
          ["@babel/plugin-proposal-class-properties", { loose: true }],
        ],
      },
    }),
  ],
  css: {
    modules: {
      generateScopedName: "[name]__[local]__[hash:5]",
    },
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  base: "/", // 公共基础路径
  server: {
    https: true,
    host: "0.0.0.0",
    port: 3003,
    proxy: {
      "/cgi-bin": {
        target: "https://video.h5ds.com",
        changeOrigin: true,
      },
      "/api": {
        target: "https://video.h5ds.com",
        changeOrigin: true,
      },
    },
  },
});
