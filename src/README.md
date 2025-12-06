# 🌀 Clube da Esquerda - Rede Social

Rede social circular inspirada nas tradições brasileiras de roda (samba, capoeira, indígena), promovendo debates democráticos e respeitosos baseados nos direitos humanos.

## 🚀 Funcionalidades

### ✅ Implementadas e Prontas para Produção

- **Sistema de Autenticação**
  - Cadastro e login com email
  - Perfis de usuário
  - Beta Testers exclusivos
  - Sessão persistente

- **Feed de Publicações (Roda Principal)**
  - Criar posts com texto, imagens, vídeos, links
  - Sistema UP! (upvote) divertido e colorido
  - Top 5 posts dos últimos 20 minutos
  - Comentários
  - Compartilhamento

- **Chat em Tempo Real**
  - Mensagens privadas
  - Notificações em tempo real
  - Status online/offline
  - Histórico de conversas

- **Upload de Mídia**
  - Até 3 imagens por post
  - Upload de avatar
  - Vídeos (até 1 min)
  - Armazenamento seguro

- **Comunidades**
  - 8 comunidades temáticas
  - Sistema de membros
  - Badges políticos

- **Eventos Culturais**
  - Criar e participar de eventos
  - Convites compartilháveis
  - Calendário de eventos

- **Loja Colaborativa**
  - Sistema de parceiros
  - Formulário de aplicação
  - Aprovação por moderação
  - Comissão de 8%

- **Sistema de Amizades**
  - Adicionar amigos
  - Solicitações pendentes
  - Lista de amigos

## 📦 Tecnologias

- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS 4.0
- **Animações**: Motion (Framer Motion)
- **Backend**: Supabase
  - Database (PostgreSQL)
  - Authentication
  - Storage
  - Realtime
- **Icons**: Lucide React
- **Charts**: Recharts
- **Forms**: React Hook Form
- **Notifications**: Sonner

## 🛠️ Instalação Local

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn
- Conta no Supabase (grátis)

### Passo a Passo

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/clube-da-esquerda.git
cd clube-da-esquerda
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure o Supabase**

a) Crie um projeto em https://supabase.com

b) Execute o SQL do arquivo `/supabase/schema.sql` no SQL Editor do Supabase

c) Crie os buckets de Storage:
   - `images` (público)
   - `avatars` (público)
   - `videos` (público)

d) Ative Realtime em Database > Replication para:
   - `messages`
   - `posts`
   - `upvotes`

e) Copie as credenciais (Settings > API):
   - Project URL
   - anon/public key

4. **Configure as variáveis de ambiente**
```bash
cp .env.example .env
```

Edite o arquivo `.env` e adicione:
```env
VITE_SUPABASE_URL=sua-url-do-supabase
VITE_SUPABASE_ANON_KEY=sua-chave-publica
```

5. **Execute o projeto**
```bash
npm run dev
```

O site estará disponível em `http://localhost:5173`

## 🚀 Deploy para Produção

### Opção 1: Vercel (Recomendado)

1. Faça push do código para o GitHub
2. Acesse https://vercel.com
3. Importe o repositório
4. Adicione as variáveis de ambiente:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Deploy automático!

### Opção 2: Netlify

1. Conecte ao GitHub
2. Configure build:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Adicione variáveis de ambiente
4. Deploy!

## 📁 Estrutura do Projeto

```
clube-da-esquerda/
├── components/           # Componentes React
│   ├── ui/              # Componentes base (Button, Card, etc)
│   ├── CreatePostModal.tsx
│   ├── ChatWindow.tsx
│   ├── RefreshableFeed.tsx
│   └── ...
├── hooks/               # React Hooks customizados
│   ├── useAuth.ts
│   ├── usePosts.ts
│   └── useChat.ts
├── lib/                 # Bibliotecas e configurações
│   └── supabase.ts      # Cliente Supabase
├── contexts/            # Contextos React
│   └── AuthContext.tsx
├── supabase/            # Schema e migrações
│   └── schema.sql
├── styles/              # Estilos globais
│   └── globals.css
├── App.tsx              # Componente principal
└── main.tsx             # Entry point
```

## 🔐 Segurança

- ✅ Row Level Security (RLS) ativado em todas as tabelas
- ✅ Autenticação via Supabase Auth
- ✅ Validação de dados no backend
- ✅ HTTPS obrigatório em produção
- ✅ Rate limiting no Supabase
- ✅ Sanitização de inputs

## 📊 Limites (Plano Grátis)

### Supabase Free Tier
- 500 MB de banco de dados
- 1 GB de armazenamento de arquivos
- 50.000 usuários ativos/mês
- 2 GB de transferência/mês
- Projeto pausa após 7 dias de inatividade

### Vercel Free Tier
- 100 GB de transferência/mês
- Deploy ilimitados
- Domínio .vercel.app grátis

**Para maioria dos casos, é mais que suficiente!**

## 🐛 Solução de Problemas

### Erro: "supabase is not defined"
- Verifique se as variáveis de ambiente estão configuradas
- Reinicie o servidor de desenvolvimento

### Erro: "Failed to fetch"
- Verifique sua conexão com internet
- Confirme que o projeto Supabase está ativo
- Verifique as políticas RLS

### Imagens não carregam
- Verifique se os buckets são públicos
- Confirme as políticas de Storage

### Chat não funciona
- Ative Realtime no Supabase (Database > Replication)
- Aguarde 1-2 minutos após ativar

## 📈 Roadmap

### Próximas Features
- [ ] Notificações push
- [ ] Sistema de badges gamificados
- [ ] Moderação automática com IA
- [ ] App mobile (React Native)
- [ ] Dark mode
- [ ] Internacionalização
- [ ] Analytics dashboard
- [ ] Sistema de denúncias
- [ ] Grupos privados
- [ ] Live streaming

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👥 Autores

- **Clube da Esquerda** - Projeto inicial

## 🙏 Agradecimentos

- Comunidades de samba, capoeira e povos indígenas pela inspiração
- Movimento de software livre
- Todos que lutam por direitos humanos

## 📞 Suporte

- 📧 Email: contato@clubedaesquerda.com.br
- 💬 Discord: [Link do servidor]
- 🐦 Twitter: @clubedaesquerda
- 📱 Instagram: @clubedaesquerda

---

**Feito com ❤️ e luta por um Brasil mais justo e igualitário**

🌀 **Clube da Esquerda - Onde o debate é circular e a democracia é real**
