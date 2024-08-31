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

const Booking = () => {

  const { id: roomId } = useParams();
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(dayjs()); 
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const user = useAppSelector(useCurrentUser);
  const { data: userData } = useGetUserByEmailQuery(user?.email);
  const { data: slotData, isLoading, refetch } = useGetAvailableSlotsQuery(
    {
      date: selectedDate?.format("YYYY-MM-DD") || '',
      roomId: roomId || '', 
    },
    { skip: !selectedDate || !roomId }
  );

  console.log(slotData)

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedDate && roomId) {
      refetch();
    }
  }, [selectedDate, roomId, refetch]);

  const handleSlotSelection = (slotId: string) => {
    setSelectedSlots((prevSlots) =>
      prevSlots.includes(slotId)
        ? prevSlots.filter((id) => id !== slotId)
        : [...prevSlots, slotId]
    );
  };

  const handleBookingConfirmation = () => {
    const payload: TBooking = {
      date: selectedDate?.format("YYYY-MM-DD") || '',
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
    { label:  "Loading..." }
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
        className="border mt-5 border-gray-500 p-6 rounded-lg shadow-lg"
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

        <h2 className="text-xl font-semibold mt-6 mb-4">Available Time Slots</h2>
        {slotData?.data && slotData.data.length > 0 ? (
          <motion.ul 
            className="list-disc pl-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {slotData.data.map((slot: TSlot) => (
              <motion.li 
                key={slot._id.toString()} 
                className="mb-2"
                whileHover={{ scale: 1.05 }}
              >
                <input
                  type="checkbox"
                  id={slot._id.toString()}
                  checked={selectedSlots.includes(slot._id.toString())}
                  onChange={() => handleSlotSelection(slot._id.toString())}
                />
                <label htmlFor={slot._id.toString()} className="ml-2">
                  {slot.startTime} - {slot.endTime}
                </label>
                {slot.isBooked ? (
                  <span className="text-red-500 ml-4">(Booked)</span>
                ) : (
                  <span className="text-green-500 ml-4">(Available)</span>
                )}
              </motion.li>
            ))}
          </motion.ul>
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
