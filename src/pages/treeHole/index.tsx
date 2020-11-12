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
                    <Collapse.Panel
                        key={it.id}
                        header={<div style={{position: 'relative'}}>
                            <div style={{fontSize: 12}}>
                                {`${it.type === 1 ? "学习小树洞" : it.type === 2 ? "心灵小树洞" : "家长意见"}`}
                                {` ( ${it.anonymous ? "匿名" : it.issuener.name} )`}
                                {` ( ${it.created_at} ) : `}
                            </div>
                            <div style={{fontSize: 14}}>{`${it.issue}`}</div>
                        </div>}
                    >
                        {it.comments.map((item: any, index: any) => (
                            <div key={index} style={{paddingLeft: 30}}>
                                <div style={{fontSize: 13}}>{item.name} : {item.content}</div>
                                <div style={{textAlign: "right", fontSize: 12}}>— {item.created_at}</div>
                            </div>
                        ))}
                        <div style={{paddingLeft: 30}}>
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
            {!interact.treeHoles.length && '暂无'}
        </Fragment>;
    }
}
export default connect(
    interact => ({...interact}),
)(TreeHole)
