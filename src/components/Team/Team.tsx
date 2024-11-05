import Marquee from 'react-fast-marquee';
import { motion } from 'framer-motion';

const Team = () => {

    

        const members = [
            {
                id: 1,
                icon: "/person1.png"
            },
            {
                id: 2,
                icon: "/person-2.png"
            },
          {
              id: 3,
                icon: "/person-3.png"
            },
            {
                id: 4,
                icon: "/person-4.png"
            },{
                id: 5,
                icon: "/person-5.png"
            },{
                id: 6,
                icon: "/person-6.png"
            },{
    
                id: 7,
                icon: "/person-7.png"
            }
        ]
    return (
        <>
   
        <div className='max-w-screen-xl md:mx-auto mx-7'>
        <motion.div
         initial={{ opacity: 0, y: 50 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.5 }}
        className='mx-auto text-center md:w-4/12'>
                    <h3  className='text-3xl  text-gray-700 py-4'>Team</h3>
                    <p  className='text-center mt-2 italic text-gray-600'>Meet our co-workers</p>
        </motion.div>
            <div className='my-6'>
                <Marquee className=''>
                    {
                        members.map(company=>(
                            <div key={company.id}  >
                                <img className='mx-5 h-36 w-36 rounded-full' src={company.icon} alt="" />
                            </div>
                        ))
                    }
                </Marquee>
            </div>
        </div>
        </>
    );
};

export default Team;