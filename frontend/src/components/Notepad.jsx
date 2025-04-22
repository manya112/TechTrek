import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/notes'; // Change this to your actual API base URL

export default function Notepad() {
  const [notes, setNotes] = useState('');
  const [savedNotes, setSavedNotes] = useState([]);
  const [currentNoteId, setCurrentNoteId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await axios.get(API_URL);
      setSavedNotes(res.data);
    } catch (err) {
      console.error('Failed to fetch notes:', err);
    }
  };

  const handleSave = async () => {
    if (notes.trim() === '') return;

    try {
      if (currentNoteId !== null) {
        // Update existing note
        await axios.put(`${API_URL}/${currentNoteId}`, {
          content: notes,
          lastModified: new Date()
        });
      } else {
        // Create new note
        await axios.post(API_URL, {
          content: notes,
          created: new Date(),
          lastModified: new Date()
        });
      }
      fetchNotes();
      setNotes('');
      setCurrentNoteId(null);
    } catch (err) {
      console.error('Error saving note:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchNotes();
      if (currentNoteId === id) {
        setNotes('');
        setCurrentNoteId(null);
      }
    } catch (err) {
      console.error('Error deleting note:', err);
    }
  };

  const handleEdit = (id) => {
    const noteToEdit = savedNotes.find(note => note.id === id);
    if (noteToEdit) {
      setNotes(noteToEdit.content);
      setCurrentNoteId(id);
    }
  };

  const handleNewNote = () => {
    setNotes('');
    setCurrentNoteId(null);
  };

  const formatDate = (date) => new Date(date).toLocaleString();

  const filteredNotes = savedNotes.filter(note => 
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTitle = (content) => {
    const firstLine = content.split('\n')[0].trim();
    return firstLine ? firstLine : 'Untitled Note';
  };

  // Theme preference from localStorage (optional)
  useEffect(() => {
    const storedTheme = localStorage.getItem('notepad-theme');
    if (storedTheme === 'dark') {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('notepad-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);
  return (
    <div className={`flex flex-col h-screen pt-21 max-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'} transition-colors duration-200`}>
      {/* Notepad Header */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b px-6 py-4 flex justify-between items-center shadow-sm`}>
        <h2 className="text-2xl font-bold flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Note Keeper
        </h2>
        <div className="flex items-center">
          <button 
            onClick={() => setDarkMode(!darkMode)} 
            className={`${darkMode ? 'bg-gray-700 text-yellow-200' : 'bg-gray-200 text-gray-700'} p-2 rounded-full mr-4 hover:opacity-80 transition-opacity`}
            title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
          <button 
            onClick={handleNewNote} 
            className={`${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white px-4 py-2 rounded-md mr-2 transition-colors`}
          >
            New Note
          </button>
          <button 
            onClick={handleSave} 
            className={`${darkMode ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'} text-white px-4 py-2 rounded-md transition-colors`}
            disabled={notes.trim() === ''}
          >
            {currentNoteId ? 'Update' : 'Save'}
          </button>
        </div>
      </div>
      
      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Saved Notes */}
        <div className={`w-1/4 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-r overflow-hidden flex flex-col`}>
          <div className={`p-4 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} sticky top-0 border-b border-gray-200 z-10`}>
            <div className={`flex items-center ${darkMode ? 'bg-gray-700' : 'bg-white'} rounded-lg px-3 py-2 border ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'} mr-2`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input 
                type="text" 
                placeholder="Search notes..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full outline-none ${darkMode ? 'bg-gray-700 text-gray-100 placeholder-gray-400' : 'bg-white text-gray-800 placeholder-gray-500'}`}
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
          
          <div className="overflow-y-auto flex-1 px-3 py-2">
            <h3 className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wider mb-3 ml-2`}>
              {filteredNotes.length === 0 ? 'No Notes' : filteredNotes.length === 1 ? '1 Note' : `${filteredNotes.length} Notes`}
            </h3>
            
            {filteredNotes.length === 0 ? (
              <div className={`text-center py-10 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {searchTerm ? 'No matching notes found' : 'No saved notes yet'}
              </div>
            ) : (
              filteredNotes.map(note => (
                <div 
                  key={note.id} 
                  className={`${darkMode ? 'bg-gray-700 hover:bg-gray-600 border-gray-600' : 'bg-white hover:bg-gray-50 border-gray-200'} p-3 mb-2 rounded-lg border cursor-pointer group transition-colors`}
                  onClick={() => handleEdit(note.id)}
                >
                  <h4 className="font-medium mb-1 line-clamp-1">
                    {getTitle(note.content)}
                  </h4>
                  <div className={`max-h-12 overflow-hidden text-sm mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'} line-clamp-2`}>
                    {note.content.split('\n').slice(1).join(' ').substring(0, 100)}
                  </div>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>{formatDate(note.lastModified)}</span>
                    <div className={`${darkMode ? 'opacity-60 hover:opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity`}>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(note.id);
                        }}
                        className={`ml-2 ${darkMode ? 'text-red-400 hover:text-red-300' : 'text-red-500 hover:text-red-700'}`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        
        {/* Text Editor Area */}
        <div className="flex-1 flex flex-col">
          <textarea 
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className={`w-full h-full p-6 resize-none outline-none ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-800'} transition-colors`}
            placeholder="Start typing your note here..."
            autoFocus
          />
          
          {/* Status Bar */}
          <div className={`${darkMode ? 'bg-gray-800 text-gray-400 border-gray-700' : 'bg-gray-50 text-gray-500 border-gray-200'} px-4 py-2 text-sm border-t flex justify-between items-center`}>
            <div>
              {notes.trim() ? `${notes.trim().split(/\s+/).length} words` : 'Ready to write'}
            </div>
            <div>
              {currentNoteId ? 'Editing existing note' : 'Creating new note'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}