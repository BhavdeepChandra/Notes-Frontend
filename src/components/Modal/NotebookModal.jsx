import { useReducer } from 'react';
import styles from './Modal.module.css';

const getInitialState = (notebook) => ({
  name: notebook ? notebook.name : '',
  description: notebook ? notebook.description : '',
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

export default function NotebookModal({ isOpen, onSave, onClose, notebook, mode = 'create', title }) {
  const [state, dispatch] = useReducer(formReducer, notebook, getInitialState);
  const { name, description, error } = state;

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === 'view') return;

    if (!name.trim()) {
      dispatch({ type: 'SET_ERROR', payload: 'Notebook Name is required.' });
      return;
    }

    onSave({ id: notebook?.id, name, description });
  };

  return (
    <div className={styles['modal-overlay']} onClick={onClose}>
      <div className={styles['modal-content']} onClick={(e) => e.stopPropagation()}>
        <div className={styles['modal-header']}>
          <h2>{title || (mode === 'edit' ? 'Edit Notebook' : 'Create New Notebook')}</h2>
          <button className={styles['modal-close-btn']} onClick={onClose} aria-label="Close modal">
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {error && <div className={styles['modal-error']}>{error}</div>}
          <div className={styles['form-group']}>
            <label htmlFor="notebook-name">Notebook Name</label>
            <input
              id="notebook-name"
              type="text"
              placeholder="e.g. Personal Notes"
              value={name}
              onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'name', value: e.target.value })}
              autoFocus
              readOnly={mode === 'view'}
            />
          </div>

          <div className={styles['form-group']}>
            <label htmlFor="notebook-description">Description (Optional)</label>
            <textarea
              id="notebook-description"
              placeholder="e.g. Daily diaries, thoughts, and grocery lists..."
              rows="4"
              value={description}
              onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'description', value: e.target.value })}
              readOnly={mode === 'view'}
            />
          </div>

          <div className={styles['modal-actions']}>
            <button type="button" className={styles['btn-cancel']} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className={styles['btn-save']}>
              {mode === 'edit' ? 'Save Changes' : 'Create Notebook'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
