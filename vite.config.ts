import {defineConfig} from 'vite'
import dns from 'dns'
import * as path from "path";
import tsconfigPaths from 'vite-tsconfig-paths'
import react from "@vitejs/plugin-react";

dns.setDefaultResultOrder('verbatim')
export default defineConfig({
    plugins: [tsconfigPaths()],
    build: {
        rollupOptions: {
            input: {
                app: './index.html', // default
            },
        },
    },
    server: {
        port: 3000,
        host: 'localhost',
    },
    resolve: {
        alias: [
            {find: '@', replacement: path.resolve(__dirname, 'src')},
        ],
    },
})
