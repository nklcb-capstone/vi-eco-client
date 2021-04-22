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

export interface EV {
  addr: string;
  busiCall: string;
  busiId: string;
  busiNm: string;
  chgerId: string;
  chgerType: string;
  delDetail: string;
  delYn: YN;
  lat: number;
  limitDetail: string;
  limitYn: YN;
  lng: number;
  note: string;
  parkingFree: YN;
  powerType: string;
  stat: number;
  statId: string;
  statNm: string;
  statUpdDt: number;
  useTime: string;
  zcode: number;
}

export type YN = 'Y' | 'N';
