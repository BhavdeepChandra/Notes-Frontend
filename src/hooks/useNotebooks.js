import { useState, useEffect, useCallback } from 'react';
import { useNotebooksContext } from '../context/NotebooksContext';
import { dataService } from '../services/dataService';

export function useNotebooks() {
  const {
    activeNotebookId,
    setActiveNotebookId,
    dataSource,
    setDataSource,
  } = useNotebooksContext();

  const [notebooks, setNotebooks] = useState([]);

  const selectNotebook = useCallback((id) => setActiveNotebookId(id), [setActiveNotebookId]);
  const clearSelectedNotebook = useCallback(() => setActiveNotebookId(null), [setActiveNotebookId]);

  const addNotebook = useCallback(async (name, description) => {
    const newNotebook = await dataService.createNotebook(dataSource, name, description);
    setNotebooks((prev) => [...prev, newNotebook]);
  }, [dataSource]);

  const updateNotebook = useCallback(async (id, name, description) => {
    const updated = await dataService.updateNotebook(dataSource, id, name, description);
    setNotebooks((prev) =>
      prev.map((nb) => (nb.id === id ? { ...nb, ...updated } : nb))
    );
  }, [dataSource]);

  const deleteNotebook = useCallback(async (id) => {
    await dataService.deleteNotebook(dataSource, id);
    setNotebooks((prev) => prev.filter((nb) => nb.id !== id));
  }, [dataSource]);

  useEffect(() => {
    let active = true;
    const loadNotebooks = async () => {
      const data = await dataService.getNotebooks(dataSource);
      if (active) {
        setNotebooks(data);
      }
    };
    loadNotebooks();
    return () => {
      active = false;
    };
  }, [dataSource]);

  return {
    notebooks,
    activeNotebookId,
    selectNotebook,
    clearSelectedNotebook,
    addNotebook,
    updateNotebook,
    deleteNotebook,
    dataSource,
    setDataSource,
  };
}


