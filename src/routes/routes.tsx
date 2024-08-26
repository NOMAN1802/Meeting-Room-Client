import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import MeetingRoom from "../pages/MeetingRoom/MeetingRoom";
import Login from "../pages/Login/Login";
import ContactUs from "../pages/ContactUs/ContactUs";
import AboutUs from "../pages/AboutUs/AboutUs";
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";


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
    }   
])


export default router;