import Axios from "axios";
import {getSessionStore} from "@/utils/storage";
import {history} from "@@/core/history";
import {message} from "antd";

let instance: any = null;

export const createAxiosIns = () => {
    instance = Axios.create({
        baseURL: process.env.requestPrefix,
        timeout: 10000,
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export const getIns = () => {
    if (!instance){
        createAxiosIns()
    }
    return instance;
}

export const get = (url: string) => {
    return new Promise((resolve, reject) => {
        getIns().get(url, {headers: {"token": getSessionStore("token") || ""}})
            .then((r: any) => {
                if (r.status === 200){
                    if (r.data && r.data.code === "4"){
                        history.push("/login");
                    }else{
                        resolve(r.data)
                    }
                }else{
                    reject(r.data.msg);
                    message.warn(r.data.msg);
                }
            })
            .catch((e: any) =>
                reject(e)
            );
    })
}

export const post = (url: string, data?: object) => {
    return new Promise((resolve, reject) => {
        getIns().post(url, data, {headers: {"token": getSessionStore("token") || ""}})
            .then((r: any) => {
                if (r.status === 200){
                    if (r.data && r.data.code === "4"){
                        history.push("/login");
                    }else{
                        resolve(r.data);
                    }
                }else{
                    reject(r.data.msg);
                    message.warn(r.data.msg);
                }
            })
            .catch((e: any) => {
                message.warn("网络错误");
            });
    })
}





