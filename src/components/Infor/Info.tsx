import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
const { Header, Content, Footer } = Layout;

const Info = () => {
  return (
    <>
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
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
      <div>차량소개하시요</div>
    </>
  );
};

export default Info;
