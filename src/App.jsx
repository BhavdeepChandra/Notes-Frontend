import { MemoryRouter, Routes, Route, Navigate } from 'react-router-dom';
import NoteList from './components/NoteList/NoteList';
import NotebookShelf from './components/NotebookShelf/NotebookShelf';
import { NotebooksProvider } from './context/NotebooksProvider';

function App() {
  return (
    <MemoryRouter>
      <NotebooksProvider>
        <Routes>
          <Route path="/" element={<NotebookShelf />} />
          <Route path="/notebook/:notebookId" element={<NoteList />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </NotebooksProvider>
    </MemoryRouter>
  );
}

export default App;

