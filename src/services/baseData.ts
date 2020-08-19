import {get, post} from "@/utils/request";

export const fetchBaseStudents = async () => {
    return await get("/api/baseData/getBaseUsers?role=1")
}
export const fetchBaseTeachers = async () => {
    return await get("/api/baseData/getBaseUsers?role=2")
}
export const fetchBaseParents = async () => {
    return await get("/api/baseData/getBaseUsers?role=3")
}
export const fetchParentStudent = async () => {
    return await get("/api/baseData/getBaseParentStudent")
}
export const fetchTranscripts = async () => {
    return await get("/api/baseData/getAllTranscripts")
}

export const exportsBaseStudents = async (params: any[]) => {
    return await post("/api/baseData/exportBaseStudents", params)
}
export const exportsBaseParents = async (params: any[]) => {
    return await post("/api/baseData/exportBaseTeachers", params)
}
export const exportsBaseTeachers = async (params: any[]) => {
    return await post("/api/baseData/exportBaseParents", params)
}
export const exportsTranscripts = async (params: any[]) => {
    return await post("/api/baseData/exportTranscripts", params)
}
