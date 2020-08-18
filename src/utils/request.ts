import Axios from "axios";
import {getSessionStore} from "@/utils/storage";
import {history} from "@@/core/history";
import {message} from "antd";

let dom: any = null;
let instance: any = null;

export const createSpin = () => {
    dom = document.createElement("div");
    const spin = document.createElement("img");
    spin.setAttribute("src", require("@public/iconfonts/icn_loading.svg"));
    spin.setAttribute("class", "spin");
    dom.appendChild(spin);
    dom.setAttribute("id", "loading");
    dom.setAttribute("class", "loading hide");
    document.body.appendChild(dom);
}
export const getSpin = () => {
    if (!dom){
        createSpin();
    }
    return dom;
}
export const showLoading = () => {
    getSpin().setAttribute("class", "loading show");
}
export const hideLoading = () => {
    getSpin().setAttribute("class", "loading hide");
}

export const createAxiosIns = () => {
    instance = Axios.create({
        baseURL: `${process.env.requestPrefix}`,
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
    showLoading()
    return new Promise((resolve, reject) => {
        getIns().get(url, {headers: {"token": getSessionStore("token") || ""}})
            .then((r: any) => {
                hideLoading()
                if (r.status === 200){
                    if (r.data && r.data.code === "4"){
                        history.push("/login");
                    }else{
                        resolve(r.data)
                    }
                }else{
                    message.warn(r.data.msg);
                }
            })
            .catch((e: any) => {
                hideLoading();
                message.error("请求出错...")
                console.log(e);
            });
    })
}
export const post = (url: string, data?: object) => {
    showLoading()
    return new Promise((resolve, reject) => {
        getIns().post(url, data, {headers: {"token": getSessionStore("token") || ""}})
            .then((r: any) => {
                hideLoading();
                if (r.status === 200){
                    if (r.data && r.data.code === "4"){
                        history.push("/login");
                    }else{
                        resolve(r.data);
                    }
                }else{
                    message.warn(r.data.msg);
                }
            })
            .catch((e: any) => {
                hideLoading();
                message.error("请求出错...")
                console.log(e);
            });
    })
}
