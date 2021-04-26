import React, { useState } from 'react';
import logo from './logo.png';
import './App.scss';
import Test from 'components/Test';
import Map from 'components/kakaoAPI/Map';
import Info from 'components/viecoLayout/viecoInfo';

function App() {
  return (
    <div className="App">
      <Info></Info>
    </div>
  );
}

export default App;
