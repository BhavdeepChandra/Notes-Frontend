import { TrashIcon, EditIcon } from '../Icons';
import styles from './NoteListItem.module.css';

export default function NoteListItem({ note, onArchive, onClick }) {
  const { id, name, data, createdAt } = note;

  return (
    <div className={styles['note-list-item']} onClick={() => onClick && onClick(note, 'view')}>
      <div className={styles['note-header-row']}>
        <div className={styles['note-title-container']}>
          <h3 className={styles['note-name']}>{name}</h3>
          {!note.archived && onArchive && (
            <>
              <button
                className={styles['delete-btn']}
                onClick={(e) => {
                  e.stopPropagation();
                  onArchive(id);
                }}
                title="Archive Note"
              >
                <TrashIcon className={styles['delete-icon']} />
              </button>
              <button
                className={styles['edit-btn']}
                onClick={(e) => {
                  e.stopPropagation();
                  onClick && onClick(note, 'edit');
                }}
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
}
