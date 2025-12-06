import { motion } from "motion/react";
import { useState } from "react";
import { MessageSquare, Video, Mic, Users, Calendar, Crown, Play } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar } from "./ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Forum {
  id: number;
  title: string;
  description: string;
  moderator: string;
  moderatorAvatar: string;
  participants: number;
  maxParticipants: number;
  date: string;
  time: string;
  status: 'upcoming' | 'live' | 'finished';
  category: string;
  posts: number;
}

interface RoundTable {
  id: number;
  title: string;
  topic: string;
  moderator: string;
  moderatorAvatar: string;
  speakers: number;
  maxSpeakers: number;
  viewers: number;
  startTime: string;
  isLive: boolean;
}

const mockForums: Forum[] = [
  {
    id: 1,
    title: "O Futuro da Educação Pública no Brasil",
    description: "Vamos debater propostas concretas para fortalecer a educação pública brasileira, desde o ensino fundamental até o superior.",
    moderator: "Prof. Ana Silva",
    moderatorAvatar: "https://images.unsplash.com/photo-1494790108755-2616b9c1cd17?w=100",
    participants: 127,
    maxParticipants: 200,
    date: "2025-01-05",
    time: "19:00",
    status: 'upcoming',
    category: "Educação",
    posts: 43
  },
  {
    id: 2,
    title: "SUS: Conquistas e Desafios",
    description: "Mesa redonda sobre o Sistema Único de Saúde, suas conquistas históricas e os desafios atuais para sua manutenção e fortalecimento.",
    moderator: "Dr. Carlos Santos",
    moderatorAvatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100",
    participants: 89,
    maxParticipants: 150,
    date: "2025-01-03",
    time: "20:00",
    status: 'live',
    category: "Saúde",
    posts: 67
  },
  {
    id: 3,
    title: "Reforma Agrária e Soberania Alimentar",
    description: "Discussão sobre a importância da reforma agrária para a soberania alimentar e o desenvolvimento sustentável do país.",
    moderator: "Maria do Campo",
    moderatorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    participants: 234,
    maxParticipants: 300,
    date: "2024-12-28",
    time: "18:30",
    status: 'finished',
    category: "Agricultura",
    posts: 156
  }
];

const mockRoundTables: RoundTable[] = [
  {
    id: 1,
    title: "Mesa Redonda: Democracia e Participação Popular",
    topic: "Como fortalecer a democracia participativa no Brasil?",
    moderator: "Profa. Lúcia Ferreira",
    moderatorAvatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100",
    speakers: 5,
    maxSpeakers: 8,
    viewers: 234,
    startTime: "20:00",
    isLive: true
  },
  {
    id: 2,
    title: "Cultura Periférica e Resistência",
    topic: "O papel da cultura popular na construção de identidades e resistências",
    moderator: "MC João",
    moderatorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    speakers: 3,
    maxSpeakers: 6,
    viewers: 145,
    startTime: "21:30",
    isLive: false
  }
];

export function PremiumForums() {
  const [activeTab, setActiveTab] = useState("forums");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'live':
        return <Badge className="bg-red-500 text-white animate-pulse">🔴 AO VIVO</Badge>;
      case 'upcoming':
        return <Badge className="bg-blue-500 text-white">📅 AGENDADO</Badge>;
      case 'finished':
        return <Badge className="bg-gray-500 text-white">✅ FINALIZADO</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="w-full p-6">
      {/* Header Premium */}
      <motion.div 
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="inline-flex items-center gap-2 mb-4">
          <Crown className="w-8 h-8 text-yellow-500" />
          <h1 className="bg-gradient-to-r from-yellow-600 via-orange-500 to-red-600 bg-clip-text text-transparent">
            Fóruns Premium
          </h1>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Participe de debates aprofundados e mesas redondas exclusivas para membros premium. 
          Construa conhecimento coletivo através do diálogo democrático.
        </p>
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="forums" className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Fóruns de Debate
          </TabsTrigger>
          <TabsTrigger value="roundtables" className="flex items-center gap-2">
            <Video className="w-4 h-4" />
            Mesas Redondas
          </TabsTrigger>
        </TabsList>

        {/* Fóruns de Debate */}
        <TabsContent value="forums" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {mockForums.map((forum, index) => (
              <motion.div
                key={forum.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
                  {/* Header do fórum */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="mb-2">{forum.title}</h3>
                      {getStatusBadge(forum.status)}
                    </div>
                    <Badge variant="outline" className="ml-2">
                      {forum.category}
                    </Badge>
                  </div>

                  {/* Descrição */}
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {forum.description}
                  </p>

                  {/* Moderador */}
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar className="w-8 h-8">
                      <ImageWithFallback 
                        src={forum.moderatorAvatar} 
                        alt={forum.moderator}
                        className="rounded-full object-cover"
                      />
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">Moderação: {forum.moderator}</p>
                      <p className="text-xs text-gray-500">{forum.date} às {forum.time}</p>
                    </div>
                  </div>

                  {/* Estatísticas */}
                  <div className="flex justify-between items-center mb-4 text-sm text-gray-500">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {forum.participants}/{forum.maxParticipants}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4" />
                        {forum.posts} posts
                      </span>
                    </div>
                  </div>

                  {/* Ações */}
                  <div className="flex gap-2">
                    {forum.status === 'live' ? (
                      <Button className="flex-1 bg-red-600 hover:bg-red-700">
                        <Play className="w-4 h-4 mr-2" />
                        Entrar no Debate
                      </Button>
                    ) : forum.status === 'upcoming' ? (
                      <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                        <Calendar className="w-4 h-4 mr-2" />
                        Participar
                      </Button>
                    ) : (
                      <Button variant="outline" className="flex-1">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Ver Discussões
                      </Button>
                    )}
                    
                    {forum.status === 'upcoming' && (
                      <Button variant="outline">
                        <Video className="w-4 h-4 mr-2" />
                        Mesa Redonda
                      </Button>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Mesas Redondas */}
        <TabsContent value="roundtables" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {mockRoundTables.map((table, index) => (
              <motion.div
                key={table.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="flex-1">{table.title}</h3>
                    {table.isLive && (
                      <Badge className="bg-red-500 text-white animate-pulse">
                        🔴 AO VIVO
                      </Badge>
                    )}
                  </div>

                  {/* Tópico */}
                  <p className="text-gray-600 text-sm mb-4 italic">
                    "{table.topic}"
                  </p>

                  {/* Moderador */}
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar className="w-8 h-8">
                      <ImageWithFallback 
                        src={table.moderatorAvatar} 
                        alt={table.moderator}
                        className="rounded-full object-cover"
                      />
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">Moderação: {table.moderator}</p>
                      <p className="text-xs text-gray-500">Início: {table.startTime}</p>
                    </div>
                  </div>

                  {/* Disposição circular da mesa */}
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <div className="absolute inset-4 bg-gradient-to-br from-yellow-400 to-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">MESA</span>
                    </div>
                    
                    {/* Posições dos participantes */}
                    {[...Array(table.maxSpeakers)].map((_, i) => {
                      const angle = (360 / table.maxSpeakers) * i;
                      const angleRad = (angle * Math.PI) / 180;
                      const radius = 50;
                      const x = 64 + radius * Math.cos(angleRad - Math.PI / 2);
                      const y = 64 + radius * Math.sin(angleRad - Math.PI / 2);
                      const hasParticipant = i < table.speakers;

                      return (
                        <div
                          key={i}
                          className={`absolute w-6 h-6 rounded-full border-2 ${
                            hasParticipant 
                              ? 'bg-green-500 border-green-600' 
                              : 'bg-gray-200 border-gray-300'
                          } flex items-center justify-center`}
                          style={{
                            left: x - 12,
                            top: y - 12,
                          }}
                        >
                          {hasParticipant && (
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Estatísticas */}
                  <div className="flex justify-between items-center mb-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Mic className="w-4 h-4" />
                      {table.speakers}/{table.maxSpeakers} falantes
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {table.viewers} ouvintes
                    </span>
                  </div>

                  {/* Ações */}
                  <div className="flex gap-2">
                    {table.isLive ? (
                      <>
                        <Button 
                          className="flex-1 bg-red-600 hover:bg-red-700"
                          onClick={() => {
                            // Esta funcionalidade seria conectada ao DebateRoomViewer
                            alert("Redirecionando para a mesa de debate...");
                          }}
                        >
                          <Video className="w-4 h-4 mr-2" />
                          Assistir
                        </Button>
                        <Button variant="outline">
                          <Mic className="w-4 h-4 mr-2" />
                          Pedir Fala
                        </Button>
                      </>
                    ) : (
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        <Calendar className="w-4 h-4 mr-2" />
                        Agendar Participação
                      </Button>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Call to action para upgrade */}
      <motion.div 
        className="mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="p-8 text-center bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50">
          <Crown className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
          <h2 className="mb-4 text-yellow-700">Torne-se Premium</h2>
          <p className="text-gray-600 mb-6">
            Acesse fóruns exclusivos, crie suas próprias mesas redondas e participe 
            ativamente na construção de um Brasil mais democrático e justo.
          </p>
          <Button size="lg" className="bg-gradient-to-r from-yellow-500 to-red-500 text-white">
            <Crown className="w-5 h-5 mr-2" />
            Upgrade para Premium
          </Button>
        </Card>
      </motion.div>
    </div>
  );
}