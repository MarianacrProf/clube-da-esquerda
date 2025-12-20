import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Copy, Check, Share2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "sonner@2.0.3";

interface SharePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  postContent: string;
  postAuthor: string;
  postImage?: string;
}

export function SharePostModal({ 
  isOpen, 
  onClose, 
  postContent,
  postAuthor,
  postImage 
}: SharePostModalProps) {
  const [copied, setCopied] = useState(false);
  
  const shareLink = `https://clubedaesquerda.com.br/post/${Date.now()}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    toast.success("Link copiado!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async (platform: string) => {
    const text = `"${postContent.substring(0, 100)}..." - ${postAuthor} no Clube da Esquerda`;
    
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareLink)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareLink)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + '\n' + shareLink)}`,
      telegram: `https://t.me/share/url?url=${encodeURIComponent(shareLink)}&text=${encodeURIComponent(text)}`
    };

    window.open(urls[platform], '_blank', 'width=600,height=400');
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
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-green-500 via-yellow-400 to-red-500 text-white p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Share2 className="w-5 h-5" />
                  <h3 className="font-bold">Compartilhar Publicação</h3>
                </div>
                <Button onClick={onClose} variant="ghost" size="sm" className="text-white hover:bg-white/20">
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Post Preview */}
                {postImage && (
                  <div className="aspect-video rounded-lg overflow-hidden mb-2">
                    <img src={postImage} alt="Post" className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-700 line-clamp-3">{postContent}</p>
                  <p className="text-xs text-gray-500 mt-2">Por {postAuthor}</p>
                </div>

                {/* Link */}
                <div>
                  <label className="block text-sm font-medium mb-2">Link para compartilhar:</label>
                  <div className="flex gap-2">
                    <Input
                      value={shareLink}
                      readOnly
                      className="font-mono text-xs bg-gray-50"
                    />
                    <Button
                      onClick={handleCopyLink}
                      className={copied ? "bg-green-500 hover:bg-green-600" : ""}
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                {/* Social Buttons */}
                <div>
                  <label className="block text-sm font-medium mb-3">Compartilhar em:</label>
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      onClick={() => handleShare('whatsapp')}
                      className="bg-green-500 hover:bg-green-600 text-white"
                    >
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      WhatsApp
                    </Button>

                    <Button
                      onClick={() => handleShare('twitter')}
                      className="bg-blue-400 hover:bg-blue-500 text-white"
                    >
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                      </svg>
                      Twitter
                    </Button>

                    <Button
                      onClick={() => handleShare('facebook')}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                      </svg>
                      Facebook
                    </Button>

                    <Button
                      onClick={() => handleShare('telegram')}
                      className="bg-blue-500 hover:bg-blue-600 text-white"
                    >
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                      </svg>
                      Telegram
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
