import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Button } from "antd";
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
        window.location.href = res.data.payment_url;
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
              
              
              <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                <img
                  src={singleRoom?.data.photo}
                  alt={singleRoom?.data.name}
                  className="w-full h-full rounded-lg"
                />
                </div>

                <motion.table 
                className="min-w-full bg-gray-100 shadow-md rounded my-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 px-4 font-semibold"><BsFillCalendar2DateFill className="mr-2 text-gray-600 inline-block" /> Date:</td>
                    <td className="py-2 px-4">{bookedData?.bookingData?.date}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4 font-semibold"><IoIosTime className="mr-2 text-gray-600 inline-block" /> Time:</td>
                    <td className="py-2 px-4">
                      {bookedSlots?.map((slot: Slot, index: number) => (
                        <span key={index}>
                          {slot.startTime} - {slot.endTime}
                          {index < bookedSlots?.length - 1 ? " & " : ""}
                        </span>
                      ))}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4 font-semibold"><FaRegMoneyBillAlt className="mr-2 text-gray-600 inline-block" /> Per Slot:</td>
                    <td className="py-2 px-4">${singleRoom?.data.pricePerSlot}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4 font-semibold"><FaRegMoneyBillAlt className="mr-2 text-gray-600 inline-block" /> Total Cost:</td>
                    <td className="py-2 px-4">${totalPrice}</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 font-semibold">Room Name:</td>
                    <td className="py-2 px-4">{singleRoom?.data.name}</td>
                  </tr>
                </tbody>
              </motion.table>
              </div>
            </div>
          )}

          <h2 className="text-xl font-semibold mt-6 mb-4">Your Details</h2>

          {userData ? (
            <motion.table 
              className="min-w-full bg-gray-100 shadow-md rounded my-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <tbody>
                <tr className="border-b">
                  <td className="py-2 px-4 font-semibold"><FaUser className="mr-2 text-gray-600 inline-block" /> Name:</td>
                  <td className="py-2 px-4">{userData.data?.name}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4 font-semibold"><FaEnvelope className="mr-2 text-gray-600 inline-block" /> Email:</td>
                  <td className="py-2 px-4">{userData.data?.email}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4 font-semibold"><FaPhone className="mr-2 text-gray-600 inline-block" /> Phone:</td>
                  <td className="py-2 px-4">{userData.data?.phone}</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 font-semibold"><FaMapMarkerAlt className="mr-2 text-gray-600 inline-block" /> Address:</td>
                  <td className="py-2 px-4">{userData.data?.address}</td>
                </tr>
              </tbody>
            </motion.table>
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
              className="bg-gray-700 text-white"
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
