import NoteList from './components/NoteList/NoteList';
import NotebookShelf from './components/NotebookShelf/NotebookShelf';
import { NotebooksProvider } from './context/NotebooksProvider';
import { useNotebooksContext } from './context/NotebooksContext';

function AppContent() {
  const { activeNotebookId } = useNotebooksContext();

  return (
    <>
      {activeNotebookId ? (
        <NoteList />
      ) : (
        <NotebookShelf />
      )}
    </>
  );
}

function App() {
  return (
    <NotebooksProvider>
      <AppContent />
    </NotebooksProvider>
  );
}

export default App;

