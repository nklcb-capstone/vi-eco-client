import React, { useEffect } from 'react';
import { markerdata } from './markerDate';
declare global {
  interface Window {
    kakao: any;
  }
}

const { kakao } = window;
const Map: React.FC = () => {
  useEffect(() => {
    mapscript();
  }, []);

  const mapscript = () => {
    // kaka API 띄우기
    let container = document.getElementById('map');
    let options = {
      //위도 경도 서울역 위치
      center: new window.kakao.maps.LatLng(37.555178, 126.970756),
      level: 5,
    };
    let map: any = new window.kakao.maps.Map(container, options);

    // 마커 한개 생성 및 띄우기
    let markerPosition = new kakao.maps.LatLng(37.555163, 126.970768);

    let marker = new kakao.maps.Marker({
      position: markerPosition,
    });

    //markerDate에 있는 마커 여러개 생성 및 표시
    markerdata.map((el) => {
      new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(el.lat, el.lng),
        title: el.title,
      });
    });

    //마커를 지도 위에 표시
    marker.setMap(map);
  };

  return (
    <div className="Map">
      <div id="map" style={{ width: '100vw', height: '100vh', zIndex: 0 }} />
    </div>
  );
};

export default Map;
