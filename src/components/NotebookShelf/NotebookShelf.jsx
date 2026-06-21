import { useReducer } from 'react';
import NotebookShelfItem from '../NotebookShelfItem/NotebookShelfItem';
import { PlusIcon } from '../Icons';
import NotebookModal from '../Modal/NotebookModal';
import { useNotebooks } from '../../hooks/useNotebooks';
import styles from './NotebookShelf.module.css';

const initialState = {
  isModalOpen: false,
  editingNotebook: null,
};

function shelfReducer(state, action) {
  switch (action.type) {
    case 'OPEN_CREATE_MODAL':
      return {
        ...state,
        isModalOpen: true,
        editingNotebook: null,
      };
    case 'OPEN_EDIT_MODAL':
      return {
        ...state,
        isModalOpen: true,
        editingNotebook: action.payload,
      };
    case 'CLOSE_MODAL':
      return {
        ...state,
        isModalOpen: false,
        editingNotebook: null,
      };
    default:
      return state;
  }
}

export default function NotebookShelf() {
  const { notebooks, addNotebook, updateNotebook, deleteNotebook, selectNotebook } = useNotebooks();
  const [state, dispatch] = useReducer(shelfReducer, initialState);
  const { isModalOpen, editingNotebook } = state;

  const handleOpenEditModal = (notebook) => {
    dispatch({ type: 'OPEN_EDIT_MODAL', payload: notebook });
  };

  const handleDeleteNotebook = (notebookId) => {
    deleteNotebook(notebookId);
  };

  const handleSaveNotebook = ({ name, description }) => {
    if (editingNotebook) {
      updateNotebook(editingNotebook.id, name, description);
    } else {
      addNotebook(name, description);
    }
    dispatch({ type: 'CLOSE_MODAL' });
  };

  return (
    <div className={styles['notebookshelf-container']}>
      <div className={styles['notebooks-grid']}>
        {notebooks.map((notebook) => (
          <NotebookShelfItem
            key={notebook.id}
            notebook={notebook}
            onEdit={() => handleOpenEditModal(notebook)}
            onDelete={() => handleDeleteNotebook(notebook.id)}
            onClick={() => selectNotebook(notebook.id)}
          />
        ))}
        
        <div
          className={styles['new-notebook-card']}
          onClick={() => dispatch({ type: 'OPEN_CREATE_MODAL' })}
          role="button"
          tabIndex={0}
          aria-label="Add new notebook"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              dispatch({ type: 'OPEN_CREATE_MODAL' });
            }
          }}
        >
          <div className={styles['new-notebook-icon-wrapper']}>
            <PlusIcon className={styles['new-notebook-icon']} />
          </div>
          <h3 className={styles['new-notebook-title']}>New Notebook</h3>
        </div>
      </div>

      {isModalOpen && (
        <NotebookModal
          key={editingNotebook?.id || 'new'}
          isOpen={isModalOpen}
          onClose={() => dispatch({ type: 'CLOSE_MODAL' })}
          onSave={handleSaveNotebook}
          notebook={editingNotebook}
          mode={editingNotebook ? 'edit' : 'create'}
        />
      )}
    </div>
  );
}
