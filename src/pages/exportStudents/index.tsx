import React, {Fragment, Component} from "react";
import { Table, Tag, Space, Button, message, Upload } from 'antd';
import RightSpace from "@/components/hoc/RightSpace";
import {get, post} from "@/utils/request";
import XLSX from "xlsx";
import UploadFile from "@/components/UploadFile";

@RightSpace
export default class ExportStudents extends Component<any, any>{
    state = {
        data: [],
        columns: [
            {
                title: '学号',
                dataIndex: 'studyNum',
                key: 'studyNum',
                // render: (text: any) => <a>{text}</a>,
            },
            {
                title: '姓名',
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
            // {
            //     title: 'GPA',
            //     dataIndex: 'gpa',
            //     key: 'gpa',
            // },
            // {
            //     title: '获得学分',
            //     dataIndex: 'obtainCredit',
            //     key: 'obtainCredit',
            // },
            // {
            //     title: '选课学分',
            //     dataIndex: 'electiveCredit',
            //     key: 'electiveCredit',
            // },
            // {
            //     title: '排名',
            //     dataIndex: 'rank',
            //     key: 'rank',
            // },
            // {
            //     title: '相对排名',
            //     dataIndex: 'relateRank',
            //     key: 'relateRank',
            // },
            // {
            //     title: '专业排名',
            //     dataIndex: 'proRank',
            //     key: 'proRank',
            // },
            // {
            //     title: '年级排名',
            //     dataIndex: 'gradeRank',
            //     key: 'gradeRank',
            // },
            // {
            //     title: '年级人数',
            //     dataIndex: 'gradeStudent',
            //     key: 'gradeStudent',
            // },
        ],
    }
    componentDidMount() {
        this.init();
    }
    // importExcel(file: any){
    //     // 获取上传的文件对象
    //     const { files } = file.target;
    //     // 通过FileReader对象读取文件
    //     const fileReader = new FileReader();
    //     fileReader.onload = event => {
    //         try {
    //             const {result} = event.target;
    //             // 以二进制流方式读取得到整份excel表格对象
    //             const workbook = XLSX.read(result, { type: 'binary' });
    //             let data: any[] = []; // 存储获取到的数据
    //             // 遍历每张工作表进行读取（这里默认只读取第一张表）
    //             for (const sheet in workbook.Sheets) {
    //                 if (workbook.Sheets.hasOwnProperty(sheet)) {
    //                     // 利用 sheet_to_json 方法将 excel 转成 json 数据
    //                     data = data.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
    //                     // break; // 如果只取第一张表，就取消注释这行
    //                 }
    //             }
    //             console.log(data);
    //         } catch (e) {
    //             // 这里可以抛出文件类型错误不正确的相关提示
    //             console.log('文件类型不正确');
    //             return;
    //         }
    //     };
    //     // 以二进制方式打开文件
    //     fileReader.readAsBinaryString(files[0]);
    // }
    // exportExcel(headers, data, fileName = '请假记录表.xlsx') {
    //     const _headers = headers
    //         .map((item, i) => Object.assign({}, { key: item.key, title: item.title, position: String.fromCharCode(65 + i) + 1 }))
    //         .reduce((prev, next) => Object.assign({}, prev, { [next.position]: { key: next.key, v: next.title } }), {});
    //
    //     const _data = data
    //         .map((item, i) => headers.map((key, j) => Object.assign({}, { content: item[key.key], position: String.fromCharCode(65 + j) + (i + 2) })))
    //         // 对刚才的结果进行降维处理（二维数组变成一维数组）
    //         .reduce((prev, next) => prev.concat(next))
    //         // 转换成 worksheet 需要的结构
    //         .reduce((prev, next) => Object.assign({}, prev, { [next.position]: { v: next.content } }), {});
    //
    //     // 合并 headers 和 data
    //     const output = Object.assign({}, _headers, _data);
    //     // 获取所有单元格的位置
    //     const outputPos = Object.keys(output);
    //     // 计算出范围 ,["A1",..., "H2"]
    //     const ref = `${outputPos[0]}:${outputPos[outputPos.length - 1]}`;
    //
    //     // 构建 workbook 对象
    //     const wb = {
    //         SheetNames: ['mySheet'],
    //         Sheets: {
    //             mySheet: Object.assign(
    //                 {},
    //                 output,
    //                 {
    //                     '!ref': ref,
    //                     '!cols': [{ wpx: 45 }, { wpx: 100 }, { wpx: 200 }, { wpx: 80 }, { wpx: 150 }, { wpx: 100 }, { wpx: 300 }, { wpx: 300 }],
    //                 },
    //             ),
    //         },
    //     };
    //
    //     // 导出 Excel
    //     XLSX.writeFile(wb, fileName);
    // }
    render() {
        return <Fragment>
            <UploadFile
                local
                callBack={(data: any) => {
                    console.log(data)
                }}
            />
            <Table
                rowKey="id"
                bordered
                columns={this.state.columns}
                dataSource={this.state.data}
            />
        </Fragment>;
    }
    init(){
        get("/api/baseData/getBaseStudents?role=1").then((r: any) => {
            if (r.code === "1"){
                this.setState({data: r.data});
            }else{
                message.warn(r.msg);
            }
        })
    }
}
