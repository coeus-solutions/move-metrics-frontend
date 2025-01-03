import { Search } from 'lucide-react';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash/debounce';
import { 
  fetchCities, 
  selectAllCities, 
  selectCitiesLoading, 
  searchCities,
  type City 
} from '../../store/slices/citiesSlice';
import { AppDispatch } from '../../store';

interface CitySelectorProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function CitySelector({ label, value, onChange, placeholder }: CitySelectorProps) {
  const dispatch = useDispatch<AppDispatch>();
  const allCities = useSelector(selectAllCities);
  const isLoading = useSelector(selectCitiesLoading);
  
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [filteredCities, setFilteredCities] = useState<City[]>([]);
  const [hasMore, setHasMore] = useState(true);
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef<HTMLDivElement>(null);

  // Fetch cities on mount
  useEffect(() => {
    dispatch(fetchCities());
  }, [dispatch]);

  // Update filtered cities when search term or page changes
  useEffect(() => {
    const result = searchCities(allCities, searchTerm, page);
    setFilteredCities(prev => page === 1 ? result.cities : [...prev, ...result.cities]);
    setHasMore(result.hasMore);
  }, [allCities, searchTerm, page]);

  const debouncedSearch = useCallback(
    debounce(() => {
      setPage(1);
    }, 300),
    []
  );

  useEffect(() => {
    debouncedSearch();
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTerm, debouncedSearch]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !isLoading && isOpen) {
          setPage(prev => prev + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }

    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasMore, isLoading, isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchTerm(newValue);
    setIsOpen(true);
    if (!newValue) {
      onChange('');
    }
  };

  const handleSelectCity = (city: City) => {
    onChange(city.city);
    setSearchTerm(`${city.city} (${city.country})`);
    setIsOpen(false);
  };

  return (
    <div className="w-full" ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          className="block w-full pl-10 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          placeholder={placeholder || 'Search for a city...'}
        />
        {isOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
            {filteredCities.map(city => (
              <div
                key={city.id}
                className={`cursor-pointer select-none relative py-2 pl-10 pr-4 hover:bg-indigo-50 ${
                  value === city.city ? 'bg-indigo-50 text-indigo-600' : 'text-gray-900'
                }`}
                onClick={() => handleSelectCity(city)}
              >
                {city.city} ({city.country})
              </div>
            ))}
            {(isLoading || hasMore) && (
              <div
                ref={loadingRef}
                className="py-2 text-center text-sm text-gray-500"
              >
                {isLoading ? 'Loading cities...' : 'Scroll for more...'}
              </div>
            )}
            {!isLoading && !hasMore && filteredCities.length === 0 && (
              <div className="py-2 text-center text-sm text-gray-500">
                No cities found
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}