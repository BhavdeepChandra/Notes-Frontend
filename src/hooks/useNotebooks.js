import { useNotebooksContext } from '../context/NotebooksContext';
import { generateUUID } from '../utils/uuid';
import { formatDate } from '../utils/date';

export function useNotebooks() {
  const { notebooks, setNotebooks, activeNotebookId, setActiveNotebookId } = useNotebooksContext();

  const activeNotebook = notebooks.find((nb) => nb.id === activeNotebookId);

  const selectNotebook = (id) => setActiveNotebookId(id);
  const clearSelectedNotebook = () => setActiveNotebookId(null);

  const addNotebook = (name, description) => {
    const newNotebook = {
      id: generateUUID(),
      name,
      description,
      createdAt: formatDate(),
      notes: []
    };
    setNotebooks((prev) => [...prev, newNotebook]);
  };

  const updateNotebook = (id, name, description) => {
    setNotebooks((prev) =>
      prev.map((nb) => (nb.id === id ? { ...nb, name, description } : nb))
    );
  };

  const deleteNotebook = (id) => {
    setNotebooks((prev) => prev.filter((nb) => nb.id !== id));
    if (activeNotebookId === id) {
      clearSelectedNotebook();
    }
  };

  return {
    notebooks,
    activeNotebook,
    activeNotebookId,
    selectNotebook,
    clearSelectedNotebook,
    addNotebook,
    updateNotebook,
    deleteNotebook,
  };
}
