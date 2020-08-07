import React, {Fragment, Component} from "react";
import style from "./index.scss";
import NavBar from "@/components/NavBar";

export default class Home extends Component<any, any>{
    state = {}
    render() {
        return <Fragment>
            <div className={style.content}>
                <NavBar/>
                <div>
                    page
                </div>
            </div>
        </Fragment>;
    }
}
