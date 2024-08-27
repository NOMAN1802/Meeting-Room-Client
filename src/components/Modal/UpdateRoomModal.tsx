/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import Modal from '../../components/Modal/Modal'; 
import UpdateRoomForm from '../Form/UpdateRoomForm';
import { toast } from 'sonner';
import { useUpdateRoomMutation } from '../../redux/api/admin/roomManagement.api';
import { TRoom } from '../../types/index';

interface UpdateRoomModalProps {
  isOpen: boolean;
  setIsEditModalOpen: (isOpen: boolean) => void;
  room: TRoom;
  id: string;
}

const UpdateRoomModal = ({ isOpen, setIsEditModalOpen, room, id }: UpdateRoomModalProps) => {
  const [loading, setLoading] = useState(false);
  const [updateRoom] = useUpdateRoomMutation();

  const handleSubmit = async (data: TRoom) => {
    setLoading(true);
    try {
      await updateRoom({ id, data }).unwrap();
      toast.success("Room updated successfully");
      setIsEditModalOpen(false);
    } catch (error) {
      toast.error("Failed to update room");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsEditModalOpen}
      title="Update Room"
    >
      <UpdateRoomForm
        onSubmit={handleSubmit}
        defaultValues={room}
        loading={loading}
      />
    </Modal>
  );
};

export default UpdateRoomModal;
