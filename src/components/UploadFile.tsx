import React from "react";
import {getSessionStore} from "@/utils/storage";
import {Button, Upload, message} from "antd";
import { UploadOutlined } from '@ant-design/icons';

export default class UploadFile extends React.Component<any, any>{
    comm = {
        name: 'file',
        onChange: (info: any) => {
            if (this.props.callBack){
                this.props.callBack(info)
                return;
            }
            const r = info.file.response;
            if (r && r.code === "4"){
                message.warn(r.msg);
                return;
            }
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    }
    properties = this.props.local ? this.comm : {
        ...this.comm,
        action: `${process.env.requestPrefix}api/baseData/uploadFile`,
        headers: {
            token: getSessionStore("token")
        },
    }
    render() {
        return <Upload
            {...this.properties as any}
        ><Button><UploadOutlined/> 上传</Button>
        </Upload>;
    }
}
