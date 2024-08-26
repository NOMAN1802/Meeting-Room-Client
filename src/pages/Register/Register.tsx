import React, { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { FaMap, FaMobile, FaPersonBooth, FaUser } from "react-icons/fa";
import { AiOutlineLock } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Container from "../../components/Container/Container";
import PageTitle from "../../components/PageTitle/PageTitle";
import { useRegisterMutation } from "../../redux/api/auth/authApi";
import { useAppDispatch } from "../../redux/hooks";
import { setUser } from "../../redux/features/authSlice";
import { toast } from "sonner";

const Register: React.FC = () => {
  const [viewPassword, setViewPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.pathname || "/";
  const dispatch = useAppDispatch();

  const [register, { data }] = useRegisterMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userInfo = {
      // Your form values go here
      // name, email, password, phone, address
    };

    const { data } = await register(userInfo);
    const { token } = data?.data;
    const user = jwtDecode(token) as TUser;

    dispatch(setUser({ user, token }));
    toast.success("User registered successfully");
    navigate(from, { replace: true });
  };

  const handleViewPassword = () => {
    setViewPassword(!viewPassword);
  };

  return (
    <Container>
      <PageTitle heading="Sign Up" subHeading="Please Sign Up to continue...." />
      <div className="p-auto m-auto max-w-screen-xl md:flex justify-center items-center my-4">
        <motion.form
          initial={{ y: 0 }}
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay: 0.5 }}
          className="space-y-4 max-w-md w-full"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col items-start relative">
            <label className="text-sm mb-2" htmlFor="name">Name</label>
            <div className="relative">
              <FaPersonBooth className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                id="name"
                className="w-96 rounded-md pl-10 py-2 border border-gray-300"
                required
              />
            </div>
          </div>

          <div className="flex flex-col items-start relative">
            <label className="text-sm mb-2" htmlFor="email">Email</label>
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                id="email"
                className="w-96 rounded-md pl-10 py-2 border border-gray-300"
                required
              />
            </div>
          </div>

          <div className="flex flex-col items-start relative">
            <label className="text-sm mb-2" htmlFor="phone">Phone</label>
            <div className="relative">
              <FaMobile className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                id="phone"
                className="w-96 rounded-md pl-10 py-2 border border-gray-300"
                required
              />
            </div>
          </div>

          <div className="flex flex-col items-start relative">
            <label className="text-sm mb-2" htmlFor="address">Address</label>
            <div className="relative">
              <FaMap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                id="address"
                className="w-96 rounded-md pl-10 py-2 border border-gray-300"
                required
              />
            </div>
          </div>

          <div className="flex flex-col items-start relative">
            <label className="text-sm mb-2" htmlFor="password">Password</label>
            <div className="relative">
              <input
                type={viewPassword ? "text" : "password"}
                id="password"
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

          <div>
            <button type="submit" className="bg-gray-500 w-[85%] rounded-md py-3 text-white">
              Sign Up
            </button>
          </div>

          <div className="text-center">
            <p className="mt-4 text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-gray-400 hover:underline">
                Log In
              </Link>
            </p>
          </div>
        </motion.form>
      </div>
    </Container>
  );
};

export default Register;