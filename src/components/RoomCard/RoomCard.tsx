import { Link } from "react-router-dom";
import Button from "../Button/Button";
import { FaLandmark } from "react-icons/fa6";
import { MdProductionQuantityLimits } from "react-icons/md";
import { FaDollarSign } from "react-icons/fa";
import { TRoom } from "../../types/index";

const RoomCard = ({ room }: { room: TRoom }) => {
  return (
    <div className="relative rounded overflow-hidden shadow-xl transform hover:scale-110 duration-100 -right-1 -skew-x-2">
      <img src={room.photo} alt="" className="w-full h-52 object-cover" />

      <div className="absolute bottom-48 left-0">
        <p className="relative -right-1 -skew-x-6 bg-gray-500 px-4 py-2 font-bold text-white opacity-25">
          {room.category}
        </p>
      </div>

      <div className="flex flex-col items-start my-2 py-2 space-y-2">
        <div className="font-semibold text-lg text-gray-600 mx-2">
          {room?.name}
        </div>

        <div className="flex flex-row items-center justify-between w-full">
          <p className="mx-2 flex flex-row items-center justify-between gap-2 text-gray-500 text-sm">
            <FaLandmark />
            Room Number: {room?.roomNo}
          </p>
        </div>

        <div className="flex flex-row items-center justify-between w-full">
          <div>
            <p className="mx-2 flex flex-row items-center justify-between gap-2 text-gray-500 text-sm">
              <MdProductionQuantityLimits />
              Capacity: {room?.capacity}
            </p>
          </div>

          <div>
            <p className="mx-2 flex flex-row items-center justify-between gap-2 text-gray-600 text-sm">
              <FaDollarSign />
              Price: {room?.pricePerSlot}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-start w-full">
          <span className="text-gray-500 text-sm mx-2">Amenities:</span>
          <div className="flex flex-wrap gap-2 mx-2">
            {room?.amenities?.map((amenity, index) => (
              <span
                key={index}
                className="bg-gray-200 text-gray-600 px-2 py-1 rounded text-xs"
              >
                {amenity}
              </span>
            ))}
          </div>
        </div>

        <div className="flex justify-end w-full mt-4 px-2">
          <Link to={`/meeting-rooms/${room?._id}`}>
            <Button label="View Details" small />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
