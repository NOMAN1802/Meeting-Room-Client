import React from 'react';
import { Menu, Dropdown, Button } from 'antd';
import { DownOutlined, UserOutlined, LogoutOutlined, DashboardOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import ProfImg from '../../assets/images/admin.png';
import { useCurrentUser } from '../../redux/features/authSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logout } from '../../redux/features/authSlice';

const MenuDropdown: React.FC = () => {
  const user = useAppSelector(useCurrentUser);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" icon={<DashboardOutlined />}>
        <Link to={user?.role === 'admin' ? '/dashboard/adminDashboard' : '/dashboard/myDashboard'}>
          {user?.role === 'admin' ? 'Dashboard' : 'My Bookings'}
        </Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<LogoutOutlined />} onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <div className="flex items-center cursor-pointer">
        <div className="w-24 rounded-full">
          <img
            className="relative inline-block h-12 w-12 rounded-full object-cover object-center"
            src={ProfImg}
            alt="User Profile"
          />
        </div>
      </div>
    </Dropdown>
  );
};

export default MenuDropdown;
