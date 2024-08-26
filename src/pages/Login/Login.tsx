import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { AiOutlineLock } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Container from "../../components/Container/Container";
import PageTitle from "../../components/PageTitle/PageTitle";
import { useAppDispatch } from "../../redux/hooks";
import { useLoginMutation } from "../../redux/api/auth/authApi";
import { setUser, TUser } from "../../redux/features/authSlice";
import { toast } from "sonner";
import { verifyToken } from "../../utils/verifyToken";


type FormValues = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const [viewPassword, setViewPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.pathname || "/";
  const dispatch = useAppDispatch();
  
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();

  const [login] = useLoginMutation();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Logging in...");

    try {
      const res = await login(data).unwrap();
      const user = jwtDecode(res.data.accessToken) as any;
      dispatch(setUser({ user, token: res.data.accessToken }));
      toast.success("Logged in successfully", { id: toastId });
      navigate(from, { replace: true });
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  const handleViewPassword = () => {
    setViewPassword(!viewPassword);
  };

  return (
    <Container>
      <PageTitle heading="Sign In" subHeading="Please Sign In to continue...." />
      <div className="p-auto m-auto max-w-screen-xl md:flex justify-center items-center my-4">
        <motion.form
          initial={{ y: 0 }}
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay: 0.5 }}
          className="space-y-4 max-w-md w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
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
            <button type="submit" className="bg-gray-500 w-[85%] rounded-md py-3 text-white">
              Log In
            </button>
          </div>

          <div className="text-center">
            <button className="text-xs hover:underline hover:text-rose-500 text-gray-400">
              Forgot password?
            </button>
            <p className="text-xl text-gray-600 my-4">OR</p>
            <Link to="/register">
              <p className="mt-4 text-center">
                Not registered?{" "}
                <span className="text-gray-400 hover:underline cursor-pointer">
                  Create an account
                </span>
              </p>
            </Link>
          </div>
        </motion.form>
      </div>
    </Container>
  );
};

export default Login;
