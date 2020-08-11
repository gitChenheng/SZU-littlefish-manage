import {exportsBaseStudents, fetchBaseStudents} from "@/services/baseData";
import {message} from "antd";

export default {
    namespace: "baseData",
    state: {
        baseStudents: [],
    },
    reducers: {
        getBaseStudents(state: any, payload: any){
            return {
                ...state,
                baseStudents: payload.payload,
            }
        },
    },
    effects: {
        *fetchBaseStudents(_: any, {call, put}: any){
            try {
                yield put({type: "common/loadingOn"})
                const data = yield call(fetchBaseStudents)
                yield put({
                    type: "getBaseStudents",
                    payload: data.data,
                })
                yield put({type: "common/loadingOff"})
            }catch (e) {
                throw e
            }
        },
        *exportsBaseStudents(_: any, {call, put}: any){
            try {
                yield put({type: "common/loadingOn"})
                const r = yield call(exportsBaseStudents, _.payload)
                yield put({type: "common/loadingOff"})
                yield put({type: "fetchBaseStudents"})
                if (r.code === "1"){
                    message.success("导入成功")
                }else{
                    message.warn(r.msg)
                }
            }catch (e) {
                throw e
            }
        }
    },
    subscriptions: {
        setup({ dispatch, history }: any) {
            return history.listen(({ pathname }: any) => {
                if (pathname === "/exportStudents") {
                    dispatch({
                        type: "fetchBaseStudents",
                    })
                }
            });
        }
    },
}