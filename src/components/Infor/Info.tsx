import React, { useState, useEffect } from 'react';
import { List, Typography, Divider, Avatar } from 'antd';
import { Layout, Card } from 'antd';
import Nav from './Nav';
import { createFromIconfontCN, YoutubeFilled, InfoCircleTwoTone } from '@ant-design/icons';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
});

const { Header, Footer, Sider, Content } = Layout;
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

  return (
    <>
      <Nav></Nav>
      <Layout style={{ backgroundColor: 'white' }}>
        <Content style={{ width: '60%', margin: '10px auto' }}>
          <Divider orientation="center">전기차 충전정보</Divider>

          <a href="https://www.ev.or.kr/portal/chargerkind" target="_blank" rel="noreferrer">
            <Card hoverable cover={<img alt="example" src="https://ifh.cc/g/QfhWii.png" />}>
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
            // header={<div>Header</div>}
            // footer={<div>Footer</div>}
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
        <div></div>
        <Footer>Footer</Footer>
      </Layout>
    </>
  );
};

export default Info;
