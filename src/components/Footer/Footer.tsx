import { FaEnvelope, FaFacebookF, FaLocationArrow, FaPhone, FaTwitter, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Container from '../Container/Container';
import { motion } from 'framer-motion';
import Marquee from 'react-fast-marquee';

const Footer = () => {
    return (
        <Container>
            <div className='bg-gray-700 text-gray-100  mt-6 py-10'>
            <div className='max-w-screen-xl md:mx-auto mx-10 py-5 grid grid-cols-1 md:grid-cols-3 md:justify-items-center gap-10 md:gap-20'>
                <div>
                <Link to='/' className='flex-grow flex justify-center lg:justify-start gap-2'>
          <motion.img
          initial={{ y: 0 }}
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay:  0.5 }}
          src="/bookingcom.svg" height={28} width={28} alt="" />
            <h2 className='text-3xl font-bold text-black'>
              <span className='text-gray-600'>Book</span>Space
            </h2>
          </Link>
                    <p className='my-4 text-lg'>We support programs that create advancement for people</p>
                    <div className='text-lg flex gap-4'>
                        <div className='p-2 border-2 rounded-full border-gray-400 text-gray-500 hover:bg-gray-400 hover:text-gray-100 '>
                            <FaFacebookF className='' />
                        </div>
                        <div className='p-2 border-2 rounded-full border-gray-400 text-gray-500 hover:bg-gray-400 hover:text-gray-100 '>
                            <FaYoutube />
                        </div>
                        <div className='p-2 border-2 rounded-full border-gray-400 text-gray-500 hover:bg-gray-400 hover:text-gray-100 '>
                            <FaTwitter />
                        </div>
                    </div>
                </div>
                <div>
                    <h1 className='text-xl font-semibold mb-5'>Useful Links</h1>
                    <div className='flex flex-col gap-2'>
                        <Link to="/about-us">
                            <h1>About Us</h1>
                        </Link>
                        <Link to="/contact-us">
                            <h1>Contact Us</h1>
                        </Link>
                        <Link to="/">
                            <h1>Privacy Policy</h1>
                        </Link>
                        <Link to="/">
                            <h1>Terms & Condition</h1>
                        </Link>
                    </div>
                </div>
                <div>
                    <h1 className='text-xl font-semibold mb-5'>Contact Us</h1>
                    <div className='flex flex-col gap-2'>
                        <div className='flex items-center gap-3'>
                            <FaPhone className='text-gray-500' /> <h1>+88019202020</h1>
                        </div>
                        <div className='flex items-center gap-3'>
                            <FaEnvelope className='text-gray-500' /> <h1>bookapace@gmail.com</h1>
                        </div>
                        <div className='flex items-center gap-3'>
                            <FaLocationArrow className='text-gray-500' /> <h1>Dhaka, Bangladesh</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div  className='text-center mt-5 border-t-2 mx-10 border-gray-500'>
                <Marquee>
                <h1 
                className='mt-5'>
                    &copy; Copyright 2024 TechAgency All rights reserved.
                </h1>
                </Marquee>
               
            </div>
        </div>
        </Container>
    );
};

export default Footer;