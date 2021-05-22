import React from 'react';
import { Layout, Menu } from 'antd';
import { Footer } from 'antd/lib/layout/layout';

const FooterLayout = () => {
  return (
    <>
      <Footer style={{ textAlign: 'center', paddingBottom: '90px', fontSize: '1.1em' }}>
        <p>Vi-eco ©2020 Created by 6조 네카라쿠배 팀 </p>
        <p>충전소 위치, 정보 추가 및 각종 문의 : didmsrlfwo@kyonggi.ac.kr</p>
      </Footer>
    </>
  );
};

export default FooterLayout;
