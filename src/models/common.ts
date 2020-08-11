export default {
    namespace: "common", // 表示在全局 state 上的 key
    state: {
        loading: false,
    },
    reducers: {
        loadingOn(state: any, payload: any){
            return {
                ...state,
                loading: true,
            }
        },
        loadingOff(state: any, payload: any){
            return {
                ...state,
                loading: false,
            }
        },
    }, // 管理同步方法，必须是纯函数
    effects: {
    }, // 管理异步操作，采用了 generator 的相关概念
    subscriptions: {}, // 订阅数据源
}
