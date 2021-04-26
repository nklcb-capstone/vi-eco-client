import React, { useState } from 'react';
import './App.scss';
import Map from 'components/kakaoAPI/Map';
import Layout from 'components/viecoLayout/viecoLayout';
import { HashRouter, Route } from 'react-router-dom';
import CarInfor from 'components/Infor/CarInfor';
import { homedir } from 'node:os';

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
      {/* <body>
        <Map pageMode={pageMode}></Map>
      </body> */}
      {/* <footer>
        <Layout pageName={pageName} pageChange={pageChange}></Layout>
      </footer> */}
      {/* <Route path="/" exact={true} component={Map}></Route> */}

      <HashRouter>
        <footer>
          <Layout pageName={pageName} pageChange={pageChange}></Layout>
        </footer>
        <Route path="/" exact={true} render={() => <Map pageMode={pageMode}></Map>}></Route>
        <Route path="/info" exact={true} component={CarInfor}></Route>
      </HashRouter>
    </div>
  );
}

export default App;
