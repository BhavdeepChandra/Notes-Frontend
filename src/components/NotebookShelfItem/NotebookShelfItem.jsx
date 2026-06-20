import { NotebookIcon, EditIcon } from '../Icons';
import './NotebookShelfItem.css';

export default function NotebookShelfItem({ notebook, onEdit, onClick }) {
  const { name, createdAt, description, notes } = notebook;
  const notesCount = notes ? notes.length : 0;

  return (
    <div
      className="notebook-card"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick && onClick();
        }
      }}
    >
      <div className="notebook-card-accent"></div>
      <div className="notebook-card-content">
        <div className="notebook-card-header">
          <div className="notebook-icon-wrapper">
            <NotebookIcon className="notebook-icon" />
          </div>
          <div className="notebook-actions">
            {onEdit && (
              <button
                className="notebook-edit-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit();
                }}
                title="Edit Notebook"
                aria-label="Edit Notebook"
              >
                <EditIcon className="notebook-edit-icon" />
              </button>
            )}
            <span className="notebook-notes-count">
              {notesCount} {notesCount === 1 ? 'note' : 'notes'}
            </span>
          </div>
        </div>
        <h3 className="notebook-card-name">{name}</h3>
        {description && <p className="notebook-card-description">{description}</p>}
        <div className="notebook-card-footer">
          <span className="notebook-card-date">Created {createdAt}</span>
        </div>
      </div>
    </div>
  );
}
