
import React from 'react';
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="relative">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search events..."
        className="w-[200px] pl-8 rounded-full bg-secondary"
      />
    </div>
  );
};

export default SearchBar;
