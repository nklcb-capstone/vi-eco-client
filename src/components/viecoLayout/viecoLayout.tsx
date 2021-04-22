<<<<<<< HEAD
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import React, { useState } from 'react';
import './viecoLayout.scss';

function Menubar() {
  const [pageMode, setPageMode] = useState('전기차 충전소 위치');

  //현재 자신이 어떤 모드에 있는지 알려줍니다
  function chargingStation() {
    if (pageMode === '전기차 충전소 위치') {
      alert('현재 전기차 충전소 위치를 표시 중입니다.')
    } else {
      alert('현재 수소차 충전소 위치를 표시 중입니다.')
    }
  }

  //수소차 전기차 모드 전환 버튼 클릭 시 호출
  function changeMod() {
    if (pageMode === '전기차 충전소 위치') {
      setPageMode('수소차 충전소 위치');
      //전기차 충전소 마커 제거
      //수소차 충전소 마커 표시
    } else {
      setPageMode('전기차 충전소 위치');
      //수소차 충전소 마커 제거
      //전기차 충전소 마커 표시
    }
  }

  //주변 정보
  function nearbyPlaces() {
    alert('주변 정보 기능 구현 중 !');
  }

  //관련 정보
  function infoTap() {
    alert('관련 정보 기능 구현 중 !');
  }

  return (
    <div className="menubar">
      <span onClick={chargingStation}> {pageMode} </span>
      <span onClick={nearbyPlaces}>주변 정보</span>
      <span onClick={infoTap}>관련 정보</span>
      <span id="modchange" onClick={changeMod}>모드 전환</span>
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
=======
import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import { CarOutlined } from '@ant-design/icons';
import './viecoLayout.scss';

const { Header, Content, Footer } = Layout;
interface Props {
  pageChange: () => void;
  pageName: string;
}
const ViecoLayout: React.FC<Props> = ({ pageChange, pageName }) => {
  return (
    <div className="viecoLayout">
      <div className="menubar">
        <span>{pageName}</span>
        <span>주변 정보</span>
        <span>관련 정보</span>
        <span id="modchange" onClick={pageChange}>
          모드 전환
        </span>
      </div>
    </div>
  );
};

export default ViecoLayout;
>>>>>>> origin/main
