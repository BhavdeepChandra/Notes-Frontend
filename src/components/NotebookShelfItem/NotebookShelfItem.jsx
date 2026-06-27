import { memo } from 'react';
import { NotebookIcon, EditIcon, TrashIcon } from '../Icons';
import styles from './NotebookShelfItem.module.css';

const NotebookShelfItem = memo(function NotebookShelfItem({ notebook, onEdit, onDelete, onClick }) {
  const { id, name, createdAt, description, notes } = notebook;
  const notesCount = notes ? notes.length : 0;

  const handleCardClick = () => {
    onClick(id);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick(id);
    }
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    onEdit && onEdit(notebook);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onDelete && onDelete(id);
  };

  return (
    <div
      className={styles['notebook-card']}
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className={styles['notebook-card-accent']}></div>
      <div className={styles['notebook-card-content']}>
        <div className={styles['notebook-card-header']}>
          <div className={styles['notebook-icon-wrapper']}>
            <NotebookIcon className={styles['notebook-icon']} />
          </div>
          <div className={styles['notebook-actions']}>
            {onEdit && (
              <button
                className={styles['notebook-edit-btn']}
                onClick={handleEditClick}
                title="Edit Notebook"
                aria-label="Edit Notebook"
              >
                <EditIcon className={styles['notebook-edit-icon']} />
              </button>
            )}
            {onDelete && (
              <button
                className={styles['notebook-delete-btn']}
                onClick={handleDeleteClick}
                title="Delete Notebook"
                aria-label="Delete Notebook"
              >
                <TrashIcon className={styles['notebook-delete-icon']} />
              </button>
            )}
            <span className={styles['notebook-notes-count']}>
              {notesCount} {notesCount === 1 ? 'note' : 'notes'}
            </span>
          </div>
        </div>
        <h3 className={styles['notebook-card-name']}>{name}</h3>
        {description && <p className={styles['notebook-card-description']}>{description}</p>}
        <div className={styles['notebook-card-footer']}>
          <span className={styles['notebook-card-date']}>Created {createdAt}</span>
        </div>
      </div>
    </div>
  );
});

export default NotebookShelfItem;
