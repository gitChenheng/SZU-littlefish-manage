import React, { Fragment, Component } from 'react';
import {Table, Divider, Button, Popconfirm, Input, Modal, message} from 'antd';
import UploadFile from '@/components/UploadFile';
import { connect } from 'umi';
import {unionBy, differenceBy} from "lodash";
import {post} from "@/utils/request";

interface IRecord {
    name: string,
    phone: string,
    studentName: string,
    studentPhone: string,
}

class ExportParents extends Component<any, any>{
    state = {
        visible: false,
        currRecord: {
            id: undefined,
            name: "",
            phone: "",
            studentName: "",
            studentPhone: "",
        },
        columns : [
            {
                title : '家长姓名',
                dataIndex : 'name',
                key : 'name',
            },
            {
                title : '家长手机号',
                dataIndex : 'phone',
                key  : 'phone',
            },
            {
                title : '学生姓名',
                dataIndex : 'studentName',
                key : 'studentName',
            },
            {
                title : '学生手机号',
                dataIndex : 'studentPhone',
                key : 'studentPhone',
            },
            {
                title: '操作',
                dataIndex: 'actions',
                key: 'actions',
                render: (text: any, record: any, index: number) => (
                    <div>
                        {/*<Button onClick={() => this.showModal(record)}>编辑</Button>*/}
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
    };
    render() {
        const {dispatch, baseData} = this.props;
        const {currRecord} = this.state;
        return(
            <Fragment>
                <UploadFile
                    local
                    text = {'家长数据导入'}
                    callback = {(data : any) => {
                        const params1 = data.map((item : any) => ({
                            role: 3,
                            name: item.家长姓名,
                            phone : item.家长手机号,
                        }));
                        const newParams1 = unionBy(params1, 'phone');
                        dispatch({
                            type: 'baseData/exportsBaseParents',
                            payload: newParams1,
                        });
                        const params2 = data.map((item : any) => ({
                            phone: item.家长手机号,
                            studentPhone: item.学生手机号,
                        }));
                        dispatch({
                            type: 'baseData/exportsBaseParentStudent',
                            payload: params2,
                        });
                    }}
                />
                <Divider />
                <Table
                    rowKey="id"
                    bordered
                    columns={this.state.columns}
                    dataSource={baseData.baseParents}
                />
                <Modal
                    title="学生信息"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText={'保存'}
                    cancelText={'取消'}
                >
                    <p>家长姓名：<Input className="w200" value={currRecord.name} onChange={e => this.onchangeEvent(e, 'name')}/></p>
                    <p>家长手机号：<Input className="w200" value={currRecord.phone} onChange={e => this.onchangeEvent(e, 'phone')}/></p>
                    <p>学生姓名：<Input className="w200" value={currRecord.studentName} onChange={e => this.onchangeEvent(e, 'studentName')}/></p>
                    <p>学生手机号：<Input className="w200" value={currRecord.studentPhone} onChange={e => this.onchangeEvent(e, 'studentPhone')}/></p>
                </Modal>
            </Fragment>
        );
    }
    confirm = async (e: any, id: number) => {
        const r: any = await post("/api/baseData/removeParentStudentById", {id});
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
                // location.reload();
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
)(ExportParents)
