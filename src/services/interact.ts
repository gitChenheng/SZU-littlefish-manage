import {get, post} from "@/utils/request";

export const fetchTreeHoles = async () => {
    return await get("/api/treeHole/getAllTreeHoles")
}
export const fetchTogether = async () => {
    return await get("/api/ann/getTogether")
}

// export const exportsScientific = async (params: any) => {
//     return await post("/api/ann/exportScientificDirect", params)
// }
