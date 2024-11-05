import { useState, ChangeEvent, FormEvent } from 'react';
import { Input, Select, Button, Row, Col } from 'antd';
import { IoSearchOutline } from 'react-icons/io5';
import { Filters, SortOption } from '../../types';

const { Option } = Select;

const categories = [
  { name: 'All Categories' },
  { name: 'Regular' },
  { name: 'Featured' },
];

const sortOptions: SortOption[] = ['Price: Low to High', 'Price: High to Low'];

interface SearchSectionProps {
  onSearch: (searchText: string) => void;
  onFilter: (filters: Filters) => void;
  onSort: (sortOption: SortOption) => void;
}

const SearchSection: React.FC<SearchSectionProps> = ({ onSearch, onFilter, onSort }) => {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categories[0].name);
  const [selectedSort, setSelectedSort] = useState<SortOption>('Price: Low to High');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    onSearch(searchText);
  };

  const handleFilter = () => {
    onFilter({
      category: selectedCategory,
      minPrice,
      maxPrice,
    });
  };

  const handleSort = (value: SortOption) => {
    setSelectedSort(value);
    onSort(value);
  };

  const handleClearFilters = () => {
    setSearchText('');
    setSelectedCategory('All Categories');
    setSelectedSort('Price: Low to High');
    setMinPrice('');
    setMaxPrice('');
    onSearch('');
    onFilter({
      category: 'All Categories',
      minPrice: '',
      maxPrice: '',
    });
    onSort('Price: Low to High');
  };

  return (
    <div style={{ padding: '20px', borderRadius: '8px' }}>
      <Row gutter={[16, 16]} align="middle">
        <Col xs={24} md={6}>
          <Input
            placeholder="Search Rooms"
            prefix={<IoSearchOutline />}
            value={searchText}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value)}
          />
        </Col>
        <Col xs={24} md={2}>
          <Button onClick={handleSearch} block className="bg-gray-600 text-white">
            Search
          </Button>
        </Col>
        <Col xs={24} md={4}>
          <Input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setMinPrice(e.target.value)}
            className="rounded-md p-1" 
          />
        </Col>
        <Col xs={24} md={4}>
          <Input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setMaxPrice(e.target.value)}
            className="rounded-md p-1" 
          />
        </Col>
        <Col xs={24} md={4}>
          <Select
            value={selectedCategory}
            onChange={setSelectedCategory}
            style={{ width: '100%' }}
          >
            {categories.map((category, idx) => (
              <Option key={idx} value={category.name}>
                {category.name}
              </Option>
            ))}
          </Select>
        </Col>
        <Col xs={24} md={4}>
          <Select
            value={selectedSort}
            onChange={handleSort}
            style={{ width: '100%' }}
          >
            {sortOptions.map((option, idx) => (
              <Option key={idx} value={option}>
                {option}
              </Option>
            ))}
          </Select>
        </Col>
        
        <Col xs={24} md={2}>
          <Button onClick={handleFilter} block className="bg-gray-600 text-white">
            Apply
          </Button>
        </Col>
        <Col xs={24} md={2}>
          <Button onClick={handleClearFilters} block className="bg-gray-600 text-white">
            Clear
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default SearchSection;