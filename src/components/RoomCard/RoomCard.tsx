import { Link } from "react-router-dom";
import { FaWifi, FaMicrophone, FaDesktop, FaChalkboardTeacher, FaVolumeUp,FaRegBuilding } from "react-icons/fa";
import { MdGroups } from "react-icons/md";
import { TRoom } from "../../types/index";


const RoomCard = ({ room }: { room: TRoom }) => {
  // Mapping amenities to icons
  const amenityIcons: { [key: string]: JSX.Element } = {
    Wifi: <FaWifi />,
    "White Board": <FaChalkboardTeacher />,
    "Micro Phone": <FaMicrophone />,
    "Sound System": <FaVolumeUp />,
    Computer: <FaDesktop />,
  };

  return (
    <div className="relative rounded-lg overflow-hidden shadow-lg bg-white border border-gray-200 hover:shadow-2xl transform hover:scale-105 transition duration-300 flex flex-col">
      {/* Category Label */}
      <div className="absolute top-3 left-3">
        <span
          className={`${
            room.category === "featured" ? "bg-gray-600" : "bg-gray-400"
          } text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm`}
        >
          {room.category.charAt(0).toUpperCase() + room.category.slice(1)}
        </span>
      </div>

      {/* Image */}
      <img src={room.photo} alt="Room" className="w-full h-56 object-cover transition-transform duration-500 hover:scale-110" />

      {/* Room Details */}
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{room.name}</h3>
        
        {/* Room Info */}
        <div className="flex items-center justify-between gap-4 text-gray-600 text-sm mt-1 mb-4">
          <p className="flex items-center gap-1">
            <MdGroups className="text-gray-600" /> Capacity: {room.capacity}
          </p>
          <p className="flex items-center gap-1"><FaRegBuilding className="text-gray-600" /> Room No: {room.roomNo}</p>
        </div>

        {/* Amenities Section */}
        <div className="mt-2 mb-4">
          
          <div className="flex flex-wrap gap-4 text-xs text-gray-600">
          <h4 className="text-sm text-gray-500 font-semibold mb-2">Amenities:</h4>
            {room.amenities.map((amenity, index) => (
              <span
                key={index}
                className="flex items-center gap-1 bg-gray-200 text-gray-700 px-2 py-1 rounded-full hover:scale-105 shadow-sm"
              >
                {amenityIcons[amenity]} 
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex items-center justify-between p-4 bg-gray-50 border-t">
        <p className="text-2xl font-semibold text-gray-600">
          ${room.pricePerSlot} <span className="text-sm text-gray-500">per slot</span>
        </p>

        {/* Button */}
        <Link to={`/meeting-rooms/${room._id}`}>
  <button className="bg-gray-600 hover:bg-gray-700 text-white text-base font-medium px-4 py-1.5 rounded-full">
    View Details
  </button>
</Link>

      </div>
    </div>
  );
};

export default RoomCard;
