import Container from "../../../components/Container/Container";
import { generateBreadcrumbs } from "../../../utils/getPageTitleData";
import ManageSlotRow from "./ManageSlotRow";
import { TRoom, TSlot } from "../../../types";
import { useGetAllSlotsQuery } from "../../../redux/api/admin/slotManagement.api";
import { useGetRoomsQuery } from "../../../redux/api/admin/roomManagement.api";


const ManageSlots = () => {
  const { data: slots, isLoading: slotsLoading } = useGetAllSlotsQuery(undefined);
  const { data: rooms, isLoading: roomsLoading } = useGetRoomsQuery(undefined);

  if (slotsLoading || roomsLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading....</p>
      </div>
    );
  }

  const getRoomDetails = (roomId: string): TRoom | undefined => {
    return rooms?.data?.find((room: TRoom) => room._id === roomId);
  };

  const breadcrumbItems = [
    { label: "Home", path: "/" },
    { label: "Dashboard", path: "/dashboard" },
    { label: "Manage Slots", path: "/dashboard/manage-slots" },
  ];

  return (
    <Container>
      {generateBreadcrumbs(breadcrumbItems)}
      {slots?.data && slots?.data.length > 0 ? (
        <div className="overflow-x-auto">
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
                    roomNo={roomDetails?.roomNo || "N/A"}
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
    </Container>
  );
};

export default ManageSlots;
