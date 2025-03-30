import React, { useState } from "react";
import axios from "axios";

const API_URL = "https://mern-notes-app-w86j.onrender.com/api/notes";

function NoteList({ notes, setNotes }) {
    const [editingNote, setEditingNote] = useState(null);
    const [updatedTitle, setUpdatedTitle] = useState("");
    const [updatedContent, setUpdatedContent] = useState("");

    // Function to delete a note
    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            setNotes(notes.filter(note => note._id !== id));
        } catch (error) {
            console.error("Error deleting note:", error);
        }
    };

    // Function to start editing a note
    const handleEdit = (note) => {
        setEditingNote(note._id);
        setUpdatedTitle(note.title);
        setUpdatedContent(note.content);
    };

    // Function to update a note
    const handleUpdate = async (id) => {
        try {
            const response = await axios.put(`${API_URL}/${id}`, {
                title: updatedTitle,
                content: updatedContent
            });
            setNotes(notes.map(note => (note._id === id ? response.data : note)));
            setEditingNote(null);
        } catch (error) {
            console.error("Error updating note:", error);
        }
    };

    return (
        <div className="notes-container">
            <h2>Your Notes</h2>
            {notes.length === 0 ? <p>No notes available</p> : null}
            {notes.map((note) => (
                <div key={note._id} className="note-card">
                    {editingNote === note._id ? (
                        <div className="edit-mode">
                            <input
                                type="text"
                                value={updatedTitle}
                                onChange={(e) => setUpdatedTitle(e.target.value)}
                            />
                            <textarea
                                value={updatedContent}
                                onChange={(e) => setUpdatedContent(e.target.value)}
                            />
                            <button onClick={() => handleUpdate(note._id)} className="save-btn">Update</button>
                            <button onClick={() => setEditingNote(null)} className="cancel-btn">Cancel</button>
                        </div>
                    ) : (
                        <div>
                            <h3>{note.title}</h3>
                            <p>{note.content}</p>
                            <button onClick={() => handleEdit(note)} className="edit-btn">Edit</button>
                            <button onClick={() => handleDelete(note._id)} className="delete-btn">Delete</button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default NoteList;
