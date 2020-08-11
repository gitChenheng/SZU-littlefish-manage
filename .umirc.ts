import { defineConfig } from "umi";
import path from "path";

export default defineConfig({
    define: {
        "process.env.requestPrefix": "http://localhost:3001/"
    },
    alias: {
        "@public": path.join(process.cwd(), "/public")
    },
    publicPath: "/public/",
    nodeModulesTransform: {
        type: "none",
    },
    sass: {},
    routes: [
        { exact: false, path: '/', component: '@/layouts/index',
            routes: [
                { path: "/login", exact: true, component: "@/pages/login" },
                { path: "/", exact: true, redirect: "/home" },
                { path: "/home", exact: true, component: "@/pages/home" },
                { path: "/exportStudents", exact: true, component: "@/pages/exportStudents" },
                { path: "/exportTeachers", exact: true, component: "@/pages/exportTeachers" },
                { path: "/exportParents", exact: true, component: "@/pages/exportParents" },
                { path: "/exportTranscripts", exact: true, component: "@/pages/exportTranscripts" },
                { component: '@/pages/404' },
            ],
        },
    ],
});
