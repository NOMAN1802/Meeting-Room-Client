import React, { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { FaMap, FaMobile, FaPersonBooth, FaUser } from 'react-icons/fa';
import { AiOutlineLock } from 'react-icons/ai';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Container from "../../components/Container/Container";
import PageTitle from "../../components/PageTitle/PageTitle";


const Register = () => {

    const [viewPassword, setViewPassword] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.pathname || "/";
  
    const handleSubmit = async (e: React.FormEvent) =>{
        e.preventDefault();
          
    //    const user =  await signUp({name , email, password,phone,address
    
    navigate(from, { replace: true });
       
        // console.log('our input', user)
    }
  
    const handleViewPassword = () => {
      setViewPassword(!viewPassword);
    };
    return (
        <Container>
        <PageTitle heading="Sign Up" subHeading="Please Sign Up to continue...."/>

        <div className='p-auto m-auto max-w-screen-xl md:flex justify-center items-center my-4'>


  
  <motion.form
    initial={{ y: 0 }}
    animate={{ y: [0, -10, 0] }}
    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay: 0.5 }}
    className="space-y-4 max-w-md w-full"
    onSubmit={handleSubmit}
  >

<div className="flex flex-col items-start relative">
      <label className='text-sm mb-2' htmlFor="name">Name</label>
      <div className="relative">
        <FaPersonBooth className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type='text'
          id='name'
          // value={ name as unknown as string} 
            //   onChange={(e)=>dispatch(setName(e.target.value))}
          className="w-96 rounded-md pl-10 py-2 border border-gray-300"
          required
        />
      </div>
    </div>
    <div className="flex flex-col items-start relative">
      <label className='text-sm mb-2' htmlFor="email">Email</label>
      <div className="relative">
        <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type='email'
          id='email'
          // value={email}
            //   onChange={(e)=>dispatch(setEmail(e.target.value))}
          className="w-96 rounded-md pl-10 py-2 border border-gray-300"
          required
        />
      </div>
    </div>

    <div className="flex flex-col items-start relative">
      <label className='text-sm mb-2' htmlFor="password">Password</label>
      <div className="relative">
        <input
          type={viewPassword ? 'text' : 'password'}
          id="password"
          // value={password}
            //   onChange={(e)=>dispatch(setPassword(e.target.value))}
              required
          className="w-96 rounded-md pl-10 pr-12 py-2 border border-gray-300"
        />
        <div
          onClick={handleViewPassword}
          className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
        >
          {viewPassword ? <BsEyeSlash /> : <BsEye />}
        </div>
        <AiOutlineLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
    </div>

    <div className="flex flex-col items-start relative">
      <label className='text-sm mb-2' htmlFor="phone">Phone Number</label>
      <div className="relative">
        <FaMobile className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type='text'
          id='phone'
          // value={phone}
            //   onChange={(e)=>dispatch(setPhone(e.target.value))}
              required
          className="w-96 rounded-md pl-10 py-2 border border-gray-300"
          
        />
      </div>
    </div>


    <div className="flex flex-col items-start relative">
      <label className='text-sm mb-2' htmlFor="address">Address</label>
      <div className="relative">
        <FaMap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type='text'
          id='address'
          // value={address}
            //   onChange={(e)=>dispatch(setAddress(e.target.value))}
          className="w-96 rounded-md pl-10 py-2 border border-gray-300"
          required
        />
      </div>
    </div>

    <div>
      <button type="submit" className='bg-gray-500 w-[85%] rounded-md py-3 text-white'>
        Log In
      </button>
    </div>

    <div className='text-center'>
      <button className='text-xs hover:underline hover:text-rose-500 text-gray-400'>
        Forgot password?
      </button>
      <p className='text-xl text-gray-600 my-4'>OR</p>
      <p className="border border-x-4 border-gray-600 space-y-2 rounded-md"></p>
      <Link to='/login'>
        <p className='mt-4 text-center'>
          Already have an account?{' '}
          <span className="text-gray-400 hover:underline cursor-pointer">
            Login now..
          </span>
        </p>
      </Link>
    </div>
  </motion.form>
</div>

    </Container>
    );
};

export default Register;