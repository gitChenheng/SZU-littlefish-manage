import {
    exportsBaseParents, exportsBaseStudents, exportsBaseTeachers,
    fetchBaseParents, fetchBaseStudents, fetchBaseTeachers,
    fetchTranscripts, fetchParentStudent, exportsTranscripts, exportBaseParentStudent
} from "@/services/baseData";
import {message} from "antd";

export default {
    namespace: "baseData",
    state: {
        baseStudents: [],
        baseParents: [],
        baseTeachers: [],
        parentStudent: [],
        transcripts: [],
    },
    reducers: {
        getBaseStudents(state: any, {payload}: any){
            return {
                ...state,
                baseStudents: payload,
            }
        },
        getBaseParents(state: any, {payload}: any){
            return {
                ...state,
                baseParents: payload,
            }
        },
        getBaseTeachers(state: any, {payload}: any){
            return {
                ...state,
                baseTeachers: payload,
            }
        },
        getParentStudent(state: any, {payload}: any){
            return {
                ...state,
                parentStudent: payload,
            }
        },
        getTranscripts(state: any, {payload}: any){
            return {
                ...state,
                transcripts: payload,
            }
        },
    },
    effects: {
        *fetchBaseStudents(_: any, {call, put}: any){
            try {
                const data = yield call(fetchBaseStudents)
                yield put({
                    type: "getBaseStudents",
                    payload: data.data,
                })
            }catch (e) {
                throw e
            }
        },
        *fetchBaseParents(_: any, {call, put}: any){
            try {
                const data = yield call(fetchBaseParents)
                yield put({
                    type: "getBaseParents",
                    payload: data.data,
                })
            }catch (e) {
                throw e
            }
        },
        *fetchBaseTeachers(_: any, {call, put}: any){
            try {
                const data = yield call(fetchBaseTeachers)
                yield put({
                    type: "getBaseTeachers",
                    payload: data.data,
                })
            }catch (e) {
                throw e
            }
        },
        *fetchTranscripts(_: any, {call, put}: any){
            try {
                const data = yield call(fetchTranscripts)
                yield put({
                    type: "getTranscripts",
                    payload: data.data,
                })
            }catch (e) {
                throw e
            }
        },
        *exportsBaseStudents(_: any, {call, put}: any){
            try {
                const r = yield call(exportsBaseStudents, _.payload)
                if (r.code === "1"){
                    message.success("导入成功");
                    yield put({type: "fetchBaseStudents"})
                }else{
                    message.warn(r.msg)
                }
            }catch (e) {
                throw e
            }
        },
        *exportsBaseParents(_: any, {call, put}: any){
            try {
                const r = yield call(exportsBaseParents, _.payload)
                if (r.code === "1"){
                    message.success("导入成功");
                    yield put({type: "fetchBaseParents"})
                }else{
                    message.warn(r.msg)
                }
            }catch (e) {
                throw e
            }
        },
        *exportsBaseParentStudent(_: any, {call, put}: any){
            try {
                const r = yield call(exportBaseParentStudent, _.payload)
                if (r.code === "1"){
                    message.success("导入成功");
                }else{
                    message.warn(r.msg)
                }
            }catch (e) {
                throw e
            }
        },
        *exportsBaseTeachers(_: any, {call, put}: any){
            try {
                const r = yield call(exportsBaseTeachers, _.payload)
                if (r.code === "1"){
                    message.success("导入成功");
                    yield put({type: "fetchBaseTeachers"})
                }else{
                    message.warn(r.msg)
                }
            }catch (e) {
                throw e
            }
        },
        *exportsTranscripts(_: any, {call, put}: any){
            try {
                const r = yield call(exportsTranscripts, _.payload)
                if (r.code === "1"){
                    message.success("导入成功");
                    yield put({type: "fetchTranscripts"})
                }else{
                    message.warn(r.msg)
                }
            }catch (e) {
                throw e
            }
        },
    },
    subscriptions: {
        setup({ dispatch, history }: any) {
            return history.listen(({ pathname }: any) => {
                if (pathname === "/main/exportStudents") {
                    dispatch({
                        type: "fetchBaseStudents",
                    })
                }
                if (pathname === "/main/exportParents") {
                    dispatch({
                        type: "fetchBaseParents",
                    })
                }
                if (pathname === "/main/exportTeachers") {
                    dispatch({
                        type: "fetchBaseTeachers",
                    })
                }
                if (pathname === "/main/exportTranscripts") {
                    dispatch({
                        type: "fetchTranscripts",
                    })
                }
            });
        }
    },
}
