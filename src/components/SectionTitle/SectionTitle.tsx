import { motion } from 'framer-motion';
import Container from '../Container/Container';

type TSectionTitle = {
    heading: string,
    subHeading: string,
}
 

const SectionTitle = ({ heading, subHeading } : TSectionTitle ) => {
    return (
        <Container>
            <motion.div

      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
            
            > 
                <div className='mx-auto text-center md:w-4/12 mt-[75px]'>
                    <h3  className='text-3xl  text-gray-700 py-4'>{heading}</h3>
                    <p  className='text-center mt-2 italic text-gray-600'>{subHeading}</p>
                </div>
            </motion.div>
        </Container>
    );
};

export default SectionTitle;