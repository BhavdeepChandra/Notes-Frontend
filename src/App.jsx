import NoteList from './components/NoteList/NoteList';
import NotebookShelf from './components/NotebookShelf/NotebookShelf';
import { NotebooksProvider } from './context/NotebooksProvider';
import { useNotebooks } from './hooks/useNotebooks';

function AppContent() {
  const { activeNotebook, activeNotebookId } = useNotebooks();

  return (
    <>
      {activeNotebookId && activeNotebook ? (
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

