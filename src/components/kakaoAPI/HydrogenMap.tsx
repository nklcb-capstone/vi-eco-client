import React, { FC, useEffect } from 'react';
import { markerdata } from './markerDate';

// Declaration for Kakao
declare global {
  interface Window {
    kakao: any;
  }
}

const { kakao } = window;

const HydrogenMap: React.FC = () => {
  return <div></div>;
};

export default HydrogenMap;
