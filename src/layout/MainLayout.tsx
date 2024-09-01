import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import ScrollTop from "../components/ScrollTop/ScrollTop";

const MainLayout = () => {
    return (
        <div>
             <NavBar/>
             <div className="md:min-h-[calc(100vh-50px)]">
             <Outlet></Outlet>
             <ScrollTop />
      </div>
             <Footer/>
        </div>
    );
};

export default MainLayout;