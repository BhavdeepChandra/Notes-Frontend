import { useState, useEffect } from 'react';
import './Modal.css';

export default function NotebookModal({ isOpen, onSave, onClose, notebook, mode = 'create', title }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setName(notebook ? notebook.name : '');
      setDescription(notebook ? notebook.description : '');
      setError('');
    }
  }, [isOpen, notebook]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === 'view') return;

    if (!name.trim()) {
      setError('Notebook Name is required.');
      return;
    }

    onSave({ name, description });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{title || (mode === 'edit' ? 'Edit Notebook' : 'Create New Notebook')}</h2>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {error && <div className="modal-error">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="notebook-name">Notebook Name</label>
            <input
              id="notebook-name"
              type="text"
              placeholder="e.g. Personal Notes"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
              readOnly={mode === 'view'}
            />
          </div>

          <div className="form-group">
            <label htmlFor="notebook-description">Description (Optional)</label>
            <textarea
              id="notebook-description"
              placeholder="e.g. Daily diaries, thoughts, and grocery lists..."
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              readOnly={mode === 'view'}
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-save">
              {mode === 'edit' ? 'Save Changes' : 'Create Notebook'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
