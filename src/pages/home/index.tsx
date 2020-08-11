import React, {Fragment, Component} from "react";
import style from "./index.scss";
import RightSpace from "@/components/hoc/RightSpace";

@RightSpace
export default class Home extends Component<any, any>{
    state = {}
    render() {
        return <Fragment>
            <img
                src={require("@public/img/example.png")} alt=""
                style={{width: 500}}
            />
        </Fragment>;
    }
}
