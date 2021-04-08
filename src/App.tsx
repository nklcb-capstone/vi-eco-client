import React from 'react';
import logo from './logo.png';
import './App.scss';
import Test from 'components/Test';
import Map from 'components/kakaoAPI/Map';
import Layout from 'components/viecoLayout/viecoLayout';

function App() {
  return (
    <div className="App">
      {/* //레이아웃 적용 버전 */}
      <header></header>
      <body>
        <Map></Map>
      </body>
      <footer>
        <Layout></Layout>
      </footer>
    </div>
  );
}

export default App;
