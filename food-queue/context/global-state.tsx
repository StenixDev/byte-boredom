'use client';

import { createContext, useContext, useState, Dispatch, SetStateAction } from 'react';
import { FoodType } from '../app/components/types';

type GlobalContextType = {
  data: FoodType[];
  setData: Dispatch<SetStateAction<FoodType[]>>;
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<FoodType[]>([]);

  return (
    <GlobalContext.Provider value={{ data, setData }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook for easier use
export const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobal must be used within a GlobalProvider');
  }
  return context;
};
