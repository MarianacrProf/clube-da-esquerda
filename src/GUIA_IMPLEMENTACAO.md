# 🎯 Guia de Implementação - Clube da Esquerda

## ✅ O QUE FOI IMPLEMENTADO

### 1. **Sistema de Beta Testers** ✨
- Badge especial de Beta Tester no perfil
- Modal de convites compartilháveis (BetaInviteSystem)
- Opção destacada na seleção de planos
- Links únicos para cada usuário
- Estatísticas de convites

### 2. **Modais Principais Criados** 📱

#### **CreatePostModal**
```tsx
import { CreatePostModal } from "./components/CreatePostModal";

<CreatePostModal
  isOpen={showCreatePost}
  onClose={() => setShowCreatePost(false)}
  onCreatePost={(post) => {
    // Adicionar post ao feed
    setPosts([post, ...posts]);
  }}
/>
```

Recursos:
- Texto (5000 caracteres)
- Até 3 imagens
- Vídeo (1 min)
- Links externos
- Emojis
- GIFs
- Embed de músicas/vídeos
- **Scroll interno automático**

#### **PartnerApplicationModal**
```tsx
import { PartnerApplicationModal } from "./components/PartnerApplicationModal";

<PartnerApplicationModal
  isOpen={showPartner}
  onClose={() => setShowPartner(false)}
/>
```

Formulário completo com:
- Nome empresa/movimento
- CPF/CNPJ
- Produto e preço
- Cálculo automático de 8%
- Termos de aceite
- **Scroll interno**

#### **EventParticipationModal**
```tsx
import { EventParticipationModal } from "./components/EventParticipationModal";

<EventParticipationModal
  isOpen={showEventModal}
  onClose={() => setShowEventModal(false)}
  eventName="Roda de Samba"
  eventImage="url-da-imagem"
  eventDate="15 de Dezembro, 19h"
/>
```

Pop-up festivo com:
- Animação de confetti
- Link compartilhável
- Botões de redes sociais
- **Efeito visual atraente**

#### **ChatWindow**
```tsx
import { ChatWindow } from "./components/ChatWindow";

<ChatWindow
  isOpen={showChat}
  onClose={() => setShowChat(false)}
  contactName="João Santos"
  contactAvatar="url-avatar"
  contactOnline={true}
/>
```

Chat completo com:
- Mensagens em tempo real
- Status online/offline
- Scroll automático
- Emojis e anexos
- **Interface moderna**

#### **SharePostModal**
```tsx
import { SharePostModal } from "./components/SharePostModal";

<SharePostModal
  isOpen={showShare}
  onClose={() => setShowShare(false)}
  postContent="Texto do post..."
  postAuthor="Maria Silva"
  postImage="url-imagem"
/>
```

Compartilhamento em:
- WhatsApp
- Twitter  
- Facebook
- Telegram
- Link direto

### 3. **Ajustes de Layout** 🎨
- ✅ Menu circular desceu de `top-8` para `top-24` (mais espaço do header)
- ✅ Todos os modais têm scroll interno (`max-h-[90vh] overflow-y-auto`)
- ✅ Headers e footers sticky nos modais

---

## 🔨 O QUE PRECISA SER CONECTADO

### **No App.tsx**

```tsx
import { useState } from "react";
import { CreatePostModal } from "./components/CreatePostModal";
import { ChatWindow } from "./components/ChatWindow";
import { SharePostModal } from "./components/SharePostModal";
import { EventParticipationModal } from "./components/EventParticipationModal";
import { PartnerApplicationModal } from "./components/PartnerApplicationModal";

export default function App() {
  // Estados dos modais
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [chatContact, setChatContact] = useState(null);
  const [showShare, setShowShare] = useState(false);
  const [shareData, setShareData] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [eventData, setEventData] = useState(null);
  const [showPartner, setShowPartner] = useState(false);

  // ... resto do código

  return (
    <div>
      {/* Seu conteúdo existente */}
      
      {/* Modais */}
      <CreatePostModal
        isOpen={showCreatePost}
        onClose={() => setShowCreatePost(false)}
        onCreatePost={(post) => {
          // Adicionar ao feed
          console.log("Novo post:", post);
        }}
      />

      {chatContact && (
        <ChatWindow
          isOpen={showChat}
          onClose={() => {
            setShowChat(false);
            setChatContact(null);
          }}
          contactName={chatContact.name}
          contactAvatar={chatContact.avatar}
          contactOnline={chatContact.online}
        />
      )}

      {shareData && (
        <SharePostModal
          isOpen={showShare}
          onClose={() => {
            setShowShare(false);
            setShareData(null);
          }}
          postContent={shareData.content}
          postAuthor={shareData.author}
          postImage={shareData.image}
        />
      )}

      {eventData && (
        <EventParticipationModal
          isOpen={showEventModal}
          onClose={() => {
            setShowEventModal(false);
            setEventData(null);
          }}
          eventName={eventData.name}
          eventImage={eventData.image}
          eventDate={eventData.date}
        />
      )}

      <PartnerApplicationModal
        isOpen={showPartner}
        onClose={() => setShowPartner(false)}
      />
    </div>
  );
}
```

---

### **RefreshableFeed - Adicionar Criação de Post e UP!**

```tsx
import { useState } from "react";
import { CreatePostModal } from "./CreatePostModal";
import { SharePostModal } from "./SharePostModal";
import { ChatWindow } from "./ChatWindow";
import { Plus, ArrowBigUp, MessageCircle, Share2 } from "lucide-react";

export function RefreshableFeed() {
  const [posts, setPosts] = useState(initialPosts);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [shareData, setShareData] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [chatContact, setChatContact] = useState(null);

  // Sistema UP!
  const handleUpvote = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, upvotes: (post.upvotes || 0) + 1, hasUpvoted: true }
        : post
    ));
  };

  // Ordenar posts por upvotes (últimos 20 min)
  const sortedPosts = [...posts].sort((a, b) => {
    const now = new Date();
    const aRecent = (now - new Date(a.timestamp)) < 1200000; // 20 min
    const bRecent = (now - new Date(b.timestamp)) < 1200000;
    
    if (aRecent && bRecent) {
      return (b.upvotes || 0) - (a.upvotes || 0);
    }
    return 0;
  });

  const topPosts = sortedPosts.slice(0, 5);

  return (
    <div className="w-full p-6">
      {/* Botão Criar Publicação */}
      <motion.button
        className="fixed bottom-24 right-8 z-40 w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full shadow-2xl flex items-center justify-center text-white hover:scale-110 transition-transform"
        onClick={() => setShowCreatePost(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Plus className="w-8 h-8" />
      </motion.button>

      {/* Posts */}
      {sortedPosts.map((post, index) => {
        const isTopPost = topPosts.includes(post);
        
        return (
          <Card
            key={post.id}
            className={`mb-4 ${isTopPost ? 'ring-2 ring-yellow-400 shadow-xl' : ''}`}
          >
            {isTopPost && (
              <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold px-3 py-1">
                🔥 TOP POST - Últimos 20 min
              </div>
            )}

            <div className="p-4">
              {/* Header do post */}
              <div className="flex items-center gap-3 mb-3">
                <Avatar
                  className="cursor-pointer"
                  onClick={() => {
                    setChatContact({
                      name: post.author.name,
                      avatar: post.author.avatar,
                      online: true
                    });
                    setShowChat(true);
                  }}
                >
                  <ImageWithFallback src={post.author.avatar} alt={post.author.name} />
                </Avatar>
                <div>
                  <h4 className="font-bold">{post.author.name}</h4>
                  <p className="text-xs text-gray-500">{post.timestamp}</p>
                </div>
              </div>

              {/* Conteúdo */}
              <p className="mb-3">{post.content}</p>
              {post.image && (
                <img src={post.image} alt="Post" className="w-full rounded-lg mb-3" />
              )}

              {/* Ações */}
              <div className="flex items-center gap-4 pt-3 border-t">
                {/* UP! Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  className={post.hasUpvoted ? 'text-orange-600' : ''}
                  onClick={() => handleUpvote(post.id)}
                >
                  <ArrowBigUp className="w-5 h-5 mr-1" />
                  UP! {post.upvotes || 0}
                </Button>

                {/* Comentar */}
                <Button variant="ghost" size="sm">
                  <MessageCircle className="w-5 h-5 mr-1" />
                  {post.comments}
                </Button>

                {/* Compartilhar */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShareData({
                      content: post.content,
                      author: post.author.name,
                      image: post.image
                    });
                    setShowShare(true);
                  }}
                >
                  <Share2 className="w-5 h-5 mr-1" />
                  Compartilhar
                </Button>
              </div>
            </div>
          </Card>
        );
      })}

      {/* Modals */}
      <CreatePostModal
        isOpen={showCreatePost}
        onClose={() => setShowCreatePost(false)}
        onCreatePost={(newPost) => {
          setPosts([newPost, ...posts]);
        }}
      />

      {shareData && (
        <SharePostModal
          isOpen={showShare}
          onClose={() => {
            setShowShare(false);
            setShareData(null);
          }}
          {...shareData}
        />
      )}

      {chatContact && (
        <ChatWindow
          isOpen={showChat}
          onClose={() => {
            setShowChat(false);
            setChatContact(null);
          }}
          {...chatContact}
        />
      )}
    </div>
  );
}
```

---

### **UserProfile - Adicionar Seções e Botões Clicáveis**

```tsx
import { useState } from "react";
import { Calendar, Book, Heart, MessageCircle } from "lucide-react";
import { ChatWindow } from "./ChatWindow";

export function UserProfile({ onShowFriends, isInstitution, onShowAnalytics }) {
  const [showChat, setShowChat] = useState(false);

  // Dados de exemplo
  const upcomingEvents = [
    { name: "Roda de Samba", date: "15 Dez, 19h", image: "..." },
    { name: "Debate sobre Educação", date: "18 Dez, 20h", image: "..." }
  ];

  const myRecommendations = [
    { title: "Canal de Poesia Popular", type: "canal", image: "..." },
    { title: "Livro: Quarto de Despejo", type: "livro", image: "..." }
  ];

  const supportedBoxes = [
    { title: "Cozinha Comunitária SP", goal: 5000, raised: 3200, image: "..." }
  ];

  return (
    <div className="w-full p-6">
      {/* Header existente */}
      
      {/* Botão Conectar com Tooltip */}
      <Button
        className="bg-green-600 hover:bg-green-700"
        title="Adicionar como amigo e começar a conversar"
      >
        Conectar
      </Button>

      {/* Botão Conversar */}
      <Button
        variant="outline"
        onClick={() => setShowChat(true)}
      >
        <MessageCircle className="w-4 h-4 mr-2" />
        Conversar
      </Button>

      {/* Comunidades Clicáveis */}
      <div className="mt-6">
        <h3 className="font-bold mb-3">Comunidades</h3>
        <div className="flex flex-wrap gap-2">
          {communities.map((community) => (
            <button
              key={community.id}
              className="px-3 py-1 bg-blue-100 hover:bg-blue-200 rounded-full text-sm transition-colors cursor-pointer"
              onClick={() => {
                // Navegar para a comunidade
                window.location.href = `/comunidade/${community.id}`;
              }}
            >
              {community.name}
            </button>
          ))}
        </div>
      </div>

      {/* Patches Clicáveis */}
      <div className="mt-6">
        <h3 className="font-bold mb-3">Patches Políticos</h3>
        <div className="flex flex-wrap gap-2">
          {patches.map((patch) => (
            <button
              key={patch.id}
              className="px-3 py-1 bg-red-100 hover:bg-red-200 rounded-full text-sm transition-colors cursor-pointer"
              onClick={() => {
                // Navegar para comunidade temática
                window.location.href = `/tema/${patch.slug}`;
              }}
            >
              {patch.emoji} {patch.label}
            </button>
          ))}
        </div>
      </div>

      {/* Nova Seção: Eventos Futuros */}
      <div className="mt-8">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-green-600" />
          <h3 className="font-bold">Eventos que vou participar</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {upcomingEvents.map((event, idx) => (
            <Card key={idx} className="p-3 hover:shadow-lg transition-shadow cursor-pointer">
              <img src={event.image} alt={event.name} className="w-full h-24 object-cover rounded mb-2" />
              <h4 className="font-medium text-sm">{event.name}</h4>
              <p className="text-xs text-gray-600">📅 {event.date}</p>
              <Button size="sm" className="mt-2 w-full bg-purple-500">
                <Share2 className="w-3 h-3 mr-1" />
                Compartilhar
              </Button>
            </Card>
          ))}
        </div>
      </div>

      {/* Nova Seção: Minhas Indicações */}
      <div className="mt-8">
        <div className="flex items-center gap-2 mb-4">
          <Book className="w-5 h-5 text-blue-600" />
          <h3 className="font-bold">Minhas Indicações Culturais</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {myRecommendations.map((rec, idx) => (
            <Card key={idx} className="p-3 hover:shadow-lg transition-shadow">
              <img src={rec.image} alt={rec.title} className="w-full h-24 object-cover rounded mb-2" />
              <h4 className="font-medium text-sm">{rec.title}</h4>
              <Badge className="text-xs mt-1">{rec.type}</Badge>
              <Button size="sm" className="mt-2 w-full bg-blue-500">
                <Share2 className="w-3 h-3 mr-1" />
                Compartilhar na Roda
              </Button>
            </Card>
          ))}
        </div>
      </div>

      {/* Nova Seção: Caixinhas que Apoio */}
      <div className="mt-8">
        <div className="flex items-center gap-2 mb-4">
          <Heart className="w-5 h-5 text-red-600" />
          <h3 className="font-bold">Caixinhas Solidárias que Apoio</h3>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {supportedBoxes.map((box, idx) => (
            <Card key={idx} className="p-4 hover:shadow-lg transition-shadow">
              <div className="flex gap-3">
                <img src={box.image} alt={box.title} className="w-20 h-20 object-cover rounded" />
                <div className="flex-1">
                  <h4 className="font-medium">{box.title}</h4>
                  <div className="mt-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span>R$ {box.raised}</span>
                      <span className="text-gray-500">Meta: R$ {box.goal}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full"
                        style={{ width: `${(box.raised / box.goal) * 100}%` }}
                      />
                    </div>
                  </div>
                  <Button size="sm" className="mt-2 bg-red-500">
                    <Share2 className="w-3 h-3 mr-1" />
                    Compartilhar
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Chat Modal */}
      <ChatWindow
        isOpen={showChat}
        onClose={() => setShowChat(false)}
        contactName="Maria Silva"
        contactAvatar="avatar-url"
        contactOnline={true}
      />
    </div>
  );
}
```

---

### **StoreAndGifts - Adicionar Botão Parceiro**

```tsx
import { PartnerApplicationModal } from "./PartnerApplicationModal";

export function StoreAndGifts() {
  const [showPartner, setShowPartner] = useState(false);

  return (
    <div className="w-full p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1>Loja e Brindes</h1>
        <Button
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white"
          onClick={() => setShowPartner(true)}
        >
          <Store className="w-4 h-4 mr-2" />
          Quero Ser Parceiro Colaborativo
        </Button>
      </div>

      {/* Produtos com botão compartilhar */}
      {products.map((product) => (
        <Card key={product.id}>
          {/* ... conteúdo do produto ... */}
          
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              // Criar post na Roda Principal
              createPostWithProduct(product);
            }}
          >
            <Share2 className="w-4 h-4 mr-2" />
            Compartilhar na Roda
          </Button>
        </Card>
      ))}

      <PartnerApplicationModal
        isOpen={showPartner}
        onClose={() => setShowPartner(false)}
      />
    </div>
  );
}
```

---

### **EventsPage - Adicionar Botão Participar**

```tsx
import { EventParticipationModal } from "./EventParticipationModal";

export function EventsPage() {
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <div>
      {events.map((event) => (
        <Card key={event.id}>
          {/* ... conteúdo do evento ... */}
          
          <Button
            onClick={() => {
              setSelectedEvent(event);
              setShowEventModal(true);
            }}
            className="bg-green-600"
          >
            Participar
          </Button>

          <Button
            variant="outline"
            onClick={() => shareEventOnFeed(event)}
          >
            <Share2 className="w-4 h-4 mr-2" />
            Compartilhar na Roda
          </Button>
        </Card>
      ))}

      {selectedEvent && (
        <EventParticipationModal
          isOpen={showEventModal}
          onClose={() => {
            setShowEventModal(false);
            setSelectedEvent(null);
          }}
          eventName={selectedEvent.name}
          eventImage={selectedEvent.image}
          eventDate={selectedEvent.date}
        />
      )}
    </div>
  );
}
```

---

## 📝 CHECKLIST FINAL

### Modais ✅
- [x] CreatePostModal
- [x] PartnerApplicationModal
- [x] EventParticipationModal
- [x] ChatWindow
- [x] SharePostModal
- [x] BetaInviteSystem

### Funcionalidades ⏳
- [ ] Botão "Criar Publicação" no Feed
- [ ] Sistema UP! nos posts
- [ ] Comentários nos posts
- [ ] Comunidades clicáveis no perfil
- [ ] Patches clicáveis no perfil
- [ ] Seção "Eventos Futuros" no perfil
- [ ] Seção "Minhas Indicações" no perfil
- [ ] Seção "Caixinhas que Apoio" no perfil
- [ ] Botão "Quero Ser Parceiro" na loja
- [ ] Botão "Compartilhar Produto" na loja
- [ ] Botão "Participar" em eventos
- [ ] Botão "Compartilhar Evento"
- [ ] Botão "Adicionar Amigo"
- [ ] Múltiplos caminhos para Chat
- [ ] Tooltip no botão "Conectar"

### UX ✅
- [x] Scroll em todos os pop-ups
- [x] Menu circular descido (top-24)
- [x] Animações suaves
- [x] Responsividade

---

## 🚀 COMO CONTINUAR

1. **Copie os códigos de exemplo acima**
2. **Integre nos componentes correspondentes**
3. **Teste cada funcionalidade**
4. **Ajuste estilos conforme necessário**
5. **Conecte com backend real quando disponível**

---

**Todos os componentes estão prontos e documentados!** 🎉

Use este guia como referência para implementar as funcionalidades restantes.
