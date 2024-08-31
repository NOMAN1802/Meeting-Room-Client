/* eslint-disable prefer-const */
import { useEffect, useState } from "react";
import Container from "../../components/Container/Container";
import PageTitle from "../../components/PageTitle/PageTitle";
import RoomCard from "../../components/RoomCard/RoomCard";
import SearchSection from "../../components/SearchSection/SearchSection";
import { useGetRoomsQuery } from "../../redux/api/admin/roomManagement.api";
import { Filters, SortOption, TRoom } from "../../types";
import { generateBreadcrumbs } from "../../utils/getPageTitleData";

const MeetingRoom = () => {


    const { data: rooms, isLoading } = useGetRoomsQuery({});
    const [filteredRooms, setFilteredRooms] = useState<TRoom[]>([]);
    const [allRooms, setAllRooms] = useState<TRoom[]>([]);
  
    useEffect(() => {
      if (rooms) {
        setAllRooms(rooms.data);
        setFilteredRooms(rooms.data);
      }
    }, [rooms]);
  
    const handleSearch = (searchText: string) => {
      const filtered = allRooms.filter(
        (room) =>
          room.name.toLowerCase().includes(searchText.toLowerCase()) ||
          room.category.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredRooms(filtered);
    };
  
    const handleFilter = (filters: Filters) => {
      const { category, minPrice, maxPrice } = filters;
      let filtered = allRooms;
      
      if (category !== "All Categories") {
        filtered = filtered.filter((room) => room.category === category);
      }
  
      if (minPrice) {
        filtered = filtered.filter((room) => room.pricePerSlot >= parseFloat(minPrice));
      }
  
      if (maxPrice) {
        filtered = filtered.filter((room) => room.pricePerSlot <= parseFloat(maxPrice));
      }
  
      setFilteredRooms(filtered);
    };
  
    const handleSort = (sortOption: SortOption) => {
      let sorted = [...filteredRooms];
      
      if (sortOption === "Price: Low to High") {
        sorted.sort((a, b) => a.pricePerSlot - b.pricePerSlot);
      } else if (sortOption === "Price: High to Low") {
        sorted.sort((a, b) => b.pricePerSlot - a.pricePerSlot);
      }
  
      setFilteredRooms(sorted);
    };
  
    const breadcrumbItems = [
      { label: "Home", path: "/" },
      { label: "Meeting Rooms", path: '/meeting-rooms' },
    ];
  
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-500"></div>
        </div>
      );
    }
    return (
        <Container>
          {generateBreadcrumbs(breadcrumbItems)}
        <PageTitle heading="All Rooms" subHeading="Enhanced Your Expedience" />
        <SearchSection onSearch={handleSearch} onFilter={handleFilter} onSort={handleSort} />
        <div className="pt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredRooms.map((room: TRoom) => (
            <RoomCard key={room?._id} room={room} />
          ))}
        </div>
      </Container>
    );
};

export default MeetingRoom;