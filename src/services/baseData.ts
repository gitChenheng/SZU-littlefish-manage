import {get, post} from "@/utils/request";

export const fetchBaseStudents = async () => {
    return await get("/api/baseData/getBaseStudents?role=1")
}

export const exportsBaseStudents = async (params: any[]) => {
    return await post("/api/baseData/exportBaseStudents", params)
}
