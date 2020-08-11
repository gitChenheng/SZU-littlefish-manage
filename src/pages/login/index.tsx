import React, {Fragment} from "react";
import {post} from "@/utils/request";
import {setSessionStore} from "@/utils/storage";
import {history} from "@@/core/history";
import { Form, Input, Button, message } from 'antd';
import style from "./index.scss";

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

export default class Login extends React.Component<any, any>{
    render() {
        return <Fragment>
            <div className={style.center}>
                <h3>登录</h3>
                <Form
                    {...layout}
                    name="basic"
                    onFinish={(v) => {
                        post("/api/admin/login", v).then((r: any) => {
                            if (r.code === "0"){
                                return r
                            }else{
                                setSessionStore("token", r.data.token);
                                return null;
                            }
                        }).then(res => {
                            if (!res){
                                history.push("/");
                            }else{
                                message.warn(res.msg)
                            }
                        })
                    }}
                    onFinishFailed={(e) => {
                        console.log(e)
                    }}
                >
                    {/*<h1>登录</h1>*/}
                    <Form.Item
                        label="用户名"
                        name="name"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    ><Input style={{width: 200}} type="primary" placeholder="用户名"/>
                    </Form.Item>
                    <Form.Item
                        label="密码"
                        name="pwd"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    ><Input.Password style={{width: 200}} type="primary" placeholder="密码"/>
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            提交
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </Fragment>
    }
}
