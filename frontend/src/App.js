import React, { useEffect, useState, useContext } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import axios from "axios";
import NoteList from "./components/NoteList";
import NoteForm from "./components/NoteForm";
import AuthContext, { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./styles.css";

const API_URL = "https://mern-notes-app-w86j.onrender.com/api/notes";

const NotesPage = () => {
    const { token, logout } = useContext(AuthContext);
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        if (token) {
            axios.get(API_URL, {
                headers: { Authorization: `Bearer ${token}` } } // Add Bearer prefix
            )
            .then(response => setNotes(response.data))
            .catch(error => console.error("Error fetching notes:", error.response?.data || error.message));
        }
    }, [token]);
    

    return (
        <div className="container">
            <h1>Notes App</h1>
            <button onClick={logout} className="logout-btn">Logout</button>
            <NoteForm setNotes={setNotes} />
            <NoteList notes={notes} setNotes={setNotes} />
        </div>
    );
};

function App() {
    const { token } = useContext(AuthContext);

    return (
        <Router>
            <Routes>
                {!token ? (
                    <>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="*" element={<Navigate to="/login" />} />
                    </>
                ) : (
                    <>
                        <Route path="/notes" element={<NotesPage />} />
                        <Route path="*" element={<Navigate to="/notes" />} />
                    </>
                )}
            </Routes>
        </Router>
    );
}

export default () => (
    <AuthProvider>
        <App />
    </AuthProvider>
);
