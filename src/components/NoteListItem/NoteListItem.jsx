import './NoteListItem.css';

export default function NoteListItem({ note }) {
  const { name, data, createdAt } = note;

  return (
    <div className="note-list-item">
      <div className="note-header-row">
        <h3 className="note-name">{name}</h3>
        <span className="note-date">{createdAt}</span>
      </div>
      <p className="note-data">{data}</p>
    </div>
  );
}
