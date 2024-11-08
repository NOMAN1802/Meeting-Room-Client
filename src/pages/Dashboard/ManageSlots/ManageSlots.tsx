import ManageSlotRow from "./ManageSlotRow";
import { TRoom, TSlot } from "../../../types";
import { useGetAllSlotsQuery } from "../../../redux/api/admin/slotManagement.api";
import { useGetRoomsQuery } from "../../../redux/api/admin/roomManagement.api";
import PageTitle from "../../../components/PageTitle/PageTitle";


const ManageSlots = () => {
  const { data: slots, isLoading: slotsLoading } = useGetAllSlotsQuery(undefined);
  const { data: rooms, isLoading: roomsLoading } = useGetRoomsQuery(undefined);

  if (slotsLoading || roomsLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
             <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-500"></div>
           </div>
    );
  }

  const getRoomDetails = (roomId: string): TRoom | undefined => {
    return rooms?.data?.find((room: TRoom) => room._id === roomId);
  };



  return (
    <>
     
      <PageTitle heading="Manage Slots" subHeading="Manage available slots" />
      {slots?.data && slots?.data.length > 0 ? (
        <div className="overflow-x-auto my-6">
          <table className="min-w-full bg-gray-200 shadow-md rounded my-6">
            {/* Table Head */}
            <thead className="bg-gray-600 text-gray-200">
              <tr>
                <th className="py-3 px-6 text-left">Room Name</th>
                <th className="py-3 px-6 text-left">Room No</th>
                <th className="py-3 px-6 text-left">Date</th>
                <th className="py-3 px-6 text-left">Start Time</th>
                <th className="py-3 px-6 text-left">End Time</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left">Update</th>
                <th className="py-3 px-6 text-left">Delete</th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody className="text-gray-700 rounded-md">
            {slots?.data?.map((slot: TSlot) => {
                const roomDetails = getRoomDetails(slot.room);
                return (
                  <ManageSlotRow
                    key={slot._id}
                    slot={slot}
                    roomName={roomDetails?.name || "Unknown"}
                    roomNo={roomDetails?.roomNo ?? 0}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="pt-12">
          <p className="text-center text-gray-700 font-bold">No Slots found...</p>
        </div>
      )}
    </>
  );
};

export default ManageSlots;
