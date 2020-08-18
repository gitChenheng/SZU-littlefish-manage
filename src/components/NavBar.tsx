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
            defaultOpenKeys={['sub1', 'sub2', 'sub3']}
            mode="inline"
        >
            <SubMenu key="sub1" title={<span><DatabaseOutlined /><span>基础数据</span></span>}>
                <Menu.ItemGroup key="g1" title="家校互动">
                    <Menu.Item key="/main/exportStudents">学生信息导入</Menu.Item>
                    <Menu.Item key="/main/exportParents">家长信息导入</Menu.Item>
                    <Menu.Item key="/main/exportTeachers">教师信息导入</Menu.Item>
                    <Menu.Item key="/main/exportParentStudent">家长-学生关系导入</Menu.Item>
                    <Menu.Item key="/main/exportTranscripts">学生成绩导入</Menu.Item>
                </Menu.ItemGroup>
            </SubMenu>
            <SubMenu key="sub2" title={<span><DatabaseOutlined /><span>公告</span></span>}>
                <Menu.ItemGroup key="g2" title="科研方向">
                    <Menu.Item key="/main/annScientific">发布科研信息</Menu.Item>
                </Menu.ItemGroup>
                <Menu.ItemGroup key="g3" title="科研赛事、技能考试">
                    <Menu.Item key="/main/annCompetition">发布科研赛事</Menu.Item>
                    <Menu.Item key="/main/annExamination">发布技能考试</Menu.Item>
                </Menu.ItemGroup>
                <Menu.ItemGroup key="g4" title="招募公告">
                    <Menu.Item key="/main/annRecruit">招募信息发布</Menu.Item>
                </Menu.ItemGroup>
            </SubMenu>
            <SubMenu key="sub3" title={<span><DatabaseOutlined /><span>互动</span></span>}>
                <Menu.ItemGroup key="g5" title="学习小树洞">
                    <Menu.Item key="/main/treeHole">学生疑惑</Menu.Item>
                </Menu.ItemGroup>
                <Menu.ItemGroup key="g6" title='"益"起学'>
                    <Menu.Item key="/main/together">发布科目需求</Menu.Item>
                </Menu.ItemGroup>
            </SubMenu>
        </Menu>;
    }
}
