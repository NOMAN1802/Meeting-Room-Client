import Container from '../../../components/Container/Container';
import { useLocation } from 'react-router-dom';
import Heading from '../../../components/Heading/Heading';
import { TRoom } from '../../../types';

import { generateBreadcrumbs } from '../../../utils/getPageTitleData';
import { useGetAllUsersQuery } from '../../../redux/api/admin/userManagement.api';
import ManageUserRow from './ManageUserRow';
import PageTitle from '../../../components/PageTitle/PageTitle';

const ManageUsers = () => {

    const location = useLocation();
    const { data: users, isLoading } = useGetAllUsersQuery(undefined)
  
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-screen">
             <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-500"></div>
           </div>
      );
    }

    const breadcrumbItems = [
        { label: "Home", path: "/dashboard" },
        { label: "Dashboard", path: '/dashboard' },
        { label: "Manage Users", path: 'manage-users' },
        
      ];
    return (
        <Container>
     {generateBreadcrumbs(breadcrumbItems)}
     <PageTitle heading="Manage users" subHeading="Manage authorized users" />
      {users?.data && users?.data?.length > 0 ? (
        <div className="overflow-x-auto my-6">
          <table className="min-w-full bg-gray-200 shadow-md rounded my-6">
            {/* Head */}
            <thead className="bg-gray-600 text-gray-200">
              <tr>
                
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Phone</th>
                <th className="py-3 px-6 text-left">Address</th>
                <th className="py-3 px-6 text-left">Role</th>
                <th className="py-3 px-6 text-left">Promote</th>
              </tr>
            </thead>
            {/* Body */}
            <tbody className="text-gray-700 rounded-md">
              {users?.data?.map((user: TRoom) => (
                <ManageUserRow key={user._id} user={user } />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="pt-12">
          <Heading
            title={
              location.pathname === '/dashboard/manage-users'
                ? 'No activity found'
                : 'You have not added any users yet!'
            }
            subtitle={
              location.pathname === '/dashboard/manage-users'
                ? 'Go to add users and start managing!'
                : 'Explore and add your users.'
            }
            center={true}
          />
        </div>
      )}
    </Container>
    );
};

export default ManageUsers;