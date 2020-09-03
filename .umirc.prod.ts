import { defineConfig } from "umi";
import path from "path";

export default defineConfig({
    define: {
        "process.env.requestPrefix": "https://www.denominator.online:3001"
    },
    alias: {
      "@public": path.join(process.cwd(), "/public")
    },
    publicPath: "/",
    nodeModulesTransform: {
      type: "none",
    },
    sass: {},
    // base: '/web/',  //部署到非根目录时才需配置
    // treeShaking: true, //去除未使用的引入
    // hash: true, //开启打包文件的hash值后缀
    // targets: {
    //     ie: 10
    // },
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
    // alias: {'@': resolve(__dirname, '../src'), }, //别名，umirc.js为'src'
    // proxy: {
    //     "/api": {
    //         "target": "http://jsonplaceholder.typicode.com/",
    //         "changeOrigin": true,
    //         "pathRewrite": { "^/api" : "" }
    //     }
    // },
    // plugins: [
    //     [
    //         'umi-plugin-react',
    //         {
    //             antd: true, //启用后自动配置 babel-plugin-import，实现antd按需加载
    //             dynamicImport: { //实现路由级的动态加载
    //                 webpackChunkName: true //实现有意义的异步文件名
    //             },
    //             dva: {
    //                 dynamicImport: true, //是否启用按需加载
    //                 hmr: true //是否启用 dva 的 热更新
    //             },
    //             //通过 webpack 的 dll 插件预打包一份 dll 文件来达到二次启动提速的目的
    //             dll: {
    //                 exclude: [],
    //                 include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch', 'antd/es']
    //             },
    //             //约定式路由时才需引用，用于忽略指定文件夹中自动生成的路由
    //             routes: {
    //                 exclude: [
    //                     /components\//,
    //                     /model\.(j|t)sx?$/,
    //                     /components\.(j|t)sx?$/,
    //                     /service\.(j|t)sx?$/,
    //                     /models\//,
    //                     /services\//
    //                 ],
    //             },
    //         }
    //     ]
    // ],
});
