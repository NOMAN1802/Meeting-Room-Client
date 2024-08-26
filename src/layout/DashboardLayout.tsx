import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Sidebar from '../components/Dashboard/Sidebar';
import PageTitle from '../components/PageTitle/PageTitle';
import { motion } from "framer-motion";
import { useAppSelector } from '../redux/hooks';
import { useCurrentUser } from '../redux/features/authSlice';
import ProfImg from "../assets/images/admin.png"

const DashboardLayout = () => {
  const location = useLocation();
  const [isOutletEmpty, setIsOutletEmpty] = useState(true);
  const user = useAppSelector(useCurrentUser);

  useEffect(() => {
    setIsOutletEmpty(location.pathname === '/dashboard');
  }, [location]);

  return (
    <div className='relative min-h-screen md:flex'>
      <Sidebar />
      <div className='flex-1 flex flex-col justify-center items-center md:ml-24 bg-gray-100'>
        {isOutletEmpty && (
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay: 0.2 }}
            className='absolute top-12 text-center  bg-gradient-to-r from-gray-200 to-gray-400 rounded-md p-4 md:max-w-2xl w-full flex flex-col items-center md:grid md:grid-cols-3 gap-4'
          >
           
            {/* Welcome Text */}
            <div className='col-span-2 flex flex-col justify-center'>
              <PageTitle
                heading={`Welcome to BookSpace ${user?.name}`}
                subHeading={`You are ${user?.role} Now & Enjoy the facilities`}
              />
            </div>

             {/* Profile Image */}
             <div className='col-span-1 flex justify-center md:justify-end'>
              <img
                src={ProfImg}
                alt='Profile'
                className='w-20 h-20 rounded-full object-cover'
              />
            </div>
          </motion.div>
        )}
        <div className='p-6 w-full'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;


