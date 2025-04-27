const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const cors = require("cors");
require("dotenv").config();

app.use(bodyParser.json());
app.use(cors());

// Initialize Gemini API client with your API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/getResponse", async (req, res) => {
    try {
        const userQuestion = req.body.question;
        console.log("User Question:", userQuestion);

        // Get the model
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" }); 
        const result = await model.generateContent(userQuestion);
        const response = result.response.text();

        console.log("AI Response:", response);
        res.status(200).json({ response });

    } catch (err) {
        console.error("Error occurred:", err);
        res.status(500).json({ error: err.message || "Internal Server Error" });
    }
});

app.get("*", (req, res)=>{
    res.status(404).json({
        msg: "bad request"
    })
})

module.exports = app;
