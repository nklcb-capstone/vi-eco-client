import React, { useState, useEffect } from 'react';
import { Layout, Menu, Space, Input, List, Divider } from 'antd';
import { Link } from 'react-router-dom';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Search } = Input;

const { Header, Content, Footer } = Layout;
const listData: any[] | undefined = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    href: 'https://zdnet.co.kr/view/?no=20210407153711',
    title: `[조재환의 카테크] "보조금 못 받으면 어쩌지?" 불안한 전기차 예비 오너`,
    publisher: 'ZDNet Korea',
    author: '조재환',
    section: 'culture',
    date: '2021-04-07',
    description: 'ZDNet Korea 조재환',
  });
}

interface IProps {
  icon: any;
  text: any;
}

const IconText = ({ icon, text }: IProps) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const NewInfo = () => {
  const [newList, setNewList] = useState<any>([]);
  const [search, setSearch] = useState<any>('');
  const getDate = async () => {
    const { data } = await axios.get(`https://vi-eco.jseung.me/api/news/electric/search?title=${search}`);
    setNewList(data);
  };

  // const onSearch = (value: string) => void SetSearch(value);

  const onSearch = (value: any): void => {
    // console.log(e.target.value);
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
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['3']}>
          <Menu.Item key="1">
            차량 모델
            <Link to="carinfo"></Link>
          </Menu.Item>
          <Menu.Item key="2">
            차량 정보
            <Link to="info"></Link>
          </Menu.Item>
          <Menu.Item key="3">
            뉴스
            <Link to="newinfo"></Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Divider orientation="left">전기차 뉴스</Divider>

      <Search
        style={{ width: '50%', paddingLeft: '50px', paddingBottom: '20px' }}
        placeholder="input search text"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={onSearch}
      />

      <Content style={{ padding: '0 50px', textAlign: 'left' }}>
        <div className="news-layout-content" style={{ minHeight: '1080px', padding: '24px', background: '#fff' }}>
          <List
            itemLayout="vertical"
            size="large"
            //페이지 이동 바 부분
            pagination={{
              onChange: (page) => {
                // console.log(page);
              },
              pageSize: 5, //한 페이지에 몇 개를 보여줄 것인지
            }}
            dataSource={newList}
            renderItem={(item: any) => (
              <List.Item
                key={item.id}
                actions={[
                  <IconText icon={StarOutlined} text="0" key="list-vertical-star-o" />,
                  <IconText icon={LikeOutlined} text="0" key="list-vertical-like-o" />,
                  <IconText icon={MessageOutlined} text="0" key="list-vertical-message" />,
                ]}
              >
                <List.Item.Meta
                  title={
                    <a href={item.url} target="_blank">
                      {item.title}
                    </a>
                  }
                  description={item.publisher}
                />
                {item.date}
              </List.Item>
            )}
          />
        </div>
      </Content>
    </Layout>
  );
};

export default NewInfo;
