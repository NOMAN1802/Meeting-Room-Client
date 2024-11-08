import { Link, useParams } from "react-router-dom";
import { useGetSingleRoomQuery } from "../../redux/api/admin/roomManagement.api";
import Container from "../../components/Container/Container";
import Button from "../../components/Button/Button";
import { RootState } from "../../redux/store"; 
import { useAppSelector } from "../../redux/hooks";

import { FaWifi, FaDesktop, FaMicrophone, FaChalkboard, FaMusic } from "react-icons/fa"; 
// Define icons for the specified amenities
const amenityIcons: { [key: string]: JSX.Element } = {
  Computer: <FaDesktop />,
  "Sound System": <FaMusic />,
  Wifi: <FaWifi />,
  "Micro Phone": <FaMicrophone />,
  "White Board": <FaChalkboard />,
};

const RoomDetails = () => {
  const { id } = useParams();
  const { data } = useGetSingleRoomQuery(id as string);
  const userRole = useAppSelector((state: RootState) => state.auth.user?.role);


  return (
    <Container>
      <div className="pt-8">
        <div className="flex items-center">
          <ol className="flex w-full items-center overflow-hidden">
            <li className="text-body hover:text-heading px-4 text-sm transition duration-200 ease-in first:pl-0 last:pr-0">
              <Link to="/">Home</Link>
            </li>
            <li className="text-body mt-0.5 text-base">/</li>
            <li className="text-body hover:text-heading px-4 text-sm transition duration-200 ease-in first:pl-0 last:pr-0">
              <Link to="/meeting-rooms" className="capitalize">
                Meeting Rooms
              </Link>
            </li>
            <li className="text-body mt-0.5 text-base">/</li>
            <li className="text-body hover:text-heading px-4 text-sm transition duration-200 ease-in first:pl-0 last:pr-0">
              <a className="capitalize" href="#">
                {data?.data.name}
              </a>
            </li>
          </ol>
        </div>
      </div>

      <div className="block lg:grid lg:grid-cols-9 items-start gap-x-10 pb-10 pt-7 lg:pb-14 xl:gap-x-14 2xl:pb-20">
        <div className="col-span-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
            {[data?.data.photo, data?.data.extraPhoto].map((image: string, i: number) => (
              <div
                key={i}
                className="h-full transition duration-150 ease-in hover:opacity-90"
              >
                <img
                 
                  src={image}
                  alt={`Room Image ${i + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            ))}
            
          </div>
          {/* Details */}
          <div className="border-b border-gray-300 p-3">
          </div>
          <div className="mb-4">
            <p className="text-heading mb-3.5 text-lg font-bold md:text-xl lg:text-2xl 2xl:text-3xl capitalize my-6">About {data?.data?.name} :</p>
              <p className="text-md my-6 text-gray-600 leading-relaxed">{data?.data?.details}</p>
            </div>
            
        </div>

        <div className="col-span-3 pt-8 lg:pt-0">
          <div className="mb-7 border-b border-gray-300 pb-7">
            <h2 className="text-heading mb-3.5 text-lg font-bold md:text-xl lg:text-2xl 2xl:text-3xl">
              {data?.data.name}
            </h2>

            <div className="mt-5 flex items-center">
              <div className="text-xl pr-2 text-gray-600 font-bold md:pr-0 md:text-xl lg:pr-2 lg:text-lg 2xl:pr-0 2xl:text-4xl">
                Price Per Slot: ${data?.data.pricePerSlot}
              </div>
            </div>
          </div>
          <div className="border-b border-gray-300 pb-3">
            <div className="mb-4">
              <h3 className="text-heading mb-4 text-base font-semibold capitalize md:text-lg">
                Meeting Room Details
              </h3>
              <div className="pb-6 text-sm leading-7 text-gray-600 md:pb-7 flex justify-between items-center">
                <p>Room No: {data?.data.roomNo}</p>
                <p>Floor No: {data?.data.floorNo}</p>
                <p>Capacity: {data?.data.capacity}</p>
              </div>
            </div>
            <div className="border-b border-gray-300 pb-3">
            <h3 className="text-heading mb-4 text-base font-semibold capitalize md:text-lg">
            Amenities
          </h3>
          <ul className="flex flex-wrap items-center gap-4">
            {data?.data.amenities.map((amenity: string) => (
              <li
                
                className="flex items-center gap-2 p-2 text-sm font-semibold border border-gray-300 bg-gray-200 rounded-lg"
              >
                {amenityIcons[amenity] || <FaDesktop />} 
                {amenity}
              </li>
            ))}
          </ul>
        </div>

          </div>
          
            <Link to={userRole !== 'admin' ? `/booking/${id}` : '#'}>
              <Button label="Book Now"
               disabled={userRole === 'admin'} 
               />
            </Link>
          
        </div>
      </div>
    </Container>
  );
};

export default RoomDetails;
