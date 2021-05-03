import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { List, Divider, Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';

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
    description: 'ZDNet Korea 조재환'
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
      <Divider orientation="left">전기차</Divider>
      <Content style={{ padding: '0 50px', textAlign: 'left' }}>
        <div className="news-layout-content" style={{ minHeight: '1080px', padding: '24px', background: '#fff' }}>
          <List
            itemLayout="vertical"
            size="large"
            //페이지 이동 바 부분
            pagination={{
              onChange: (page) => {
                console.log(page);
              },
              pageSize: 5, //한 페이지에 몇 개를 보여줄 것인지
            }}
            dataSource={listData}
            renderItem={(item) => (
              <List.Item
                key={item.title}
                actions={[
                  <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                  <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                  <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                ]}
              >
                <List.Item.Meta title={<a href={item.href}>{item.title}</a>} description={item.description} />
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
