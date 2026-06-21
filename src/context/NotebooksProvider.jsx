import { useState, useMemo } from 'react';
import { NotebooksContext } from './NotebooksContext';
import { INITIAL_NOTEBOOKS } from './DummyData';

export function NotebooksProvider({ children }) {
  const [notebooks, setNotebooks] = useState(INITIAL_NOTEBOOKS);
  const [activeNotebookId, setActiveNotebookId] = useState(null);

  const contextValue = useMemo(() => ({
    notebooks,
    setNotebooks,
    activeNotebookId,
    setActiveNotebookId,
  }), [notebooks, activeNotebookId]);

  return (
    <NotebooksContext.Provider value={contextValue}>
      {children}
    </NotebooksContext.Provider>
  );
}
