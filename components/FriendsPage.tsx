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
  MessageSquare,
  UserPlus,
  Users,
  Filter,
  Heart,
  Star
} from "lucide-react";

interface Friend {
  id: number;
  name: string;
  avatar: string;
  status: "online" | "offline" | "away";
  mutualFriends: number;
  isClose: boolean;
  badges: string[];
  lastSeen?: string;
}

const mockFriends: Friend[] = [
  {
    id: 1,
    name: "Ana Resistência",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b9c1cd17?w=100",
    status: "online",
    mutualFriends: 12,
    isClose: true,
    badges: ["🏳️‍🌈 LGBT+", "📚 Educação"],
  },
  {
    id: 2,
    name: "João Solidário",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    status: "away",
    mutualFriends: 8,
    isClose: false,
    badges: ["🌱 Sustentabilidade"],
    lastSeen: "há 2 horas"
  },
  {
    id: 3,
    name: "Maria Liberdade",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    status: "online",
    mutualFriends: 15,
    isClose: true,
    badges: ["⚕️ SUS", "✊ Movimento"],
  },
  {
    id: 4,
    name: "Carlos Coletivo",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
    status: "offline",
    mutualFriends: 6,
    isClose: false,
    badges: ["🎵 Música"],
    lastSeen: "ontem"
  },
  {
    id: 5,
    name: "Luiza Comunidade",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100",
    status: "online",
    mutualFriends: 20,
    isClose: true,
    badges: ["🏥 SUS", "👩‍⚕️ Saúde Mental"],
  },
  {
    id: 6,
    name: "Roberto Reflexão",
    avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=100",
    status: "away",
    mutualFriends: 4,
    isClose: false,
    badges: ["🤔 Filosofia"],
    lastSeen: "há 1 hora"
  },
  {
    id: 7,
    name: "Fernanda Força",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100",
    status: "online",
    mutualFriends: 11,
    isClose: true,
    badges: ["🚺 Feminismo", "📖 Literatura"],
  },
  {
    id: 8,
    name: "Paulo Prática",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100",
    status: "offline",
    mutualFriends: 3,
    isClose: false,
    badges: ["🛠️ Trabalho"],
    lastSeen: "há 3 dias"
  }
];

interface FriendsPageProps {
  onBack: () => void;
  isPublic?: boolean;
}

export function FriendsPage({ onBack, isPublic = true }: FriendsPageProps) {
  const [friends] = useState<Friend[]>(mockFriends);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "online" | "close">("all");

  const getStatusColor = (status: Friend["status"]) => {
    switch (status) {
      case "online": return "bg-green-500";
      case "away": return "bg-yellow-500";
      case "offline": return "bg-gray-400";
    }
  };

  const filteredFriends = friends.filter(friend => {
    const matchesSearch = friend.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = 
      statusFilter === "all" || 
      (statusFilter === "online" && friend.status === "online") ||
      (statusFilter === "close" && friend.isClose);
    
    return matchesSearch && matchesStatus;
  });

  const onlineFriends = friends.filter(f => f.status === "online").length;
  const closeFriends = friends.filter(f => f.isClose).length;

  return (
    <div className="w-full p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar para o Clube
        </Button>
        
        <div className="flex-1">
          <h1 className="text-green-700 mb-2">👥 Lista de Amigos</h1>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>{friends.length} amigos</span>
            <span>•</span>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>{onlineFriends} online</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Heart className="w-3 h-3 text-red-500" />
              <span>{closeFriends} amigos próximos</span>
            </div>
          </div>
        </div>

        {!isPublic && (
          <Badge className="bg-blue-100 text-blue-700">
            <Users className="w-3 h-3 mr-1" />
            Apenas Amigos
          </Badge>
        )}
      </div>

      {/* Controles */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Buscar amigos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          <Button
            variant={statusFilter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("all")}
          >
            Todos
          </Button>
          <Button
            variant={statusFilter === "online" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("online")}
            className={statusFilter === "online" ? "bg-green-600 hover:bg-green-700" : ""}
          >
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            Online
          </Button>
          <Button
            variant={statusFilter === "close" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("close")}
            className={statusFilter === "close" ? "bg-red-600 hover:bg-red-700" : ""}
          >
            <Heart className="w-3 h-3 mr-2" />
            Próximos
          </Button>
        </div>
      </div>

      {/* Lista de Amigos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFriends.map((friend, index) => (
          <motion.div
            key={friend.id}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              transition: {
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
              }
            }}
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
            className="relative"
          >
            {/* Container sem rotação */}
            <motion.div>
              <Card className="p-6 text-center hover:shadow-lg transition-shadow relative overflow-hidden">
                {friend.isClose && (
                  <div className="absolute top-2 right-2">
                    <Heart className="w-4 h-4 text-red-500 fill-current" />
                  </div>
                )}
                
                {/* Avatar com status */}
                <div className="relative inline-block mb-4">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Avatar className="w-20 h-20 mx-auto">
                      <ImageWithFallback
                        src={friend.avatar}
                        alt={friend.name}
                        className="rounded-full object-cover"
                      />
                    </Avatar>
                  </motion.div>
                  
                  {/* Indicador de status */}
                  <div className={`absolute bottom-1 right-1 w-5 h-5 ${getStatusColor(friend.status)} rounded-full border-2 border-white`}></div>
                </div>
                
                {/* Nome */}
                <h3 className="font-medium mb-2">{friend.name}</h3>
                
                {/* Status e informações */}
                <div className="text-sm text-gray-600 mb-3">
                  {friend.status === "online" && (
                    <span className="text-green-600 font-medium">Online agora</span>
                  )}
                  {friend.status === "away" && (
                    <span className="text-yellow-600">Ausente</span>
                  )}
                  {friend.status === "offline" && friend.lastSeen && (
                    <span className="text-gray-500">Visto {friend.lastSeen}</span>
                  )}
                </div>
                
                {/* Amigos mútuos */}
                {friend.mutualFriends > 0 && (
                  <div className="flex items-center justify-center gap-1 text-xs text-gray-500 mb-3">
                    <Users className="w-3 h-3" />
                    <span>{friend.mutualFriends} amigos em comum</span>
                  </div>
                )}
                
                {/* Badges */}
                <div className="flex flex-wrap gap-1 justify-center mb-4">
                  {friend.badges.slice(0, 2).map((badge, badgeIndex) => (
                    <Badge key={badgeIndex} variant="outline" className="text-xs">
                      {badge}
                    </Badge>
                  ))}
                  {friend.badges.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{friend.badges.length - 2}
                    </Badge>
                  )}
                </div>
                
                {/* Ações */}
                <div className="flex gap-2 justify-center">
                  <Button size="sm" variant="outline" className="flex-1">
                    <MessageSquare className="w-3 h-3 mr-1" />
                    Chat
                  </Button>
                  
                  <Button size="sm" variant="outline">
                    <UserPlus className="w-3 h-3" />
                  </Button>
                </div>
                
                {/* Efeito de brilho no hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-green-400/0 via-green-400/10 to-green-400/0 opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </Card>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Estado vazio */}
      {filteredFriends.length === 0 && (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-gray-600 mb-2">Nenhum amigo encontrado</h3>
          <p className="text-sm text-gray-500">
            {searchTerm ? "Tente ajustar os termos de busca" : "Comece a fazer amigos na roda!"}
          </p>
        </motion.div>
      )}

      {/* Estatísticas flutuantes */}
      <motion.div
        className="fixed bottom-6 right-6 bg-white rounded-lg shadow-lg p-4 border"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center gap-3">
          <div className="text-center">
            <div className="text-xl font-bold text-green-600">{friends.length}</div>
            <div className="text-xs text-gray-500">Amigos</div>
          </div>
          <div className="w-px h-8 bg-gray-200"></div>
          <div className="text-center">
            <div className="text-xl font-bold text-red-600">{closeFriends}</div>
            <div className="text-xs text-gray-500">Próximos</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}