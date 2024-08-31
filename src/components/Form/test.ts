// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { useState, useEffect } from "react";
// import { Modal, Form, Select, DatePicker, TimePicker, Typography } from "antd";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import z from "zod";
// import dayjs, { Dayjs } from "dayjs";
// import { useUpdateSlotMutation, useGetSlotByIdQuery, useGetSingleSlotQuery } from "../../redux/api/admin/slotManagement.api";
// import { TRoom } from "../../types";
// import { toast } from "sonner";
// import { useGetRoomsQuery } from "../../redux/api/admin/roomManagement.api";

// const { Title } = Typography;
// const { Option } = Select;

// // Validation schema
// const slotValidationSchema = z.object({
//   room: z.string().min(1, { message: "Room ID is required" }),
//   date: z.string().refine((val) => dayjs(val).isValid(), { message: "Invalid date" }),
//   startTime: z.string().refine((val) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(val), {
//     message: "Invalid time format",
//   }),
//   endTime: z.string().refine((val) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(val), {
//     message: "Invalid time format",
//   }),
// });

// interface UpdateSlotModalProps {
//   slotId: string;
//   visible: boolean;
//   onCancel: () => void;
//   onOk: () => void;
// }

// const UpdateSlotModal: React.FC<UpdateSlotModalProps> = ({ slotId, visible, onCancel, onOk }) => {
//   const [loading, setLoading] = useState(false);
//   const { data: slotData } = useGetSingleSlotQuery(slotId);
//   const { data: allRooms } = useGetRoomsQuery(undefined);
//   const [updateSlot] = useUpdateSlotMutation();

//   const { handleSubmit, setValue, formState: { errors } } = useForm({
//     resolver: zodResolver(slotValidationSchema),
//   });

//   useEffect(() => {
//     if (slotData) {
//       setValue("room", slotData.room._id);
//       setValue("date", dayjs(slotData.date).format("YYYY-MM-DD"));
//       setValue("startTime", dayjs(slotData.startTime).format("HH:mm"));
//       setValue("endTime", dayjs(slotData.endTime).format("HH:mm"));
//     }
//   }, [slotData, setValue]);

//   const handleDateChange = (_date: Dayjs | null, dateString: string) => {
//     const dateValue = dayjs(dateString);
//     if (dateValue.isValid()) {
//       setValue("date", dateValue.format("YYYY-MM-DD"));
//     }
//   };

//   const handleTimeChange = (_time: Dayjs | null, timeString: string, name: string) => {
//     const timeValue = dayjs(timeString, "HH:mm");
//     if (timeValue.isValid()) {
//       setValue(name, timeValue.format("HH:mm"));
//     }
//   };

//   const onSubmit = async (data: any) => {
//     try {
//       setLoading(true);
//       const res = await updateSlot({ slotId, ...data }).unwrap();
//       if (res?.success) {
//         toast.success("Slot updated successfully!");
//         onOk();
//       } else if (res?.error) {
//         toast.error(res?.error.data.message);
//       }
//     } catch (err) {
//       toast.error("Something went wrong.");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const availableRooms = allRooms?.data.filter((room: TRoom) => !room.isDeleted);

//   return (
//     <Modal
//       title="Update Slot"
//       visible={visible}
//       onCancel={onCancel}
//       onOk={handleSubmit(onSubmit)}
//       confirmLoading={loading}
//       okText="Update"
//     >
//       <form className="space-y-6">
//         <Title level={5} className="text-gray-800">Room</Title>
//         <Form.Item
//           validateStatus={errors.room ? "error" : ""}
//           help={errors.room?.message as string}
//         >
//           <Select
//             placeholder="Select a Room"
//             onChange={(value) => setValue("room", value)}
//             className="w-full text-gray-800"
//             dropdownClassName="!border-gray-300"
//           >
//             {availableRooms?.map((room: TRoom) => (
//               <Option key={room._id} value={room._id}>
//                 {`${room.name} - $${room.pricePerSlot}`}
//               </Option>
//             ))}
//           </Select>
//         </Form.Item>

//         <Title level={5} className="text-gray-800">Date</Title>
//         <Form.Item
//           validateStatus={errors.date ? "error" : ""}
//           help={errors.date?.message as string}
//         >
//           <DatePicker
//             style={{ width: "100%" }}
//             onChange={handleDateChange}
//             defaultValue={dayjs(slotData?.date)}
//             className="w-full text-gray-800"
//           />
//         </Form.Item>

//         <Title level={5} className="text-gray-800">Start Time</Title>
//         <Form.Item
//           validateStatus={errors.startTime ? "error" : ""}
//           help={errors.startTime?.message as string}
//         >
//           <TimePicker
//             format="HH:mm"
//             style={{ width: "100%" }}
//             onChange={(time, timeString) => handleTimeChange(time, timeString, "startTime")}
//             defaultValue={dayjs(slotData?.startTime, "HH:mm")}
//             className="w-full text-gray-800"
//           />
//         </Form.Item>

//         <Title level={5} className="text-gray-800">End Time</Title>
//         <Form.Item
//           validateStatus={errors.endTime ? "error" : ""}
//           help={errors.endTime?.message as string}
//         >
//           <TimePicker
//             format="HH:mm"
//             style={{ width: "100%" }}
//             onChange={(time, timeString) => handleTimeChange(time, timeString, "endTime")}
//             defaultValue={dayjs(slotData?.endTime, "HH:mm")}
//             className="w-full text-gray-800"
//           />
//         </Form.Item>
//       </form>
//     </Modal>
//   );
// };

// export default UpdateSlotModal;


// import { Controller, useForm } from 'react-hook-form';
// import { TbFidgetSpinner } from 'react-icons/tb';
// import { Select, DatePicker, TimePicker } from 'antd';
// import { TSlot } from '../../types/index';
// import dayjs from 'dayjs';

// interface UpdateSlotFormProps {
//   onSubmit: (data: TSlot) => void;
//   defaultValues: TSlot;
//   loading: boolean;
// }

// const UpdateSlotForm: React.FC<UpdateSlotFormProps> = ({ onSubmit, defaultValues, loading }) => {
//   const { register, handleSubmit, control, formState: { errors } } = useForm<TSlot>({
//     defaultValues,
//   });

//   return (
//     <div className="w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50">
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full max-w-2xl p-6">
//         <div className="grid sm:grid-cols-1 md:grid-cols-2 w-full gap-2">
//           <div className="space-y-1 text-sm">
//             <label htmlFor="roomNo" className="block text-gray-600">Room Number</label>
//             <input
//               className="w-full px-4 py-3 text-gray-800 border border-gray-300 focus:outline-gray-500 rounded-md"
//               {...register("roomNo", { required: "Room number is required", valueAsNumber: true })}
//               id="roomNo"
//               type="number"
//               placeholder="Room Number"
//             />
//             {errors.roomNo && <p className="text-red-600">{errors.roomNo.message}</p>}
//           </div>

//           <div className="space-y-1 text-sm">
//             <label htmlFor="date" className="block text-gray-600">Date</label>
//             <Controller
//               name="date"
//               control={control}
//               rules={{ required: "Date is required" }}
//               render={({ field }) => (
//                 <DatePicker
//                   {...field}
//                   className="w-full"
//                   format="YYYY-MM-DD"
//                   placeholder="Select Date"
//                   onChange={(date) => field.onChange(date ? dayjs(date).toISOString() : '')}
//                 />
//               )}
//             />
//             {errors.date && <p className="text-red-600">{errors.date.message}</p>}
//           </div>
//         </div>

//         <div className="grid sm:grid-cols-1 md:grid-cols-2 w-full gap-2">
//           <div className="space-y-1 text-sm">
//             <label htmlFor="startTime" className="block text-gray-600">Start Time</label>
//             <Controller
//               name="startTime"
//               control={control}
//               rules={{ required: "Start time is required" }}
//               render={({ field }) => (
//                 <TimePicker
//                   {...field}
//                   className="w-full"
//                   format="HH:mm"
//                   placeholder="Select Start Time"
//                   onChange={(time) => field.onChange(time ? dayjs(time).toISOString() : '')}
//                 />
//               )}
//             />
//             {errors.startTime && <p className="text-red-600">{errors.startTime.message}</p>}
//           </div>

//           <div className="space-y-1 text-sm">
//             <label htmlFor="endTime" className="block text-gray-600">End Time</label>
//             <Controller
//               name="endTime"
//               control={control}
//               rules={{ required: "End time is required" }}
//               render={({ field }) => (
//                 <TimePicker
//                   {...field}
//                   className="w-full"
//                   format="HH:mm"
//                   placeholder="Select End Time"
//                   onChange={(time) => field.onChange(time ? dayjs(time).toISOString() : '')}
//                 />
//               )}
//             />
//             {errors.endTime && <p className="text-red-600">{errors.endTime.message}</p>}
//           </div>
//         </div>

//         <button
//           type="submit"
//           className="w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-gray-600"
//         >
//           {loading ? (
//             <TbFidgetSpinner className="m-auto animate-spin" size={24} />
//           ) : (
//             'Save & Continue'
//           )}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default UpdateSlotForm;

