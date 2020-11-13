export const findFolder = (folders = [], folderid) => {
  return folders.find((folder) => folder.id === folderid);
};

export const findNote = (notes = [], noteId) =>
  notes.find((note) => note.id.toString() === noteId);

export const getNotesForFolder = (notes = [], folderId) =>
  !folderId
    ? notes
    : notes.filter((note) => note.folderid.toString() === folderId);

export const countNotesForFolder = (notes = [], folderid) =>
  notes.filter((note) => note.folderid === folderid.toString()).length;
