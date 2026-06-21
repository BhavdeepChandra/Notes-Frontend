import { createContext, useContext } from 'react';

export const NotebooksContext = createContext(null);

export function useNotebooksContext() {
  const context = useContext(NotebooksContext);
  if (!context) {
    throw new Error('useNotebooksContext must be used within a NotebooksProvider');
  }
  return context;
}
