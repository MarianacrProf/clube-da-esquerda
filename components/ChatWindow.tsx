import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Send, Smile, Image, Paperclip, ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar } from "./ui/avatar";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Message {
  id: number;
  text: string;
  sender: "me" | "them";
  timestamp: Date;
}

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
  contactName: string;
  contactAvatar: string;
  contactOnline?: boolean;
}

export function ChatWindow({ 
  isOpen, 
  onClose, 
  contactName, 
  contactAvatar,
  contactOnline = true 
}: ChatWindowProps) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Oi! Tudo bem?",
      sender: "them",
      timestamp: new Date(Date.now() - 600000)
    },
    {
      id: 2,
      text: "Oi! Tudo ótimo! E você?",
      sender: "me",
      timestamp: new Date(Date.now() - 300000)
    },
    {
      id: 3,
      text: "Também! Vi seu post sobre o evento, muito legal!",
      sender: "them",
      timestamp: new Date(Date.now() - 120000)
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!message.trim()) return;

    const newMessage: Message = {
      id: Date.now(),
      text: message,
      sender: "me",
      timestamp: new Date()
    };

    setMessages([...messages, newMessage]);
    setMessage("");

    // Simular resposta
    setTimeout(() => {
      const response: Message = {
        id: Date.now() + 1,
        text: "Legal! Vou participar também! 😊",
        sender: "them",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, response]);
    }, 1000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full h-[600px] flex flex-col overflow-hidden"
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-green-500 via-yellow-400 to-red-500 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Button
                    onClick={onClose}
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/20 mr-2"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </Button>
                  
                  <div className="relative">
                    <Avatar className="w-10 h-10">
                      <ImageWithFallback
                        src={contactAvatar}
                        alt={contactName}
                        className="rounded-full object-cover"
                      />
                    </Avatar>
                    {contactOnline && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-white">{contactName}</h3>
                    <p className="text-xs text-white/80">
                      {contactOnline ? "Online" : "Offline"}
                    </p>
                  </div>
                </div>

                <Button
                  onClick={onClose}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                        msg.sender === "me"
                          ? "bg-gradient-to-r from-green-500 to-green-600 text-white"
                          : "bg-white border border-gray-200"
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <p
                        className={`text-xs mt-1 ${
                          msg.sender === "me" ? "text-white/70" : "text-gray-400"
                        }`}
                      >
                        {formatTime(msg.timestamp)}
                      </p>
                    </div>
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="bg-white border-t border-gray-200 p-4">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="text-gray-500">
                    <Smile className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-500">
                    <Image className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-500">
                    <Paperclip className="w-5 h-5" />
                  </Button>
                  
                  <Input
                    placeholder="Digite sua mensagem..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSend()}
                    className="flex-1"
                  />
                  
                  <Button
                    onClick={handleSend}
                    className="bg-gradient-to-r from-green-500 to-green-600 text-white"
                    disabled={!message.trim()}
                  >
                    <Send className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
