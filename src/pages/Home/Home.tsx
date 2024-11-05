import Banner from "../../components/Banner/Banner";
import ChooseUs from "../../components/ChooseUs/ChooseUs";
import Container from "../../components/Container/Container";
import FeaturedRooms from "../../components/FeaturedRooms/FeaturedRooms";
import SerViceAd from "../../components/ServiceAd/SerViceAd";
import Testimonials from "../../components/Testimonials/Testimonials";
import WorkFlow from "../../components/WorkFlow/WorkFlow";

const Home = () => {
    return (
        <>
        <Banner/>
        <Container>
            <SerViceAd/>
            <FeaturedRooms/>
            <ChooseUs/>
            <WorkFlow/>
            <Testimonials/>
        </Container>
        </>
    );
};

export default Home;