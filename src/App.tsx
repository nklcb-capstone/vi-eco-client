import React, { useState } from 'react';
import './App.scss';
import Map from 'components/kakaoAPI/Map';
import Layout from 'components/viecoLayout/viecoLayout';
import { HashRouter, Route } from 'react-router-dom';
import Info from 'components/Infor/Info';
import CarInfo from 'components/Infor/CarInfo';
import NewInfo from 'components/Infor/NewInfo';

function App(): React.ReactElement {
  const [pageMode, setPageMode] = useState(true);
  const [pageName, setPageName] = useState('전기차 충전소 위치');
  const pageChange = () => {
    setPageMode(!pageMode);
    setPageName(pageMode ? '수소차 충전소 위치' : '전기차 충전소 위치');
    console.log(pageName);
  };
  return (
    <div className="App">
      <HashRouter>
        <body>
          <Route path="/" exact={true} render={() => <Map pageMode={pageMode}></Map>}></Route>
          <Route path="/carinfo" exact={true} component={CarInfo}></Route>
          <Route path="/info" exact={true} component={Info}></Route>
          <Route path="/newinfo" exact={true} component={NewInfo}></Route>
        </body>
        <footer>
          <Layout pageName={pageName} pageChange={pageChange}></Layout>
        </footer>
      </HashRouter>
    </div>
  );
}

export default App;
