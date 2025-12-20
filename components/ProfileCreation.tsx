import { motion } from "motion/react";
import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Avatar } from "./ui/avatar";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { 
  Upload,
  Camera,
  User,
  MapPin,
  Calendar,
  Heart,
  Flag,
  ArrowRight,
  ArrowLeft,
  Check,
  Star,
  Sparkles
} from "lucide-react";

interface ProfileData {
  name: string;
  username: string;
  bio: string;
  birthDate: string;
  city: string;
  state: string;
  avatar: string;
  photos: string[];
  politicalFlags: string[];
  interests: string[];
  cpfCnpj: string;
}

const politicalFlags = [
  { id: "lgbt", label: "🏳️‍🌈 LGBT+", color: "bg-rainbow" },
  { id: "trans", label: "🏳️‍⚧️ Trans", color: "bg-blue-200" },
  { id: "feminism", label: "♀️ Feminismo", color: "bg-purple-200" },
  { id: "communism", label: "☭ Comunismo", color: "bg-red-200" },
  { id: "socialism", label: "🌹 Socialismo", color: "bg-pink-200" },
  { id: "anarchism", label: "Ⓐ Anarquismo", color: "bg-black text-white" },
  { id: "environment", label: "🌱 Meio Ambiente", color: "bg-green-200" },
  { id: "antiracism", label: "✊🏿 Antirracismo", color: "bg-yellow-200" },
  { id: "sus", label: "⚕️ SUS", color: "bg-blue-200" },
  { id: "education", label: "📚 Educação Pública", color: "bg-indigo-200" }
];

const interests = [
  "Música Brasileira", "Literatura", "Cinema Nacional", "Teatro", 
  "Poesia", "Filosofia", "História", "Arte Popular", "Dança",
  "Capoeira", "Samba", "Forró", "MPB", "Rap Nacional", "Cordel"
];

interface ProfileCreationProps {
  onComplete: (profileData: ProfileData) => void;
  onBack?: () => void;
}

interface PlanType {
  id: "common" | "premium" | "institution";
  name: string;
  price: string;
  features: string[];
  icon: string;
  color: string;
}

const plans: PlanType[] = [
  {
    id: "common",
    name: "Comum",
    price: "Gratuito",
    icon: "👤",
    color: "gray",
    features: [
      "Participar de comunidades",
      "Conversas básicas", 
      "Ver fóruns públicos",
      "Eventos gratuitos"
    ]
  },
  {
    id: "premium", 
    name: "Premium",
    price: "R$ 25/mês",
    icon: "⭐",
    color: "yellow",
    features: [
      "Tudo do plano Comum",
      "Criar fóruns e comunidades",
      "Mesas redondas online",
      "Canais culturais exclusivos",
      "Ver quem te achou interessante"
    ]
  },
  {
    id: "institution",
    name: "Instituição", 
    price: "R$ 150/mês",
    icon: "🏛️",
    color: "blue",
    features: [
      "Tudo do plano Premium",
      "Perfil verificado",
      "Criar canais oficiais", 
      "Eventos patrocinados",
      "Analytics e relatórios"
    ]
  }
];

export function ProfileCreation({ onComplete, onBack }: ProfileCreationProps) {
  const [step, setStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(null);
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "",
    username: "",
    bio: "",
    birthDate: "",
    city: "",
    state: "",
    avatar: "",
    photos: [],
    politicalFlags: [],
    interests: [],
    cpfCnpj: ""
  });

  const totalSteps = 5;

  const updateField = (field: keyof ProfileData, value: any) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const toggleFlag = (flagId: string) => {
    setProfileData(prev => ({
      ...prev,
      politicalFlags: prev.politicalFlags.includes(flagId)
        ? prev.politicalFlags.filter(f => f !== flagId)
        : [...prev.politicalFlags, flagId]
    }));
  };

  const toggleInterest = (interest: string) => {
    setProfileData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleComplete = () => {
    onComplete(profileData);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-green-700 mb-2">Escolha seu Plano</h2>
              <p className="text-gray-600">Como você quer participar do Clube da Esquerda?</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {plans.map((plan) => (
                <motion.div
                  key={plan.id}
                  className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedPlan?.id === plan.id
                      ? `border-${plan.color}-400 bg-${plan.color}-50`
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedPlan(plan)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="text-center">
                    <div className="text-4xl mb-4">{plan.icon}</div>
                    <h3 className="font-bold mb-2">{plan.name}</h3>
                    <p className={`text-2xl font-bold text-${plan.color}-600 mb-4`}>
                      {plan.price}
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <span className="text-green-500">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-green-700 mb-2">Informações Básicas</h2>
              <p className="text-gray-600">Vamos começar conhecendo você!</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block mb-2">Nome Completo</label>
                <Input
                  placeholder="Seu nome completo"
                  value={profileData.name}
                  onChange={(e) => updateField("name", e.target.value)}
                />
              </div>

              <div>
                <label className="block mb-2">Nome de Usuário</label>
                <Input
                  placeholder="@seuusuario"
                  value={profileData.username}
                  onChange={(e) => updateField("username", e.target.value)}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Este será seu identificador único no Clube da Esquerda
                </p>
              </div>

              <div>
                <label className="block mb-2">Bio</label>
                <Textarea
                  placeholder="Conte um pouco sobre você, suas lutas e sonhos..."
                  value={profileData.bio}
                  onChange={(e) => updateField("bio", e.target.value)}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2">Data de Nascimento</label>
                  <Input
                    type="date"
                    value={profileData.birthDate}
                    onChange={(e) => updateField("birthDate", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block mb-2">Estado</label>
                  <Input
                    placeholder="Ex: São Paulo"
                    value={profileData.state}
                    onChange={(e) => updateField("state", e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2">Cidade</label>
                <Input
                  placeholder="Ex: São Paulo"
                  value={profileData.city}
                  onChange={(e) => updateField("city", e.target.value)}
                />
              </div>

              <div>
                <label className="block mb-2">CPF ou CNPJ</label>
                <Input
                  placeholder="000.000.000-00 ou 00.000.000/0000-00"
                  value={profileData.cpfCnpj}
                  onChange={(e) => updateField("cpfCnpj", e.target.value)}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Necessário para validação e segurança da plataforma
                </p>
              </div>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-green-700 mb-2">Suas Fotos</h2>
              <p className="text-gray-600">Adicione até 3 fotos + sua foto de perfil</p>
            </div>

            {/* Avatar principal */}
            <div className="text-center">
              <div className="relative inline-block">
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  {profileData.avatar ? (
                    <ImageWithFallback
                      src={profileData.avatar}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-8 h-8 text-gray-400" />
                  )}
                </div>
                <Button
                  size="sm"
                  className="absolute bottom-0 right-0 rounded-full w-8 h-8 p-0"
                >
                  <Camera className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-sm text-gray-600 mt-2">Foto de Perfil</p>
            </div>

            {/* Fotos adicionais */}
            <div>
              <label className="block mb-4">Fotos Adicionais (até 3)</label>
              <div className="grid grid-cols-3 gap-4">
                {[0, 1, 2].map((index) => (
                  <div
                    key={index}
                    className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 hover:border-green-400 transition-colors cursor-pointer"
                  >
                    {profileData.photos[index] ? (
                      <ImageWithFallback
                        src={profileData.photos[index]}
                        alt={`Foto ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <div className="text-center">
                        <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                        <p className="text-xs text-gray-500">Adicionar</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-green-700 mb-2">Suas Bandeiras Políticas</h2>
              <p className="text-gray-600">Escolha as causas que você defende</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {politicalFlags.map((flag) => (
                <motion.div
                  key={flag.id}
                  className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    profileData.politicalFlags.includes(flag.id)
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => toggleFlag(flag.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{flag.label}</span>
                    {profileData.politicalFlags.includes(flag.id) && (
                      <Check className="w-4 h-4 text-green-600" />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <p className="text-xs text-gray-500 text-center">
              Suas bandeiras aparecerão como adesivos no seu perfil
            </p>
          </motion.div>
        );

      case 5:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-green-700 mb-2">Seus Interesses Culturais</h2>
              <p className="text-gray-600">O que você gosta de fazer e consumir?</p>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {interests.map((interest) => (
                <motion.div
                  key={interest}
                  className={`p-2 rounded-lg border cursor-pointer text-center transition-all ${
                    profileData.interests.includes(interest)
                      ? "border-green-500 bg-green-50 text-green-700"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => toggleInterest(interest)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-sm">{interest}</span>
                </motion.div>
              ))}
            </div>

            <p className="text-xs text-gray-500 text-center">
              Isso nos ajudará a recomendar comunidades e conteúdo relevante
            </p>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-red-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-2xl p-8">
        {/* Header com progresso */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-green-700">Criar Perfil</h1>
            <Badge variant="outline">{step} de {totalSteps}</Badge>
          </div>
          
          {/* Barra de progresso */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-green-500 via-yellow-400 to-red-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(step / totalSteps) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Conteúdo do step */}
        <div className="min-h-[400px]">
          {renderStep()}
        </div>

        {/* Navegação */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={step === 1}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Anterior
          </Button>

          {step < totalSteps ? (
            <Button
              onClick={nextStep}
              className="bg-green-600 hover:bg-green-700"
              disabled={
                (step === 1 && !selectedPlan) ||
                (step === 2 && (!profileData.name || !profileData.username)) ||
                (step === 4 && profileData.politicalFlags.length === 0) ||
                (step === 5 && profileData.interests.length === 0)
              }
            >
              Próximo
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleComplete}
              className="bg-gradient-to-r from-green-600 via-yellow-500 to-red-600 text-white"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Entrar na Roda!
            </Button>
          )}
        </div>

        {/* Preview do perfil no último step */}
        {step === 5 && (
          <motion.div
            className="mt-8 p-4 bg-gradient-to-r from-green-100 via-yellow-100 to-red-100 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3 className="text-center mb-4 text-green-700">Preview do seu perfil</h3>
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16">
                <div className="w-full h-full bg-gradient-to-br from-green-500 via-yellow-400 to-red-500 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
              </Avatar>
              <div className="flex-1">
                <h4 className="font-medium">{profileData.name || "Seu Nome"}</h4>
                <p className="text-sm text-gray-600">@{profileData.username || "usuario"}</p>
                <p className="text-sm text-gray-600">{profileData.city}, {profileData.state}</p>
                <div className="flex gap-1 mt-2">
                  {profileData.politicalFlags.slice(0, 3).map((flagId) => {
                    const flag = politicalFlags.find(f => f.id === flagId);
                    return flag ? (
                      <Badge key={flagId} className="text-xs bg-red-100 text-red-700">
                        {flag.label}
                      </Badge>
                    ) : null;
                  })}
                  {profileData.politicalFlags.length > 3 && (
                    <Badge className="text-xs bg-gray-100 text-gray-700">
                      +{profileData.politicalFlags.length - 3}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </Card>
    </div>
  );
}