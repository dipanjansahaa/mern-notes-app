const express = require('express');
const Note = require('../models/Note');
const router = express.Router();

// Create a Note (POST)
router.post('/notes', async (req, res) => {
    try {
        const { title, content } = req.body;
        const newNote = new Note({ title, content });
        await newNote.save();
        res.status(201).json(newNote);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all Notes (GET)
router.get('/notes', async (req, res) => {
    try {
        const notes = await Note.find();
        res.status(200).json(notes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a Single Note (GET)
router.get('/notes/:id', async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) return res.status(404).json({ message: "Note not found" });
        res.status(200).json(note);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a Note (PUT)
router.put('/notes/:id', async (req, res) => {
    try {
        const { title, content } = req.body;
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            { title, content },
            { new: true }
        );
        if (!updatedNote) return res.status(404).json({ message: "Note not found" });
        res.status(200).json(updatedNote);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a Note (DELETE)
router.delete('/notes/:id', async (req, res) => {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if (!deletedNote) return res.status(404).json({ message: "Note not found" });
        res.status(200).json({ message: "Note deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
