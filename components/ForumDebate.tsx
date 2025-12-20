import { motion } from "motion/react";
import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Avatar } from "./ui/avatar";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { 
  Pin, 
  MessageSquare, 
  ThumbsUp, 
  ThumbsDown, 
  Users, 
  Clock, 
  Crown,
  Vote,
  Plus,
  Send,
  ArrowUp,
  ArrowDown,
  CheckCircle,
  XCircle,
  ArrowLeft
} from "lucide-react";

interface Topic {
  id: number;
  title: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    type: "moderator" | "premium" | "regular";
  };
  isPinned: boolean;
  isVoting?: boolean;
  votingOptions?: {
    favor: { text: string; votes: number; };
    against: { text: string; votes: number; };
  };
  replies: number;
  lastActivity: string;
  tags: string[];
}

interface Message {
  id: number;
  author: {
    name: string;
    avatar: string;
    type: "moderator" | "premium" | "regular";
  };
  content: string;
  timestamp: string;
  votes: { up: number; down: number; };
  isAssemblyMotion?: boolean;
}

const mockTopics: Topic[] = [
  {
    id: 1,
    title: "📌 Regras do Fórum e Conduta Democrática",
    content: "Bem-vindos ao nosso espaço de debate! Aqui respeitamos a diversidade de opiniões e priorizamos o diálogo construtivo.",
    author: {
      name: "Ana Moderadora",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b9c1cd17?w=100",
      type: "moderator"
    },
    isPinned: true,
    replies: 23,
    lastActivity: "há 2 horas",
    tags: ["Regras", "Moderação"]
  },
  {
    id: 2,
    title: "🗳️ VOTAÇÃO: Implementação do Passe Livre Estudantil",
    content: "Proposta em votação: Devemos apoiar a implementação do passe livre estudantil em todas as universidades públicas?",
    author: {
      name: "Carlos Santos",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
      type: "premium"
    },
    isPinned: true,
    isVoting: true,
    votingOptions: {
      favor: { 
        text: "A favor: O transporte público gratuito é fundamental para democratizar o acesso à educação superior", 
        votes: 127 
      },
      against: { 
        text: "Contra: Precisamos de estudos mais aprofundados sobre o impacto orçamentário antes da implementação", 
        votes: 43 
      }
    },
    replies: 89,
    lastActivity: "há 15 min",
    tags: ["Votação", "Educação", "Transporte"]
  },
  {
    id: 3,
    title: "Discussão: Reforma do Sistema de Saúde Mental no SUS",
    content: "Como podemos melhorar o atendimento em saúde mental na rede pública? Compartilhem experiências e propostas.",
    author: {
      name: "Maria Silva",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
      type: "regular"
    },
    isPinned: false,
    replies: 56,
    lastActivity: "há 1 hora",
    tags: ["SUS", "Saúde Mental", "Política Pública"]
  },
  {
    id: 4,
    title: "Proposta: Criação de Hortas Comunitárias nas Periferias",
    content: "Vamos discutir a viabilidade de implementar hortas comunitárias como forma de segurança alimentar e fortalecimento comunitário.",
    author: {
      name: "João Pereira",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
      type: "regular"
    },
    isPinned: false,
    replies: 34,
    lastActivity: "há 3 horas",
    tags: ["Agricultura", "Comunidade", "Sustentabilidade"]
  }
];

const mockMessages: Message[] = [
  {
    id: 1,
    author: {
      name: "Ana Moderadora",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b9c1cd17?w=100",
      type: "moderator"
    },
    content: "Pessoal, vamos manter o foco na proposta do passe livre. Argumentos bem fundamentados, por favor!",
    timestamp: "14:30",
    votes: { up: 12, down: 0 }
  },
  {
    id: 2,
    author: {
      name: "Pedro Costa",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
      type: "regular"
    },
    content: "Concordo plenamente com o passe livre. Na minha universidade, muitos colegas desistem por não conseguir pagar o transporte diariamente.",
    timestamp: "14:32",
    votes: { up: 8, down: 1 }
  },
  {
    id: 3,
    author: {
      name: "Lucia Santos",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
      type: "premium"
    },
    content: "🏛️ MOÇÃO DE ASSEMBLEIA: Proponho que criemos uma comissão para elaborar um estudo detalhado sobre implementação gradual do passe livre, começando pelas universidades com maior vulnerabilidade social.",
    timestamp: "14:35",
    votes: { up: 15, down: 2 },
    isAssemblyMotion: true
  },
  {
    id: 4,
    author: {
      name: "Roberto Silva",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
      type: "regular"
    },
    content: "Apoio a moção da Lucia! Precisamos de dados concretos para embasar nossa posição.",
    timestamp: "14:37",
    votes: { up: 6, down: 0 }
  }
];

interface ForumDebateProps {
  forumTitle?: string;
  moderator?: string;
  onBackToForums?: () => void;
}

export function ForumDebate({ 
  forumTitle = "Fórum: Políticas Educacionais Democratizantes",
  moderator = "Ana Moderadora",
  onBackToForums
}: ForumDebateProps) {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(mockTopics[1]);
  const [newTopicTitle, setNewTopicTitle] = useState("");
  const [newTopicContent, setNewTopicContent] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [showCreateTopic, setShowCreateTopic] = useState(false);

  const getUserBadge = (type: "moderator" | "premium" | "regular") => {
    switch (type) {
      case "moderator":
        return <Badge className="bg-red-100 text-red-700 text-xs"><Crown className="w-3 h-3 mr-1" />Moderador</Badge>;
      case "premium":
        return <Badge className="bg-yellow-100 text-yellow-700 text-xs">Premium</Badge>;
      default:
        return null;
    }
  };

  const handleCreateTopic = () => {
    if (newTopicTitle.trim() && newTopicContent.trim()) {
      // Aqui seria a lógica para criar um novo tópico
      console.log("Novo tópico:", { title: newTopicTitle, content: newTopicContent });
      setNewTopicTitle("");
      setNewTopicContent("");
      setShowCreateTopic(false);
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Aqui seria a lógica para enviar mensagem
      console.log("Nova mensagem:", newMessage);
      setNewMessage("");
    }
  };

  return (
    <div className="w-full p-6">
      {/* Botão Voltar para a Roda */}
      <motion.div 
        className="mb-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <div className="flex gap-2">
          {onBackToForums && (
            <Button
              onClick={onBackToForums}
              variant="outline"
              className="bg-white/90 hover:bg-white border-blue-500 text-blue-700"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar aos Fóruns
            </Button>
          )}
          <Button
            onClick={() => window.history.back()}
            variant="outline"
            className="bg-white/90 hover:bg-white border-green-500 text-green-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para a Roda
          </Button>
        </div>
      </motion.div>

      {/* Header do Fórum */}
      <motion.div
        className="bg-gradient-to-r from-green-100 via-yellow-100 to-red-100 rounded-lg p-6 mb-6 border-l-4 border-green-500"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-green-700 mb-2">{forumTitle}</h1>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Crown className="w-4 h-4 text-red-500" />
              <span>Moderado por <strong>{moderator}</strong></span>
              <span className="text-gray-400">•</span>
              <Users className="w-4 h-4" />
              <span>247 participantes ativos</span>
            </div>
          </div>
          <Button
            onClick={() => setShowCreateTopic(!showCreateTopic)}
            className="bg-green-600 hover:bg-green-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Novo Tópico
          </Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lista de Tópicos */}
        <div className="lg:col-span-1">
          <Card className="p-4 bg-gray-50">
            <h3 className="mb-4 text-gray-700">📋 Tópicos do Fórum</h3>
            
            {/* Formulário de criação de tópico */}
            {showCreateTopic && (
              <motion.div
                className="mb-4 p-4 bg-white rounded-lg border"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
              >
                <Input
                  placeholder="Título do tópico..."
                  value={newTopicTitle}
                  onChange={(e) => setNewTopicTitle(e.target.value)}
                  className="mb-3"
                />
                <Textarea
                  placeholder="Descreva o tópico para discussão..."
                  value={newTopicContent}
                  onChange={(e) => setNewTopicContent(e.target.value)}
                  className="mb-3"
                  rows={3}
                />
                <div className="flex gap-2">
                  <Button size="sm" onClick={handleCreateTopic}>Criar</Button>
                  <Button size="sm" variant="outline" onClick={() => setShowCreateTopic(false)}>
                    Cancelar
                  </Button>
                </div>
              </motion.div>
            )}

            <div className="space-y-2">
              {mockTopics.map((topic, index) => (
                <motion.div
                  key={topic.id}
                  className={`p-3 rounded-lg cursor-pointer transition-all ${
                    selectedTopic?.id === topic.id 
                      ? 'bg-green-100 border-l-4 border-green-500' 
                      : 'bg-white hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedTopic(topic)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-start gap-2">
                    {topic.isPinned && <Pin className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />}
                    {topic.isVoting && <Vote className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate">{topic.title}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        {getUserBadge(topic.author.type)}
                        <span className="text-xs text-gray-500">{topic.author.name}</span>
                      </div>
                      <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <MessageSquare className="w-3 h-3" />
                          {topic.replies}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {topic.lastActivity}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>

        {/* Área de Discussão */}
        <div className="lg:col-span-2">
          {selectedTopic ? (
            <Card className="h-[600px] flex flex-col">
              {/* Header do Tópico */}
              <div className="p-4 border-b bg-gradient-to-r from-green-50 to-yellow-50">
                <div className="flex items-start gap-3">
                  <Avatar className="w-10 h-10">
                    <ImageWithFallback
                      src={selectedTopic.author.avatar}
                      alt={selectedTopic.author.name}
                      className="rounded-full object-cover"
                    />
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium">{selectedTopic.title}</h3>
                      {selectedTopic.isPinned && <Pin className="w-4 h-4 text-red-500" />}
                      {selectedTopic.isVoting && <Vote className="w-4 h-4 text-blue-500" />}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{selectedTopic.content}</p>
                    <div className="flex items-center gap-2">
                      {getUserBadge(selectedTopic.author.type)}
                      <span className="text-sm text-gray-500">{selectedTopic.author.name}</span>
                    </div>
                    
                    {/* Tags */}
                    <div className="flex gap-1 mt-2">
                      {selectedTopic.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">{tag}</Badge>
                      ))}
                    </div>

                    {/* Votação se houver */}
                    {selectedTopic.isVoting && selectedTopic.votingOptions && (
                      <div className="mt-4 space-y-3">
                        <div className="p-3 bg-green-50 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                              <span className="font-medium text-green-700">A Favor</span>
                            </div>
                            <span className="text-sm font-bold text-green-700">
                              {selectedTopic.votingOptions.favor.votes} votos
                            </span>
                          </div>
                          <p className="text-sm text-green-700">{selectedTopic.votingOptions.favor.text}</p>
                          <Button size="sm" className="mt-2 bg-green-600 hover:bg-green-700">
                            <ThumbsUp className="w-3 h-3 mr-1" />
                            Votar A Favor
                          </Button>
                        </div>

                        <div className="p-3 bg-red-50 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <XCircle className="w-4 h-4 text-red-600" />
                              <span className="font-medium text-red-700">Contra</span>
                            </div>
                            <span className="text-sm font-bold text-red-700">
                              {selectedTopic.votingOptions.against.votes} votos
                            </span>
                          </div>
                          <p className="text-sm text-red-700">{selectedTopic.votingOptions.against.text}</p>
                          <Button size="sm" variant="outline" className="mt-2 border-red-600 text-red-600 hover:bg-red-50">
                            <ThumbsDown className="w-3 h-3 mr-1" />
                            Votar Contra
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Mensagens estilo mIRC */}
              <div className="flex-1 overflow-y-auto p-4 bg-gray-50 font-mono text-sm">
                <div className="space-y-2">
                  {mockMessages.map((message, index) => (
                    <motion.div
                      key={message.id}
                      className={`flex gap-3 p-2 rounded hover:bg-white/50 transition-colors ${
                        message.isAssemblyMotion ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                      }`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <span className="text-gray-500 text-xs min-w-[50px]">{message.timestamp}</span>
                      <div className="flex items-center gap-2 min-w-[120px]">
                        <Avatar className="w-6 h-6">
                          <ImageWithFallback
                            src={message.author.avatar}
                            alt={message.author.name}
                            className="rounded-full object-cover"
                          />
                        </Avatar>
                        <span className={`font-medium ${
                          message.author.type === 'moderator' ? 'text-red-600' :
                          message.author.type === 'premium' ? 'text-yellow-600' : 'text-gray-700'
                        }`}>
                          {message.author.name}:
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-800">{message.content}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <button className="hover:text-green-600">
                              <ArrowUp className="w-3 h-3" />
                            </button>
                            <span>{message.votes.up}</span>
                            <button className="hover:text-red-600">
                              <ArrowDown className="w-3 h-3" />
                            </button>
                            <span>{message.votes.down}</span>
                          </div>
                          {message.isAssemblyMotion && (
                            <Badge className="bg-blue-100 text-blue-700 text-xs">Moção de Assembleia</Badge>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Input de nova mensagem */}
              <div className="p-4 border-t bg-white">
                <div className="flex gap-2">
                  <Input
                    placeholder="Digite sua mensagem... (Use 🏛️ no início para Moção de Assembleia)"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} className="bg-blue-600 hover:bg-blue-700">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Dica: Use 🏛️ no início da mensagem para criar uma Moção de Assembleia
                </p>
              </div>
            </Card>
          ) : (
            <Card className="h-[600px] flex items-center justify-center">
              <div className="text-center text-gray-500">
                <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Selecione um tópico para participar da discussão</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}