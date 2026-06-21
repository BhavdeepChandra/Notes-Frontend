import { useNotebooksContext } from '../context/NotebooksContext';
import { generateUUID } from '../utils/uuid';
import { formatDate } from '../utils/date';

export function useNotes(notebookId) {
  const { notebooks, setNotebooks } = useNotebooksContext();

  const notebook = notebooks.find((nb) => nb.id === notebookId);
  const notes = notebook?.notes || [];

  const addNote = ({ name, data }) => {
    if (!notebookId) return;
    const newNote = {
      id: generateUUID(),
      name,
      data,
      createdAt: formatDate(),
      archived: false,
    };

    setNotebooks((prev) =>
      prev.map((nb) =>
        nb.id === notebookId ? { ...nb, notes: [newNote, ...nb.notes] } : nb
      )
    );
  };

  const updateNote = (noteId, { name, data }) => {
    if (!notebookId) return;
    setNotebooks((prev) =>
      prev.map((nb) => {
        if (nb.id !== notebookId) return nb;
        return {
          ...nb,
          notes: nb.notes.map((note) =>
            note.id === noteId ? { ...note, name, data } : note
          ),
        };
      })
    );
  };

  const archiveNote = (noteId) => {
    if (!notebookId) return;
    setNotebooks((prev) =>
      prev.map((nb) => {
        if (nb.id !== notebookId) return nb;
        return {
          ...nb,
          notes: nb.notes.map((note) =>
            note.id === noteId ? { ...note, archived: true } : note
          ),
        };
      })
    );
  };

  return {
    notes,
    addNote,
    updateNote,
    archiveNote,
  };
}
