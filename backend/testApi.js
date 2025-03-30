const axios = require('axios');

const testCreateNote = async () => {
    try {
        const response = await axios.post('http://localhost:5000/api/notes', {
            title: "second Note",
            content: "This is a sample note 2"
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        console.log("Response:", response.data);
    } catch (error) {
        console.error("Error:", error.response ? error.response.data : error.message);
    }
};

testCreateNote();
