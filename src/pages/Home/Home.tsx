import Banner from "../../components/Banner/Banner";
import ChooseUs from "../../components/ChooseUs/ChooseUs";
import Container from "../../components/Container/Container";
import FeaturedRooms from "../../components/FeaturedRooms/FeaturedRooms";
import SerViceAd from "../../components/ServiceAd/SerViceAd";

const Home = () => {
    return (
        <Container>
            <Banner/>
            <SerViceAd/>
            <FeaturedRooms/>
            <ChooseUs/>
        </Container>
    );
};

export default Home;