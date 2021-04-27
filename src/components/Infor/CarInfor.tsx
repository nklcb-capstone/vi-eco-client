import React from 'react';
import MediaQuery from 'react-responsive';
import { Layout, Menu } from 'antd';
import { Row, Col, Divider } from 'antd';
import { Card } from 'antd';
import { Pagination } from 'antd';

const { Header, Content, Footer } = Layout;
const { Meta } = Card;

function CarInfo() {
  const cols = [];
  // 행열 가이드      3 3 3
  // row : 2 (행)  2 ㅁㅁㅁ
  // col : 3 (열)  2 ㅁㅁㅁ
  for (let row = 0; row < 2; row++) {
    for (let col = 0; col < 3; col++) {
      cols.push(
        <Col key={col.toString()} span={24 / 3}>
          <Card
            hoverable
            style={{ width: 400, height: 380 }}
            cover={
              <img
                alt="example"
                src="https://imgauto-phinf.pstatic.net/20210223_189/auto_1614065502912dSObk_PNG/20210223163129_ipfD3sWg.png?type=f567_410"
              />
            }
          >
            <Meta title="2021 아이오닉 5" description="출시가 4,980~5,755 만원" />
          </Card>
        </Col>,
      );
    }
  }

  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Divider orientation="left">전기차</Divider>
        <MediaQuery maxWidth={1920}>
          <Row gutter={[16, 24]}>
            {cols}
          </Row>
        </MediaQuery>
      </Content>
      <Footer>
        <Pagination defaultCurrent={6} total={500} />
      </Footer>
    </Layout>
  );
}

export default CarInfo;
