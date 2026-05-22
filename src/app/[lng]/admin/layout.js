'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { Layout, Space, Avatar, Badge } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Sidebar from '../components/Sidebar/Sidebar';
import './dashboard/dashboard.css';
const { Header, Content, Sider } = Layout;

export default function AdminLayout({ children, params: { lng } }) {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const token = Cookies.get('token');
    if (!token) {
      router.replace(`/${lng}/signin`);
    }
  }, [lng, router]);

  if (!mounted) {
    return null;
  }

  return (
    <Layout style={{ minHeight: '100vh' }} className="admin-layout">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        className="admin-sider"
        width={280}
        trigger={null}
      >
        <Sidebar lng={lng} collapsed={collapsed} setCollapsed={setCollapsed} />
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: collapsed ? 80 : 280 }}>
        <Header className="admin-header">
          <div className="header-left">
            <h2>Super Admin</h2>
          </div>
          <div className="header-right">
            <Space size="large">
              <Badge>
                <Avatar icon={<UserOutlined />} className="user-avatar" />
              </Badge>
            </Space>
          </div>
        </Header>
        <Content className="admin-content-wrapper">
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
