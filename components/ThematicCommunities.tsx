import { motion } from "motion/react";
import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar } from "./ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { 
  ArrowLeft, 
  Users, 
  MessageCircle, 
  Calendar,
  TrendingUp,
  Star,
  Crown,
  Heart,
  Share2,
  PlusCircle,
  Search
} from "lucide-react";

interface ThematicCommunitiesProps {
  themeTitle: string;
  themeSymbol: string;
  themeColor: string;
  onBack: () => void;
  onOpenMusicCommunity?: () => void;
}

// Dados das comunidades organizadas por tema
const communitiesByTheme = {
  "Música Brasileira": [
    {
      id: 1,
      name: "Samba de Raiz",
      description: "Preservando as tradições do samba autêntico",
      members: 3247,
      posts: 567,
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300",
      isJoined: true,
      activity: "high",
      creator: "João do Cavaco",
      createdAt: "há 8 meses"
    },
    {
      id: 2,
      name: "MPB Contemporânea",
      description: "Música Popular Brasileira dos novos tempos",
      members: 2156,
      posts: 423,
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300",
      isJoined: false,
      activity: "medium",
      creator: "Marina Violão",
      createdAt: "há 5 meses"
    },
    {
      id: 3,
      name: "Hip Hop Nacional",
      description: "Rap e cultura hip hop das periferias brasileiras",
      members: 4891,
      posts: 1234,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300",
      isJoined: true,
      activity: "high",
      creator: "MC Resistência",
      createdAt: "há 1 ano"
    },
    {
      id: 4,
      name: "Forró Pé de Serra",
      description: "O autêntico forró nordestino",
      members: 1876,
      posts: 345,
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300",
      isJoined: false,
      activity: "medium"
    }
  ],
  "Literatura": [
    {
      id: 5,
      name: "Poesia da Periferia",
      description: "Versos que ecoam das favelas e subúrbios",
      members: 2341,
      posts: 678,
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300",
      isJoined: true,
      activity: "high",
      creator: "Poeta Urbano",
      createdAt: "há 6 meses"
    },
    {
      id: 6,
      name: "Literatura Brasileira",
      description: "Clássicos e contemporâneos da nossa literatura",
      members: 1567,
      posts: 445,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300",
      isJoined: false,
      activity: "medium",
      creator: "Prof. Ana Leite",
      createdAt: "há 1 ano"
    },
    {
      id: 7,
      name: "Cordel Nordestino",
      description: "A literatura de cordel do sertão brasileiro",
      members: 987,
      posts: 234,
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300",
      isJoined: true,
      activity: "low",
      creator: "Zé do Cordel",
      createdAt: "há 3 meses"
    }
  ],
  "Filosofia Política": [
    {
      id: 8,
      name: "Marxismo Brasileiro",
      description: "Pensamento marxista aplicado à realidade nacional",
      members: 4567,
      posts: 1234,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300",
      isJoined: true,
      activity: "high",
      creator: "Prof. Marxista",
      createdAt: "há 2 anos"
    },
    {
      id: 9,
      name: "Anarquismo & Autogestão",
      description: "Organização horizontal e poder popular",
      members: 2345,
      posts: 567,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300",
      isJoined: false,
      activity: "medium",
      creator: "Coletivo Libertário",
      createdAt: "há 1 ano"
    },
    {
      id: 10,
      name: "Feminismo Interseccional",
      description: "Luta feminista com recorte de classe e raça",
      members: 5234,
      posts: 1567,
      image: "https://images.unsplash.com/photo-1494790108755-2616b9c1cd17?w=300",
      isJoined: true,
      activity: "high",
      creator: "Marielle Presente",
      createdAt: "há 8 meses"
    },
    {
      id: 15,
      name: "Ecossocialismo",
      description: "Construindo um mundo sustentável e justo",
      members: 1876,
      posts: 432,
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300",
      isJoined: true,
      activity: "medium",
      creator: "Verde Revolução",
      createdAt: "há 4 meses"
    },
    {
      id: 16,
      name: "Teoria Decolonial",
      description: "Descolonizando mentes e práticas políticas",
      members: 1432,
      posts: 298,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300",
      isJoined: false,
      activity: "medium",
      creator: "Pensamento Sul",
      createdAt: "há 2 meses"
    }
  ],
  "Educação Pública": [
    {
      id: 11,
      name: "Pedagogia Crítica",
      description: "Educação transformadora e libertadora",
      members: 3456,
      posts: 789,
      image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=300",
      isJoined: true,
      activity: "high"
    },
    {
      id: 12,
      name: "ENEM Popular",
      description: "Preparação comunitária para o ENEM",
      members: 6789,
      posts: 2345,
      image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=300",
      isJoined: false,
      activity: "high"
    }
  ],
  "Saúde Mental": [
    {
      id: 13,
      name: "Apoio Mútuo",
      description: "Rede de cuidado e solidariedade",
      members: 4321,
      posts: 987,
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300",
      isJoined: true,
      activity: "high"
    },
    {
      id: 14,
      name: "Luta Antimanicomial",
      description: "Por uma saúde mental democrática",
      members: 2876,
      posts: 567,
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300",
      isJoined: false,
      activity: "medium"
    }
  ]
};

export function ThematicCommunities({ themeTitle, themeSymbol, themeColor, onBack, onOpenMusicCommunity }: ThematicCommunitiesProps) {
  const [activeTab, setActiveTab] = useState("communities");
  const [searchTerm, setSearchTerm] = useState("");
  
  const communities = communitiesByTheme[themeTitle] || [];
  const joinedCommunities = communities.filter(c => c.isJoined);
  const availableCommunities = communities.filter(c => !c.isJoined);

  const getActivityColor = (activity: string) => {
    switch (activity) {
      case "high": return "bg-green-500";
      case "medium": return "bg-yellow-500";
      case "low": return "bg-gray-500";
      default: return "bg-gray-500";
    }
  };

  const getActivityText = (activity: string) => {
    switch (activity) {
      case "high": return "Muito Ativa";
      case "medium": return "Moderada";
      case "low": return "Baixa";
      default: return "Desconhecida";
    }
  };

  const filteredCommunities = communities.filter(community =>
    community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    community.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header Temático */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden"
      >
        <Card className="p-0">
          <div 
            className="relative h-48 flex items-center justify-center"
            style={{ backgroundColor: themeColor }}
          >
            <div className="absolute top-6 left-6">
              <Button
                onClick={onBack}
                variant="outline"
                className="bg-white/90 hover:bg-white"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar aos Patches
              </Button>
            </div>
            
            <div className="text-center text-white">
              <div className="text-6xl mb-4">{themeSymbol}</div>
              <h1 className="text-4xl font-bold mb-2">{themeTitle}</h1>
              <p className="text-white/90 text-lg mb-3">
                {communities.length} comunidades criadas pela base • {communities.reduce((acc, c) => acc + c.members, 0).toLocaleString()} membros totais
              </p>
              <div className="flex items-center justify-center gap-2 text-sm bg-white/20 rounded-full px-4 py-2 backdrop-blur-sm">
                <Crown className="w-4 h-4" />
                <span>Patch conquistado por 3+ comunidades</span>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Explicação do Sistema de Patches */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-500">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium text-blue-900 mb-2">Como funcionam os Patches Temáticos</h3>
              <p className="text-sm text-blue-800 mb-3">
                Cada patch representa um tema amplo onde qualquer usuário pode criar suas próprias comunidades específicas. 
                Quando você participa de 3 ou mais comunidades do mesmo tema, conquista o patch no seu perfil!
              </p>
              <div className="flex items-center gap-4 text-xs text-blue-700">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Comunidades criadas pela base</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Moderação colaborativa</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Patch automático por participação</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Navegação */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex items-center justify-between mb-6">
            <TabsList className="grid w-full max-w-md grid-cols-3 bg-white border">
              <TabsTrigger value="communities" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Todas ({communities.length})
              </TabsTrigger>
              <TabsTrigger value="joined" className="flex items-center gap-2">
                <Heart className="w-4 h-4" />
                Minhas ({joinedCommunities.length})
              </TabsTrigger>
              <TabsTrigger value="discover" className="flex items-center gap-2">
                <Star className="w-4 h-4" />
                Descobrir ({availableCommunities.length})
              </TabsTrigger>
            </TabsList>

            {/* Busca e Criar Nova */}
            <div className="flex-1 max-w-md ml-6 flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input 
                  type="text"
                  placeholder="Buscar comunidades..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <Button className="bg-green-600 hover:bg-green-700 whitespace-nowrap">
                <PlusCircle className="w-4 h-4 mr-2" />
                Criar Comunidade
              </Button>
            </div>
          </div>

          {/* Conteúdo das Abas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <TabsContent value="communities" className="col-span-full">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCommunities.map((community, index) => (
                  <motion.div
                    key={community.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative h-40">
                        <ImageWithFallback
                          src={community.image}
                          alt={community.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 right-3">
                          <Badge className={`${getActivityColor(community.activity)} text-white text-xs px-2 py-1`}>
                            {getActivityText(community.activity)}
                          </Badge>
                        </div>
                        {community.isJoined && (
                          <div className="absolute top-3 left-3">
                            <Badge className="bg-green-600 text-white text-xs px-2 py-1">
                              <Heart className="w-3 h-3 mr-1" />
                              Membro
                            </Badge>
                          </div>
                        )}
                      </div>
                      
                      <div className="p-4">
                        <h3 className="font-medium mb-2">{community.name}</h3>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {community.description}
                        </p>
                        
                        {/* Info do criador */}
                        <div className="flex items-center gap-2 mb-3 p-2 bg-gray-50 rounded text-xs">
                          <Crown className="w-3 h-3 text-yellow-600" />
                          <span className="text-gray-600">
                            Criada por <span className="font-medium text-gray-800">{community.creator}</span>
                          </span>
                          <span className="text-gray-400">•</span>
                          <span className="text-gray-500">{community.createdAt}</span>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {community.members.toLocaleString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <MessageCircle className="w-4 h-4" />
                              {community.posts}
                            </span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          {community.isJoined ? (
                            <>
                              <Button 
                                className="flex-1 bg-green-600 hover:bg-green-700"
                                size="sm"
                                onClick={() => {
                                  // Se for a comunidade "Samba de Raiz" e existir callback
                                  if (community.id === 1 && themeTitle === "Música Brasileira" && onOpenMusicCommunity) {
                                    onOpenMusicCommunity();
                                  }
                                }}
                              >
                                <MessageCircle className="w-4 h-4 mr-2" />
                                Participar
                              </Button>
                              <Button variant="outline" size="sm">
                                <Share2 className="w-4 h-4" />
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button 
                                className="flex-1 bg-blue-600 hover:bg-blue-700"
                                size="sm"
                              >
                                <PlusCircle className="w-4 h-4 mr-2" />
                                Entrar
                              </Button>
                              <Button variant="outline" size="sm">
                                <Heart className="w-4 h-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="joined" className="col-span-full">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {joinedCommunities.map((community, index) => (
                  <motion.div
                    key={community.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow border-green-200">
                      <div className="relative h-40">
                        <ImageWithFallback
                          src={community.image}
                          alt={community.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-green-600 text-white text-xs px-2 py-1">
                            <Crown className="w-3 h-3 mr-1" />
                            Membro Ativo
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <h3 className="font-medium mb-2">{community.name}</h3>
                        <p className="text-sm text-gray-600 mb-4">
                          {community.description}
                        </p>
                        
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {community.members.toLocaleString()} membros
                          </span>
                          <span className="flex items-center gap-1">
                            <TrendingUp className="w-4 h-4" />
                            +{Math.floor(Math.random() * 50)} hoje
                          </span>
                        </div>

                        <Button 
                          className="w-full bg-green-600 hover:bg-green-700"
                          size="sm"
                        >
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Abrir Comunidade
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="discover" className="col-span-full">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {availableCommunities.map((community, index) => (
                  <motion.div
                    key={community.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow border-blue-200">
                      <div className="relative h-40">
                        <ImageWithFallback
                          src={community.image}
                          alt={community.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 right-3">
                          <Badge className="bg-blue-600 text-white text-xs px-2 py-1">
                            <Star className="w-3 h-3 mr-1" />
                            Recomendada
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <h3 className="font-medium mb-2">{community.name}</h3>
                        <p className="text-sm text-gray-600 mb-4">
                          {community.description}
                        </p>
                        
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {community.members.toLocaleString()} membros
                          </span>
                          <span className="text-green-600 font-medium">
                            95% compatibilidade
                          </span>
                        </div>

                        <Button 
                          className="w-full bg-blue-600 hover:bg-blue-700"
                          size="sm"
                        >
                          <PlusCircle className="w-4 h-4 mr-2" />
                          Entrar na Comunidade
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </motion.div>
    </div>
  );
}