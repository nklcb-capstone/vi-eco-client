
import React, { useState } from 'react';
import { Layout } from 'antd';
import { CarOutlined } from '@ant-design/icons';
import './viecoLayout.scss';

const { Header, Content, Footer } = Layout;

function Menubar() {
  const [pageMode, switchMode] = useState(['전기차 충전소 위치', '수소차 충전소 위치']);

  function changeMod(){
    const newArray = [...pageMode];
    if (newArray[0]=='전기차 충전소 위치'){
      newArray[0] = '수소차 충전소 위치';
    } else {
      newArray[0] = '전기차 충전소 위치';
    }
    switchMode( newArray );
  }
  return (
      <div className = "menubar">
       <span> { pageMode[0] } </span>
       <span>주변 정보</span>
       <span>관련 정보</span>
       <span id="modchange" onClick={ changeMod }>모드 전환</span>
      </div>
  );
}

function viecoLayout() {
  return(
  <div className="viecoLayout"> 
    <Menubar></Menubar>
  </div>
  );
}


export default viecoLayout;