import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Toaster, toast } from "sonner";
import { supabase } from "./supabaseClient";
import { CircularNavigation } from "./components/CircularNavigation";
import { CircularFeed } from "./components/CircularFeed";
import { UserProfile } from "./components/UserProfile";
import { DonationSystem } from "./components/DonationSystem";
import { PremiumForums } from "./components/PremiumForums";
import { BrazilianBackground } from "./components/BrazilianBackground";
import {
  CommunityButton3D,
  communitiesData,
} from "./components/CommunityButton3D";
import { DebateRoomViewer } from "./components/DebateRoomViewer";
import { LoginPage } from "./components/LoginPage";
import { SignupPage } from "./components/SignupPage";
import { PlanSelection } from "./components/PlanSelection";
import { EventsPage } from "./components/EventsPage";
import { ForumDebate } from "./components/ForumDebate";
import { CulturalRecommendations } from "./components/CulturalRecommendations";
import { ProfileCreation } from "./components/ProfileCreation";
import { ForumsList } from "./components/ForumsList";
import { StoreAndGifts } from "./components/StoreAndGifts";
import { SolidaryBoxes } from "./components/SolidaryBoxes";
import { RefreshableFeed } from "./components/RefreshableFeed";
import { CommunityPage } from "./components/CommunityPage";
import { CreateCommunityModal } from "./components/CreateCommunityModal";
import { ThematicCommunities } from "./components/ThematicCommunities";
import { FriendsPage } from "./components/FriendsPage";
import { InstitutionAnalytics } from "./components/InstitutionAnalytics";
import { MusicBrazileiraCommunity } from "./components/MusicBrazileiraCommunity";
import { BetaInviteSystem } from "./components/BetaInviteSystem";
import { BetaTesterBadge } from "./components/BetaTesterBadge";
import {
  MessageSquare,
  Users,
  Bell,
  Search,
  UserPlus,
} from "lucide-react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Avatar } from "./components/ui/avatar";
import { Badge } from "./components/ui/badge";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";

function CommunitiesView({ onSelectTheme, onSelectCommunity }) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [userCommunities, setUserCommunities] = useState([]);

  const handleCreateCommunity = (community) => {
    setUserCommunities((prev) => [
      ...prev,
      {
        ...community,
        id: Date.now(),
        members: 1,
        isOwner: true,
      },
    ]);
  };

  return (
    <div className="w-full p-6">
      <motion.div
        className="flex items-center justify-between mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-center flex-1">
          <h1 className="text-green-700 mb-2">
            Comunidades da Roda
          </h1>
          <p className="text-gray-600">
            Cole estes patches na sua jaqueta digital!
            <span className="block mt-2 text-sm font-bold text-red-600">
              Clube da Esquerda: Resistência e Cultura
              Brasileira
            </span>
          </p>
        </div>

        <Button
          onClick={() => setShowCreateModal(true)}
          className="bg-green-600 hover:bg-green-700 ml-8"
        >
          <Users className="w-4 h-4 mr-2" />
          Criar Comunidade
        </Button>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {communitiesData.map((community, index) => (
          <CommunityButton3D
            key={community.name}
            community={community}
            index={index}
            onClick={() => {
              // Todos os patches levam para comunidades temáticas
              onSelectTheme({
                title: community.name,
                symbol: community.symbol,
                color: community.baseColor,
              });
            }}
          />
        ))}
      </div>

      {/* Comunidades criadas pelo usuário */}
      {userCommunities.length > 0 && (
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-green-700 mb-6 text-center">
            Suas Comunidades
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {userCommunities.map((community, index) => (
              <motion.div
                key={community.id}
                className="relative bg-white rounded-lg overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => onSelectCommunity(community)}
              >
                <div className="h-32 overflow-hidden">
                  <ImageWithFallback
                    src={community.cover}
                    alt={community.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-sm mb-1">
                    {community.name}
                  </h3>
                  <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                    {community.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      {community.members} membro
                      {community.members > 1 ? "s" : ""}
                    </span>
                    <Badge className="bg-green-100 text-green-700 text-xs">
                      Criador
                    </Badge>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Seção de comunidades em destaque */}
      <motion.div
        className="mt-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <h2 className="text-green-700 mb-4">
          Comunidades Mais Ativas
        </h2>
        <div className="flex justify-center gap-8 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
            <span>Filosofia Política - 45 online</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
            <span>Educação Pública - 38 online</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></span>
            <span>Saúde Mental - 29 online</span>
          </div>
        </div>
      </motion.div>

      {/* Modal de Criar Comunidade */}
      <CreateCommunityModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={handleCreateCommunity}
      />
    </div>
  );
}

function ChatView() {
  const conversations = [
    {
      name: "Ana Silva",
      message: "Vamos organizar aquela roda de samba?",
      time: "14:30",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b9c1cd17?w=100",
      online: true,
    },
    {
      name: "João Santos",
      message: "Adorei seu post sobre educação!",
      time: "13:45",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
      online: false,
    },
    {
      name: "Maria Costa",
      message: "Obrigada pelo apoio ao projeto!",
      time: "12:20",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
      online: true,
    },
  ];

  return (
    <div className="w-full p-6">
      <h1 className="text-center mb-8 text-blue-700">
        Conversas Privadas
      </h1>
      <div className="space-y-4">
        {conversations.map((conv, index) => (
          <motion.div
            key={conv.name}
            className="flex items-center gap-4 p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="relative">
              <Avatar className="w-12 h-12">
                <ImageWithFallback
                  src={conv.avatar}
                  alt={conv.name}
                  className="rounded-full object-cover"
                />
              </Avatar>
              {conv.online && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              )}
            </div>
            <div className="flex-1">
              <h4 className="font-medium">{conv.name}</h4>
              <p className="text-sm text-gray-500">
                {conv.message}
              </p>
            </div>
            <span className="text-xs text-gray-400">
              {conv.time}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ====================================
// COMPONENTE PRINCIPAL COM SUPABASE
// ====================================

export default function App() {
  // Estados de autenticação Supabase
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(true);
  
  // Estados da aplicação
  const [activeView, setActiveView] = useState("Roda Principal");
  const [notifications] = useState(3);
  const [showDebateRoom, setShowDebateRoom] = useState(false);
  const [selectedForum, setSelectedForum] = useState(null);
  const [showProfileCreation, setShowProfileCreation] = useState(false);
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [showFriendsPage, setShowFriendsPage] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showPlanSelection, setShowPlanSelection] = useState(false);
  const [showMusicCommunity, setShowMusicCommunity] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);

  // Sistema de Beta Tester
  const [isBetaTester] = useState(true);
  const [showInviteSystem, setShowInviteSystem] = useState(false);

  // Estado com persistência no localStorage
  const [userPlanType, setUserPlanType] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("userPlanType");
    }
    return null;
  });

  // ====================================
  // SUPABASE: Verificar sessão ao carregar
  // ====================================
  useEffect(() => {
    // Verificar se já existe sessão ativa
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setIsLoggedIn(true);
        setUserEmail(session.user.email || "");
      }
      setLoading(false);
    });

    // Escutar mudanças de autenticação
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setIsLoggedIn(true);
        setUserEmail(session.user.email || "");
      } else {
        setIsLoggedIn(false);
        setUserEmail("");
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // ====================================
  // SUPABASE: Função de Login Real
  // ====================================
  const handleLoginWithSupabase = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        toast.success("Login realizado com sucesso!");
        setIsLoggedIn(true);
        setUserEmail(data.user.email || "");
      }
    } catch (error: any) {
      toast.error(error.message || "Erro ao fazer login");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  // ====================================
  // SUPABASE: Função de Logout
  // ====================================
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setIsLoggedIn(false);
      setUserEmail("");
      toast.success("Logout realizado!");
    } catch (error: any) {
      toast.error("Erro ao fazer logout");
      console.error("Logout error:", error);
    }
  };

  // ====================================
  // RENDERIZAR CONTEÚDO PRINCIPAL
  // ====================================
  const renderMainContent = () => {
    if (showDebateRoom) {
      return <DebateRoomViewer />;
    }

    switch (activeView) {
      case "Roda Principal":
        return <RefreshableFeed />;
      case "Comunidades":
        if (showMusicCommunity) {
          return (
            <MusicBrazileiraCommunity
              onBack={() => setShowMusicCommunity(false)}
            />
          );
        }
        if (selectedTheme) {
          return (
            <ThematicCommunities
              themeTitle={selectedTheme.title}
              themeSymbol={selectedTheme.symbol}
              themeColor={selectedTheme.color}
              onBack={() => setSelectedTheme(null)}
              onOpenMusicCommunity={() =>
                setShowMusicCommunity(true)
              }
            />
          );
        }
        return selectedCommunity ? (
          <CommunityPage
            onBack={() => setSelectedCommunity(null)}
          />
        ) : (
          <CommunitiesView
            onSelectTheme={setSelectedTheme}
            onSelectCommunity={setSelectedCommunity}
          />
        );
      case "Conversas":
        return <ChatView />;
      case "Chamados":
        return (
          <EventsPage userCity="São Paulo" userType="regular" />
        );
      case "Fóruns":
        return selectedForum ? (
          <ForumDebate
            forumTitle={selectedForum.title}
            moderator={selectedForum.moderator.name}
            onBack={() => setSelectedForum(null)}
          />
        ) : (
          <ForumsList onSelectForum={setSelectedForum} />
        );
      case "Perfil":
        return <UserProfile />;
      case "Doações":
        return <DonationSystem />;
      case "Premium":
        return <PremiumForums />;
      case "Loja":
        return <StoreAndGifts />;
      case "Caixinhas":
        return <SolidaryBoxes />;
      case "Indicações":
        return <CulturalRecommendations />;
      default:
        return <RefreshableFeed />;
    }
  };

  // Loading inicial
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-green-500 via-yellow-400 to-red-500 rounded-full"
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  // ====================================
  // TELAS DE AUTENTICAÇÃO
  // ====================================
  if (!isLoggedIn) {
    // Se está no cadastro
    if (showSignup && !showPlanSelection && !showProfileCreation) {
      return (
        <>
          <SignupPage
            onBack={() => setShowSignup(false)}
            onContinue={() => {
              setShowSignup(false);
              setShowPlanSelection(true);
            }}
          />
          <Toaster position="top-center" richColors />
        </>
      );
    }

    // Se está na seleção de plano
    if (showPlanSelection && !showProfileCreation) {
      return (
        <PlanSelection
          onComplete={(planData) => {
            console.log("Plano selecionado:", planData);
            setUserPlanType(planData.plan);
            // Salvar no localStorage
            if (typeof window !== "undefined") {
              localStorage.setItem(
                "userPlanType",
                planData.plan,
              );
              localStorage.setItem(
                "planData",
                JSON.stringify(planData),
              );
              // Se for beta tester, salvar também
              if (planData.isBetaTester) {
                localStorage.setItem("isBetaTester", "true");
              }
            }
            setShowPlanSelection(false);
            setShowProfileCreation(true);
          }}
          onBack={() => {
            setShowPlanSelection(false);
            setShowSignup(true);
          }}
        />
      );
    }

    // Se está criando perfil
    if (showProfileCreation) {
      return (
        <ProfileCreation
          onComplete={(profileData) => {
            console.log("Perfil criado:", profileData);
            setShowProfileCreation(false);
            setIsLoggedIn(true);
          }}
          onBack={() => {
            setShowProfileCreation(false);
            setShowPlanSelection(true);
          }}
        />
      );
    }

    // Tela de login padrão
    return (
      <>
        <LoginPage
          onLogin={() => setIsLoggedIn(true)}
          onSignup={() => setShowSignup(true)}
        />
        <Toaster position="top-center" richColors />
      </>
    );
  }

  // ====================================
  // APLICAÇÃO PRINCIPAL (USUÁRIO LOGADO)
  // ====================================
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-red-50 relative">
      <Toaster position="top-center" richColors />
      
      {/* Fundo decorativo brasileiro */}
      <BrazilianBackground />
      
      {/* Header */}
      <motion.header
        className="bg-white shadow-lg border-b-4 border-gradient-to-r from-green-500 via-yellow-400 to-red-500"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo e título */}
            <div className="flex items-center gap-4">
              <motion.div
                className="w-12 h-12 bg-gradient-to-br from-green-500 via-yellow-400 to-red-500 rounded-full flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <div className="text-center text-white">
                  <div className="font-bold text-xs leading-none">
                    CLUBE
                  </div>
                  <div className="font-bold text-xs leading-none">
                    ESQUERDA
                  </div>
                </div>
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 via-yellow-600 to-red-600 bg-clip-text text-transparent">
                  Clube da Esquerda
                </h1>
                <p className="text-sm text-gray-600">
                  Roda democrática e criativa
                </p>
              </div>
            </div>

            {/* Barra de pesquisa */}
            <div className="flex-1 max-w-xl mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Buscar rodas, pessoas, comunidades..."
                  className="pl-10 bg-gray-50"
                />
              </div>
            </div>

            {/* Ações do usuário */}
            <div className="flex items-center gap-3">
              {/* Badge de Beta Tester */}
              {isBetaTester && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring" }}
                >
                  <BetaTesterBadge
                    onClick={() => setShowInviteSystem(true)}
                  />
                </motion.div>
              )}

              {/* Botão de amigos */}
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => setShowFriendsPage(true)}
              >
                <UserPlus className="w-5 h-5 text-gray-600" />
              </Button>

              {/* Botão de notificações */}
              <Button
                variant="ghost"
                size="icon"
                className="relative"
              >
                <Bell className="w-5 h-5 text-gray-600" />
                {notifications > 0 && (
                  <motion.span
                    className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring" }}
                  >
                    {notifications}
                  </motion.span>
                )}
              </Button>

              {/* Botão de mensagens */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setActiveView("Conversas")}
              >
                <MessageSquare className="w-5 h-5 text-gray-600" />
              </Button>

              {/* Avatar do usuário */}
              <Button
                variant="ghost"
                className="relative"
                onClick={() => setActiveView("Perfil")}
              >
                <Avatar className="w-8 h-8 border-2 border-green-500">
                  <div className="w-full h-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white font-bold">
                    {userEmail[0]?.toUpperCase() || "U"}
                  </div>
                </Avatar>
              </Button>

              {/* Botão de Logout */}
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="text-red-600 hover:bg-red-50"
              >
                Sair
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Container principal */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Navegação Circular */}
          <motion.div
            className="w-80 flex-shrink-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <CircularNavigation
              activeView={activeView}
              onViewChange={setActiveView}
            />
          </motion.div>

          {/* Conteúdo principal */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {renderMainContent()}
          </motion.div>
        </div>
      </div>

      {/* Modal de Sistema de Convites Beta */}
      {showInviteSystem && (
        <BetaInviteSystem
          onClose={() => setShowInviteSystem(false)}
        />
      )}

      {/* Modal de Amigos */}
      {showFriendsPage && (
        <FriendsPage onClose={() => setShowFriendsPage(false)} />
      )}

      {/* Modal de Analytics (para instituições) */}
      {showAnalytics && (
        <InstitutionAnalytics
          onClose={() => setShowAnalytics(false)}
        />
      )}
    </div>
  );
}
