import { motion } from "motion/react";
import { useState } from "react";
import { ChevronLeft, ChevronRight, MessageSquare, MessageCircle, UserPlus, Heart, Edit, Sparkles, Users, Share2, Flag, AlertTriangle } from "lucide-react";
import { Avatar } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Textarea } from "./ui/textarea";

interface ProfileData {
  name: string;
  bio: string;
  photos: string[];
  aiAvatar: string;
  politicalBadges: string[];
  interests: string[];
  testimonials: Testimonial[];
  isOnline: boolean;
}

interface Testimonial {
  id: number;
  author: string;
  content: string;
  avatar: string;
  likes: number;
}

const mockProfile: ProfileData = {
  name: "Mariana Oliveira",
  bio: "Educadora popular, militante dos direitos humanos e defensora da educação pública. Acredito que juntos podemos construir um Brasil mais justo e igualitário.",
  photos: [
    "https://images.unsplash.com/photo-1494790108755-2616b9c1cd17?w=300",
    "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=300",
    "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=300"
  ],
  aiAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300",
  politicalBadges: ["🏳️‍🌈 LGBT+", "📚 Educação Pública", "⚕️ SUS", "🌱 Sustentabilidade", "✊ PSOL"],
  interests: ["Música Brasileira", "Literatura", "Filosofia Política", "Educação"],
  testimonials: [
    {
      id: 1,
      author: "Carlos Santos",
      content: "Mariana é uma pessoa incrível, sempre disposta a ajudar e lutar pelos direitos de todos. Uma verdadeira companheira de luta!",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
      likes: 12
    },
    {
      id: 2,
      author: "Ana Costa",
      content: "Conheci Mari na universidade e desde então admiro sua dedicação à educação popular. Uma inspiração!",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
      likes: 8
    }
  ],
  isOnline: true
};

interface UserProfileProps {
  onShowFriends?: () => void;
  isInstitution?: boolean;
  onShowAnalytics?: () => void;
}

export function UserProfile({ onShowFriends, isInstitution = false, onShowAnalytics }: UserProfileProps = {}) {
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [showAIAvatar, setShowAIAvatar] = useState(false);
  
  // Estado com persistência no localStorage
  const [isInterested, setIsInterested] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('isInterested') === 'true';
    }
    return false;
  });
  
  const [isFan, setIsFan] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('isFan') === 'true';
    }
    return false;
  });
  
  const [fanCount, setFanCount] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('fanCount');
      return saved ? parseInt(saved) : 1247;
    }
    return 1247;
  });
  
  const [showMutualMatch, setShowMutualMatch] = useState(false);
  const [showTestimonialForm, setShowTestimonialForm] = useState(false);
  const [newTestimonial, setNewTestimonial] = useState("");
  const [testimonialLikes, setTestimonialLikes] = useState<{[key: number]: boolean}>({});
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [reportDetails, setReportDetails] = useState("");
  const profile = mockProfile;

  const nextPhoto = () => {
    if (showAIAvatar) {
      setShowAIAvatar(false);
      setCurrentPhoto(0);
    } else {
      setCurrentPhoto((prev) => (prev + 1) % profile.photos.length);
      if (currentPhoto === profile.photos.length - 1) {
        setShowAIAvatar(true);
      }
    }
  };

  const prevPhoto = () => {
    if (showAIAvatar) {
      setShowAIAvatar(false);
      setCurrentPhoto(profile.photos.length - 1);
    } else if (currentPhoto === 0) {
      setShowAIAvatar(true);
    } else {
      setCurrentPhoto(prev => prev - 1);
    }
  };

  const handleInterestClick = () => {
    const newValue = !isInterested;
    setIsInterested(newValue);
    if (typeof window !== 'undefined') {
      localStorage.setItem('isInterested', String(newValue));
    }
    // Simular interesse mútuo (em produção viria do backend)
    if (newValue) {
      setTimeout(() => {
        setShowMutualMatch(true);
      }, 1000);
    }
  };

  const handleFanClick = () => {
    const newFanState = !isFan;
    setIsFan(newFanState);
    const newCount = newFanState ? fanCount + 1 : fanCount - 1;
    setFanCount(newCount);
    
    // Salvar no localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('isFan', String(newFanState));
      localStorage.setItem('fanCount', String(newCount));
    }
    
    // Simular sincronização com backend
    console.log('Sincronizando contador de fãs:', newCount);
  };

  const toggleTestimonialLike = (testimonialId: number) => {
    setTestimonialLikes(prev => ({
      ...prev,
      [testimonialId]: !prev[testimonialId]
    }));
  };

  const submitTestimonial = () => {
    if (newTestimonial.trim()) {
      // Aqui seria enviado para o backend
      console.log("Novo depoimento:", newTestimonial);
      setNewTestimonial("");
      setShowTestimonialForm(false);
    }
  };

  const submitReport = () => {
    if (reportReason && reportDetails.trim()) {
      // Aqui seria enviado para o backend/moderação
      console.log("Denúncia:", { reason: reportReason, details: reportDetails });
      setReportReason("");
      setReportDetails("");
      setShowReportDialog(false);
      alert("Denúncia enviada com sucesso. Nossa equipe de moderação irá revisar.");
    }
  };

  return (
    <div className="w-full p-6 space-y-6 relative">
      {/* Header do perfil */}
      <Card className="p-6 bg-gradient-to-br from-green-50 via-yellow-50 to-red-50">
        <div className="flex items-start gap-6">
          {/* Carrossel de fotos */}
          <div className="relative">
            <motion.div 
              className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg relative"
              whileHover={{ scale: 1.05 }}
            >
              <ImageWithFallback
                src={showAIAvatar ? profile.aiAvatar : profile.photos[currentPhoto]}
                alt={profile.name}
                className="w-full h-full object-cover"
              />
              {showAIAvatar && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-purple-500 to-transparent p-1">
                  <span className="text-white text-xs font-bold">IA</span>
                </div>
              )}
              {profile.isOnline && (
                <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              )}
            </motion.div>
            
            {/* Controles do carrossel */}
            <button 
              onClick={prevPhoto}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={nextPhoto}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Informações básicas */}
          <div className="flex-1">
            <h1 className="mb-2">{profile.name}</h1>
            <p className="text-gray-600 mb-4 leading-relaxed">{profile.bio}</p>
            
            {/* Badges políticas */}
            <div className="flex flex-wrap gap-2 mb-4">
              {profile.politicalBadges.map((badge, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Badge className="bg-red-100 text-red-700 hover:bg-red-200 transition-colors">
                    {badge}
                  </Badge>
                </motion.div>
              ))}
            </div>

            {/* Ações */}
            <div className="flex gap-3 flex-wrap">
              <Button className="bg-green-600 hover:bg-green-700">
                <UserPlus className="w-4 h-4 mr-2" />
                Conectar
              </Button>
              <Button 
                variant="outline" 
                className="text-orange-600 border-orange-600 hover:bg-orange-50"
                onClick={onShowFriends}
              >
                <Users className="w-4 h-4 mr-2" />
                Migues
              </Button>
              {isInstitution ? (
                <Button
                  variant={isFan ? "default" : "outline"}
                  onClick={handleFanClick}
                  className={isFan ? "bg-purple-500 hover:bg-purple-600" : "text-purple-600 border-purple-600"}
                >
                  <Heart className={`w-4 h-4 mr-2 ${isFan ? "fill-current" : ""}`} />
                  {isFan ? "Fã!" : "Sou fã"}
                  <Badge className="ml-2 bg-white text-purple-600">
                    {fanCount.toLocaleString()}
                  </Badge>
                </Button>
              ) : (
                <Button
                  variant={isInterested ? "default" : "outline"}
                  onClick={handleInterestClick}
                  className={isInterested ? "bg-red-500 hover:bg-red-600" : ""}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  {isInterested ? "Interessado!" : "Interesse"}
                </Button>
              )}
              <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                <MessageCircle className="w-4 h-4 mr-2" />
                Conversar
              </Button>
              <Button variant="outline" className="text-purple-600 border-purple-600 hover:bg-purple-50">
                <Share2 className="w-4 h-4 mr-2" />
                Compartilhar
              </Button>
              {isInstitution && onShowAnalytics && (
                <Button 
                  variant="outline" 
                  className="text-green-600 border-green-600 hover:bg-green-50"
                  onClick={onShowAnalytics}
                >
                  📊 Analytics
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Botões 3D de interesses */}
      <Card className="p-6">
        <h2 className="mb-4">Interesses e Comunidades</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {profile.interests.map((interest, index) => (
            <motion.button
              key={interest}
              className="relative p-4 bg-gradient-to-br from-yellow-400 via-orange-400 to-red-500 rounded-xl text-white shadow-lg hover:shadow-xl transform transition-all duration-300"
              whileHover={{ 
                scale: 1.05, 
                rotateY: 10,
                rotateX: 5,
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              style={{
                transformStyle: "preserve-3d",
                background: `linear-gradient(135deg, 
                  hsl(${45 + index * 30}, 70%, 60%) 0%, 
                  hsl(${15 + index * 30}, 80%, 50%) 100%)`
              }}
            >
              <div className="font-medium text-sm">{interest}</div>
              <div className="absolute inset-0 bg-white opacity-0 hover:opacity-20 transition-opacity rounded-xl"></div>
            </motion.button>
          ))}
        </div>
      </Card>

      {/* Depoimentos */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2>Depoimentos de Companheiros</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowTestimonialForm(!showTestimonialForm)}
          >
            <Edit className="w-4 h-4 mr-2" />
            Deixar Depoimento
          </Button>
        </div>

        {/* Formulário de novo depoimento */}
        {showTestimonialForm && (
          <motion.div
            className="mb-6 p-4 bg-blue-50 rounded-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
          >
            <textarea
              placeholder="Escreva seu depoimento sobre esta pessoa..."
              value={newTestimonial}
              onChange={(e) => setNewTestimonial(e.target.value)}
              className="w-full p-3 border rounded-lg resize-none"
              rows={3}
            />
            <div className="flex gap-2 mt-3">
              <Button size="sm" onClick={submitTestimonial}>
                Publicar
              </Button>
              <Button size="sm" variant="outline" onClick={() => setShowTestimonialForm(false)}>
                Cancelar
              </Button>
            </div>
          </motion.div>
        )}

        <div className="space-y-4">
          {profile.testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="flex gap-4 p-4 bg-gray-50 rounded-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <Avatar className="w-12 h-12">
                <ImageWithFallback 
                  src={testimonial.avatar} 
                  alt={testimonial.author}
                  className="rounded-full object-cover"
                />
              </Avatar>
              <div className="flex-1">
                <h4 className="font-medium mb-1">{testimonial.author}</h4>
                <p className="text-gray-600 text-sm leading-relaxed mb-2">{testimonial.content}</p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleTestimonialLike(testimonial.id)}
                    className={`flex items-center gap-1 text-sm transition-colors ${
                      testimonialLikes[testimonial.id] 
                        ? "text-red-500" 
                        : "text-gray-500 hover:text-red-500"
                    }`}
                  >
                    <Heart 
                      className={`w-4 h-4 ${
                        testimonialLikes[testimonial.id] ? "fill-current" : ""
                      }`} 
                    />
                    <span>
                      {testimonial.likes + (testimonialLikes[testimonial.id] ? 1 : 0)}
                    </span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Comunidades do usuário - bolas flutuantes */}
      <div className="mb-8">
        <h2 className="mb-6 text-center">Comunidades</h2>
        <div className="relative min-h-32 bg-gradient-to-br from-green-50 via-yellow-50 to-red-50 rounded-lg p-6 overflow-hidden">
          {[
            { name: "Filosofia Política", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100", color: "from-purple-400 to-blue-500", x: 15, y: 20 },
            { name: "Educação Popular", image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=100", color: "from-green-400 to-blue-500", x: 60, y: 10 },
            { name: "Música Brasileira", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100", color: "from-red-400 to-yellow-500", x: 25, y: 65 },
            { name: "Sustentabilidade", image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=100", color: "from-green-400 to-emerald-500", x: 75, y: 55 },
            { name: "Saúde Mental", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=100", color: "from-pink-400 to-purple-500", x: 45, y: 40 },
          ].map((community, index) => (
            <motion.div
              key={community.name}
              className="absolute cursor-pointer group"
              style={{ 
                left: `${community.x}%`, 
                top: `${community.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                y: [0, -8, 0],
                rotate: [0, 2, -2, 0]
              }}
              transition={{
                opacity: { delay: index * 0.2 },
                scale: { delay: index * 0.2 },
                y: {
                  duration: 3 + index * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                },
                rotate: {
                  duration: 4 + index * 0.3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              whileHover={{ scale: 1.2, y: -10 }}
            >
              <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${community.color} p-0.5 shadow-lg`}>
                <div className="w-full h-full rounded-full overflow-hidden border-2 border-white">
                  <ImageWithFallback
                    src={community.image}
                    alt={community.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* Nome sobre a imagem no hover */}
              <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <span className="text-white text-xs font-medium text-center px-2">
                  {community.name}
                </span>
              </div>
              
              {/* Efeito de ondas ao redor */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-white/50"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 0, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.4
                }}
              />
            </motion.div>
          ))}
          
          {/* Elementos decorativos de fundo */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white/20 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}
                animate={{
                  scale: [0.5, 1, 0.5],
                  opacity: [0.3, 0.7, 0.3]
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Patches Conquistados */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="flex items-center gap-2">
              <span>🏆</span>
              Patches Conquistados
            </h2>
            <p className="text-sm text-gray-600">Desbloqueados por participar de 3+ comunidades do mesmo tema</p>
          </div>
        </div>
        
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {[
            { 
              name: "Música Brasileira", 
              symbol: "🪘", 
              communities: 4,
              color: "from-amber-400 to-yellow-600",
              description: "Mestre da Música"
            },
            { 
              name: "Literatura", 
              symbol: "📖", 
              communities: 3,
              color: "from-purple-400 to-indigo-600",
              description: "Poeta da Resistência"
            },
            { 
              name: "Filosofia Política", 
              symbol: "⚡", 
              communities: 5,
              color: "from-yellow-400 to-orange-600",
              description: "Pensador Revolucionário"
            }
          ].map((patch, index) => (
            <motion.div
              key={patch.name}
              className="relative group cursor-pointer"
              initial={{ opacity: 0, scale: 0, rotateY: 180 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              {/* Patch 3D */}
              <div className={`relative w-20 h-20 mx-auto rounded-full bg-gradient-to-br ${patch.color} border-2 border-white shadow-lg flex items-center justify-center transform-gpu`}>
                <div className="text-2xl">{patch.symbol}</div>
                
                {/* Brilho dourado */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-300/30 to-transparent"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Contador de comunidades */}
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold border-2 border-white">
                  {patch.communities}
                </div>
              </div>
              
              {/* Nome do patch */}
              <h4 className="text-xs font-medium text-center mt-2 px-1 truncate">
                {patch.name}
              </h4>
              
              {/* Tooltip com descrição */}
              <motion.div
                className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap"
                initial={{ opacity: 0, y: 10 }}
                whileHover={{ opacity: 1, y: 0 }}
              >
                {patch.description}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-black"></div>
              </motion.div>
            </motion.div>
          ))}
          
          {/* Slot para próximo patch */}
          <motion.div
            className="w-20 h-20 mx-auto rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 0.8 }}
          >
            <div className="text-gray-400 text-2xl">+</div>
          </motion.div>
        </div>
        
        {/* Progresso para próximo patch */}
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Próximo patch: Educação Pública 📚</span>
            <span className="text-xs text-gray-600">2/3 comunidades</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "66%" }}
              transition={{ delay: 1, duration: 1 }}
            />
          </div>
          <p className="text-xs text-gray-600 mt-1">
            Participe de mais 1 comunidade de educação para conquistar este patch!
          </p>
        </div>
      </Card>

      {/* Pop-up de interesse mútuo */}
      {showMutualMatch && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="bg-gradient-to-br from-green-500 via-yellow-400 to-red-500 p-8 rounded-2xl text-white text-center max-w-md mx-4"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", duration: 0.8 }}
          >
            <motion.div
              className="text-6xl mb-4"
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1, 1.1, 1]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              🎉🥁🎊
            </motion.div>
            
            <h2 className="text-2xl font-bold mb-4">É um Match!</h2>
            <p className="mb-6">
              Vocês demonstraram interesse mútuo! 
              Que tal começar uma conversa na roda?
            </p>
            
            <div className="flex gap-3 justify-center">
              <Button className="bg-white text-green-600 hover:bg-gray-100">
                <MessageSquare className="w-4 h-4 mr-2" />
                Conversar Agora
              </Button>
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-green-600"
                onClick={() => setShowMutualMatch(false)}
              >
                Depois
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Botão discreto de denúncia - canto inferior direito */}
      <motion.div
        className="fixed bottom-24 right-8"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.button
          onClick={() => setShowReportDialog(true)}
          className="w-12 h-12 bg-red-100 hover:bg-red-200 rounded-lg shadow-lg flex items-center justify-center group transition-all relative"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          title="Denunciar violação dos termos"
        >
          <AlertTriangle className="w-5 h-5 text-red-600" />
          <span className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-gray-600 to-gray-800 rounded text-white text-xs flex items-center justify-center shadow-md">
            👹
          </span>
          
          {/* Tooltip */}
          <span className="absolute right-full mr-3 px-3 py-2 bg-gray-800 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Denunciar troll ou violação
          </span>
        </motion.button>
      </motion.div>

      {/* Dialog de Denúncia */}
      <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              Denunciar Violação
            </DialogTitle>
            <DialogDescription>
              Use este recurso para reportar conteúdo que viole os Termos de Uso, 
              desrespeite os Direitos Humanos ou infrinja as leis.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Motivo da denúncia
              </label>
              <select
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Selecione um motivo</option>
                <option value="hate_speech">Discurso de ódio</option>
                <option value="discrimination">Discriminação</option>
                <option value="human_rights">Violação de Direitos Humanos</option>
                <option value="harassment">Assédio ou intimidação</option>
                <option value="fake_news">Desinformação / Fake News</option>
                <option value="violence">Incitação à violência</option>
                <option value="illegal">Conteúdo ilegal</option>
                <option value="terms">Violação dos Termos de Uso</option>
                <option value="spam">Spam ou comportamento troll</option>
                <option value="other">Outro</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Detalhes da denúncia
              </label>
              <Textarea
                placeholder="Descreva o que aconteceu e forneça contexto..."
                value={reportDetails}
                onChange={(e) => setReportDetails(e.target.value)}
                rows={4}
                className="resize-none"
              />
              <p className="text-xs text-gray-500 mt-1">
                Denúncias falsas podem resultar em ação disciplinar
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded p-3">
              <p className="text-xs text-blue-800">
                <strong>Proteção de Denunciantes:</strong> Sua identidade será mantida 
                em sigilo. Nossa equipe de moderação revisará este caso seguindo nossos 
                princípios de respeito, democracia e direitos humanos.
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowReportDialog(false)}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                onClick={submitReport}
                disabled={!reportReason || !reportDetails.trim()}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
              >
                Enviar Denúncia
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}