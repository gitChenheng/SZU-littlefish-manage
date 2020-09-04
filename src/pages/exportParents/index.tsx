import React, { Fragment, Component } from 'react';
import { Table, Divider } from 'antd';
import UploadFile from '@/components/UploadFile';
import { connect } from 'umi';
import {unionBy, differenceBy} from "lodash";

class ExportParents extends Component<any,any>{
    state = {
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
        ],
    };
    render() {
        const {dispatch, baseData} = this.props;
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
            </Fragment>
        );
    }
}

export default connect(
    baseData => ({...baseData}),
)(ExportParents)
