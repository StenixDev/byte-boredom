'use client';

import { createContext, useContext, useState } from 'react';

const GlobalContext = createContext();

const initialize = {
  name: '',
};

export const GlobalProvider = ({ children }) => {
  const [data, setData] = useState([]);

  return (
    <GlobalContext.Provider value={{ data, setData }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook for easier use
export const useGlobal = () => useContext(GlobalContext);
