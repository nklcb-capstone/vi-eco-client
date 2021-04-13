/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useMemo, useState } from 'react';
import { markerdata } from './markerDate';
import './Map.scss';
import { Button, Input, Form } from 'antd';

import cssRules from './Map.module.scss';

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
//
//

const mapOptions = {
  //지도 기본 위치값 서울역 좌표로 지정
  center: new window.kakao.maps.LatLng(37.555178, 126.970756),
  level: 5,
};

//
//
//

const Map: React.FC = () => {
  const [infowindows, Setinfowindows]: any = useState([]);

  useEffect(() => {
    setTimeout(() => {
      mapscript();
    }, 20);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [markers, setMarkers] = React.useState<any[]>([]);

  const mapContainerRef = React.createRef<HTMLDivElement>();

  const infowindow = useMemo(() => {
    //// return new kakao.maps.InfoWindow({ zIndex: 1 });
    return new kakao.maps.InfoWindow({ content: '<div>서울역</div><div>안녕</div>', removable: true });
  }, []);

  const closeInfoWindow = () => {
    infowindows.forEach((el: any) => {
      //마커 닫기
      el.close();
    });
  };

  const [map, setMap] = useState<any>();

  const [ps, setPs] = useState<any>();

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

    setMap(() => {
      const map = new kakao.maps.Map(mapContainerRef.current, mapOptions);

      setPs(() => {
        return new kakao.maps.services.Places();
      });

      //markerDate에 있는 마커 여러개 생성 및 표시
      markerdata.forEach((el: any) => {
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

        //클릭이벤트 등록
        kakao.maps.event.addListener(test, 'click', function () {
          //해당 마커외에 닫는 메소드
          closeInfoWindow();
          //마커 정보띄우기
          infowindow.open(map, test);
        });
        test.setMap(map);
      });

      return map;
    });
  };

  // 검색 결과 목록과 마커를 표출하는 함수입니다
  const displayPlaces = (places: any) => {
    const listEl = document.getElementById('placesList');
    const fragment = document.createDocumentFragment();
    const bounds = new kakao.maps.LatLngBounds();
    const listStr = '';

    // 검색 결과 목록에 추가된 항목들을 제거합니다
    removeAllChildNodes(listEl);

    // 지도에 표시되고 있는 마커를 제거합니다
    removeMarker();

    for (let i = 0; i < places.length; i++) {
      // 마커를 생성하고 지도에 표시합니다
      const placePosition = new kakao.maps.LatLng(places[i].y, places[i].x);
      const marker = addMarker(placePosition, i);
      const itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

      // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
      // LatLngBounds 객체에 좌표를 추가합니다
      bounds.extend(placePosition);

      // 마커와 검색결과 항목에 mouseover 했을때
      // 해당 장소에 인포윈도우에 장소명을 표시합니다
      // mouseout 했을 때는 인포윈도우를 닫습니다
      (function (marker, title) {
        kakao.maps.event.addListener(marker, 'mouseover', function () {
          displayInfowindow(marker, title);
        });

        kakao.maps.event.addListener(marker, 'mouseout', function () {
          infowindow.close();
        });

        itemEl.onmouseover = function () {
          displayInfowindow(marker, title);
        };

        itemEl.onmouseout = function () {
          infowindow.close();
        };
      })(marker, places[i].place_name);

      fragment.appendChild(itemEl);
    }

    // 검색결과 항목들을 검색결과 목록 Elemnet에 추가합니다
    listEl!.appendChild(fragment);
    document.getElementById('menuWrap')!.scrollTop = 0;

    // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
    map.setBounds(bounds);
  };

  // 검색결과 항목을 Element로 반환하는 함수입니다
  function getListItem(index: number, places: any) {
    const el = document.createElement('li');
    let itemStr =
      '<span class="markerbg marker_' +
      (index + 1) +
      '"></span>' +
      '<div class="info">' +
      '   <h5>' +
      places.place_name +
      '</h5>';

    if (places.road_address_name) {
      itemStr +=
        '    <span>' +
        places.road_address_name +
        '</span>' +
        '   <span class="jibun gray">' +
        places.address_name +
        '</span>';
    } else {
      itemStr += '    <span>' + places.address_name + '</span>';
    }

    itemStr += '  <span class="tel">' + places.phone + '</span>' + '</div>';

    el.innerHTML = itemStr;
    el.className = 'item';

    return el;
  }

  // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
  function addMarker(position: any, idx: number, title = '') {
    const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png'; // 마커 이미지 url, 스프라이트 이미지를 씁니다
    const imageSize = new kakao.maps.Size(36, 37); // 마커 이미지의 크기
    const imgOptions = {
      spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
      spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
      offset: new kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
    };
    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions);
    const marker = new kakao.maps.Marker({
      position: position, // 마커의 위치
      image: markerImage,
    });

    marker.setMap(map); // 지도 위에 마커를 표출합니다
    markers.push(marker); // 배열에 생성된 마커를 추가합니다

    return marker;
  }

  // 지도 위에 표시되고 있는 마커를 모두 제거합니다
  function removeMarker() {
    for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
    setMarkers([]);
  }

  // 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
  function displayPagination(pagination: any) {
    const paginationEl = document.getElementById('pagination');
    const fragment = document.createDocumentFragment();
    let i;

    // 기존에 추가된 페이지번호를 삭제합니다
    while (paginationEl!.hasChildNodes()) {
      paginationEl!.removeChild(paginationEl!.lastChild!);
    }

    for (i = 1; i <= pagination.last; i++) {
      const el = document.createElement('a');
      el.href = '#';
      el.innerHTML = String(i);

      if (i === pagination.current) {
        el.className = 'on';
      } else {
        el.onclick = (function (i) {
          return function () {
            pagination.gotoPage(i);
          };
        })(i);
      }

      fragment.appendChild(el);
    }
    paginationEl!.appendChild(fragment);
  }

  // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
  const placesSearchCB = (data: any, status: any, pagination: any) => {
    if (status === kakao.maps.services.Status.OK) {
      // 정상적으로 검색이 완료됐으면
      // 검색 목록과 마커를 표출합니다
      displayPlaces(data);

      // 페이지 번호를 표출합니다
      displayPagination(pagination);
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
      alert('검색 결과가 존재하지 않습니다.');
      return;
    } else if (status === kakao.maps.services.Status.ERROR) {
      alert('검색 결과 중 오류가 발생했습니다.');
      return;
    }
  };

  // 키워드 검색을 요청하는 함수입니다
  const searchPlaces = () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const keyword = (document.getElementById('keyword') as any).value;

    if (!keyword.replace(/^\s+|\s+$/g, '')) {
      alert('키워드를 입력해주세요!');
      return false;
    }

    // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
    ps.keywordSearch(keyword, placesSearchCB);
  };

  // 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
  // 인포윈도우에 장소명을 표시합니다
  const displayInfowindow = (marker: any, title: any) => {
    const content = '<div style="padding:5px;z-index:1;">' + title + '</div>';

    infowindow.setContent(content);
    infowindow.open(map, marker);
  };

  const removeAllChildNodes = (el: any) => {
    while (el.hasChildNodes()) {
      el.removeChild(el.lastChild);
    }
  };

  return (
    <div className={cssRules.Map}>
      <div id="map" ref={mapContainerRef} style={{ width: '100vw', height: 'calc(100vh - 53px)' }} />
      <div className={`${cssRules.menu_wrap} ${cssRules.bg_white}`} id="menuWrap">
        <div className="option">
          <div>
            <Form onFinish={searchPlaces} layout="inline">
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
