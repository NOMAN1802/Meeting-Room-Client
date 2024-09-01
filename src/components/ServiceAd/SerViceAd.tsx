import { useEffect, useState } from "react";
import SectionTitle from "../SectionTitle/SectionTitle";
import { motion } from "framer-motion";


interface Ad {
  id: number;
  subject_image: string;
  subject_name: string;
}

const SerViceAd = () => {
  
  const [ads, setAd] = useState<Ad[]>([]);

  useEffect(() => {
    fetch('/JSON/ads.json')
      .then(res => res.json())
      .then(data => setAd(data));
  }, []);

  return (
    <div>
      <SectionTitle heading="Top Services" subHeading="That's why you prefer us..." />
      <div className='max-w-screen-xl md:mx-auto mx-5 my-6 sm:mx-20'>
        <div className='my-20 grid grid-cols-1 md:grid-cols-4 gap-10'>
          {
            ads.map((ad, index) => (
              <motion.div 
              initial={{ y: 0 }}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay: index * 0.2 }}
               key={ad.id} className='bg-gray-200 shadow-2xl flex gap-2 items-center p-4 rounded-xl hover:bg-gray-700 hover:text-white'>
                <img
                  
                  className='w-20 rounded-md'
                  src={ad.subject_image}
                  alt={ad.subject_name}
                />
                <h1 className='text-2xl'>{ad.subject_name}</h1>
              </motion.div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default SerViceAd;
