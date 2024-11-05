import React from 'react';
import { useAppSelector } from '../../redux/hooks';
import { useCurrentUser } from '../../redux/features/authSlice';
import AdminDashboasrd from './AdminDashboasrd';
import UserDashboard from './UserDashboard';

const Dashboard: React.FC = () => {
  const user = useAppSelector(useCurrentUser);
  
 

  return (
   <>
   {user?.role === 'admin' ? <AdminDashboasrd/> : <UserDashboard/>}
   </>
  );
};

export default Dashboard;