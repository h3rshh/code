import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent } from "@/components/ui/Card";
import { Bot, Send } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";


const key = "AIzaSyCKap2t9tcTTCQa2uM-9_4NAMawW-JoLro"
const genAI = new GoogleGenerativeAI(key);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default function AISidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const fetchAIResponse = async () => {
    if (!input.trim()) return;

    try {
      const result = await model.generateContent(input);
      setResponse(result.response.text() || "No response from AI");
    } catch (error) {
      setResponse("Error fetching AI response");
    }
    
    setInput("");
  };

  return (
    <div className="fixed right-0 top-0 z-40 flex h-full">
      {/* AI Toggle Button (Right-Aligned) */}
      <Button
        className="absolute right-4 top-20 bg-blue-500 p-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bot size={24} />
      </Button>

      {/* AI Sidebar Panel (Right-Aligned) */}
      {isOpen && (
        <Card className="absolute right-2 top-12 w-80 pointer-events-auto">
          <CardContent className="flex flex-col space-y-4">
            
          {response && <div className="p-2 overflow-y-auto max-h-48 text-gray-300">{response}</div>}
            
            <Input
              placeholder="Ask AI..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button onClick={fetchAIResponse} className="flex items-center">
              <Send size={16} className="mr-2" /> Send
            </Button>
            
          </CardContent>
        </Card>
      )}
    </div>
  );
}
