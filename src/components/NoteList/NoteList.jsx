import { useState } from 'react';
import NoteListItem from '../NoteListItem/NoteListItem';
import { ActiveNotesIcon, ArchivedNotesIcon, PlusIcon, ArrowLeftIcon } from '../Icons';
import NoteModal from '../Modal/NoteModal';
import './NoteList.css';

export default function NoteList({ notebook, onUpdateNotebook, onBack }) {
  const [activeTab, setActiveTab] = useState('active');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [modalMode, setModalMode] = useState('create');

  const notes = notebook?.notes || [];

  const filteredNotes = notes.filter((note) =>
    activeTab === 'active' ? !note.archived : note.archived
  );

  const handleOpenAddModal = () => {
    setEditingNote(null);
    setModalMode('create');
    setIsModalOpen(true);
  };

  const handleOpenNoteModal = (note, mode) => {
    setEditingNote(note);
    setModalMode(mode);
    setIsModalOpen(true);
  };

  const handleSaveNote = (noteData) => {
    let updatedNotes;
    if (modalMode === 'edit' && editingNote) {
      updatedNotes = notes.map((note) =>
        note.id === editingNote.id ? { ...note, name: noteData.name, data: noteData.data } : note
      );
    } else {
      const options = { month: 'short', day: 'numeric', year: 'numeric' };
      const today = new Date().toLocaleDateString('en-US', options);

      const newNote = {
        id: Date.now().toString(),
        name: noteData.name,
        data: noteData.data,
        createdAt: today,
        archived: false,
      };

      updatedNotes = [newNote, ...notes];
    }

    if (onUpdateNotebook && notebook) {
      onUpdateNotebook({
        ...notebook,
        notes: updatedNotes
      });
    }

    setIsModalOpen(false);
    setEditingNote(null);
  };

  const handleArchiveNote = (id) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, archived: true } : note
    );

    if (onUpdateNotebook && notebook) {
      onUpdateNotebook({
        ...notebook,
        notes: updatedNotes
      });
    }
  };

  return (
    <div className="note-list">
      <div className="note-list-header">
        <button className="back-to-notebooks-btn" onClick={onBack} aria-label="Back to notebooks">
          <ArrowLeftIcon className="back-icon" />
          <span>Back to Notebooks</span>
        </button>
        <h1 className="notebook-title-header">{notebook?.name}</h1>
      </div>

      <div className="notes-tabs">
        <button
          className={`tab-item ${activeTab === 'active' ? 'active' : ''}`}
          onClick={() => setActiveTab('active')}
        >
          Active
        </button>
        <button
          className={`tab-item ${activeTab === 'archived' ? 'active' : ''}`}
          onClick={() => setActiveTab('archived')}
        >
          Archived
        </button>
      </div>

      <div className="notes-container">
        {activeTab === 'active' && (
          <div className="note-list-item add-note-item" onClick={handleOpenAddModal}>
            <PlusIcon className="add-note-icon" />
            <span className="add-note-text">Add Note</span>
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
          <div className="empty-state">
            <div className="empty-icon">
              {activeTab === 'active' ? (
                <ActiveNotesIcon />
              ) : (
                <ArchivedNotesIcon />
              )}
            </div>
            <p className="empty-text">
              {activeTab === 'active'
                ? 'No active notes found.'
                : 'No archived notes found.'}
            </p>
          </div>
        )}
      </div>

      <NoteModal
        isOpen={isModalOpen}
        onSave={handleSaveNote}
        onClose={() => {
          setIsModalOpen(false);
          setEditingNote(null);
        }}
        note={editingNote}
        mode={modalMode}
      />
    </div>
  );
}
