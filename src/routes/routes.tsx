import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import MeetingRoom from "../pages/MeetingRoom/MeetingRoom";
import Login from "../pages/Login/Login";
import ContactUs from "../pages/ContactUs/ContactUs";
import AboutUs from "../pages/AboutUs/AboutUs";
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import DashboardLayout from "../layout/DashboardLayout";
import AddRoom from "../pages/Dashboard/AddRoom/AddRoom";
import ManageRooms from "../pages/Dashboard/ManageRooms/ManageRooms";
import AddSlot from "../pages/Dashboard/AddSlot/AddSlot";
import ManageSlots from "../pages/Dashboard/ManageSlots/ManageSlots";
import ManageUsers from "../pages/Dashboard/ManageUsers/ManageUsers";
import MyBookings from "../pages/Dashboard/MyBookings/MyBookings";
import ManageBookings from "../pages/Dashboard/ManageBookings/ManageBookings";
import RoomDetails from "../pages/RoomDetails/RoomDetails";


const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {
              index: true,
              element: <Home />,
            },
            {
                path:'/meeting-rooms',
                element:<MeetingRoom/>
            },
            {
                path:'/meeting-rooms/:id',
                element:<RoomDetails/>
            },
            {
                path:'/about-us',
                element:<AboutUs/>
            },
            {
                path: "/contact-us",
                element: <ContactUs />,
              },
              {
                path: '/login',
                element:<Login/>
              },
              {
                path: '/register',
                element:<Register/>
              },
            ]
    },
    
    {
      path: "/dashboard",
      element: <DashboardLayout/>,
      children: [
      
        
        {
          path:'add-room',
          element: <AddRoom/>
      },
        {
          path:'manage-rooms',
          element: <ManageRooms/>
      },
      {
        path:'add-slot',
        element: <AddSlot/>
    },
      {
        path:'manage-slots',
        element: <ManageSlots/>
    },

    {
      path:'manage-users',
      element: <ManageUsers/>
  },
    {
      path:'manage-bookings',
      element: <ManageBookings/>
  },
    {
      path:'my-bookings',
      element: <MyBookings/>
  },
        
        
      ],
  
  },
])


export default router;