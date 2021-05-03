import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
const { Header, Content, Footer } = Layout;

const NewInfo = () => {
  return (
    <>
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['3']}>
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
      <div>뉴스소개하시오</div>
    </>
  );
};

export default NewInfo;
