import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { DatePicker } from "antd";
import { useGetUserByEmailQuery } from "../../redux/api/auth/authApi";
import { useGetAvailableSlotsQuery } from "../../redux/api/slot/slotApi";
import dayjs from "dayjs";
import { useCurrentUser } from "../../redux/features/authSlice";
import { setBookingData, TBooking } from "../../redux/features/bookingSlice";
import { TSlot } from "../../types";
import { motion } from "framer-motion";
import { generateBreadcrumbs } from "../../utils/getPageTitleData";
import Container from "../../components/Container/Container";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import useDebounce from "../../utils/useDebounce";

const Booking = () => {
  const { id: roomId } = useParams();
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(dayjs());
  const debouncedDate = useDebounce(selectedDate, 300);
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const user = useAppSelector(useCurrentUser);
  const { data: userData } = useGetUserByEmailQuery(user?.email);

  
  const { data: slotData, isLoading, refetch } = useGetAvailableSlotsQuery(
    {
      date: debouncedDate?.format("YYYY-MM-DD") || '',
      roomId: roomId || '',
    },
    { skip: !debouncedDate || !roomId, refetchOnFocus: true }
  );

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (debouncedDate && roomId) {
      refetch();
    }
  }, [debouncedDate, roomId, refetch]);

  console.log("Slot Data:", slotData);


  useEffect(() => {
    setSelectedSlots([]);
  }, [debouncedDate]);

  const handleSlotSelection = (slotId: string) => {
    setSelectedSlots((prevSlots) =>
      prevSlots.includes(slotId)
        ? prevSlots.filter((id) => id !== slotId)
        : [...prevSlots, slotId]
    );
  };

  const handleBookingConfirmation = () => {
    const payload: TBooking = {
      date: debouncedDate?.format("YYYY-MM-DD") || '',
      slots: selectedSlots,
      room: roomId as string,
      user: userData?.data?._id,
    };

    dispatch(setBookingData(payload));
    navigate("/checkout");
  };

  const breadcrumbItems = [
    { label: "Home", path: "/" },
    { label: "Booking", path: `/booking/${roomId}` },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-500"></div>
      </div>
    );
  }

  return (
    <Container>
      {generateBreadcrumbs(breadcrumbItems)}

      <motion.div
        className="border mt-5 border-gray-500 p-6 rounded-lg shadow-lg my-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-xl font-semibold mb-4">Select Booking Date</h2>
        <DatePicker
          key={selectedDate?.toString()}
          value={selectedDate}
          onChange={(date) => setSelectedDate(date || null)}
          format="YYYY/MM/DD"
          className="border border-gray-400 p-3 rounded-lg cursor-pointer w-full md:w-64"
        />

        {/* Display the selected date */}
      
        <h2 className="text-xl font-semibold mt-6 mb-4">Available Time Slots</h2>
        {slotData?.data && slotData.data.length > 0 ? (
          <motion.table 
            className="min-w-full bg-gray-100 shadow-md rounded-lg my-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left">Select</th>
                <th className="py-2 px-4 border-b text-left">Start Time</th>
                <th className="py-2 px-4 border-b text-left">End Time</th>
                <th className="py-2 px-4 border-b text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {slotData.data.map((slot: TSlot) => (
                <tr key={slot._id.toString()}>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="checkbox"
                      id={slot._id.toString()}
                      checked={selectedSlots.includes(slot._id.toString())}
                      onChange={() => handleSlotSelection(slot._id.toString())}
                    />
                  </td>
                  <td className="py-2 px-4 border-b">{slot.startTime}</td>
                  <td className="py-2 px-4 border-b">{slot.endTime}</td>
                  <td className="py-2 px-4 border-b">
                    {slot.isBooked ? (
                      <span className="text-red-500">(Booked)</span>
                    ) : (
                      <span className="text-green-500">(Available)</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </motion.table>
        ) : (
          <p className="text-gray-500">No available slots for this date.</p>
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

        <div className="mt-6 gap-2 flex justify-between">
          <motion.button
            onClick={handleBookingConfirmation}
            disabled={selectedSlots.length === 0}
            className={`bg-gray-600 text-white px-6 py-2 rounded-lg text-base md:text-lg font-semibold transition ${
              selectedSlots.length === 0
                ? "opacity-80 text-gray-500 cursor-not-allowed"
                : ""
            }`}
            whileHover={{ scale: selectedSlots.length === 0 ? 1 : 1.1 }}
          >
            Checkout
          </motion.button>
          <Link
            to={`/meeting-rooms/${roomId}`}
            className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg text-base md:text-lg font-semibold hover:bg-gray-300 transition"
          >
            Back to Room Details
          </Link>
        </div>
      </motion.div>
    </Container>
  );
};

export default Booking;
