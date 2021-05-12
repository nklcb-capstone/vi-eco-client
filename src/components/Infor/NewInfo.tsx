import React, { useState, useEffect } from 'react';
import { Layout, Space, Input, List, Divider } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import axios from 'axios';
import Nav from './Nav';

const { Search } = Input;
const { Content } = Layout;

interface IProps {
  icon: any;
  text: any;
}

type Props = {
  pageMode: boolean;
};

const IconText = ({ icon, text }: IProps) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const NewInfo: React.FC<Props> = ({ pageMode }) => {
  const [newList, setNewList] = useState<any>([]);
  const [search, setSearch] = useState<string>('');
  const [mode, setMode] = useState<string>('');
  const [name, setName] = useState<string>('');

  const getDate = async () => {
    const { data } = await axios.get(`https://vi-eco.jseung.me/api/news/${mode}/search?title=${search}`);
    setNewList(data);
  };

  const changeMode = () => {
    if (pageMode) {
      setMode('electric');
      setName('전기차 뉴스');
    } else {
      setMode('hydrogen');
      setName('수소차 뉴스');
    }
  };

  const onSearch = (value: any): void => {
    setSearch(value);
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
      <Content style={{ padding: '0 50px', textAlign: 'left' }}>
        <Divider orientation="left">{name}</Divider>

        <Search
          style={{ paddingBottom: '20px' }}
          placeholder="input search text"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={onSearch}
        />
        <div className="news-layout-content" style={{ minHeight: '1080px', padding: '24px', background: '#fff' }}>
          <List
            style={{ paddingBottom: '50px' }}
            itemLayout="vertical"
            // size="large"
            //페이지 이동 바 부분
            pagination={{
              pageSize: 6, //한 페이지에 몇 개를 보여줄 것인지
              showSizeChanger: false,
            }}
            dataSource={newList}
            renderItem={(item: any) => (
              <List.Item
                key={item.title}
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
