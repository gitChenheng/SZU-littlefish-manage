import React, {useEffect, useState} from "react";
import {post} from "@/utils/request";

export default (props: any) => {
    const [authority, setAuthority] = useState(false);
    useEffect(() => {
        post("/api/admin/testToken").then((r: any) => {
            setAuthority(true);
        })
    }, [])
    if (authority) {
        return props.children;
    } else {
        return null;
    }
}
