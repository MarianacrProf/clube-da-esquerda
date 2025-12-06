import { motion } from "motion/react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { 
  X,
  Upload,
  Image,
  Check
} from "lucide-react";

interface CreateCommunityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (community: { name: string; description: string; cover: string }) => void;
}

export function CreateCommunityModal({ isOpen, onClose, onCreate }: CreateCommunityModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [cover, setCover] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [created, setCreated] = useState(false);

  const defaultCovers = [
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500",
    "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=500",
    "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500",
    "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=500",
    "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=500",
    "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=500"
  ];

  const handleCreate = async () => {
    if (!name.trim() || !description.trim() || !cover) return;
    
    setIsCreating(true);
    
    // Simular criação
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setCreated(true);
    setIsCreating(false);
    
    // Passar dados para o componente pai
    onCreate({ name, description, cover });
    
    // Auto fechar após sucesso
    setTimeout(() => {
      onClose();
      setCreated(false);
      setName("");
      setDescription("");
      setCover("");
    }, 2000);
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
        className="bg-white rounded-lg w-full max-w-2xl"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="text-xl font-bold text-green-700">
            🌟 Criar Nova Comunidade
          </h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Conteúdo */}
        <div className="p-6">
          {!created ? (
            <>
              {/* Nome da Comunidade */}
              <div className="mb-6">
                <label className="block mb-2 font-medium">Nome da Comunidade</label>
                <Input
                  placeholder="Ex: Filosofia Política, Música Brasileira..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="text-lg"
                />
              </div>

              {/* Descrição */}
              <div className="mb-6">
                <label className="block mb-2 font-medium">Descrição</label>
                <Textarea
                  placeholder="Descreva o propósito da sua comunidade..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                />
              </div>

              {/* Seleção de Capa */}
              <div className="mb-6">
                <label className="block mb-2 font-medium">Imagem de Capa</label>
                
                {/* Upload personalizado */}
                <div className="mb-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-1">Clique para fazer upload</p>
                    <p className="text-xs text-gray-500">PNG, JPG até 5MB</p>
                  </div>
                </div>

                {/* Opções pré-definidas */}
                <div className="mb-4">
                  <p className="text-sm font-medium mb-3">Ou escolha uma das opções:</p>
                  <div className="grid grid-cols-3 gap-3">
                    {defaultCovers.map((coverUrl, index) => (
                      <motion.div
                        key={index}
                        className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                          cover === coverUrl ? 'border-green-500 ring-2 ring-green-200' : 'border-gray-200 hover:border-green-300'
                        }`}
                        onClick={() => setCover(coverUrl)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ImageWithFallback
                          src={coverUrl}
                          alt={`Capa ${index + 1}`}
                          className="w-full h-20 object-cover"
                        />
                        {cover === coverUrl && (
                          <motion.div
                            className="absolute inset-0 bg-green-500/30 flex items-center justify-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                          >
                            <Check className="w-6 h-6 text-white" />
                          </motion.div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Preview da capa selecionada */}
                {cover && (
                  <div className="mt-4">
                    <p className="text-sm font-medium mb-2">Preview:</p>
                    <div className="relative rounded-lg overflow-hidden h-32">
                      <ImageWithFallback
                        src={cover}
                        alt="Preview da capa"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                        <div className="p-4 text-white">
                          <h4 className="font-bold">{name || "Nome da Comunidade"}</h4>
                          <p className="text-sm opacity-90">{description || "Descrição da comunidade..."}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Ações */}
              <div className="flex gap-3">
                <Button variant="outline" onClick={onClose} className="flex-1">
                  Cancelar
                </Button>
                
                <Button
                  onClick={handleCreate}
                  disabled={!name.trim() || !description.trim() || !cover || isCreating}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  {isCreating ? (
                    <motion.div
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                  ) : (
                    "Criar Comunidade"
                  )}
                </Button>
              </div>
            </>
          ) : (
            /* Confirmação de criação */
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
                Comunidade Criada!
              </h4>
              
              <p className="text-gray-600 text-sm mb-4">
                "{name}" foi criada com sucesso!<br />
                Agora você pode começar a convidar pessoas e criar tópicos.
              </p>
              
              {cover && (
                <div className="w-32 h-20 mx-auto rounded-lg overflow-hidden">
                  <ImageWithFallback
                    src={cover}
                    alt="Capa da comunidade"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}