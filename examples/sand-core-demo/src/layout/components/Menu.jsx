/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from '@jianghe/sand-core/react';
import { Menu } from 'antd';
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from '@ant-design/icons';
import styles from './layout.module.less';

const { SubMenu } = Menu;

/**
 * 菜单组件
 */
function MenuBox() {
  return (
    <div className={styles.menuBox}>
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1', 'sub2', 'sub3']}
        className={styles.menu}
      >
        <SubMenu
          key="sub1"
          title={
            <span>
              <UserOutlined />
              subnav 1
            </span>
          }
        >
          <Menu.Item key="1">option1</Menu.Item>
          <Menu.Item key="2">option2</Menu.Item>
          <Menu.Item key="3">option3</Menu.Item>
          <Menu.Item key="4">option4</Menu.Item>
          <Menu.Item key="5">option1</Menu.Item>
          <Menu.Item key="6">option2</Menu.Item>
          <Menu.Item key="7">option3</Menu.Item>
          <Menu.Item key="8">option4</Menu.Item>
          <Menu.Item key="9">option1</Menu.Item>
          <Menu.Item key="10">option2</Menu.Item>
          <Menu.Item key="11">option3</Menu.Item>
          <Menu.Item key="12">option4</Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub2"
          title={
            <span>
              <LaptopOutlined />
              subnav 2
            </span>
          }
        >
          <Menu.Item key="5">option5</Menu.Item>
          <Menu.Item key="6">option6</Menu.Item>
          <Menu.Item key="7">option7</Menu.Item>
          <Menu.Item key="8">option8</Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub3"
          title={
            <span>
              <NotificationOutlined />
              subnav 3
            </span>
          }
        >
          <Menu.Item key="9">option9</Menu.Item>
          <Menu.Item key="10">option10</Menu.Item>
          <Menu.Item key="11">option11</Menu.Item>
          <Menu.Item key="12">option12</Menu.Item>
        </SubMenu>
      </Menu>
    </div>
  );
}

export default MenuBox;
