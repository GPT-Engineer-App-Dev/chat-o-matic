import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send } from "lucide-react";

const Index = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: "John", content: "Hey, how are you?" },
    { id: 2, sender: "You", content: "I'm good, thanks! How about you?" },
    { id: 3, sender: "John", content: "Doing great! Any plans for the weekend?" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages([...messages, { id: messages.length + 1, sender: "You", content: newMessage }]);
      setNewMessage("");
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow overflow-hidden">
        <ScrollArea className="h-full p-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex mb-4 ${message.sender === "You" ? "justify-end" : "justify-start"}`}>
              <div className={`flex items-start ${message.sender === "You" ? "flex-row-reverse" : "flex-row"}`}>
                <Avatar className="w-8 h-8">
                  <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${message.sender}`} />
                  <AvatarFallback>{message.sender[0]}</AvatarFallback>
                </Avatar>
                <div className={`mx-2 p-3 rounded-lg ${message.sender === "You" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                  <p>{message.content}</p>
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>
      <footer className="p-4 border-t">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-grow"
          />
          <Button type="submit">
            <Send className="h-4 w-4 mr-2" />
            Send
          </Button>
        </form>
      </footer>
    </div>
  );
};

export default Index;