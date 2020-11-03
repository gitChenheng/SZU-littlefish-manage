import React, {Fragment, Component} from "react";
import {connect} from "umi";
import {Button, Divider, Form, Input, message, Modal, Popconfirm, Table} from "antd";
import {post} from "@/utils/request";

interface IRecord {
    teamName: string,
    direction: string,
    requirements: string,
    needStudent: string,
    contactInfo: string,
    contact: string,
    // status: number,
}

class AnnRecruit extends Component<any, any>{
    private form: any;
    state = {
        visible: false,
        currRecord: {
            id: undefined,
            teamName: "",
            direction: "",
            requirements: "",
            needStudent: "",
            contactInfo: "",
            contact: "",
            status: null,
        },
        columns: [
            {
                title: '团队名称',
                dataIndex: 'teamName',
                key: 'teamName',
                width: 100
            },
            {
                title: '研究方向',
                dataIndex: 'direction',
                key: 'direction',
            },
            {
                title: '招募要求',
                dataIndex: 'requirements',
                key: 'requirements',
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
            {
                title: '状态',
                dataIndex: 'status',
                key: 'status',
                render: (text: any) => (
                    <div>{text === 1 ? "正在招募" : "停止招募"}</div>
                )
            },
            {
                title: '操作',
                dataIndex: 'actions',
                key: 'actions',
                render: (text: any, record: any, index: number) => (
                    <div>
                        {record.status === 1 ?
                            <Button danger onClick={() => this.changeStatus(record.id, 2)}>停止招募</Button> :
                            <Button type="primary" onClick={() => this.changeStatus(record.id, 1)}>开始招募</Button>
                        }
                        <Button onClick={() => this.showModal(record)}>编辑</Button>
                        <Popconfirm
                            title="确定删除？"
                            onConfirm={(e) => this.confirm(e, record.id)}
                            onCancel={this.cancel}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button
                                type='primary'
                                danger
                                style={{marginLeft: 10}}
                            >删除</Button>
                        </Popconfirm>
                    </div>
                ),
            },
        ],
    }
    confirm = async (e: any, id: number) => {
        const r: any = await post("/api/ann/removeRecruitById", {id});
        if (r.code === "1"){
            message.success("删除成功", 1 , () => {
                location.reload();
            });
        }else{
            message.warn(r.msg)
        }
    }
    cancel = (e: any) => {}
    onchangeEvent = (e: any, propertyName: keyof IRecord) => {
        const newObj = Object.assign({}, this.state.currRecord);
        newObj[propertyName] = e.target.value;
        this.setState({currRecord: newObj})
    }
    showModal = (currRecord: any) => {
        this.setState({
            visible: true,
            currRecord,
        });
    };
    render() {
        const {dispatch, ann} = this.props;
        const {currRecord} = this.state;
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
                        payload: {...values, status: 1}
                    });
                    setTimeout(() => {
                        this.form.setFieldsValue({
                            teamName: "", direction: "", requirements: "",
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
                    label="研究方向"
                    name="direction"
                    rules={[{ required: true, message: 'Please input your direction!' }]}
                ><Input.TextArea />
                </Form.Item>
                <Form.Item
                    label="招募要求"
                    name="requirements"
                    rules={[{ required: true, message: 'Please input your requirements!' }]}
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
            <Modal
                title="招募"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                okText={'保存'}
                cancelText={'取消'}
            >
                <p>团队名称：<Input className="w200" value={currRecord.teamName} onChange={e => this.onchangeEvent(e, 'teamName')}/></p>
                <p>研究方向：<Input className="w200" value={currRecord.direction} onChange={e => this.onchangeEvent(e, 'direction')}/></p>
                <p>招募要求：<Input className="w200" value={currRecord.requirements} onChange={e => this.onchangeEvent(e, 'requirements')}/></p>
                <p>需要学生数：<Input className="w200" value={currRecord.needStudent} onChange={e => this.onchangeEvent(e, 'needStudent')}/></p>
                <p>联系人：<Input className="w200" value={currRecord.contactInfo} onChange={e => this.onchangeEvent(e, 'contactInfo')}/></p>
                <p>联系方式：<Input className="w200" value={currRecord.contact} onChange={e => this.onchangeEvent(e, 'contact')}/></p>
            </Modal>
        </Fragment>;
    }
    changeStatus = async (id: any, e: any) => {
        const r: any = await post("/api/ann/changeRecruitById", {id, status: e});
        if (r.code === "1"){
            message.success("修改成功", 1 , () => {
                location.reload();
            });
        }else{
            message.warn(r.msg)
        }
    };
    handleOk = async (e: any) => {
        const {currRecord} = this.state;
        const r: any = await post("/api/ann/changeRecruitById", currRecord);
        if (r.code === "1"){
            message.success("修改成功", 1 , () => {
                location.reload();
            });
            this.setState({
                visible: false,
            });
        }else{
            message.warn(r.msg)
        }
    };
    handleCancel = (e: any) => {
        this.setState({
            visible: false,
        });
    };
}
export default connect(
    ann => ({...ann}),
)(AnnRecruit)
