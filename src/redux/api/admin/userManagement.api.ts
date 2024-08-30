import { baseApi } from "../baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
        query: () => ({
          url: "/auth/users",
          method: "GET",
          
        }),
    }),
    updateUserRole: builder.mutation({
      query: ({ userId, role }) => ({
        url: `/auth/promote/${userId}`,
        method: "PATCH",
        body: { role }, 
      }),
      invalidatesTags: ['users'],
    }),
    
    
  }),
});

export const {
 useGetAllUsersQuery,
 useUpdateUserRoleMutation,
} = userManagementApi;