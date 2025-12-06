import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { Mic, MicOff, Video, VideoOff, Hand, MessageSquare, Users, Clock, Heart, Volume2 } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Participant {
  id: number;
  name: string;
  avatar: string;
  role: 'moderator' | 'speaker' | 'viewer';
  isSpeaking: boolean;
  isMuted: boolean;
  hasVideo: boolean;
  position: { x: number; y: number };
}

interface ChatMessage {
  id: number;
  user: string;
  message: string;
  timestamp: string;
  type: 'message' | 'applause' | 'question' | 'system';
}

interface Reaction {
  id: number;
  type: 'applause' | 'heart' | 'question';
  x: number;
  y: number;
}

const mockParticipants: Participant[] = [
  {
    id: 1,
    name: "Profa. Ana Silva",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b9c1cd17?w=100",
    role: 'moderator',
    isSpeaking: false,
    isMuted: false,
    hasVideo: true,
    position: { x: 50, y: 10 }
  },
  {
    id: 2,
    name: "João Santos",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    role: 'speaker',
    isSpeaking: true,
    isMuted: false,
    hasVideo: true,
    position: { x: 85, y: 35 }
  },
  {
    id: 3,
    name: "Maria Costa",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    role: 'speaker',
    isSpeaking: false,
    isMuted: false,
    hasVideo: true,
    position: { x: 75, y: 75 }
  },
  {
    id: 4,
    name: "Carlos Lima",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
    role: 'speaker',
    isSpeaking: false,
    isMuted: true,
    hasVideo: false,
    position: { x: 25, y: 75 }
  },
  {
    id: 5,
    name: "Lúcia Ferreira",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100",
    role: 'speaker',
    isSpeaking: false,
    isMuted: false,
    hasVideo: true,
    position: { x: 15, y: 35 }
  }
];

const mockChat: ChatMessage[] = [
  {
    id: 1,
    user: "Paula Oliveira",
    message: "Excelente ponto sobre a educação pública! 👏",
    timestamp: "20:15",
    type: 'message'
  },
  {
    id: 2,
    user: "Sistema",
    message: "15 pessoas bateram palmas",
    timestamp: "20:16",
    type: 'applause'
  },
  {
    id: 3,
    user: "Roberto Silva",
    message: "Gostaria de fazer uma pergunta sobre o financiamento",
    timestamp: "20:17",
    type: 'question'
  }
];

export function DebateRoomViewer() {
  const [participants, setParticipants] = useState(mockParticipants);
  const [chatMessages, setChatMessages] = useState(mockChat);
  const [newMessage, setNewMessage] = useState("");
  const [reactions, setReactions] = useState<Reaction[]>([]);
  const [viewers] = useState(234);
  const [duration] = useState("42:18");
  const [isHandRaised, setIsHandRaised] = useState(false);

  // Simular mudança de quem está falando
  useEffect(() => {
    const interval = setInterval(() => {
      setParticipants(prev => prev.map(p => ({
        ...p,
        isSpeaking: Math.random() > 0.8 && p.role !== 'viewer'
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const addReaction = (type: 'applause' | 'heart' | 'question') => {
    const newReaction: Reaction = {
      id: Date.now(),
      type,
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10
    };

    setReactions(prev => [...prev, newReaction]);

    // Remover reação após animação
    setTimeout(() => {
      setReactions(prev => prev.filter(r => r.id !== newReaction.id));
    }, 2000);

    // Adicionar mensagem ao chat para palmas
    if (type === 'applause') {
      const applauseMessage: ChatMessage = {
        id: Date.now(),
        user: "Sistema",
        message: "Alguém bateu palmas! 👏",
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        type: 'applause'
      };
      setChatMessages(prev => [...prev, applauseMessage]);
    }
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const message: ChatMessage = {
      id: Date.now(),
      user: "Você",
      message: newMessage,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      type: 'message'
    };

    setChatMessages(prev => [...prev, message]);
    setNewMessage("");
  };

  const raiseHand = () => {
    setIsHandRaised(!isHandRaised);
    addReaction('question');
  };

  return (
    <div className="w-full p-6 space-y-6">
      {/* Header da mesa redonda */}
      <Card className="p-4 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="mb-1">Mesa Redonda: Democracia e Participação Popular</h1>
            <p className="text-sm opacity-90">Como fortalecer a democracia participativa no Brasil?</p>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{viewers} assistindo</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{duration}</span>
            </div>
            <Badge className="bg-red-600 text-white animate-pulse">🔴 AO VIVO</Badge>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Mesa circular de debate */}
        <div className="lg:col-span-3">
          <Card className="p-6 bg-gradient-to-br from-green-50 via-yellow-50 to-red-50 min-h-[600px] relative overflow-hidden">
            {/* Mesa central */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full shadow-2xl flex items-center justify-center">
              <span className="text-white font-bold text-sm text-center">MESA<br/>REDONDA</span>
            </div>

            {/* Participantes em círculo */}
            {participants.map((participant) => (
              <motion.div
                key={participant.id}
                className="absolute"
                style={{
                  left: `${participant.position.x}%`,
                  top: `${participant.position.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                animate={{
                  scale: participant.isSpeaking ? 1.1 : 1,
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Container do participante */}
                <div className="relative">
                  {/* Indicador de fala */}
                  {participant.isSpeaking && (
                    <motion.div
                      className="absolute -inset-2 rounded-full border-4 border-green-500"
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.7, 1, 0.7],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                      }}
                    />
                  )}

                  {/* Avatar */}
                  <div className={`relative w-20 h-20 rounded-full overflow-hidden border-4 ${
                    participant.role === 'moderator' 
                      ? 'border-yellow-500' 
                      : 'border-white'
                  } shadow-lg bg-white`}>
                    {participant.hasVideo ? (
                      <ImageWithFallback 
                        src={participant.avatar} 
                        alt={participant.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                        <VideoOff className="w-8 h-8 text-gray-500" />
                      </div>
                    )}

                    {/* Status do microfone */}
                    <div className={`absolute bottom-1 right-1 w-6 h-6 rounded-full flex items-center justify-center ${
                      participant.isMuted ? 'bg-red-500' : 'bg-green-500'
                    }`}>
                      {participant.isMuted ? (
                        <MicOff className="w-3 h-3 text-white" />
                      ) : (
                        <Mic className="w-3 h-3 text-white" />
                      )}
                    </div>

                    {/* Badge de função */}
                    {participant.role === 'moderator' && (
                      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                        Moderador
                      </div>
                    )}
                  </div>

                  {/* Nome */}
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
                    <p className="text-xs font-medium bg-white px-2 py-1 rounded shadow">
                      {participant.name}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Animações de reação */}
            <AnimatePresence>
              {reactions.map((reaction) => (
                <motion.div
                  key={reaction.id}
                  className="absolute text-4xl pointer-events-none"
                  style={{
                    left: `${reaction.x}%`,
                    top: `${reaction.y}%`,
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [0, 1.5, 1],
                    opacity: [0, 1, 0],
                    y: [-20, -60],
                    rotate: [0, 10, -10, 0],
                  }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 2 }}
                >
                  {reaction.type === 'applause' && '👏'}
                  {reaction.type === 'heart' && '❤️'}
                  {reaction.type === 'question' && '❓'}
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Ondas sonoras para quem está falando */}
            {participants.filter(p => p.isSpeaking).map((speaker, index) => (
              <motion.div
                key={`wave-${speaker.id}`}
                className="absolute pointer-events-none"
                style={{
                  left: `${speaker.position.x}%`,
                  top: `${speaker.position.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-24 h-24 border-2 border-green-400 rounded-full"
                    initial={{ scale: 0, opacity: 0.8 }}
                    animate={{
                      scale: [0, 3],
                      opacity: [0.8, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.5,
                    }}
                  />
                ))}
              </motion.div>
            ))}
          </Card>

          {/* Controles do usuário */}
          <Card className="p-4 mt-4">
            <div className="flex items-center justify-center gap-4">
              <Button
                variant="outline"
                onClick={() => addReaction('applause')}
                className="flex items-center gap-2"
              >
                👏 Aplaudir
              </Button>
              <Button
                variant="outline"
                onClick={() => addReaction('heart')}
                className="flex items-center gap-2"
              >
                ❤️ Curtir
              </Button>
              <Button
                variant={isHandRaised ? "default" : "outline"}
                onClick={raiseHand}
                className={`flex items-center gap-2 ${isHandRaised ? 'bg-yellow-500 hover:bg-yellow-600' : ''}`}
              >
                <Hand className="w-4 h-4" />
                {isHandRaised ? 'Mão Levantada' : 'Levantar Mão'}
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Volume2 className="w-4 h-4" />
                Som
              </Button>
            </div>
          </Card>
        </div>

        {/* Chat lateral */}
        <div className="lg:col-span-1">
          <Card className="p-4 h-[650px] flex flex-col">
            <h3 className="font-medium mb-4 flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Chat da Mesa
            </h3>

            {/* Mensagens do chat */}
            <div className="flex-1 space-y-3 overflow-y-auto mb-4">
              {chatMessages.map((msg) => (
                <motion.div
                  key={msg.id}
                  className={`p-2 rounded-lg text-sm ${
                    msg.type === 'system' 
                      ? 'bg-blue-100 text-blue-700 text-center' 
                      : msg.type === 'applause'
                      ? 'bg-yellow-100 text-yellow-700 text-center'
                      : msg.type === 'question'
                      ? 'bg-purple-100 text-purple-700'
                      : 'bg-gray-100'
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex-1">
                      <span className="font-medium">{msg.user}: </span>
                      <span>{msg.message}</span>
                    </div>
                    <span className="text-xs text-gray-500">{msg.timestamp}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Input de mensagem */}
            <div className="flex gap-2">
              <Input
                placeholder="Digite sua mensagem..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                className="flex-1"
              />
              <Button onClick={sendMessage} size="sm">
                Enviar
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}