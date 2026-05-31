const translateBtn = document.getElementById("translateBtn");
const inputText = document.getElementById("inputText");
const translatedText = document.getElementById("translatedText");
const sourceLang = document.getElementById("sourceLang");
const targetLang = document.getElementById("targetLang");
const copyBtn = document.getElementById("copyBtn");
const speakBtn = document.getElementById("speakBtn");

translateBtn.addEventListener("click", async () => {

    const text = inputText.value.trim();

    if (text === "") {
        alert("Please enter text to translate.");
        return;
    }

    translatedText.innerText = "Translating...";

    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLang.value}|${targetLang.value}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        translatedText.innerText = data.responseData.translatedText;

    } catch (error) {
        translatedText.innerText = "Translation failed.";
        console.error(error);
    }
});

copyBtn.addEventListener("click", () => {

    const text = translatedText.innerText;

    navigator.clipboard.writeText(text);

    alert("Translated text copied!");
});

speakBtn.addEventListener("click", () => {

    const speech = new SpeechSynthesisUtterance(
        translatedText.innerText
    );

    speech.lang = targetLang.value;

    window.speechSynthesis.speak(speech);
});const express = require("express");
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