'use client';

import React from 'react';
import {
  Card,
  Row,
  Col,
  Statistic,
  Breadcrumb,
} from 'antd';
import {
  TeamOutlined,
  DollarCircleOutlined,
  SafetyCertificateOutlined,
  DatabaseOutlined
} from '@ant-design/icons';
import { useTranslation } from '../../../i18n/client';
import './dashboard.css';

export default function DashboardPage({ params: { lng } }) {
  const { t } = useTranslation(lng, 'translation');

  return (
    <div className="admin-content">
      <Breadcrumb style={{ marginBottom: '1.5rem' }}>
        <Breadcrumb.Item>Super Admin</Breadcrumb.Item>
        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
      </Breadcrumb>

      {/* Statistics Cards */}
      <Row gutter={[24, 24]} className="metrics-row">
        <Col xs={24} sm={12} lg={6}>
          <Card className="metric-card shadow-sm border-0 text-white">
            <Statistic
              title={<span>Total Practices</span>}
              value={42}
              valueStyle={{ fontSize: '2rem', fontWeight: '700' }}
              prefix={<DatabaseOutlined style={{ marginRight: '8px' }} />}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card className="metric-card shadow-sm border-0 bg-white">
            <Statistic
              title="Active Providers"
              value={1284}
              valueStyle={{ color: '#0d257b', fontSize: '2rem', fontWeight: '700' }}
              prefix={<TeamOutlined style={{ color: '#0d257b', marginRight: '8px' }} />}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card className="metric-card shadow-sm border-0 bg-white">
            <Statistic
              title="Platform Revenue"
              value={84920}
              precision={2}
              valueStyle={{ color: '#2e7d32', fontSize: '2rem', fontWeight: '700' }}
              prefix={<DollarCircleOutlined style={{ color: '#2e7d32', marginRight: '8px' }} />}
              suffix=" USD"
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card className="metric-card shadow-sm border-0 bg-white">
            <Statistic
              title="System Health"
              value="99.98"
              valueStyle={{ color: '#0d257b', fontSize: '2rem', fontWeight: '700' }}
              prefix={<SafetyCertificateOutlined style={{ color: '#0d257b', marginRight: '8px' }} />}
              suffix="%"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
