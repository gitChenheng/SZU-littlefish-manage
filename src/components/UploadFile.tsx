import React from "react";
import {getSessionStore} from "@/utils/storage";
import {Button, Upload, message} from "antd";
import { DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import XLSX from "xlsx";
import {history} from "@@/core/history";

export default class UploadFile extends React.Component<any, any>{
    state = {
        fileList: [],
    }
    comm = {
        onChange: (info: any) => {
            let fileList = [...info.fileList];
            // 1. Limit the number of uploaded files
            // Only to show two recent uploaded files, and old ones will be replaced by the new
            fileList = fileList.slice(-5);
            // 2. Read from response and show file link
            fileList = fileList.map(file => {
                if (file.response) {
                    // Component will show file.url as link
                    file.url = file.response.url;
                }
                return file;
            });
            this.setState({ fileList });
            if (this.props.local){
                if (info.file && info.file.status === "done"){
                    this.importExcel(info.file);
                }
                if (info.file.status === 'error') {
                    message.error(`${info.file.name} 文件解析出错`);
                }
                return;
            }else{
                const r = info.file.response;
                if (r && r.code === "4"){
                    message.warn(r.msg, 2000, () => {
                        history.push("/login");
                    });
                    return;
                }
                if (r && r.code === "0"){
                    message.warn(r.msg);
                    this.setState({ fileList: [] });
                    return;
                }
                if (info.file.status !== 'uploading') {
                    // console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    message.success(`${info.file.name} 文件上传成功`);
                    if (this.props.callback){
                        this.props.callback(r, fileList);
                    }
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} 文件上传失败`);
                }
            }
        },
    }
    properties = this.props.local ? this.comm : {
        ...this.comm,
        name: this.props.name || `filename`,
        action: `${process.env.requestPrefix}/api/baseData/uploadFile`,
        headers: {
            token: getSessionStore("token")
        },
    }
    importExcel(file: any){
        const fileReader = new FileReader();
        fileReader.onload = event => {
            try {
                const result = event.target && event.target.result;
                // 以二进制流方式读取得到整份excel表格对象
                const workbook = XLSX.read(result, { type: 'binary' });
                let data: any[] = []; // 存储获取到的数据
                // 遍历每张工作表进行读取（这里默认只读取第一张表）
                for (const sheet in workbook.Sheets) {
                    if (workbook.Sheets.hasOwnProperty(sheet)) {
                        // 利用 sheet_to_json 方法将 excel 转成 json 数据
                        data = data.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
                        // break; // 如果只取第一张表，就取消注释这行
                    }
                }
                if (this.props.callback){
                    this.props.callback(data);
                }
            } catch (e) {
                // 这里可以抛出文件类型错误不正确的相关提示
                console.log(`文件类型不正确 or ${e}`);
                return;
            }
        };
        // 以二进制方式打开文件
        fileReader.readAsBinaryString(file.originFileObj);
    }
    resetFileList(){
        this.setState({fileList: []})
    }
    render() {
        return (
            <Upload
                {...this.properties as any}
                fileList={this.state.fileList}
            >
                <Button>
                    {this.props.icon || (this.props.local && <DownloadOutlined/>) || <UploadOutlined/>}
                    {this.props.text || (this.props.local && `导入`) || `上传`}
                </Button>
            </Upload>
        );
    }
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
}
