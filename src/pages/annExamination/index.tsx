import React, {Fragment, Component} from "react";
import {Button, Divider, Form, Input, message, Modal, Popconfirm, Table} from "antd";
import {connect} from "umi";
import {post} from "@/utils/request";

interface IRecord {
    title: string,
    introduce: string,
    condition: string,
    schedule: string,
    way: string,
}

class AnnExamination extends Component<any, any>{
    private form: any;
    state = {
        visible: false,
        currRecord: {
            id: undefined,
            title: "",
            introduce: "",
            condition: "",
            schedule: "",
            way: "",
        },
        columns: [
            {
                title: '标题',
                dataIndex: 'title',
                key: 'title',
                width: 100
            },
            {
                title: '考试介绍',
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
            {
                title: '操作',
                dataIndex: 'actions',
                key: 'actions',
                width: 180,
                fixed: 'right',
                render: (text: any, record: any, index: number) => (
                    <div>
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
        const r: any = await post("/api/ann/removeCompetitionById", {id});
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
                name="AnnExamination"
                ref={el => this.form = el}
                labelCol={{span: 6}}
                wrapperCol={{span: 14}}
                onFinish={(values: any) => {
                    dispatch({
                        type: "ann/exportsCompetition",
                        payload: {...values, type: 2}
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
                    label="考试介绍"
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
                columns={this.state.columns as any}
                dataSource={ann.competitions.type2}
                scroll={{x: 3000}}
            />
            <Modal
                title="学生信息"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                okText={'保存'}
                cancelText={'取消'}
            >
                <p>标题：<Input className="w200" value={currRecord.title} onChange={e => this.onchangeEvent(e, 'title')}/></p>
                <p>考试介绍：<Input className="w200" value={currRecord.introduce} onChange={e => this.onchangeEvent(e, 'introduce')}/></p>
                <p>报名条件：<Input className="w200" value={currRecord.condition} onChange={e => this.onchangeEvent(e, 'condition')}/></p>
                <p>时间安排：<Input className="w200" value={currRecord.schedule} onChange={e => this.onchangeEvent(e, 'schedule')}/></p>
                <p>报名途径：<Input className="w200" value={currRecord.way} onChange={e => this.onchangeEvent(e, 'way')}/></p>
            </Modal>
        </Fragment>;
    }
    handleOk = async (e: any) => {
        const {currRecord} = this.state;
        const r: any = await post("/api/ann/changeCompetitionById", currRecord);
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
)(AnnExamination)
