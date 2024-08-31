/* eslint-disable @typescript-eslint/no-unused-vars */
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useGetRoomsQuery } from "../../../redux/api/admin/roomManagement.api";
import { useCreateSlotsMutation } from "../../../redux/api/admin/slotManagement.api";
import { Form, Select, DatePicker, TimePicker, Typography } from "antd";
import { Dayjs } from "dayjs";
import { TRoom } from "../../../types";
import Container from "../../../components/Container/Container";
import { generateBreadcrumbs } from "../../../utils/getPageTitleData";
import { useState } from "react";
import { TbFidgetSpinner } from "react-icons/tb";

const { Title } = Typography;
const { Option } = Select;

const slotValidationSchema = z.object({
  room: z.string().min(1, { message: "Room ID is required" }),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date" }),
  startTime: z.string().refine((val) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(val), {
    message: "Invalid time format",
  }),
  endTime: z.string().refine((val) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(val), {
    message: "Invalid time format",
  }),
});

const AddSlot = () => {
  const navigate = useNavigate();
  const {  handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(slotValidationSchema),
  });

  const [loading, setLoading] = useState(false);

  const { data: allRoom, isLoading } = useGetRoomsQuery(undefined);
  const [createSlot ] = useCreateSlotsMutation();

  

  const availableRooms = allRoom?.data.filter((room: TRoom) => !room.isDeleted);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await createSlot(data).unwrap();
      if (res?.success) {
        toast.success("Slot created successfully!");
        navigate("/dashboard/manage-slots");
      } else if (res?.error) {
        toast.error(res?.error.data.message);
      }
    } catch (err) {
      toast.error("Something went wrong.");
      console.error(err);
      setLoading(false);
    }
  };

  const handleSelectChange = (value: string) => {
    setValue("room", value);
  };

  const handleDateChange = (_date: Dayjs | null, dateString: string | string[]) => {
    if (Array.isArray(dateString)) {
      dateString = dateString[0]; 
    }
    setValue("date", dateString);
  };

  const handleTimeChange = (_time: Dayjs | null, timeString: string | string[], name: string) => {
    if (Array.isArray(timeString)) {
      timeString = timeString[0]; 
    }
    setValue(name, timeString);
  };
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
             <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-500"></div>
           </div>
    );
  }
  const breadcrumbItems = [
    { label: "Home", path: "/" },
    { label: "Dashboard", path: '/dashboard' },
    { label: "Add Slot", path: '/dashboard/add-slot' },
    
  ];

  return (
    <Container>
        {generateBreadcrumbs(breadcrumbItems)}
        
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-3xl mx-auto p-6 space-y-6">
        <Title level={3} className="text-center text-gray-800">Create Slot</Title>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1 text-sm">
            <label htmlFor="room" className="block text-gray-600">Room</label>
            <Form.Item
              validateStatus={errors.room ? "error" : ""}
              help={errors.room?.message as string}
            >
              <Select
                id="room"
                placeholder="Select a Room"
                onChange={handleSelectChange}
                className="w-full text-gray-800 border border-gray-300 rounded-md"
                dropdownClassName="!border-gray-300"
              >
                {availableRooms?.map((room: TRoom) => (
                  <Option key={room._id} value={room._id}>
                    {`${room.name} - $${room.pricePerSlot}`}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          <div className="space-y-1 text-sm">
            <label htmlFor="date" className="block text-gray-600">Date</label>
            <Form.Item
              validateStatus={errors.date ? "error" : ""}
              help={errors.date?.message as string}
            >
              <DatePicker
                id="date"
                style={{ width: "100%" }}
                onChange={handleDateChange}
                className="w-full text-gray-800 border border-gray-300 rounded-md"
              />
            </Form.Item>
          </div>

          <div className="space-y-1 text-sm">
            <label htmlFor="startTime" className="block text-gray-600">Start Time</label>
            <Form.Item
              validateStatus={errors.startTime ? "error" : ""}
              help={errors.startTime?.message as string}
            >
              <TimePicker
                id="startTime"
                format="HH:mm"
                style={{ width: "100%" }}
                onChange={(time, timeString) => handleTimeChange(time, timeString, "startTime")}
                className="w-full text-gray-800 border border-gray-300 rounded-md"
              />
            </Form.Item>
          </div>

          <div className="space-y-1 text-sm">
            <label htmlFor="endTime" className="block text-gray-600">End Time</label>
            <Form.Item
              validateStatus={errors.endTime ? "error" : ""}
              help={errors.endTime?.message as string}
            >
              <TimePicker
                id="endTime"
                format="HH:mm"
                style={{ width: "100%" }}
                onChange={(time, timeString) => handleTimeChange(time, timeString, "endTime")}
                className="w-full text-gray-800 border border-gray-300 rounded-md"
              />
            </Form.Item>
          </div>
        </div>

        <Form.Item>
        <button  type="submit" className="w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-slate-600">
            
            {loading ? (
            <TbFidgetSpinner className="m-auto animate-spin" size={24} />
          ) : (
            'Create Slot'
          )}
          </button>
        </Form.Item>
      </form>
    </Container>
  );
};

export default AddSlot;
