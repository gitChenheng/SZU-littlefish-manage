import {get, post} from "@/utils/request";

export const fetchBaseStudents = async () => {
    return await get("/api/baseData/getBaseStudents?role=1")
}
export const fetchBaseParents = async () => {
    return await get("/api/baseData/getBaseStudents?role=2")
}
export const fetchBaseTeachers = async () => {
    return await get("/api/baseData/getBaseStudents?role=3")
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
