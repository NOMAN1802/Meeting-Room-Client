import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Sidebar from '../components/Dashboard/Sidebar';
import PageTitle from '../components/PageTitle/PageTitle';
import { motion } from "framer-motion";

const DashboardLayout = () => {
  const location = useLocation();
  const [isOutletEmpty, setIsOutletEmpty] = useState(true);

  useEffect(() => {
    setIsOutletEmpty(location.pathname === '/dashboard');
  }, [location]);

  return (
    <div className='relative min-h-screen md:flex'>
      <Sidebar />
      <div className='flex-1 flex flex-col justify-center items-center md:ml-24 bg-gray-100'>
        {isOutletEmpty && (
          <div className='absolute top-12 text-center'>
            <PageTitle heading='Welcome to ClickCraft' subHeading='Now You are able to Manage & add products' />
            <motion.div
              className='pt-10'
              initial={{ y: 0 }}
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay: 0.2 }}
            >
              <h1 className='text-4xl text-gray-800 font-semibold'>Stay Tuned with ClickCraft & enhance your tech experience...</h1>
            </motion.div>
          </div>
        )}
        <div className='p-6 w-full'>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;