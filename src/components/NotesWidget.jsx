import React from "react";
import { useStore } from "../store/useStore";
import { Trash2 } from "lucide-react";

const NotesWidget = () => {
  const notes = useStore((state) => state.notes);
  const setNotes = useStore((state) => state.setNotes);

  const handleChange = (event) => {
    setNotes(event.target.value);
  };

  const handleClear = () => {
    setNotes("");
  };

  return (
    <div className="notes-widget">
      {/* Header bar of the notes pad */}
      <div className="notes-header">
        <h3 className="notes-title">All notes</h3>
        {notes.trim().length > 0 && (
          <button
            type="button"
            className="notes-clear-btn"
            onClick={handleClear}
            title="Clear all notes"
          >
            <Trash2 size={18} />
          </button>
        )}
      </div>

      {/* Editable notes area */}
      <div className="notes-body">
        <textarea
          className="notes-textarea"
          value={notes}
          onChange={handleChange}
          placeholder="This is how notes work! Type your quick memos here. They are automatically saved to your browser storage, meaning they will persist even if you close the tab or reload the page..."
        />
      </div>

      {/* Footer bar showing status */}
      <div className="notes-footer">
        <span className="notes-char-count">
          {notes.length} characters
        </span>
        <span className="notes-status-badge">
          Auto-saved
        </span>
      </div>
    </div>
  );
};

export default NotesWidget;
