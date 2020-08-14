import {
    exportsBaseParents,
    exportsBaseStudents, exportsBaseTeachers,
    fetchBaseParents,
    fetchBaseStudents,
    fetchBaseTeachers
} from "@/services/baseData";
import {message} from "antd";

export default {
    namespace: "baseData",
    state: {
        baseStudents: [],
        baseParents: [],
        baseTeachers: [],
    },
    reducers: {
        getBaseStudents(state: any, payload: any){
            return {
                ...state,
                baseStudents: payload.payload,
            }
        },
        getBaseParents(state: any, payload: any){
            return {
                ...state,
                baseParents: payload.payload,
            }
        },
        getBaseTeachers(state: any, payload: any){
            return {
                ...state,
                baseTeachers: payload.payload,
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
                yield put({type: "common/loadingOff"})
                throw e
            }
        },
        *fetchBaseParents(_: any, {call, put}: any){
            try {
                yield put({type: "common/loadingOn"})
                const data = yield call(fetchBaseParents)
                yield put({
                    type: "getBaseParents",
                    payload: data.data,
                })
                yield put({type: "common/loadingOff"})
            }catch (e) {
                yield put({type: "common/loadingOff"})
                throw e
            }
        },
        *fetchBaseTeachers(_: any, {call, put}: any){
            try {
                yield put({type: "common/loadingOn"})
                const data = yield call(fetchBaseTeachers)
                yield put({
                    type: "getBaseTeachers",
                    payload: data.data,
                })
                yield put({type: "common/loadingOff"})
            }catch (e) {
                yield put({type: "common/loadingOff"})
                throw e
            }
        },
        *exportsBaseStudents(_: any, {call, put}: any){
            try {
                yield put({type: "common/loadingOn"})
                const r = yield call(exportsBaseStudents, _.payload)
                if (r.code === "1"){
                    message.success("导入成功");
                    yield put({type: "fetchBaseStudents"})
                }else{
                    message.warn(r.msg)
                }
                yield put({type: "common/loadingOff"})
            }catch (e) {
                yield put({type: "common/loadingOff"})
                throw e
            }
        },
        *exportsBaseParents(_: any, {call, put}: any){
            try {
                yield put({type: "common/loadingOn"})
                const r = yield call(exportsBaseParents, _.payload)
                if (r.code === "1"){
                    message.success("导入成功");
                    yield put({type: "fetchBaseParents"})
                }else{
                    message.warn(r.msg)
                }
                yield put({type: "common/loadingOff"})
            }catch (e) {
                yield put({type: "common/loadingOff"})
                throw e
            }
        },
        *exportsBaseTeachers(_: any, {call, put}: any){
            try {
                yield put({type: "common/loadingOn"})
                const r = yield call(exportsBaseTeachers, _.payload)
                if (r.code === "1"){
                    message.success("导入成功");
                    yield put({type: "fetchBaseTeachers"})
                }else{
                    message.warn(r.msg)
                }
                yield put({type: "common/loadingOff"})
            }catch (e) {
                yield put({type: "common/loadingOff"})
                throw e
            }
        },
    },
    subscriptions: {
        setup({ dispatch, history }: any) {
            return history.listen(({ pathname }: any) => {
                if (pathname === "/exportStudents") {
                    dispatch({
                        type: "fetchBaseStudents",
                    })
                }
                if (pathname === "/exportParents") {
                    dispatch({
                        type: "fetchBaseParents",
                    })
                }
                if (pathname === "/exportTeachers") {
                    dispatch({
                        type: "fetchBaseTeachers",
                    })
                }
            });
        }
    },
}
