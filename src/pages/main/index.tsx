import React, {Fragment, Component} from "react";
import RightSpace from "@/components/hoc/RightSpace";

@RightSpace
export default class Main extends Component<any, any>{
    render() {
        return this.props.children;
    }
}
