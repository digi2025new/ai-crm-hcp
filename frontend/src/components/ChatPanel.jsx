import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setInteraction } from "../redux/interactionSlice";

export default function ChatPanel() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMsg = { role: "user", text: message };
    setChat((prev) => [...prev, userMsg]);

    setLoading(true);

    try {
      const res = await axios.post("http://localhost:8000/chat", {
        message,
      });

      console.log("API Response:", res.data);

      // ✅ Show tool used (important for interview)
      const aiMsg = {
        role: "ai",
        text: `✅ ${res.data.tool} executed`,
      };

      setChat((prev) => [...prev, aiMsg]);

      // ✅ Update form
      dispatch(setInteraction(res.data.data));

    } catch (err) {
      console.error(err);

      setChat((prev) => [
        ...prev,
        { role: "ai", text: "❌ Error processing request" },
      ]);
    }

    setLoading(false);
    setMessage("");
  };

  // ✅ Enter key support
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="p-4 flex flex-col h-full bg-gray-50">
      
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto border rounded p-3 mb-2 bg-white">
        {chat.length === 0 && (
          <p className="text-gray-400 text-center">
            Start typing to interact with AI...
          </p>
        )}

        {chat.map((c, i) => (
          <div
            key={i}
            className={`flex ${
              c.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <p
              className={`p-2 rounded-lg m-1 max-w-xs ${
                c.role === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              {c.text}
            </p>
          </div>
        ))}

        {loading && (
          <p className="text-gray-400 text-sm">🤖 AI is thinking...</p>
        )}
      </div>

      {/* Input Box */}
      <div className="flex gap-2">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type your message..."
          className="flex-1 border p-2 rounded"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}