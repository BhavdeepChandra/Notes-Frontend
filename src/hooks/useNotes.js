import { useState, useEffect, useCallback } from 'react';
import { useNotebooksContext } from '../context/NotebooksContext';
import { dataService } from '../services/dataService';

const EMPTY_ARRAY = [];

export function useNotes(notebookId) {
  const { dataSource } = useNotebooksContext();
  const [notebook, setNotebook] = useState(null);

  const addNote = useCallback(async ({ name, data }) => {
    if (!notebookId) return;
    const newNote = await dataService.createNote(dataSource, notebookId, name, data);

    setNotebook((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        notes: [newNote, ...prev.notes],
      };
    });
  }, [dataSource, notebookId]);

  const updateNote = useCallback(async (noteId, { name, data }) => {
    if (!notebookId) return;
    const updated = await dataService.updateNote(dataSource, notebookId, noteId, name, data);

    setNotebook((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        notes: prev.notes.map((note) =>
          note.id === noteId ? { ...note, ...updated } : note
        ),
      };
    });
  }, [dataSource, notebookId]);

  const archiveNote = useCallback(async (noteId) => {
    if (!notebookId) return;
    await dataService.archiveNote(dataSource, notebookId, noteId);

    setNotebook((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        notes: prev.notes.map((note) =>
          note.id === noteId ? { ...note, archived: true } : note
        ),
      };
    });
  }, [dataSource, notebookId]);

  const notes = notebook?.notes || EMPTY_ARRAY;

  useEffect(() => {
    if (!notebookId) return;
    
    let active = true;
    const loadNotebook = async () => {
      const data = await dataService.getNotebook(dataSource, notebookId);
      if (active) {
        setNotebook(data);
      }
    };
    loadNotebook();
    return () => {
      active = false;
    };
  }, [notebookId, dataSource]);

  return {
    notes,
    activeNotebook: notebook,
    addNote,
    updateNote,
    archiveNote,
  };
}

