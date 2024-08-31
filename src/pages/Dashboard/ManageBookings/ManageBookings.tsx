/* eslint-disable @typescript-eslint/no-unused-vars */
import Container from "../../../components/Container/Container";
import { generateBreadcrumbs } from "../../../utils/getPageTitleData";
import { TBooking } from "../../../types";
import { useState } from "react";
import { toast } from "sonner";
import UpdateBookingModal from "../../../components/Modal/UpdateBookingModal";
import { useDeleteBookingsMutation, useGetAllBookingsQuery, useUpdateBookingsMutation } from "../../../redux/api/booking/bookingApi";
import { TiDelete } from "react-icons/ti";
import { ImCheckboxChecked } from "react-icons/im";
import DeleteBookingModal from "../../../components/Modal/DeleteBookingModal";
import { FaTrash } from "react-icons/fa";

const ManageBookings = () => {
  const { data: bookings, isLoading } = useGetAllBookingsQuery(undefined, { pollingInterval: 1000 });
  const [updateBooking] = useUpdateBookingsMutation();
  const [deleteBooking] = useDeleteBookingsMutation();
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="w-full text-center text-yellow-300 flex justify-center items-center h-screen">
        Loading..
      </div>
    );
  }

  const handleApprove = async (bookingId: string) => {
    const data = {
      data: { isConfirmed: "confirmed", paymentStatus: "paid" },
      bId: bookingId,
    };

    try {
      await updateBooking(data).unwrap();
      toast.success("Booking approved successfully");
    } catch (err) {
      toast.error("Failed to approve booking");
      console.error(err);
    }
  };

  const handleReject = async (bookingId: string) => {
    const data = {
      data: { isConfirmed: "unconfirmed", paymentStatus: "pending" },
      bId: bookingId,
    };

    try {
      await updateBooking(data).unwrap();
      toast.success("Booking rejected successfully");
    } catch (err) {
      toast.error("Failed to reject booking");
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (!selectedBookingId) return;

    try {
      await deleteBooking({ rId: selectedBookingId }).unwrap(); 
      toast.success("Booking deleted successfully");
      setIsDeleteModalOpen(false);
    } catch (error) {
      toast.error("Failed to delete booking");
    }
  };

  const breadcrumbItems = [
    { label: "Home", path: "/" },
    { label: "Dashboard", path: "/dashboard" },
    { label: "Manage Bookings", path: "/dashboard/manage-bookings" },
  ];

  return (
    <Container>
      {generateBreadcrumbs(breadcrumbItems)}
      <div className="w-full px-8">
        <h2 className="text-center text-3xl my-6">Manage Bookings</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-200 shadow-md rounded my-6">
            {/* Table Head */}
            <thead className="bg-gray-600 text-gray-200">
              <tr>
                <th className="py-3 px-6 text-left">Room Name</th>
                <th className="py-3 px-6 text-left">User Name</th>
                <th className="py-3 px-6 text-left">Date & Time</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left">Update</th>
                <th className="py-3 px-6 text-left">Delete</th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody className="text-gray-700 rounded-md">
              {bookings?.data?.map((booking: TBooking) => (
                <tr key={booking._id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left">
                    <span>{booking.room.name || "Unknown"}</span>
                  </td>
                  <td className="py-3 px-6 text-left">
                    <span>{booking.user.name || "Unknown"}</span>
                  </td>
                  <td className="py-3 px-6 text-left">
                    <span>{new Date(booking.date).toLocaleDateString()}</span>
                    <div>
                      {booking.slots.map((slot) => (
                        <div key={slot._id}>
                          {slot.startTime} - {slot.endTime}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className={`py-3 px-6 text-left font-medium ${booking.isConfirmed === "confirmed" ? "text-gray-100" : "text-red-600"}`}>
                    {booking.isConfirmed}
                  </td>
                  <td className="py-3 px-6 text-left">
                    <button
                      className={booking.isConfirmed === "confirmed" ? "danger" : "bg-gray-300 p-2 rounded"}
                      onClick={() => booking.isConfirmed === "confirmed" ? handleReject(booking._id) : handleApprove(booking._id)}
                    >
                      {booking.isConfirmed === "confirmed" ? <TiDelete className="text-gray-600" /> : <ImCheckboxChecked className="text-green-400" />}
                    </button>
                  </td>
                  <td className="py-3 px-6 text-left">
                    <button
                      className="danger"
                      onClick={() => { setSelectedBookingId(booking._id); setIsDeleteModalOpen(true); }}
                    >
                      <FaTrash className="text-red-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {isDeleteModalOpen && (
          <DeleteBookingModal
            isOpen={isDeleteModalOpen}
            closeModal={() => setIsDeleteModalOpen(false)}
            modalHandler={handleDelete}
            id={selectedBookingId || ""}
          />
        )}
        {isUpdateModalOpen && (
          <UpdateBookingModal
            isOpen={isUpdateModalOpen}
            closeModal={() => setIsUpdateModalOpen(false)}
            bookingId={selectedBookingId || ""}
          />
        )}
      </div>
    </Container>
  );
};

export default ManageBookings;
