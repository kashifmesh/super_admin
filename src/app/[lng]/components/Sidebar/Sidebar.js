'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Cookies from 'js-cookie';
import {
  Modal,
  Button,
  message,
  Tooltip
} from 'antd';
import {
  TeamOutlined,
  SettingOutlined,
  LogoutOutlined,
  DollarCircleOutlined,
  UserOutlined,
  ToolOutlined,
  LineChartOutlined
} from '@ant-design/icons';
import './Sidebar.css';

export default function Sidebar({ lng, collapsed, setCollapsed }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  // Accordion and selection state
  const [openMenu, setOpenMenu] = useState(null);
  const [selectedSubMenu, setSelectedSubMenu] = useState(null);

  const menuItems = [
    {
      id: 'practice',
      lbl_name: 'Practice Management',
      icon: <TeamOutlined style={{ fontSize: '18px' }} />,
      sub_menu_items: [
        { id: '1-1', title: 'Registered Practices', route: '/admin/practice/registered' },
        { id: '1-2', title: 'Practice Providers', route: '/admin/practice/providers' },
        // { id: '1-3', title: 'Document Verification', route: '/admin/practice/verification' },
      ]
    },
    {
      id: 'operations',
      lbl_name: 'Operations',
      icon: <ToolOutlined style={{ fontSize: '18px' }} />,
      sub_menu_items: [
        { id: '2-1', title: 'Credentialing Requests', route: '/admin/operations/credentialing' },
        { id: '2-2', title: 'Assign Specialists', route: '/admin/operations/assign' },
        { id: '2-3', title: 'Request Status', route: '/admin/operations/status' },
      ]
    },
    {
      id: 'billing',
      lbl_name: 'Billing & CRM',
      icon: <DollarCircleOutlined style={{ fontSize: '18px' }} />,
      sub_menu_items: [
        { id: '3-1', title: 'RCM Requests', route: '/admin/billing/rcm' },
        { id: '3-2', title: 'Billing Specialists', route: '/admin/billing/specialists' },
        { id: '3-3', title: 'Payment Confirmations', route: '/admin/billing/confirmations' },
        { id: '3-4', title: 'Service Progress', route: '/admin/billing/progress' },
      ]
    },
    {
      id: 'user_mgmt',
      lbl_name: 'User Management',
      icon: <UserOutlined style={{ fontSize: '18px' }} />,
      sub_menu_items: [
        { id: '4-1', title: 'All Users', route: '/admin/users/all' },
        // { id: '4-2', title: 'Add Users', route: '/admin/users/add' },
        { id: '4-3', title: 'Roles & Permissions', route: '/admin/users/roles' },
        // { id: '4-4', title: 'Access Control', route: '/admin/users/access' },
      ]
    },
    {
      id: 'analytics',
      lbl_name: 'Analytics & Reports',
      icon: <LineChartOutlined style={{ fontSize: '18px' }} />,
      sub_menu_items: [
        // { id: '5-1', title: 'Performance Metrics', route: '/admin/analytics/metrics' },
        { id: '5-2', title: 'Generate Reports', route: '/admin/analytics/reports' },
        { id: '5-3', title: 'Activity Logs', route: '/admin/analytics/logs' },
      ]
    },
    {
      id: 'system',
      lbl_name: 'System Management',
      icon: <SettingOutlined style={{ fontSize: '18px' }} />,
      sub_menu_items: [
        { id: '6-1', title: 'Settings', route: '/admin/system/settings' },
        // { id: '6-2', title: 'Notifications', route: '/admin/system/notifications' },
        { id: '6-3', title: 'Support & Help', route: '/admin/system/support' },
      ]
    }
  ];

  // Automatically keep submenus open and active based on pathname
  useEffect(() => {
    menuItems.forEach((item) => {
      const activeSub = item.sub_menu_items.find(sub => pathname.includes(sub.route));
      if (activeSub) {
        setSelectedSubMenu(activeSub.id);
        setOpenMenu(item.id);
      }
    });
  }, [pathname]);

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  const handleCancelLogout = () => {
    setIsLogoutModalOpen(false);
  };

  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('role');
    message.success('Successfully logged out.');
    router.push(`/${lng}/signin`);
  };

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#0d257b' }}>
        {/* Logo Container */}
        <div className="sider-logo-container" style={{
          height: '90px',
          display: 'flex',
          justifyContent: collapsed ? 'center' : 'flex-start',
          alignItems: 'center',
          padding: '0 24px',
          background: 'rgba(255, 255, 255, 0.03)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
        }}>
          {collapsed ? (
            <img src="/dochyve_yellow.svg" alt="DocHyve" style={{ height: '40px', width: '40px', objectFit: 'contain' }} />
          ) : (
            <img src="/dochyve_yellow.svg" alt="DocHyve" style={{ height: '55px', width: 'auto', objectFit: 'contain' }} />
          )}
        </div>

        {/* Custom Sidebar Menu List */}
        <div className="custom-sidebar-container" style={{ padding: '16px 8px', overflowY: 'auto', flex: 1 }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {menuItems.map((item) => {
              const isOpen = openMenu === item.id;
              const hasActiveSub = item.sub_menu_items.some(sub => selectedSubMenu === sub.id);

              const parentHeader = (
                <div
                  onClick={() => {
                    setOpenMenu(isOpen ? null : item.id);
                  }}
                  className={`custom-parent-item ${(isOpen || hasActiveSub) ? 'active' : ''}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: collapsed ? 'center' : 'space-between',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    position: 'relative'
                  }}
                >
                  {/* Parent selection vertical line (white) */}
                  {hasActiveSub && (
                    <span className="parent-active-line" style={{
                      position: 'absolute',
                      left: 0,
                      top: '5%',
                      height: '95%',
                      width: '4px',
                      backgroundColor: '#ffffff',
                      borderRadius: '2px'
                    }} />
                  )}

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span className="menu-icon-wrapper" style={{ display: 'flex', alignItems: 'center', color: hasActiveSub ? '#dfbd72' : 'inherit' }}>
                      {item.icon}
                    </span>
                    {!collapsed && <span style={{ fontWeight: '500', fontSize: '15px' }}>{item.lbl_name}</span>}
                  </div>

                  {!collapsed && (
                    <span style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'transform 0.3s ease',
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      opacity: 0.8
                    }}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  )}
                </div>
              );

              return (
                <li key={item.id} style={{ display: 'flex', flexDirection: 'column' }}>
                  {collapsed ? (
                    <Tooltip title={item.lbl_name} placement="right">
                      {parentHeader}
                    </Tooltip>
                  ) : (
                    parentHeader
                  )}

                  {/* Nested Sub-Menu List */}
                  {isOpen && !collapsed && (
                    <ul style={{ listStyle: 'none', padding: '4px 0', margin: '4px 0 0 0', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {item.sub_menu_items.map((sub) => {
                        const isSubActive = selectedSubMenu === sub.id;
                        return (
                          <li key={sub.id}>
                            <div
                              onClick={() => {
                                setSelectedSubMenu(sub.id);
                                router.push(`/${lng}${sub.route}`);
                              }}
                              className={`custom-sub-item ${isSubActive ? 'active' : ''}`}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '10px 16px 10px 32px',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                position: 'relative',
                                fontSize: '14px',
                                margin: '0 8px',
                                width: 'calc(100% - 16px)'
                              }}
                            >
                              {/* Sub-menu vertical line (white) */}
                              {isSubActive && (
                                <span className="sub-active-line" style={{
                                  position: 'absolute',
                                  left: '0px',
                                  top: '5%',
                                  height: '95%',
                                  width: '4px',
                                  backgroundColor: '#ffffff',
                                  borderRadius: '2px'
                                }} />
                              )}
                              {sub.title}
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}

            {/* Logout Item */}
            <li style={{ marginTop: 'auto', paddingTop: '16px' }}>
              {collapsed ? (
                <Tooltip title="Logout" placement="right">
                  <div
                    onClick={handleLogoutClick}
                    className="custom-logout-item logout"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '12px',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <LogoutOutlined style={{ fontSize: '18px' }} />
                  </div>
                </Tooltip>
              ) : (
                <div
                  onClick={handleLogoutClick}
                  className="custom-logout-item logout"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    gap: '12px',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <LogoutOutlined style={{ fontSize: '18px' }} />
                  <span style={{ fontWeight: '500', fontSize: '15px' }}>Logout</span>
                </div>
              )}
            </li>
          </ul>
        </div>

        {/* Sidebar Trigger (Expand/Collapse) */}
        <div
          onClick={() => setCollapsed(!collapsed)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'flex-end',
            height: '56px',
            background: '#0d257b',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            cursor: 'pointer',
            paddingRight: collapsed ? '0px' : '20px',
            transition: 'all 0.3s ease'
          }}
        >
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            fontSize: '14px',
            fontWeight: 'bold',
            transition: 'all 0.3s ease'
          }}>
            {collapsed ? '❯' : '❮'}
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      <Modal
        title="Confirm Logout"
        open={isLogoutModalOpen}
        onCancel={handleCancelLogout}
        centered
        footer={[
          <Button key="cancel" onClick={handleCancelLogout}>
            Cancel
          </Button>,
          <Button
            key="logout"
            type="primary"
            danger
            onClick={handleLogout}
          >
            Logout
          </Button>,
        ]}
      >
        <p>Are you sure you want to logout?</p>
      </Modal>
    </>
  );
}
