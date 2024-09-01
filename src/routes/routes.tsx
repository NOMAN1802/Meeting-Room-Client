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
import Booking from "../pages/Booking/Booking";
import Checkout from "../pages/Checkout/Checkout";
import ProtectedRoute from "./ProtectedRoute";
import ErrorPage from "../components/ErrorPage/ErrorPage";


const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        errorElement:<ErrorPage/>,
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
              path: "/booking/:id",
              element: (
                <ProtectedRoute role="user">
                  <Booking />
                </ProtectedRoute>
              ),
            },

            {
              path:'/checkout',
              element:(<ProtectedRoute role="user">
                <Checkout/>
              </ProtectedRoute>
              )
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
          element: ( <ProtectedRoute role="admin">
            <AddRoom/>
          </ProtectedRoute> ) 
      },
        {
          path:'manage-rooms',
          element: ( <ProtectedRoute role="admin">
            <ManageRooms/>
          </ProtectedRoute> )
      },
      {
        path:'add-slot',
        element:  ( <ProtectedRoute role="admin">
          <AddSlot/>
        </ProtectedRoute> ) 
    },
      {
        path:'manage-slots',
        element: ( <ProtectedRoute role="admin">
          <ManageSlots/>
        </ProtectedRoute> )
    },

    {
      path:'manage-users',
      element: ( <ProtectedRoute role="admin">
        <ManageUsers/>
      </ProtectedRoute> ) 
  },
    {
      path:'manage-bookings',
      element: ( <ProtectedRoute role="admin">
            <ManageBookings/>
          </ProtectedRoute> ) 
  },
    {
      path:'my-bookings',
      element: ( <ProtectedRoute role="user">
            <MyBookings/>
          </ProtectedRoute> ) 
  },
        
        
      ],
  
  },
])


export default router;