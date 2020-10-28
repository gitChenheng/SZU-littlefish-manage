import React, {Fragment, Component} from "react";
import {Button, Divider, Input, message, Modal, Popconfirm, Table} from "antd";
import {connect} from "umi";
import UploadFile from "@/components/UploadFile";
import {post} from "@/utils/request";

interface IRecord {
    name: string,
    studyNum: string,
    grade: string,
    faculty: string,
    major: string,
    clbum: string,
    term: string,
    gpa: string,
    obtainCredit: string,
    electiveCredit: string,
    rank: string,
    relateRank: string,
    proRank: string,
    gradeRank: string,
    gradeStudent: string,
}

class ExportTranscripts extends Component<any, any>{
    state = {
        visible: false,
        currRecord: {
            id: undefined,
            name: "",
            studyNum: "",
            grade: "",
            faculty: "",
            major: "",
            clbum: "",
            term: "",
            gpa: "",
            obtainCredit: "",
            electiveCredit: "",
            rank: "",
            relateRank: "",
            proRank: "",
            gradeRank: "",
            gradeStudent: "",
        },
        columns: [
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
                width: 80,
                fixed: 'left',
            },
            {
                title: '学号',
                dataIndex: 'studyNum',
                key: 'studyNum',
                width: 130,
                fixed: 'left',
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
                title: '学期',
                dataIndex: 'term',
                key: 'term',
            },
            {
                title: 'gpa',
                dataIndex: 'gpa',
                key: 'gpa',
            },
            {
                title: '获得学分',
                dataIndex: 'obtainCredit',
                key: 'obtainCredit',
            },
            {
                title: '选课学分',
                dataIndex: 'electiveCredit',
                key: 'electiveCredit',
            },
            {
                title: '排名',
                dataIndex: 'rank',
                key: 'rank',
            },
            {
                title: '相对排名',
                dataIndex: 'relateRank',
                key: 'relateRank',
            },
            {
                title: '专业排名',
                dataIndex: 'proRank',
                key: 'proRank',
            },
            {
                title: '年级排名',
                dataIndex: 'gradeRank',
                key: 'gradeRank',
            },
            {
                title: '年级人数',
                dataIndex: 'gradeStudent',
                key: 'gradeStudent',
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
    render() {
        const {dispatch, baseData} = this.props;
        const {currRecord} = this.state;
        return <Fragment>
            <UploadFile
                local
                text={`学生成绩导入`}
                callback={(data: any) => {
                    console.log(data)
                    const params = data.map((item: any) => ({
                        name: item.姓名,
                        studyNum: item.学号,
                        term: item.成绩截止学年学期,
                        gpa: item.GPA,
                        obtainCredit: item.获得学分,
                        electiveCredit: item.选课学分,
                        rank: item.排名,
                        relateRank: item.相对排名,
                        // proRank: item.专业排名,
                        // gradeRank: item.年级排名,
                        // gradeStudent: item.参与排名人数,
                    }))
                    console.log(params)
                    dispatch({
                        type: "baseData/exportsTranscripts",
                        payload: params
                    })
                }}
            />
            <Divider/>
            <Table
                rowKey="id"
                bordered
                columns={this.state.columns as any}
                dataSource={baseData.transcripts}
                scroll={{ x: 2000 }}
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
                <p>学号：<Input className="w200" value={currRecord.studyNum} onChange={e => this.onchangeEvent(e, 'studyNum')}/></p>
                <p>年级：<Input className="w200" value={currRecord.grade} onChange={e => this.onchangeEvent(e, 'grade')}/></p>
                <p>院系：<Input className="w200" value={currRecord.faculty} onChange={e => this.onchangeEvent(e, 'faculty')}/></p>
                <p>专业：<Input className="w200" value={currRecord.major} onChange={e => this.onchangeEvent(e, 'major')}/></p>
                <p>班级：<Input className="w200" value={currRecord.clbum} onChange={e => this.onchangeEvent(e, 'clbum')}/></p>
                <p>学期：<Input className="w200" value={currRecord.term} onChange={e => this.onchangeEvent(e, 'term')}/></p>
                <p>gpa：<Input className="w200" value={currRecord.gpa} onChange={e => this.onchangeEvent(e, 'gpa')}/></p>
                <p>获得学分：<Input className="w200" value={currRecord.obtainCredit} onChange={e => this.onchangeEvent(e, 'obtainCredit')}/></p>
                <p>选课学分：<Input className="w200" value={currRecord.electiveCredit} onChange={e => this.onchangeEvent(e, 'electiveCredit')}/></p>
                <p>排名：<Input className="w200" value={currRecord.rank} onChange={e => this.onchangeEvent(e, 'rank')}/></p>
                <p>相对排名：<Input className="w200" value={currRecord.relateRank} onChange={e => this.onchangeEvent(e, 'relateRank')}/></p>
                <p>专业排名：<Input className="w200" value={currRecord.proRank} onChange={e => this.onchangeEvent(e, 'proRank')}/></p>
                <p>年级排名：<Input className="w200" value={currRecord.gradeRank} onChange={e => this.onchangeEvent(e, 'gradeRank')}/></p>
                <p>年级人数：<Input className="w200" value={currRecord.gradeStudent} onChange={e => this.onchangeEvent(e, 'gradeStudent')}/></p>
            </Modal>
        </Fragment>;
    }
    confirm = async (e: any, id: number) => {
        const r: any = await post("/api/baseData/removeTranscriptById", {id});
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
        const r: any = await post("/api/baseData/changeTranscriptById", currRecord);
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
)(ExportTranscripts)
