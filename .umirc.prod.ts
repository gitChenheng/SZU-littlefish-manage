import { defineConfig } from "umi";

export default defineConfig({
    define: {
        "process.env.requestPrefix": "http://www.denominator.online:3001/"
    },
    // base: '/web/',  //部署到非根目录时才需配置
    // treeShaking: true, //去除未使用的引入
    hash: true, //开启打包文件的hash值后缀
    targets: {
        ie: 10
    },
    nodeModulesTransform: {
        type: "none",
    },
    routes: [
        { path: "/", component: "@/pages/home" },
        { path: "/login", component: "@/pages/login" },
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
