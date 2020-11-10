import React, { Fragment, Component } from 'react';
import {Table, Divider, Button, Popconfirm, Input, Modal, message} from 'antd';
import UploadFile from '@/components/UploadFile';
import { connect } from 'umi';
import {post} from "@/utils/request";
import _ from "lodash";
import util from "@/utils/util";

interface IRecord {
    name: string,
    phone: string,
    teachCardNum: string,
}

class ExportTeachers extends Component<any, any> {
    state = {
        visible: false,
        currRecord: {
            id: undefined,
            name: "",
            phone: "",
            teachCardNum: "",
        },
        data: [],
        columns: [
            {
                title: '教师姓名',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '手机号',
                dataIndex: 'phone',
                key: 'phone',
            },
            {
                title: '校园卡号',
                dataIndex: 'teachCardNum',
                key: 'teachCardNum',
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
    };
    render() {
        const { dispatch, baseData } = this.props;
        const {currRecord} = this.state;
        return (
            <Fragment>
                <UploadFile
                    local
                    text={`教师数据导入`}
                    callback={(data: any) => {
                        const params = data.map((item: any) => ({
                            role: 2,
                            name: item.教师姓名,
                            phone: item.手机号,
                            teachCardNum: item.校园卡号,
                        }));
                        const _params = _.map(params, "phone")
                        const duplicateArray = util.duplicate(_params);
                        if (duplicateArray.length){
                            message.warn(`手机号${JSON.stringify(duplicateArray)}重复`, 8);
                            return;
                        }
                        dispatch({
                            type: 'baseData/exportsBaseTeachers',
                            payload: params,
                        });
                    }}
                />
                <Divider />
                <Table
                    rowKey="id"
                    bordered
                    columns={this.state.columns}
                    dataSource={baseData.baseTeachers}
                />
                <Modal
                    title="学生信息"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText={'保存'}
                    cancelText={'取消'}
                >
                    <p>教师姓名：<Input className="w200" value={currRecord.name} onChange={e => this.onchangeEvent(e, 'name')}/></p>
                    <p>手机号：{currRecord.phone}</p>
                    <p>校园卡号：<Input className="w200" value={currRecord.teachCardNum} onChange={e => this.onchangeEvent(e, 'teachCardNum')}/></p>
                </Modal>
            </Fragment>
        );
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
    baseData => ({ ...baseData }))
(ExportTeachers);
