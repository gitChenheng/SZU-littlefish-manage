import {completeTogether, fetchTogether, fetchTreeHoleComments, fetchTreeHoles, pushComment} from "@/services/interact";
import {message} from "antd";

export default {
    namespace: "interact",
    state: {
        treeHoles: [],
        together: [],
    },
    reducers: {
        getTreeHoles(state: any, {payload}: any){
            return {
                ...state,
                treeHoles: payload,
            }
        },
        getTogether(state: any, {payload}: any){
            return {
                ...state,
                together: payload,
            }
        },
        updateTogether(state: any, {payload}: any){
            const replaceOne = state.together.map((item: any) => {
                if (payload.id === item.id){
                    return payload;
                }
                return item;
            })
            return {
                ...state,
                together: replaceOne
            }
        }
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
        *fetchTreeHoleComments(_: any, {call, put}: any){
            try {
                const r = yield call(fetchTreeHoleComments, _.payload)
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
        *pushComment(_: any, {call, put}: any){
            try {
                const r = yield call(pushComment, _.payload)
                if (r.code === "1"){
                    message.success("提交成功");
                    yield put({type: "fetchTreeHoles"})
                }else{
                    message.warn(r.msg);
                }
            }catch (e) {
                throw e
            }
        },
        *completeTogether(_: any, {call, put}: any){
            try {
                const r = yield call(completeTogether, _.payload)
                if (r.code === "1"){
                    message.success("提交成功");
                    yield put({type: "fetchTogether"})
                }else{
                    message.warn(r.msg);
                }
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
