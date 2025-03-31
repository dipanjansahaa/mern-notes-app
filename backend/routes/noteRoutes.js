const express = require("express");
const Note = require("../models/Note");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Create a Note (POST) - Protected Route
router.post("/", authMiddleware, async (req, res) => {
    try {
        const { title, content } = req.body;
        const newNote = new Note({ title, content, user: req.user }); // Associate note with logged-in user
        await newNote.save();
        res.status(201).json(newNote);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get All Notes for Logged-in User (GET) - Protected Route
router.get("/", authMiddleware, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user }); // Fetch only logged-in user's notes
        res.status(200).json(notes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a Single Note (GET) - Protected Route
router.get("/:id", authMiddleware, async (req, res) => {
    try {
        const note = await Note.findOne({ _id: req.params.id, user: req.user });
        if (!note) return res.status(404).json({ message: "Note not found" });
        res.status(200).json(note);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a Note (PUT) - Protected Route
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const { title, content } = req.body;
        const updatedNote = await Note.findOneAndUpdate(
            { _id: req.params.id, user: req.user }, // Ensure user can only update their own notes
            { title, content },
            { new: true }
        );
        if (!updatedNote) return res.status(404).json({ message: "Note not found" });
        res.status(200).json(updatedNote);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a Note (DELETE) - Protected Route
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const deletedNote = await Note.findOneAndDelete({ _id: req.params.id, user: req.user });
        if (!deletedNote) return res.status(404).json({ message: "Note not found" });
        res.status(200).json({ message: "Note deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
