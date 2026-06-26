import { useState, useMemo } from 'react';
import { NotebooksContext } from './NotebooksContext';

export function NotebooksProvider({ children }) {
  const [dataSource, setDataSource] = useState('local');

  const contextValue = useMemo(() => ({
    dataSource,
    setDataSource,
  }), [dataSource]);

  return (
    <NotebooksContext.Provider value={contextValue}>
      {children}
    </NotebooksContext.Provider>
  );
}



