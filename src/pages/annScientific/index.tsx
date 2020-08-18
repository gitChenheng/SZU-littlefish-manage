import React, {Fragment, Component} from "react";
import {Divider, Table, Form, Input, Button, message} from "antd";
import {connect} from "umi";
import UploadFile from "@/components/UploadFile";

class AnnScientific extends Component<any, any>{
    private form: any;
    private el: any;
    state = {
        columns: [
            {
                title: '名称',
                dataIndex: 'scientificName',
                key: 'scientificName',
            },
            {
                title: '科研方向',
                dataIndex: 'direction',
                key: 'direction',
            },
            {
                title: '核心成员',
                dataIndex: 'nucleusStuff',
                key: 'nucleusStuff',
            },
            {
                title: 'pdf文件地址',
                dataIndex: 'pdfUrl',
                key: 'pdfUrl',
                render: (text: any) => <a
                    href={`${process.env.requestPrefix}${text}`}
                    target="_blank"
                >查看详情</a>,
            },
        ],
        pdfUrl: "",
    }
    render() {
        const {dispatch, ann} = this.props;
        return <Fragment>
            <Form
                style={{marginTop: 20}}
                name="AnnScientific"
                ref={el => this.form = el}
                labelCol={{span: 6}}
                wrapperCol={{span: 14}}
                onFinish={(values: any) => {
                    const {pdfUrl} = this.state;
                    if (!pdfUrl){
                        message.warn('文件地址不能为空');
                        return;
                    }
                    const params = {
                        ...values,
                        pdfUrl
                    }
                    dispatch({
                        type: "ann/exportsScientific",
                        payload: params
                    })
                    setTimeout(() => {
                        this.form.setFieldsValue({ scientificName: "", direction: "", nucleusStuff: ""});
                        this.el.resetFileList();
                        this.setState({pdfUrl: ""})
                    }, 0)
                }}
                onFinishFailed={(e) => {
                    console.log(e);
                }}
            >
                <Form.Item
                    label="名称"
                    name="scientificName"
                    rules={[{ required: true, message: 'Please input your scientificName!' }]}
                ><Input />
                </Form.Item>
                <Form.Item
                    label="科研方向"
                    name="direction"
                    rules={[{ required: true, message: 'Please input your direction!' }]}
                ><Input />
                </Form.Item>
                <Form.Item
                    label="核心成员"
                    name="nucleusStuff"
                    rules={[{ required: true, message: 'Please input your nucleusStuff!' }]}
                ><Input />
                </Form.Item>
                <Form.Item
                    label="PDF"
                >
                    <UploadFile
                        ref={el => this.el = el}
                        callback={(r: any) => {
                            if (r.code === "1"){
                                const pdfUrl = r.data;
                                this.setState({pdfUrl})
                            }
                        }}
                    />
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
                dataSource={ann.scientific}
            />
        </Fragment>;
    }
}

export default connect(
    ann => ({...ann}),
)(AnnScientific)
