import {get, post} from "@/utils/request";

export const fetchTreeHoles = async () => {
    return await get("/api/treeHole/getAllTreeHoles")
}
export const fetchTreeHoleComments = async (params: any) => {
    return await post("/api/treeHole/getTreeHoleComments", params)
}
export const fetchTogether = async () => {
    return await get("/api/ann/getTogether")
}

export const pushComment = async (params: any) => {
    return await post("/api/treeHole/addTreeHoleComment", params)
}
export const completeTogether = async (params: any) => {
    return await post("/api/ann/completeTogether", params)
}
