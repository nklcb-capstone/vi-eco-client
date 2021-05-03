import React from 'react';
import './viecoLayout.scss';
import { Link } from 'react-router-dom';

interface Props {
  pageChange: () => void;
  pageName: string;
}
const ViecoLayout: React.FC<Props> = ({ pageChange, pageName }) => {
  return (
    <div className="viecoLayout">
      <div className="menubar">
        <span>
          <Link to="/">{pageName}</Link>
        </span>
        <span>
          <Link to="place">주변 정보</Link>
        </span>

        <span>
          <Link to="carinfo">관련 정보</Link>
        </span>
        {
          <span id="modchange" onClick={pageChange}>
            모드 전환
          </span>
        }
      </div>
    </div>
  );
};

export default ViecoLayout;
