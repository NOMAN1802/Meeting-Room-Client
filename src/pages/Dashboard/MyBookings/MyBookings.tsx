import { TBooking } from "../../../types";
import { useMyBookingsQuery } from "../../../redux/api/booking/bookingApi";
import PageTitle from "../../../components/PageTitle/PageTitle";

const MyBookings = () => {
  const { data: bookings, isLoading } = useMyBookingsQuery(undefined, {
    selectFromResult: (result) => ({
      data: result.data?.data,
      isLoading: result.isLoading,
    }),
  });

  if (isLoading) {
    return (
      <div className="w-full text-center text-yellow-300 flex justify-center items-center h-screen">
        Loading..
      </div>
    );
  }



  return (
    <>
   

      <PageTitle heading="My Bookings" subHeading="My booked slots" />
      <div className="w-full md:max-w-screen-2xl md:px-4 my-6">
        <div className="overflow-x rounded-md border">
          <table className="min-w-full p-2 bg-gray-200 shadow-md rounded">
            {/* Table Head */}
            <thead className="bg-gray-600 text-gray-200">
              <tr>
                <th className="py-3 px-6 text-left">Room Name</th>
                <th className="py-3 px-6 text-left">Date</th>
                <th className="py-3 px-6 text-left hidden md:table-cell">Start Time</th>
                <th className="py-3 px-6 text-left hidden lg:table-cell">End Time</th>
                <th className="py-3 px-6 text-left">Status</th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody className="text-gray-700">
              {bookings?.map((booking: TBooking) => (
                <tr key={booking._id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left">
                    <span>{booking.room.name || "Unknown"}</span>
                  </td>
                  <td className="py-3 px-6 text-left">
                    <span>{new Date(booking.date).toLocaleDateString()}</span>
                  </td>
                  <td className="py-3 px-6 text-left hidden md:table-cell">
                    <span>{booking.slots[0]?.startTime || "N/A"}</span>
                  </td>
                  <td className="py-3 px-6 text-left hidden lg:table-cell">
                    <span>{booking.slots[0]?.endTime || "N/A"}</span>
                  </td>
                  <td className={`py-3 px-6 text-left font-medium ${booking.isConfirmed === "confirmed" ? "text-gray-600" : "text-red-600"}`}>
                    {booking.isConfirmed}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default MyBookings;
