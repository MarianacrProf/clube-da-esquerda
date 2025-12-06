import { motion } from "motion/react";
import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Avatar } from "./ui/avatar";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { 
  Users, 
  MessageSquare, 
  Crown,
  Plus,
  Search,
  Filter,
  TrendingUp,
  Clock,
  Lock,
  Globe,
  Star
} from "lucide-react";

interface Forum {
  id: number;
  title: string;
  description: string;
  moderator: {
    name: string;
    avatar: string;
    type: "premium" | "institution";
  };
  participants: number;
  topics: number;
  lastActivity: string;
  category: string;
  isPrivate: boolean;
  trending: boolean;
  cover: string;
  tags: string[];
}

const mockForums: Forum[] = [
  {
    id: 1,
    title: "Políticas Educacionais Democratizantes",
    description: "Discussão sobre reformas educacionais que promovam igualdade e acesso universal à educação de qualidade.",
    moderator: {
      name: "Ana Moderadora",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b9c1cd17?w=100",
      type: "premium"
    },
    participants: 247,
    topics: 34,
    lastActivity: "há 15 min",
    category: "Educação",
    isPrivate: false,
    trending: true,
    cover: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=400",
    tags: ["Educação", "Políticas Públicas", "Democratização"]
  },
  {
    id: 2,
    title: "Reforma do Sistema de Saúde",
    description: "Fortalecimento do SUS e discussão sobre melhorias no atendimento à população.",
    moderator: {
      name: "Conselho Nacional de Saúde",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100",
      type: "institution"
    },
    participants: 412,
    topics: 67,
    lastActivity: "há 32 min",
    category: "Saúde",
    isPrivate: false,
    trending: true,
    cover: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400",
    tags: ["SUS", "Saúde Pública", "Reforma"]
  },
  {
    id: 3,
    title: "Agricultura Familiar e Sustentabilidade",
    description: "Apoio aos pequenos produtores e práticas agrícolas sustentáveis para segurança alimentar.",
    moderator: {
      name: "Movimento dos Trabalhadores Rurais",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
      type: "institution"
    },
    participants: 189,
    topics: 23,
    lastActivity: "há 1 hora",
    category: "Agricultura",
    isPrivate: false,
    trending: false,
    cover: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400",
    tags: ["Agricultura", "Sustentabilidade", "MST"]
  },
  {
    id: 4,
    title: "Direitos LGBTQIA+ no Brasil",
    description: "Luta por direitos iguais e combate à discriminação da comunidade LGBTQIA+.",
    moderator: {
      name: "Coletivo Diversidade",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
      type: "premium"
    },
    participants: 356,
    topics: 45,
    lastActivity: "há 2 horas",
    category: "Direitos Humanos",
    isPrivate: false,
    trending: false,
    cover: "https://images.unsplash.com/photo-1559113202-c916b8e44373?w=400",
    tags: ["LGBTQIA+", "Direitos", "Igualdade"]
  },
  {
    id: 5,
    title: "Estratégias Econômicas Populares",
    description: "Economia solidária e alternativas ao neoliberalismo para desenvolvimento social.",
    moderator: {
      name: "Instituto de Economia Popular",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
      type: "institution"
    },
    participants: 298,
    topics: 52,
    lastActivity: "há 3 horas",
    category: "Economia",
    isPrivate: true,
    trending: false,
    cover: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400",
    tags: ["Economia Solidária", "Cooperativismo", "Desenvolvimento"]
  }
];

interface ForumsListProps {
  onSelectForum: (forum: Forum) => void;
}

export function ForumsList({ onSelectForum }: ForumsListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [showCreateModal, setShowCreateModal] = useState(false);

  const categories = ["all", "Educação", "Saúde", "Agricultura", "Direitos Humanos", "Economia"];

  const filteredForums = mockForums.filter(forum => {
    const matchesSearch = forum.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         forum.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || forum.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const trendingForums = filteredForums.filter(forum => forum.trending);

  const getUserBadge = (type: "premium" | "institution") => {
    return type === "institution" ? 
      <Badge className="bg-blue-100 text-blue-700"><Crown className="w-3 h-3 mr-1" />Instituição</Badge> :
      <Badge className="bg-yellow-100 text-yellow-700">Premium</Badge>;
  };

  return (
    <div className="w-full p-6">
      {/* Header */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-green-700 mb-4">🏛️ Fóruns de Debate</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Espaços democráticos para discussão e tomada de decisões coletivas.
          Participe dos debates que moldam nosso futuro.
        </p>
      </motion.div>

      {/* Controles */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
        <div className="flex gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Buscar fóruns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={filterCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterCategory(category)}
                className={filterCategory === category ? "bg-green-600 hover:bg-green-700" : ""}
              >
                {category === "all" ? "Todos" : category}
              </Button>
            ))}
          </div>
        </div>

        <Button
          onClick={() => setShowCreateModal(true)}
          className="bg-green-600 hover:bg-green-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Criar Fórum
        </Button>
      </div>

      {/* Fóruns em destaque */}
      {trendingForums.length > 0 && (
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-red-600" />
            <h2 className="text-red-700">Em Alta</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {trendingForums.slice(0, 2).map((forum, index) => (
              <motion.div
                key={`trending-${forum.id}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card 
                  className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-r from-red-50 to-yellow-50"
                  onClick={() => onSelectForum(forum)}
                >
                  <div className="h-32 overflow-hidden">
                    <ImageWithFallback
                      src={forum.cover}
                      alt={forum.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium">{forum.title}</h3>
                      <Badge className="bg-red-100 text-red-700">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Em Alta
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {forum.description}
                    </p>
                    
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {forum.participants}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="w-4 h-4" />
                          {forum.topics}
                        </span>
                      </div>
                      <span>{forum.lastActivity}</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Lista de todos os fóruns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredForums.map((forum, index) => (
          <motion.div
            key={forum.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card 
              className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full"
              onClick={() => onSelectForum(forum)}
            >
              <div className="h-40 overflow-hidden relative">
                <ImageWithFallback
                  src={forum.cover}
                  alt={forum.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 flex gap-1">
                  {forum.isPrivate && (
                    <Badge className="bg-purple-100 text-purple-700">
                      <Lock className="w-3 h-3 mr-1" />
                      Privado
                    </Badge>
                  )}
                  {!forum.isPrivate && (
                    <Badge className="bg-green-100 text-green-700">
                      <Globe className="w-3 h-3 mr-1" />
                      Público
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="p-4 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium line-clamp-2">{forum.title}</h3>
                </div>
                
                <p className="text-sm text-gray-600 mb-3 line-clamp-3 flex-1">
                  {forum.description}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {forum.tags.slice(0, 2).map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {forum.tags.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{forum.tags.length - 2}
                    </Badge>
                  )}
                </div>
                
                {/* Moderador */}
                <div className="flex items-center gap-2 mb-3">
                  <Avatar className="w-6 h-6">
                    <ImageWithFallback
                      src={forum.moderator.avatar}
                      alt={forum.moderator.name}
                      className="rounded-full object-cover"
                    />
                  </Avatar>
                  <div>
                    <p className="text-xs text-gray-600">Moderado por</p>
                    <p className="text-sm font-medium">{forum.moderator.name}</p>
                  </div>
                  {getUserBadge(forum.moderator.type)}
                </div>
                
                {/* Estatísticas */}
                <div className="flex justify-between items-center text-sm text-gray-500 pt-3 border-t">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {forum.participants}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-4 h-4" />
                      {forum.topics}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {forum.lastActivity}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Estado vazio */}
      {filteredForums.length === 0 && (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-gray-600 mb-2">Nenhum fórum encontrado</h3>
          <p className="text-sm text-gray-500">
            Tente ajustar os filtros ou criar um novo fórum
          </p>
        </motion.div>
      )}
    </div>
  );
}