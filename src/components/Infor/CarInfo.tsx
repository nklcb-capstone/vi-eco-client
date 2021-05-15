import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Layout, Input, List, Divider, Card } from 'antd';
import Nav from './Nav';
const { Content, Footer } = Layout;
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
    changeMode();
  }, [pageMode]);

  useEffect(() => {
    getDate();
  }, [mode, name, search]);

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

        <List
          style={{ paddingBottom: '50px' }}
          itemLayout="vertical"
          // size="large"
          //페이지 이동 바 부분
          pagination={{
            onChange: (page) => {
              // console.log(page);
            },
            pageSize: 16, //한 페이지에 몇 개를 보여줄 것인지
          }}
          grid={{ gutter: 24, sm: 1, md: 2, lg: 3, xl: 4 }}
          dataSource={carList}
          renderItem={(el: any) => (
            <List.Item>
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
            </List.Item>
          )}
        />
      </Content>
      <Footer></Footer>
    </Layout>
  );
};

export default CarInfo;
