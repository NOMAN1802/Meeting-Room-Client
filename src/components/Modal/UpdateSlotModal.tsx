import { Dialog } from "@headlessui/react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetSingleSlotQuery, useUpdateSlotMutation } from "../../redux/api/admin/slotManagement.api";
import { useGetRoomsQuery, useGetSingleRoomQuery } from "../../redux/api/admin/roomManagement.api";
import { z } from "zod";
import { toast } from 'sonner';
import { TRoom } from "../../types";

const slotValidationSchema = z.object({
  room: z.string().optional(),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date" }).optional(),
  startTime: z.string().refine((val) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(val), {
    message: "Invalid time format",
  }).optional(),
  endTime: z.string().refine((val) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(val), {
    message: "Invalid time format",
  }).optional(),
});

interface UpdateSlotModalProps {
  slotId: string;
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
}

const UpdateSlotModal: React.FC<UpdateSlotModalProps> = ({ slotId, isDialogOpen, setIsDialogOpen }) => {
  const [updateSlot] = useUpdateSlotMutation();
  const { data: RoomData, isLoading } = useGetRoomsQuery(undefined);
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(slotValidationSchema),
  });
  const { data: slotData } = useGetSingleSlotQuery(slotId);
  const { data: singleRoom } = useGetSingleRoomQuery(slotData?.data?.room);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#557856]"></div>
      </div>
    );
  }

  const availableRooms = RoomData?.data.filter((room: TRoom) => !room.isDeleted);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading('Updating slot...');
  
    // Reset form after submission
    reset();

    const updatedData = {
      data,
      sId: slotId,
    };
  
    try {
      const res = await updateSlot(updatedData).unwrap();

      if (res?.success) {
        toast.success(res?.message, { id: toastId, duration: 2000 });
      } else {
        toast.error(res?.message, { id: toastId, duration: 2000 });
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to update slot.', { id: toastId, duration: 2000 });
    } finally {
      setIsDialogOpen(false);
    }
  };
  

  return (
    <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md p-6 bg-white rounded-md">
          <Dialog.Title className="text-lg font-medium text-gray-900">
            Update Slot
          </Dialog.Title>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
            <div>
              <label className="block text-gray-700">Room</label>
              <select
                {...register("room")}
                defaultValue={singleRoom?.data?._id}
                className="w-full p-2 mt-1 border rounded-md"
              >
                <option value="" disabled>
                  Select a Room
                </option>
                {availableRooms?.map((room: TRoom) => (
                  <option key={room._id} value={room._id}>
                    {`${room.name} - $${room.pricePerSlot}`}
                  </option>
                ))}
              </select>
              {errors.room && <p className="text-red-500">{errors.room.message}</p>}
            </div>
            <div>
              <label className="block text-gray-700">Date</label>
              <input
                type="date"
                {...register("date")}
                defaultValue={slotData?.data?.date?.split("T")[0]}
                className="w-full p-2 mt-1 border rounded-md"
              />
              {errors.date && <p className="text-red-500">{errors.date.message}</p>}
            </div>
            <div>
              <label className="block text-gray-700">Start Time</label>
              <input
                type="time"
                {...register("startTime")}
                defaultValue={slotData?.data?.startTime}
                className="w-full p-2 mt-1 border rounded-md"
              />
              {errors.startTime && <p className="text-red-500">{errors.startTime.message}</p>}
            </div>
            <div>
              <label className="block text-gray-700">End Time</label>
              <input
                type="time"
                {...register("endTime")}
                defaultValue={slotData?.data?.endTime}
                className="w-full p-2 mt-1 border rounded-md"
              />
              {errors.endTime && <p className="text-red-500">{errors.endTime.message}</p>}
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Update Slot
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default UpdateSlotModal;
