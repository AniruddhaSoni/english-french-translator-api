import express from "express";

const url = "https://google-translate1.p.rapidapi.com/language/translate/v2";

const options = (text) => ({
  method: "POST",
  headers: {
    "content-type": "application/x-www-form-urlencoded",
    "Accept-Encoding": "application/json",
    "X-RapidAPI-Key": process.env.X_RapidAPI_Key,
    "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
  },
  body: new URLSearchParams({
    q: text,
    target: "fr",
    source: "en",
  }),
});

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post("/translate", async (req, res) => {
  const { text } = req.body;

  console.log(text);

  if (!text) {
    return res.status(400).json({ error: "Text to translate is required." });
  }

  try {
    const response = await fetch(url, options(text));
    const result = await response.json();
    console.log(result.data);

    res.json({ translation: result.data.translations[0].translatedText });
  } catch (error) {
    console.log("Translation error:", error);
    res.status(500).json({ error: "An error occurred during translation." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
