import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { FaCheckCircle } from "react-icons/fa";
import AnimatedText from "../../components/AnimatedText/AnimatedText";
import Contact from '../../assets/images/img.png';
import Container from "../../components/Container/Container";
import PageTitle from "../../components/PageTitle/PageTitle";

const ContactUs = () => {
  const [state, handleSubmit] = useForm("xwpkljyd");

  // State for form input
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    message: "",
  });
  const [showIcon, setShowIcon] = useState(false);

  // Handle input change
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Clear form after submission
  useEffect(() => {
    if (state.succeeded) {
      setShowIcon(true);

      // Clear form input
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        message: "",
      });

      // Handle icon revert after 3 seconds
      const timer = setTimeout(() => {
        setShowIcon(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [state.succeeded]);

  // Handle form submission
  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSubmit(formData);
  };

  return (
    <>
    <PageTitle heading="Contact Us" subHeading="We are available 24/7"/>
      <Container>
        <div className="mx-auto my-4">
          <div className="flex flex-col items-center xl:flex-row gap-6 lg:gap-8">
            {/* Left Side: Form */}
            <div className="flex-1 flex flex-col items-center xl:items-start">
              <AnimatedText
                text="Please Leave Your Message Here"
                textStyles="text-2xl md:text-4xl mb-8 text-center xl:text-left text-gray-600 "
              />

              {/* Form */}
              <form onSubmit={handleFormSubmit} className="flex flex-col gap-6 w-full max-w-full">
                {/* Firstname and Lastname */}
                <div className="flex gap-8">
                  <div className="flex-1">
                    <label htmlFor="firstname" className="block mb-2 text-sm font-medium text-gray-700">
                      First Name <span className="text-accent">*</span>
                    </label>
                    <input
                      onChange={handleChange}
                      type="text"
                      id="firstname"
                      name="firstname"
                      value={formData.firstname}
                      className="w-full h-12 px-4 border-2 border-gray-300 rounded-lg outline-none focus:border-accent placeholder-gray-500"
                      placeholder="First Name"
                      required
                    />
                  </div>

                  <div className="flex-1">
                    <label htmlFor="lastname" className="block mb-2 text-sm font-medium text-gray-700">
                      Last Name <span className="text-accent">*</span>
                    </label>
                    <input
                      onChange={handleChange}
                      type="text"
                      id="lastname"
                      name="lastname"
                      value={formData.lastname}
                      className="w-full h-12 px-4 border-2 border-gray-300 rounded-lg outline-none focus:border-accent placeholder-gray-500"
                      placeholder="Last Name"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
                    Email <span className="text-accent">*</span>
                  </label>
                  <input
                    onChange={handleChange}
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    className="w-full h-12 px-4 border-2 border-gray-300 rounded-lg outline-none focus:border-accent placeholder-gray-500"
                    placeholder="youremail@mail.com"
                    required
                  />
                  <ValidationError prefix="Email" field="email" errors={state.errors} />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-700">
                    Phone <span className="text-accent">*</span>
                  </label>
                  <input
                    onChange={handleChange}
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    className="w-full h-12 px-4 border-2 border-gray-300 rounded-lg outline-none focus:border-accent placeholder-gray-500"
                    placeholder="+880 1980931802"
                    required
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-700">
                    Message <span className="text-accent">*</span>
                  </label>
                  <textarea
                    onChange={handleChange}
                    id="message"
                    name="message"
                    value={formData.message}
                    className="w-full p-4 border-2 border-gray-300 rounded-lg outline-none focus:border-accent placeholder-gray-500 resize-none"
                    placeholder="Leave a message..."
                    rows={5}
                    required
                  />
                  <ValidationError prefix="Message" field="message" errors={state.errors} />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={state.submitting}
                  className="w-full h-12 rounded-lg bg-gray-600 hover:bg-gray-700 text-white font-medium flex items-center justify-center gap-2"
                >
                  {state.submitting ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <FaCheckCircle
                        className={`text-white text-lg transition-opacity duration-500 ease-in-out ${
                          showIcon ? "opacity-100" : "opacity-0"
                        }`}
                      />
                      <span
                        className={`transition-opacity duration-500 ease-in-out ${
                          showIcon ? "opacity-0" : "opacity-100"
                        }`}
                      >
                        Send message
                      </span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Right Side: Image */}
            <div className="hidden xl:flex w-[600px] h-[650px] rounded-lg overflow-hidden shadow-lg">
              <img
                src={Contact}
                className="object-cover w-full h-full"
                alt="Contact"
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default ContactUs;
