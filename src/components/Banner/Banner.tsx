import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { CSSProperties } from 'react';
import BannerImag2 from '../../assets/images/banner-2.jpeg'
import BannerImag3 from '../../assets/images/banner-3.jpeg'
import BannerImag4 from '../../assets/images/banner-4.jpeg'
import BannerText from '../BannerText/BannerText';

const Banner = () => {

    const arrowStyles : CSSProperties = {
        position: 'absolute',
        zIndex: 2,
        top: 'calc(50% - 25px)',  
        width: 30,  
        height: 30, 
        cursor: 'pointer',
        color: '#ffff',
        background: '#000000',
        opacity: '.6', 
        borderRadius: '50%', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '16px', 
        padding: '10px', 
    };
    return (
        <div className="relative sm:h-full md:h-[70vh] overflow-hidden">
      <div>
        <Carousel
          className='relative z-10'
          showThumbs={false}
          infiniteLoop
          emulateTouch
          swipeable
          showArrows
          renderArrowPrev={(onClickHandler, hasPrev, label) =>
            hasPrev && (
              <FaArrowLeft
                style={{ ...arrowStyles, left: 16, }}
                onClick={onClickHandler}
                title={label}
              />
            )
          }
          renderArrowNext={(onClickHandler, hasNext, label) =>
            hasNext && (
              <FaArrowRight
                style={{ ...arrowStyles, right: 16 }}
                onClick={onClickHandler}
                title={label}
              />
            )
          }
        >
          
         
          <div className="slide">
            <img className="h-2/3 object-cover w-full" src={BannerImag2} alt="Banner 2" />
          </div>
          <div className="slide">
            <img className="h-2/3 object-cover w-full" src={BannerImag3} alt="Banner 3" />
          </div>
          <div className="slide">
            <img className="h-2/3 object-cover w-full" src={BannerImag4} alt="Banner 4" />
          </div>
        </Carousel>
      </div>
<div className='absolute bottom-48  left-48 w-2/3 p-4 z-10 hidden md:block'>
<BannerText />
</div>
<div className='block md:hidden mt-4'>
<BannerText />
</div>
        </div>


    );
};

export default Banner;