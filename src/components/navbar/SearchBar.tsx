
import React, { useState, useEffect, useRef } from 'react';
import { Input } from "@/components/ui/input";
import { Search, Calendar, MapPin, Building } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SearchResult {
  id: number;
  title: string;
  type: 'event' | 'college';
  description?: string;
  location?: string;
  date?: string;
}

// Mock data for demonstration - replace with actual API calls
const mockEvents = [
  { id: 1, title: "National Hackathon 2023", description: "48-hour coding marathon", location: "Virtual Event", date: "Dec 15-17, 2023", category: "Tech" },
  { id: 2, title: "Business Case Competition", description: "Real-world business challenges", location: "New Delhi", date: "Dec 20, 2023", category: "Academic" },
  { id: 3, title: "Design Festival 2023", description: "Celebration of design", location: "Mumbai", date: "Jan 5-7, 2024", category: "Arts" },
  { id: 4, title: "AI/ML Workshop", description: "Machine Learning fundamentals", location: "Bangalore", date: "Jan 10, 2024", category: "Tech" },
  { id: 5, title: "Cultural Fest 2024", description: "Inter-college cultural competition", location: "Chennai", date: "Jan 15-17, 2024", category: "Cultural" }
];

const mockColleges = [
  { id: 1, name: "Indian Institute of Technology Delhi", short_name: "IIT Delhi", location: "New Delhi", state: "Delhi", college_type: "Engineering" },
  { id: 2, name: "Indian Institute of Management Ahmedabad", short_name: "IIM Ahmedabad", location: "Ahmedabad", state: "Gujarat", college_type: "Management" },
  { id: 3, name: "All India Institute of Medical Sciences", short_name: "AIIMS", location: "New Delhi", state: "Delhi", college_type: "Medical" },
  { id: 4, name: "National Institute of Technology Trichy", short_name: "NIT Trichy", location: "Tiruchirappalli", state: "Tamil Nadu", college_type: "Engineering" },
  { id: 5, name: "Indian Statistical Institute", short_name: "ISI", location: "Kolkata", state: "West Bengal", college_type: "Statistics" }
];

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Search function
  useEffect(() => {
    const searchData = async () => {
      if (query.trim().length < 2) {
        setResults([]);
        setIsOpen(false);
        return;
      }

      setLoading(true);
      try {
        const searchQuery = query.toLowerCase();
        
        // Filter events
        const eventResults: SearchResult[] = mockEvents
          .filter((event: any) => 
            event.title.toLowerCase().includes(searchQuery) ||
            event.description.toLowerCase().includes(searchQuery) ||
            event.category.toLowerCase().includes(searchQuery) ||
            event.location.toLowerCase().includes(searchQuery)
          )
          .slice(0, 5)
          .map((event: any) => ({
            id: event.id,
            title: event.title,
            type: 'event' as const,
            description: event.description,
            location: event.location,
            date: event.date
          }));

        // Filter colleges
        const collegeResults: SearchResult[] = mockColleges
          .filter((college: any) => 
            college.name.toLowerCase().includes(searchQuery) ||
            college.short_name.toLowerCase().includes(searchQuery) ||
            college.location.toLowerCase().includes(searchQuery) ||
            college.state.toLowerCase().includes(searchQuery) ||
            (college.college_type && college.college_type.toLowerCase().includes(searchQuery))
          )
          .slice(0, 5)
          .map((college: any) => ({
            id: college.id,
            title: college.name,
            type: 'college' as const,
            description: college.college_type,
            location: `${college.location}, ${college.state}`
          }));

        setResults([...eventResults, ...collegeResults]);
        setIsOpen(true);
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(searchData, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  const handleResultClick = (result: SearchResult) => {
    if (result.type === 'event') {
      navigate(`/events/${result.id}`);
    } else {
      navigate(`/colleges/${result.id}`);
    }
    setIsOpen(false);
    setQuery('');
  };

  const handleInputFocus = () => {
    if (query.length >= 2 && results.length > 0) {
      setIsOpen(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className="relative hidden md:block" ref={searchRef}>
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search events, colleges..."
        className="w-[250px] pl-8 rounded-full bg-secondary/80 border-none"
        value={query}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
      />
      
      {/* Search Results Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {loading ? (
            <div className="p-4 text-center text-muted-foreground">
              Searching...
            </div>
          ) : results.length > 0 ? (
            <div className="py-2">
              {results.map((result) => (
                <button
                  key={`${result.type}-${result.id}`}
                  onClick={() => handleResultClick(result)}
                  className="w-full px-4 py-3 text-left hover:bg-secondary/50 flex items-start gap-3 border-b last:border-b-0 transition-colors"
                >
                  <div className="mt-1">
                    {result.type === 'event' ? (
                      <Calendar className="h-4 w-4 text-blue-500" />
                    ) : (
                      <Building className="h-4 w-4 text-green-500" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">{result.title}</div>
                    {result.description && (
                      <div className="text-xs text-muted-foreground mt-1 truncate">
                        {result.description}
                      </div>
                    )}
                    {result.location && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                        <MapPin className="h-3 w-3" />
                        {result.location}
                      </div>
                    )}
                    {result.date && (
                      <div className="text-xs text-muted-foreground mt-1">
                        {result.date}
                      </div>
                    )}
                    <div className="text-xs text-muted-foreground capitalize mt-1">
                      {result.type}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : query.length >= 2 ? (
            <div className="p-4 text-center text-muted-foreground">
              No results found for "{query}"
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
