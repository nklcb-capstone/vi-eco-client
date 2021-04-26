import React from 'react';
import { Layout, Menu } from 'antd';
import { Row, Col, Divider } from 'antd';
import { Card } from 'antd';
import { Pagination } from 'antd';
import './viecoInfo.scss';

const { Header, Content, Footer } = Layout;
const { Meta } = Card;

function viecoInfo() {
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
        <Row gutter={[16, 24]}>
          <Col className="gutter-row" span={8}>
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
          </Col>
          <Col className="gutter-row" span={8}>
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
          </Col>
          <Col className="gutter-row" span={8}>
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
          </Col>
          <Col className="gutter-row" span={8}>
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
          </Col>
          <Col className="gutter-row" span={8}>
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
          </Col>
          <Col className="gutter-row" span={8}>
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
          </Col>
        </Row>
      </Content>
      <Footer>
        <Pagination defaultCurrent={6} total={500} />
      </Footer>
    </Layout>
  );
}

export default viecoInfo;
