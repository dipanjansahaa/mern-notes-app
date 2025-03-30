const axios = require('axios');

const testFetchNotes = async () => {
    try {
        const response = await axios.get('https://mern-notes-app-w86j.onrender.com/api/notes');
        console.log("Fetched Notes:", response.data);
    } catch (error) {
        console.error("Error:", error.response ? error.response.data : error.message);
    }
};

testFetchNotes();
