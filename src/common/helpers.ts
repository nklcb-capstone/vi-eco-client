import { EVChgerType, EVChgerTypeDesc, EVStat, EVStatDesc } from './types';

export function evChgerTypeConvert(chgerType: EVChgerType): EVChgerTypeDesc {
  switch (chgerType) {
    case '01':
      return 'DC차데모';
    case '02':
      return 'AC완속';
    case '03':
      return 'DC차데모+AC3상';
    case '04':
      return 'DC콤보';
    case '05':
      return 'DC차데모+DC콤보';
    case '06':
      return 'DC차데모+AC3상+DC콤보';
    case '07':
      return 'AC3상';
    default:
      return 'DC차데모';
  }
}

export function evStatConvert(stat: EVStat): EVStatDesc {
  switch (stat) {
    case 1:
      return '통신이상';
    case 2:
      return '충전대기';
    case 3:
      return '충전중';
    case 4:
      return '운영중지';
    case 5:
      return '점검중';
    case 9:
      return '상태미확인';
    default:
      return '상태미확인';
  }
}
