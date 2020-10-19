import React, {Fragment, Component} from "react";
import {Table, Divider, DatePicker, Button, Modal, Input, Form, message, Popconfirm} from 'antd';
import UploadFile from "@/components/UploadFile";
import {connect} from "umi";
import moment from "moment";
import {get, post} from "@/utils/request";

interface IRecord {
    name: string,
    phone: string,
    grade: string,
    faculty: string,
    major: string,
    clbum: string,
}

class ExportStudents extends Component<any & IRecord, any>{
    state = {
        visible: false,
        currRecord: {
            id: undefined,
            name: "",
            phone: "",
            grade: "",
            faculty: "",
            major: "",
            clbum: "",
        },
        columns: [
            {
                title: '学号',
                dataIndex: 'studyNum',
                key: 'studyNum',
                // render: (text: any) => <a>{text}</a>,
            },
            {
                title: '学生姓名',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '手机号',
                dataIndex: 'phone',
                key: 'phone',
            },
            {
                title: '年级',
                dataIndex: 'grade',
                key: 'grade',
            },
            {
                title: '院系',
                dataIndex: 'faculty',
                key: 'faculty',
            },
            {
                title: '专业',
                dataIndex: 'major',
                key: 'major',
            },
            {
                title: '班级',
                dataIndex: 'clbum',
                key: 'clbum',
            },
            {
                title: '操作',
                dataIndex: 'actions',
                key: 'actions',
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
    render() {
        const {dispatch, baseData} = this.props;
        const {currRecord} = this.state;
        return <Fragment>
            <UploadFile
                local
                text={`学生数据导入`}
                callback={(data: any) => {
                    const params = data.map((item: any) => ({
                        role: 1,
                        name: item.学生姓名,
                        phone: item.手机号,
                        studyNum: item.学号,
                        grade: item.年级,
                        faculty: item.院系,
                        major: item.专业,
                        clbum: item.班级,
                    }))
                    dispatch({
                        type: "baseData/exportsBaseStudents",
                        payload: params
                    })
                }}
            />
            <Divider/>
            <Table
                rowKey="id"
                bordered
                columns={this.state.columns}
                dataSource={baseData.baseStudents}
            />
            <Modal
                title="学生信息"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                okText={'保存'}
                cancelText={'取消'}
            >
                <p>学生姓名：<Input className="w200" value={currRecord.name} onChange={e => this.onchangeEvent(e, 'name')}/></p>
                <p>手机号：{currRecord.phone}</p>
                <p>年级：<Input className="w200" value={currRecord.grade} onChange={e => this.onchangeEvent(e, 'grade')}/></p>
                <p>院系：<Input className="w200" value={currRecord.faculty} onChange={e => this.onchangeEvent(e, 'faculty')}/></p>
                <p>专业：<Input className="w200" value={currRecord.major} onChange={e => this.onchangeEvent(e, 'major')}/></p>
                <p>班级：<Input className="w200" value={currRecord.clbum} onChange={e => this.onchangeEvent(e, 'clbum')}/></p>
            </Modal>
        </Fragment>;
    }
    confirm = async (e: any, id: number) => {
        const r: any = await post("/api/baseData/removeBaseUserById", {id});
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
    handleOk = async (e: any) => {
        const {currRecord} = this.state;
        const r: any = await post("/api/baseData/changeBaseUserById", currRecord);
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
    baseData => ({...baseData}),
)(ExportStudents)
