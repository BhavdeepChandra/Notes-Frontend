import { TrashIcon, EditIcon } from '../NoteList/Icons';
import './NoteListItem.css';

export default function NoteListItem({ note, onArchive, onClick }) {
  const { id, name, data, createdAt } = note;

  return (
    <div className="note-list-item" onClick={() => onClick && onClick(note, 'view')}>
      <div className="note-header-row">
        <div className="note-title-container">
          <h3 className="note-name">{name}</h3>
          {!note.archived && onArchive && (
            <>
              <button
                className="delete-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onArchive(id);
                }}
                title="Archive Note"
              >
                <TrashIcon className="delete-icon" />
              </button>
              <button
                className="edit-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onClick && onClick(note, 'edit');
                }}
                title="Edit Note"
              >
                <EditIcon className="edit-icon" />
              </button>
            </>
          )}
        </div>
        <span className="note-date">{createdAt}</span>
      </div>
      <p className="note-data">{data}</p>
    </div>
  );
}
