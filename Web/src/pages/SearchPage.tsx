import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Filter, SortAsc } from 'lucide-react';
import SearchForm from '../components/SearchForm';
import VehicleCard from '../components/VehicleCard';
import { SearchFilters, Vehicle } from '../types';
import { mockVehicles } from '../data/mockData';

const SearchPage: React.FC = () => {
  const location = useLocation();
  const initialFilters = location.state?.filters || {};
  
  const [filters, setFilters] = useState<SearchFilters>({
    location: '',
    vehicleType: '',
    priceRange: [0, 1000],
    hasDriver: null,
    transmission: '',
    fuelType: '',
    ...initialFilters
  });
  const [vehicles, setVehicles] = useState<Vehicle[]>(mockVehicles);
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>(mockVehicles);
  const [sortBy, setSortBy] = useState<'price' | 'rating' | 'name'>('price');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    applyFilters();
  }, [filters, vehicles, sortBy, sortOrder]);

  const applyFilters = () => {
    let filtered = vehicles.filter(vehicle => {
      const matchesLocation = !filters.location || vehicle.location === filters.location;
      const matchesType = !filters.vehicleType || vehicle.type === filters.vehicleType;
      const matchesPrice = vehicle.pricePerDay >= filters.priceRange[0] && 
                          vehicle.pricePerDay <= filters.priceRange[1];
      const matchesDriver = filters.hasDriver === null || vehicle.hasDriver === filters.hasDriver;
      const matchesTransmission = !filters.transmission || vehicle.transmission === filters.transmission;
      const matchesFuel = !filters.fuelType || vehicle.fuelType === filters.fuelType;
      
      return matchesLocation && matchesType && matchesPrice && 
             matchesDriver && matchesTransmission && matchesFuel;
    });

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: number | string;
      let bValue: number | string;

      switch (sortBy) {
        case 'price':
          aValue = a.pricePerDay;
          bValue = b.pricePerDay;
          break;
        case 'rating':
          aValue = a.rating;
          bValue = b.rating;
          break;
        case 'name':
          aValue = a.name;
          bValue = b.name;
          break;
        default:
          aValue = a.pricePerDay;
          bValue = b.pricePerDay;
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      } else {
        return sortOrder === 'asc' ? 
          (aValue as number) - (bValue as number) : 
          (bValue as number) - (aValue as number);
      }
    });

    setFilteredVehicles(filtered);
  };

  const handleSearch = (newFilters: SearchFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Search Vehicles</h1>
          <SearchForm onSearch={handleSearch} initialFilters={filters} />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-5 h-5" />
              <span>Filters</span>
            </button>
          </div>

          {/* Filters Sidebar */}
          <div className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Sort By</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="sortBy"
                    value="price"
                    checked={sortBy === 'price'}
                    onChange={(e) => setSortBy(e.target.value as 'price')}
                    className="mr-2"
                  />
                  Price
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="sortBy"
                    value="rating"
                    checked={sortBy === 'rating'}
                    onChange={(e) => setSortBy(e.target.value as 'rating')}
                    className="mr-2"
                  />
                  Rating
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="sortBy"
                    value="name"
                    checked={sortBy === 'name'}
                    onChange={(e) => setSortBy(e.target.value as 'name')}
                    className="mr-2"
                  />
                  Name
                </label>
              </div>

              <div className="mt-4">
                <button
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
                >
                  <SortAsc className="w-4 h-4" />
                  <span>{sortOrder === 'asc' ? 'Ascending' : 'Descending'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="flex-1">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {filteredVehicles.length} Vehicle{filteredVehicles.length !== 1 ? 's' : ''} Found
              </h2>
            </div>

            {filteredVehicles.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-500 text-lg">No vehicles found matching your criteria</div>
                <p className="text-gray-400 mt-2">Try adjusting your filters to see more results</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredVehicles.map((vehicle) => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;