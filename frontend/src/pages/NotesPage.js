import { useEffect, useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";

const NotesPage = () => {
    const { token, logout } = useContext(AuthContext);
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        const fetchNotes = async () => {
            const res = await axios.get("https://mern-notes-app-w86j.onrender.com/api/notes", {
                headers: { Authorization: token },
            });            
            setNotes(res.data);
        };
        fetchNotes();
    }, [token]);

    return (
        <div className="container">
            <h2>Your Notes</h2>
            <button onClick={logout}>Logout</button>
            {notes.map((note) => (
                <div key={note._id} className="note">
                    <h3>{note.title}</h3>
                    <p>{note.content}</p>
                </div>
            ))}
        </div>
    );
};

export default NotesPage;
