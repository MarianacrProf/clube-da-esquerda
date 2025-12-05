import { motion } from "motion/react";
import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Avatar } from "./ui/avatar";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { MapPin, Calendar, Users, Heart, Share, Plus, Filter, Search } from "lucide-react";

interface Event {
  id: number;
  title: string;
  type: "manifestacao" | "cultura";
  description: string;
  location: string;
  date: string;
  time: string;
  organizer: {
    name: string;
    avatar: string;
    type: "institution" | "premium" | "regular";
  };
  attendees: number;
  votes: number;
  city: string;
  tags: string[];
  image?: string;
}

const mockEvents: Event[] = [
  {
    id: 1,
    title: "Manifestação pela Educação Pública",
    type: "manifestacao",
    description: "Ato em defesa da educação pública de qualidade e contra os cortes no orçamento educacional.",
    location: "Praça da Sé, Centro",
    date: "2024-10-15",
    time: "14:00",
    organizer: {
      name: "APEOESP",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
      type: "institution"
    },
    attendees: 1247,
    votes: 892,
    city: "São Paulo",
    tags: ["Educação", "Direitos", "Manifestação"],
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400"
  },
  {
    id: 2,
    title: "Sarau da Resistência - Periferia Viva",
    type: "cultura",
    description: "Noite de poesia, música e arte na quebrada. Venha celebrar a cultura periférica!",
    location: "Casa de Cultura M'Boi Mirim",
    date: "2024-10-12",
    time: "19:00",
    organizer: {
      name: "Coletivo Periferia Viva",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b9c1cd17?w=100",
      type: "regular"
    },
    attendees: 156,
    votes: 423,
    city: "São Paulo",
    tags: ["Cultura", "Periferia", "Arte", "Sarau"],
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400"
  },
  {
    id: 3,
    title: "Roda de Samba pela Democracia",
    type: "cultura",
    description: "Samba, conversa e reflexão sobre democracia e participação popular.",
    location: "Largo do Machado",
    date: "2024-10-14",
    time: "16:00",
    organizer: {
      name: "Maria Santos",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
      type: "premium"
    },
    attendees: 89,
    votes: 245,
    city: "Rio de Janeiro",
    tags: ["Samba", "Democracia", "Cultura"],
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400"
  },
  {
    id: 4,
    title: "Ato pelo SUS e Saúde Mental",
    type: "manifestacao",
    description: "Mobilização em defesa do Sistema Único de Saúde e dos serviços de saúde mental.",
    location: "Congresso Nacional",
    date: "2024-10-18",
    time: "10:00",
    organizer: {
      name: "Conselho Nacional de Saúde",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100",
      type: "institution"
    },
    attendees: 2341,
    votes: 1567,
    city: "Brasília",
    tags: ["SUS", "Saúde Mental", "Direitos"],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400"
  }
];

interface EventsPageProps {
  userCity?: string;
  userType?: "institution" | "premium" | "regular";
}

export function EventsPage({ userCity = "São Paulo", userType = "regular" }: EventsPageProps) {
  const [filter, setFilter] = useState<"todos" | "manifestacao" | "cultura">("todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);

  const filteredEvents = mockEvents.filter(event => {
    const matchesFilter = filter === "todos" || event.type === filter;
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const canCreateManifestation = userType === "institution" || userType === "premium";

  const getEventTypeColor = (type: "manifestacao" | "cultura") => {
    return type === "manifestacao" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700";
  };

  const getOrganizerBadge = (type: "institution" | "premium" | "regular") => {
    switch (type) {
      case "institution":
        return <Badge className="bg-blue-100 text-blue-700">Instituição</Badge>;
      case "premium":
        return <Badge className="bg-yellow-100 text-yellow-700">Premium</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="w-full p-6">
      {/* Header */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-green-700 mb-4">Chamados da Roda</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Manifestações e eventos culturais organizados pela nossa comunidade.
          <span className="block mt-2 text-sm font-medium text-red-600">
            📍 Mostrando eventos em {userCity}
          </span>
        </p>
      </motion.div>

      {/* Controles */}
      <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Busca e filtros */}
        <div className="flex gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Buscar eventos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            <Button
              variant={filter === "todos" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("todos")}
            >
              Todos
            </Button>
            <Button
              variant={filter === "manifestacao" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("manifestacao")}
              className={filter === "manifestacao" ? "bg-red-500 hover:bg-red-600" : ""}
            >
              Manifestações
            </Button>
            <Button
              variant={filter === "cultura" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("cultura")}
              className={filter === "cultura" ? "bg-green-500 hover:bg-green-600" : ""}
            >
              Cultura
            </Button>
          </div>
        </div>

        {/* Botão criar evento */}
        <div className="flex gap-2">
          <Button
            onClick={() => setShowCreateModal(true)}
            className="bg-green-600 hover:bg-green-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Evento Cultural
          </Button>
          
          {canCreateManifestation && (
            <Button
              onClick={() => setShowCreateModal(true)}
              className="bg-red-600 hover:bg-red-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Manifestação
            </Button>
          )}
        </div>
      </div>

      {/* Lista de eventos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredEvents.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              {/* Imagem do evento */}
              {event.image && (
                <div className="h-48 overflow-hidden">
                  <ImageWithFallback
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="p-6">
                {/* Header do evento */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Badge className={getEventTypeColor(event.type)}>
                      {event.type === "manifestacao" ? "Manifestação" : "Cultura"}
                    </Badge>
                    <span className="text-sm text-gray-500">em {event.city}</span>
                  </div>
                  
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Heart className="w-4 h-4" />
                    {event.votes}
                  </div>
                </div>

                {/* Título e descrição */}
                <h3 className="mb-2">{event.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {event.description}
                </p>

                {/* Informações do evento */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    {new Date(event.date).toLocaleDateString('pt-BR')} às {event.time}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    {event.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    {event.attendees} confirmados
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {event.tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Organizador */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-8 h-8">
                      <ImageWithFallback
                        src={event.organizer.avatar}
                        alt={event.organizer.name}
                        className="rounded-full object-cover"
                      />
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{event.organizer.name}</p>
                      {getOrganizerBadge(event.organizer.type)}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Share className="w-4 h-4" />
                    </Button>
                    <div className="flex flex-col gap-1">
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Participar
                      </Button>
                      <label className="flex items-center gap-1 text-xs text-gray-600 cursor-pointer">
                        <input type="checkbox" className="w-3 h-3" />
                        Exibir no perfil
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Eventos populares na cidade */}
      <motion.div
        className="mt-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-green-700 mb-6">Mais Cotados em {userCity}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredEvents
            .sort((a, b) => b.votes - a.votes)
            .slice(0, 3)
            .map((event, index) => (
              <Card key={`popular-${event.id}`} className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                    event.type === "manifestacao" ? "bg-red-500" : "bg-green-500"
                  }`}>
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{event.title}</h4>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Heart className="w-3 h-3" />
                      {event.votes} votos
                      <Users className="w-3 h-3 ml-2" />
                      {event.attendees}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
        </div>
      </motion.div>
    </div>
  );
}