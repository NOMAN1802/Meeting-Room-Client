/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { FormValues } from '../../../types';
import AddRoomForm from '../../../components/Form/AddRoomForm';
import { useAddRoomMutation } from '../../../redux/api/admin/roomManagement.api';
import { useNavigate } from 'react-router-dom';
import { generateBreadcrumbs } from '../../../utils/getPageTitleData';
import PageTitle from '../../../components/PageTitle/PageTitle';

type TRoom ={ pricePerSlot: number; name: string; photo: string; extraPhoto: string; category: "featured" | "regular"; roomNo: number; floorNo: number; capacity: number; amenities: string[]; }

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
 
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
             <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-500"></div>
           </div>
    );
  }
  const breadcrumbItems = [
    { label: "Home", path: "/" },
    { label: "Dashboard", path: '/dashboard' },
    { label: "Add Rooms", path: '/dashboard/add-room' },
    
  ];
  return (
    <div>
      {generateBreadcrumbs(breadcrumbItems)}

      <PageTitle heading='Add Room' subHeading='Add room for slot booking'/>
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
