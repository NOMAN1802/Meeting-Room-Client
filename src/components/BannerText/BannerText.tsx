import { motion } from "framer-motion";
import Button from "../Button/Button";
import { Link } from "react-router-dom";


const BannerText = () => {
    return (
        <motion.div
        initial={{ y: 0 }}
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay:  0.5 }} 
    >
        <div>
            <p className="text-gray-300 rounded-md p-2   md:text-4xl text-center my-4">
            Book Your Ideal Meeting Room with Ease
                
            </p>
            <p className="text-gray-300 rounded-md p-1 md:text-lg text-center my-4">
            Efficient, hassle-free room booking for all your meeting needs.
            </p>
        </div>
        <Link to='/meeting-rooms'>
        <div className="w-1/4 mx-auto mt-4">
            <Button label='Book Now'   />
        </div>
        </Link>
    </motion.div>
    );
};

export default BannerText;