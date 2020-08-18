import React, {Fragment, Component} from "react";
import {connect} from "umi";
import {Button, Divider, Form, Input, Table} from "antd";

class AnnRecruit extends Component<any, any>{
    private form: any;
    state = {
        columns: [
            {
                title: '团队名称',
                dataIndex: 'teamName',
                key: 'teamName',
                width: 100
            },
            {
                title: '课题',
                dataIndex: 'issueName',
                key: 'issueName',
            },
            {
                title: '研究方向',
                dataIndex: 'direction',
                key: 'direction',
            },
            {
                title: '需要学生数',
                dataIndex: 'needStudent',
                key: 'needStudent',
            },
            {
                title: '联系人',
                dataIndex: 'contactInfo',
                key: 'contactInfo',
            },
            {
                title: '联系方式',
                dataIndex: 'contact',
                key: 'contact',
            },
        ],
    }
    render() {
        const {dispatch, ann} = this.props;
        return <Fragment>
            <Form
                style={{marginTop: 20}}
                name="AnnRecruit"
                ref={el => this.form = el}
                labelCol={{span: 6}}
                wrapperCol={{span: 14}}
                onFinish={(values: any) => {
                    dispatch({
                        type: "ann/exportsRecruit",
                        payload: values
                    });
                    setTimeout(() => {
                        this.form.setFieldsValue({
                            teamName: "", issueName: "", direction: "",
                            needStudent: "", contactInfo: "", contact: "",
                        });
                    }, 0)
                }}
                onFinishFailed={(e) => {
                    console.log(e);
                }}
            >
                <Form.Item
                    label="团队名称"
                    name="teamName"
                    rules={[{ required: true, message: 'Please input your teamName!' }]}
                ><Input />
                </Form.Item>
                <Form.Item
                    label="课题"
                    name="issueName"
                    rules={[{ required: true, message: 'Please input your issueName!' }]}
                ><Input.TextArea />
                </Form.Item>
                <Form.Item
                    label="研究方向"
                    name="direction"
                    rules={[{ required: true, message: 'Please input your direction!' }]}
                ><Input.TextArea />
                </Form.Item>
                <Form.Item
                    label="需要学生数"
                    name="needStudent"
                    rules={[{ required: true, message: 'Please input your needStudent!' }]}
                ><Input style={{width: 100}}/>
                </Form.Item>
                <Form.Item
                    label="联系人"
                    name="contactInfo"
                    rules={[{ required: true, message: 'Please input your contactInfo!' }]}
                ><Input />
                </Form.Item>
                <Form.Item
                    label="联系方式"
                    name="contact"
                    rules={[{ required: true, message: 'Please input your contact!' }]}
                ><Input />
                </Form.Item>
                <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                    <Button type="primary" htmlType="submit">提交</Button>
                </Form.Item>
            </Form>
            <Divider/>
            <Table
                rowKey="id"
                bordered
                columns={this.state.columns}
                dataSource={ann.recruits}
            />
        </Fragment>;
    }
}
export default connect(
    ann => ({...ann}),
)(AnnRecruit)
