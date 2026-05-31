const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5000;

// Translation Route
app.post("/translate", async (req, res) => {

    const { text, sourceLang, targetLang } = req.body;

    if (!text) {
        return res.status(400).json({
            error: "Text is required"
        });
    }

    try {

        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLang}|${targetLang}`;

        const response = await axios.get(url);

        const translated =
            response.data.responseData.translatedText;

        res.json({
            translatedText: translated
        });

    } catch (error) {

        console.error(error.message);

        res.status(500).json({
            error: "Translation failed"
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});