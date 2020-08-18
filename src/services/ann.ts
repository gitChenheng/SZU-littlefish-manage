import {get, post} from "@/utils/request";

export const fetchScientific = async () => {
    return await get("/api/ann/getScientificDirect")
}
export const fetchCompetitions = async () => {
    return await get("/api/ann/getCompetitions")
}
export const fetchRecruits = async () => {
    return await get("/api/ann/getRecruits")
}

export const exportsScientific = async (params: any) => {
    return await post("/api/ann/exportScientificDirect", params)
}
export const exportsCompetition = async (params: any) => {
    return await post("/api/ann/exportCompetition", params)
}
export const exportsRecruit = async (params: any) => {
    return await post("/api/ann/exportRecruit", params)
}
