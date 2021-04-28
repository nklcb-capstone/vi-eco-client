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

//
//
//
const ID_CUSTOM_OVERLAY_CLOSE = 'customOverlayClose';

interface MarkerWithOriginal<T> {
  marker: any;
  original: T;
}

interface Props {
  pageMode: boolean;
}

// let lat: number = 37.555178;
// let lon: number = 126.970756;

// function getLocation() {
//   if (navigator.geolocation) {
//     // GPS를 지원하면
//     navigator.geolocation.getCurrentPosition(
//       function (position) {
//         lat = position.coords.latitude;
//         lon = position.coords.longitude;
//       },
//       function (error) {
//         console.error(error);
//       },
//       {
//         enableHighAccuracy: true,
//         //maximumAge: 0,
//         //timeout: Infinity,
//       },
//     );
//   } else {
//     alert('GPS를 지원하지 않습니다');
//   }
// }

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

  const [evMarkers, setEvMarkers] = React.useState<MarkerWithOriginal<EV>[]>([]);
  const [hydrogenMarkers, setHydrogenMarkers] = React.useState<MarkerWithOriginal<MapMarkerInfo>[]>([]);
  const [evOverlay, setEvOverlay] = React.useState<any>(null);
  const [hydrogenOverlay, setHydrogenOverlay] = React.useState<any>(null);

  // const closeAllOverlays = useCallback(() => {
  //   // TODO: A/B testing..
  //   // if (evOverlay) evOverlay.setMap(null);
  //   // if (hydrogenOverlay) hydrogenOverlay.setMap(null);
  //   evOverlay?.setMap(null);
  //   hydrogenOverlay?.setMap(null);
  // }, [evOverlay, hydrogenOverlay]);

  useEffect(() => {
    evMarkers.forEach(({ marker, original }) => {
      kakao.maps.event.addListener(marker, 'click', () => {
        setEvOverlayMap(original, marker);
      });
    });
    hydrogenMarkers.forEach(({ marker, original }) => {
      kakao.maps.event.addListener(marker, 'click', () => {
        setHydrogenOverlayMap(original, marker);
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [evMarkers, hydrogenMarkers, map]);

  //
  // Hydrogen list
  //

  const setHydrogenMarkersMap = () => {
    //markerDate에 있는 마커 여러개 생성 및 표시
    const markersAndOriginals = markerdata.map((el: MapMarkerInfo): { marker: any; original: MapMarkerInfo } => {
      const marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(el.lat, el.lng),
        title: el.title,
        clickable: true,
      });

      marker.setMap(map);

      return { marker, original: el };
    });

    setHydrogenMarkers(markersAndOriginals.map(({ marker, original }) => ({ marker, original })));
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
    const res = await api({ url: '/car/electric/station', params: { numOfRows: 500, pageNo: 1 } });
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
      } else {
        // Hydrogen
        setHydrogenMarkersMap();
        unsetEvMarkersMap();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, pageMode]);

  const setEvMarkersMap = () => {
    const markersAndOriginals = evs.map((ev: EV): { marker: any; original: EV } => {
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

      return { marker, original: ev };
    });

    setEvMarkers(markersAndOriginals.map(({ marker, original }) => ({ marker, original })));
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
    setEvOverlay((): any => {
      console.log(ev);
      const overlay = new kakao.maps.CustomOverlay({
        //이부분에 윈도우 정보 html로 작성
        content: `<div class="wrap">
        <div class="info">
          <div class="top">
            <div class="title">
            <a href="https://map.kakao.com/link/to/${ev.statNm},${ev.lat},${ev.lng}">${ev.statNm}</a>
            <div class="close" title="닫기" id=${ID_CUSTOM_OVERLAY_CLOSE}></div>
          </div>  
          <div class="desc">
            <div>주소 : ${ev.addr}</div>  
            <div>전화 : ${ev.busiCall}</div> 
            <div>요금 : ${ev.powerType}</div>
            <div>영업 시간 : ${ev.useTime}</div>
          </div>
        </div>
      </div>`,
        position: marker.getPosition(),
        map: map,
      });

      return overlay;
    });
  };

  const setHydrogenOverlayMap = (el: MapMarkerInfo, marker: any) => {
    setHydrogenOverlay((): any => {
      const overlay = new kakao.maps.CustomOverlay({
        //이부분에 윈도우 정보 html로 작성
        content: `<div class="wrap">
        <div class="info">
          <div class="top">
            <div class="title">
              <a href="https://map.kakao.com/link/to/${el.address},${el.lat},${el.lng}">${el.title}</a>
            <div class="close" id=${ID_CUSTOM_OVERLAY_CLOSE} title="닫기"></div>
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

      return overlay;
    });
  };

  useEffect(() => {
    const overlayClose = document.getElementById(ID_CUSTOM_OVERLAY_CLOSE);
    if (overlayClose) {
      overlayClose.addEventListener('click', closeEvOverlay);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [evOverlay]);

  useEffect(() => {
    const overlayClose = document.getElementById(ID_CUSTOM_OVERLAY_CLOSE);
    if (overlayClose) {
      overlayClose.addEventListener('click', closeHydrogenOverlay);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrogenOverlay]);

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
