/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { TSlot } from "../../../types";
import { toast } from "sonner";
import DeleteModal from "../../../components/Modal/DeleteModal";
import { useDeleteSlotMutation } from "../../../redux/api/admin/slotManagement.api";
import UpdateSlotModal from "../../../components/Modal/UpdateSlotModal";

interface ManageSlotRowProps {
  slot: TSlot;
  roomName: string;
  roomNo: string;
}

const ManageSlotRow: React.FC<ManageSlotRowProps> = ({ slot, roomName, roomNo }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteSlot] = useDeleteSlotMutation();

  const handleDelete = async () => {
  
    try {
      await deleteSlot(slot._id).unwrap();
      toast.success("Slot deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete slot.");
    }
    setIsDeleteModalOpen(false);
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(":");
    if (hours && minutes) {
      return new Date(0, 0, 0, parseInt(hours), parseInt(minutes)).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    }
    return "Invalid Time";
  };

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-100">
      <td className="py-3 px-6 text-left whitespace-nowrap">
        <span className="font-medium">{roomName}</span>
      </td>
      <td className="py-3 px-6 text-left">
        <span>{roomNo}</span>
      </td>
      <td className="py-3 px-6 text-left">
        <span>{new Date(slot.date).toLocaleDateString()}</span>
      </td>
      <td className="py-3 px-6 text-left">
        <span>{formatTime(slot.startTime)}</span>
      </td>
      <td className="py-3 px-6 text-left">
        <span>{formatTime(slot.endTime)}</span>
      </td>

      <td className="py-3 px-6 text-left">
        <span>{slot.isBooked  ? 'Booked' : 'Available'}</span>
      </td>
      <td className="py-3 px-6 text-left">
        <button onClick={() => setIsDialogOpen(true)} className="text-blue-500 hover:text-blue-700">
          Update
        </button>
        <UpdateSlotModal slotId={slot._id} isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} />
      </td>
      <td className="py-3 px-6 text-left">
        <button
          onClick={() => setIsDeleteModalOpen(true)}
          className="text-red-500 hover:text-red-700 transition duration-300"
        >
          Delete
        </button>
        <DeleteModal
          isOpen={isDeleteModalOpen}
          closeModal={() => setIsDeleteModalOpen(false)}
          modalHandler={handleDelete}
          id={slot._id}
        />
      </td>
    </tr>
  );
};

export default ManageSlotRow;
