import { useState, useEffect } from 'react';
import './NoteModal.css';

export default function NoteModal({ isOpen, onSave, onClose }) {
  const [name, setName] = useState('');
  const [data, setData] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setName('');
      setData('');
      setError('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Note Title/Description is required.');
      return;
    }
    if (!data.trim()) {
      setError('Note Data is required.');
      return;
    }

    onSave({ name, data });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Create New Note</h2>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {error && <div className="modal-error">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="note-name">Note Title / Description</label>
            <input
              id="note-name"
              type="text"
              placeholder="e.g. Ideas for next week"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="note-data">Note Data</label>
            <textarea
              id="note-data"
              placeholder="Enter note content here..."
              rows="5"
              value={data}
              onChange={(e) => setData(e.target.value)}
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-save">
              Save Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
