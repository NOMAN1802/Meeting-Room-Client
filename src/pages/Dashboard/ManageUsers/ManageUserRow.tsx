/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { FaSync } from "react-icons/fa";
import { toast } from "sonner";
import { TUser } from "../../../types";
import { useUpdateUserRoleMutation } from "../../../redux/api/admin/userManagement.api";

interface ManageUserRowProps {
  user: TUser;
}

const ManageUserRow: React.FC<ManageUserRowProps> = ({ user }) => {
  const [updateUserRole, { isLoading }] = useUpdateUserRoleMutation();

  const handleMakeAdmin = async () => {
    try {
      await updateUserRole({ userId: user._id, role: "admin" }).unwrap();
      toast.success(`${user.name} is now an admin.`);
    } catch (error) {
      toast.error("Failed to promote user to admin.");
    }
  };
  
  

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-300">
      <td className="py-3 px-6 text-left">{user?.name}</td>
      <td className="py-3 px-6 text-left">{user?.email}</td>
      <td className="py-3 px-6 text-left">{user?.phone}</td>
      <td className="py-3 px-6 text-left">{user?.address}</td>
      <td className="py-3 px-6 text-left">{user?.role}</td>
      <td className="py-3 px-6 text-left">
    <button
      onClick={handleMakeAdmin}
      disabled={isLoading || user.role === "admin"}
      className="flex items-center text-gray-200 hover:text-gray-100 bg-gray-600 rounded px-3 py-2"
     >
     <FaSync className="mr-2" /> Promote
   </button>
   </td>

    </tr>
  );
};

export default ManageUserRow;
