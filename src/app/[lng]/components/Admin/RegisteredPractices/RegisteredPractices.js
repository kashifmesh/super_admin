'use client';

import React, { useState, useEffect } from 'react';
import { Input, Button, Table, Select, Tag, Breadcrumb, Row, Col, Card, Layout } from 'antd';
import { SearchOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';
import { fetchData } from '../../../services/methods/api';
import './RegisteredPractices.css';
import dayjs from 'dayjs';

const { Search } = Input;
const { Option } = Select;

export default function RegisteredPractices({ lng }) {
  const [data, setData] = useState([]);
  const [metrics, setMetrics] = useState({});
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedState, setSelectedState] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const fetchPractices = async (page = 1, search = '', filterState = 'all', filterType = 'all', filterStatus = 'all') => {
    setLoading(true);
    try {
      let url = `/admin/practices?page=${page}&per_page=10`;
      if (search) url += `&search=${search}`;
      if (filterState !== 'all') url += `&state=${filterState}`;
      if (filterType !== 'all') url += `&practice_type=${filterType}`;
      if (filterStatus !== 'all') url += `&status=${filterStatus}`;

      const response = await fetchData(url);
      if (response?.status === 200) {
        const responseData = response.data.data;
        setData(responseData.practices || []);
        setMetrics(responseData.metrics || {});
        setPagination({
          current: responseData.pagination.current_page,
          pageSize: responseData.pagination.per_page || 10,
          total: responseData.pagination.total,
        });
      }
    } catch (error) {
      console.error('Failed to fetch practices:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPractices(1, searchText, selectedState, selectedType, selectedStatus);
  }, [searchText, selectedState, selectedType, selectedStatus]);

  const handleTableChange = (newPagination) => {
    fetchPractices(newPagination.current, searchText, selectedState, selectedType, selectedStatus);
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
      title: 'PRACTICE NAME & ID',
      key: 'name_id',
      render: (_, record) => (
        <div>
          <div className="practice-name">{record.practice_name}</div>
          <div className="practice-id">{record.practice_id}</div>
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
      title: 'PRACTICE TYPE',
      dataIndex: 'practice_type',
      key: 'practice_type',
      render: (text) => <span className="type-text">{text || '-'}</span>,
    },
    {
      title: 'LOCATION',
      key: 'location',
      render: (_, record) => (
        <span className="location-text">
          {record.location !== '-' ? `${record.location}, ${record.state}` : '-'}
        </span>
      ),
    },
    {
      title: 'STATE',
      key: 'state',
      render: (_, record) => (
        <span className="location-text">
          {record.state !== '-' ? `${record.state}` : '-'}
        </span>
      ),
    },
    {
      title: 'SPECIALTY',
      dataIndex: 'specialty',
      key: 'specialty',
      render: (text) => <span className="specialty-text">{text || 'N/A'}</span>,
    },
    {
      title: 'PROVIDERS',
      dataIndex: 'providers_count',
      key: 'providers_count',
      align: 'center',
      render: (text) => <span className="providers-text">{text}</span>,
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (status) => getStatusTag(status),
    },
    {
      title: 'REG. DATE',
      dataIndex: 'reg_date',
      key: 'reg_date',
      render: (date) => <span className="date-text">{date ? dayjs(date).format('MM-DD-YYYY') : '-'}</span>,
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
        <Breadcrumb.Item>Registered Practices</Breadcrumb.Item>
      </Breadcrumb>

      <div className="registered-practices-container">
        {/* Header Section */}
        <div className="page-header">
          <div className="header-titles">
            <h1>Registered Practices</h1>
            <p>Master coordinate list of fully approved practices</p>
          </div>
        </div>

        {/* Metrics Cards */}
        <Row gutter={[24, 24]} className="metrics-row">
          <Col xs={24} sm={12} lg={6}>
            <Card className="metric-card shadow-sm border-0 bg-white">
              <div className="metric-content">
                <div className="metric-header">
                  <span className="metric-title text-blue">TOTAL REGISTERED PRACTICES</span>
                </div>
                <div className="metric-value-row">
                  <span className="metric-value text-blue">{metrics.total_registered || 0}</span>
                </div>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card className="metric-card shadow-sm border-0 bg-white">
              <div className="metric-content">
                <div className="metric-header">
                  <span className="metric-title text-green">ACTIVE PRACTICES</span>
                </div>
                <div className="metric-value-row">
                  <span className="metric-value text-green">{metrics.active_practices || 0}</span>
                </div>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card className="metric-card shadow-sm border-0 bg-white">
              <div className="metric-content">
                <div className="metric-header">
                  <span className="metric-title text-yellow">AWAITING APPROVALS</span>
                </div>
                <div className="metric-value-row">
                  <span className="metric-value text-yellow">{metrics.awaiting_approvals || 0}</span>
                </div>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card className="metric-card shadow-sm border-0 bg-white">
              <div className="metric-content">
                <div className="metric-header">
                  <span className="metric-title text-red">SUSPENDED / REJECTED</span>
                </div>
                <div className="metric-value-row">
                  <span className="metric-value text-red">{metrics.suspended_rejected || 0}</span>
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
              placeholder="Search by Name, NPI, City or Practice ID..."
              allowClear
              onSearch={onSearch}
              className="search-input"
              prefix={<SearchOutlined />}
            />
            <div className="filters-actions">
              <Select defaultValue="all" value={selectedState} onChange={(val) => setSelectedState(val)} className="filter-select">
                <Option value="all">All States</Option>
                <Option value="TX">TX</Option>
                <Option value="CA">CA</Option>
                <Option value="FL">FL</Option>
              </Select>
              <Select defaultValue="all" value={selectedType} onChange={(val) => setSelectedType(val)} className="filter-select">
                <Option value="all">All Practice Types</Option>
                <Option value="Group">Group</Option>
                <Option value="Individual">Individual</Option>
              </Select>
              <Select defaultValue="all" value={selectedStatus} onChange={(val) => setSelectedStatus(val)} className="filter-select">
                <Option value="all">All Statuses</Option>
                <Option value="Active">Active</Option>
                <Option value="Pending">Pending</Option>
                <Option value="Inactive">Inactive</Option>
              </Select>
              <Button type="primary" icon={<PlusOutlined />} className="btn-add-practice">
                Add Practice
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
