import React, { useState, useEffect } from 'react';
import MediaQuery from 'react-responsive';
import axios from 'axios';
import { Layout, Menu } from 'antd';
import { Space, Input, List } from 'antd';
import { Row, Col, Divider } from 'antd';
import { Card } from 'antd';
import { Pagination } from 'antd';
import { Link } from 'react-router-dom';

const { Header, Content, Footer } = Layout;
const { Meta } = Card;
const { Search } = Input;

const CarInfo = () => {
  const cols = [];
  // 행열 가이드      3 3 3
  // row : 2 (행)  2 ㅁㅁㅁ
  // col : 3 (열)  2 ㅁㅁㅁ
  const [carList, setCarList] = useState([]);
  const [search, setSearch] = useState<any>('');

  const getDate = async () => {
    const { data } = await axios.get(`https://vi-eco.jseung.me/api/car/information/search?carName=${search}`);
    setCarList(data);
  };

  const onSearch = (value: any): void => {
    console.log(value);
    setSearch(value);
  };

  useEffect(() => {
    getDate();
  }, [search]);

  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            차량 모델
            <Link to="/carinfo"></Link>
          </Menu.Item>
          <Menu.Item key="2">
            차량 정보
            <Link to="/info"></Link>
          </Menu.Item>
          <Menu.Item key="3">
            뉴스
            <Link to="/newinfo"></Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Divider orientation="left">전기차</Divider>
        <Search
          style={{ paddingBottom: '20px' }}
          placeholder="input search text"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={onSearch}
        />
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
