import { useState, useEffect } from 'react';
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

  const selectNotebook = (id) => setActiveNotebookId(id);
  const clearSelectedNotebook = () => setActiveNotebookId(null);

  const addNotebook = async (name, description) => {
    const newNotebook = await dataService.createNotebook(dataSource, name, description);
    setNotebooks((prev) => [...prev, newNotebook]);
  };

  const updateNotebook = async (id, name, description) => {
    const updated = await dataService.updateNotebook(dataSource, id, name, description);
    setNotebooks((prev) =>
      prev.map((nb) => (nb.id === id ? { ...nb, ...updated } : nb))
    );
  };

  const deleteNotebook = async (id) => {
    await dataService.deleteNotebook(dataSource, id);
    setNotebooks((prev) => prev.filter((nb) => nb.id !== id));
    if (activeNotebookId === id) {
      clearSelectedNotebook();
    }
  };

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


