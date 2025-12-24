import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { X, Image, Smile } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreatePost: (post: { text: string; images?: string[] }) => void;
}

export function CreatePostModal({ isOpen, onClose, onCreatePost }: CreatePostModalProps) {
  const [text, setText] = useState("");
  const [images, setImages] = useState<string[]>([]);

  const handleSubmit = () => {
    if (text.trim()) {
      onCreatePost({ text, images });
      setText("");
      setImages([]);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl z-50 w-full max-w-2xl"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-red-600 bg-clip-text text-transparent">
                Criar Publicação
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="p-6">
              <Textarea
                placeholder="O que você está pensando? Compartilhe com a roda..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="min-h-[150px] text-lg border-gray-300 focus:border-green-500 focus:ring-green-500 resize-none"
              />

              <div className="flex items-center justify-between mt-6">
                <div className="flex items-center gap-3">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Image className="w-4 h-4" />
                    Foto
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Smile className="w-4 h-4" />
                    Emoji
                  </Button>
                </div>

                <Button
                  onClick={handleSubmit}
                  disabled={!text.trim()}
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8"
                >
                  Publicar
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
