import React, { useEffect, useState } from 'react';
import './viecoLayout.scss';

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
