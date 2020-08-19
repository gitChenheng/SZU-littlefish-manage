import { defineConfig } from "umi";
import path from "path";

export default defineConfig({
    define: {
        "process.env.requestPrefix": "https://www.denominator.online:3001/"
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
        { path: "/login", exact: true, component: "@/pages/login" },
        { path: '/', exact: false, component: '@/layouts/index',
            routes: [
                { path: "/", exact: true, redirect: "/main"},
                { path: "/main", exact: false, component: "@/pages/main", wrappers: ['@/pages/auth'],
                    routes: [
                        { path: "/main", exact: true, redirect: "/main/home" },
                        { path: "/main/home", exact: true, component: "@/pages/home" },
                        { path: "/main/exportStudents", exact: true, component: "@/pages/exportStudents" },
                        { path: "/main/exportTeachers", exact: true, component: "@/pages/exportTeachers" },
                        { path: "/main/exportParents", exact: true, component: "@/pages/exportParents" },
                        { path: "/main/exportTranscripts", exact: true, component: "@/pages/exportTranscripts" },
                        { path: "/main/annScientific", exact: true, component: "@/pages/annScientific" },
                        { path: "/main/annCompetition", exact: true, component: "@/pages/annCompetition" },
                        { path: "/main/annExamination", exact: true, component: "@/pages/annExamination" },
                        { path: "/main/annRecruit", exact: true, component: "@/pages/annRecruit" },
                        { path: "/main/treeHole", exact: true, component: "@/pages/treeHole" },
                        { path: "/main/together", exact: true, component: "@/pages/together" },
                        { component: '@/pages/404' },
                    ]
                },
                { component: '@/pages/404' },
            ],
        },
    ],
});
