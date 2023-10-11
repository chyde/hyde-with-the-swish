import { createContext, useContext, useState, ReactNode } from "react";
import { useTeamsPlayersProps } from "./TeamsPlayersProvider";
import { TeamsPlayerPropType } from "./MarketTypes";

export type FiltersType = {
  searchString?: string;
  position?: string;
  statTypeId?: number;
  marketStatus?: number; // 0, 1, undefined
};

type UpdateFiltersType = (newFilters: FiltersType) => void;

const FiltersContext = createContext<{
  filters: FiltersType;
  updateFilters: UpdateFiltersType;
}>({
  filters: {},
  updateFilters: () => {},
});

export default function FiltersProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<FiltersType>({});

  const updateFilters: UpdateFiltersType = (newFilters: FiltersType) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  };

  return (
    <FiltersContext.Provider value={{ filters, updateFilters }}>
      {children}
    </FiltersContext.Provider>
  );
}

export const useFilters = () => {
  return useContext(FiltersContext);
};
