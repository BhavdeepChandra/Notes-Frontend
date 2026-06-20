import { useState } from 'react';
import NoteListItem from '../NoteListItem/NoteListItem';
import { ActiveNotesIcon, ArchivedNotesIcon, PlusIcon } from './Icons';
import NoteModal from '../Modal/NoteModal';
import './NoteList.css';
import {INITIAL_NOTES} from './NoteListHelper'



export default function NoteList() {
  const [notes, setNotes] = useState(INITIAL_NOTES);
  const [activeTab, setActiveTab] = useState('active');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [modalMode, setModalMode] = useState('create');

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
    if (modalMode === 'edit' && editingNote) {
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === editingNote.id ? { ...note, name: noteData.name, data: noteData.data } : note
        )
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

      setNotes([newNote, ...notes]);
    }
    setIsModalOpen(false);
    setEditingNote(null);
  };

  const handleArchiveNote = (id) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, archived: true } : note
      )
    );
  };

  return (
    <div className="note-list">
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
