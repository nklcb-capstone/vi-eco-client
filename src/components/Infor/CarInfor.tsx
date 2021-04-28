import React, { useState, useEffect } from 'react';
import MediaQuery from 'react-responsive';
import axios from 'axios';
import { Layout, Menu } from 'antd';
import { Row, Col, Divider } from 'antd';
import { Card } from 'antd';
import { Pagination } from 'antd';
import { Link } from 'react-router-dom';

const { Header, Content, Footer } = Layout;
const { Meta } = Card;

const CarInfo = () => {
  const cols = [];
  // 행열 가이드      3 3 3
  // row : 2 (행)  2 ㅁㅁㅁ
  // col : 3 (열)  2 ㅁㅁㅁ
  const [carList, setCarList] = useState([]);

  const getDate = async () => {
    const { data } = await axios.get('https://vi-eco.jseung.me/api/car/information/search');
    setCarList(data);
    console.log(carList[1]);
  };

  useEffect(() => {
    getDate();
  }, []);

  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">차량 모델</Menu.Item>
          <Menu.Item key="2">차량 정보</Menu.Item>
          <Menu.Item key="3">뉴스</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Divider orientation="left">전기차</Divider>

        <Row gutter={[24, 24]}>
          {carList.map((el: any) => (
            <Col key={el.id} className="gutter-row" xs={24} md={12} lg={6}>
              <Card
                hoverable
                style={{ paddingTop: 20, width: 300, height: 200 }}
                cover={
                  <a href={el.link} target="_blank" rel="noreferrer">
                    <img src={el.pictureName} />
                  </a>
                }
              >
                <Meta title={el.carName} description={el.fuelEfficiency} />
              </Card>
            </Col>
          ))}
        </Row>
      </Content>
      <Footer>{/* <Pagination total={50} style={{ marginBottom: 40 }} /> */}</Footer>
    </Layout>
  );
};

export default CarInfo;
