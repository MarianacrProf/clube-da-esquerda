import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Image, Video, Link as LinkIcon, Smile, Music, Gift, ArrowRight, Upload } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { toast } from "sonner@2.0.3";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreatePost: (post: any) => void;
}

export function CreatePostModal({ isOpen, onClose, onCreatePost }: CreatePostModalProps) {
  const [text, setText] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [videoUrl, setVideoUrl] = useState("");
  const [externalLink, setExternalLink] = useState("");
  const [embedUrl, setEmbedUrl] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const emojis = ["😊", "❤️", "✊", "🌹", "⚡", "🔥", "👏", "💪", "🎉", "🌟", "✨", "💚", "💛", "❤️", "🏳️‍🌈", "✊🏿"];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && images.length < 3) {
      // Simulação - em produção, faria upload real
      const newImages = Array.from(files).slice(0, 3 - images.length).map(file => URL.createObjectURL(file));
      setImages([...images, ...newImages]);
    }
  };

  const handleSubmit = () => {
    if (!text && images.length === 0 && !videoUrl && !externalLink) {
      toast.error("Adicione algum conteúdo à sua publicação");
      return;
    }

    const post = {
      id: Date.now(),
      text,
      images,
      videoUrl,
      externalLink,
      embedUrl,
      author: "Maria Silva",
      timestamp: new Date(),
      upvotes: 0,
      comments: 0,
      shares: 0
    };

    onCreatePost(post);
    toast.success("Publicação criada com sucesso!");
    onClose();
    
    // Reset
    setText("");
    setImages([]);
    setVideoUrl("");
    setExternalLink("");
    setEmbedUrl("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between z-10">
                <h2 className="text-xl font-bold">Criar Publicação</h2>
                <Button onClick={onClose} variant="ghost" size="sm">
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Text Area */}
                <Textarea
                  placeholder="O que você está pensando?"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="min-h-[120px] text-base"
                  maxLength={5000}
                />
                <div className="text-xs text-gray-500 text-right">
                  {text.length}/5000 caracteres
                </div>

                {/* Images Preview */}
                {images.length > 0 && (
                  <div className="grid grid-cols-3 gap-2">
                    {images.map((img, idx) => (
                      <div key={idx} className="relative aspect-square rounded-lg overflow-hidden">
                        <img src={img} alt={`Upload ${idx + 1}`} className="w-full h-full object-cover" />
                        <button
                          onClick={() => setImages(images.filter((_, i) => i !== idx))}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Action Buttons */}
                <Card className="p-4">
                  <p className="text-sm font-medium mb-3">Adicionar à publicação:</p>
                  <div className="grid grid-cols-3 gap-2">
                    {/* Image Upload */}
                    <label className="flex flex-col items-center gap-1 p-3 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      <Image className="w-5 h-5 text-green-600" />
                      <span className="text-xs">Imagens</span>
                      <span className="text-xs text-gray-500">({images.length}/3)</span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="hidden"
                        disabled={images.length >= 3}
                      />
                    </label>

                    {/* Video */}
                    <div 
                      className="flex flex-col items-center gap-1 p-3 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => {
                        const url = prompt("Cole a URL do vídeo (máx. 1 min):");
                        if (url) setVideoUrl(url);
                      }}
                    >
                      <Video className="w-5 h-5 text-blue-600" />
                      <span className="text-xs">Vídeo</span>
                      <span className="text-xs text-gray-500">(máx. 1min)</span>
                    </div>

                    {/* External Link */}
                    <div 
                      className="flex flex-col items-center gap-1 p-3 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => {
                        const url = prompt("Cole o link externo:");
                        if (url) setExternalLink(url);
                      }}
                    >
                      <LinkIcon className="w-5 h-5 text-purple-600" />
                      <span className="text-xs">Link</span>
                    </div>

                    {/* Emoji */}
                    <div 
                      className="flex flex-col items-center gap-1 p-3 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    >
                      <Smile className="w-5 h-5 text-yellow-600" />
                      <span className="text-xs">Emojis</span>
                    </div>

                    {/* GIF */}
                    <div 
                      className="flex flex-col items-center gap-1 p-3 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => toast.info("Buscar GIFs - em breve!")}
                    >
                      <Gift className="w-5 h-5 text-pink-600" />
                      <span className="text-xs">GIF</span>
                    </div>

                    {/* Music/Video Embed */}
                    <div 
                      className="flex flex-col items-center gap-1 p-3 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => {
                        const url = prompt("Cole o link do Spotify, YouTube, etc:");
                        if (url) setEmbedUrl(url);
                      }}
                    >
                      <Music className="w-5 h-5 text-red-600" />
                      <span className="text-xs">Música</span>
                    </div>
                  </div>
                </Card>

                {/* Emoji Picker */}
                {showEmojiPicker && (
                  <Card className="p-3">
                    <div className="flex flex-wrap gap-2">
                      {emojis.map((emoji, idx) => (
                        <button
                          key={idx}
                          className="text-2xl hover:scale-125 transition-transform"
                          onClick={() => {
                            setText(text + emoji);
                            setShowEmojiPicker(false);
                          }}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </Card>
                )}

                {/* Video URL Preview */}
                {videoUrl && (
                  <Card className="p-3 bg-blue-50 border-blue-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Video className="w-4 h-4 text-blue-600" />
                        <span className="text-sm">Vídeo adicionado</span>
                      </div>
                      <Button onClick={() => setVideoUrl("")} variant="ghost" size="sm">
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </Card>
                )}

                {/* External Link Preview */}
                {externalLink && (
                  <Card className="p-3 bg-purple-50 border-purple-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <LinkIcon className="w-4 h-4 text-purple-600" />
                        <span className="text-sm truncate">{externalLink}</span>
                      </div>
                      <Button onClick={() => setExternalLink("")} variant="ghost" size="sm">
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </Card>
                )}

                {/* Embed Preview */}
                {embedUrl && (
                  <Card className="p-3 bg-red-50 border-red-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Music className="w-4 h-4 text-red-600" />
                        <span className="text-sm truncate">{embedUrl}</span>
                      </div>
                      <Button onClick={() => setEmbedUrl("")} variant="ghost" size="sm">
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </Card>
                )}
              </div>

              {/* Footer */}
              <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 flex justify-end gap-2">
                <Button onClick={onClose} variant="outline">
                  Cancelar
                </Button>
                <Button 
                  onClick={handleSubmit}
                  className="bg-gradient-to-r from-green-600 via-yellow-500 to-red-600 text-white"
                >
                  Publicar
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
