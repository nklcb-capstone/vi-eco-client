/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { markerdata } from './markerDate';
import './Map.scss';
import { Button, Input, Form } from 'antd';

import cssRules from './Map.module.scss';
import api from 'common/api/api';
import { EV, MapMarkerInfo } from 'common/types';
import { evChgerTypeConvert, evStatConvert } from 'common/helpers';

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

//
//
// //
let ___EV_OVERLAYS___: any[] = [];
let ___HYDROGEN_OVERLAYS___: any[] = [];
let ___EV_OVERLAY_CLOSINGS___: any[] = [];
let ___HYDROGEN_OVERLAYS_CLOSINGS___: any[] = [];

const ID_CUSTOM_OVERLAY_CLOSE = 'customOverlayClose';

interface MarkerOriginalEvent<T> {
  marker: any;
  original: T;
  event: () => void;
}

interface Props {
  pageMode: boolean;
}

const mapOptions = {
  //지도 기본 위치값 서울역 좌표로 지정
  center: new window.kakao.maps.LatLng(37.555178, 126.970756),
  level: 5,
};

const Map: React.FC<Props> = ({ pageMode }) => {
  //
  //지도 그리기
  //
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
  // 위치 받아오기
  //
  function getLocation() {
    if (navigator.geolocation) {
      // GPS를 지원하면
      navigator.geolocation.getCurrentPosition(
        function (position) {
          map.setCenter(new window.kakao.maps.LatLng(position.coords.latitude, position.coords.longitude));
        },
        function (error) {
          console.error(error);
        },
        {
          enableHighAccuracy: true,
        },
      );
    } else {
      alert('GPS를 지원하지 않습니다');
    }
  }

  useEffect(() => {
    if (map) {
      getLocation();
    }
  }, [map]);

  //
  // Markers and Overlays
  //

  const [evMarkers, setEvMarkers] = React.useState<MarkerOriginalEvent<EV>[]>([]);
  const [hydrogenMarkers, setHydrogenMarkers] = React.useState<MarkerOriginalEvent<MapMarkerInfo>[]>([]);
  const [evOverlay, setEvOverlay] = React.useState<any>(null);
  const [hydrogenOverlay, setHydrogenOverlay] = React.useState<any>(null);

  // useEffect(() => {
  //   evMarkers.forEach(({ marker, original }) => {
  //     kakao.maps.event.addListener(marker, 'click', () => {
  //       setEvOverlayMap(original, marker);
  //     });
  //   });
  //   hydrogenMarkers.forEach(({ marker, original }) => {
  //     kakao.maps.event.addListener(marker, 'click', () => {
  //       setHydrogenOverlayMap(original, marker);
  //     });
  //   });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [evMarkers, hydrogenMarkers, map]);

  //
  // Hydrogen list
  //

  const setHydrogenMarkersMap = () => {
    //markerDate에 있는 마커 여러개 생성 및 표시
    const markersAndOriginals = markerdata.map((el: MapMarkerInfo): {
      marker: any;
      original: MapMarkerInfo;
      event: () => void;
    } => {
      const marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(el.lat, el.lng),
        title: el.title,
        clickable: true,
      });

      marker.setMap(map);

      const event = () => {
        setHydrogenOverlayMap(el, marker);
      };

      kakao.maps.event.addListener(marker, 'click', event);

      return { marker, original: el, event };
    });

    setHydrogenMarkers(markersAndOriginals);
  };

  const unsetHydrogenMarkersMap = () => {
    hydrogenMarkers.forEach(({ marker }): void => {
      marker.setMap(null);
    });
  };

  //
  // EV list
  //

  const [evs, setEvs] = useState<EV[]>([]);

  const loadEvs = async () => {
    const res = await api({ url: '/car/electric/station', params: { numOfRows: 1000, pageNo: 1 } });
    const next: typeof evs = res?.data?.response?.body?.items?.item;
    setEvs(next);
  };

  useEffect(() => {
    if (map) {
      // 맵이 로딩된 이후에 동작
      closeEvOverlay();
      closeHydrogenOverlay();
      if (pageMode) {
        // EV
        loadEvs();
        unsetHydrogenMarkersMap();
        ___HYDROGEN_OVERLAYS_CLOSINGS___.forEach((f) => {
          f();
        });
        ___HYDROGEN_OVERLAYS_CLOSINGS___ = [];
      } else {
        // Hydrogen
        setHydrogenMarkersMap();
        unsetEvMarkersMap();
        ___EV_OVERLAY_CLOSINGS___.forEach((f) => {
          f();
        });
        ___EV_OVERLAY_CLOSINGS___ = [];
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, pageMode]);

  const setEvMarkersMap = () => {
    const markersOriginalsEvents = evs.map((ev: EV): { marker: any; original: EV; event: () => void } => {
      const imageSize = new kakao.maps.Size(24, 35);
      const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

      const marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(ev.lat, ev.lng),
        title: ev.statNm,
        clickable: true,
        image: markerImage,
      });

      marker.setMap(map);

      const event = () => {
        setEvOverlayMap(ev, marker);
      };

      kakao.maps.event.addListener(marker, 'click', event);

      return { marker, original: ev, event };
    });

    setEvMarkers((prev) => {
      prev.forEach(({ marker, event }) => {
        kakao.maps.event.removeListener(marker, 'click', event);
      });

      return markersOriginalsEvents;
    });
  };

  const unsetEvMarkersMap = () => {
    evMarkers.forEach(({ marker }): void => {
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
  // Overlay
  //

  const closeEvOverlay = () => {
    evOverlay?.setMap(null);
  };

  const closeHydrogenOverlay = () => {
    hydrogenOverlay?.setMap(null);
  };

  const setEvOverlayMap = (ev: EV, marker: any) => {
    if (evOverlay) evOverlay.setMap(null);

    const wrap = document.createElement('div');
    wrap.className = 'wrap';
    const info = document.createElement('div');
    info.className = 'info';
    const top = document.createElement('div');
    top.className = 'top';
    const title = document.createElement('div');
    title.className = 'title';
    title.innerText = ev.statNm;
    const link = document.createElement('a');
    link.setAttribute('href', `https://map.kakao.com/link/to/${ev.statNm},${ev.lat},${ev.lng}`);
    link.setAttribute('target', '_blank');
    link.appendChild(title);
    const close = document.createElement('div');
    close.className = 'close';
    close.title = '닫기';
    const desc = document.createElement('div');
    desc.className = 'desc';
    const addr = document.createElement('div');
    addr.className = 'desc-inner';
    addr.innerText = `주소 : ${ev.addr}`;
    const busiCall = document.createElement('div');
    busiCall.className = 'desc-inner';
    busiCall.innerText = `전화 : ${ev.busiCall}`;
    const chgerType = document.createElement('div');
    chgerType.className = 'desc-inner';
    chgerType.innerText = `충전기타입 : ${evChgerTypeConvert(ev.chgerType)}`;
    const stat = document.createElement('div');
    stat.className = 'desc-inner';
    stat.innerText = `충전기상태 : ${evStatConvert(ev.stat)}`;
    const powerType = document.createElement('div');
    powerType.className = 'desc-inner';
    powerType.innerText = `충전량 : ${ev.powerType}`;
    const useTime = document.createElement('div');
    useTime.className = 'desc-inner';
    useTime.innerText = `이용가능시간 : ${ev.useTime}`;
    const note = ev.note ? document.createElement('div') : null;
    if (note) {
      note.className = 'desc-inner';
      note.innerText = `충전소 안내 : ${ev.note}`;
    }

    wrap.append(info);
    info.append(top, desc);
    top.append(link, close);
    desc.append(addr, busiCall, chgerType, stat, powerType, useTime);
    if (note) desc.append(note);

    const overlay = new kakao.maps.CustomOverlay({
      content: wrap,
      position: marker.getPosition(),
      map: map,
    });

    close.addEventListener('click', () => overlay.setMap(null));
    ___EV_OVERLAY_CLOSINGS___.push(() => overlay.setMap(null));
    // setEvOverlay((): any => {
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
    //   top.append(title, close);
    //   desc.append(addr, busiCall, chgerType, stat, powerType, useTime);
    //   if (note) desc.append(note);

    //   const overlay = new kakao.maps.CustomOverlay({
    //     content: wrap,
    //     position: marker.getPosition(),
    //     map: map,
    //   });

    //   close.addEventListener('click', () => overlay.setMap(null));

    //   return overlay;
    // });
  };

  const setHydrogenOverlayMap = (el: MapMarkerInfo, marker: any) => {
    const wrap = document.createElement('div');
    wrap.className = 'wrap';
    const info = document.createElement('div');
    info.className = 'info';
    const top = document.createElement('div');
    top.className = 'top';
    const title = document.createElement('div');
    title.className = 'title';
    title.innerText = el.title;
    const link = document.createElement('a');
    link.setAttribute('href', `https://map.kakao.com/link/to/${el.address},${el.lat},${el.lng}`);
    link.setAttribute('target', '_blank');
    link.appendChild(title);
    const close = document.createElement('div');
    close.className = 'close';
    close.title = '닫기';
    const desc = document.createElement('div');
    desc.className = 'desc';
    const address = document.createElement('div');
    address.className = 'desc-inner';
    address.innerText = `주소 : ${el.address}`;
    const tell = document.createElement('div');
    tell.className = 'desc-inner';
    tell.innerText = `전화 : ${el.tell}`;
    const price = document.createElement('div');
    price.className = 'desc-inner';
    price.innerText = `요금 : ${el.price}`;
    const time = document.createElement('div');
    time.className = 'desc-inner';
    time.innerText = `영업시간 : ${el.time}`;

    wrap.append(info);
    info.append(top, desc);
    top.append(link, close);
    desc.append(address, tell, price, time);

    const overlay = new kakao.maps.CustomOverlay({
      //이부분에 윈도우 정보 html로 작성
      content: wrap,
      position: marker.getPosition(),
      map: map,
    });

    close.addEventListener('click', () => overlay.setMap(null));
    ___HYDROGEN_OVERLAYS_CLOSINGS___.push(() => overlay.setMap(null));
    // setHydrogenOverlay((): any => {
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

    //   return overlay;
    // });
  };

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
