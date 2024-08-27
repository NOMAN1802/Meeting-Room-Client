import SectionTitle from "../SectionTitle/SectionTitle";
import { TRoom } from "../../types/index";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import { useGetRoomsQuery } from "../../redux/api/admin/roomManagement.api";
import RoomCard from "../RoomCard/RoomCard";

const FeaturedRooms = () => {
    const { data: rooms, isLoading } = useGetRoomsQuery({});

    if (isLoading) {
      return (
        <p className="text-3xl text-center text-yellow-500 my-2 font-bold">
          Loading....
        </p>
      );
    }
  
    console.log('Fetched rooms:', rooms);
  
    const featuredRooms = rooms?.data
      ?.filter((room: TRoom) => room?.category === 'featured')
      .slice(0, 6);
  
    console.log('Featured rooms:', featuredRooms);
  
    return (
      <div>
        <SectionTitle heading="Featured Rooms" subHeading="Grab the best one" />
        <div className="pt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {featuredRooms?.map((room: TRoom) => (
            <RoomCard key={room?._id} room={room} />
          ))}
        </div>
        <div className="flex justify-center items-center mt-6">
          <Link to="/meeting-rooms">
            <Button label="Show All" />
              
          </Link>
        </div>
      </div>
    );
  };


export default FeaturedRooms;