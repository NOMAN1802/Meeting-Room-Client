import Container from "../../components/Container/Container";
import { FaEnvelope, FaLocationDot, FaPhone } from "react-icons/fa6";
import PageTitle from "../../components/PageTitle/PageTitle";
import { toast } from "sonner";
import { motion } from "framer-motion";
import React from "react";
import { generateBreadcrumbs } from "../../utils/getPageTitleData";

const contactDetails = [
    {
        icon: <FaPhone className='text-6xl text-blue-500' />,
        title: "Telephone",
        info: ["+88017********", "+88019********"],
    },
    {
        icon: <FaEnvelope className='text-6xl text-green-500' />,
        title: "Our Mail",
        info: ["techagency01@gmail.com", "techagency3@gmail.com"],
    },
    {
        icon: <FaLocationDot className='text-6xl text-red-500' />,
        title: "Location",
        info: ["Dhaka, Bangladesh"],
    },
];

const ContactUs = () => {
    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const name = (form.elements.namedItem('name') as HTMLInputElement).value;
        const email = (form.elements.namedItem('email') as HTMLInputElement).value;
        const subject = (form.elements.namedItem('subject') as HTMLInputElement).value;
        const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value;
        const query = { name, email, subject, message };
        if (query) {
            toast.success("Message sent successfully");
            form.reset();
        }
    };
    const breadcrumbItems = [
        { label: "Home", path: "/" },
        { label: "About Us", path: 'about-us' },
       
      ];
    return (
        <Container>
            {generateBreadcrumbs(breadcrumbItems)}
            <PageTitle heading="Contact Us" subHeading="We are available 24/7" />
            <div className='flex flex-col md:flex-row justify-center items-center gap-10 pt-10 my-6'>
                {contactDetails.map((detail, index) => (
                    <motion.div
                        key={index}
                        initial={{ y: 0 }}
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay: index * 0.2 }}
                        className={`text-center ${index !== 1 ? '' : 'border-x-2 border-gray-300 p-10'}`}
                    >
                        <div className='flex justify-center mb-4'>
                            {detail.icon}
                        </div>
                        <h1 className='text-xl font-bold text-gray-700'>{detail.title}</h1>
                        {detail.info.map((line, i) => (
                            <p key={i} className="text-gray-600">{line}</p>
                        ))}
                    </motion.div>
                ))}
            </div>
            <div className='max-w-screen-xl md:mx-auto mx-5 my-10'>
                <h1 className='text-3xl text-center my-20 font-semibold text-gray-600'>
                    Get Support From Experienced Instructors
                </h1>
                <div className='flex justify-center items-center'>
                    <form className='text-center w-full md:w-3/4 lg:w-1/2' onSubmit={handleFormSubmit}>
                        <input
                            type="text"
                            name="name"
                            className='p-3 border-2 border-gray-300 rounded-lg text-lg w-full my-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            placeholder='Full Name'
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            className='p-3 border-2 border-gray-300 rounded-lg text-lg w-full my-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            placeholder='Your Email'
                            required
                        />
                        <input
                            type="text"
                            name="subject"
                            className='p-3 border-2 border-gray-300 rounded-lg text-lg w-full my-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            placeholder='Your Subject'
                            required
                        />
                        <textarea
                            name="message"
                            className='w-full h-40 border-2 border-gray-300 rounded-lg p-3 text-lg my-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            placeholder='Your Message'
                            required
                        ></textarea>
                        <button
                            type="submit"
                            className='w-full md:w-1/4 bg-gray-500 hover:bg-gray-700 text-white text-xl font-semibold px-6 py-3 rounded-lg shadow-md transition-transform hover:scale-105'>
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </Container>
    );
};

export default ContactUs;
