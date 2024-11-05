import { Progress } from "antd";
import { useMyBookingsQuery } from "../../redux/api/booking/bookingApi";
import { useCurrentUser } from "../../redux/features/authSlice";
import { useAppSelector } from "../../redux/hooks";
import { TBooking } from "../../types";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import AnimatedText from "../AnimatedText/AnimatedText";


const UserDashboard = () => {
    const user = useAppSelector(useCurrentUser);
    const { data: bookings, isLoading: loadingBookings } = useMyBookingsQuery(undefined);
    console.log(bookings)
  
    const totalBookings = bookings?.data.length || 0;
  const userBookingData = bookings?.data || [];
  const confirmedBookings = userBookingData?.filter((booking :TBooking) => booking.isConfirmed === "confirmed")?.length;
  const progressPercentage = totalBookings > 0 ? (confirmedBookings / totalBookings) * 100 : 0;
  const totalCost = bookings?.data.reduce((acc :any, booking : TBooking) => acc + booking.totalAmount, 0) || 0;  
    if (loadingBookings ) {
        return <div className="flex justify-center items-center h-screen text-yellow-300">Loading...</div>;
      }

  return (
    <div>
        <AnimatedText text={`Welcome, ${user?.name}`} textStyles="text-4xl font-semibold text-gray-600 my-6"/>
         
        <div className="w-full sm:space-y-4  md:flex items-center justify-between gap-6 bg-gray-200 shadow-lg rounded-lg p-6 my-4">
        {/* Left Section - User Info */}
        
          <div>
          <h2 className="text-2xl font-semibold text-gray-600 mb-2">Welcome Back, {user?.name}!</h2>
          <p className="text-gray-600 mb-4">
            Your  meeting slots booking <span className="text-blue-400 text-lg">{progressPercentage.toFixed(0)}%</span> is confirmed.
          </p>
          </div>
           
        
         
         <div>
            {/* Circular Progress */}
           <Progress type="dashboard"
          steps={8}
          percent={Math.round(progressPercentage)} 
          trailColor="rgba(0, 0, 0, 0.06)"
          strokeWidth={20}  />
         </div>
        {/* Right Section - Upgrade Button */}
        <div className="bg-gradient-to-r from-blue-100 via-blue-200 to-purple-100 rounded-lg p-4 flex flex-col items-center justify-center text-center shadow-md">
           
          <p className="font-semibold text-gray-600 mb-2">Book more meeting slots</p>
          <Link to="/meeting-rooms">
          <Button label="Book Now" small/>
          </Link>
        </div>
      </div>

       {/* Stats Section */}
<div className="w-full grid grid-cols-1 md:grid-cols-3 justify-between items-center gap-6 mb-6">

<div className="bg-gray-200 shadow-lg rounded-lg p-8 h-32 my-4 text-gray-600 text-center">
  <h3 className="text-2xl font-bold mb-2">{totalBookings}</h3>
  <p className="text-sm font-medium">Total Bookings</p>
</div>

<div className="bg-gray-200 shadow-lg rounded-lg p-8 h-32 my-4 text-gray-600 text-center">
  <h3 className="text-2xl font-bold mb-2">{confirmedBookings}</h3>
  <p className="text-sm font-medium">Confirmed Bookings</p>
</div>

<div className="bg-gray-200 shadow-lg rounded-lg p-8 h-32 my-4 text-gray-600 text-center">
  <h3 className="text-2xl font-bold mb-2">${totalCost.toFixed(2)}</h3>
  <p className="text-sm font-medium">Total Paid</p>
</div>

</div>

    </div>
  )
}

export default UserDashboard