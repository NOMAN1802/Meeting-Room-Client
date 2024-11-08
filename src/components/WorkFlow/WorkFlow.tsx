import SectionTitle from "../SectionTitle/SectionTitle";
import { FaDoorOpen, FaCalendarAlt, FaCheckCircle, FaMoneyCheckAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const WorkFlow = () => {
  const steps = [
    {
      icon: <FaDoorOpen className="text-5xl text-white" />,
      label: "Select a Room",
      description: "Choose the perfect room for your meeting or event.",
    },
    {
      icon: <FaCalendarAlt className="text-5xl text-white" />,
      label: "Choose Date & Time",
      description: "Pick a convenient date and time for your booking.",
    },
    {
      icon: <FaCheckCircle className="text-5xl text-white" />,
      label: "Confirm Booking",
      description: "Review and confirm your booking details.",
    },
    {
      icon: <FaMoneyCheckAlt className="text-5xl text-white" />,
      label: "Done with Payment",
      description: "Complete the payment to finalize your booking.",
    },
  ];

  return (
    <div>
      <SectionTitle heading="Work Flow" subHeading="This is exactly how it works" />
      <div className="max-w-screen-2xl md:mx-auto my-6 md:px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="bg-gray-300 hover:shadow-2xl shadow-lg rounded-xl p-6 text-center relative overflow-hidden"
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
            >
              <div className="absolute inset-0 flex justify-center items-center opacity-95">
                <div className="text-8xl text-gray-600">{step.icon}</div>
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl font-semibold mb-2 text-gray-600">{step.label}</h3>
                <p className="text-gray-600 font-light">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkFlow;
