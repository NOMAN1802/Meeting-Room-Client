import { baseApi } from "../baseApi";

type LoginRequest = {
  email: string;
  password: string;
};

type RegisterRequest = {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
};

type AuthResponse = {
    success: boolean;
    statusCode: number;
    message: string;
    token: string;
    data: {
      _id: string;
      name: string;
      email: string;
      phone: string;
      role: string;
      address: string;
      
    };
  };


const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation<AuthResponse, RegisterRequest>({
      query: (newUser) => ({
        url: "/auth/register",
        method: "POST",
        body: newUser,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
