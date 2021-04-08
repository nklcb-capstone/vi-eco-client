import React, { useEffect, useState } from 'react';
import { markerdata } from './markerDate';
import './Map.scss';
declare global {
  interface Window {
    kakao: any;
  }
}

const { kakao } = window;
const Map: React.FC = () => {
  const [infowindows, Setinfowindows]: any = useState([]);

  //let infowindowList: any = [];

  useEffect(() => {
    mapscript();
  }, []);

  const closeInfoWindow = () => {
    console.log(infowindows);
    infowindows.forEach((el: any) => {
      //마커 닫기
      el.close();
    });
  };

  const mapscript = () => {
    // kaka API 띄우기
    const container = document.getElementById('map');

    const options = {
      //지도 기본 위치값 서울역 좌표로 지정
      center: new window.kakao.maps.LatLng(37.555178, 126.970756),
      level: 5,
    };
    const map: any = new window.kakao.maps.Map(container, options);

    //markerDate에 있는 마커 여러개 생성 및 표시
    markerdata.forEach((el) => {
      const test = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(el.lat, el.lng),
        title: el.title,
        clickable: true,
      });

      const infowindow = new kakao.maps.InfoWindow({
        //이부분에 윈도우 정보 html로 작성
        content: `<div class="wrap">
        <div class="title">${el.title}</div>  
        <div class="title">주소 : ${el.address}</div>  
        <div class="title">전화 : ${el.tell}</div>  
    </div>`,
        //인포윈도우 클릭시 X창뜨게하기
        removable: true,
      });

      Setinfowindows([...infowindows, infowindow]);
      //infowindowList.push(infowindow);

      //클릭이벤트 등록
      kakao.maps.event.addListener(test, 'click', function () {
        //해당 마커외에 닫는 메소드
        closeInfoWindow();
        //마커 정보띄우기
        infowindow.open(map, test);
      });
      test.setMap(map);
    });
  };

  return (
    <div className="Map">
      <div id="map" style={{ width: '100vw', height: 'calc(100vh - 53px)' }} />
    </div>
  );
};

export default Map;
