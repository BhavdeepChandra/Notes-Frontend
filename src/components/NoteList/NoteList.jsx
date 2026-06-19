import { useState } from 'react';
import NoteListItem from '../NoteListItem/NoteListItem';
import { ActiveNotesIcon, ArchivedNotesIcon, PlusIcon } from './Icons';
import NoteModal from '../NoteModal/NoteModal';
import './NoteList.css';
import {INITIAL_NOTES} from './NoteListHelper'



export default function NoteList() {
  const [notes, setNotes] = useState(INITIAL_NOTES);
  const [activeTab, setActiveTab] = useState('active');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredNotes = notes.filter((note) =>
    activeTab === 'active' ? !note.archived : note.archived
  );

  const handleAddNote = (newNoteData) => {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    const today = new Date().toLocaleDateString('en-US', options);

    const newNote = {
      id: Date.now().toString(),
      name: newNoteData.name,
      data: newNoteData.data,
      createdAt: today,
      archived: false,
    };

    setNotes([newNote, ...notes]);
    setIsModalOpen(false);
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
          <div className="note-list-item add-note-item" onClick={() => setIsModalOpen(true)}>
            <PlusIcon className="add-note-icon" />
            <span className="add-note-text">Add Note</span>
          </div>
        )}

        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => (
            <NoteListItem key={note.id} note={note} />
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
        onSave={handleAddNote}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
