/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useMemo, useState } from 'react';
import { markerdata } from './markerDate';
import './Map.scss';
import { Button, Input, Form } from 'antd';

import cssRules from './Map.module.scss';
import api from 'common/api/api';
import { EV } from 'common/types';

const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';

interface Props {
  pageMode: boolean;
}

//
// Declaration for Kakao
//
declare global {
  interface Window {
    kakao: any;
  }
}
const { kakao } = window;
//

const mapOptions = {
  //지도 기본 위치값 서울역 좌표로 지정
  center: new window.kakao.maps.LatLng(37.555178, 126.970756),
  level: 5,
};

//

const Map: React.FC<Props> = ({ pageMode }) => {
  const [infowindows, Setinfowindows]: any = useState([]);

  // 조건문 작성
  // useEffect(() => {
  //   pageMode ?
  // },[pageMode])

  useEffect(() => {
    //화면표시전에 로딩되면 마커가 제대로 생성되지않아 랜더링이 제대로 이루어지않기 때문에
    //이를 방지하기 위해 setTimeout
    setTimeout(() => {
      mapscript();
    }, 20);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [markers, setMarkers] = React.useState<any[]>([]);
  const [hydrogenList, setHydrogenList] = React.useState<any[]>();
  const mapContainerRef = React.createRef<HTMLDivElement>();
  let list: any = [];

  const closeInfoWindow = () => {
    list.forEach((el: any) => {
      //마커 닫기
      el.close();
    });
  };

  const [map, setMap] = useState<any>();
  const [ps, setPs] = useState<any>();

  const mapscript = () => {
    // kaka API 띄우기
    setMap(() => {
      const map = new kakao.maps.Map(mapContainerRef.current, mapOptions);
      setPs(() => {
        return new kakao.maps.services.Places();
      });

      //markerDate에 있는 마커 여러개 생성 및 표시
      markerdata.forEach((el: any) => {
        const hydro = new kakao.maps.Marker({
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

        // Setinfowindows([...infowindows, infowindow]);
        list.push(infowindow);

        //클릭이벤트 등록
        kakao.maps.event.addListener(hydro, 'click', function () {
          //해당 마커외에 닫는 메소드
          closeInfoWindow();
          //마커 정보띄우기
          infowindow.open(map, hydro);
        });

        hydro.setMap(map);
      });
      return map;
    });
  };

  //수소차 정보
  // const hydrogen = () => {};

  //
  // EV list
  //

  const [evs, setEvs] = useState<EV[]>([]);

  const loadEvs = async () => {
    const res = await api({ url: '/car/electric/station', params: { numOfRows: 500, pageNo: 1 } });
    const next: typeof evs = res?.data?.response?.body?.items?.item;
    console.log({ next });
    setEvs(next);
  };

  useEffect(() => {
    //여기에 조건문...
    loadEvs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setEvMarkers = () => {
    console.log({ evs });

    evs.forEach((ev: EV) => {
      const imageSize = new kakao.maps.Size(24, 35);
      const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

      const marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(ev.lat, ev.lng),
        title: ev.statNm,
        clickable: true,
        image: markerImage,
      });
      const infoWindow = new kakao.maps.InfoWindow({
        content: `<div style="display: flex; flex-flow: column; min-width: 350px;">
        <div>전기차충전소</div>
      <div class="title">${ev.statNm}</div>
      <div class="title">${ev.addr}</div>
      <div class="title">${ev.useTime}</div>
      </div>`,
        removable: true,
      });

      marker.setMap(map);
      kakao.maps.event.addListener(marker, 'click', function () {
        infoWindow.open(map, marker);
      });
    });
  };

  useEffect(() => {
    setEvMarkers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [evs]);

  //
  // Render
  //

  return (
    <div className={cssRules.Map}>
      <div id="map" ref={mapContainerRef} style={{ width: '100vw', height: 'calc(100vh - 53px)' }} />
      <div className={`${cssRules.menu_wrap} ${cssRules.bg_white}`} id="menuWrap">
        <div className="option">
          <div>
            {/* <Form onFinish={searchPlaces} layout="inline"> */}
            <Form layout="inline">
              <Form.Item label="키워드" style={{ flex: 1 }}>
                <Input defaultValue="이태원 맛집" id="keyword" />
              </Form.Item>
              <Form.Item>
                <Button htmlType="submit">검색하기</Button>
              </Form.Item>
            </Form>
          </div>
        </div>
        <hr />
        <ul id="placesList" />
        <div id="pagination" />
      </div>
    </div>
  );
};

export default Map;
