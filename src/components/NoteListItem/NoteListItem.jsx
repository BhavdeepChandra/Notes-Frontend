import { TrashIcon } from '../NoteList/Icons';
import './NoteListItem.css';

export default function NoteListItem({ note, onArchive }) {
  const { id, name, data, createdAt } = note;

  return (
    <div className="note-list-item">
      <div className="note-header-row">
        <div className="note-title-container">
          <h3 className="note-name">{name}</h3>
          {!note.archived && onArchive && (
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
          )}
        </div>
        <span className="note-date">{createdAt}</span>
      </div>
      <p className="note-data">{data}</p>
    </div>
  );
}
