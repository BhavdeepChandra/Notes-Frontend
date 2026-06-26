import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotebooksContext } from '../context/NotebooksContext';
import { dataService } from '../services/dataService';

export function useNotebooks() {
  const {
    dataSource,
    setDataSource,
  } = useNotebooksContext();

  const [notebooks, setNotebooks] = useState([]);
  const navigate = useNavigate();

  const selectNotebook = useCallback((id) => {
    navigate(`/notebook/${id}`);
  }, [navigate]);

  const clearSelectedNotebook = useCallback(() => {
    navigate('/');
  }, [navigate]);

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
    selectNotebook,
    clearSelectedNotebook,
    addNotebook,
    updateNotebook,
    deleteNotebook,
    dataSource,
    setDataSource,
  };
}


