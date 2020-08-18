import React, {Fragment, Component} from "react";
import {Divider, Collapse} from "antd";
import {connect} from "umi";

class TreeHole extends Component<any, any>{
    render() {
        const {dispatch, interact} = this.props;
        return <Fragment>
            <Collapse
                style={{minWidth: 500}}
                onChange={(key) => {console.log(key)}}
            >
                {interact.treeHoles.map((it: any, i: number) => (
                    <Collapse.Panel header={it.issue} key={i}>
                        <p>{'texzzttexzzttexzzttexzzttexzzttexzzt'}</p>
                    </Collapse.Panel>
                ))}
            </Collapse>
        </Fragment>;
    }
}
export default connect(
    interact => ({...interact}),
)(TreeHole)
