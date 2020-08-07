import { defineConfig } from "umi";

export default defineConfig({
    define: {
        "process.env.requestPrefix": "http://localhost:3001/"
    },
    nodeModulesTransform: {
        type: "none",
    },
    sass: {},
    routes: [
        { path: "/", exact: true, component: "@/pages/home" },
        { path: "/login", exact: true, component: "@/pages/login" },
        { path: "/list", exact: true, component: "@/pages/list" },
        { component: '@/pages/404' },
    ],
});
