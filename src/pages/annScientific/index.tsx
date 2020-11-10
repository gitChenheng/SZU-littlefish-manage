import React, {Fragment, Component} from "react";
import {Divider, Table, Form, Input, Button, message, Popconfirm, Modal} from "antd";
import {connect} from "umi";
import UploadFile from "@/components/UploadFile";
import {post} from "@/utils/request";

interface IRecord {
    scientificName: string,
    intro: string,
    results: string,
    direction: string,
    nucleusStuff: string,
    pic: string,
    pdfUrl: string,
}

class AnnScientific extends Component<any, any>{
    private form: any;
    private el: any;
    private elPic: any;
    state = {
        visible: false,
        currRecord: {
            id: undefined,
            scientificName: "",
            intro: "",
            results: "",
            direction: "",
            nucleusStuff: "",
            pic: "",
            pdfUrl: "",
        },
        columns: [
            {
                title: '名称',
                dataIndex: 'scientificName',
                key: 'scientificName',
            },
            {
                title: '简介',
                dataIndex: 'intro',
                key: 'intro',
            },
            {
                title: '核心成果',
                dataIndex: 'results',
                key: 'results',
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
                title: 'pic地址',
                dataIndex: 'pic',
                key: 'pic',
                render: (text: any) => text ? <a
                    href={`${process.env.requestPrefix}${text}`}
                    target="_blank"
                >查看详情</a> : "",
            },
            {
                title: 'pdf文件地址',
                dataIndex: 'pdfUrl',
                key: 'pdfUrl',
                render: (text: any) => text ? <a
                    href={`${process.env.requestPrefix}${text}`}
                    target="_blank"
                >查看详情</a> : "",
            },
            {
                title: '操作',
                dataIndex: 'actions',
                key: 'actions',
                width: 180,
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
        pic: "",
        pdfUrl: "",
    }
    confirm = async (e: any, id: number) => {
        const r: any = await post("/api/ann/removeScientificDirectById", {id});
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
                name="AnnScientific"
                ref={el => this.form = el}
                labelCol={{span: 8}}
                wrapperCol={{span: 12}}
                onFinish={(values: any) => {
                    const {pdfUrl, pic} = this.state;
                    let params = {
                        ...values,
                    }
                    if (pic){
                        params = {...params, pic}
                    }
                    if (pdfUrl){
                        params = {...params, pdfUrl}
                    }
                    dispatch({
                        type: "ann/exportsScientific",
                        payload: params
                    })
                    setTimeout(() => {
                        this.form.setFieldsValue({
                            scientificName: "", intro: "",
                            direction: "", nucleusStuff: "",
                            results: "",
                        });
                        this.el.resetFileList();
                        this.elPic.resetFileList();
                        this.setState({pic: "", pdfUrl: ""})
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
                    label="简介"
                    name="intro"
                    rules={[{ required: true, message: 'Please input your intro!' }]}
                ><Input.TextArea />
                </Form.Item>
                <Form.Item
                    label="核心成果"
                    name="results"
                    rules={[{ required: true, message: 'Please input your results!' }]}
                ><Input.TextArea />
                </Form.Item>
                <Form.Item
                    label="核心成员"
                    name="nucleusStuff"
                    rules={[{ required: true, message: 'Please input your nucleusStuff!' }]}
                ><Input.TextArea />
                </Form.Item>
                <Form.Item
                    label="合照"
                >
                    <UploadFile
                        ref={el => this.elPic = el}
                        callback={(r: any, fileList: any) => {
                            if (r.code === "1"){
                                const arr: any[] = [];
                                fileList.forEach((item: any) => {
                                    arr.push(item.response.data)
                                })
                                this.setState({pic: arr.join(';')})
                            }
                        }}
                    />
                </Form.Item>
                <Form.Item
                    label="科研方向"
                    name="direction"
                    rules={[{ required: true, message: 'Please input your direction!' }]}
                ><Input.TextArea />
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
            <Modal
                title="学生信息"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                okText={'保存'}
                cancelText={'取消'}
            >
                <p>名称：<Input className="w200" value={currRecord.scientificName} onChange={e => this.onchangeEvent(e, 'scientificName')}/></p>
                <p>简介：<Input.TextArea className="w200" value={currRecord.intro} onChange={e => this.onchangeEvent(e, 'intro')}/></p>
                <p>核心成果：<Input.TextArea className="w200" value={currRecord.results} onChange={e => this.onchangeEvent(e, 'results')}/></p>
                <p>核心成员：<Input.TextArea className="w200" value={currRecord.nucleusStuff} onChange={e => this.onchangeEvent(e, 'nucleusStuff')}/></p>
                <p>科研方向：<Input.TextArea className="w200" value={currRecord.direction} onChange={e => this.onchangeEvent(e, 'direction')}/></p>
                <>合照地址：{currRecord.pic} <UploadFile
                    ref={el => this.el = el}
                    callback={(r: any) => {
                        if (r.code === "1"){
                            const newObj = Object.assign({}, this.state.currRecord);
                            newObj.pic = r.data;
                            this.setState({currRecord: newObj})
                        }
                    }}
                /></>
                <>PDF地址：{currRecord.pdfUrl} <UploadFile
                    ref={el => this.el = el}
                    callback={(r: any) => {
                        if (r.code === "1"){
                            const newObj = Object.assign({}, this.state.currRecord);
                            newObj.pdfUrl = r.data;
                            this.setState({currRecord: newObj})
                        }
                    }}
                /></>
            </Modal>
        </Fragment>;
    }
    handleOk = async (e: any) => {
        const {currRecord} = this.state;
        console.log(currRecord)
        const r: any = await post("/api/ann/changeScientificDirectById", currRecord);
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
)(AnnScientific)
