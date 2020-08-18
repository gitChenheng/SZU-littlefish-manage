import React, {Fragment, Component} from "react";
import {Button, Divider, Form, Input, Table} from "antd";
import {connect} from "umi";

class AnnCompetition extends Component<any, any>{
    private form: any;
    state = {
        columns: [
            {
                title: '标题',
                dataIndex: 'title',
                key: 'title',
                width: 100
            },
            {
                title: '比赛介绍',
                dataIndex: 'introduce',
                key: 'introduce',
            },
            {
                title: '报名条件',
                dataIndex: 'condition',
                key: 'condition',
            },
            {
                title: '时间安排',
                dataIndex: 'schedule',
                key: 'schedule',
            },
            {
                title: '报名途径',
                dataIndex: 'way',
                key: 'way',
            },
        ],
    }
    render() {
        const {dispatch, ann} = this.props;
        return <Fragment>
            <Form
                style={{marginTop: 20}}
                name="AnnCompetition"
                ref={el => this.form = el}
                labelCol={{span: 6}}
                wrapperCol={{span: 14}}
                onFinish={(values: any) => {
                    dispatch({
                        type: "ann/exportsCompetition",
                        payload: {...values, type: 1}
                    });
                    setTimeout(() => {
                        this.form.setFieldsValue({ title: "", introduce: "", condition: "", schedule: "", way: ""});
                    }, 0)
                }}
                onFinishFailed={(e) => {
                    console.log(e);
                }}
            >
                <Form.Item
                    label="标题"
                    name="title"
                    rules={[{ required: true, message: 'Please input your title!' }]}
                ><Input />
                </Form.Item>
                <Form.Item
                    label="比赛介绍"
                    name="introduce"
                    rules={[{ required: true, message: 'Please input your introduce!' }]}
                ><Input.TextArea />
                </Form.Item>
                <Form.Item
                    label="报名条件"
                    name="condition"
                    rules={[{ required: true, message: 'Please input your condition!' }]}
                ><Input.TextArea />
                </Form.Item>
                <Form.Item
                    label="时间安排"
                    name="schedule"
                    rules={[{ required: true, message: 'Please input your schedule!' }]}
                ><Input.TextArea />
                </Form.Item>
                <Form.Item
                    label="报名途径"
                    name="way"
                    rules={[{ required: true, message: 'Please input your way!' }]}
                ><Input.TextArea />
                </Form.Item>
                <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                    <Button type="primary" htmlType="submit">提交</Button>
                </Form.Item>
            </Form>
            <Divider/>
            <Table
                rowKey="title"
                bordered
                columns={this.state.columns}
                dataSource={ann.competitions.type1}
            />
        </Fragment>;
    }
}

export default connect(
    ann => ({...ann}),
)(AnnCompetition)
