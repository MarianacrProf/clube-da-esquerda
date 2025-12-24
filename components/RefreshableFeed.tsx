import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar } from "./ui/avatar";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { CreatePostModal } from "./CreatePostModal";
import { 
  RefreshCw, 
  Heart, 
  MessageCircle, 
  Share2, 
  MoreHorizontal,
  ChevronUp,
  Zap,
  Plus,
  TrendingUp,
  Sparkles
} from "lucide-react";

interface Post {
  id: number;
  author: {
    name: string;
    avatar: string;
    badge?: string;
  };
  content: string;
  image?: string;
  images?: string[];
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  upvotes?: number;
  hasUpvoted?: boolean;
  isNew?: boolean;
}

const initialPosts: Post[] = [
  {
    id: 1,
    author: {
      name: "Ana Resistência",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b9c1cd17?w=100",
      badge: "🏳️‍🌈 LGBT+"
    },
    content: "Hoje participei de uma roda de conversa sobre educação pública. É inspirador ver tanta gente engajada na luta por direitos! Juntos somos mais fortes! ✊",
    image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=500",
    timestamp: "há 5 min",
    likes: 24,
    comments: 8,
    shares: 3,
    upvotes: 12
  },
  {
    id: 2,
    author: {
      name: "João Solidário",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
      badge: "🌱 Sustentabilidade"
    },
    content: "Organização comunitária é resistência! Ontem plantamos 50 mudas na periferia. Cada árvore é um ato de amor pelo futuro das nossas crianças. 🌳",
    timestamp: "há 15 min",
    likes: 42,
    comments: 12,
    shares: 7,
    upvotes: 45
  },
  {
    id: 3,
    author: {
      name: "Maria Liberdade",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
      badge: "📚 Educação"
    },
    content: "Acabei de sair de uma assembléia incrível! Decidimos criar um curso popular de direitos trabalhistas. A educação popular transforma! 📖✨",
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=500",
    timestamp: "há 2 min",
    likes: 18,
    comments: 5,
    shares: 2,
    upvotes: 67
  }
];

const newPosts: Post[] = [
  {
    id: 4,
    author: {
      name: "Carlos Coletivo",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
      badge: "✊ Movimento"
    },
    content: "🎵 Música nova do coletivo saiu! 'Roda da Resistência' - nossa homenagem a todos que lutam por um Brasil mais justo. Link nos comentários! 🎶",
    timestamp: "agora",
    likes: 67,
    comments: 23,
    shares: 15,
    upvotes: 89,
    isNew: true
  },
  {
    id: 5,
    author: {
      name: "Luiza Comunidade",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100",
      badge: "🏥 SUS"
    },
    content: "Mutirão de saúde mental na comunidade foi um sucesso! Mais de 200 pessoas atendidas. O cuidado coletivo salva vidas! 💚",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=500",
    timestamp: "há 1 min",
    likes: 89,
    comments: 31,
    shares: 12,
    upvotes: 102,
    isNew: true
  }
];

export function RefreshableFeed() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [hasNewPosts, setHasNewPosts] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showNewPostsButton, setShowNewPostsButton] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasNewPosts(true);
      setShowNewPostsButton(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const updatedPosts = [...newPosts, ...posts];
    setPosts(updatedPosts);
    setHasNewPosts(false);
    setShowNewPostsButton(false);
    setIsRefreshing(false);
  };

  const loadNewPosts = () => {
    const updatedPosts = [...newPosts.map(post => ({ ...post, isNew: false })), ...posts];
    setPosts(updatedPosts);
    setHasNewPosts(false);
    setShowNewPostsButton(false);
  };

  const handleUpvote = (postId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const hasUpvoted = post.hasUpvoted;
        return {
          ...post,
          upvotes: hasUpvoted ? (post.upvotes || 0) - 1 : (post.upvotes || 0) + 1,
          hasUpvoted: !hasUpvoted
        };
      }
      return post;
    }));
  };

  const handleCreatePost = (newPost: any) => {
    const post: Post = {
      id: Date.now(),
      author: {
        name: "Maria Silva",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b9c1cd17?w=100",
        badge: "⭐ Beta Tester"
      },
      content: newPost.text,
      image: newPost.images?.[0],
      images: newPost.images,
      timestamp: "agora",
      likes: 0,
      comments: 0,
      shares: 0,
      upvotes: 0,
      isNew: true
    };

    setPosts([post, ...posts]);
    setShowCreatePost(false);
  };

  const getTopPosts = () => {
    const sortedByUpvotes = [...posts].sort((a, b) => (b.upvotes || 0) - (a.upvotes || 0));
    return sortedByUpvotes.slice(0, 5);
  };

  const topPosts = getTopPosts();

  return (
    <div className="w-full mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-green-700">🌀 Roda Principal</h2>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Atualizando...' : 'Atualizar'}
          </Button>
          
          {hasNewPosts && (
            <Badge className="bg-green-100 text-green-700 animate-pulse">
              <Zap className="w-3 h-3 mr-1" />
              {newPosts.length} novos
            </Badge>
          )}
        </div>
      </div>

      {showNewPostsButton && (
        <motion.div
          className="sticky top-4 z-10 flex justify-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
        >
          <Button
            onClick={loadNewPosts}
            className="bg-green-600 hover:bg-green-700 shadow-lg rounded-full px-6 py-2 flex items-center gap-2"
          >
            <ChevronUp className="w-4 h-4" />
            Ver {newPosts.length} novas publicações
            <Zap className="w-4 h-4" />
          </Button>
        </motion.div>
      )}

      {/* BOTÃO FLUTUANTE CRIAR PUBLICAÇÃO */}
      <motion.button
        className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-gradient-to-r from-green-500 via-green-600 to-green-700 rounded-full shadow-2xl flex items-center justify-center text-white hover:scale-110 transition-transform group"
        onClick={() => setShowCreatePost(true)}
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
      >
        <Plus className="w-8 h-8" />
        <motion.div
          className="absolute inset-0 rounded-full bg-green-400"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
      </motion.button>

      <div className="space-y-6">
        {posts.map((post, index) => {
          const isTopPost = topPosts.includes(post);
          
          return (
            <motion.div
              key={`${post.id}-${index}`}
              initial={post.isNew ? { opacity: 0, y: -20, scale: 0.95 } : { opacity: 1 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.5,
                delay: post.isNew ? index * 0.1 : 0,
                type: "spring",
                stiffness: 100
              }}
              className={post.isNew ? "relative" : ""}
            >
              {post.isNew && (
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-lg opacity-75 blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.75 }}
                  transition={{ duration: 1 }}
                />
              )}
              
              <Card className={`p-6 relative ${post.isNew ? 'border-green-300 bg-green-50' : ''} ${isTopPost ? 'ring-2 ring-orange-400 shadow-xl' : ''}`}>
                {isTopPost && (
                  <motion.div
                    className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10"
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                  >
                    <Badge className="bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 text-white px-4 py-1 shadow-lg">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      <Sparkles className="w-3 h-3 mr-1" />
                      TOP POST - Últimos 20 min
                      <Sparkles className="w-3 h-3 ml-1" />
                    </Badge>
                  </motion.div>
                )}

                {post.isNew && (
                  <Badge className="absolute top-2 right-2 bg-green-500 text-white">
                    <Zap className="w-3 h-3 mr-1" />
                    Novo
                  </Badge>
                )}
                
                <div className="flex items-start gap-3 mb-4">
                  <Avatar className="w-12 h-12">
                    <ImageWithFallback
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="rounded-full object-cover"
                    />
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{post.author.name}</h4>
                      {post.author.badge && (
                        <Badge className="text-xs bg-red-100 text-red-700">
                          {post.author.badge}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{post.timestamp}</p>
                  </div>
                  
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="mb-4">
                  <p className="text-gray-800 leading-relaxed">{post.content}</p>
                  
                  {post.image && (
                    <div className="mt-3 rounded-lg overflow-hidden">
                      <ImageWithFallback
                        src={post.image}
                        alt="Post image"
                        className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                </div>
                
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-4">
                    {/* BOTÃO UP! COM ANIMAÇÃO */}
                    <motion.button
                      className={`flex items-center gap-1 px-4 py-2 rounded-full font-bold transition-all ${
                        post.hasUpvoted
                          ? 'bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 text-white shadow-lg scale-105'
                          : 'bg-gradient-to-r from-orange-200 via-red-200 to-pink-200 text-orange-700 hover:from-orange-300 hover:via-red-300 hover:to-pink-300'
                      }`}
                      onClick={() => handleUpvote(post.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.div
                        animate={post.hasUpvoted ? {
                          rotate: [0, -10, 10, -10, 0],
                          scale: [1, 1.2, 1]
                        } : {}}
                        transition={{ duration: 0.5 }}
                      >
                        {post.hasUpvoted ? '🔥' : '⬆️'}
                      </motion.div>
                      <span className="font-extrabold">UP!</span>
                      <span className="font-bold">{post.upvotes || 0}</span>
                      {post.hasUpvoted && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="text-xs"
                        >
                          ✨
                        </motion.div>
                      )}
                    </motion.button>
                    
                    <Button variant="ghost" size="sm" className="text-gray-600 hover:text-red-600">
                      <Heart className="w-4 h-4 mr-1" />
                      {post.likes}
                    </Button>
                    
                    <Button variant="ghost" size="sm" className="text-gray-600 hover:text-blue-600">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      {post.comments}
                    </Button>
                    
                    <Button variant="ghost" size="sm" className="text-gray-600 hover:text-green-600">
                      <Share2 className="w-4 h-4 mr-1" />
                      {post.shares}
                    </Button>
                  </div>
                  
                  <Badge variant="outline" className="text-xs">
                    #{index + 1}
                  </Badge>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="text-center py-8">
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500 via-yellow-400 to-red-500 rounded-full flex items-center justify-center">
          <div className="text-center text-white">
            <div className="font-bold text-xs">CLUBE</div>
            <div className="font-bold text-xs">ESQUERDA</div>
          </div>
        </div>
        <p className="text-gray-500">Você chegou ao fim da roda!</p>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleRefresh}
          className="mt-2"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Carregar mais posts
        </Button>
      </div>

      {/* MODAL CRIAR POST */}
      <CreatePostModal
        isOpen={showCreatePost}
        onClose={() => setShowCreatePost(false)}
        onCreatePost={handleCreatePost}
      />
    </div>
  );
}
