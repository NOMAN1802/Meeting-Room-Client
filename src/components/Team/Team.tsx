import Marquee from 'react-fast-marquee';
import SectionTitle from '../SectionTitle/SectionTitle';

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
        <SectionTitle heading='Team' subHeading='Meet our co-workers'/>
        <div className='max-w-screen-xl md:mx-auto mx-7 my-6'>
            
            <div className='my-10 '>
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