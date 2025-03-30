import React, { useEffect, useState } from "react";
import axios from "axios";
import NoteList from "./components/NoteList";
import NoteForm from "./components/NoteForm";
import "./styles.css";

function App() {
    const [notes, setNotes] = useState([]);

    // Fetch notes from backend
    useEffect(() => {
        axios.get("http://localhost:5000/api/notes")
            .then(response => setNotes(response.data))
            .catch(error => console.error("Error fetching notes:", error));
    }, []);

    return (
      <div className="container">
          <h1>Notes App</h1>
          <NoteForm setNotes={setNotes} />
          <NoteList notes={notes} setNotes={setNotes} />
      </div>
  );
  
}

export default App;
