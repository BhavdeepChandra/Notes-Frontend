import { useReducer } from 'react';
import styles from './Modal.module.css';

const getInitialState = (note) => ({
  name: note ? note.name : '',
  data: note ? note.data : '',
  error: '',
});

function formReducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        [action.field]: action.value,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}

export default function NoteModal({ isOpen, onSave, onClose, note, mode = 'create', title }) {
  const [state, dispatch] = useReducer(formReducer, note, getInitialState);
  const { name, data, error } = state;

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === 'view') return;

    if (!name.trim()) {
      dispatch({ type: 'SET_ERROR', payload: 'Note Title/Description is required.' });
      return;
    }
    if (!data.trim()) {
      dispatch({ type: 'SET_ERROR', payload: 'Note Data is required.' });
      return;
    }

    onSave({ name, data });
  };

  return (
    <div className={styles['modal-overlay']} onClick={onClose}>
      <div className={styles['modal-content']} onClick={(e) => e.stopPropagation()}>
        <div className={styles['modal-header']}>
          <h2>{title || (mode === 'view' ? 'View Note' : mode === 'edit' ? 'Edit Note' : 'Create New Note')}</h2>
          <button className={styles['modal-close-btn']} onClick={onClose} aria-label="Close modal">
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {error && <div className={styles['modal-error']}>{error}</div>}
          <div className={styles['form-group']}>
            <label htmlFor="note-name">Note Title / Description</label>
            <input
              id="note-name"
              type="text"
              placeholder="e.g. Ideas for next week"
              value={name}
              onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'name', value: e.target.value })}
              autoFocus={mode !== 'view'}
              readOnly={mode === 'view'}
            />
          </div>

          <div className={styles['form-group']}>
            <label htmlFor="note-data">Note Data</label>
            <textarea
              id="note-data"
              placeholder="Enter note content here..."
              rows="5"
              value={data}
              onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'data', value: e.target.value })}
              readOnly={mode === 'view'}
            />
          </div>

          <div className={styles['modal-actions']}>
            {mode === 'view' ? (
              <button type="button" className={styles['btn-save']} onClick={onClose}>
                Close
              </button>
            ) : (
              <>
                <button type="button" className={styles['btn-cancel']} onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className={styles['btn-save']}>
                  Save Note
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
