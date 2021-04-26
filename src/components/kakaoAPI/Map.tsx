/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { markerdata } from './markerDate';
import './Map.scss';
import { Button, Input, Form } from 'antd';

import cssRules from './Map.module.scss';
import api from 'common/api/api';
import { EV, MapMarkerInfo } from 'common/types';

//
// Kakao
//

const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';

declare global {
  interface Window {
    kakao: any;
  }
}
const { kakao } = window;

const mapOptions = {
  //지도 기본 위치값 서울역 좌표로 지정
  center: new window.kakao.maps.LatLng(37.555178, 126.970756),
  level: 5,
};

//
//
//

interface Props {
  pageMode: boolean;
}

const Map: React.FC<Props> = ({ pageMode }) => {
  useEffect(() => {
    // 화면표시전에 로딩되면 마커가 제대로 생성되지않아 랜더링이 제대로 이루어지않기 때문에
    // 이를 방지하기 위해 setTimeout
    setTimeout(() => {
      mapscript();
    }, 20);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //
  // Map
  //

  const [map, setMap] = useState<any>();
  const [ps, setPs] = useState<any>();

  const mapscript = () => {
    // kaka API 띄우기
    setMap(() => {
      const map = new kakao.maps.Map(mapContainerRef.current, mapOptions);
      setPs(() => {
        return new kakao.maps.services.Places();
      });

      return map;
    });
  };

  const mapContainerRef = React.createRef<HTMLDivElement>();

  //
  // Markers and Infowindows
  //

  // setEvMarkers 함수가 따로 있어서 set 함수 이름뒤에 State를 붙임
  const [evMarkers, setEvMarkers] = React.useState<any[]>([]);
  const [hydrogenMarkers, setHydrogenMarkers] = React.useState<any[]>([]);
  const [evInfowindows, setEvInfowindows] = React.useState<any[]>([]);
  const [hydrogenInfowindows, setHydrogenInfowindows] = React.useState<any[]>([]);

  // 마커 클릭했을 때 다른 인포윈도우를 모두 닫는 작업
  const closeAllInfoWindows = useCallback(() => {
    // 모든 인포윈도 닫기
    // 전기
    evInfowindows.forEach((el: any) => {
      el.setMap(null);
      // el.close();
    });
    // 수소
    hydrogenInfowindows.forEach((el: any) => {
      // el.close();
      el.setMap(null);
    });
  }, [evInfowindows, hydrogenInfowindows]);

  useEffect(() => {
    evMarkers.forEach((marker) => {
      evInfowindows.forEach((infowindow) => {
        kakao.maps.event.addListener(marker, 'click', function () {
          // 모든 마커 닫는 메소드
          closeAllInfoWindows();
          // 해당 마커 정보띄우기
          infowindow.setMap(map);
        });
      });
      hydrogenInfowindows.forEach((infowindow) => {
        kakao.maps.event.addListener(marker, 'click', function () {
          // 모든 마커 닫는 메소드
          closeAllInfoWindows();
          // 해당 마커 정보띄우기
          infowindow.setMap(map);
        });
      });
    });
    hydrogenMarkers.forEach((marker) => {
      evInfowindows.forEach((infowindow) => {
        kakao.maps.event.addListener(marker, 'click', function () {
          // 모든 마커 닫는 메소드
          closeAllInfoWindows();
          // 해당 마커 정보띄우기
          infowindow.setMap(map);
        });
      });
      hydrogenInfowindows.forEach((infowindow) => {
        kakao.maps.event.addListener(marker, 'click', function () {
          // 모든 마커 닫는 메소드
          closeAllInfoWindows();
          // 해당 마커 정보띄우기
          infowindow.setMap(map);
        });
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [evMarkers, hydrogenMarkers, closeAllInfoWindows, map]);

  //
  // Hydrogen list
  //

  const setHydrogenMarkersMap = () => {
    //markerDate에 있는 마커 여러개 생성 및 표시
    const markersAndInfowindows = markerdata.map((el: MapMarkerInfo): { marker: any; infowindow: any } => {
      const marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(el.lat, el.lng),
        title: el.title,
        clickable: true,
      });

      const infowindow = new kakao.maps.CustomOverlay({
        //이부분에 윈도우 정보 html로 작성
        content: `<div class="wrap">
        <div class="info">
          <div class="top">
            <div class="title">${el.title}
            <div class="close" title="닫기"></div>
          </div>  
          <div class="desc">
            <div>주소 : ${el.address}</div>  
            <div>전화 : ${el.tell}</div> 
            <div>요금 : ${el.price}</div>
            <div>영업 시간 : ${el.time}</div>
          </div>
        </div>
      </div>`,
        position: marker.getPosition(),
        map: map,
      });

      return { marker, infowindow };
    });

    markersAndInfowindows.forEach(({ marker, infowindow }) => {
      marker.setMap(map);
      kakao.maps.event.addListener(marker, 'click', function () {
        //마커 정보띄우기
        infowindow.setMap(map);
      });
    });

    setHydrogenMarkers(markersAndInfowindows.map(({ marker }) => marker));
    setHydrogenInfowindows(markersAndInfowindows.map(({ infowindow }) => infowindow));
  };

  const unsetHydrogenMarkersMap = () => {
    hydrogenMarkers.forEach((marker: any): void => {
      marker.setMap(null);
    });
  };

  //
  // EV list
  //

  const [evs, setEvs] = useState<EV[]>([]);

  const loadEvs = async () => {
    const res = await api({ url: '/car/electric/station', params: { numOfRows: 500, pageNo: 1 } });
    const next: typeof evs = res?.data?.response?.body?.items?.item;
    setEvs(next);
  };

  useEffect(() => {
    if (map) {
      // 맵이 로딩된 이후에 동작
      closeAllInfoWindows();
      if (pageMode) {
        // EV
        loadEvs();
        unsetHydrogenMarkersMap();
      } else {
        // Hydrogen
        setHydrogenMarkersMap();
        unsetEvMarkersMap();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, pageMode]);

  const setEvMarkersMap = () => {
    const markersAndEvInfowindows = evs.map((ev: EV): { marker: any; infowindow: any } => {
      const imageSize = new kakao.maps.Size(24, 35);
      const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

      //     //
      //     //
      //     //

      //     const hydro = new kakao.maps.Marker({
      //       map: map,
      //       position: new kakao.maps.LatLng(el.lat, el.lng),
      //       title: el.title,
      //       clickable: true,
      //     });

      //     const overlay = new kakao.maps.CustomOverlay({
      //       //이부분에 윈도우 정보 html로 작성
      //       content: `<div class="wrap">
      //   <div class="info">
      //     <div class="top">
      //       <div class="title">${el.title}
      //       <div class="close" title="닫기"></div>
      //     </div>
      //     <div class="desc">
      //       <div>주소 : ${el.address}</div>
      //       <div>전화 : ${el.tell}</div>
      //       <div>요금 : ${el.price}</div>
      //       <div>영업 시간 : ${el.time}</div>
      //     </div>
      //   </div>
      // </div>`,
      //       position: hydro.getPosition(),
      //       //인포윈도우 클릭시 X창뜨게하기
      //       // removable: true,
      //     });

      //     // Setinfowindows([...infowindows, infowindow]);
      //     list.push(overlay);

      //     //클릭이벤트 등록
      //     kakao.maps.event.addListener(hydro, 'click', function () {
      //       //해당 마커외에 닫는 메소드
      //       // closeInfoWindow();
      //       //마커 정보띄우기
      //       // infowindow.open(map, hydro);
      //       overlay.setMap(map);
      //     });

      //     //
      //     //
      //     //

      const marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(ev.lat, ev.lng),
        title: ev.statNm,
        clickable: true,
        image: markerImage,
      });

      const infowindow = new kakao.maps.CustomOverlay({
        //이부분에 윈도우 정보 html로 작성
        content: `<div class="wrap">
    <div class="info">
      <div class="top">
        <div class="title">${ev.statNm}
        <div class="close" title="닫기"></div>
      </div>  
      <div class="desc">
        <div>주소 : ${ev.addr}</div>  
        <div>전화 : ${ev.busiCall}</div> 
        <div>요금 : ${ev}</div>
        <div>영업 시간 : ${ev}</div>
      </div>
    </div>
  </div>`,
        position: marker.getPosition(),
        map: map,
      });
      // const infowindow = new kakao.maps.InfoWindow({
      //   content: `<div style="display: flex; flex-flow: column; min-width: 350px;">
      //   <div>전기차충전소</div>
      // <div class="title">${ev.statNm}</div>
      // <div class="title">${ev.addr}</div>
      // <div class="title">${ev.useTime}</div>
      // </div>`,
      //   removable: true,
      // });

      marker.setMap(map);
      kakao.maps.event.addListener(marker, 'click', function () {
        // infowindow.open(map, marker);
        infowindow.setMap(map);
      });

      return { marker, infowindow };
    });

    setEvMarkers(markersAndEvInfowindows.map(({ marker }) => marker));
    setEvInfowindows(markersAndEvInfowindows.map(({ infowindow }) => infowindow));
  };

  const unsetEvMarkersMap = () => {
    evMarkers.forEach((marker: any): void => {
      marker.setMap(null);
    });
  };

  useEffect(() => {
    if (map) {
      // 맵이 로딩된 이후에 동작
      setEvMarkersMap();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [evs, map]);

  //
  // Render
  //

  return (
    <div className={cssRules.Map}>
      <div id="map" ref={mapContainerRef} style={{ width: '100vw', height: 'calc(100vh - 53px)' }} />
    </div>
  );
};

export default Map;
