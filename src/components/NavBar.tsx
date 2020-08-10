import React, {Fragment} from "react";
import { Menu, Button } from 'antd';
import {
    DatabaseOutlined, MessageOutlined
} from '@ant-design/icons';
import {history} from "umi"

const { SubMenu } = Menu;

export default class NavBar extends React.Component<any, any>{
    handleClick (e: any){
        if (e.key === history.location.pathname){
            return;
        }
        history.push(e.key)
    };
    render() {
        return <Menu
            onClick={this.handleClick}
            style={{ width: this.props.navBarWidth }}
            defaultSelectedKeys={[history.location.pathname]}
            defaultOpenKeys={['sub2']}
            mode="inline"
        >
            <SubMenu key="sub1" icon={<MessageOutlined />} title="消息">
            </SubMenu>
            <SubMenu key="sub2" title={<span><DatabaseOutlined /><span>基础数据</span></span>}>
                <Menu.ItemGroup key="g1" title="家校互动">
                    <Menu.Item key="/exportStudents">学生信息导入</Menu.Item>
                    <Menu.Item key="/exportParents">家长信息导入</Menu.Item>
                    <Menu.Item key="/exportTeachers">教师信息导入</Menu.Item>
                    <Menu.Item key="/exportTranscripts">学生成绩导入</Menu.Item>
                </Menu.ItemGroup>
                <Menu.ItemGroup key="g2" title="科研方向">
                    <Menu.Item key="5">科研信息导入</Menu.Item>
                </Menu.ItemGroup>
                <Menu.ItemGroup key="g3" title="科研赛事、技能考试">
                    <Menu.Item key="6">科研赛事导入</Menu.Item>
                    <Menu.Item key="7">技能考试导入</Menu.Item>
                </Menu.ItemGroup>
                <Menu.ItemGroup key="g4" title="招募公告">
                    <Menu.Item key="8">招募信息发布</Menu.Item>
                </Menu.ItemGroup>
                <Menu.ItemGroup key="g5" title="学习小树洞">
                    <Menu.Item key="9">学生疑惑</Menu.Item>
                </Menu.ItemGroup>
                <Menu.ItemGroup key="g6" title='"益"起学'>
                    <Menu.Item key="10">发布科目需求</Menu.Item>
                </Menu.ItemGroup>
            </SubMenu>
        </Menu>;
    }
}
