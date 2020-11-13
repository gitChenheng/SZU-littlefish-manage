import React, {Fragment, Component} from "react";
import {Collapse, Input, Button, Pagination, message} from "antd";
import {connect} from "umi";
import {post} from "@/utils/request";

class TreeHole extends Component<any, any>{
    state = {
        pageIndex: 1,
        pageSize: 10,
    }
    render() {
        const {dispatch, interact} = this.props;
        const {treeHoles} = interact;
        const {pageIndex, pageSize} = this.state;
        return <Fragment>
            <div style={{marginBottom: 10}}>
                <Pagination
                    current={pageIndex} pageSize={pageSize} total={treeHoles.total}
                    showSizeChanger
                    onChange={(pg, pgSize) => {
                        this.setState({
                            pageIndex: pg,
                            pageSize: pgSize
                        })
                        dispatch({
                            type: "interact/fetchTreeHoles",
                            payload: {
                                pageIndex: pg,
                                pageSize: pgSize
                            }
                        })
                    }}
                />
            </div>
            <Collapse style={{minWidth: 500}}>
                {treeHoles.data && treeHoles.data.map((it: any, i: number) => (
                    <Collapse.Panel
                        key={it.id}
                        header={<div style={{position: 'relative', marginRight: 20}}>
                            <div style={{fontSize: 12}}>
                                {`${it.type === 1 ? "学习小树洞" : it.type === 2 ? "心灵小树洞" :
                                    it.type === 3 ? "家长意见" : "老师建议"}`}
                                {` ( ${it.anonymous ? "匿名" : it.issuener.name} )`}
                                {` ( ${it.created_at} ) : `}
                            </div>
                            <div style={{fontSize: 14}}>{`${it.issue}`}</div>
                        </div>}
                        extra={it.comments.length ? null :
                            <div style={{position: 'absolute', top: 0, right: 0, fontSize: 11}}>待回复</div>}
                    >
                        {it.comments.map((item: any, index: any) => (
                            <div key={item.id} style={{paddingLeft: 30}}>
                                <div style={{fontSize: 13}}>
                                    {item.name} (<span
                                    style={{color: "red", cursor: "pointer"}}
                                    onClick={async () => {
                                        const r: any = await post("/api/treeHole/removeTreeHoleComment", {id: item.id});
                                        if (r.code === "1"){
                                            message.success("删除成功", 1 , () => {
                                                dispatch({
                                                    type: "interact/fetchTreeHoles",
                                                    payload: {pageIndex, pageSize}
                                                })
                                            });
                                        }else{
                                            message.warn(r.msg)
                                        }
                                    }}
                                >删除</span>) : {item.content}
                                </div>
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
            {treeHoles.data && treeHoles.data.length ? '' : '暂无'}
        </Fragment>;
    }
}
export default connect(
    interact => ({...interact}),
)(TreeHole)
