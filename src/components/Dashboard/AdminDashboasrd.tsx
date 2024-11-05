import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import { useAppSelector } from '../../redux/hooks';
import { useGetAllBookingsQuery} from '../../redux/api/booking/bookingApi';
import { useCurrentUser } from '../../redux/features/authSlice';
import { useGetAllUsersQuery } from '../../redux/api/admin/userManagement.api';
import { TBooking } from '../../types';
import { Progress } from 'antd';
import { Link } from 'react-router-dom';
import AnimatedText from '../AnimatedText/AnimatedText';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const AdminDashboasrd : React.FC  = () => {

    const user = useAppSelector(useCurrentUser);
    
    const { data: users, isLoading: loadingUsers } = useGetAllUsersQuery(undefined);
    const { data: allBookings, isLoading: loadingAllBookings } = useGetAllBookingsQuery(undefined);
    console.log('all bookings', allBookings)
    
    if (loadingUsers || loadingAllBookings) {
      return <div className="flex justify-center items-center h-screen text-yellow-300">Loading...</div>;
    }

     // Stats
  const totalUsers = users?.data.length || 0;
  const totalBookings = allBookings?.data.length || 0;
  const totalRevenue = allBookings?.data.reduce((acc :any, booking : TBooking) => acc + booking.totalAmount, 0) || 0;
  const userBookingData = allBookings?.data || [];
  const confirmedBookings = userBookingData?.filter((booking :TBooking) => booking.isConfirmed === "confirmed")?.length;
  const progressPercentage = totalBookings > 0 ? (confirmedBookings / totalBookings) * 100 : 0;
  
  // Chart data
  const chartData = allBookings?.data.map((booking :TBooking) => ({
    name: booking.date,
    totalAmount: booking.totalAmount,
  })) || [];

   // Prepare sloatPriceData dynamically from allBookings
   const sloatPriceData = allBookings?.data.map((booking: TBooking) => ({
    name: booking?.room.name, 
    value: booking?.room?.pricePerSlot,
 
})) || [];

  return (
    <>
    <AnimatedText text={`Welcome, ${user?.name}`} textStyles="sm:text-lg md:text-4xl  font-semibold text-gray-600 my-6"/>
    <div className=" grid gap-6">
    {/* User Information Card */}
      <div className="w-full sm:space-y-4  md:flex items-center justify-between gap-6 bg-gray-200 shadow-lg rounded-lg p-6 my-4">
        {/* Left Section - User Info */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-600 mb-2">Welcome Back, {user?.name}!</h2>
          <p className="text-gray-600 mb-4">
            You have confirmed <span className='text-lg text-blue-400'> {progressPercentage.toFixed(0)}%</span> of total booked slots.
          </p>
        </div>

        <div>
            {/* Circular Progress */}
          <Progress type="dashboard"
          steps={10}
          percent={Math.round(progressPercentage)} 
          trailColor="rgba(0, 0, 0, 0.06)"
          strokeWidth={24}  />
        </div>

        {/* Right Section - Upgrade Button */}
        <div className="bg-gradient-to-r from-blue-100 via-blue-200 to-purple-100 rounded-lg p-4 flex flex-col items-center justify-center text-center shadow-md">
           
          <p className="font-semibold text-gray-800 mb-2">Confirmed all booked slots</p>
          <Link to="/dashboard/manage-bookings">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-600 transition">
            Confirm Now
          </button>
          </Link>
        </div>
      </div>
      {/* Stats Section */}
      <div className="w-full grid grid-cols-1 md:grid-cols-3 justify-between items-center gap-6 mb-6">

      
        <div className="bg-gray-200 shadow-lg rounded-lg p-8 h-36 my-4 text-gray-600 text-center">
          <h3 className="text-2xl font-bold mb-2">{totalUsers}</h3>
          <p className="text-sm font-medium">Total Users</p>
        </div>
        <div className="bg-gray-200 shadow-lg rounded-lg p-8 h-36 my-4 text-gray-600 text-center">
          <h3 className="text-2xl font-bold mb-2">{totalBookings}</h3>
          <p className="text-sm font-medium">Total Bookings</p>
        </div>
        <div className="bg-gray-200 shadow-lg rounded-lg p-8 h-36 my-4 text-gray-600 text-center">
          <h3 className="text-2xl font-bold mb-2">${totalRevenue.toFixed(2)}</h3>
          <p className="text-sm font-medium">Total Revenue</p>
        </div>
      </div>

      {/* Charts */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-200 p-4 rounded-lg shadow-lg hidden sm:block">
          <h3 className="text-xl text-gray-600 font-semibold">Revenue Over Time</h3>
          <LineChart width={500} height={300} data={chartData} >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="totalAmount" stroke="#8884d8" />
          </LineChart>
        </div>
        <div className="bg-gray-200 p-4 rounded-lg shadow-lg">
          <h3 className="text-xl text-gray-600 font-semibold">Booking Status</h3>
          <PieChart width={400} height={200} className='mx-auto'>
            <Pie data={sloatPriceData } cx="50%" cy="50%" innerRadius={50} outerRadius={80} fill="#8884d8" dataKey="value">
              {sloatPriceData.map((_slot : TBooking , index: number) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </div>
      </div>
    </div>
  </>
  )
}

export default AdminDashboasrd