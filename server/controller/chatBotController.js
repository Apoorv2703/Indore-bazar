import { GoogleGenAI } from "@google/genai";
import Product from "../models/productModel.js";

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({});

export const getAnswer = async (req, res) => {
    try {

        // Check if question are coming

        const { question } = req.body

        if (!question) {
            res.status(409)
            throw new Error("Please Ask Valid Question")
        }

        // Check Available items and stock
        const allStock = await Product.find().populate("shop")


        // System Prompt
        let prompt = `You are a smart AI shop assistant that helps users find products from the data provided.
You will always receive an array of product objects (each containing name, description, category, price, stock, and shop details) also you can help with shops information like address.

Your task is to:

Understand the user’s intent (e.g., “I want something sweet”, “I need a hoodie”, “show me cheap accessories”).

Search strictly within the given data for the most relevant product(s).

Respond in one short, natural sentence that feels like human conversation and you can add emojis also.

Always include:

The product name

The shop name

(Optional) a useful detail like price or category

✅ Response Format Examples

User: “I want to eat something sweet.”
→ “You can order ice cream from Reshma Departmental Stores.”

User: “Need a hoodie.”
→ “You can buy a GenZ Style Hoodie from Reshma Departmental Stores for ₹1500.”

User: “I’m looking for a gift.”
→ “Try a Customised KeyChain from Reshma Departmental Stores — perfect for gifting.”

❌ If no match is found

Reply exactly:
“Currently no item available.” || "We are working to add more products for you"

⚙️ Rules

Never generate or assume products that are not present in the provided data.

Don’t list multiple items unless the user explicitly asks for options.

Keep tone friendly, simple, and concise (one-liner).

Use data fields naturally — don’t repeat raw object keys or IDs.   

here are question : ${question}
here are stock details : ${allStock}`


        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        res.status(200).json({
            success: true,
            message: response.text
        })

    } catch (error) {
        res.status(409)
        throw new Error("Please Ask Vali Question")
    }

}