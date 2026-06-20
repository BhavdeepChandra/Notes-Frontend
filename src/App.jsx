import { useState } from 'react';
import NoteList from './components/NoteList/NoteList';
import NotebookShelf from './components/NotebookShelf/NotebookShelf';
import { INITIAL_NOTEBOOKS } from './components/NotebookShelf/NotebookShelfHelper';

function App() {
  const [notebooks, setNotebooks] = useState(INITIAL_NOTEBOOKS);
  const [activeNotebookId, setActiveNotebookId] = useState(null);

  const activeNotebook = notebooks.find((nb) => nb.id === activeNotebookId);

  const handleUpdateNotebook = (updatedNotebook) => {
    setNotebooks((prevNotebooks) =>
      prevNotebooks.map((nb) =>
        nb.id === updatedNotebook.id ? updatedNotebook : nb
      )
    );
  };

  return (
    <>
      {activeNotebookId && activeNotebook ? (
        <NoteList
          notebook={activeNotebook}
          onUpdateNotebook={handleUpdateNotebook}
          onBack={() => setActiveNotebookId(null)}
        />
      ) : (
        <NotebookShelf
          notebooks={notebooks}
          setNotebooks={setNotebooks}
          onSelectNotebook={setActiveNotebookId}
        />
      )}
    </>
  );
}

export default App;
