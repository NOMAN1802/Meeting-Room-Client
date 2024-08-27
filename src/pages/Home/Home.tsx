import Banner from "../../components/Banner/Banner";
import Container from "../../components/Container/Container";
import FeaturedRooms from "../../components/FeaturedRooms/FeaturedRooms";
import SerViceAd from "../../components/ServiceAd/SerViceAd";

const Home = () => {
    return (
        <Container>
            <Banner/>
            <SerViceAd/>
            <FeaturedRooms/>
        </Container>
    );
};

export default Home;