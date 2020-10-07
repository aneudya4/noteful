import { createContext } from 'react';

export default createContext({
  folders: [],
  notes: [],
  addFolder: () => {},
  addNote: () => {},
  deleteNote: () => {},
});
