'use client';

import React, { useState, useEffect } from 'react';
import { Input, Button, Table, Select, Tag, Breadcrumb, Row, Col, Card } from 'antd';
import { SearchOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';
import { fetchData } from '../../../services/methods/api';
import './PracticeProviders.css';
import dayjs from 'dayjs';

const { Search } = Input;
const { Option } = Select;

export default function PracticeProviders({ lng }) {
  const [data, setData] = useState([]);
  const [metrics, setMetrics] = useState({});
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const fetchProviders = async (page = 1, search = '', filterStatus = 'all') => {
    setLoading(true);
    try {
      let url = `/admin/providers?page=${page}&per_page=10`;
      if (search) url += `&search=${search}`;
      if (filterStatus !== 'all') url += `&status=${filterStatus}`;

      const response = await fetchData(url);
      console.log('Response:', response);
      if (response?.status === 200) {
        const responseData = response.data.data;
        setData(responseData?.providers || []);
        setMetrics(responseData?.metrics || {});
        // Fallback for pagination if not provided explicitly in the API response format given
        if (responseData?.pagination) {
          setPagination({
            current: responseData.pagination.current_page,
            pageSize: responseData.pagination.per_page || 10,
            total: responseData.pagination.total,
          });
        } else {
          setPagination({
            current: 1,
            pageSize: 10,
            total: responseData.providers?.length || 0,
          });
        }
      }
    } catch (error) {
      console.error('Failed to fetch providers:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProviders(1, searchText, selectedStatus);
  }, [searchText, selectedStatus]);

  const handleTableChange = (newPagination) => {
    fetchProviders(newPagination.current, searchText, selectedStatus);
  };

  const onSearch = (value) => {
    setSearchText(value);
  };

  const getStatusTag = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return <Tag color="success" className="status-tag active">Active</Tag>;
      case 'pending':
        return <Tag color="warning" className="status-tag pending">Pending</Tag>;
      case 'inactive':
        return <Tag color="error" className="status-tag suspended">Inactive</Tag>;
      default:
        return <Tag color="default" className="status-tag">{status}</Tag>;
    }
  };

  const columns = [
    {
      title: 'PROVIDER NAME & ID',
      key: 'name_id',
      render: (_, record) => (
        <div>
          <div className="practice-name">{record.provider_name}</div>
          <div className="practice-id">{record.provider_id}</div>
        </div>
      ),
    },
    {
      title: 'NPI NUMBER',
      dataIndex: 'npi',
      key: 'npi',
      render: (text) => <span className="npi-text">{text || 'N/A'}</span>,
    },
    {
      title: 'CREDENTIAL',
      dataIndex: 'credential',
      key: 'credential',
      render: (text) => <span className="type-text">{text || '-'}</span>,
    },
    {
      title: 'SPECIALTY',
      dataIndex: 'specialty',
      key: 'specialty',
      render: (text) => <span className="specialty-text">{text || 'N/A'}</span>,
    },
    {
      title: 'PRACTICE',
      dataIndex: 'practice_attachment',
      key: 'practice_attachment',
      render: (text) => <span className="location-text">{text || '-'}</span>,
    },
    {
      title: 'LICENSE INFO',
      dataIndex: 'license_info',
      key: 'license_info',
      render: (text) => <span className="location-text">{text || '-'}</span>,
    },
    {
      title: 'EXPIRY DATE',
      dataIndex: 'license_expiry',
      key: 'license_expiry',
      render: (date) => <span className="date-text">{date ? dayjs(date).format('MM-DD-YYYY') : '-'}</span>,
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (status) => getStatusTag(status),
    },
    {
      title: 'ACTIONS',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <Button type="text" className="action-profile-btn" icon={<EyeOutlined />}>
          Profile
        </Button>
      ),
    },
  ];

  return (
    <div className="admin-content">
      <Breadcrumb style={{ marginBottom: '1.5rem' }}>
        <Breadcrumb.Item>Practice Management</Breadcrumb.Item>
        <Breadcrumb.Item>Practice Providers</Breadcrumb.Item>
      </Breadcrumb>

      <div className="practice-providers-container">
        {/* Header Section */}
        <div className="page-header">
          <div className="header-titles">
            <h1>Practice Providers</h1>
            <p>Master directory of all registered healthcare providers</p>
          </div>
        </div>

        {/* Metrics Cards */}
        <Row gutter={[24, 24]} className="metrics-row">
          <Col xs={24} sm={12} lg={6}>
            <Card className="metric-card shadow-sm border-0 bg-white">
              <div className="metric-content">
                <div className="metric-header">
                  <span className="metric-title text-blue">TOTAL PROVIDERS</span>
                </div>
                <div className="metric-value-row">
                  <span className="metric-value text-blue">{metrics.total_providers || 0}</span>
                </div>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card className="metric-card shadow-sm border-0 bg-white">
              <div className="metric-content">
                <div className="metric-header">
                  <span className="metric-title text-green">ACTIVE CREDENTIALS</span>
                </div>
                <div className="metric-value-row">
                  <span className="metric-value text-green">{metrics.active_credentials || 0}</span>
                </div>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card className="metric-card shadow-sm border-0 bg-white">
              <div className="metric-content">
                <div className="metric-header">
                  <span className="metric-title text-yellow">PENDING CREDENTIALING</span>
                </div>
                <div className="metric-value-row">
                  <span className="metric-value text-yellow">{metrics.pending_credentialing || 0}</span>
                </div>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card className="metric-card shadow-sm border-0 bg-white">
              <div className="metric-content">
                <div className="metric-header">
                  <span className="metric-title text-red">EXPIRING LICENSURES</span>
                </div>
                <div className="metric-value-row">
                  <span className="metric-value text-red">{metrics.expiring_licensures || 0}</span>
                </div>
              </div>
            </Card>
          </Col>
        </Row>

        {/* Main Content Area (Table & Filters) */}
        <div className="table-wrapper">
          {/* Toolbar */}
          <div className="toolbar">
            <Search
              placeholder="Search by Name, NPI, or Practice..."
              allowClear
              onSearch={onSearch}
              className="search-input"
              prefix={<SearchOutlined />}
            />
            <div className="filters-actions">
              <Select defaultValue="all" value={selectedStatus} onChange={(val) => setSelectedStatus(val)} className="filter-select">
                <Option value="all">All Statuses</Option>
                <Option value="active">Active</Option>
                <Option value="pending">Pending</Option>
                <Option value="inactive">Inactive</Option>
              </Select>
              <Button type="primary" icon={<PlusOutlined />} className="btn-add-practice">
                Add Provider
              </Button>
            </div>
          </div>

          {/* Data Table */}
          <div className="data-table-container">
            <Table
              columns={columns}
              dataSource={data}
              rowKey="id"
              loading={loading}
              pagination={{
                ...pagination,
                showSizeChanger: false,
                className: "custom-pagination"
              }}
              onChange={handleTableChange}
              className="custom-light-table"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
