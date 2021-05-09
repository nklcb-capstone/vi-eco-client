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

//
// Category
//
let ___currCategory___: KakaoCategory = 'CS2';

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
    ___currCategory___ = id;
    setCurrCategory(id);
    searchPlaces(id);
  };

  //
  // Places
  //
  const [ps, setPs] = useState<any>();

  useEffect(() => {
    if (map && ps) {
      // Since searchPlaces works where ps is defined
      kakao.maps.event.addListener(map, 'idle', searchPlaces);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, ps]);

  const searchPlaces = (category: typeof currCategory = ___currCategory___) => {
    if (ps) {
      // if ps defined
      // Remove custom overlays on map
      ___PLACE_OVERLAY_CLOSINGS___.forEach((closeOverlay) => {
        closeOverlay();
      });
      ___PLACE_OVERLAY_CLOSINGS___ = [];

      // Remove markers on map
      removeMarker();

      ps.categorySearch(category, onAfterPlacesSearch, { useMapBounds: true });
    }
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
