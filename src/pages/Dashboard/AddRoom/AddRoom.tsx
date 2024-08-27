/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { FormValues, TRoom } from '../../../types';
import AddRoomForm from '../../../components/Form/AddRoomForm';
import { useAddRoomMutation } from '../../../redux/api/admin/roomManagement.api';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../../../components/PageTitle/PageTitle';


const AddRoom = () => {
  const { register, handleSubmit, formState: { errors }, control } = useForm<FormValues>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [addRoom] = useAddRoomMutation();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoading(true);

   

    try {
      const roomData: TRoom = {
        ...data,
        pricePerSlot: parseFloat(data.pricePerSlot.toString()),
        
      };

      await addRoom(roomData).unwrap();
      toast.success('Room Successfully Added');
      console.log('inside form submission', roomData);
      navigate('/dashboard/manage-rooms');
    } catch (err) {
      console.error(err);
      toast.error('Failed to add room');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageTitle heading="Add Room" subHeading="Add Rooms" />
      <AddRoomForm 
           onSubmit={handleSubmit(onSubmit)} 
           register={register}
           errors={errors}
           control={control}
           loading={loading} 
      />
    </div>
  );
};

export default AddRoom;
