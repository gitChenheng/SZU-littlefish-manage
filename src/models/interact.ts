import {fetchTogether, fetchTreeHoles} from "@/services/interact";

export default {
    namespace: "interact",
    state: {
        treeHoles: [],
        together: [],
    },
    reducers: {
        getTreeHoles(state: any, payload: any){
            return {
                ...state,
                treeHoles: payload.payload,
            }
        },
        getTogether(state: any, payload: any){
            return {
                ...state,
                together: payload.payload,
            }
        },
    },
    effects: {
        *fetchTreeHoles(_: any, {call, put}: any){
            try {
                const data = yield call(fetchTreeHoles)
                yield put({
                    type: "getTreeHoles",
                    payload: data.data,
                })
            }catch (e) {
                throw e
            }
        },
        *fetchTogether(_: any, {call, put}: any){
            try {
                const data = yield call(fetchTogether)
                yield put({
                    type: "getTogether",
                    payload: data.data,
                })
            }catch (e) {
                throw e
            }
        },
    },
    subscriptions: {
        setup({ dispatch, history }: any) {
            return history.listen(({ pathname }: any) => {
                if (pathname === "/main/treeHole") {
                    dispatch({
                        type: "fetchTreeHoles",
                    })
                }
                if (pathname === "/main/together") {
                    dispatch({
                        type: "fetchTogether",
                    })
                }
            });
        }
    },
}
