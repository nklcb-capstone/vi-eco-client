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

  // 인포윈도우를 표시하는 클로저를 만드는 함수입니다
  const makeOverListener: any = (map: any, marker: any, infowindow: any) => {
    return function () {
      infowindow.open(map, marker);
    };
  };

  // 인포윈도우를 닫는 클로저를 만드는 함수입니다
  const makeOutListener: any = (infowindow: any) => {
    return function () {
      infowindow.close();
    };
  };

  const mapscript = () => {
    // kaka API 띄우기
    let container = document.getElementById('map');
    let options = {
      //지도 기본 위치값 서울역 좌표로 지정
      center: new window.kakao.maps.LatLng(37.555178, 126.970756),
      level: 5,
    };
    let map: any = new window.kakao.maps.Map(container, options);

    // 마커 한개 생성 및 띄우기 서울역
    let markerPosition = new kakao.maps.LatLng(37.555163, 126.970768);
    let marker = new kakao.maps.Marker({
      map: map,
      position: markerPosition,
    });

    //인포윈도우 띄우기
    let infowindow = new kakao.maps.InfoWindow({
      //이부분에 윈도우 정보 html로 작성
      content: '<div>서울역</div><div>안녕</div>',
      //인포윈도우 클릭시 X창뜨게하기
      removable: true,
    });

    //윈포윈도우에 mouseover, out 이벤트
    //   kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
    //    kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));

    //윈포윈도우 클릭이벤트
    kakao.maps.event.addListener(marker, 'click', function (mouseEvent: any) {
      infowindow.open(map, marker);
    });

    //markerDate에 있는 마커 여러개 생성 및 표시
    markerdata.map((el) => {
      new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(el.lat, el.lng),
        title: el.title,
      });
    });
  };

  return (
    <div className="Map">
      <div id="map" style={{ width: '100vw', height: 'calc(100vh - 53px)'}} />
    </div>
  );
};

export default Map;
