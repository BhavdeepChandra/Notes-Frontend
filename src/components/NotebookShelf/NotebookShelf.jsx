import { useReducer, useCallback } from 'react';
import NotebookShelfItem from '../NotebookShelfItem/NotebookShelfItem';
import { PlusIcon, HardDriveIcon, CloudIcon } from '../Icons';
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
  const {
    notebooks,
    addNotebook,
    updateNotebook,
    deleteNotebook,
    selectNotebook,
    dataSource,
    setDataSource,
  } = useNotebooks();
  const [state, dispatch] = useReducer(shelfReducer, initialState);
  const { isModalOpen, editingNotebook } = state;

  const handleOpenEditModal = useCallback((notebook) => {
    dispatch({ type: 'OPEN_EDIT_MODAL', payload: notebook });
  }, [dispatch]);

  const handleDeleteNotebook = useCallback((notebookId) => {
    deleteNotebook(notebookId);
  }, [deleteNotebook]);

  const handleSaveNotebook = useCallback(({ id, name, description }) => {
    if (id) {
      updateNotebook(id, name, description);
    } else {
      addNotebook(name, description);
    }
    dispatch({ type: 'CLOSE_MODAL' });
  }, [updateNotebook, addNotebook, dispatch]);

  return (
    <div className={styles['notebookshelf-container']}>
      <div className={styles['shelf-header']}>
        <h1 className={styles['shelf-title']}>My Notebooks</h1>
        <div className={styles['toggle-container']}>
          <button
            className={`${styles['toggle-btn']} ${dataSource === 'local' ? styles['active'] : ''}`}
            onClick={() => setDataSource('local')}
            aria-label="Use local storage data source"
          >
            <HardDriveIcon className={styles['toggle-icon']} />
            <span>Local Storage</span>
          </button>
          <button
            className={`${styles['toggle-btn']} ${dataSource === 'api' ? styles['active'] : ''}`}
            onClick={() => setDataSource('api')}
            aria-label="Use API data source"
          >
            <CloudIcon className={styles['toggle-icon']} />
            <span>API</span>
          </button>
        </div>
      </div>

      {dataSource === 'api' ? (
        <div className={styles['api-not-enabled-container']}>
          <div className={styles['api-not-enabled-card']}>
            <div className={styles['api-not-enabled-icon-wrapper']}>
              <CloudIcon className={styles['api-not-enabled-icon']} />
            </div>
            <h2 className={styles['api-not-enabled-title']}>API Access Not Enabled</h2>
            <p className={styles['api-not-enabled-message']}>
              Cloud synchronization is not enabled yet. Switch back to Local Storage to manage your notebooks and notes.
            </p>
            <button
              className={styles['switch-back-btn']}
              onClick={() => setDataSource('local')}
              aria-label="Switch back to local storage"
            >
              <HardDriveIcon className={styles['switch-back-icon']} />
              <span>Switch to Local Storage</span>
            </button>
          </div>
        </div>
      ) : (
        <div className={styles['notebooks-grid']}>
          {notebooks.map((notebook) => (
            <NotebookShelfItem
              key={notebook.id}
              notebook={notebook}
              onEdit={handleOpenEditModal}
              onDelete={handleDeleteNotebook}
              onClick={selectNotebook}
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
      )}

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
