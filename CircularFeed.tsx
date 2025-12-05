import { motion } from "motion/react";
import { Heart, MessageCircle, Share2, MoreHorizontal, Users, TrendingUp, Calendar, MapPin } from "lucide-react";
import { Avatar } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Post {
  id: number;
  author: string;
  avatar: string;
  content: string;
  image?: string;
  badges: string[];
  likes: number;
  comments: number;
  timestamp: string;
}

const mockPosts: Post[] = [
  {
    id: 1,
    author: "Maria Silva",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b9c1cd17?w=150",
    content: "Que bela roda de samba hoje no centro! A cultura brasileira fortalece nossa resistência e união. 🇧🇷✊",
    image: "https://images.unsplash.com/photo-1571158874937-beaf4f24a7cc?w=400",
    badges: ["🏳️‍🌈 LGBT", "🌱 Vegano"],
    likes: 24,
    comments: 8,
    timestamp: "há 2 horas"
  },
  {
    id: 2,
    author: "João Santos",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    content: "Precisamos discutir mais sobre educação pública de qualidade. Nossa democracia depende disso!",
    badges: ["📚 Educação", "⭐ PT"],
    likes: 31,
    comments: 12,
    timestamp: "há 4 horas"
  },
  {
    id: 3,
    author: "Ana Costa",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    content: "O SUS salvou minha vida e a de milhões de brasileiros. Defendamos sempre nosso sistema único de saúde!",
    badges: ["⚕️ SUS", "🏳️‍⚧️ Trans"],
    likes: 67,
    comments: 23,
    timestamp: "há 6 horas"
  }
];

interface CircularFeedProps {
  posts?: Post[];
}

// Eventos populares da cidade (mock)
const popularEvents = [
  {
    id: 1,
    title: "Manifestação pela Educação",
    type: "manifestacao",
    date: "15/10",
    location: "Centro",
    attendees: 1247,
    votes: 892
  },
  {
    id: 2,
    title: "Sarau da Resistência",
    type: "cultura",
    date: "12/10",
    location: "M'Boi Mirim",
    attendees: 156,
    votes: 423
  },
  {
    id: 3,
    title: "Roda de Samba Democrático",
    type: "cultura",
    date: "14/10",
    location: "Vila Madalena",
    attendees: 89,
    votes: 245
  }
];

export function CircularFeed({ posts = mockPosts }: CircularFeedProps) {
  const radius = 280;
  const centerX = 350;
  const centerY = 350;

  return (
    <div className="w-full p-6">
      {/* Seção de Eventos Populares */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="bg-gradient-to-r from-green-100 via-yellow-100 to-red-100 rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-6 h-6 text-green-600" />
            <h2 className="text-green-700">Chamados mais Cotados em São Paulo</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {popularEvents.map((event, index) => (
              <motion.div
                key={event.id}
                className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start justify-between mb-2">
                  <Badge className={event.type === "manifestacao" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}>
                    {event.type === "manifestacao" ? "Manifestação" : "Cultura"}
                  </Badge>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Heart className="w-3 h-3" />
                    {event.votes}
                  </div>
                </div>
                
                <h4 className="font-medium text-sm mb-2">{event.title}</h4>
                
                <div className="space-y-1 text-xs text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {event.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {event.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {event.attendees} confirmados
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Feed Circular */}
      <div className="relative w-[700px] h-[700px] mx-auto">
        {/* Centro da roda de discussão */}
        <motion.div 
          className="absolute top-1/2 left-1/2 w-32 h-32 -mt-16 -ml-16 bg-gradient-to-br from-green-600 via-yellow-500 to-red-600 rounded-full flex items-center justify-center shadow-2xl z-10"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          <div className="text-center text-white">
            <div className="font-bold text-sm">CLUBE DA</div>
            <div className="font-bold text-sm">ESQUERDA</div>
          </div>
        </motion.div>

        {/* Posts em círculo */}
        {posts.map((post, index) => {
        const angle = (360 / posts.length) * index;
        const angleRad = (angle * Math.PI) / 180;
        const x = centerX + radius * Math.cos(angleRad - Math.PI / 2);
        const y = centerY + radius * Math.sin(angleRad - Math.PI / 2);

        return (
          <motion.div
            key={post.id}
            className="absolute w-72 bg-white rounded-2xl shadow-lg p-4 border-2 border-transparent hover:border-yellow-400 transition-all duration-300"
            style={{
              left: x - 144,
              top: y - 100,
            }}
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            whileHover={{ scale: 1.05, zIndex: 20 }}
          >
            {/* Header do post */}
            <div className="flex items-center gap-3 mb-3">
              <Avatar className="w-10 h-10">
                <ImageWithFallback 
                  src={post.avatar} 
                  alt={post.author}
                  className="rounded-full object-cover"
                />
              </Avatar>
              <div className="flex-1">
                <h4 className="font-medium">{post.author}</h4>
                <p className="text-sm text-gray-500">{post.timestamp}</p>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>

            {/* Badges políticas */}
            <div className="flex flex-wrap gap-1 mb-3">
              {post.badges.map((badge, i) => (
                <Badge key={i} variant="secondary" className="text-xs bg-red-100 text-red-700">
                  {badge}
                </Badge>
              ))}
            </div>

            {/* Conteúdo */}
            <p className="text-sm mb-3 leading-relaxed">{post.content}</p>

            {/* Imagem se houver */}
            {post.image && (
              <div className="mb-3 rounded-lg overflow-hidden">
                <ImageWithFallback 
                  src={post.image} 
                  alt="Post image"
                  className="w-full h-32 object-cover"
                />
              </div>
            )}

            {/* Ações */}
            <div className="flex items-center gap-4 pt-2 border-t border-gray-100">
              <motion.button 
                className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors"
                whileTap={{ scale: 0.9 }}
              >
                <Heart className="w-4 h-4" />
                <span className="text-xs">{post.likes}</span>
              </motion.button>
              <motion.button 
                className="flex items-center gap-1 text-gray-500 hover:text-blue-500 transition-colors"
                whileTap={{ scale: 0.9 }}
              >
                <MessageCircle className="w-4 h-4" />
                <span className="text-xs">{post.comments}</span>
              </motion.button>
              <motion.button 
                className="flex items-center gap-1 text-gray-500 hover:text-green-500 transition-colors ml-auto"
                whileTap={{ scale: 0.9 }}
              >
                <Share2 className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        );
      })}

        {/* Linhas conectoras da roda */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {posts.map((_, index) => {
            const angle = (360 / posts.length) * index;
            const angleRad = (angle * Math.PI) / 180;
            const x = centerX + radius * Math.cos(angleRad - Math.PI / 2);
            const y = centerY + radius * Math.sin(angleRad - Math.PI / 2);
            
            return (
              <motion.line
                key={index}
                x1={centerX}
                y1={centerY}
                x2={x}
                y2={y}
                stroke="rgba(34, 197, 94, 0.3)"
                strokeWidth="2"
                strokeDasharray="10,5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: index * 0.1, duration: 1 }}
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
}