import React from "react";

interface SearchContextType {
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchContext = React.createContext<SearchContextType>({
  searchInput: "",
  setSearchInput: () => {},
});
