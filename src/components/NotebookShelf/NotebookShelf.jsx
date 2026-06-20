import { useState } from 'react';
import NotebookShelfItem from '../NotebookShelfItem/NotebookShelfItem';
import { INITIAL_NOTEBOOKS } from './NotebookShelfHelper';
import { PlusIcon } from '../Icons';
import NotebookModal from '../Modal/NotebookModal';
import './NotebookShelf.css';

export default function NotebookShelf() {
  const [notebooks, setNotebooks] = useState(INITIAL_NOTEBOOKS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNotebook, setEditingNotebook] = useState(null);

  const handleOpenEditModal = (notebook) => {
    setEditingNotebook(notebook);
    setIsModalOpen(true);
  };

  const handleSaveNotebook = ({ name, description }) => {
    if (editingNotebook) {
      setNotebooks((prevNotebooks) =>
        prevNotebooks.map((nb) =>
          nb.id === editingNotebook.id ? { ...nb, name, description } : nb
        )
      );
    } else {
      const newNotebook = {
        id: Date.now().toString(),
        name,
        description,
        createdAt: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        }),
        totalNotes: 0
      };
      setNotebooks([...notebooks, newNotebook]);
    }
    setIsModalOpen(false);
    setEditingNotebook(null);
  };

  return (
    <div className="notebookshelf-container">
      <div className="notebooks-grid">
        {notebooks.map((notebook) => (
          <NotebookShelfItem
            key={notebook.id}
            notebook={notebook}
            onEdit={() => handleOpenEditModal(notebook)}
          />
        ))}
        
        <div
          className="new-notebook-card"
          onClick={() => {
            setEditingNotebook(null);
            setIsModalOpen(true);
          }}
          role="button"
          tabIndex={0}
          aria-label="Add new notebook"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setEditingNotebook(null);
              setIsModalOpen(true);
            }
          }}
        >
          <div className="new-notebook-icon-wrapper">
            <PlusIcon className="new-notebook-icon" />
          </div>
          <h3 className="new-notebook-title">New Notebook</h3>
        </div>
      </div>

      <NotebookModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingNotebook(null);
        }}
        onSave={handleSaveNotebook}
        notebook={editingNotebook}
        mode={editingNotebook ? 'edit' : 'create'}
      />
    </div>
  );
}
