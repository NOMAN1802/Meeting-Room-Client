import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Button, Select } from "antd";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { IoIosTime } from "react-icons/io";
import { BsFillCalendar2DateFill } from "react-icons/bs";
import { useState } from "react";
import { useAddBookingsMutation } from "../../redux/api/booking/bookingApi";
import { useGetUserByEmailQuery } from "../../redux/api/auth/authApi";
import { useGetSingleRoomQuery } from "../../redux/api/admin/roomManagement.api";
import { clearBookingData } from "../../redux/features/bookingSlice";
import { useGetAvailableSlotsQuery } from "../../redux/api/slot/slotApi";
import { TRoom, TSlot } from "../../types";
import Container from "../../components/Container/Container";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa"
import { generateBreadcrumbs } from "../../utils/getPageTitleData";
import { useNavigate } from "react-router-dom";

type Slot = {
  startTime: string;
  endTime: string;
};

const Checkout = () => {
  const bookedData = useAppSelector((state) => state.booking);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [addBookings] = useAddBookingsMutation();
  const navigate = useNavigate()
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.auth.user);
  const { data: userData } = useGetUserByEmailQuery(user?.email);

  const roomId = bookedData?.bookingData?.room;

  const { data: singleRoom, isLoading } = useGetSingleRoomQuery(roomId);

  // Available slots
  const { data: slotData, isLoading: isSlotLoading } = useGetAvailableSlotsQuery({
    date: bookedData?.bookingData?.date,
    roomId,
  });

  if (isSlotLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-600"></div>
      </div>
    );
  }

  // Filter and map the data
  const availableSlots = slotData?.data.filter((room: TRoom) => !room.isBooked);
  const bookedSlots = availableSlots
    ?.filter((slot: TSlot) => bookedData?.bookingData?.slots?.includes(slot._id))
    .map((slot: TSlot) => ({
      startTime: slot.startTime,
      endTime: slot.endTime,
    }));

  const bookingDate = bookedData?.bookingData?.date || "";

  const handleConfirmBooking = async () => {
    try {
      const data = bookedData?.bookingData;
      const res = await addBookings(data).unwrap();
      if (res?.success) {
        setBookingConfirmed(true);
        dispatch(clearBookingData());
      }
    } catch (error) {
      console.error("Booking failed:", error);
    }
  };

  const handleCancelBooking = () => {
    navigate(`/booking/${roomId}`);
  };

  const totalPrice = (bookedData?.bookingData?.slots?.length ?? 0) * (singleRoom?.data.pricePerSlot || 0);
  
  const breadcrumbItems = [
    { label: "Home", path: "/" },
    { label: "Checkout", path: '/checkout' },
    
  ];

  return (
    <Container>
        {generateBreadcrumbs(breadcrumbItems)}
      {bookedData?.bookingData ? (
        <div className="bg-gray-200 p-6 rounded-lg shadow-md">
          
          {isLoading ? (
             <div className="flex justify-center items-center h-screen">
             <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-500"></div>
           </div>
          ) : (
            <div>
              <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
              <img
                src={singleRoom?.data.photo}
                alt={singleRoom?.data.name}
                className="w-full h-full \ rounded-lg mb-4"
              />

               <img
                src={singleRoom?.data.extraPhoto}
                alt={singleRoom?.data.name}
                className="w-full h-full rounded-lg mb-4"
              />
              </div>
              <div className="flex items-center gap-4">
                <p className="font-medium text-gray-600 my-4">
                  {singleRoom?.data.name}
                </p>
                <p className="flex items-center gap-2">
                  <BsFillCalendar2DateFill className="text-xl text-gray-600" />{" "}
                  {bookedData?.bookingData?.date}
                </p>
              </div>
              <p className="flex items-center gap-2">
                <IoIosTime className="text-2xl text-gray-600" /> <h2>Time:</h2>{" "}
                {bookedSlots?.map((slot: Slot, index: number) => (
                  <span key={index}>
                    {slot.startTime} - {slot.endTime}
                    {index < bookedSlots?.length - 1 ? " & " : ""}
                  </span>
                ))}
              </p>
              <p className="font-medium mt-3 mb-2 flex items-center gap-2 text-[#455e45]">
                <FaRegMoneyBillAlt className="text-2xl text-gray-600" />
                Per Slot: ${singleRoom?.data.pricePerSlot}
              </p>
              <p className="font-medium flex items-center gap-2 text-gray-600">
                <FaRegMoneyBillAlt className="text-2xl text-gray-600" />
                Total Cost: ${totalPrice}
              </p>
            </div>
          )}
          <div className="bg-gray-100 md:w-3/12 p-2 mt-5 rounded-lg mb-4">
            <p>
              <strong>Payment Method:</strong>
            </p>
            <Select className="border mt-2 rounded-lg w-full" defaultValue="cod">
              <Select.Option value="cod">Cash Payment</Select.Option>
              <Select.Option value="aamarpay">Aamar Pay</Select.Option>
            </Select>
          </div>

          <h2 className="text-xl font-semibold mt-6 mb-4">Your Details</h2>
           
          {userData ? (
  <motion.ul
    className="bg-gray-100 p-4 rounded-lg grid gap-4"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5, delay: 0.4 }}
  >
    <motion.li
      initial={{ y: 0 }}
      animate={{ y: [0, -10, 0] }}
      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay: 0 }}
      className="flex items-center rounded p-2 text-sm font-semibold transition duration-200 ease-in-out border border-gray-300 bg-gray-200"
    >
      <FaUser className="mr-2 text-gray-600" />
      <strong className="mr-1">Name:</strong> {userData.data?.name}
    </motion.li>
    <motion.li
      initial={{ y: 0 }}
      animate={{ y: [0, -10, 0] }}
      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay: 0.2 }}
      className="flex items-center rounded p-2 text-sm font-semibold transition duration-200 ease-in-out border border-gray-300 bg-gray-200"
    >
      <FaEnvelope className="mr-2 text-gray-600" />
      <strong className="mr-1">Email:</strong> {userData.data?.email}
    </motion.li>
    <motion.li
      initial={{ y: 0 }}
      animate={{ y: [0, -10, 0] }}
      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay: 0.4 }}
      className="flex items-center rounded p-2 text-sm font-semibold transition duration-200 ease-in-out border border-gray-300 bg-gray-200"
    >
      <FaPhone className="mr-2 text-gray-600" />
      <strong className="mr-1">Phone:</strong> {userData.data?.phone}
    </motion.li>
    <motion.li
      initial={{ y: 0 }}
      animate={{ y: [0, -10, 0] }}
      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay: 0.6 }}
      className="flex items-center rounded p-2 text-sm font-semibold transition duration-200 ease-in-out border border-gray-300 bg-gray-200"
    >
      <FaMapMarkerAlt className="mr-2 text-gray-600" />
      <strong className="mr-1">Address:</strong> {userData.data?.address}
    </motion.li>
  </motion.ul>
  ) : (
   <p className="text-gray-500">User information not available.</p>
   )}
          <div className="flex justify-between mt-6">

          <Button
              type="default"
              onClick={handleCancelBooking}
              className="ml-4 bg-red-400"
            >
              Cancel Booking
            </Button>

            <Button
              type="default"
              onClick={handleConfirmBooking}
              
              className=" bg-gray-700 text-white"
            >
              Confirm Booking
            </Button>

          
          </div>
        </div>
      ) : (
        <h2 className="text-3xl mt-5 mb-2 font-medium tracking-wider text-center">
          There is no booking history
        </h2>
      )}

      {bookingConfirmed && (
        <div className="bg-white p-6 rounded-lg shadow-md mt-8">
          <h2 className="text-2xl font-semibold mb-4">Booking Confirmation</h2>
          <p>
            Your slot{bookedSlots?.length > 1 ? "s" : ""} for{" "}
            {singleRoom?.data.name} on {bookingDate} at{" "}
            {bookedSlots.map((slot: Slot, index: number) => (
              <span key={index}>
                {slot.startTime} - {slot.endTime}
                {index < bookedSlots?.length - 1 ? ", " : ""}
              </span>
            ))}{" "}
            has been successfully booked. Thank you for choosing us!
          </p>
          <div className="flex justify-end mt-4">
            <Button
              onClick={() => setBookingConfirmed(false)}
              className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-[#5761ca] transition"
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </Container>
  );
};

export default Checkout;
