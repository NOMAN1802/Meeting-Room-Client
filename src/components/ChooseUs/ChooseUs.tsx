import { motion } from 'framer-motion';
import SectionTitle from "../SectionTitle/SectionTitle";
import ChoseImage1 from '../../assets/images/chose-1.jpg';
import ChoseImage2 from '../../assets/images/cose-2.jpg';



const ChooseUs = () => {
  return (
    <div className=" bg-gray-100">
      <SectionTitle heading="Why Us" subHeading="Explore it" />
      
      <div className="max-w-screen-2xl md:mx-auto  my-6 md:px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 ">
          {/* Secure Transactions Card */}
          <motion.div 
            className=" shadow-xl rounded-xl p-6 relative bg-gray-200 hover:bg-gray-300"
            initial={{ y: 0 }}
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay: 0.2 }}
          >
            <div className="flex justify-center mb-4">
              <img src={ChoseImage1} alt="Secure Transactions" className="w-48 h-48 rounded-full object-cover" />
            </div>
            <h1 className="text-2xl font-semibold mb-2 text-center">Secure Transactions</h1>
            <p className="text-gray-700 mb-4">
              Secure transactions are critical in safeguarding sensitive financial information during online exchanges. They employ various encryption technologies, such as SSL/TLS, to protect data integrity and privacy by encrypting information between users and servers. Multi-factor authentication (MFA) adds an additional layer of security.
            </p>
          </motion.div>

          {/* Seamless Booking Experience Card */}
          <motion.div 
            className=" shadow-xl rounded-xl p-6 relative bg-gray-200 hover:bg-gray-300"
            initial={{ y: 0 }}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay: 0.2 }}
          >
            <div className="flex justify-center mb-4">
              <img src={ChoseImage2} alt="Seamless Booking Experience" className="w-48 h-48 rounded-full object-cover" />
            </div>
            <h1 className="text-2xl font-semibold mb-2 text-center">Seamless Booking Experience</h1>
            <p className="text-gray-700 mb-4">
              A seamless booking experience is essential for ensuring customer satisfaction and efficiency in reservation systems. It involves providing a user-friendly interface that simplifies the booking process, allowing users to easily search for availability, select options, and complete transactions with minimal effort.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ChooseUs;
