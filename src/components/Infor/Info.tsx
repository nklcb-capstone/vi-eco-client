import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import Nav from './Nav';
const { Header, Content, Footer } = Layout;

const Info = () => {
  return (
    <>
      <Nav></Nav>
      <div>차량소개하시요</div>
    </>
  );
};

export default Info;
