import {
    exportsCompetition,
    exportsRecruit,
    exportsScientific,
    fetchCompetitions,
    fetchRecruits,
    fetchScientific
} from "@/services/ann";
import {message} from "antd";

export default {
    namespace: "ann",
    state: {
        scientific: [],
        competitions: [],
        recruits: [],
    },
    reducers: {
        getScientific(state: any, payload: any){
            return {
                ...state,
                scientific: payload.payload,
            }
        },
        getCompetitions(state: any, payload: any){
            return {
                ...state,
                competitions: payload.payload,
            }
        },
        getRecruits(state: any, payload: any){
            return {
                ...state,
                recruits: payload.payload,
            }
        },
    },
    effects: {
        *fetchScientific(_: any, {call, put}: any){
            try {
                const data = yield call(fetchScientific)
                yield put({
                    type: "getScientific",
                    payload: data.data,
                })
            }catch (e) {
                throw e
            }
        },
        *fetchCompetitions(_: any, {call, put}: any){
            try {
                const data = yield call(fetchCompetitions)
                yield put({
                    type: "getCompetitions",
                    payload: data.data,
                })
            }catch (e) {
                throw e
            }
        },
        *fetchRecruits(_: any, {call, put}: any){
            try {
                const data = yield call(fetchRecruits)
                yield put({
                    type: "getRecruits",
                    payload: data.data,
                })
            }catch (e) {
                throw e
            }
        },
        *exportsScientific(_: any, {call, put}: any){
            try {
                const r = yield call(exportsScientific, _.payload)
                if (r.code === "1"){
                    message.success("发布成功");
                    yield put({type: "fetchScientific"})
                }else{
                    message.warn(r.msg);
                }
            }catch (e) {
                throw e
            }
        },
        *exportsCompetition(_: any, {call, put}: any){
            try {
                const r = yield call(exportsCompetition, _.payload)
                if (r.code === "1"){
                    message.success("发布成功");
                    yield put({type: "fetchCompetitions"})
                }else{
                    message.warn(r.msg);
                }
            }catch (e) {
                throw e
            }
        },
        *exportsRecruit(_: any, {call, put}: any){
            try {
                const r = yield call(exportsRecruit, _.payload)
                if (r.code === "1"){
                    message.success("发布成功");
                    yield put({type: "fetchRecruits"})
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
                if (pathname === "/main/annScientific") {
                    dispatch({
                        type: "fetchScientific",
                    })
                }
                if (pathname === "/main/annCompetition") {
                    dispatch({
                        type: "fetchCompetitions",
                    })
                }
                if (pathname === "/main/annExamination") {
                    dispatch({
                        type: "fetchCompetitions",
                    })
                }
                if (pathname === "/main/annRecruit") {
                    dispatch({
                        type: "fetchRecruits",
                    })
                }
            });
        }
    },
}
