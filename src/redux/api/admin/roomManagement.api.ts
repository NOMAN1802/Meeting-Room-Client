import { baseApi } from "../baseApi";

const roomManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    AddRoom: builder.mutation({
      query: (data) => ({
        url: "/rooms",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ['rooms'],
    }),
    getRooms: builder.query({
        query: () => ({
          url: "/rooms",
          method: "GET",
          
        }),
        providesTags: ["rooms"],
      }),
      getSingleRoom: builder.query({
        query: (id) => ({
          url: `/rooms/${id}`,
          method: "GET",
        }),
        providesTags: ["rooms"],
      }),
    updateRoom: builder.mutation({
      query: (args) => ({
        url: `/rooms/${args.id}`,
        method: "PUT",
        body: args.data,
      }),
      invalidatesTags: ['rooms'],
    }),
    deleteRoom: builder.mutation({
      query: (id) => ({
        url: `/rooms/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['rooms']
    }),
    
  }),
});

export const {
  useAddRoomMutation,
  useGetRoomsQuery,
  useGetSingleRoomQuery,
  useUpdateRoomMutation,
  useDeleteRoomMutation,
} = roomManagementApi;