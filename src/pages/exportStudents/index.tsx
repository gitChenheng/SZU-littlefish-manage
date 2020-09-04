import React, {Fragment, Component} from "react";
import { Table, Divider } from 'antd';
import UploadFile from "@/components/UploadFile";
import {connect} from "umi";

class ExportStudents extends Component<any, any>{
    state = {
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
        ],
    }
    render() {
        const {dispatch, baseData} = this.props;
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
        </Fragment>;
    }
}

export default connect(
    baseData => ({...baseData}),
)(ExportStudents)
