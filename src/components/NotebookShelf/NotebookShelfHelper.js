export const INITIAL_NOTEBOOKS = [
  {
    id: '1',
    name: 'Personal Notes',
    createdAt: 'Jun 18, 2026',
    description: 'Daily diaries, grocery lists, personal goals, and thoughts.',
    notes: [
      {
        id: '101',
        name: 'Weekly Grocery List',
        data: 'Need to buy organic strawberries, avocados, sourdough bread, whole bean coffee, oat milk, and fresh basil.',
        createdAt: 'Jun 18, 2026',
        archived: false,
      },
      {
        id: '102',
        name: 'Daily Gratitude Diary',
        data: '1. Great conversation with a friend.\n2. Productive coding session.\n3. Beautiful evening walk.',
        createdAt: 'Jun 17, 2026',
        archived: false,
      },
      {
        id: '103',
        name: 'Weekend Trip Planning',
        data: 'Pack hiking boots, layers for cooler weather, sunscreen, water bottles, trail mix, and phone charger.',
        createdAt: 'Jun 15, 2026',
        archived: true,
      }
    ]
  },
  {
    id: '2',
    name: 'Work & Projects',
    createdAt: 'Jun 19, 2026',
    description: 'Roadmaps, design systems, requirements, and meeting notes.',
    notes: [
      {
        id: '201',
        name: 'Project Roadmap & Goals',
        data: 'Kickoff meeting set for Monday. Focus on frontend layout design, integrating API endpoints, and preparing initial prototype tests.',
        createdAt: 'Jun 19, 2026',
        archived: true,
      },
      {
        id: '202',
        name: 'Sprint Planning Notes',
        data: 'Discussed task distribution for the new dashboard components. Assigned chart integration to Sarah and authentication flow to Dave.',
        createdAt: 'Jun 19, 2026',
        archived: false,
      },
      {
        id: '203',
        name: 'Design System Feedback',
        data: 'Increase padding on primary button elements, adjust hover background transitions, and check accessibility contrast ratios on light/dark mode.',
        createdAt: 'Jun 18, 2026',
        archived: false,
      }
    ]
  },
  {
    id: '3',
    name: 'Learning React',
    createdAt: 'Jun 10, 2026',
    description: 'Vite configurations, server components, actions, and hooks.',
    notes: [
      {
        id: '301',
        name: 'React 19 Exploration Notes',
        data: 'Investigate the new Server Actions, useActionState, improvements in ref management, and simplified document metadata handling.',
        createdAt: 'Jun 10, 2026',
        archived: false,
      },
      {
        id: '302',
        name: 'React Router v7 Loader Notes',
        data: 'Look into data loading optimizations, how route-level loaders run in parallel, and handling error boundaries for failed loaders.',
        createdAt: 'Jun 9, 2026',
        archived: false,
      },
      {
        id: '303',
        name: 'Learn React Basics',
        data: 'Study component life cycle, clean up effects, refs vs state, and key prop importance in list rendering.',
        createdAt: 'Jun 5, 2026',
        archived: true,
      }
    ]
  },
  {
    id: '4',
    name: 'UI/UX Design',
    createdAt: 'Jun 15, 2026',
    description: 'Inspirations, typography, color palettes, and layouts.',
    notes: [
      {
        id: '401',
        name: 'UI/UX Design Inspiration',
        data: 'Explore glassmorphism details, CSS gradients, dynamic micro-interactions, dark mode-first designs, and custom typography pairings.',
        createdAt: 'Jun 15, 2026',
        archived: true,
      },
      {
        id: '402',
        name: 'Typography Pairings',
        data: 'Clean sans-serif for headings (e.g. Outfit, Inter) and highly readable serif or sans-serif for body copy (e.g. Roboto, Merriweather).',
        createdAt: 'Jun 14, 2026',
        archived: false,
      },
      {
        id: '403',
        name: 'Dark Mode Color Palette',
        data: 'Primary: HSL(270, 100%, 70%) purple. Background: HSL(240, 10%, 4%) near black. Text: HSL(240, 10%, 90%) soft white.',
        createdAt: 'Jun 12, 2026',
        archived: false,
      }
    ]
  }
];

