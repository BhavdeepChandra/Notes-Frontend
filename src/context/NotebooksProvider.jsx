import { useState, useMemo } from 'react';
import { NotebooksContext } from './NotebooksContext';

export function NotebooksProvider({ children }) {
  const [activeNotebookId, setActiveNotebookId] = useState(null);
  const [dataSource, setDataSource] = useState('local');
  const [prevDataSource, setPrevDataSource] = useState('local');

  if (dataSource !== prevDataSource) {
    setPrevDataSource(dataSource);
    setActiveNotebookId(null);
  }

  const contextValue = useMemo(() => ({
    activeNotebookId,
    setActiveNotebookId,
    dataSource,
    setDataSource,
  }), [activeNotebookId, dataSource]);

  return (
    <NotebooksContext.Provider value={contextValue}>
      {children}
    </NotebooksContext.Provider>
  );
}



