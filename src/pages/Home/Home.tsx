import Banner from "../../components/Banner/Banner";
import ChooseUs from "../../components/ChooseUs/ChooseUs";
import Container from "../../components/Container/Container";
import FeaturedRooms from "../../components/FeaturedRooms/FeaturedRooms";
import SerViceAd from "../../components/ServiceAd/SerViceAd";
import WorkFlow from "../../components/WorkFlow/WorkFlow";

const Home = () => {
    return (
        <Container>
            <Banner/>
            <SerViceAd/>
            <FeaturedRooms/>
            <ChooseUs/>
            <WorkFlow/>
        </Container>
    );
};

export default Home;