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
