import React from 'react';
import { NavLink } from 'react-router-dom';
import { Icon, Menu } from 'antd';

const { SubMenu } = Menu;

const menuConfig = [
  {
    id: 'main1',
    name: '首页',
    icon: 'user',
    sub: [{
      id: 'sub4',
      name: '首页',
      to: '/',
    }],
  },
  {
    id: 'main2',
    name: '功能',
    icon: 'laptop',
    sub: [{
      id: 'sub1',
      name: '书',
      to: '/book',
    }, {
      id: 'sub2',
      name: '苹果',
      to: '/book/apple',
    }, {
      id: 'sub3',
      name: '商店',
      to: '/book/store',
    }],
  },
];

class LifeSubMenu extends React.Component {
  componentDidMount() {}

  onClickMenu({ key }) {
    console.log(key);
    if (key === '4') {
      window.location.replace('#/book');
    } else if (key === '6') {
      window.location.replace('#/apple');
    } else if (key === '5') {
      window.location.replace('#/store');
    } else if (key === '9') {
      window.location.replace('#/Attention');
    } else {
      window.location.replace('#/book');
    }
  }

  // 渲染菜单的方法
  renderMenu() {
    const menu = [];
    menuConfig.forEach((item) => {
      menu.push(
        <SubMenu
          key={item.id}
          title={(
            <span>
              <Icon type={item.icon} />
              {
                item.to ?
                  (<NavLink to={item.to}>{item.name}</NavLink>) :
                  item.name
              }
            </span>
          )}
        >
          {this.renderSub(item.sub)}
        </SubMenu>,
      );
    });
    return menu;
  }

  // 渲染子菜单的方法
  renderSub(submenu) {
    const subMenu = [];
    if (submenu) {
      submenu.forEach((item) => {
        subMenu.push(
          <Menu.Item key={item.id}>
            {
              item.to ?
                (<NavLink to={item.to}>{item.name}</NavLink>) :
                item.name
            }
          </Menu.Item>,
        );
      });
      return subMenu;
    }
    return null;
  }

  render() {
    return (
      <div>
        <Menu
          mode="inline"
          defaultSelectedKeys={['main1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}
        >
          {this.renderMenu()}
        </Menu>
      </div>
    );
  }
}

export default LifeSubMenu;
