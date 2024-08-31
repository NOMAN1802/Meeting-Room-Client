import { baseApi } from "../../api/baseApi";

const slotManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSlots: builder.query({
        query: () => {
          return {
            url: "/slots",
            method: "GET",
          };
        },
        providesTags: ["slots"],
      }),

      getSingleSlot: builder.query({
        query: (id) => {
          return {
            url: `/slots/${id}`,
            method: "GET",
          };
        },
        providesTags: ["slots"],
      }),
  
      createSlots: builder.mutation({
        query: (slot) => {
          return {
            url: "/slots",
            method: "POST",
            body: slot,
          };
        },
        invalidatesTags: ["slots"],
      }),
  
      updateSlot: builder.mutation({
        query: (data) => {
          return {
            url: `/slots/${data?.sId}`,
            method: "PUT",
            body: data,
          };
        },
        invalidatesTags: ["slots"],
      }),
  
  
      deleteSlot: builder.mutation({
        query: (slotId) => {
          return {
            url: `/slots/${slotId}`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["slots"],
      }),

    }),
});

export const {
useCreateSlotsMutation,
useGetAllSlotsQuery,
useUpdateSlotMutation,
useDeleteSlotMutation,
useGetSingleSlotQuery,
} = slotManagementApi;