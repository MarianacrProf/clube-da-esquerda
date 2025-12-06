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
  Users, 
  MessageSquare, 
  Plus,
  Search,
  Image,
  Video,
  Mic,
  Smile,
  Heart,
  Share2,
  ArrowLeft,
  UserCheck,
  Settings,
  Pin,
  Clock,
  Eye,
  ThumbsUp,
  Send,
  Star
} from "lucide-react";
import { RecommendToFriend } from "./RecommendToFriend";

interface CommunityData {
  id: number;
  name: string;
  description: string;
  cover: string;
  members: number;
  creator: {
    name: string;
    avatar: string;
  };
  isJoined: boolean;
  category: string;
}

interface Topic {
  id: number;
  title: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  image?: string;
  video?: string;
  audio?: string;
  type: "text" | "image" | "video" | "audio" | "meme" | "ad";
  timestamp: string;
  replies: number;
  likes: number;
  views: number;
  isPinned?: boolean;
  tags: string[];
  isAd?: boolean;
  adInfo?: {
    sponsor: string;
    ctaText: string;
    ctaLink: string;
  };
}

const mockCommunity: CommunityData = {
  id: 1,
  name: "Filosofia Política",
  description: "Espaço para discussões profundas sobre teoria política, filosofia social e pensamento crítico. Bem-vindos todos os que buscam compreender o mundo através da reflexão.",
  cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
  members: 1247,
  creator: {
    name: "Prof. Ana Pensadora",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b9c1cd17?w=100"
  },
  isJoined: true,
  category: "Educação"
};

const mockTopics: Topic[] = [
  {
    id: 1,
    title: "💭 Reflexões sobre Democracia Participativa",
    author: {
      name: "João Reflexivo",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100"
    },
    content: "Gostaria de discutir como a democracia participativa pode ser implementada de forma prática em nossas comunidades. Quais são os principais desafios?",
    type: "text",
    timestamp: "há 2 horas",
    replies: 23,
    likes: 45,
    views: 156,
    isPinned: true,
    tags: ["Democracia", "Participação", "Comunidade"]
  },
  {
    id: 2,
    title: "🎭 Meme: Quando você tenta explicar Marx na mesa de jantar",
    author: {
      name: "Maria Meme",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100"
    },
    content: "Aquela sensação quando você começa a falar sobre mais-valia e todo mundo fica com cara de interrogação 😅",
    image: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=500",
    type: "meme",
    timestamp: "há 4 horas",
    replies: 67,
    likes: 234,
    views: 512,
    tags: ["Marx", "Humor", "Família"]
  },
  {
    id: 3,
    title: "🎵 Música: 'Cálice' - Análise da resistência através da arte",
    author: {
      name: "Carlos Música",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100"
    },
    content: "Compartilhando uma análise sobre como 'Cálice' de Chico Buarque se tornou um hino de resistência. A arte como forma de protesto político.",
    audio: "https://example.com/audio.mp3",
    type: "audio",
    timestamp: "há 6 horas",
    replies: 34,
    likes: 89,
    views: 278,
    tags: ["Música", "Resistência", "Chico Buarque"]
  },
  {
    id: 4,
    title: "📹 Vídeo: Palestra sobre Paulo Freire",
    author: {
      name: "Profa. Educadora",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100"
    },
    content: "Gravei uma pequena palestra sobre a pedagogia do oprimido. Espero que contribua para nossas discussões!",
    video: "https://example.com/video.mp4",
    type: "video",
    timestamp: "ontem",
    replies: 45,
    likes: 123,
    views: 789,
    tags: ["Paulo Freire", "Educação", "Pedagogia"]
  },
  {
    id: 5,
    title: "📚 Livros de Filosofia Política com 40% OFF",
    author: {
      name: "Livraria Revolução",
      avatar: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=100"
    },
    content: "Descubra os clássicos da filosofia política com nossa seleção especial! Marx, Gramsci, Beauvoir e muito mais. Use o código CLUBE40 e ganhe frete grátis para todo o Brasil.",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500",
    type: "ad",
    timestamp: "há 1 hora",
    replies: 12,
    likes: 28,
    views: 95,
    tags: ["Promoção", "Livros", "Filosofia"],
    isAd: true,
    adInfo: {
      sponsor: "Livraria Revolução",
      ctaText: "Ver Ofertas",
      ctaLink: "https://example.com/books"
    }
  },
  {
    id: 6,
    title: "🌱 Curso Online: Agroecologia e Soberania Alimentar",
    author: {
      name: "Instituto Terra Viva",
      avatar: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=100"
    },
    content: "Aprenda sobre agricultura sustentável e construção de sistemas alimentares justos. Curso com certificação, ministrado por especialistas em movimentos sociais rurais. Inscrições abertas!",
    video: "https://example.com/curso-preview.mp4",
    type: "ad",
    timestamp: "há 3 horas",
    replies: 8,
    likes: 42,
    views: 167,
    tags: ["Educação", "Sustentabilidade", "MST"],
    isAd: true,
    adInfo: {
      sponsor: "Instituto Terra Viva",
      ctaText: "Inscrever-se",
      ctaLink: "https://example.com/curso"
    }
  }
];

interface CommunityPageProps {
  community?: CommunityData;
  onBack: () => void;
}

export function CommunityPage({ community = mockCommunity, onBack }: CommunityPageProps) {
  const [topics, setTopics] = useState<Topic[]>(mockTopics);
  const [showCreateTopic, setShowCreateTopic] = useState(false);
  const [isJoined, setIsJoined] = useState(community.isJoined);
  const [searchTerm, setSearchTerm] = useState("");
  const [showRecommendModal, setShowRecommendModal] = useState(false);
  const [newTopic, setNewTopic] = useState({
    title: "",
    content: "",
    type: "text" as Topic["type"]
  });

  const filteredTopics = topics.filter(topic =>
    topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    topic.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTypeIcon = (type: Topic["type"]) => {
    switch (type) {
      case "image": return <Image className="w-4 h-4" />;
      case "video": return <Video className="w-4 h-4" />;
      case "audio": return <Mic className="w-4 h-4" />;
      case "meme": return <Smile className="w-4 h-4" />;
      case "ad": return <Star className="w-4 h-4" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: Topic["type"]) => {
    switch (type) {
      case "image": return "bg-blue-100 text-blue-700";
      case "video": return "bg-red-100 text-red-700";
      case "audio": return "bg-purple-100 text-purple-700";
      case "meme": return "bg-yellow-100 text-yellow-700";
      case "ad": return "bg-green-100 text-green-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const handleJoinCommunity = () => {
    setIsJoined(!isJoined);
  };

  const handleCreateTopic = () => {
    if (newTopic.title.trim() && newTopic.content.trim()) {
      const topic: Topic = {
        id: topics.length + 1,
        title: newTopic.title,
        author: {
          name: "Você",
          avatar: "https://images.unsplash.com/photo-1494790108755-2616b9c1cd17?w=100"
        },
        content: newTopic.content,
        type: newTopic.type,
        timestamp: "agora",
        replies: 0,
        likes: 0,
        views: 0,
        tags: []
      };
      
      setTopics([topic, ...topics]);
      setNewTopic({ title: "", content: "", type: "text" });
      setShowCreateTopic(false);
    }
  };

  return (
    <div className="w-full">
      {/* Botão Voltar */}
      <Button
        variant="outline"
        onClick={onBack}
        className="mb-6 flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar para o Clube
      </Button>

      {/* Header da Comunidade */}
      <motion.div
        className="relative mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="h-64 overflow-hidden rounded-lg">
          <ImageWithFallback
            src={community.cover}
            alt={community.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
          <div className="flex items-end justify-between">
            <div className="text-white">
              <h1 className="text-3xl font-bold mb-2">{community.name}</h1>
              <p className="text-white/90 mb-2 max-w-2xl">{community.description}</p>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {community.members.toLocaleString()} membros
                </div>
                <div className="flex items-center gap-2">
                  <Avatar className="w-6 h-6">
                    <ImageWithFallback
                      src={community.creator.avatar}
                      alt={community.creator.name}
                      className="rounded-full object-cover"
                    />
                  </Avatar>
                  <span>Criado por {community.creator.name}</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button
                onClick={handleJoinCommunity}
                className={isJoined ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"}
              >
                {isJoined ? (
                  <>
                    <UserCheck className="w-4 h-4 mr-2" />
                    Membro
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 mr-2" />
                    Entrar
                  </>
                )}
              </Button>
              
              <Button 
                variant="outline" 
                className="text-white border-white hover:bg-white hover:text-black"
                onClick={() => setShowRecommendModal(true)}
              >
                <Share2 className="w-4 h-4 mr-2" />
                Recomendar
              </Button>
              
              <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Controles */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
        <div className="flex gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Buscar tópicos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {isJoined && (
          <Button
            onClick={() => setShowCreateTopic(true)}
            className="bg-green-600 hover:bg-green-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Criar Tópico
          </Button>
        )}
      </div>

      {/* Modal de Criar Tópico */}
      {showCreateTopic && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="bg-white rounded-lg p-6 w-full max-w-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <h3 className="text-xl font-bold mb-4">Criar Novo Tópico</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block mb-2">Título</label>
                <Input
                  placeholder="Digite o título do tópico..."
                  value={newTopic.title}
                  onChange={(e) => setNewTopic({...newTopic, title: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block mb-2">Tipo de Conteúdo</label>
                <div className="flex gap-2">
                  {[
                    { type: "text", label: "Texto", icon: MessageSquare },
                    { type: "image", label: "Imagem", icon: Image },
                    { type: "video", label: "Vídeo", icon: Video },
                    { type: "audio", label: "Áudio", icon: Mic },
                    { type: "meme", label: "Meme", icon: Smile }
                  ].map(({ type, label, icon: Icon }) => (
                    <Button
                      key={type}
                      variant={newTopic.type === type ? "default" : "outline"}
                      size="sm"
                      onClick={() => setNewTopic({...newTopic, type: type as Topic["type"]})}
                    >
                      <Icon className="w-4 h-4 mr-1" />
                      {label}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block mb-2">Conteúdo</label>
                <Textarea
                  placeholder="Escreva seu conteúdo..."
                  value={newTopic.content}
                  onChange={(e) => setNewTopic({...newTopic, content: e.target.value})}
                  rows={4}
                />
              </div>
              
              {newTopic.type !== "text" && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">
                    {newTopic.type === "image" && "Arraste uma imagem ou clique para selecionar"}
                    {newTopic.type === "video" && "Arraste um vídeo ou clique para selecionar"}
                    {newTopic.type === "audio" && "Arraste um áudio ou clique para selecionar"}
                    {newTopic.type === "meme" && "Arraste uma imagem para o meme ou clique para selecionar"}
                  </p>
                  <Button variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Arquivo
                  </Button>
                </div>
              )}
            </div>
            
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline" onClick={() => setShowCreateTopic(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCreateTopic}>
                <Send className="w-4 h-4 mr-2" />
                Publicar
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Lista de Tópicos */}
      <div className="space-y-4">
        {filteredTopics.map((topic, index) => (
          <motion.div
            key={topic.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={`p-6 hover:shadow-lg transition-shadow ${topic.isPinned ? 'border-yellow-300 bg-yellow-50' : ''}`}>
              {topic.isPinned && (
                <div className="flex items-center gap-2 mb-3">
                  <Pin className="w-4 h-4 text-yellow-600" />
                  <Badge className="bg-yellow-100 text-yellow-700">Fixado</Badge>
                </div>
              )}
              
              <div className="flex gap-4">
                <Avatar className="w-12 h-12">
                  <ImageWithFallback
                    src={topic.author.avatar}
                    alt={topic.author.name}
                    className="rounded-full object-cover"
                  />
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-medium">{topic.title}</h3>
                    <Badge className={`${getTypeColor(topic.type)} flex items-center gap-1`}>
                      {getTypeIcon(topic.type)}
                      {topic.type}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                    <span className="font-medium">{topic.author.name}</span>
                    <span>•</span>
                    <span>{topic.timestamp}</span>
                  </div>
                  
                  <p className="text-gray-800 mb-3">{topic.content}</p>
                  
                  {/* Mídia */}
                  {topic.image && (
                    <div className="mb-3 rounded-lg overflow-hidden max-w-md">
                      <ImageWithFallback
                        src={topic.image}
                        alt="Post image"
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  )}
                  
                  {topic.video && (
                    <div className="mb-3 bg-gray-100 rounded-lg p-4 max-w-md">
                      <Video className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 text-center">Vídeo anexado</p>
                    </div>
                  )}
                  
                  {topic.audio && (
                    <div className="mb-3 bg-purple-100 rounded-lg p-4 max-w-md">
                      <Mic className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                      <p className="text-sm text-purple-600 text-center">Áudio anexado</p>
                    </div>
                  )}
                  
                  {/* Tags */}
                  {topic.tags.length > 0 && (
                    <div className="flex gap-1 mb-3">
                      {topic.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="outline" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  {/* Call to Action para Propaganda */}
                  {topic.isAd && topic.adInfo && (
                    <div className="mb-3 p-3 bg-gradient-to-r from-green-50 to-yellow-50 border border-green-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge className="bg-green-600 text-white">
                            <Star className="w-3 h-3 mr-1" />
                            Patrocinado
                          </Badge>
                          <span className="text-sm text-gray-600">por {topic.adInfo.sponsor}</span>
                        </div>
                        <Button 
                          size="sm" 
                          className="bg-green-600 hover:bg-green-700 text-white"
                          onClick={() => window.open(topic.adInfo.ctaLink, '_blank')}
                        >
                          {topic.adInfo.ctaText}
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {/* Estatísticas e Ações */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {topic.views}
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4" />
                        {topic.replies}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="text-gray-600 hover:text-red-600">
                        <Heart className="w-4 h-4 mr-1" />
                        {topic.likes}
                      </Button>
                      
                      <Button variant="ghost" size="sm" className="text-gray-600 hover:text-blue-600">
                        <Share2 className="w-4 h-4" />
                      </Button>
                      
                      <Button variant="outline" size="sm">
                        <MessageSquare className="w-4 h-4 mr-1" />
                        Responder
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Estado vazio */}
      {filteredTopics.length === 0 && (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-gray-600 mb-2">Nenhum tópico encontrado</h3>
          <p className="text-sm text-gray-500">
            {searchTerm ? "Tente ajustar os termos de busca" : "Seja o primeiro a criar um tópico!"}
          </p>
          {isJoined && !searchTerm && (
            <Button
              className="mt-4 bg-green-600 hover:bg-green-700"
              onClick={() => setShowCreateTopic(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Criar Primeiro Tópico
            </Button>
          )}
        </motion.div>
      )}

      {/* Modal de Recomendar */}
      <RecommendToFriend
        isOpen={showRecommendModal}
        onClose={() => setShowRecommendModal(false)}
        itemTitle={community.name}
        itemType="comunidade"
        itemDescription={community.description}
      />
    </div>
  );
}