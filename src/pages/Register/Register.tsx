/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { FaMap, FaMobile, FaPersonBooth, FaUser } from "react-icons/fa";
import { AiOutlineLock } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Container from "../../components/Container/Container";
import PageTitle from "../../components/PageTitle/PageTitle";
import { useRegisterMutation } from "../../redux/api/auth/authApi";
import { toast } from "sonner";

type FormValues = {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
};

const Register: React.FC = () => {
  const [viewPassword, setViewPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.pathname || "/";

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const [registerUser] = useRegisterMutation();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const toastId = toast.loading("Registering...");

    try {
      await registerUser(data).unwrap();
      toast.success("User registered successfully", { id: toastId });
      navigate(from, { replace: true });
    } catch (error) {
      toast.error("Registration failed", { id: toastId });
    }
  };

  const handleViewPassword = () => {
    setViewPassword(!viewPassword);
  };

  return (
    <Container>
      <PageTitle heading="Sign Up" subHeading="Please Sign Up to continue...." />
      <div className="p-auto m-auto max-w-screen-xl md:flex justify-center items-center my-6">
        <form
         
          className="space-y-4 max-w-md p-4 mx-auto bg-gray-200 rounded-lg"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col items-start relative">
            <label className="text-sm mb-2" htmlFor="name">Name</label>
            <div className="relative">
              <FaPersonBooth className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                id="name"
                {...register("name", { required: "Name is required" })}
                className="w-96 rounded-md pl-10 py-2 border border-gray-300"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>
          </div>

          <div className="flex flex-col items-start relative">
            <label className="text-sm mb-2" htmlFor="email">Email</label>
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                id="email"
                {...register("email", { required: "Email is required" })}
                className="w-96 rounded-md pl-10 py-2 border border-gray-300"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>
          </div>

          <div className="flex flex-col items-start relative">
            <label className="text-sm mb-2" htmlFor="phone">Phone</label>
            <div className="relative">
              <FaMobile className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                id="phone"
                {...register("phone", { required: "Phone is required" })}
                className="w-96 rounded-md pl-10 py-2 border border-gray-300"
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
            </div>
          </div>

          <div className="flex flex-col items-start relative">
            <label className="text-sm mb-2" htmlFor="address">Address</label>
            <div className="relative">
              <FaMap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                id="address"
                {...register("address", { required: "Address is required" })}
                className="w-96 rounded-md pl-10 py-2 border border-gray-300"
              />
              {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
            </div>
          </div>

          <div className="flex flex-col items-start relative">
            <label className="text-sm mb-2" htmlFor="password">Password</label>
            <div className="relative">
              <input
                type={viewPassword ? "text" : "password"}
                id="password"
                {...register("password", { required: "Password is required" })}
                className="w-96 rounded-md pl-10 pr-12 py-2 border border-gray-300"
              />
              <div
                onClick={handleViewPassword}
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              >
                {viewPassword ? <BsEyeSlash /> : <BsEye />}
              </div>
              <AiOutlineLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>
          </div>

          <div>
            <button type="submit" className="bg-gray-600 w-[92%] md:w-full rounded-md py-2 text-white">
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
        </form>
      </div>
    </Container>
  );
};

export default Register;
