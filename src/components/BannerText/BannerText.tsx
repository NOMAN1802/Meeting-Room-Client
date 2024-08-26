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
            <p className="text-gray-400 rounded-md p-2   md:text-4xl text-center my-4">
                Enhance your tech experience
                
            </p>
            <p className="text-gray-400 rounded-md p-1 md:text-md text-center my-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates labore autem, magnam pariatur sapiente enim facilis alias? Illo, voluptate odit.
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