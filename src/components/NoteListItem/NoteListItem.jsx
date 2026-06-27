import { memo } from 'react';
import { TrashIcon, EditIcon } from '../Icons';
import styles from './NoteListItem.module.css';

const NoteListItem = memo(function NoteListItem({ note, onArchive, onClick }) {
  const { id, name, data, createdAt } = note;

  const handleCardClick = () => {
    onClick && onClick(note, 'view');
  };

  const handleArchiveClick = (e) => {
    e.stopPropagation();
    onArchive && onArchive(id);
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    onClick && onClick(note, 'edit');
  };

  return (
    <div className={styles['note-list-item']} onClick={handleCardClick}>
      <div className={styles['note-header-row']}>
        <div className={styles['note-title-container']}>
          <h3 className={styles['note-name']}>{name}</h3>
          {!note.archived && onArchive && (
            <>
              <button
                className={styles['delete-btn']}
                onClick={handleArchiveClick}
                title="Archive Note"
              >
                <TrashIcon className={styles['delete-icon']} />
              </button>
              <button
                className={styles['edit-btn']}
                onClick={handleEditClick}
                title="Edit Note"
              >
                <EditIcon className={styles['edit-icon']} />
              </button>
            </>
          )}
        </div>
        <span className={styles['note-date']}>{createdAt}</span>
      </div>
      <p className={styles['note-data']}>{data}</p>
    </div>
  );
});

export default NoteListItem;
