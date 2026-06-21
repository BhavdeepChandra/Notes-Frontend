import { useReducer, useMemo } from 'react';
import NoteListItem from '../NoteListItem/NoteListItem';
import { ActiveNotesIcon, ArchivedNotesIcon, PlusIcon, ArrowLeftIcon } from '../Icons';
import NoteModal from '../Modal/NoteModal';
import { useNotebooks } from '../../hooks/useNotebooks';
import { useNotes } from '../../hooks/useNotes';
import styles from './NoteList.module.css';

const initialState = {
  activeTab: 'active',
  isModalOpen: false,
  editingNote: null,
  modalMode: 'create',
};

function noteListReducer(state, action) {
  switch (action.type) {
    case 'SET_TAB':
      return {
        ...state,
        activeTab: action.payload,
      };
    case 'OPEN_CREATE_MODAL':
      return {
        ...state,
        isModalOpen: true,
        editingNote: null,
        modalMode: 'create',
      };
    case 'OPEN_NOTE_MODAL':
      return {
        ...state,
        isModalOpen: true,
        editingNote: action.payload.note,
        modalMode: action.payload.mode,
      };
    case 'CLOSE_MODAL':
      return {
        ...state,
        isModalOpen: false,
        editingNote: null,
      };
    default:
      return state;
  }
}

export default function NoteList() {
  const { activeNotebook, clearSelectedNotebook } = useNotebooks();
  const { notes, addNote, updateNote, archiveNote } = useNotes(activeNotebook?.id);

  const [state, dispatch] = useReducer(noteListReducer, initialState);
  const { activeTab, isModalOpen, editingNote, modalMode } = state;
  const activeNotes = useMemo(() => notes.filter((note) => !note.archived), [notes]);
  const archivedNotes = useMemo(() => notes.filter((note) => note.archived), [notes]);
  const filteredNotes = activeTab === 'active' ? activeNotes : archivedNotes;

  const handleOpenAddModal = () => {
    dispatch({ type: 'OPEN_CREATE_MODAL' });
  };

  const handleOpenNoteModal = (note, mode) => {
    dispatch({ type: 'OPEN_NOTE_MODAL', payload: { note, mode } });
  };

  const handleSaveNote = (noteData) => {
    if (modalMode === 'edit' && editingNote) {
      updateNote(editingNote.id, { name: noteData.name, data: noteData.data });
    } else {
      addNote({ name: noteData.name, data: noteData.data });
    }

    dispatch({ type: 'CLOSE_MODAL' });
  };

  const handleArchiveNote = (id) => {
    archiveNote(id);
  };

  return (
    <div className={styles['note-list']}>
      <div className={styles['note-list-header']}>
        <button className={styles['back-to-notebooks-btn']} onClick={clearSelectedNotebook} aria-label="Back to notebooks">
          <ArrowLeftIcon className={styles['back-icon']} />
          <span>Back to Notebooks</span>
        </button>
        <h1 className={styles['notebook-title-header']}>{activeNotebook?.name}</h1>
      </div>

      <div className={styles['notes-tabs']}>
        <button
          className={`${styles['tab-item']} ${activeTab === 'active' ? styles['active'] : ''}`}
          onClick={() => dispatch({ type: 'SET_TAB', payload: 'active' })}
        >
          Active
        </button>
        <button
          className={`${styles['tab-item']} ${activeTab === 'archived' ? styles['active'] : ''}`}
          onClick={() => dispatch({ type: 'SET_TAB', payload: 'archived' })}
        >
          Archived
        </button>
      </div>

      <div className={styles['notes-container']}>
        {activeTab === 'active' && (
          <div className={`${styles['note-list-item']} ${styles['add-note-item']}`} onClick={handleOpenAddModal}>
            <PlusIcon className={styles['add-note-icon']} />
            <span className={styles['add-note-text']}>Add Note</span>
          </div>
        )}

        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => (
            <NoteListItem
              key={note.id}
              note={note}
              onArchive={handleArchiveNote}
              onClick={handleOpenNoteModal}
            />
          ))
        ) : (
          <div className={styles['empty-state']}>
            <div className={styles['empty-icon']}>
              {activeTab === 'active' ? (
                <ActiveNotesIcon />
              ) : (
                <ArchivedNotesIcon />
              )}
            </div>
            <p className={styles['empty-text']}>
              {activeTab === 'active'
                ? 'No active notes found.'
                : 'No archived notes found.'}
            </p>
          </div>
        )}
      </div>

      {isModalOpen && (
        <NoteModal
          key={editingNote?.id || 'new'}
          isOpen={isModalOpen}
          onSave={handleSaveNote}
          onClose={() => dispatch({ type: 'CLOSE_MODAL' })}
          note={editingNote}
          mode={modalMode}
        />
      )}
    </div>
  );
}
