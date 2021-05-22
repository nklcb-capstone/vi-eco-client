import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { Footer } from 'antd/lib/layout/layout';
const { Header } = Layout;

const Nav = () => {
  return (
    <>
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" /*defaultSelectedKeys={['1']}*/>
          <Menu.Item key="1">
            차량 모델
            <Link to="carinfo"></Link>
          </Menu.Item>
          <Menu.Item key="2">
            차량 정보
            <Link to="info"></Link>
          </Menu.Item>
          <Menu.Item key="3">
            뉴스
            <Link to="newinfo"></Link>
          </Menu.Item>
        </Menu>
      </Header>
    </>
  );
};

export default Nav;
