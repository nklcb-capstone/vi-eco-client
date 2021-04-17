import React, { useState } from 'react';
import { Layout } from 'antd';
import { CarOutlined } from '@ant-design/icons';
import './viecoLayout.scss';

const { Header, Content, Footer } = Layout;

const ViecoLayout: React.FC = () => {
  const [pageMode, SetpageMode]: any = useState(true);
  const [pageName, SetpageName]: any = useState('전기차 충전소 위치');
  const changeMod = () => {
    SetpageMode(!pageMode);

    SetpageName(pageMode ? '전기차 충전소 위치' : '수소차 충전소 위치');
  };

  return (
    <div className="viecoLayout">
      <div className="menubar">
        <span> {pageName} </span>
        <span>주변 정보</span>
        <span>관련 정보</span>
        <span id="modchange" onClick={changeMod}>
          모드 전환
        </span>
      </div>
    </div>
  );
};

export default ViecoLayout;
