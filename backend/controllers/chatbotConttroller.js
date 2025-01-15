import {GoogleGenerativeAI} from '@google/generative-ai'

const generate = async (req, res) => {
  const prompt = req.body.prompt;

  try {
    const genAi = new GoogleGenerativeAI("AIzaSyB9qkkRJHN-n2NAxHcXY3Ril6WLe_lQWoI");
    const model = genAi.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);
    
    res.json({ success:true,data: result.response.text() });
  } catch (error) {
    console.error("Error generating content:", error);
    res.status(500).send("Error generating content");
  }
};

export { generate };
