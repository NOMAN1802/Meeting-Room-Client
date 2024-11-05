import AnimatedText from "../AnimatedText/AnimatedText";
import Button from "../Button/Button";
import { Link } from "react-router-dom";

const BannerText = () => {
    return (
        <div>
            <div>
                {/* Hide on small screens, show on medium and larger screens */}
                <AnimatedText
                    text="Book Your Ideal Meeting Room with Ease"
                    textStyles="hidden md:block text-gray-100 rounded-md p-2 md:text-4xl text-center my-4"
                />
                <AnimatedText
                    text="Efficient, hassle-free room booking for all your meeting needs."
                    textStyles="hidden md:block text-gray-100 rounded-md p-1 md:text-lg text-center my-4"
                />
            </div>
            <Link to='/meeting-rooms'>
                <div className="hidden md:block md:w-1/4 md:mx-auto md:mt-4">
                    <Button label='Explore More' />
                </div>
            </Link>
        </div>
    );
};

export default BannerText;
