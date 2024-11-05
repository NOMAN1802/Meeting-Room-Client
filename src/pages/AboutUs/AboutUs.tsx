import Container from "../../components/Container/Container";
import PageTitle from "../../components/PageTitle/PageTitle";
import CountUp from 'react-countup';
import { generateBreadcrumbs } from "../../utils/getPageTitleData";
import Team from "../../components/Team/Team";

const AboutUs = () => {

    const breadcrumbItems = [
        { label: "Home", path: "/" },
        { label: "About Us", path: 'about-us' },
       
      ];
    
     
    return (
        <Container>
            {generateBreadcrumbs(breadcrumbItems)}
            <PageTitle heading="About Us" subHeading="Stay connected to us..." />
            <div className='my-6  md:flex justify-center items-start gap-10'>
                <div className='md:w-full grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className="space-y-5">
                        <img src="https://img.freepik.com/free-vector/online-transactions-concept-illustration_114360-5602.jpg?ga=GA1.1.1079181062.1724613555&semt=ais_hybrid" className="rounded-lg shadow-lg" />
                        <img src="https://img.freepik.com/free-vector/teamwork-people-characters-managing-ideas_23-2148420588.jpg?w=740&t=st=1725143233~exp=1725143833~hmac=dd6949bd7001cc86b9f4c8ad8c5089bf68cd9e3e37a48e8a8630cf8432e57239" className="rounded-lg shadow-lg" />
                    </div>
                    <div className="space-y-5">
                        <img src="https://img.freepik.com/free-vector/isometric-outline-time-management-concept_52683-55736.jpg?t=st=1725143373~exp=1725146973~hmac=2edf0986f7ebb3a5132cf5b85fb31e8f3053a6109ad861022ecacee5673ea374&w=740" className="rounded-lg shadow-lg" />
                        <img src="https://img.freepik.com/premium-photo/man-from-call-center-deal-with-customer-problem-online-technical-support_906385-52472.jpg?ga=GA1.1.1079181062.1724613555&semt=ais_hybrid"  className="rounded-lg shadow-lg" />
                    </div>
                </div>
                <div className='md:w-full'>
                    <h1 className='md:text-3xl text-2xl font-semibold text-gray-800 mb-4'>
                        Whether you want to explore, you’ve come to the right place
                    </h1>
                    <p className='md:text-md mt-4 text-gray-600 leading-relaxed'>
                    BookingSpace is an innovative platform designed to streamline the process of booking meeting room slots for coworkers. Whether you’re planning a team meeting, a client presentation, or a brainstorming session, BookingSpace makes it easy to secure the perfect space for your needs. With a user-friendly interface, BookingSpace allows users to browse available rooms, view detailed descriptions and amenities, and select the ideal time slot with just a few clicks.
                    </p>
                    <p className='md:text-md mt-4 text-gray-600 leading-relaxed'>
                    With its comprehensive features and commitment to user satisfaction, BookingSpace is the go-to solution for businesses looking to efficiently manage their meeting room bookings with high quality support.Enjoy the best experience with BookSpace & we always work for betterment to enhanced the quality of yous life style, so always stay tuned with us.By simplifying the booking process, BookingSpace helps teams focus on what really matters – collaborating and achieving their goals.
                    </p>
                </div>
            </div>
            <div className='bg-gray-200 hover:shadow-2xl shadow-lg rounded-xl p-6 text-center relative overflow-hidden text-gray-600'>
                <div>
                    <h1 className='text-center text-4xl py-10'>
                        Our global community get bigger every day
                    </h1>
                    <div className='grid grid-cols-1 md:grid-cols-4  justify-items-center py-10 gap-4 text-center'>
                        <div>
                            <h1 className='text-3xl'>
                                <CountUp start={0} end={100} />+
                            </h1>
                            <p>Availabel Slots</p>
                        </div>
                        <div>
                            <h1 className='text-3xl'>
                                <CountUp start={0} end={20} />+
                            </h1>
                            <p>Collaborated Brands</p>
                        </div>
                        <div>
                            <h1 className='text-3xl'>
                                <CountUp start={0} end={10} />+
                            </h1>
                            <p>Collaborated Companies</p>
                        </div>
                        <div>
                            <h1 className='text-3xl'>100%</h1>
                            <p>Satisfaction Rate</p>
                        </div>
                    </div>
                </div>
            </div>
            

                <Team/>
                
            
        </Container>
    );
};

export default AboutUs;
