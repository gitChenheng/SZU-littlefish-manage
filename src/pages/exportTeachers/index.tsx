import React, { Fragment, Component } from 'react';
import { Table, Divider } from 'antd';
import UploadFile from '@/components/UploadFile';
import { connect } from 'umi';

class ExportTeachers extends Component<any, any> {
    state = {
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
        ],
    };
    render() {
        const { dispatch, baseData } = this.props;
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
            </Fragment>
        );
    }
}

export default connect(
    baseData => ({ ...baseData }))
(ExportTeachers);
