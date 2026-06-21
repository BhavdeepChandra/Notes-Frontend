import { INITIAL_NOTEBOOKS } from '../context/DummyData';
import { generateUUID } from '../utils/uuid';
import { formatDate } from '../utils/date';

function getLocalNotebooks() {
  try {
    const data = localStorage.getItem('notes_notebooks_local');
    if (data) return JSON.parse(data);
  } catch (e) {
    console.error('Failed to parse notebooks from localStorage:', e);
  }
  localStorage.setItem('notes_notebooks_local', JSON.stringify(INITIAL_NOTEBOOKS));
  return INITIAL_NOTEBOOKS;
}

function saveLocalNotebooks(notebooks) {
  try {
    localStorage.setItem('notes_notebooks_local', JSON.stringify(notebooks));
  } catch (e) {
    console.error('Failed to save notebooks to localStorage:', e);
  }
}

function createLocalNotebook(name, description) {
  const notebooks = getLocalNotebooks();
  const newNotebook = {
    id: generateUUID(),
    name,
    description,
    createdAt: formatDate(),
    notes: []
  };
  saveLocalNotebooks([...notebooks, newNotebook]);
  return newNotebook;
}

function updateLocalNotebook(id, name, description) {
  const notebooks = getLocalNotebooks();
  const updatedNotebooks = notebooks.map((nb) =>
    nb.id === id ? { ...nb, name, description } : nb
  );
  saveLocalNotebooks(updatedNotebooks);
  return { id, name, description };
}

function deleteLocalNotebook(id) {
  const notebooks = getLocalNotebooks();
  const updatedNotebooks = notebooks.filter((nb) => nb.id !== id);
  saveLocalNotebooks(updatedNotebooks);
  return id;
}

function createLocalNote(notebookId, name, data) {
  const notebooks = getLocalNotebooks();
  const newNote = {
    id: generateUUID(),
    name,
    data,
    createdAt: formatDate(),
    archived: false
  };
  const updatedNotebooks = notebooks.map((nb) =>
    nb.id === notebookId ? { ...nb, notes: [newNote, ...nb.notes] } : nb
  );
  saveLocalNotebooks(updatedNotebooks);
  return newNote;
}

function updateLocalNote(notebookId, noteId, name, data) {
  const notebooks = getLocalNotebooks();
  const updatedNotebooks = notebooks.map((nb) => {
    if (nb.id !== notebookId) return nb;
    return {
      ...nb,
      notes: nb.notes.map((note) =>
        note.id === noteId ? { ...note, name, data } : note
      )
    };
  });
  saveLocalNotebooks(updatedNotebooks);
  return { id: noteId, name, data };
}

function archiveLocalNote(notebookId, noteId) {
  const notebooks = getLocalNotebooks();
  const updatedNotebooks = notebooks.map((nb) => {
    if (nb.id !== notebookId) return nb;
    return {
      ...nb,
      notes: nb.notes.map((note) =>
        note.id === noteId ? { ...note, archived: true } : note
      )
    };
  });
  saveLocalNotebooks(updatedNotebooks);
  return noteId;
}

export const dataService = {
  async getNotebooks(source) {
    if (source === 'local') {
      return getLocalNotebooks();
    }
    return [];
  },

  async createNotebook(source, name, description) {
    if (source === 'local') {
      return createLocalNotebook(name, description);
    }
  },

  async updateNotebook(source, id, name, description) {
    if (source === 'local') {
      return updateLocalNotebook(id, name, description);
    }
  },

  async deleteNotebook(source, id) {
    if (source === 'local') {
      return deleteLocalNotebook(id);
    }
  },

  async createNote(source, notebookId, name, data) {
    if (source === 'local') {
      return createLocalNote(notebookId, name, data);
    }
  },

  async updateNote(source, notebookId, noteId, name, data) {
    if (source === 'local') {
      return updateLocalNote(notebookId, noteId, name, data);
    }
  },

  async archiveNote(source, notebookId, noteId) {
    if (source === 'local') {
      return archiveLocalNote(notebookId, noteId);
    }
  }
};



