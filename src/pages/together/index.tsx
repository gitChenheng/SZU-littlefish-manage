import React, {Fragment, Component} from "react";
import {connect} from "umi";
import {Table, DatePicker, Input, Button} from "antd";
import moment from 'moment';
// import SockJS from "socket.io-client";
// import {getSessionStore} from "@/utils/storage";

// const roomName = "chat";
// const socket = new SockJS(`${process.env.wsPrefix}/${roomName}?token=${getSessionStore("token")}`);

class Together extends Component<any, any>{
    state = {
        columns: [
            {
                title: '科目名称',
                dataIndex: 'subject',
                key: 'subject',
            },
            {
                title: '知识点',
                dataIndex: 'knowledgePoint',
                key: 'knowledgePoint',
            },
            {
                title: '提交人',
                dataIndex: 'submitter',
                key: 'submitter',
            },
            {
                title: '提交时间',
                dataIndex: 'created_at',
                key: 'created_at',
            },
            {
                title: '辅导时间',
                dataIndex: 'time',
                key: 'time',
                render: (text: any, record: any, index: number) =>
                    <DatePicker
                        showTime
                        defaultValue={text ? moment(new Date(text), 'YYYY/MM/DD') : undefined}
                        onChange={(date, dateString) => {
                            this.props.dispatch({
                                type: "interact/updateTogether",
                                payload: {
                                    ...record,
                                    time: dateString,
                                }
                            })
                        }}
                    />,
            },
            {
                title: '辅导地点',
                dataIndex: 'address',
                key: 'address',
                render: (text: any, record: any, index: number) => <div>
                    <Input
                        defaultValue={text}
                        onChange={e => {
                            this.props.dispatch({
                                type: "interact/updateTogether",
                                payload: {
                                    ...record, address: e.target.value
                                }
                            })
                        }}
                    />
                </div>,
            },
            {
                title: '操作',
                dataIndex: 'action',
                key: 'action',
                render: ((text: any, record: any) =>
                    <Button type="primary" onClick={() => {
                        record.time = new Date(record.time).getTime();
                        this.props.dispatch({
                          type: "interact/completeTogether",
                          payload: record
                        })
                    }}>保存</Button>
                )
            }
        ],
    }
    componentDidMount() {
      // socket.emit('message', {type: "content", content: 111})
      // socket.on("enter", (msg: any) => {
      //   console.log(msg)
      // })
    }

  render() {
        const {interact} = this.props;
        return <Fragment>
            <Table
                rowKey="id"
                bordered
                columns={this.state.columns}
                dataSource={interact.together}
            />
        </Fragment>;
    }
}
export default connect(
    interact => ({...interact}),
)(Together)
