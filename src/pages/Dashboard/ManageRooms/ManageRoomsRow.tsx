/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import DeleteModal from '../../../components/Modal/DeleteModal';
import { FaSync, FaTrash } from 'react-icons/fa';
import { toast } from 'sonner';
import { useDeleteRoomMutation } from '../../../redux/api/admin/roomManagement.api';
import { TRoom } from '../../../types/index';
import UpdateRoomModal from '../../../components/Modal/UpdateRoomModal';

interface ManageRoomRowProps {
  room: TRoom;
}

const ManageRoomsRow: React.FC<ManageRoomRowProps> = ({ room }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deleteRoom] = useDeleteRoomMutation();

  const closeModal = () => {
    setIsOpen(false);
  };

  const modalHandler = (item: any) => {
    deleteRoom(item._id);
    toast.success('Room deleted successfully');
    closeModal();
  };

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-300">
      <td className="py-3 px-6 text-left">
        <div className="flex items-center">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img
                className="w-full h-full object-cover rounded-full"
                src={room?.photo}
                alt="Room Image"
              />
            </div>
          </div>
        </div>
      </td>
      <td className="py-3 px-6 text-left">{room?.name}</td>
      <td className="py-3 px-6 text-left">{room?.category}</td>
      <td className="py-3 px-6 text-left">{room?.capacity}</td>
      <td className="py-3 px-6 text-left">${room?.pricePerSlot.toFixed(2)}</td>
      <td className="py-3 px-6 text-left">
        <button
          onClick={() => setIsOpen(true)}
          className="text-gray-500 hover:text-gray-600"
        >
          <FaTrash className="inline-block" /> Delete
        </button>
        <DeleteModal
          isOpen={isOpen}
          closeModal={closeModal}
          modalHandler={() => modalHandler(room)}
          id={room._id}
        />
      </td>
      <td className="py-3 px-6 text-left">
        <button
          onClick={() => setIsEditModalOpen(true)}
          className="text-gray-500 hover:text-gray-600"
        >
          <FaSync className="inline-block" /> Update
        </button>
       
        <UpdateRoomModal
          isOpen={isEditModalOpen}
          setIsEditModalOpen={setIsEditModalOpen}
          room={room}
          id={room._id}
        />
      </td>
    </tr>
  );
};

export default ManageRoomsRow;
