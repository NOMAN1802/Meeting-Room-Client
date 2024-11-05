import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../Button/Button';
import { AiOutlineLogin } from 'react-icons/ai';
import MenuDropdown from '../MenuDropdown/MenuDropdown';
import { useCurrentUser } from '../../redux/features/authSlice';
import { useAppSelector } from '../../redux/hooks';

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useAppSelector(useCurrentUser);

  const menuVariants = {
    open: {
      opacity: 1,
      height: 'auto',
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
      },
    },
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
      },
    },
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className='z-50 static bg-gray-700 text-gray-100'>
      <div className='flex flex-col lg:flex-row lg:justify-between lg:p-5 px-6 lg:px-20 w-full'>
        {/* Logo and Menu Toggle */}
        <div className='flex items-center justify-between w-full lg:w-auto'>
          <Link to='/' className='flex items-center gap-2'>
            <motion.img
              initial={{ y: 0 }}
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut', delay: 0.5 }}
              src='/bookingcom.svg'
              height={28}
              width={28}
              alt=''
            />
            <h2 className='text-3xl font-bold text-gray-400'>
              <span className='text-gray-300'>Book</span>Space
            </h2>
          </Link>

          <div className='flex items-center gap-4 lg:hidden'>
            {user ? (
              <MenuDropdown />
            ) : (
              <NavLink className='flex items-center' to='/login'>
                <AiOutlineLogin size={24} />
              </NavLink>
            )}
            <button
              className='focus:outline-none'
              onClick={toggleMenu}
              aria-label='Menu'
            >
              {isOpen ? (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className='h-6 w-6 text-black'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              ) : (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6 text-black'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M4 6h16M4 12h16M4 18h16'
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Items */}
        <AnimatePresence>
          {isOpen && (
            <motion.ul
              initial='closed'
              animate='open'
              exit='closed'
              variants={menuVariants}
              className='lg:hidden flex flex-col gap-4 mt-4'
            >
              <li>
                <NavLink
                  onClick={() => setIsOpen(false)}
                  to='/'
                  className={({ isActive }) => (isActive ? 'active1' : 'default')}
                  title='Home'
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  onClick={() => setIsOpen(false)}
                  to='/meeting-rooms'
                  className={({ isActive }) => (isActive ? 'active1' : 'default')}
                  title='Meeting Rooms'
                >
                  Meeting Rooms
                </NavLink>
              </li>
              <li>
                <NavLink
                  onClick={() => setIsOpen(false)}
                  to='/about-us'
                  className={({ isActive }) => (isActive ? 'active1' : 'default')}
                  title='About Us'
                >
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink
                  onClick={() => setIsOpen(false)}
                  to='/contact-us'
                  className={({ isActive }) => (isActive ? 'active1' : 'default')}
                  title='Contact Us'
                >
                  Contact Us
                </NavLink>
              </li>
            </motion.ul>
          )}
        </AnimatePresence>

        {/* Desktop Menu Items */}
        <div className='hidden lg:flex lg:items-center lg:justify-center lg:gap-10 lg:mr-16 mt-4 lg:mt-0 w-full'>
          <NavLink
            to='/'
            className={({ isActive }) => (isActive ? 'active1' : 'default')}
            title='Home'
          >
            Home
          </NavLink>
          <NavLink
            to='/meeting-rooms'
            className={({ isActive }) => (isActive ? 'active1' : 'default')}
            title='Meeting Rooms'
          >
            Meeting Rooms
          </NavLink>
          <NavLink
            to='/about-us'
            className={({ isActive }) => (isActive ? 'active1' : 'default')}
            title='About Us'
          >
            About Us
          </NavLink>
          <NavLink
            to='/contact-us'
            className={({ isActive }) => (isActive ? 'active1' : 'default')}
            title='Contact Us'
          >
            Contact Us
          </NavLink>
        </div>

        {/* Desktop Profile Image or Login Button */}
        <div className='hidden lg:flex items-center'>
          {user ? (
            <MenuDropdown />
          ) : (
            <NavLink className='flex items-center relative' to='/login'>
              <Button label='Login' small />
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
