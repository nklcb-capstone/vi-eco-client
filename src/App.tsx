import React from 'react';
import logo from './logo.png';
import './App.scss';
import Test from 'components/Test';
import Map from 'components/kakaoAPI/Map';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a className="App-link" href="https://github.com/nklcb-capstone" target="_blank" rel="noopener noreferrer">
          Github Repository
        </a>
        <a
          className="App-link"
          href="https://www.notion.so/e4b2f84dd0124772af02a8716350b218"
          target="_blank"
          rel="noopener noreferrer"
        >
          Notion
        </a>
      </header>
      <Test /> */}

      {/* 지도 API 컴포넌트 */}
      <Map></Map>
    </div>
  );
}

export default App;
