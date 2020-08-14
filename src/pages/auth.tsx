import React, {Fragment, useEffect, useState} from "react";
import {post} from "@/utils/request";

// const sleep = () => {
//     return new Promise(resolve => {
//         setTimeout(() => {
//             resolve(true);
//         }, 3000);
//     })
// }

export default (props: any) => {
    const [authority, setAuthority] = useState(false);
    useEffect(() => {
        post("/api/admin/testToken").then((r: any) => {
            // console.log(123)
            setAuthority(true);
        })
    }, [])
    if (authority) {
        return <Fragment>{ props.children }</Fragment>;
    } else {
        return null;
    }
}
