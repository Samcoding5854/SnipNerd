import { GoogleGenerativeAI } from "@google/generative-ai";



// const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const genAI = new GoogleGenerativeAI("AIzaSyBNPXKeB5guv-wi4ELvuXQ9oA1mowLsqqE");

export async function summarizeFunc(data: any) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const prompt = `
            Create a summary for this YouTube transcription, focusing strictly on study-related or important content, while ignoring commercial, introduction, personal information, and promotional material. Please extract and summarize the key educational insights, discussions, and topics covered in the video, ensuring that the summary is concise and informative, and only includes content relevant to academic or educational purposes.${data}
            `;
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  return text
}
