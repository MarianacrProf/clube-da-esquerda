import { useState } from "react";
import { motion } from "framer-motion";
import { CircularNavigation } from "./components/CircularNavigation";
import { CircularFeed } from "./components/CircularFeed";
import { UserProfile } from "./components/UserProfile";
import { DonationSystem } from "./components/DonationSystem";
import { PremiumForums } from "./components/PremiumForums";
import { BrazilianBackground } from "./components/BrazilianBackground";
import { CommunityButton3D, communitiesData } from "./components/CommunityButton3D";
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
import { MessageSquare, Users, Bell, Search, UserPlus } from "lucide-react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Avatar } from "./components/ui/avatar";
import { Badge } from "./components/ui/badge";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";

function CommunitiesView({ onSelectTheme, onSelectCommunity }) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [userCommunities, setUserCommunities] = useState([]);

  const handleCreateCommunity = (community) => {
    setUserCommunities(prev => [...prev, { ...community, id: Date.now(), members: 1, isOwner: true }]);
  };

  return (
    <div className="w-full p-6">
      <motion.div 
        className="flex items-center justify-between mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-center flex-1">
          <h1 className="text-green-700 mb-2">Comunidades da Roda</h1>
          <p className="text-gray-600">
            Cole estes patches na sua jaqueta digital!
            <span className="block mt-2 text-sm font-bold text-red-600">Clube da Esquerda: Resistência e Cultura Brasileira</span>
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
                color: community.baseColor
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
          <h2 className="text-green-700 mb-6 text-center">Suas Comunidades</h2>
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
                  <h3 className="font-bold text-sm mb-1">{community.name}</h3>
                  <p className="text-xs text-gray-600 mb-2 line-clamp-2">{community.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{community.members} membro{community.members > 1 ? 's' : ''}</span>
                    <Badge className="bg-green-100 text-green-700 text-xs">Criador</Badge>
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
        <h2 className="text-green-700 mb-4">Comunidades Mais Ativas</h2>
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
    { name: "Ana Silva", message: "Vamos organizar aquela roda de samba?", time: "14:30", avatar: "https://images.unsplash.com/photo-1494790108755-2616b9c1cd17?w=100", online: true },
    { name: "João Santos", message: "Adorei seu post sobre educação!", time: "13:45", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100", online: false },
    { name: "Maria Costa", message: "Obrigada pelo apoio ao projeto!", time: "12:20", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100", online: true },
  ];

  return (
    <div className="w-full p-6">
      <h1 className="text-center mb-8 text-blue-700">Conversas Privadas</h1>
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
              <p className="text-sm text-gray-500">{conv.message}</p>
            </div>
            <span className="text-xs text-gray-400">{conv.time}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [activeView, setActiveView] = useState("Roda Principal");
  const [notifications] = useState(3);
  const [showDebateRoom, setShowDebateRoom] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
  const [isBetaTester] = useState(true); // Todos os primeiros usuários são beta testers
  const [showInviteSystem, setShowInviteSystem] = useState(false);
  
  // Estado com persistência no localStorage
  const [userPlanType, setUserPlanType] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('userPlanType');
    }
    return null;
  });

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
              onOpenMusicCommunity={() => setShowMusicCommunity(true)}
            />
          );
        }
        return selectedCommunity ? 
          <CommunityPage onBack={() => setSelectedCommunity(null)} /> :
          <CommunitiesView 
            onSelectTheme={setSelectedTheme}
            onSelectCommunity={setSelectedCommunity}
          />;
      case "Conversas":
        return <ChatView />;
      case "Chamados":
        return <EventsPage userCity="São Paulo" userType="regular" />;
      case "Fóruns":
        return selectedForum ? 
          <ForumDebate 
            forumTitle={selectedForum.title} 
            moderator={selectedForum.moderator.name}
            onBackToForums={() => setSelectedForum(null)}
          /> :
          <ForumsList onSelectForum={setSelectedForum} />;
      case "Doações":
        return <DonationSystem />;
      case "Perfil":
        if (showAnalytics && userPlanType === "institution") {
          return <InstitutionAnalytics onBack={() => setShowAnalytics(false)} />;
        }
        return showFriendsPage ? 
          <FriendsPage onBack={() => setShowFriendsPage(false)} /> :
          <UserProfile 
            onShowFriends={() => setShowFriendsPage(true)} 
            isInstitution={userPlanType === "institution"}
            onShowAnalytics={() => setShowAnalytics(true)}
          />;
      case "Indicações":
        return <CulturalRecommendations />;
      case "Caixinhas":
        return <SolidaryBoxes />;
      case "Brindes":
        return <StoreAndGifts />;
      default:
        return <RefreshableFeed />;
    }
  };

  // Fluxo de autenticação
  if (!isLoggedIn) {
    // Se está mostrando signup
    if (showSignup && !showPlanSelection && !showProfileCreation) {
      return (
        <SignupPage 
          onSignup={() => setShowPlanSelection(true)}
          onBackToLogin={() => setShowSignup(false)}
        />
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
            if (typeof window !== 'undefined') {
              localStorage.setItem('userPlanType', planData.plan);
              localStorage.setItem('planData', JSON.stringify(planData));
              // Se for beta tester, salvar também
              if (planData.isBetaTester) {
                localStorage.setItem('isBetaTester', 'true');
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
      <LoginPage 
        onLogin={() => setIsLoggedIn(true)}
        onSignup={() => setShowSignup(true)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-red-50 relative">
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
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <div className="text-center text-white">
                  <div className="font-bold text-xs leading-none">CLUBE</div>
                  <div className="font-bold text-xs leading-none">ESQUERDA</div>
                </div>
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 via-yellow-600 to-red-600 bg-clip-text text-transparent">
                  Clube da Esquerda
                </h1>
                <p className="text-sm text-gray-600">Roda democrática e criativa</p>
              </div>
            </div>

            {/* Barra de busca */}
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input 
                  placeholder="Buscar na roda..." 
                  className="pl-10 bg-gray-50 border-0 focus:bg-white"
                />
              </div>
            </div>

            {/* Ações do usuário */}
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5" />
                {notifications > 0 && (
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center p-0">
                    {notifications}
                  </Badge>
                )}
              </Button>
              
              <Button variant="ghost" size="sm">
                <MessageSquare className="w-5 h-5" />
              </Button>

              <div className="flex items-center gap-2">
                <Avatar className="w-8 h-8">
                  <ImageWithFallback 
                    src="https://images.unsplash.com/photo-1494790108755-2616b9c1cd17?w=100" 
                    alt="Usuário"
                    className="rounded-full object-cover"
                  />
                </Avatar>
                <div className="text-sm">
                  <div className="font-medium">Maria Silva</div>
                  <div className="flex items-center gap-1">
                    {isBetaTester ? (
                      <BetaTesterBadge size="sm" showIcon={false} />
                    ) : (
                      <Badge className="text-xs bg-yellow-100 text-yellow-700 px-1">Premium</Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Layout principal */}
      <div className="relative z-10">
        {/* Navegação circular */}
        {!showDebateRoom && (
          <CircularNavigation 
            activeItem={activeView}
            onItemClick={setActiveView}
          />
        )}

        {/* Conteúdo principal */}
        <main className={showDebateRoom ? "p-8" : "pl-80 pr-8 py-8"}>
          <div className="max-w-[1200px] mx-auto">
            {/* Botão para demo da mesa de debate */}
            {!showDebateRoom && (
              <motion.div 
                className="fixed top-20 right-8 z-50"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 }}
              >
                <Button
                  onClick={() => setShowDebateRoom(true)}
                  className="bg-gradient-to-r from-red-500 to-yellow-500 text-white shadow-lg hover:shadow-xl"
                >
                  🔴 Ver Mesa de Debate AO VIVO
                </Button>
              </motion.div>
            )}

            {/* Botão flutuante de convite para Beta Testers */}
            {!showDebateRoom && isBetaTester && activeView === "Roda Principal" && (
              <motion.div 
                className="fixed bottom-8 right-8 z-50"
                initial={{ opacity: 0, scale: 0, y: 100 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ 
                  delay: 1.5,
                  type: "spring",
                  stiffness: 260,
                  damping: 20
                }}
                whileHover={{ scale: 1.05 }}
              >
                <Button
                  onClick={() => setShowInviteSystem(true)}
                  className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white shadow-2xl hover:shadow-purple-500/50 px-6 py-6 rounded-full"
                  size="lg"
                >
                  <UserPlus className="w-6 h-6 mr-2" />
                  Convidar Amigos
                </Button>
                <motion.div
                  className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
              </motion.div>
            )}

            {/* Botão para voltar da mesa de debate */}
            {showDebateRoom && (
              <motion.div 
                className="mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Button
                  onClick={() => setShowDebateRoom(false)}
                  variant="outline"
                  className="mb-4"
                >
                  ← Voltar para o Clube
                </Button>
              </motion.div>
            )}

            <motion.div
              key={showDebateRoom ? 'debate' : activeView}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {renderMainContent()}
            </motion.div>
          </div>
        </main>
      </div>

      {/* Rodapé com valores */}
      <motion.footer 
        className="bg-gradient-to-r from-green-600 via-yellow-500 to-red-600 text-white py-8 mt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="font-bold mb-4">Nossos Valores</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-medium mb-2">🤝 RESPEITO</h4>
              <p className="text-sm opacity-90">Diversidade de ideias com diálogo respeitoso</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">🗳️ DEMOCRACIA</h4>
              <p className="text-sm opacity-90">Participação popular e decisões coletivas</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">⚖️ DIREITOS HUMANOS</h4>
              <p className="text-sm opacity-90">Igualdade, justiça e dignidade para todos</p>
            </div>
          </div>
          <p className="text-xs opacity-75 mt-8">
            Clube da Esquerda - Uma roda democrática e criativa • Construindo o Brasil que queremos
          </p>
        </div>
      </motion.footer>

      {/* Modal de Sistema de Convites Beta */}
      <BetaInviteSystem 
        isOpen={showInviteSystem}
        onClose={() => setShowInviteSystem(false)}
        userName="Maria Silva"
      />
    </div>
  );
}