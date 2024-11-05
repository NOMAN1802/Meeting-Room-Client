import React, { useState, useEffect } from 'react';
import { Layout, Menu, Breadcrumb, Button, theme } from 'antd';
import { Outlet, useLocation, NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { logout, useCurrentUser } from '../redux/features/authSlice';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  IoBagAddSharp,
} from 'react-icons/io5';
import { MdDashboard, MdManageAccounts, MdOutlineManageAccounts } from 'react-icons/md';
import { FaHome, FaSignOutAlt } from 'react-icons/fa';

const { Header, Content, Sider } = Layout;

const DashboardLayout: React.FC = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const user = useAppSelector(useCurrentUser);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const {
    token: { borderRadiusLG},
  } = theme.useToken();

  useEffect(() => {
    // Logic to handle outlet empty state can be added here if needed
  }, [location]);

  const adminMenuItems = [
    {
      key: 'dashboard',
      icon: <MdDashboard />,
      label: <NavLink to='/dashboard'>Dashboard</NavLink>,
    },
    {
      key: 'add-room',
      icon: <IoBagAddSharp />,
      label: <NavLink to='/dashboard/add-room'>Add Room</NavLink>,
    },
    {
      key: 'manage-rooms',
      icon: <MdOutlineManageAccounts />,
      label: <NavLink to='/dashboard/manage-rooms'>Manage Rooms</NavLink>,
    },
    {
      key: 'add-slot',
      icon: <IoBagAddSharp />,
      label: <NavLink to='/dashboard/add-slot'>Add Slot</NavLink>,
    },
    {
      key: 'manage-slots',
      icon: <MdManageAccounts />,
      label: <NavLink to='/dashboard/manage-slots'>Manage Slots</NavLink>,
    },
    {
      key: 'manage-bookings',
      icon: <MdManageAccounts />,
      label: <NavLink to='/dashboard/manage-bookings'>Manage Bookings</NavLink>,
    },
    {
      key: 'manage-users',
      icon: <UserOutlined/>,
      label: <NavLink to='/dashboard/manage-users'>Manage Users</NavLink>,
    },
    {
      key: 'home',
      icon: <FaHome />,
      label: <NavLink to='/'>Home</NavLink>,
    },
    {
      key: 'logout',
      icon: <FaSignOutAlt/>,
      label: <NavLink to='/' onClick={handleLogout}>Logout</NavLink>,
    },
  ];

  const userMenuItems = [
    {
      key: 'dashboard',
      icon: <MdDashboard />,
      label: <NavLink to='/dashboard'>Dashboard</NavLink>,
    },
    {
      key: 'my-bookings',
      icon: <MdManageAccounts />,
      label: <NavLink to='/dashboard/my-bookings'>My Bookings</NavLink>,
    },
    {
      key: 'home',
      icon: <FaHome />,
      label: <NavLink to='/'>Home</NavLink>,
    },
    {
      key: 'logout',
      icon: <FaSignOutAlt/>,
      label: <NavLink to='/' onClick={handleLogout}>Logout</NavLink>,
    },
  ];

// Function to generate breadcrumbs based on the current path
const generateBreadcrumbs = () => {
  const pathSegments = location.pathname.split('/').filter(segment => segment);
  const breadcrumbItems = pathSegments.map((segment, index) => {
    const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
    return {
      label: segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' '),
      path: path.endsWith('/') ? path.slice(0, -1) : path,
    };
  });

  // Add 'Home' at the beginning of the breadcrumbs
  breadcrumbItems.unshift({ label: 'Home', path: '/' });

  return breadcrumbItems;
};

  const breadcrumbs = generateBreadcrumbs();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}  theme="dark">
        <div className="logo" />
        <Menu className='space-y-2' theme="dark" mode="inline" defaultSelectedKeys={[location.pathname.split('/').pop() || '']}>
          
          {user?.role === 'admin' ? (
            adminMenuItems.map(item => (
              <Menu.Item key={item.key} icon={item.icon} className='font-semibold'>
               
                {item.label}
              </Menu.Item>
            ))
          ) : user?.role === 'user' ? (
            userMenuItems.map(item => (
              <Menu.Item key={item.key} icon={item.icon}>
                {item.label}
              </Menu.Item>
            ))
          ) : null}
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: '#f3f4f6' }}> 
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content style={{
          margin: '24px 16px',
          padding: 24,
          minHeight: 280,
          background: '#f3f4f6',
          borderRadius: borderRadiusLG,
          overflow: 'auto', 
        }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            {breadcrumbs.map((item, index) => (
              <Breadcrumb.Item key={index}>
                <NavLink to={item.path}>{item.label}</NavLink>
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;