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
  Book, 
  Film, 
  Music, 
  Theater,
  Plus,
  Heart,
  Star,
  Play,
  Crown,
  Users,
  Filter,
  Search,
  ExternalLink,
  BookOpen,
  Headphones,
  ArrowLeft,
  Share2
} from "lucide-react";
import { RecommendToFriend } from "./RecommendToFriend";
import { RecommendationChannel } from "./RecommendationChannel";

interface CulturalItem {
  id: number;
  title: string;
  author: string;
  type: "book" | "movie" | "music" | "theater" | "science";
  description: string;
  year?: number;
  image: string;
  creator: {
    name: string;
    avatar: string;
    type: "premium" | "institution";
  };
  channel: string;
  favorites: number;
  rating: number;
  tags: string[];
  contentType: "text" | "video";
  link?: string;
}

interface Channel {
  id: number;
  name: string;
  description: string;
  creator: {
    name: string;
    avatar: string;
    type: "premium" | "institution";
  };
  followers: number;
  items: number;
  category: "book" | "movie" | "music" | "theater" | "all";
  cover: string;
}

const mockChannels: Channel[] = [
  {
    id: 1,
    name: "Literatura de Resistência",
    description: "Livros que inspiram a luta por justiça social e transformação",
    creator: {
      name: "Prof. Carlos Liberdade",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
      type: "premium"
    },
    followers: 1847,
    items: 23,
    category: "book",
    cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400"
  },
  {
    id: 2,
    name: "Cinema Popular Brasileiro",
    description: "Filmes que retratam a realidade e a cultura do povo brasileiro",
    creator: {
      name: "Cinemateca Nacional",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b9c1cd17?w=100",
      type: "institution"
    },
    followers: 2341,
    items: 45,
    category: "movie",
    cover: "https://images.unsplash.com/photo-1489599735734-79b4f9b1e5f3?w=400"
  },
  {
    id: 3,
    name: "Sons da Periferia",
    description: "Música que nasce das quebradas e conta nossa história",
    creator: {
      name: "MC Consciência",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
      type: "premium"
    },
    followers: 3156,
    items: 67,
    category: "music",
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400"
  }
];

const mockRecommendations: CulturalItem[] = [
  {
    id: 1,
    title: "Quarto de Despejo",
    author: "Carolina Maria de Jesus",
    type: "book",
    description: "Um relato poderoso sobre a vida na favela e a luta pela dignidade. Uma obra fundamental para entender a realidade brasileira.",
    year: 1960,
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300",
    creator: {
      name: "Prof. Carlos Liberdade",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
      type: "premium"
    },
    channel: "Literatura de Resistência",
    favorites: 234,
    rating: 4.8,
    tags: ["Clássico", "Realidade Social", "Biografia"],
    contentType: "text"
  },
  {
    id: 2,
    title: "Cidade de Deus",
    author: "Fernando Meirelles",
    type: "movie",
    description: "Uma obra cinematográfica que expõe a violência urbana e as desigualdades sociais no Brasil.",
    year: 2002,
    image: "https://images.unsplash.com/photo-1489599735734-79b4f9b1e5f3?w=300",
    creator: {
      name: "Cinemateca Nacional",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b9c1cd17?w=100",
      type: "institution"
    },
    channel: "Cinema Popular Brasileiro",
    favorites: 456,
    rating: 4.9,
    tags: ["Drama", "Nacional", "Crítica Social"],
    contentType: "video",
    link: "https://example.com/video"
  },
  {
    id: 3,
    title: "Negro Drama",
    author: "Racionais MC's",
    type: "music",
    description: "Um hino do rap nacional que denuncia o racismo e a marginalização. Música essencial para entender o Brasil.",
    year: 2002,
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300",
    creator: {
      name: "MC Consciência",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
      type: "premium"
    },
    channel: "Sons da Periferia",
    favorites: 678,
    rating: 5.0,
    tags: ["Rap", "Consciência", "Resistência"],
    contentType: "text"
  },
  {
    id: 4,
    title: "Impactos da Desigualdade Social na Educação Brasileira",
    author: "Dr. Aparecida Santos",
    type: "science",
    description: "Pesquisa abrangente sobre como as disparidades socioeconômicas afetam o acesso e qualidade da educação no Brasil.",
    year: 2023,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300",
    creator: {
      name: "UNIFESP - Pesquisa Social",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b9c1cd17?w=100",
      type: "institution"
    },
    channel: "Pesquisas em Educação Popular",
    favorites: 156,
    rating: 4.7,
    tags: ["Educação", "Desigualdade", "Políticas Públicas"],
    contentType: "text",
    link: "https://example.com/research1"
  },
  {
    id: 5,
    title: "Democracia Participativa em Comunidades Urbanas",
    author: "Prof. Dr. João Nascimento",
    type: "science",
    description: "Estudo sobre experiências de gestão democrática e participação popular em grandes centros urbanos brasileiros.",
    year: 2024,
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=300",
    creator: {
      name: "USP - Ciências Políticas",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
      type: "institution"
    },
    channel: "Laboratório de Democracia",
    favorites: 289,
    rating: 4.8,
    tags: ["Democracia", "Participação", "Urbanismo"],
    contentType: "text",
    link: "https://example.com/research2"
  }
];

export function CulturalRecommendations() {
  const [activeTab, setActiveTab] = useState<"channels" | "recommendations">("channels");
  const [filter, setFilter] = useState<"all" | "book" | "movie" | "music" | "theater" | "science">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateChannel, setShowCreateChannel] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showRecommendModal, setShowRecommendModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [selectedChannel, setSelectedChannel] = useState<any>(null);

  const getTypeIcon = (type: "book" | "movie" | "music" | "theater" | "science") => {
    switch (type) {
      case "book": return <Book className="w-5 h-5" />;
      case "movie": return <Film className="w-5 h-5" />;
      case "music": return <Music className="w-5 h-5" />;
      case "theater": return <Theater className="w-5 h-5" />;
      case "science": return <BookOpen className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: "book" | "movie" | "music" | "theater" | "science") => {
    switch (type) {
      case "book": return "bg-green-100 text-green-700";
      case "movie": return "bg-blue-100 text-blue-700";
      case "music": return "bg-purple-100 text-purple-700";
      case "theater": return "bg-red-100 text-red-700";
      case "science": return "bg-teal-100 text-teal-700";
    }
  };

  const getUserBadge = (type: "premium" | "institution") => {
    return type === "institution" ? 
      <Badge className="bg-blue-100 text-blue-700"><Crown className="w-3 h-3 mr-1" />Instituição</Badge> :
      <Badge className="bg-yellow-100 text-yellow-700">Premium</Badge>;
  };

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
  };

  const filteredChannels = mockChannels.filter(channel => {
    const matchesFilter = filter === "all" || channel.category === filter;
    const matchesSearch = channel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         channel.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const filteredRecommendations = mockRecommendations.filter(item => {
    const matchesFilter = filter === "all" || item.type === filter;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.author.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Se um canal foi selecionado, mostrar a página do canal
  if (selectedChannel) {
    return (
      <RecommendationChannel
        channelName={selectedChannel.name}
        channelDescription={selectedChannel.description}
        channelCreator={selectedChannel.creator}
        followers={selectedChannel.followers}
        onBack={() => setSelectedChannel(null)}
      />
    );
  }

  return (
    <div className="w-full p-6">
      {/* Botão Voltar */}
      <Button
        variant="outline"
        onClick={() => window.history.back()}
        className="mb-6 flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar para o Clube
      </Button>

      {/* Header */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-green-700 mb-4">📚 Indicações Culturais</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Descubra livros, filmes, músicas e peças que transformam. 
          Canais curados por membros premium e instituições parceiras.
        </p>
      </motion.div>

      {/* Tabs */}
      <div className="flex justify-center mb-6">
        <div className="bg-gray-100 rounded-lg p-1">
          <Button
            variant={activeTab === "channels" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("channels")}
            className={activeTab === "channels" ? "bg-green-600 text-white" : ""}
          >
            Canais de Indicação
          </Button>
          <Button
            variant={activeTab === "recommendations" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("recommendations")}
            className={activeTab === "recommendations" ? "bg-green-600 text-white" : ""}
          >
            Todas as Indicações
          </Button>
        </div>
      </div>

      {/* Controles */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
        <div className="flex gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("all")}
            >
              Todos
            </Button>
            <Button
              variant={filter === "book" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("book")}
              className={filter === "book" ? "bg-green-500 hover:bg-green-600" : ""}
            >
              <Book className="w-4 h-4 mr-1" />
              Livros
            </Button>
            <Button
              variant={filter === "movie" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("movie")}
              className={filter === "movie" ? "bg-blue-500 hover:bg-blue-600" : ""}
            >
              <Film className="w-4 h-4 mr-1" />
              Filmes
            </Button>
            <Button
              variant={filter === "music" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("music")}
              className={filter === "music" ? "bg-purple-500 hover:bg-purple-600" : ""}
            >
              <Music className="w-4 h-4 mr-1" />
              Música
            </Button>
            <Button
              variant={filter === "theater" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("theater")}
              className={filter === "theater" ? "bg-red-500 hover:bg-red-600" : ""}
            >
              <Theater className="w-4 h-4 mr-1" />
              Teatro
            </Button>
            <Button
              variant={filter === "science" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("science")}
              className={filter === "science" ? "bg-teal-500 hover:bg-teal-600" : ""}
            >
              <BookOpen className="w-4 h-4 mr-1" />
              Pesquisas Científicas
            </Button>
          </div>
        </div>

        <Button
          onClick={() => setShowCreateChannel(true)}
          className="bg-green-600 hover:bg-green-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Criar Canal
        </Button>
      </div>

      {/* Conteúdo */}
      {activeTab === "channels" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChannels.map((channel, index) => (
            <motion.div
              key={channel.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card 
                className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedChannel(channel)}
              >
                <div className="h-32 overflow-hidden">
                  <ImageWithFallback
                    src={channel.cover}
                    alt={channel.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    {getTypeIcon(channel.category)}
                    <h3 className="font-medium">{channel.name}</h3>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {channel.description}
                  </p>
                  
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar className="w-8 h-8">
                      <ImageWithFallback
                        src={channel.creator.avatar}
                        alt={channel.creator.name}
                        className="rounded-full object-cover"
                      />
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{channel.creator.name}</p>
                      {getUserBadge(channel.creator.type)}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      {channel.followers} seguidores
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      {channel.items} itens
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-3">
                    <Button 
                      className="flex-1 bg-green-600 hover:bg-green-700"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Seguir Canal
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedItem(channel);
                        setShowRecommendModal(true);
                      }}
                    >
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredRecommendations.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="flex gap-4 p-4">
                  <div className="w-24 h-32 flex-shrink-0 rounded-lg overflow-hidden">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge className={getTypeColor(item.type)}>
                            {getTypeIcon(item.type)}
                            <span className="ml-1 capitalize">{item.type === "movie" ? "Filme" : item.type === "book" ? "Livro" : item.type === "music" ? "Música" : "Teatro"}</span>
                          </Badge>
                          {item.year && <span className="text-sm text-gray-500">{item.year}</span>}
                        </div>
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="text-sm text-gray-600">{item.author}</p>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleFavorite(item.id)}
                        className={favorites.includes(item.id) ? "text-red-500" : "text-gray-400"}
                      >
                        <Heart className={`w-4 h-4 ${favorites.includes(item.id) ? "fill-current" : ""}`} />
                      </Button>
                    </div>
                    
                    <p className="text-sm text-gray-700 mb-3 line-clamp-3">
                      {item.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {item.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <ImageWithFallback
                            src={item.creator.avatar}
                            alt={item.creator.name}
                            className="rounded-full object-cover"
                          />
                        </Avatar>
                        <span className="text-sm text-gray-600">{item.channel}</span>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Heart className="w-3 h-3" />
                          {item.favorites}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          {item.rating}
                        </div>
                        {item.contentType === "video" && (
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            <Play className="w-3 h-3 mr-1" />
                            Ver
                          </Button>
                        )}
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => {
                            setSelectedItem(item);
                            setShowRecommendModal(true);
                          }}
                        >
                          <Share2 className="w-3 h-3" />
                        </Button>
                        {item.link && (
                          <Button size="sm" variant="outline">
                            <ExternalLink className="w-3 h-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal de Recomendar */}
      {selectedItem && (
        <RecommendToFriend
          isOpen={showRecommendModal}
          onClose={() => {
            setShowRecommendModal(false);
            setSelectedItem(null);
          }}
          itemTitle={selectedItem.title || selectedItem.name}
          itemType={selectedItem.type === "movie" ? "obra" : selectedItem.type === "book" ? "obra" : selectedItem.type === "music" ? "obra" : selectedItem.type === "theater" ? "obra" : "canal"}
          itemDescription={selectedItem.description}
        />
      )}
    </div>
  );
}