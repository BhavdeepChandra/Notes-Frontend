import { useState } from 'react';
import NoteListItem from '../NoteListItem/NoteListItem';
import './NoteList.css';

const INITIAL_NOTES = [
  {
    id: '1',
    name: 'Project Roadmap & Goals',
    data: 'Kickoff meeting set for Monday. Focus on frontend layout design, integrating API endpoints, and preparing initial prototype tests.',
    createdAt: 'Jun 19, 2026',
  },
  {
    id: '2',
    name: 'Weekly Grocery List',
    data: 'Need to buy organic strawberries, avocados, sourdough bread, whole bean coffee, oat milk, and fresh basil.',
    createdAt: 'Jun 18, 2026',
  },
  {
    id: '3',
    name: 'UI/UX Design Inspiration',
    data: 'Explore glassmorphism details, CSS gradients, dynamic micro-interactions, dark mode-first designs, and custom typography pairings.',
    createdAt: 'Jun 15, 2026',
  },
  {
    id: '4',
    name: 'React 19 Exploration Notes',
    data: 'Investigate the new Server Actions, useActionState, improvements in ref management, and simplified document metadata handling.',
    createdAt: 'Jun 10, 2026',
  },
];

export default function NoteList() {
  const [notes] = useState(INITIAL_NOTES);

  return (
    <div className="note-list">
      {notes.map((note) => (
        <NoteListItem key={note.id} note={note} />
      ))}
    </div>
  );
}
