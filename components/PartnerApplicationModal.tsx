import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Store, FileText, DollarSign, Check, AlertCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { toast } from "sonner@2.0.3";

interface PartnerApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PartnerApplicationModal({ isOpen, onClose }: PartnerApplicationModalProps) {
  const [companyName, setCompanyName] = useState("");
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [price, setPrice] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleSubmit = () => {
    if (!companyName || !cpfCnpj || !productName || !price || !acceptedTerms) {
      toast.error("Preencha todos os campos e aceite os termos");
      return;
    }

    toast.success("Solicitação enviada!", {
      description: "Sua solicitação está em análise. Você será notificado em breve."
    });

    // Reset e fechar
    setCompanyName("");
    setCpfCnpj("");
    setProductName("");
    setProductDescription("");
    setPrice("");
    setAcceptedTerms(false);
    onClose();
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
              <div className="sticky top-0 bg-gradient-to-r from-green-500 via-yellow-400 to-red-500 text-white p-6 z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Store className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">Quero Ser Parceiro Colaborativo</h2>
                      <p className="text-sm text-white/90">Venda seus produtos na nossa loja colaborativa</p>
                    </div>
                  </div>
                  <Button onClick={onClose} variant="ghost" size="sm" className="text-white hover:bg-white/20">
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Info Card */}
                <Card className="p-4 bg-blue-50 border-blue-200">
                  <div className="flex gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium mb-1">Como funciona:</p>
                      <ul className="space-y-1 text-xs">
                        <li>• Envie sua solicitação com os dados do produto</li>
                        <li>• Nossa equipe analisa em até 48h</li>
                        <li>• Após aprovação, seu produto entra na loja</li>
                        <li>• A plataforma cobra 8% sobre cada venda</li>
                        <li>• Você recebe o pagamento direto do cliente</li>
                      </ul>
                    </div>
                  </div>
                </Card>

                {/* Form */}
                <div className="space-y-4">
                  {/* Nome da Empresa/Movimento */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Nome da Empresa ou Movimento *
                    </label>
                    <Input
                      placeholder="Ex: Cooperativa Arte Popular"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                    />
                  </div>

                  {/* CPF/CNPJ */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      CPF ou CNPJ *
                    </label>
                    <Input
                      placeholder="000.000.000-00 ou 00.000.000/0000-00"
                      value={cpfCnpj}
                      onChange={(e) => setCpfCnpj(e.target.value)}
                    />
                  </div>

                  {/* Nome do Produto */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Nome do Produto *
                    </label>
                    <Input
                      placeholder="Ex: Camiseta Bordada Artesanal"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                    />
                  </div>

                  {/* Descrição do Produto */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Descrição do Produto
                    </label>
                    <Textarea
                      placeholder="Descreva seu produto, materiais, processo de produção, etc."
                      value={productDescription}
                      onChange={(e) => setProductDescription(e.target.value)}
                      rows={4}
                    />
                  </div>

                  {/* Preço */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Preço de Venda *
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="pl-10"
                        step="0.01"
                      />
                    </div>
                    {price && (
                      <p className="text-xs text-gray-500 mt-1">
                        Você receberá: R$ {(parseFloat(price) * 0.92).toFixed(2)} (8% vai para a plataforma)
                      </p>
                    )}
                  </div>

                  {/* Termos */}
                  <Card className="p-4 bg-yellow-50 border-yellow-200">
                    <div className="flex items-start gap-3">
                      <Checkbox
                        checked={acceptedTerms}
                        onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <label className="text-sm font-medium cursor-pointer">
                          Aceito os termos de parceria colaborativa *
                        </label>
                        <div className="mt-2 text-xs text-gray-700 space-y-1">
                          <p>✓ Concordo em contribuir com 8% do valor de cada venda para a plataforma</p>
                          <p>✓ Entendo que minha publicação precisa ser aprovada pela moderação</p>
                          <p>✓ Comprometo-me a vender produtos éticos e alinhados aos valores da plataforma</p>
                          <p>✓ Garantirei a qualidade e entrega dos produtos vendidos</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Status Info */}
                <Card className="p-4 bg-green-50 border-green-200">
                  <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <div className="text-sm text-green-800">
                      <p className="font-medium mb-1">Após o envio:</p>
                      <p className="text-xs">
                        Você receberá um e-mail de confirmação e poderá acompanhar o status 
                        da sua solicitação na aba "Notificações". O prazo de análise é de até 48 horas úteis.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Footer */}
              <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 flex justify-end gap-2">
                <Button onClick={onClose} variant="outline">
                  Cancelar
                </Button>
                <Button 
                  onClick={handleSubmit}
                  className="bg-gradient-to-r from-green-600 via-yellow-500 to-red-600 text-white"
                  disabled={!acceptedTerms}
                >
                  <Check className="w-4 h-4 mr-2" />
                  Enviar Solicitação
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
