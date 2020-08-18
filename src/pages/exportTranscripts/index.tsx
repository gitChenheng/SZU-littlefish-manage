import React, {Fragment, Component} from "react";
import {Divider, Table} from "antd";
import {connect} from "umi";
import UploadFile from "@/components/UploadFile";

class ExportTranscripts extends Component<any, any>{
    state = {
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
        ],
    }
    render() {
        const {dispatch, baseData} = this.props;
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
        </Fragment>;
    }
}
export default connect(
    baseData => ({...baseData}),
)(ExportTranscripts)
