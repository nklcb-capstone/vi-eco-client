/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

//
// 이 파일에 있는 오브젝트는 redux를 대체하는 global store로서 활용합니다.
//

interface IKakaoMapStore {
  center: any;
  level: number;
}
export const kakaoMapStore: IKakaoMapStore = {
  center: new window.kakao.maps.LatLng(37.555178, 126.970756),
  level: 5,
};
