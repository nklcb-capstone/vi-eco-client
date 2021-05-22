import React from 'react';
import { List, Divider, Avatar } from 'antd';
import { Layout, Card } from 'antd';
import Nav from './Nav';
import FooterLayout from './FooterLayout';
import { createFromIconfontCN, YoutubeFilled, InfoCircleTwoTone } from '@ant-design/icons';
import { Table, Tag, Space } from 'antd';
const { Column, ColumnGroup } = Table;

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
});

const { Footer, Content } = Layout;
const { Meta } = Card;
const Info = () => {
  const sns = [
    {
      id: 1,
      title: '페이스북 SNS 페이지 - 전기차',
      link: 'https://ko-kr.facebook.com/groups/398426850509358/',
    },
    {
      id: 2,
      title: '네이버 카페 - 전기차 ',
      link: 'http://cafe.naver.com/allfm01',
    },
    {
      id: 3,
      title: '보배드림 - 자동차 커뮤니티 ',
      link: 'https://www.bobaedream.co.kr/',
    },
    {
      id: 4,
      title: '뽐뿌 - 자동차 커뮤니티 ',
      link: 'http://www.ppomppu.co.kr/zboard/zboard.php?id=car',
    },
  ];

  const info = [
    {
      id: 1,
      title: '저공해차 통합누리집 - 국가기관',
      link: 'https://www.ev.or.kr/portal',
    },
    {
      id: 2,
      title: 'EVPOST - 실사용기',
      link: 'https://www.evpost.co.kr/wp/',
    },
  ];

  const youtuber = [
    {
      id: 1,
      title: '모트라인 - 자동차 리뷰',
      link: 'https://www.youtube.com/user/motline2013',
    },
    {
      id: 2,
      title: '안오준tv - 자동차 리뷰',
      link: 'https://www.youtube.com/channel/UCX62PLc24ML_-tQ3fVPa2tQ',
    },
    {
      id: 3,
      title: '우파푸른하늘Woopa TV - 자동차 리뷰',
      link: 'https://www.youtube.com/channel/UCFUpTxU3nlGed-suY-FjjxA',
    },
    {
      id: 4,
      title: '한상기tv - 자동차 리뷰',
      link: 'https://www.youtube.com/channel/UC-IBt8pM8hWx8wiwjcDLdIQ',
    },
    {
      id: 5,
      title: 'Drivetribe - 해외 유튜버',
      link: 'https://www.youtube.com/channel/UChiwLDIBJrV5SxqdixMHmQA',
    },
    {
      id: 6,
      title: 'doug demuro - 해외 유튜버',
      link: 'https://www.youtube.com/channel/UCsqjHFMB_JYTaEnf_vmTNqg',
    },
    {
      id: 7,
      title: 'carwow - 해외 유튜버',
      link: 'https://www.youtube.com/channel/UCzm5GOElgUN-oLutNduDObA',
    },
  ];

  const repairShop = [
    {
      id: 1,
      sort: '승용',
      manufacturer: '기아',
      as: '제주서비스센터 직영점',
      address: '제주특별자치도 제주시 선반로6길 12',
      call: '064-724-8585',
    },
    {
      id: 2,
      sort: '승용',
      manufacturer: '르노삼성',
      as: '제주정비사업소 직영점',
      address: '제주특별자치도 제주시 연삼로 75',
      call: '064-713-1100',
    },
    {
      id: 3,
      sort: '승용',
      manufacturer: '르노삼성',
      as: '서비스코너 도남점',
      address: '제주특별자치도 제주시 원남2길 7',
      call: '064-805-6611',
    },
    {
      id: 4,
      sort: '승용',
      manufacturer: '르노삼성',
      as: '지정정비코너 노형점',
      address: '제주특별자치도 제주시 노형로 302',
      call: '064-744-5172',
    },
    {
      id: 5,
      sort: '승용',
      manufacturer: '르노삼성',
      as: '지정정비코너 토평점',
      address: '제주특별자치도 서귀포시 516로 133',
      call: '064-732-3334',
    },
    {
      id: 6,
      sort: '승용',
      manufacturer: '현대',
      as: '제주서비스센터 직영',
      address: '제주특별자치도 제주시 조천읍 일주동로 1323',
      call: '064-784-4111',
    },
    {
      id: 7,
      sort: '승용',
      manufacturer: 'BMW',
      as: '도이치모터스 제주전시장',
      address: '제주특별자치도 제주시 연삼로120',
      call: '064-757-7301',
    },
    {
      id: 8,
      sort: '승용',
      manufacturer: 'GM',
      as: '제주서비스센터 직영점',
      address: '제주특별자치도 제주시 선반남2길 63',
      call: '064-756-9400',
    },
    {
      id: 9,
      sort: '승용',
      manufacturer: '닛싼',
      as: '플러스오토 공식인증센터',
      address: '제주특별자치도 제주시 선반남2길 63',
      call: '064-725-4972',
    },
    {
      id: 10,
      sort: '초소형',
      manufacturer: '대창모터스',
      as: '카라이프 중앙점',
      address: '제주특별자치도 제주시 구남동6길 10',
      call: '064-756-9106',
    },
    {
      id: 11,
      sort: '초소형',
      manufacturer: '대창모터스',
      as: '에보샵',
      address: '제주특별자치도 제주시 도리로 88',
      call: '064-747-5073',
    },
    {
      id: 12,
      sort: '초소형',
      manufacturer: '대창모터스',
      as: '아이나비 서귀포점',
      address: '제주특별자치도 서귀포시 토평서로11번길 152',
      call: '1544-9106',
    },
    {
      id: 13,
      sort: '초소형',
      manufacturer: '쎄미시스코',
      as: 'EV스마트센터',
      address: '제주특별자치도 제주시 연북로 746',
      call: '064-805-3425',
    },
    {
      id: 14,
      sort: '초소형',
      manufacturer: '파워프라자',
      as: '파워프라자 직영점',
      address: '제주특별자치도 제주시 첨단로 213-3',
      call: '064-757-4955',
    },
  ];

  return (
    <>
      <Nav></Nav>
      <Layout style={{ backgroundColor: 'white' }}>
        <Content style={{ width: '60%', margin: '10px auto' }}>
          <Divider orientation="center">전기차 충전정보</Divider>

          <a href="https://www.ev.or.kr/portal/chargerkind" target="_blank" rel="noreferrer">
            <Card
              hoverable
              style={{ width: '100%', height: '50%' }}
              cover={<img alt="example" src="https://ifh.cc/g/QfhWii.png" />}
            >
              <Meta
                title="충전속도, 설치유형, 차종 별 분류 및 충전방식"
                description="https://www.ev.or.kr/portal/chargerkind"
              />
            </Card>
          </a>
        </Content>

        <Content style={{ width: '60%', margin: '10px auto' }}>
          <Divider orientation="center">전기차 차종별 충전방식</Divider>
          <a href="https://www.ev.or.kr/portal/chargerkind" target="_blank" rel="noreferrer">
            <Card hoverable cover={<img alt="example" src=" https://ifh.cc/g/RZXE7Y.png" />}>
              <Meta description="https://www.ev.or.kr/portal/chargerkind" />
            </Card>
          </a>
        </Content>

        <Content style={{ width: '60%', margin: '10px auto' }}>
          <Divider orientation="center">내연기관차 유류비와 전기차 충전요금 비교</Divider>
          <a href="https://www.ev.or.kr/portal/chargerkind" target="_blank" rel="noreferrer">
            <Card hoverable cover={<img alt="example" src="  https://ifh.cc/g/5sqkuf.png" />}>
              <Meta description="https://www.ev.or.kr/portal/chargerkind" />
            </Card>
          </a>
        </Content>

        <Content style={{ width: '60%', margin: '10px auto' }}>
          <Divider orientation="center">SNS 커뮤니티</Divider>
          <List
            size="large"
            // header={<div>Header</div>}
            // footer={<div>Footer</div>}
            bordered
            dataSource={sns}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  style={{ textAlign: 'left' }}
                  avatar={<IconFont type="icon-facebook" />}
                  title={<a href={item.link}>{item.title}</a>}
                />
              </List.Item>
            )}
          />
        </Content>

        <Content style={{ width: '60%', margin: '10px auto' }}>
          <Divider orientation="center">전기차 관련 정보</Divider>
          <List
            size="large"
            bordered
            dataSource={info}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  style={{ textAlign: 'left' }}
                  avatar={<InfoCircleTwoTone />}
                  title={<a href={item.link}>{item.title}</a>}
                />
              </List.Item>
            )}
          />
        </Content>
        <Content style={{ width: '60%', margin: '10px auto' }}>
          <Divider orientation="center">자동차 리뷰 유튜버</Divider>
          <List
            size="large"
            // header={<div>Header</div>}
            // footer={<div>Footer</div>}
            bordered
            dataSource={youtuber}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  style={{ textAlign: 'left' }}
                  avatar={<YoutubeFilled />}
                  title={<a href={item.link}>{item.title}</a>}
                />
              </List.Item>
            )}
          />
        </Content>

        <Content style={{ width: '60%', margin: '10px auto' }}>
          <Divider orientation="center">제주도 전기차 A/S 등록센터</Divider>
          <Table dataSource={repairShop} pagination={false}>
            <Column title="구분" dataIndex="sort" />
            <Column title="제조판매사" dataIndex="manufacturer" />
            <Column title="업체명" dataIndex="as" />
            <Column title="주소" dataIndex="address" />
            <Column title="전화번호" dataIndex="call" />
          </Table>
        </Content>
        <FooterLayout></FooterLayout>
      </Layout>
    </>
  );
};

export default Info;
