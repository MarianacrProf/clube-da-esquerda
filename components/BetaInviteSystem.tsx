import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Copy, Share2, Users, Check, X, Gift, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { toast } from "sonner@2.0.3";

interface BetaInviteSystemProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
}

export function BetaInviteSystem({ isOpen, onClose, userName }: BetaInviteSystemProps) {
  const [copied, setCopied] = useState(false);
  const [inviteCount] = useState(12); // Número de pessoas que já convidou
  
  // Gera link único baseado no nome do usuário
  const inviteCode = btoa(userName).substring(0, 8).toUpperCase();
  const inviteLink = `https://clubedaesquerda.com.br/convite/${inviteCode}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    toast.success("Link copiado!", {
      description: "Cole o link onde quiser compartilhar"
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Convite para Clube da Esquerda",
          text: `${userName} te convidou para participar do Clube da Esquerda - Versão Beta! 🌟 Uma rede social democrática e brasileira para debates e cultura.`,
          url: inviteLink,
        });
        toast.success("Compartilhado com sucesso!");
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
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            {/* Modal */}
            <motion.div
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header com gradiente brasileiro */}
              <div className="bg-gradient-to-r from-green-500 via-yellow-400 to-red-500 p-6 relative overflow-hidden">
                <motion.div 
                  className="absolute inset-0 opacity-20"
                  animate={{ 
                    backgroundPosition: ["0% 0%", "100% 100%"],
                  }}
                  transition={{ 
                    duration: 20,
                    repeat: Infinity,
                    repeatType: "reverse" 
                  }}
                  style={{
                    backgroundImage: "linear-gradient(45deg, transparent 25%, rgba(255,255,255,.3) 25%, rgba(255,255,255,.3) 50%, transparent 50%, transparent 75%, rgba(255,255,255,.3) 75%)",
                    backgroundSize: "50px 50px"
                  }}
                />
                
                <div className="relative z-10">
                  <Button
                    onClick={onClose}
                    variant="ghost"
                    size="sm"
                    className="absolute top-0 right-0 text-white hover:bg-white/20"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                  
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-white text-2xl font-bold">Convide seus Amigos</h2>
                      <Badge className="bg-white/20 text-white border-0 mt-1">
                        <Gift className="w-3 h-3 mr-1" />
                        Versão Beta - Acesso Total Grátis
                      </Badge>
                    </div>
                  </div>
                  <p className="text-white/90 text-sm mt-3">
                    Você faz parte dos primeiros usuários do Clube da Esquerda! Compartilhe este momento histórico e convide pessoas que compartilham nossos valores.
                  </p>
                </div>
              </div>

              {/* Conteúdo */}
              <div className="p-6">
                {/* Estatísticas */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-green-700">{inviteCount}</p>
                        <p className="text-xs text-green-600">Amigos convidados</p>
                      </div>
                    </div>
                  </Card>
                  
                  <Card className="p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-yellow-700">Beta</p>
                        <p className="text-xs text-yellow-600">Acesso ilimitado</p>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Link de convite */}
                <div className="mb-6">
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Seu link exclusivo de convite
                  </label>
                  <div className="flex gap-2">
                    <Input
                      value={inviteLink}
                      readOnly
                      className="font-mono text-sm bg-gray-50"
                    />
                    <Button
                      onClick={handleCopyLink}
                      className={`min-w-[100px] transition-colors ${
                        copied 
                          ? "bg-green-500 hover:bg-green-600" 
                          : "bg-blue-500 hover:bg-blue-600"
                      }`}
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 mr-2" />
                          Copiado!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-2" />
                          Copiar
                        </>
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Código: <span className="font-mono font-bold text-green-600">{inviteCode}</span>
                  </p>
                </div>

                {/* Botões de compartilhamento */}
                <div className="mb-6">
                  <label className="text-sm font-medium text-gray-700 mb-3 block">
                    Compartilhe nas redes
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      onClick={handleShare}
                      className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Compartilhar
                    </Button>
                    <Button
                      onClick={() => {
                        const message = encodeURIComponent(
                          `🌟 ${userName} te convidou para o Clube da Esquerda!\n\n` +
                          `Uma rede social brasileira democrática para debates respeitosos e cultura.\n\n` +
                          `Acesso Beta GRÁTIS: ${inviteLink}`
                        );
                        window.open(`https://wa.me/?text=${message}`, '_blank');
                      }}
                      variant="outline"
                      className="border-green-500 text-green-600 hover:bg-green-50"
                    >
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      WhatsApp
                    </Button>
                  </div>
                </div>

                {/* Benefícios */}
                <Card className="bg-gradient-to-br from-red-50 to-yellow-50 border-red-200 p-4">
                  <h3 className="font-bold text-red-700 mb-3 flex items-center gap-2">
                    <Gift className="w-5 h-5" />
                    Benefícios do Acesso Beta
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <span><strong>Acesso total grátis</strong> a todos os recursos da plataforma</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <span>Participação em <strong>fóruns premium</strong> e mesas redondas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <span>Criação de <strong>comunidades ilimitadas</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <span>Badge exclusivo de <strong>Beta Tester</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <span>Convites ilimitados para trazer seus amigos</span>
                    </li>
                  </ul>
                </Card>

                {/* Mensagem de agradecimento */}
                <motion.div
                  className="mt-6 text-center p-4 bg-gradient-to-r from-green-100 via-yellow-100 to-red-100 rounded-lg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="text-sm text-gray-700">
                    <strong>Obrigado por fazer parte dessa jornada!</strong> 🎉
                    <br />
                    <span className="text-xs">
                      Você está ajudando a construir uma rede social mais democrática e brasileira.
                    </span>
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
