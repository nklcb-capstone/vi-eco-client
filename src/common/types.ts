export interface MapMarkerInfo {
  id: number;
  title: string;
  time: string;
  price: string;
  address: string;
  tell: string;
  lat: number;
  lng: number;
}

/**
 * ```
 * addr: "경기도 안산시 상록구 충장로 432, 지상주차장 1층 35구역"
busiCall: "1661-9408"
busiId: "ME"
busiNm: "환경부"
chgerId: "01"
chgerType: "03"
delDetail: ""
delYn: "N"
lat: 37.317494
limitDetail: ""
limitYn: "N"
lng: 126.850333
note: ""
parkingFree: "N"
powerType: "급속(50kW)"
stat: 2
statId: "ME000124"
statNm: "홈플러스 안산점"
statUpdDt: 20210424000314
useTime: "10:00~24:00"
zcode: 41
 * ```
 */
export interface EV {
  addr: string;
  busiCall: string;
  busiId: string;
  busiNm: string;
  chgerId: string;
  chgerType: EVChgerType;
  delDetail: string;
  delYn: YN;
  lat: number;
  limitDetail: string;
  limitYn: YN;
  lng: number;
  note: string;
  parkingFree: YN;
  powerType: string;
  stat: EVStat;
  statId: string;
  statNm: string;
  statUpdDt: number;
  useTime: string;
  zcode: number;
}

export type EVChgerType = '01' | '02' | '03' | '04' | '05' | '06' | '07';

export type EVChgerTypeDesc =
  | 'DC차데모'
  | 'AC완속'
  | 'DC차데모+AC3상'
  | 'DC콤보'
  | 'DC차데모+DC콤보'
  | 'DC차데모+AC3상+DC콤보'
  | 'AC3상';

export type EVStat = 1 | 2 | 3 | 4 | 5 | 9;

export type EVStatDesc = '통신이상' | '충전대기' | '충전중' | '운영중지' | '점검중' | '상태미확인';

export type YN = 'Y' | 'N';

export type KakaoCategory =
  | 'MT1'
  | 'CS2'
  | 'PS3'
  | 'SC4'
  | 'AC5'
  | 'PK6'
  | 'OL7'
  | 'SW8'
  | 'BK9'
  | 'CT1'
  | 'AG2'
  | 'PO3'
  | 'AT4'
  | 'AD5'
  | 'FD6'
  | 'CE7'
  | 'HP8'
  | 'PM9';

export const kakaoCategoryTable: Record<KakaoCategory, string> = Object.freeze({
  MT1: '대형마트',
  CS2: '편의점',
  PS3: '어린이집, 유치원',
  SC4: '학교',
  AC5: '학원',
  PK6: '주차장',
  OL7: '주유소, 충전소',
  SW8: '지하철역',
  BK9: '은행',
  CT1: '문화시설',
  AG2: '중개업소',
  PO3: '공공기관',
  AT4: '관광명소',
  AD5: '숙박',
  FD6: '음식점',
  CE7: '카페',
  HP8: '병원',
  PM9: '약국'
});