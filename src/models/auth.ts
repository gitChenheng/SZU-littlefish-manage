export default {
    namespace: "auth", // 表示在全局 state 上的 key
    state: {
        loginStatus: false,
    },
    reducers: {
        changeLoginStatus(state: any, payload: any){
            return {
                ...state,
                loginStatus: payload.payload,
            }
        }
    }, // 管理同步方法，必须是纯函数
    effects: {}, // 管理异步操作，采用了 generator 的相关概念
    subscriptions: {}, // 订阅数据源
}
