import { motion } from "motion/react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Avatar } from "./ui/avatar";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { 
  Share2,
  X,
  Send,
  Search,
  Check,
  Heart
} from "lucide-react";

interface Friend {
  id: number;
  name: string;
  avatar: string;
  isSelected: boolean;
}

interface RecommendToFriendProps {
  isOpen: boolean;
  onClose: () => void;
  itemTitle: string;
  itemType: "comunidade" | "forum" | "evento" | "canal" | "obra";
  itemDescription?: string;
}

const mockFriends: Friend[] = [
  {
    id: 1,
    name: "Ana Resistência",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b9c1cd17?w=100",
    isSelected: false
  },
  {
    id: 2,
    name: "João Solidário",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    isSelected: false
  },
  {
    id: 3,
    name: "Maria Liberdade",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    isSelected: false
  },
  {
    id: 4,
    name: "Carlos Coletivo",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
    isSelected: false
  },
  {
    id: 5,
    name: "Luiza Comunidade",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100",
    isSelected: false
  },
  {
    id: 6,
    name: "Roberto Reflexão",
    avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=100",
    isSelected: false
  }
];

export function RecommendToFriend({ 
  isOpen, 
  onClose, 
  itemTitle, 
  itemType, 
  itemDescription 
}: RecommendToFriendProps) {
  const [friends, setFriends] = useState<Friend[]>(mockFriends);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);

  const filteredFriends = friends.filter(friend =>
    friend.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedFriends = friends.filter(friend => friend.isSelected);

  const toggleFriendSelection = (friendId: number) => {
    setFriends(friends.map(friend =>
      friend.id === friendId
        ? { ...friend, isSelected: !friend.isSelected }
        : friend
    ));
  };

  const handleSend = async () => {
    if (selectedFriends.length === 0) return;
    
    setIsSending(true);
    
    // Simular envio
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSent(true);
    setIsSending(false);
    
    // Auto fechar após sucesso
    setTimeout(() => {
      onClose();
      setSent(false);
      setFriends(friends.map(friend => ({ ...friend, isSelected: false })));
      setMessage("");
      setSearchTerm("");
    }, 2000);
  };

  const getItemTypeLabel = (type: string) => {
    switch (type) {
      case "comunidade": return "comunidade";
      case "forum": return "fórum";
      case "evento": return "evento";
      case "canal": return "canal";
      case "obra": return "obra";
      default: return "item";
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-lg w-full max-w-md"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h3 className="font-bold flex items-center gap-2">
              <Share2 className="w-5 h-5 text-green-600" />
              Recomendar {getItemTypeLabel(itemType)}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Compartilhe "{itemTitle}" com seus amigos
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Conteúdo */}
        <div className="p-6">
          {!sent ? (
            <>
              {/* Busca de amigos */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar amigos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Lista de amigos */}
              <div className="max-h-60 overflow-y-auto mb-4">
                <div className="space-y-2">
                  {filteredFriends.map((friend) => (
                    <motion.div
                      key={friend.id}
                      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                        friend.isSelected
                          ? "bg-green-100 border border-green-300"
                          : "hover:bg-gray-50"
                      }`}
                      onClick={() => toggleFriendSelection(friend.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Avatar className="w-10 h-10">
                        <ImageWithFallback
                          src={friend.avatar}
                          alt={friend.name}
                          className="rounded-full object-cover"
                        />
                      </Avatar>
                      
                      <div className="flex-1">
                        <p className="font-medium">{friend.name}</p>
                      </div>
                      
                      {friend.isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                        >
                          <Check className="w-4 h-4 text-white" />
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Amigos selecionados */}
              {selectedFriends.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm font-medium mb-2">
                    Selecionados ({selectedFriends.length}):
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedFriends.map((friend) => (
                      <Badge
                        key={friend.id}
                        className="bg-green-100 text-green-700 flex items-center gap-1"
                      >
                        {friend.name}
                        <button
                          onClick={() => toggleFriendSelection(friend.id)}
                          className="ml-1 hover:bg-green-200 rounded-full p-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Mensagem personalizada */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Mensagem (opcional)
                </label>
                <Textarea
                  placeholder={`Oi! Achei que você ia gostar desta ${getItemTypeLabel(itemType)}...`}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                />
              </div>

              {/* Ações */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="flex-1"
                >
                  Cancelar
                </Button>
                
                <Button
                  onClick={handleSend}
                  disabled={selectedFriends.length === 0 || isSending}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  {isSending ? (
                    <motion.div
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Enviar
                    </>
                  )}
                </Button>
              </div>
            </>
          ) : (
            /* Confirmação de envio */
            <motion.div
              className="text-center py-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <motion.div
                className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <Check className="w-8 h-8 text-white" />
              </motion.div>
              
              <h4 className="font-bold text-green-700 mb-2">
                Recomendação enviada!
              </h4>
              
              <p className="text-gray-600 text-sm">
                Sua recomendação foi enviada para {selectedFriends.length} amigo
                {selectedFriends.length > 1 ? "s" : ""}
              </p>
              
              <div className="flex flex-wrap gap-1 justify-center mt-3">
                {selectedFriends.map((friend) => (
                  <div key={friend.id} className="flex items-center gap-1">
                    <Avatar className="w-6 h-6">
                      <ImageWithFallback
                        src={friend.avatar}
                        alt={friend.name}
                        className="rounded-full object-cover"
                      />
                    </Avatar>
                    <span className="text-xs text-gray-600">{friend.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}