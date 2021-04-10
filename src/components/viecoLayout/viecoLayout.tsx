import React, { useState } from 'react';
import { Layout } from 'antd';
import { CarOutlined } from '@ant-design/icons';
import './viecoLayout.scss';

const { Header, Content, Footer } = Layout;

function Menubar() {
  const [pageMode, setPageMode] = useState('전기차 충전소 위치');

  //React Hook Tutorial
  function changeMod() {
    if (pageMode === '전기차 충전소 위치') {
      setPageMode('수소차 충전소 위치');
    } else {
      setPageMode('전기차 충전소 위치');
    }
  }

  return (
    <div className="menubar">
      <span> {pageMode} </span>
      <span>주변 정보</span>
      <span>관련 정보</span>
      <span id="modchange" onClick={changeMod}>
        모드 전환
      </span>
    </div>
  );
}

function viecoLayout() {
  return (
    <div className="viecoLayout">
      <Menubar></Menubar>
    </div>
  );
}

export default viecoLayout;
