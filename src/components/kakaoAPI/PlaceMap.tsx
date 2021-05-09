/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { markerdata } from './markerDate';
import './PlaceMap.scss';
import { Button, Input, Form } from 'antd';

import cssRules from './Map.module.scss';
import api from 'common/api/api';
import { EV, KakaoCategory, kakaoCategoryTable, MapMarkerInfo } from 'common/types';
import { evChgerTypeConvert, evStatConvert, getLocation } from 'common/helpers';

//
// Kakao
//

const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';

const { kakao } = window;

const ID_CUSTOM_OVERLAY_CLOSE = 'customOverlayClose';

interface MarkerOriginalEvent<T> {
  marker: any;
  original: T;
  event: () => void;
}

const mapOptions = {
  //지도 기본 위치값 서울역 좌표로 지정
  center: new window.kakao.maps.LatLng(37.555178, 126.970756),
  level: 5,
};

//
// Overlay
//
let ___PLACE_OVERLAY_CLOSINGS___: any[] = [];

const placeOverlay = new kakao.maps.CustomOverlay({ zIndex: 1 });
const placeOverlayContentNode = document.createElement('div');
placeOverlayContentNode.className = 'placeinfo_wrap';
// 커스텀 오버레이의 컨텐츠 노드에 mousedown, touchstart 이벤트가 발생했을때
// 지도 객체에 이벤트가 전달되지 않도록 이벤트 핸들러로 kakao.maps.event.preventMap 메소드를 등록합니다
placeOverlayContentNode.addEventListener('mousedown', kakao.maps.event.preventMap);
placeOverlayContentNode.addEventListener('touchstart', kakao.maps.event.preventMap);

placeOverlay.setContent(placeOverlayContentNode);

function PlaceMap(): React.ReactElement {
  //
  // Map
  //
  const [map, setMap] = useState<any>();

  const mapContainerRef = React.createRef<HTMLDivElement>();

  useEffect(() => {
    // 화면표시전에 로딩되면 마커가 제대로 생성되지않아 랜더링이 제대로 이루어지않기 때문에
    // 이를 방지하기 위해 setTimeout
    setTimeout(initializeMap, 20);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initializeMap = () => {
    // kaka API 띄우기
    setMap(() => {
      const map = new kakao.maps.Map(mapContainerRef.current, mapOptions);
      setPs(new kakao.maps.services.Places(map));
      return map;
    });
  };

  //
  // Category
  //
  const [currCategory, setCurrCategory] = useState<KakaoCategory>('CS2');

  const onClickCategory: React.MouseEventHandler<HTMLLIElement> = (e) => {
    const id = e.currentTarget.id as KakaoCategory;
    placeOverlay.setMap(null);
    setCurrCategory(id);
    searchPlaces(id);
  };

  //
  // Places
  //
  const [ps, setPs] = useState<any>();

  const searchPlaces = (category: typeof currCategory) => {
    // Remove custom overlays on map
    ___PLACE_OVERLAY_CLOSINGS___.forEach((closeOverlay) => {
      closeOverlay();
    });
    ___PLACE_OVERLAY_CLOSINGS___ = [];

    // Remove markers on map
    removeMarker();

    ps.categorySearch(category, onAfterPlacesSearch, { useMapBounds: true });
  };

  const onAfterPlacesSearch = (data: any, status: any, pagination: any) => {
    if (status === kakao.maps.services.Status.OK) {
      // 정상적으로 검색이 완료됐으면 지도에 마커를 표출합니다
      displayPlaces(data);
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
      // No search result
    } else if (status === kakao.maps.services.Status.ERROR) {
      // No search result due to error
    }
  };

  //
  // Marker
  //
  const [markers, setMarkers] = useState<any[]>([]);

  const removeMarker = () => {
    markers.forEach((marker) => {
      marker.setMap(null);
    });

    setMarkers([]);
  };

  const displayPlaces = (places: any[]) => {
    // Markers
    const markers: any[] = places.map((place) => {
      const position = new kakao.maps.LatLng(place.y, place.x);
      const imageSize = new kakao.maps.Size(24, 35);
      const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

      // Marker
      const marker = new kakao.maps.Marker({ position, image: markerImage });

      // on map
      marker.setMap(map);

      // Click event
      // markers.forEach((marker) => {
      //   kakao.maps.event.addListener(marker, 'click', () => {
      //     displayPlaceInfo(place);
      //   });
      // });
      kakao.maps.event.addListener(marker, 'click', () => {
        displayPlaceInfo(place);
      });

      return marker;
    });

    // setState
    setMarkers(markers);
  };

  //
  // Overlay
  //

  const displayPlaceInfo = (place: any) => {
    const placeInfo = document.createElement('div');
    placeInfo.className = 'placeInfo';

    const title = document.createElement('a');
    title.href = place.place_url;
    title.target = '_blank';
    title.title = place.palce_name;
    title.append(place.place_name);
    placeInfo.append(title);
    if (place.road_address_name) {
      const s = document.createElement('span');
      s.title = place.road_address_name;
      s.append(place.road_address_name);
      const s1 = document.createElement('span');
      s1.className = 'jibun';
      s1.title = place.address_name;
      s1.append(`지번 : ${place.address_name}`);
      placeInfo.append(s, s1);
    } else {
      const s = document.createElement('span');
      s.title = place.address_name;
      s.append(place.address_name);
      placeInfo.append(s);
    }
    const tel = document.createElement('span');
    tel.className = 'tel';
    tel.append(place.phone);
    placeInfo.append(tel);

    const after = document.createElement('div');
    after.className = 'after';

    const content = placeInfo.innerHTML + after.innerHTML;
    placeOverlayContentNode.innerHTML = content;
    placeOverlay.setPosition(new kakao.maps.LatLng(place.y, place.x));
    placeOverlay.setMap(map);
  };

  //
  // Markers and Overlays
  //

  // const [evMarkers, setEvMarkers] = React.useState<MarkerOriginalEvent<EV>[]>([]);
  // const [hydrogenMarkers, setHydrogenMarkers] = React.useState<MarkerOriginalEvent<MapMarkerInfo>[]>([]);
  // const [evOverlay, setEvOverlay] = React.useState<any>(null);
  // const [hydrogenOverlay, setHydrogenOverlay] = React.useState<any>(null);

  //
  // Hydrogen list
  //

  // const setHydrogenMarkersMap = () => {
  //   //markerDate에 있는 마커 여러개 생성 및 표시
  //   const markersAndOriginals = markerdata.map((el: MapMarkerInfo): {
  //     marker: any;
  //     original: MapMarkerInfo;
  //     event: () => void;
  //   } => {
  //     const marker = new kakao.maps.Marker({
  //       map: map,
  //       position: new kakao.maps.LatLng(el.lat, el.lng),
  //       title: el.title,
  //       clickable: true,
  //     });

  //     marker.setMap(map);

  //     const event = () => {
  //       setHydrogenOverlayMap(el, marker);
  //     };

  //     kakao.maps.event.addListener(marker, 'click', event);

  //     return { marker, original: el, event };
  //   });

  //   setHydrogenMarkers(markersAndOriginals);
  // };

  // const unsetHydrogenMarkersMap = () => {
  //   hydrogenMarkers.forEach(({ marker }): void => {
  //     marker.setMap(null);
  //   });
  // };

  //
  // EV list
  //

  // const [evs, setEvs] = useState<EV[]>([]);

  // const loadEvs = async () => {
  //   const res = await api({ url: '/car/electric/station', params: { numOfRows: 1000, pageNo: 1 } });
  //   const next: typeof evs = res?.data?.response?.body?.items?.item;
  //   setEvs(next);
  // };

  // useEffect(() => {
  //   if (map) {
  //     // 맵이 로딩된 이후에 동작
  //     closeEvOverlay();
  //     closeHydrogenOverlay();
  //     if (pageMode) {
  //       // EV
  //       loadEvs();
  //       unsetHydrogenMarkersMap();
  //       ___HYDROGEN_OVERLAYS_CLOSINGS___.forEach((f) => {
  //         f();
  //       });
  //       ___HYDROGEN_OVERLAYS_CLOSINGS___ = [];
  //     } else {
  //       // Hydrogen
  //       setHydrogenMarkersMap();
  //       unsetEvMarkersMap();
  //       ___EV_OVERLAY_CLOSINGS___.forEach((f) => {
  //         f();
  //       });
  //       ___EV_OVERLAY_CLOSINGS___ = [];
  //     }
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [map, pageMode]);

  // const setEvMarkersMap = () => {
  //   const markersOriginalsEvents = evs.map((ev: EV): { marker: any; original: EV; event: () => void } => {
  //     const imageSize = new kakao.maps.Size(24, 35);
  //     const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

  //     const marker = new kakao.maps.Marker({
  //       map: map,
  //       position: new kakao.maps.LatLng(ev.lat, ev.lng),
  //       title: ev.statNm,
  //       clickable: true,
  //       image: markerImage,
  //     });

  //     marker.setMap(map);

  //     const event = () => {
  //       setEvOverlayMap(ev, marker);
  //     };

  //     kakao.maps.event.addListener(marker, 'click', event);

  //     return { marker, original: ev, event };
  //   });

  //   setEvMarkers((prev) => {
  //     prev.forEach(({ marker, event }) => {
  //       kakao.maps.event.removeListener(marker, 'click', event);
  //     });

  //     return markersOriginalsEvents;
  //   });
  // };

  // const unsetEvMarkersMap = () => {
  //   evMarkers.forEach(({ marker }): void => {
  //     marker.setMap(null);
  //   });
  // };

  // useEffect(() => {
  //   if (map) {
  //     // 맵이 로딩된 이후에 동작
  //     setEvMarkersMap();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [evs, map]);

  // //
  // // Overlay
  // //

  // const closeEvOverlay = () => {
  //   evOverlay?.setMap(null);
  // };

  // const closeHydrogenOverlay = () => {
  //   hydrogenOverlay?.setMap(null);
  // };

  // const setEvOverlayMap = (ev: EV, marker: any) => {
  //   if (evOverlay) evOverlay.setMap(null);

  //   const wrap = document.createElement('div');
  //   wrap.className = 'wrap';
  //   const info = document.createElement('div');
  //   info.className = 'info';
  //   const top = document.createElement('div');
  //   top.className = 'top';
  //   const title = document.createElement('div');
  //   title.className = 'title';
  //   title.innerText = ev.statNm;
  //   const link = document.createElement('a');
  //   link.setAttribute('href', `https://map.kakao.com/link/to/${ev.statNm},${ev.lat},${ev.lng}`);
  //   link.setAttribute('target', '_blank');
  //   link.appendChild(title);
  //   const close = document.createElement('div');
  //   close.className = 'close';
  //   close.title = '닫기';
  //   const desc = document.createElement('div');
  //   desc.className = 'desc';
  //   const addr = document.createElement('div');
  //   addr.className = 'desc-inner';
  //   addr.innerText = `주소 : ${ev.addr}`;
  //   const busiCall = document.createElement('div');
  //   busiCall.className = 'desc-inner';
  //   busiCall.innerText = `전화 : ${ev.busiCall}`;
  //   const chgerType = document.createElement('div');
  //   chgerType.className = 'desc-inner';
  //   chgerType.innerText = `충전기타입 : ${evChgerTypeConvert(ev.chgerType)}`;
  //   const stat = document.createElement('div');
  //   stat.className = 'desc-inner';
  //   stat.innerText = `충전기상태 : ${evStatConvert(ev.stat)}`;
  //   const powerType = document.createElement('div');
  //   powerType.className = 'desc-inner';
  //   powerType.innerText = `충전량 : ${ev.powerType}`;
  //   const useTime = document.createElement('div');
  //   useTime.className = 'desc-inner';
  //   useTime.innerText = `이용가능시간 : ${ev.useTime}`;
  //   const note = ev.note ? document.createElement('div') : null;
  //   if (note) {
  //     note.className = 'desc-inner';
  //     note.innerText = `충전소 안내 : ${ev.note}`;
  //   }

  //   wrap.append(info);
  //   info.append(top, desc);
  //   top.append(link, close);
  //   desc.append(addr, busiCall, chgerType, stat, powerType, useTime);
  //   if (note) desc.append(note);

  //   const overlay = new kakao.maps.CustomOverlay({
  //     content: wrap,
  //     position: marker.getPosition(),
  //     map: map,
  //   });

  //   close.addEventListener('click', () => overlay.setMap(null));
  //   ___EV_OVERLAY_CLOSINGS___.push(() => overlay.setMap(null));
  // };

  // const setHydrogenOverlayMap = (el: MapMarkerInfo, marker: any) => {
  //   const wrap = document.createElement('div');
  //   wrap.className = 'wrap';
  //   const info = document.createElement('div');
  //   info.className = 'info';
  //   const top = document.createElement('div');
  //   top.className = 'top';
  //   const title = document.createElement('div');
  //   title.className = 'title';
  //   title.innerText = el.title;
  //   const link = document.createElement('a');
  //   link.setAttribute('href', `https://map.kakao.com/link/to/${el.address},${el.lat},${el.lng}`);
  //   link.setAttribute('target', '_blank');
  //   link.appendChild(title);
  //   const close = document.createElement('div');
  //   close.className = 'close';
  //   close.title = '닫기';
  //   const desc = document.createElement('div');
  //   desc.className = 'desc';
  //   const address = document.createElement('div');
  //   address.className = 'desc-inner';
  //   address.innerText = `주소 : ${el.address}`;
  //   const tell = document.createElement('div');
  //   tell.className = 'desc-inner';
  //   tell.innerText = `전화 : ${el.tell}`;
  //   const price = document.createElement('div');
  //   price.className = 'desc-inner';
  //   price.innerText = `요금 : ${el.price}`;
  //   const time = document.createElement('div');
  //   time.className = 'desc-inner';
  //   time.innerText = `영업시간 : ${el.time}`;

  //   wrap.append(info);
  //   info.append(top, desc);
  //   top.append(link, close);
  //   desc.append(address, tell, price, time);

  //   const overlay = new kakao.maps.CustomOverlay({
  //     //이부분에 윈도우 정보 html로 작성
  //     content: wrap,
  //     position: marker.getPosition(),
  //     map: map,
  //   });

  //   close.addEventListener('click', () => overlay.setMap(null));
  //   ___HYDROGEN_OVERLAYS_CLOSINGS___.push(() => overlay.setMap(null));
  // };

  //
  // Location
  //
  useEffect(() => {
    if (map) {
      getLocation((position) => {
        const l = new window.kakao.maps.LatLng(position.coords.latitude, position.coords.longitude);
        map.setCenter(l);
      });
    }
  }, [map]);

  //
  // Render
  //

  // 모바일 브라우저(Chorme, Firefox)대응 vh
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  window.addEventListener('resize', () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  });

  return (
    <div className={cssRules.Map}>
      <div id="map" ref={mapContainerRef} style={{ width: '100vw', height: 'calc(var(--vh, 1vh)*100 - 53px)' }} />
      <ul id="category">
        <li id="CS2" data-order="1" onClick={onClickCategory}>
          <span className="category_bg store"></span>
          {/* 편의점 */}
          {kakaoCategoryTable.CS2}
        </li>
        <li id="CE7" data-order="2" onClick={onClickCategory}>
          <span className="category_bg cafe"></span>
          {/* 카페 */}
          {kakaoCategoryTable.CE7}
        </li>
        <li id="FD6" data-order="3" onClick={onClickCategory}>
          <span className="category_bg cafe"></span>
          {/* 음식점 */}
          {kakaoCategoryTable.FD6}
        </li>
      </ul>
    </div>
  );
}

export default PlaceMap;
