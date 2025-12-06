import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, PartyPopper, Share2, Copy, Check } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "sonner@2.0.3";

interface EventParticipationModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventName: string;
  eventImage: string;
  eventDate: string;
}

export function EventParticipationModal({ 
  isOpen, 
  onClose, 
  eventName, 
  eventImage,
  eventDate 
}: EventParticipationModalProps) {
  const [copied, setCopied] = useState(false);
  
  const inviteLink = `https://clubedaesquerda.com.br/evento/${btoa(eventName).substring(0, 10)}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    toast.success("Link copiado!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Evento: ${eventName}`,
          text: `Vou participar do evento "${eventName}" no Clube da Esquerda! Vem comigo! 🎉`,
          url: inviteLink,
        });
      } catch (err) {
        console.log("Erro ao compartilhar:", err);
      }
    } else {
      handleCopyLink();
    }
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
              initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.5, opacity: 0, rotate: 10 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Confetti Background */}
              <div className="relative bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 p-8 overflow-hidden">
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    backgroundPosition: ["0% 0%", "100% 100%"],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  style={{
                    backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.3) 2px, transparent 2px)",
                    backgroundSize: "30px 30px"
                  }}
                />
                
                <Button
                  onClick={onClose}
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 text-white hover:bg-white/20 z-10"
                >
                  <X className="w-5 h-5" />
                </Button>

                <motion.div
                  className="text-center relative z-10"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.div
                    animate={{
                      rotate: [0, 10, -10, 10, 0],
                      scale: [1, 1.1, 1, 1.1, 1]
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      repeatDelay: 2
                    }}
                  >
                    <PartyPopper className="w-16 h-16 mx-auto mb-4 text-white" />
                  </motion.div>
                  
                  <h2 className="text-3xl font-bold text-white mb-2">
                    Parabéns!
                  </h2>
                  <p className="text-white/90 text-lg">
                    Você confirmou presença!
                  </p>
                </motion.div>
              </div>

              {/* Event Info */}
              <div className="p-6">
                <div className="mb-6">
                  <div className="aspect-video rounded-lg overflow-hidden mb-4">
                    <img src={eventImage} alt={eventName} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-bold text-lg mb-1">{eventName}</h3>
                  <p className="text-sm text-gray-600">📅 {eventDate}</p>
                </div>

                <div className="space-y-3">
                  <p className="text-center font-medium text-gray-700">
                    Convide seus amigos para participar!
                  </p>

                  {/* Link */}
                  <div className="flex gap-2">
                    <Input
                      value={inviteLink}
                      readOnly
                      className="font-mono text-sm bg-gray-50"
                    />
                    <Button
                      onClick={handleCopyLink}
                      className={copied ? "bg-green-500 hover:bg-green-600" : ""}
                    >
                      {copied ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>

                  {/* Share Buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      onClick={handleShare}
                      className="bg-gradient-to-r from-green-500 to-green-600"
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Compartilhar
                    </Button>
                    <Button
                      onClick={() => {
                        const message = encodeURIComponent(
                          `🎉 Vou participar do evento "${eventName}" em ${eventDate}!\n\n` +
                          `Vem comigo! ${inviteLink}`
                        );
                        window.open(`https://wa.me/?text=${message}`, '_blank');
                      }}
                      variant="outline"
                      className="border-green-500 text-green-600"
                    >
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      WhatsApp
                    </Button>
                  </div>
                </div>

                <motion.div
                  className="mt-6 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <p className="text-sm text-gray-700">
                    <strong>Dica:</strong> Compartilhe nas suas redes sociais e traga mais pessoas para essa experiência! 🎊
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
