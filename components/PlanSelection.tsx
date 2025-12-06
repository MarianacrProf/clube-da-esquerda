import { motion } from "motion/react";
import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { RadioGroup } from "./ui/radio-group";
import { 
  Check, 
  ArrowRight,
  ArrowLeft,
  Users,
  Star,
  Building2,
  AlertCircle,
  Crown,
  Sparkles,
  Heart
} from "lucide-react";

interface PlanSelectionProps {
  onComplete: (planData: any) => void;
  onBack?: () => void;
}

export function PlanSelection({ onComplete, onBack }: PlanSelectionProps) {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [selectedSubPlan, setSelectedSubPlan] = useState<string | null>(null);
  const [commonDiscount, setCommonDiscount] = useState<string | null>(null);
  const [institutionType, setInstitutionType] = useState<string | null>(null);
  
  // Campos para descontos do Plano Comum
  const [nisNumber, setNisNumber] = useState("");
  const [unionName, setUnionName] = useState("");
  const [unionId, setUnionId] = useState("");
  const [partyName, setPartyName] = useState("");
  const [partyId, setPartyId] = useState("");
  const [farmerRegistration, setFarmerRegistration] = useState("");

  const handleContinue = () => {
    const planData = {
      plan: selectedPlan,
      subPlan: selectedSubPlan,
      commonDiscount,
      institutionType,
      discountData: {
        nisNumber,
        unionName,
        unionId,
        partyName,
        partyId,
        farmerRegistration
      }
    };
    onComplete(planData);
  };

  const getCommonPrice = () => {
    if (commonDiscount) return "R$ 0,99";
    return "R$ 8,00";
  };

  const getInstitutionPrice = () => {
    switch (institutionType) {
      case "collective":
        return "R$ 62,00";
      case "ngo":
        return "R$ 80,00";
      case "company":
        return "R$ 134,00";
      default:
        return "A partir de R$ 62,00";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-red-50 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 via-yellow-600 to-red-600 bg-clip-text text-transparent mb-4">
            Escolha seu Plano
          </h1>
          <p className="text-gray-600 text-lg">
            Como você quer participar do Clube da Esquerda?
          </p>
        </motion.div>

        {/* Card especial de Beta Tester */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.05 }}
          className="mb-6"
        >
          <Card className="p-6 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white border-0 shadow-2xl relative overflow-hidden cursor-pointer hover:shadow-purple-500/50 transition-all"
            onClick={() => {
              onComplete({
                plan: "beta",
                isBetaTester: true
              });
            }}
          >
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
            
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-2xl">Acesso Beta Tester</h3>
                    <Badge className="bg-white/20 text-white border-0">Exclusivo</Badge>
                  </div>
                  <p className="text-white/90">
                    Você foi convidado! Acesso total <strong>GRÁTIS</strong> a todos os recursos da plataforma
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold mb-1">GRÁTIS</div>
                <p className="text-sm text-white/80">Acesso ilimitado</p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3 relative z-10">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                <div className="text-2xl mb-1">✨</div>
                <p className="text-xs">Todos os recursos</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                <div className="text-2xl mb-1">🎯</div>
                <p className="text-xs">Sem carência</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                <div className="text-2xl mb-1">👥</div>
                <p className="text-xs">Convites ilimitados</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                <div className="text-2xl mb-1">⭐</div>
                <p className="text-xs">Badge exclusivo</p>
              </div>
            </div>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Plano Comum */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card 
              className={`p-6 cursor-pointer transition-all h-full ${
                selectedPlan === "common"
                  ? "border-2 border-green-500 shadow-xl bg-green-50"
                  : "border-2 border-gray-200 hover:border-green-300 hover:shadow-lg"
              }`}
              onClick={() => {
                setSelectedPlan("common");
                setInstitutionType(null);
              }}
            >
              <div className="text-center mb-4">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-xl mb-2">Plano Comum</h3>
                <div className="text-3xl font-bold text-green-600 mb-1">
                  {getCommonPrice()}
                </div>
                <p className="text-sm text-gray-600">/mês</p>
              </div>

              <ul className="space-y-2 mb-4 text-sm">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Participar de posts, conversas, Fóruns, Mesas redondas, Comunidades e Canais Culturais</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Ganhar brindes e patches</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="font-medium">A partir do 2º mês:</span>
                </li>
                <li className="flex items-start gap-2 ml-4">
                  <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Vender em nossa loja colaborativa (mediante critérios da plataforma)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="font-medium">A partir do 3º mês:</span>
                </li>
                <li className="flex items-start gap-2 ml-4">
                  <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Criar Comunidades e Eventos Culturais</span>
                </li>
              </ul>

              {selectedPlan === "common" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-4 pt-4 border-t border-gray-200"
                >
                  <Badge className="w-full bg-blue-100 text-blue-700 mb-3">
                    Desconto disponível para R$ 0,99/mês
                  </Badge>
                  
                  <div className="space-y-3 text-sm">
                    <div 
                      className={`p-3 border rounded-lg cursor-pointer transition-all ${
                        commonDiscount === "cadUnico" 
                          ? "border-green-500 bg-green-50" 
                          : "border-gray-200 hover:border-green-300"
                      }`}
                      onClick={() => setCommonDiscount("cadUnico")}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Inscrito no CADÚnico</span>
                        {commonDiscount === "cadUnico" && <Check className="w-4 h-4 text-green-600" />}
                      </div>
                      {commonDiscount === "cadUnico" && (
                        <Input
                          placeholder="Número do NIS"
                          value={nisNumber}
                          onChange={(e) => setNisNumber(e.target.value)}
                          className="mt-2"
                        />
                      )}
                    </div>

                    <div 
                      className={`p-3 border rounded-lg cursor-pointer transition-all ${
                        commonDiscount === "union" 
                          ? "border-green-500 bg-green-50" 
                          : "border-gray-200 hover:border-green-300"
                      }`}
                      onClick={() => setCommonDiscount("union")}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Trabalhador Sindicalizado</span>
                        {commonDiscount === "union" && <Check className="w-4 h-4 text-green-600" />}
                      </div>
                      {commonDiscount === "union" && (
                        <div className="space-y-2 mt-2">
                          <Input
                            placeholder="Nome do Sindicato"
                            value={unionName}
                            onChange={(e) => setUnionName(e.target.value)}
                          />
                          <Input
                            placeholder="Matrícula"
                            value={unionId}
                            onChange={(e) => setUnionId(e.target.value)}
                          />
                        </div>
                      )}
                    </div>

                    <div 
                      className={`p-3 border rounded-lg cursor-pointer transition-all ${
                        commonDiscount === "party" 
                          ? "border-green-500 bg-green-50" 
                          : "border-gray-200 hover:border-green-300"
                      }`}
                      onClick={() => setCommonDiscount("party")}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Filiado a partido de esquerda</span>
                        {commonDiscount === "party" && <Check className="w-4 h-4 text-green-600" />}
                      </div>
                      {commonDiscount === "party" && (
                        <div className="space-y-2 mt-2">
                          <select 
                            className="w-full p-2 border border-gray-300 rounded-md"
                            value={partyName}
                            onChange={(e) => setPartyName(e.target.value)}
                          >
                            <option value="">Selecione o partido</option>
                            <option value="PT">PT - Partido dos Trabalhadores</option>
                            <option value="PSOL">PSOL - Partido Socialismo e Liberdade</option>
                            <option value="PCdoB">PCdoB - Partido Comunista do Brasil</option>
                            <option value="PSTU">PSTU - Partido Socialista dos Trabalhadores Unificado</option>
                            <option value="PCB">PCB - Partido Comunista Brasileiro</option>
                            <option value="PCO">PCO - Partido da Causa Operária</option>
                            <option value="UP">UP - Unidade Popular</option>
                          </select>
                          <Input
                            placeholder="Número de Filiação"
                            value={partyId}
                            onChange={(e) => setPartyId(e.target.value)}
                          />
                        </div>
                      )}
                    </div>

                    <div 
                      className={`p-3 border rounded-lg cursor-pointer transition-all ${
                        commonDiscount === "farmer" 
                          ? "border-green-500 bg-green-50" 
                          : "border-gray-200 hover:border-green-300"
                      }`}
                      onClick={() => setCommonDiscount("farmer")}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Agricultura Familiar</span>
                        {commonDiscount === "farmer" && <Check className="w-4 h-4 text-green-600" />}
                      </div>
                      {commonDiscount === "farmer" && (
                        <Input
                          placeholder="Número de Inscrição"
                          value={farmerRegistration}
                          onChange={(e) => setFarmerRegistration(e.target.value)}
                          className="mt-2"
                        />
                      )}
                    </div>

                    <div 
                      className={`p-3 border rounded-lg cursor-pointer transition-all ${
                        commonDiscount === "none" 
                          ? "border-green-500 bg-green-50" 
                          : "border-gray-200 hover:border-green-300"
                      }`}
                      onClick={() => setCommonDiscount("none")}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Público em geral - R$ 8,00/mês</span>
                        {commonDiscount === "none" && <Check className="w-4 h-4 text-green-600" />}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </Card>
          </motion.div>

          {/* Plano Premium */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card 
              className={`p-6 cursor-pointer transition-all h-full relative overflow-hidden ${
                selectedPlan === "premium"
                  ? "border-2 border-yellow-500 shadow-xl bg-yellow-50"
                  : "border-2 border-gray-200 hover:border-yellow-300 hover:shadow-lg"
              }`}
              onClick={() => {
                setSelectedPlan("premium");
                setCommonDiscount(null);
                setInstitutionType(null);
              }}
            >
              <Badge className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                Popular
              </Badge>

              <div className="text-center mb-4">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-xl mb-2">Plano Premium</h3>
                <div className="text-3xl font-bold text-yellow-600 mb-1">
                  R$ 35,00
                </div>
                <p className="text-sm text-gray-600">/mês</p>
              </div>

              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <span>Participar de posts, conversas, Fóruns, Mesas redondas, Comunidades e Canais Culturais</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <span>Ganhar brindes e patches</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <span className="font-medium">A partir do 2º mês:</span>
                </li>
                <li className="flex items-start gap-2 ml-4">
                  <Check className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <span>Vender em nossa loja colaborativa (mediante critérios da plataforma)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <span className="font-medium">A partir do 3º mês:</span>
                </li>
                <li className="flex items-start gap-2 ml-4">
                  <Check className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <span>Criar Comunidades e Eventos Culturais</span>
                </li>
                <li className="flex items-start gap-2 ml-4">
                  <Check className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <span>Criar Fóruns, Mesas redondas, Canais culturais e Eventos Políticos</span>
                </li>
                <li className="flex items-start gap-2 ml-4">
                  <Check className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <span>Potencial de monetização</span>
                </li>
                <li className="flex items-start gap-2 ml-4">
                  <Check className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <span>Ver quem te achou interessante</span>
                </li>
              </ul>
            </Card>
          </motion.div>

          {/* Plano Instituição */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card 
              className={`p-6 cursor-pointer transition-all h-full ${
                selectedPlan === "institution"
                  ? "border-2 border-blue-500 shadow-xl bg-blue-50"
                  : "border-2 border-gray-200 hover:border-blue-300 hover:shadow-lg"
              }`}
              onClick={() => {
                setSelectedPlan("institution");
                setCommonDiscount(null);
              }}
            >
              <div className="text-center mb-4">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-xl mb-2">Plano Instituição</h3>
                <div className="text-3xl font-bold text-blue-600 mb-1">
                  {getInstitutionPrice()}
                </div>
                <p className="text-sm text-gray-600">/mês</p>
              </div>

              {selectedPlan === "institution" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mb-4 pb-4 border-b border-gray-200"
                >
                  <p className="text-sm font-medium mb-3">Tipo de Instituição:</p>
                  <div className="space-y-2 text-sm">
                    <div 
                      className={`p-2 border rounded cursor-pointer ${
                        institutionType === "collective" 
                          ? "border-blue-500 bg-blue-50" 
                          : "border-gray-200 hover:border-blue-300"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setInstitutionType("collective");
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span>Coletivo autônomo/artístico - R$ 62,00</span>
                        {institutionType === "collective" && <Check className="w-4 h-4 text-blue-600" />}
                      </div>
                    </div>
                    <div 
                      className={`p-2 border rounded cursor-pointer ${
                        institutionType === "ngo" 
                          ? "border-blue-500 bg-blue-50" 
                          : "border-gray-200 hover:border-blue-300"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setInstitutionType("ngo");
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span>ONG sem fins lucrativos - R$ 80,00</span>
                        {institutionType === "ngo" && <Check className="w-4 h-4 text-blue-600" />}
                      </div>
                    </div>
                    <div 
                      className={`p-2 border rounded cursor-pointer ${
                        institutionType === "company" 
                          ? "border-blue-500 bg-blue-50" 
                          : "border-gray-200 hover:border-blue-300"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setInstitutionType("company");
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span>Empresa/Órgão Gov. - R$ 134,00</span>
                        {institutionType === "company" && <Check className="w-4 h-4 text-blue-600" />}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Participar de posts, conversas, Fóruns, Mesas redondas, Comunidades e Canais Culturais</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Ganhar brindes e patches</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Analytics e relatórios</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="font-medium">A partir do 2º mês:</span>
                </li>
                <li className="flex items-start gap-2 ml-4">
                  <Check className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Vender em nossa loja colaborativa (mediante critérios da plataforma)</span>
                </li>
                <li className="flex items-start gap-2 ml-4">
                  <Check className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Criar Comunidades e Eventos Culturais</span>
                </li>
                <li className="flex items-start gap-2 ml-4">
                  <Check className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Criar Fóruns, Mesas redondas, Canais culturais</span>
                </li>
                <li className="flex items-start gap-2 ml-4">
                  <Check className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Criar Eventos Políticos</span>
                </li>
                <li className="flex items-start gap-2 ml-4">
                  <Check className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Potencial de monetização</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="font-medium">A partir do 3º mês:</span>
                </li>
                <li className="flex items-start gap-2 ml-4">
                  <Check className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Propor projetos para as caixinhas</span>
                </li>
              </ul>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <Button
            onClick={handleContinue}
            disabled={
              !selectedPlan || 
              (selectedPlan === "common" && !commonDiscount) ||
              (selectedPlan === "institution" && !institutionType)
            }
            className="bg-gradient-to-r from-green-600 via-yellow-500 to-red-600 text-white px-8 py-6 text-lg"
          >
            Continuar com {selectedPlan === "common" ? "Plano Comum" : selectedPlan === "premium" ? "Plano Premium" : "Plano Instituição"}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>

          {onBack && (
            <Button
              onClick={onBack}
              className="bg-gray-200 text-gray-800 px-8 py-6 text-lg mt-4"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Voltar
            </Button>
          )}

          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200 max-w-2xl mx-auto">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-800 text-left">
                <p className="font-medium mb-1">Período de Carência</p>
                <p>
                  Algumas funcionalidades possuem período de carência (2º ou 3º mês) para garantir 
                  engajamento genuíno e construção de comunidade responsável.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}