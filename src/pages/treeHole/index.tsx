import React, {Fragment, Component} from "react";
import {Collapse, Input, Button} from "antd";
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
                        {it.comments.map((item: any, index: any) => (
                            <p key={index}>{item.name} : {item.content}-{item.created_at}</p>
                        ))}
                        <div>
                            <Input
                                style={{width: 300, marginRight: 20}}
                                value={it.comment}
                                onChange={e => {
                                    it.comment = e.target.value
                                }}
                            />
                            <Button
                                type="primary"
                                onClick={() => {
                                    const payload = {
                                        treeHoleId: it.id,
                                        content: it.comment,
                                    }
                                    dispatch({
                                        type: "interact/pushComment",
                                        payload
                                    })
                                }}
                            >评论</Button>
                        </div>
                    </Collapse.Panel>
                ))}
            </Collapse>
        </Fragment>;
    }
}
export default connect(
    interact => ({...interact}),
)(TreeHole)
