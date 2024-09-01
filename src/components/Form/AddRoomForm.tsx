import { FormEventHandler } from 'react';
import { UseFormRegister, FieldErrors, Controller, Control } from 'react-hook-form';
import { TbFidgetSpinner } from 'react-icons/tb';
import { FormValues } from '../../types/index';
import { Select } from 'antd';

interface AddRoomFormProps {
  onSubmit?: FormEventHandler<HTMLFormElement> | undefined;
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
  loading: boolean;
  control: Control<FormValues>;
}

const AddRoomForm: React.FC<AddRoomFormProps> = ({ onSubmit, register, errors, loading, control }) => {
  const amenitiesOptions = [
    { label: "Computer", value: "Computer" },
    { label: "Sound System", value: "Sound System" },
    { label: "Wifi", value: "Wifi" },
    { label: "Micro Phone", value: "Micro Phone" },
    { label: "White Board", value: "White Board" },
  ];

  return (
    <div className="w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-slate-800 rounded-xl bg-gray-200 my-6">
      <form onSubmit={onSubmit} className="space-y-6 w-full max-w-2xl p-6">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 w-full gap-2">
          <div className="space-y-1 text-sm">
            <label htmlFor="name" className="block text-slate-600">Name</label>
            <input
              className="w-full px-4 py-3 text-slate-800 border border-slate-300 focus:outline-slate-500 rounded-md"
              {...register("name", { required: "Name is required" })}
              id="name"
              type="text"
              placeholder="Room Name"
            />
            {errors.name && <p className="text-red-600">{errors.name.message}</p>}
          </div>

          <div className="space-y-1 text-sm">
            <label htmlFor="category" className="block text-gray-600">Category</label>
            <select
              className="w-full px-4 py-3 text-slate-800 border border-slate-300 focus:outline-slate-500 rounded-md"
              {...register("category", { required: "Category is required" })}
              id="category"
            >
              <option value="">Select Category</option>
              <option value="featured">Featured</option>
              <option value="regular">Regular</option>
            </select>
            {errors.category && <p className="text-red-600">{errors.category.message}</p>}
          </div>
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 w-full gap-2">
          <div className="space-y-1 text-sm">
            <label htmlFor="roomNo" className="block text-slate-600">Room Number</label>
            <input
              className="w-full px-4 py-3 text-slate-800 border border-slate-300 focus:outline-slate-500 rounded-md"
              {...register("roomNo", { required: "Room number is required", valueAsNumber: true })}
              id="roomNo"
              type="number"
              placeholder="Room Number"
            />
            {errors.roomNo && <p className="text-red-600">{errors.roomNo.message}</p>}
          </div>

          <div className="space-y-1 text-sm">
            <label htmlFor="floorNo" className="block text-slate-600">Floor Number</label>
            <input
              className="w-full px-4 py-3 text-slate-800 border border-slate-300 focus:outline-slate-500 rounded-md"
              {...register("floorNo", { required: "Floor number is required", valueAsNumber: true })}
              id="floorNo"
              type="number"
              placeholder="Floor Number"
            />
            {errors.floorNo && <p className="text-red-600">{errors.floorNo.message}</p>}
          </div>
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 w-full gap-2">
          <div className="space-y-1 text-sm">
            <label htmlFor="capacity" className="block text-slate-600">Capacity</label>
            <input
              className="w-full px-4 py-3 text-slate-800 border border-slate-300 focus:outline-slate-500 rounded-md"
              {...register("capacity", { required: "Capacity is required", valueAsNumber: true })}
              id="capacity"
              type="number"
              placeholder="Capacity"
            />
            {errors.capacity && <p className="text-red-600">{errors.capacity.message}</p>}
          </div>

          <div className="space-y-1 text-sm">
            <label htmlFor="pricePerSlot" className="block text-slate-600">Price Per Slot</label>
            <input
              className="w-full px-4 py-3 text-slate-800 border border-slate-300 focus:outline-slate-500 rounded-md"
              {...register("pricePerSlot", { required: "Price per slot is required", valueAsNumber: true })}
              id="pricePerSlot"
              type="number"
              placeholder="Price Per Slot"
            />
            {errors.pricePerSlot && <p className="text-red-600">{errors.pricePerSlot.message}</p>}
          </div>
        </div>

        {/* Amenities Multi-Select Field */}
        <div className="space-y-1 text-sm">
          <label htmlFor="amenities" className="block text-slate-600">Amenities</label>
          <Controller
            name="amenities"
            control={control}
            rules={{ required: "Amenities are required" }}
            render={({ field }) => (
              <Select
                {...field}
                mode="multiple"
                allowClear
                style={{ width: '100%' }}
                placeholder="Select Amenities"
                options={amenitiesOptions}
              />
            )}
          />
          {errors.amenities && <p className="text-red-600">{errors.amenities.message}</p>}
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 w-full gap-2">
          <div className="space-y-1 text-sm">
            <label htmlFor="photo" className="block text-slate-600">Photo</label>
            <input
              className="w-full px-4 py-3 text-slate-800 border border-slate-300 focus:outline-slate-500 rounded-md"
              {...register("photo", { required: "Photo is required" })}
              id="photo"
              type="url"
              placeholder="Photo URL"
            />
            {errors.photo && <p className="text-red-600">{errors.photo.message}</p>}
          </div>

          <div className="space-y-1 text-sm">
            <label htmlFor="extraPhoto" className="block text-slate-600">Extra Photo</label>
            <input
              className="w-full px-4 py-3 text-slate-800 border border-slate-300 focus:outline-slate-500 rounded-md"
              {...register("extraPhoto", { required: "Extra photo is required" })}
              id="extraPhoto"
              type="url"
              placeholder="Extra Photo URL"
            />
            {errors.extraPhoto && <p className="text-red-600">{errors.extraPhoto.message}</p>}
          </div>
        </div>

        <button
          type="submit"
          className="w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-slate-600"
        >
          {loading ? (
            <TbFidgetSpinner className="m-auto animate-spin" size={24} />
          ) : (
            'Save & Continue'
          )}
        </button>
      </form>
    </div>
  );
};

export default AddRoomForm;
