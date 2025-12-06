import { motion } from "motion/react";
import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar } from "./ui/avatar";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { 
  ArrowLeft, 
  Music, 
  Play, 
  Pause, 
  Heart, 
  MessageCircle, 
  Share2, 
  Users, 
  Calendar,
  MapPin,
  Mic,
  Guitar,
  Volume2,
  PlusCircle,
  Crown,
  Star,
  Award,
  Radio,
  Headphones,
  Archive,
  User
} from "lucide-react";

interface MusicBrazileiraCommunityProps {
  onBack: () => void;
}

interface Post {
  id: number;
  author: string;
  avatar: string;
  time: string;
  content: string;
  type: 'discussion' | 'music' | 'event' | 'collaboration';
  musicData?: {
    title: string;
    artist: string;
    genre: string;
    duration: string;
    cover: string;
  };
  eventData?: {
    title: string;
    date: string;
    location: string;
    type: string;
  };
  likes: number;
  comments: number;
  shares: number;
}

const musicPosts: Post[] = [
  {
    id: 1,
    author: "Caetano Veloso Jr.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    time: "2h atrás",
    content: "Acabei de lançar uma nova interpretação de 'Aquarela do Brasil'! Uma fusão de bossa nova com elementos do hip hop nacional. O que vocês acham dessa mistura?",
    type: "music",
    musicData: {
      title: "Aquarela do Brasil (Remix 2024)",
      artist: "Caetano Veloso Jr.",
      genre: "Bossa Nova / Hip Hop",
      duration: "4:32",
      cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300"
    },
    likes: 47,
    comments: 23,
    shares: 12
  },
  {
    id: 2,
    author: "Maria do Samba",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b9c1cd17?w=100",
    time: "4h atrás",
    content: "Quem aqui conhece a história do samba de roda no Recôncavo Baiano? Vou organizar uma roda virtual para discutirmos as origens e a importância dessa expressão cultural!",
    type: "discussion",
    likes: 89,
    comments: 34,
    shares: 18
  },
  {
    id: 3,
    author: "João Violeiro",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
    time: "6h atrás",
    content: "Roda de viola hoje às 20h! Vamos tocar clássicos da música caipira e abrir espaço para composições autorais. Quem topa?",
    type: "event",
    eventData: {
      title: "Roda de Viola Online",
      date: "Hoje, 20:00",
      location: "Sala Virtual da Comunidade",
      type: "Música ao Vivo"
    },
    likes: 156,
    comments: 67,
    shares: 45
  },
  {
    id: 4,
    author: "Beatriz Compositora",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    time: "1d atrás",
    content: "Procuro letrista para colaborar em uma música sobre resistência e cultura brasileira. O instrumental já está pronto, inspirado no afrobeat e maracatu!",
    type: "collaboration",
    likes: 73,
    comments: 41,
    shares: 22
  }
];

const featuredArtists = [
  {
    name: "Dandara Cantora",
    genre: "MPB/Soul",
    followers: "12.3k",
    avatar: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?w=100",
    verified: true
  },
  {
    name: "Zumbi do Rap",
    genre: "Rap Consciente",
    followers: "45.7k",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    verified: true
  },
  {
    name: "Iemanjá Blues",
    genre: "Blues Nacional",
    followers: "8.9k",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b9c1cd17?w=100",
    verified: false
  }
];

const upcomingEvents = [
  {
    title: "Festival de Música Brasileira Online",
    date: "15 Dez 2024",
    time: "19:00",
    participants: 234,
    type: "Festival"
  },
  {
    title: "Workshop: Composição Musical",
    date: "18 Dez 2024",
    time: "15:00",
    participants: 67,
    type: "Workshop"
  },
  {
    title: "Roda de Chorinho Virtual",
    date: "20 Dez 2024",
    time: "20:30",
    participants: 123,
    type: "Jam Session"
  }
];

export function MusicBrazileiraCommunity({ onBack }: MusicBrazileiraCommunityProps) {
  const [newPost, setNewPost] = useState("");
  const [activeTab, setActiveTab] = useState("feed");
  const [isPlaying, setIsPlaying] = useState<number | null>(null);

  const handleSubmitPost = () => {
    if (newPost.trim()) {
      // Aqui seria enviado o post para o backend
      setNewPost("");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header da Comunidade */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden"
      >
        <Card className="p-0">
          <div className="relative h-48 bg-gradient-to-r from-yellow-400 via-green-500 to-red-500">
            <div className="absolute inset-0 bg-black/30"></div>
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200"
              alt="Música Brasileira"
              className="w-full h-full object-cover mix-blend-overlay"
            />
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
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="flex items-end gap-4">
                <div className="w-24 h-24 bg-gradient-to-br from-green-500 via-yellow-400 to-red-500 rounded-full flex items-center justify-center shadow-xl">
                  <Music className="w-12 h-12 text-white" />
                </div>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold mb-2">Música Brasileira</h1>
                  <p className="text-white/90 mb-3">
                    Celebrando a riqueza sonora do Brasil - do samba ao rap, do forró ao rock nacional
                  </p>
                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>15.7k membros</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Radio className="w-4 h-4" />
                      <span>234 online</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Archive className="w-4 h-4" />
                      <span>2.3k posts</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button className="bg-green-600 hover:bg-green-700 text-white">
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Entrar na Comunidade
                  </Button>
                  <Button variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Navegação da Comunidade */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-white border">
            <TabsTrigger value="feed" className="flex items-center gap-2">
              <Radio className="w-4 h-4" />
              Feed Musical
            </TabsTrigger>
            <TabsTrigger value="artists" className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              Artistas
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Eventos
            </TabsTrigger>
            <TabsTrigger value="library" className="flex items-center gap-2">
              <Archive className="w-4 h-4" />
              Biblioteca
            </TabsTrigger>
            <TabsTrigger value="collaborate" className="flex items-center gap-2">
              <Headphones className="w-4 h-4" />
              Colaborar
            </TabsTrigger>
          </TabsList>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Conteúdo Principal */}
            <div className="lg:col-span-2 space-y-6">
              <TabsContent value="feed" className="mt-0">
                {/* Criar Post Musical */}
                <Card className="p-6 mb-6">
                  <div className="flex gap-4">
                    <Avatar className="w-12 h-12">
                      <ImageWithFallback
                        src="https://images.unsplash.com/photo-1494790108755-2616b9c1cd17?w=100"
                        alt="Usuário"
                        className="rounded-full object-cover"
                      />
                    </Avatar>
                    <div className="flex-1 space-y-4">
                      <Textarea
                        placeholder="Compartilhe sua paixão pela música brasileira..."
                        value={newPost}
                        onChange={(e) => setNewPost(e.target.value)}
                        className="border-0 bg-gray-50 focus:bg-white"
                      />
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Music className="w-4 h-4 mr-2" />
                            Música
                          </Button>
                          <Button variant="outline" size="sm">
                            <Calendar className="w-4 h-4 mr-2" />
                            Evento
                          </Button>
                          <Button variant="outline" size="sm">
                            <Mic className="w-4 h-4 mr-2" />
                            Áudio
                          </Button>
                        </div>
                        <Button
                          onClick={handleSubmitPost}
                          className="bg-green-600 hover:bg-green-700"
                          disabled={!newPost.trim()}
                        >
                          Publicar
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Posts Musicais */}
                <div className="space-y-6">
                  {musicPosts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="p-6">
                        <div className="flex gap-4">
                          <Avatar className="w-12 h-12">
                            <ImageWithFallback
                              src={post.avatar}
                              alt={post.author}
                              className="rounded-full object-cover"
                            />
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-medium">{post.author}</h4>
                              <span className="text-sm text-gray-500">{post.time}</span>
                              {post.type === 'music' && (
                                <Badge className="bg-green-100 text-green-700 text-xs">
                                  <Music className="w-3 h-3 mr-1" />
                                  Música
                                </Badge>
                              )}
                              {post.type === 'event' && (
                                <Badge className="bg-blue-100 text-blue-700 text-xs">
                                  <Calendar className="w-3 h-3 mr-1" />
                                  Evento
                                </Badge>
                              )}
                              {post.type === 'collaboration' && (
                                <Badge className="bg-purple-100 text-purple-700 text-xs">
                                  <Users className="w-3 h-3 mr-1" />
                                  Colaboração
                                </Badge>
                              )}
                            </div>
                            <p className="text-gray-700 mb-4">{post.content}</p>

                            {/* Player Musical */}
                            {post.musicData && (
                              <div className="bg-gradient-to-r from-green-50 to-yellow-50 rounded-lg p-4 mb-4">
                                <div className="flex items-center gap-4">
                                  <div className="relative">
                                    <ImageWithFallback
                                      src={post.musicData.cover}
                                      alt={post.musicData.title}
                                      className="w-16 h-16 rounded-lg object-cover"
                                    />
                                    <Button
                                      size="sm"
                                      className="absolute inset-0 w-full h-full bg-black/50 hover:bg-black/70 text-white"
                                      onClick={() => setIsPlaying(isPlaying === post.id ? null : post.id)}
                                    >
                                      {isPlaying === post.id ? (
                                        <Pause className="w-4 h-4" />
                                      ) : (
                                        <Play className="w-4 h-4" />
                                      )}
                                    </Button>
                                  </div>
                                  <div className="flex-1">
                                    <h5 className="font-medium">{post.musicData.title}</h5>
                                    <p className="text-sm text-gray-600">{post.musicData.artist}</p>
                                    <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                                      <span>{post.musicData.genre}</span>
                                      <span>{post.musicData.duration}</span>
                                    </div>
                                  </div>
                                  <Volume2 className="w-5 h-5 text-gray-400" />
                                </div>
                                {isPlaying === post.id && (
                                  <div className="mt-3">
                                    <div className="w-full bg-gray-200 rounded-full h-1">
                                      <div className="bg-green-500 h-1 rounded-full w-1/3"></div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}

                            {/* Card de Evento */}
                            {post.eventData && (
                              <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-4 mb-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                                    <Calendar className="w-6 h-6 text-white" />
                                  </div>
                                  <div className="flex-1">
                                    <h5 className="font-medium">{post.eventData.title}</h5>
                                    <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                                      <span>{post.eventData.date}</span>
                                      <span>{post.eventData.location}</span>
                                    </div>
                                    <Badge className="bg-blue-100 text-blue-700 text-xs mt-2">
                                      {post.eventData.type}
                                    </Badge>
                                  </div>
                                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                    Participar
                                  </Button>
                                </div>
                              </div>
                            )}

                            {/* Ações do Post */}
                            <div className="flex items-center gap-6 pt-4 border-t">
                              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-red-600">
                                <Heart className="w-4 h-4 mr-2" />
                                {post.likes}
                              </Button>
                              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-blue-600">
                                <MessageCircle className="w-4 h-4 mr-2" />
                                {post.comments}
                              </Button>
                              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-green-600">
                                <Share2 className="w-4 h-4 mr-2" />
                                {post.shares}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="artists" className="mt-0">
                <div className="space-y-4">
                  <h3 className="font-medium">Artistas em Destaque</h3>
                  {featuredArtists.map((artist, index) => (
                    <Card key={artist.name} className="p-4">
                      <div className="flex items-center gap-4">
                        <Avatar className="w-16 h-16">
                          <ImageWithFallback
                            src={artist.avatar}
                            alt={artist.name}
                            className="rounded-full object-cover"
                          />
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{artist.name}</h4>
                            {artist.verified && (
                              <Badge className="bg-blue-100 text-blue-700 text-xs">
                                <Crown className="w-3 h-3 mr-1" />
                                Verificado
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{artist.genre}</p>
                          <p className="text-xs text-gray-500">{artist.followers} seguidores</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Seguir
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="events" className="mt-0">
                <div className="space-y-4">
                  <h3 className="font-medium">Próximos Eventos</h3>
                  {upcomingEvents.map((event, index) => (
                    <Card key={event.title} className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-yellow-500 rounded-lg flex items-center justify-center">
                          <Calendar className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{event.title}</h4>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                            <span>{event.date}</span>
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge className="bg-green-100 text-green-700 text-xs">
                              {event.type}
                            </Badge>
                            <span className="text-xs text-gray-500">
                              {event.participants} participantes
                            </span>
                          </div>
                        </div>
                        <Button className="bg-green-600 hover:bg-green-700">
                          Participar
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="library" className="mt-0">
                <Card className="p-6 text-center">
                  <Archive className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="font-medium mb-2">Biblioteca Musical</h3>
                  <p className="text-gray-600 mb-4">
                    Acesso exclusivo ao acervo musical da comunidade
                  </p>
                  <Button className="bg-green-600 hover:bg-green-700">
                    Explorar Biblioteca
                  </Button>
                </Card>
              </TabsContent>

              <TabsContent value="collaborate" className="mt-0">
                <Card className="p-6 text-center">
                  <Headphones className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="font-medium mb-2">Espaço de Colaboração</h3>
                  <p className="text-gray-600 mb-4">
                    Conecte-se com outros músicos e crie junto
                  </p>
                  <Button className="bg-green-600 hover:bg-green-700">
                    Buscar Colaboradores
                  </Button>
                </Card>
              </TabsContent>
            </div>

            {/* Sidebar da Comunidade */}
            <div className="space-y-6">
              {/* Moderadores */}
              <Card className="p-4">
                <h4 className="font-medium mb-4 flex items-center gap-2">
                  <Crown className="w-4 h-4 text-yellow-500" />
                  Moderadores
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-8 h-8">
                      <ImageWithFallback
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100"
                        alt="Moderador"
                        className="rounded-full object-cover"
                      />
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Gilberto Gil Filho</p>
                      <p className="text-xs text-gray-500">Fundador</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Avatar className="w-8 h-8">
                      <ImageWithFallback
                        src="https://images.unsplash.com/photo-1494790108755-2616b9c1cd17?w=100"
                        alt="Moderador"
                        className="rounded-full object-cover"
                      />
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Elis Regina Jr.</p>
                      <p className="text-xs text-gray-500">Moderadora</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Estatísticas */}
              <Card className="p-4">
                <h4 className="font-medium mb-4">Atividade da Comunidade</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Posts hoje</span>
                    <span className="font-medium">42</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Músicas compartilhadas</span>
                    <span className="font-medium">18</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Eventos esta semana</span>
                    <span className="font-medium">7</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Novos membros</span>
                    <span className="font-medium">156</span>
                  </div>
                </div>
              </Card>

              {/* Membros Online */}
              <Card className="p-4">
                <h4 className="font-medium mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Membros Online (234)
                </h4>
                <div className="space-y-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Avatar className="w-6 h-6">
                        <div className="w-full h-full bg-gradient-to-br from-green-500 via-yellow-400 to-red-500 rounded-full flex items-center justify-center">
                          <User className="w-3 h-3 text-white" />
                        </div>
                      </Avatar>
                      <span className="text-xs text-gray-600">Membro {i}</span>
                      <div className="w-1 h-1 bg-green-500 rounded-full ml-auto"></div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Regras da Comunidade */}
              <Card className="p-4">
                <h4 className="font-medium mb-4">Regras da Comunidade</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>• Respeite todos os estilos musicais brasileiros</p>
                  <p>• Compartilhe apenas conteúdo original ou com créditos</p>
                  <p>• Promova diálogos construtivos sobre música</p>
                  <p>• Apoie artistas independentes e locais</p>
                </div>
              </Card>
            </div>
          </div>
        </Tabs>
      </motion.div>
    </div>
  );
}