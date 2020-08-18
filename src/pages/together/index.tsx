import React, {Fragment, Component} from "react";
import {connect} from "umi";
import {Table, DatePicker, Input} from "antd";

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
                title: '时间',
                dataIndex: 'time',
                key: 'time',
                render: (text: any, record: any, index: number) =>
                    <DatePicker
                        onChange={(date, dateString) => {
                            console.log(date, dateString);
                        }}
                    />,
            },
            {
                title: '地点',
                dataIndex: 'address',
                key: 'address',
                render: (text: any, record: any, index: number) => <div>
                    <Input/>
                </div>,
            },
        ],
    }
    render() {
        const {dispatch, interact} = this.props;
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
