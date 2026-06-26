import { memo } from 'react';
import { NotebookIcon, EditIcon, TrashIcon } from '../Icons';
import styles from './NotebookShelfItem.module.css';

const NotebookShelfItem = memo(function NotebookShelfItem({ notebook, onEdit, onDelete, onClick }) {
  const { name, createdAt, description, notes } = notebook;
  const notesCount = notes ? notes.length : 0;

  return (
    <div
      className={styles['notebook-card']}
      onClick={() => onClick(notebook.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(notebook.id);
        }
      }}
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
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(notebook);
                }}
                title="Edit Notebook"
                aria-label="Edit Notebook"
              >
                <EditIcon className={styles['notebook-edit-icon']} />
              </button>
            )}
            {onDelete && (
              <button
                className={styles['notebook-delete-btn']}
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(notebook.id);
                }}
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
