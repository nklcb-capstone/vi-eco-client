import React, { useState, useEffect } from 'react';
import MediaQuery from 'react-responsive';
import axios from 'axios';
import { Layout, Menu } from 'antd';
import { Space, Input, List } from 'antd';
import { Row, Col, Divider } from 'antd';
import { Card } from 'antd';
import Nav from './Nav';
const { Header, Content, Footer } = Layout;
const { Meta } = Card;
const { Search } = Input;

type Props = {
  pageMode: boolean;
};

const CarInfo: React.FC<Props> = ({ pageMode }) => {
  const [carList, setCarList] = useState([]);
  const [search, setSearch] = useState<string>('');
  const [mode, setMode] = useState<string>('');
  const [name, setName] = useState<string>('');

  //https://vi-eco.jseung.me/api/car/information/search?carType=[전기차or수소차]&carName=[자동차이름]
  const getDate = async () => {
    const { data } = await axios.get(
      `https://vi-eco.jseung.me/api/car/information/search?carType=${mode}&carName=${search}`,
    );
    setCarList(data);
  };

  const onSearch = (value: any): void => {
    setSearch(value);
  };

  const changeMode = () => {
    if (pageMode) {
      setMode('전기차');
      setName('전기차 모델');
    } else {
      setMode('수소차');
      setName('수소차 모델');
    }
  };

  useEffect(() => {
    getDate();
  }, [name]);

  useEffect(() => {
    getDate();
  }, [search]);

  useEffect(() => {
    changeMode();
  }, [pageMode]);

  return (
    <Layout className="layout">
      <Nav></Nav>
      <Content style={{ padding: '0 50px' }}>
        <Divider orientation="left">{name}</Divider>
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
