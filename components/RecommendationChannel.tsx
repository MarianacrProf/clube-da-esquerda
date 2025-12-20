import { motion } from "motion/react";
import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Avatar } from "./ui/avatar";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { 
  ArrowLeft,
  Search,
  Heart,
  Share2,
  ExternalLink,
  Play,
  Book,
  Film,
  Music,
  Theater,
  BookOpen,
  Users,
  Crown,
  Star,
  TrendingUp,
  Filter
} from "lucide-react";

interface ChannelRecommendation {
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
  favorites: number;
  rating: number;
  tags: string[];
  contentType: "text" | "video" | "audio";
  link?: string;
  isAd?: boolean;
  adInfo?: {
    sponsor: string;
    ctaText: string;
    ctaLink: string;
    price?: string;
  };
}

interface RecommendationChannelProps {
  channelName: string;
  channelDescription: string;
  channelCreator: {
    name: string;
    avatar: string;
    type: "premium" | "institution";
  };
  followers: number;
  onBack: () => void;
}

const mockRecommendations: ChannelRecommendation[] = [
  {
    id: 1,
    title: "Pedagogia do Oprimido",
    author: "Paulo Freire",
    type: "book",
    description: "Obra fundamental sobre educação libertadora e consciência crítica. Essencial para quem busca compreender a educação como prática da liberdade.",
    year: 1968,
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300",
    creator: {
      name: "Prof. Ana Educadora",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b9c1cd17?w=100",
      type: "premium"
    },
    favorites: 342,
    rating: 4.9,
    tags: ["Educação", "Paulo Freire", "Pedagogia Crítica"],
    contentType: "text"
  },
  {
    id: 2,
    title: "Coleção Paulo Freire Completa - 50% OFF",
    author: "Paulo Freire",
    type: "book",
    description: "A obra completa do maior educador brasileiro! 12 livros digitais + audiobooks exclusivos. Transforme sua prática educativa com desconto especial para membros do Clube da Esquerda.",
    year: 2024,
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300",
    creator: {
      name: "Editora Crítica",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
      type: "institution"
    },
    favorites: 156,
    rating: 4.7,
    tags: ["Promoção", "Coleção", "Paulo Freire"],
    contentType: "text",
    isAd: true,
    adInfo: {
      sponsor: "Editora Crítica",
      ctaText: "Aproveitar Oferta",
      ctaLink: "https://example.com/freire-collection",
      price: "R$ 89,90"
    }
  },
  {
    id: 3,
    title: "Eles Não Usam Black-Tie",
    author: "Gianfrancesco Guarnieri",
    type: "theater",
    description: "Peça teatral que retrata as lutas operárias no ABC paulista. Uma obra-prima do teatro brasileiro engajado.",
    year: 1958,
    image: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=300",
    creator: {
      name: "Teatro Popular",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
      type: "institution"
    },
    favorites: 234,
    rating: 4.8,
    tags: ["Teatro", "Movimento Operário", "ABC"],
    contentType: "video",
    link: "https://example.com/theater"
  },
  {
    id: 4,
    title: "Curso Online: Teatro do Oprimido - Método Augusto Boal",
    author: "Instituto Augusto Boal",
    type: "theater",
    description: "Aprenda as técnicas revolucionárias do Teatro do Oprimido! Curso prático com certificação, ministrado por especialistas formados pelo próprio Augusto Boal. Bolsas de estudo disponíveis.",
    year: 2024,
    image: "https://images.unsplash.com/photo-1507924538820-ede94a04019d?w=300",
    creator: {
      name: "Instituto Augusto Boal",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100",
      type: "institution"
    },
    favorites: 89,
    rating: 4.9,
    tags: ["Curso", "Teatro do Oprimido", "Augusto Boal"],
    contentType: "video",
    isAd: true,
    adInfo: {
      sponsor: "Instituto Augusto Boal",
      ctaText: "Inscrever-se",
      ctaLink: "https://example.com/teatro-oprimido",
      price: "R$ 297,00"
    }
  },
  {
    id: 5,
    title: "Democracia e Movimentos Sociais no Brasil",
    author: "Dr. Maria Silva Santos",
    type: "science",
    description: "Pesquisa inovadora sobre a participação dos movimentos sociais na construção democrática brasileira pós-88.",
    year: 2023,
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=300",
    creator: {
      name: "UNICAMP - Sociologia",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b9c1cd17?w=100",
      type: "institution"
    },
    favorites: 167,
    rating: 4.6,
    tags: ["Sociologia", "Democracia", "Movimentos Sociais"],
    contentType: "text",
    link: "https://example.com/research"
  }
];

export function RecommendationChannel({
  channelName,
  channelDescription,
  channelCreator,
  followers,
  onBack
}: RecommendationChannelProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"all" | "book" | "movie" | "music" | "theater" | "science">("all");
  const [favorites, setFavorites] = useState<number[]>([]);

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

  const filteredRecommendations = mockRecommendations.filter(item => {
    const matchesFilter = filter === "all" || item.type === filter;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.author.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="w-full p-6">
      {/* Header do Canal */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Button
          variant="outline"
          onClick={onBack}
          className="mb-6 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para Indicações
        </Button>

        <Card className="p-6 bg-gradient-to-r from-green-50 via-yellow-50 to-red-50">
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16">
              <ImageWithFallback
                src={channelCreator.avatar}
                alt={channelCreator.name}
                className="rounded-full object-cover"
              />
            </Avatar>
            
            <div className="flex-1">
              <h1 className="text-green-700 mb-2">{channelName}</h1>
              <p className="text-gray-600 mb-3">{channelDescription}</p>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{channelCreator.name}</span>
                  {getUserBadge(channelCreator.type)}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>{followers.toLocaleString()} seguidores</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button className="bg-green-600 hover:bg-green-700">
                <Heart className="w-4 h-4 mr-2" />
                Seguir Canal
              </Button>
              <Button variant="outline">
                <Share2 className="w-4 h-4 mr-2" />
                Compartilhar
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Controles de Busca e Filtros */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
        <div className="flex gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Buscar indicações..."
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
              <Filter className="w-4 h-4 mr-1" />
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
              Pesquisas
            </Button>
          </div>
        </div>
      </div>

      {/* Lista de Indicações */}
      <div className="grid gap-6">
        {filteredRecommendations.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={`p-6 hover:shadow-lg transition-all ${item.isAd ? 'border-green-200 bg-gradient-to-r from-green-50/50 to-yellow-50/50' : ''}`}>
              {item.isAd && (
                <div className="flex items-center gap-2 mb-4">
                  <Badge className="bg-green-600 text-white">
                    <Star className="w-3 h-3 mr-1" />
                    Patrocinado
                  </Badge>
                  <span className="text-sm text-gray-600">por {item.adInfo?.sponsor}</span>
                </div>
              )}
              
              <div className="flex gap-6">
                <div className="w-24 h-32 flex-shrink-0">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold">{item.title}</h3>
                        <Badge className={`${getTypeColor(item.type)} flex items-center gap-1`}>
                          {getTypeIcon(item.type)}
                          {item.type}
                        </Badge>
                      </div>
                      
                      <p className="text-gray-600 mb-1">por {item.author}</p>
                      
                      {item.year && (
                        <p className="text-sm text-gray-500 mb-2">{item.year}</p>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < Math.floor(item.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                      <span className="text-sm text-gray-600 ml-1">{item.rating}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4 leading-relaxed">{item.description}</p>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <Avatar className="w-6 h-6">
                      <ImageWithFallback
                        src={item.creator.avatar}
                        alt={item.creator.name}
                        className="rounded-full object-cover"
                      />
                    </Avatar>
                    <span className="text-sm text-gray-600">{item.creator.name}</span>
                    {getUserBadge(item.creator.type)}
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="outline" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleFavorite(item.id)}
                        className={favorites.includes(item.id) ? "text-red-600" : "text-gray-600"}
                      >
                        <Heart className={`w-4 h-4 mr-1 ${favorites.includes(item.id) ? 'fill-current' : ''}`} />
                        {item.favorites + (favorites.includes(item.id) ? 1 : 0)}
                      </Button>
                      
                      <Button variant="ghost" size="sm">
                        <Share2 className="w-4 h-4 mr-1" />
                        Compartilhar
                      </Button>
                      
                      {item.contentType === "video" && (
                        <Badge className="bg-red-100 text-red-700">
                          <Play className="w-3 h-3 mr-1" />
                          Vídeo
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      {item.isAd ? (
                        <div className="flex items-center gap-3">
                          {item.adInfo?.price && (
                            <span className="font-bold text-green-600">{item.adInfo.price}</span>
                          )}
                          <Button 
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => window.open(item.adInfo?.ctaLink, '_blank')}
                          >
                            {item.adInfo?.ctaText}
                          </Button>
                        </div>
                      ) : (
                        item.link && (
                          <Button variant="outline" size="sm">
                            <ExternalLink className="w-4 h-4 mr-1" />
                            Ver Completo
                          </Button>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Estatísticas do Canal */}
      <motion.div
        className="mt-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="p-6 bg-gradient-to-r from-green-50 to-yellow-50">
          <h3 className="text-green-700 mb-4">Estatísticas do Canal</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center">
              <TrendingUp className="w-8 h-8 text-green-600 mb-2" />
              <div className="text-2xl font-bold text-green-700">{filteredRecommendations.length}</div>
              <div className="text-sm text-gray-600">Indicações Ativas</div>
            </div>
            <div className="flex flex-col items-center">
              <Heart className="w-8 h-8 text-red-600 mb-2" />
              <div className="text-2xl font-bold text-red-700">
                {filteredRecommendations.reduce((sum, item) => sum + item.favorites, 0)}
              </div>
              <div className="text-sm text-gray-600">Total de Curtidas</div>
            </div>
            <div className="flex flex-col items-center">
              <Star className="w-8 h-8 text-yellow-600 mb-2" />
              <div className="text-2xl font-bold text-yellow-700">
                {(filteredRecommendations.reduce((sum, item) => sum + item.rating, 0) / filteredRecommendations.length).toFixed(1)}
              </div>
              <div className="text-sm text-gray-600">Avaliação Média</div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}