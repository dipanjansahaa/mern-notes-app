import React, { useState } from "react";
import axios from "axios";

function NoteForm({ setNotes }) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const BASE_URL = "https://mern-notes-app-w86j.onrender.com/api"; // Use deployed backend

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !content) return alert("Title and content are required!");

        try {
            const BASE_URL = "https://mern-notes-app-w86j.onrender.com/api"; // Use deployed backend
            const response = await axios.post(`${BASE_URL}/notes`, { title, content });
            setNotes(prevNotes => [...prevNotes, response.data]);
            setTitle("");
            setContent("");
        } catch (error) {
            console.error("Error adding note:", error);
        }
    };

    return (
        <div>
            <h2>Add a Note</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <button type="submit">Add Note</button>
            </form>
        </div>
    );
}

export default NoteForm;
