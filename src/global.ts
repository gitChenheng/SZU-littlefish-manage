/**
 * created by ChaseChen at 2020.8
 */
import {createAxiosIns, post} from "@/utils/request";

createAxiosIns(); //单例

post("/api/admin/testToken").then((r: any) => {})
