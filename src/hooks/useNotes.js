import { useNotebooksContext } from '../context/NotebooksContext';
import { dataService } from '../services/dataService';

export function useNotes(notebookId) {
  const { notebooks, setNotebooks, dataSource } = useNotebooksContext();

  const notebook = notebooks.find((nb) => nb.id === notebookId);
  const notes = notebook?.notes || [];

  const addNote = async ({ name, data }) => {
    if (!notebookId) return;
    const newNote = await dataService.createNote(dataSource, notebookId, name, data);

    setNotebooks((prev) =>
      prev.map((nb) =>
        nb.id === notebookId ? { ...nb, notes: [newNote, ...nb.notes] } : nb
      )
    );
  };

  const updateNote = async (noteId, { name, data }) => {
    if (!notebookId) return;
    const updated = await dataService.updateNote(dataSource, notebookId, noteId, name, data);
    setNotebooks((prev) =>
      prev.map((nb) => {
        if (nb.id !== notebookId) return nb;
        return {
          ...nb,
          notes: nb.notes.map((note) =>
            note.id === noteId ? { ...note, ...updated } : note
          ),
        };
      })
    );
  };

  const archiveNote = async (noteId) => {
    if (!notebookId) return;
    await dataService.archiveNote(dataSource, notebookId, noteId);
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

