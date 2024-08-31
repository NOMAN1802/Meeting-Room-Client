import Container from "../../../components/Container/Container";
import { generateBreadcrumbs } from "../../../utils/getPageTitleData";
import { TBooking } from "../../../types";
import { useMyBookingsQuery } from "../../../redux/api/booking/bookingApi";

const MyBookings = () => {
  const { data: bookings, isLoading } = useMyBookingsQuery(undefined, {
    selectFromResult: (result) => ({
      data: result.data?.data, // Assuming the API returns a nested data object
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

  const breadcrumbItems = [
    { label: "Home", path: "/" },
    { label: "Dashboard", path: "/dashboard" },
    { label: "My Bookings", path: "/dashboard/my-bookings" },
  ];

  return (
    <Container>
      {generateBreadcrumbs(breadcrumbItems)}
      <div className="w-full px-8">
        <h2 className="text-center text-3xl my-6">My Bookings</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-200 shadow-md rounded my-6">
            {/* Table Head */}
            <thead className="bg-gray-600 text-gray-200">
              <tr>
                <th className="py-3 px-6 text-left">Room Name</th>
                <th className="py-3 px-6 text-left">Date</th>
                <th className="py-3 px-6 text-left">Start Time</th>
                <th className="py-3 px-6 text-left">End Time</th>
                <th className="py-3 px-6 text-left">Status</th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody className="text-gray-700 rounded-md">
              {bookings?.map((booking: TBooking) => (
                <tr key={booking._id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left">
                    <span>{booking.room.name || "Unknown"}</span>
                  </td>
                  <td className="py-3 px-6 text-left">
                    <span>{new Date(booking.date).toLocaleDateString()}</span>
                  </td>
                  <td className="py-3 px-6 text-left">
                    <span>{booking.slots[0]?.startTime || "N/A"}</span>
                  </td>
                  <td className="py-3 px-6 text-left">
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
    </Container>
  );
};

export default MyBookings;
