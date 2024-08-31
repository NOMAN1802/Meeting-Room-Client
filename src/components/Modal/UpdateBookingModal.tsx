/* eslint-disable @typescript-eslint/no-unused-vars */
// UpdateBookingModal.tsx
import { Dialog } from "@headlessui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { FieldValues } from "react-hook-form";
import { useUpdateBookingsMutation } from "../../redux/api/booking/bookingApi";

interface UpdateBookingModalProps {
  isOpen: boolean;
  closeModal: () => void;
  bookingId: string;
}

const UpdateBookingModal: React.FC<UpdateBookingModalProps> = ({ isOpen, closeModal, bookingId }) => {
  const { register, handleSubmit, reset } = useForm<FieldValues>();
  const [updateBooking] = useUpdateBookingsMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      await updateBooking({ id: bookingId, data }).unwrap();
      toast.success("Booking updated successfully!");
      reset();
      closeModal();
    } catch (error) {
      toast.error("Failed to update booking.");
    }
  };

  return (
    <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-sm p-6 bg-white rounded-md">
          <Dialog.Title className="text-lg font-medium text-gray-900">
            Update Booking
          </Dialog.Title>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
            {/* Add form fields for updating booking */}
            <div className="mt-4">
              <label htmlFor="status" className="block text-gray-700">Status</label>
              <select id="status" {...register("isConfirmed")} className="mt-1 block w-full">
                <option value="confirmed">Confirmed</option>
                <option value="unconfirmed">Unconfirmed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div className="flex justify-end mt-4">
              <button type="button" onClick={closeModal} className="px-4 py-2 mr-2 bg-gray-500 text-white rounded-md">
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">
                Update
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default UpdateBookingModal;
