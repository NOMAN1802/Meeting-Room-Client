import Container from '../../../components/Container/Container';
import { useLocation } from 'react-router-dom';
import Heading from '../../../components/Heading/Heading';
import { useGetRoomsQuery } from '../../../redux/api/admin/roomManagement.api';
import ManageRoomRow from './ManageRoomsRow';
import PageTitle from '../../../components/PageTitle/PageTitle';
import { TRoom } from '../../../types';
import { generateBreadcrumbs } from '../../../utils/getPageTitleData';


const ManageRooms = () => {
  const location = useLocation();
  const { data: rooms, isLoading } = useGetRoomsQuery(undefined);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
             <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-500"></div>
           </div>
    );
  }
  const breadcrumbItems = [
    { label: "Home", path: "/" },
    { label: "Dashboard", path: '/dashboard' },
    { label: "Manage Rooms", path: '/manage-rooms' },
    
  ];

  return (
    <Container>
      {generateBreadcrumbs(breadcrumbItems)}
    
      {rooms?.data && rooms?.data?.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-200 shadow-md rounded my-6">
            {/* Head */}
            <thead className="bg-gray-600 text-gray-200">
              <tr>
                <th className="py-3 px-6 text-left">Photo</th>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Category</th>
                <th className="py-3 px-6 text-left">Capacity</th>
                <th className="py-3 px-6 text-left">Price Per Slot</th>
                <th className="py-3 px-6 text-left">Delete</th>
                <th className="py-3 px-6 text-left">Update</th>
              </tr>
            </thead>
            {/* Body */}
            <tbody className="text-gray-700 rounded-md">
              {rooms?.data?.map((room: TRoom) => (
                <ManageRoomRow key={room._id} room={room} />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="pt-12">
          <Heading
            title={
              location.pathname === '/dashboard/manage-rooms'
                ? 'No activity found'
                : 'You have not added any rooms yet!'
            }
            subtitle={
              location.pathname === '/dashboard/manage-rooms'
                ? 'Go to add rooms and start managing!'
                : 'Explore and add your rooms.'
            }
            center={true}
          />
        </div>
      )}
    </Container>
  );
};

export default ManageRooms;
