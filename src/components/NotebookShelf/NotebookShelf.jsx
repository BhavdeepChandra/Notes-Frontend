import { useState } from 'react';
import NotebookShelfItem from '../NotebookShelfItem/NotebookShelfItem';
import { INITIAL_NOTEBOOKS } from './NotebookShelfHelper';
import './NotebookShelf.css';

export default function NotebookShelf() {
  const [notebooks] = useState(INITIAL_NOTEBOOKS);

  return (
    <div className="notebookshelf-container">
      <div className="notebooks-grid">
        {notebooks.map((notebook) => (
          <NotebookShelfItem key={notebook.id} notebook={notebook} />
        ))}
      </div>
    </div>
  );
}
