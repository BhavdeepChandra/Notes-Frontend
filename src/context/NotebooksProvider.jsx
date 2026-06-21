import { useState, useMemo, useEffect } from 'react';
import { NotebooksContext } from './NotebooksContext';
import { dataService } from '../services/dataService';

export function NotebooksProvider({ children }) {
  const [localNotebooks, setLocalNotebooks] = useState([]);
  const [apiNotebooks, setApiNotebooks] = useState([]);

  const [activeNotebookId, setActiveNotebookId] = useState(null);
  const [dataSource, setDataSource] = useState('local');

  useEffect(() => {
    let active = true;
    const load = async () => {
      const data = await dataService.getNotebooks(dataSource);
      if (active) {
        if (dataSource === 'local') {
          setLocalNotebooks(data);
        } else {
          setApiNotebooks(data);
        }
      }
    };
    load();
    return () => {
      active = false;
    };
  }, [dataSource]);

  useEffect(() => {
    setActiveNotebookId(null);
  }, [dataSource]);

  const notebooks = dataSource === 'local' ? localNotebooks : apiNotebooks;
  const setNotebooks = dataSource === 'local' ? setLocalNotebooks : setApiNotebooks;

  const contextValue = useMemo(() => ({
    notebooks,
    setNotebooks,
    activeNotebookId,
    setActiveNotebookId,
    dataSource,
    setDataSource,
  }), [notebooks, setNotebooks, activeNotebookId, dataSource]);

  return (
    <NotebooksContext.Provider value={contextValue}>
      {children}
    </NotebooksContext.Provider>
  );
}



