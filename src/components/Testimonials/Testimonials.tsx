/* eslint-disable no-unused-vars */
import SectionTitle from '../SectionTitle/SectionTitle';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import '@smastrom/react-rating/style.css';
import { FaQuoteLeft } from "react-icons/fa";
import { useEffect, useState } from 'react';


interface Review {
  _id: string;
  image: string;
  name: string;
  role: string;
  details: string;
}

const Testimonials = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    fetch('/JSON/reviews.json')
      .then(res => res.json())
      .then(data => {
        setReviews(data);
      });
  }, []);

  return (
    <div>
      <SectionTitle
        subHeading={'What our clients say'}
        heading={'Testimonials'}
      />
      <div className="my-6">
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={30}
          slidesPerView={1}
        >
          {reviews.map((review) => (
            <SwiperSlide key={review._id}>
              <div
                
                className='flex flex-col items-center bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400  shadow-lg  rounded-xl'
              >
                <img 
                  src={review.image} 
                  alt={review.name} 
                  className='w-32 h-32 rounded-full object-cover mb-4 border-2 border-blue-300 p-4' 
                />
                <p className='text-2xl text-center text-gray-600 p-4'>{review.role}</p>
                <FaQuoteLeft className='mt-4 text-4xl text-gray-600' />
                <p className='py-6 text-gray-700 italic p-4'>" {review.details} "</p>
                <h3 className='text-2xl font-semibold text-gray-600 p-4'>{review.name}</h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonials;
