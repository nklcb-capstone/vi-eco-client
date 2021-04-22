import React, { useState } from 'react';
import logo from './logo.png';
import './App.scss';
import Test from 'components/Test';
import Map from 'components/kakaoAPI/Map';
import Layout from 'components/viecoLayout/viecoLayout';

function App(): React.ReactElement {
  const [pageMode, setPageMode] = useState(true);
  const [pageName, setPageName] = useState('전기차 충전소 위치');
  const pageChange = () => {
    setPageMode(!pageMode);
    setPageName(pageMode ? '전기차 충전소 위치' : '수소차 충전소 위치');
    console.log(pageName);
  };
  return (
    <div className="App">
      {/* //레이아웃 적용 버전 */}
      <header></header>
      <body>
        <Map pageMode={pageMode}></Map>
      </body>
      <footer>
        <Layout pageName={pageName} pageChange={pageChange}></Layout>
      </footer>
    </div>
  );
}

export default App;
