# ✅ CHECKLIST FINAL - CLUBE DA ESQUERDA

## 🎯 Use este documento para garantir que tudo está configurado corretamente

---

## 📋 FASE 1: PREPARAÇÃO (Antes de Começar)

### Documentação
- [ ] Li o **INDEX.md** (para saber por onde começar)
- [ ] Li o **PROJETO_COMPLETO.md** (entender o projeto)
- [ ] Li o **DEPLOY.md** (guia de deploy)
- [ ] Tenho acesso a um email válido
- [ ] Tenho conexão estável com internet

### Contas Necessárias
- [ ] Criei conta no **GitHub** (https://github.com)
- [ ] Criei conta no **Supabase** (https://supabase.com)
- [ ] Criei conta na **Vercel** (https://vercel.com)
- [ ] Anotei todas as senhas em local seguro

---

## 📦 FASE 2: CONFIGURAÇÃO DO CÓDIGO

### Arquivos do Projeto
- [ ] Tenho todos os arquivos do projeto
- [ ] Verifiquei que existe `package.json`
- [ ] Verifiquei que existe `App.tsx`
- [ ] Verifiquei que existe `/components` folder
- [ ] Verifiquei que existe `/supabase/schema.sql`

### Variáveis de Ambiente
- [ ] Copiei `.env.example` para `.env`
- [ ] **NÃO** commitei o arquivo `.env` no Git
- [ ] `.env` está listado no `.gitignore`

---

## 🗄️ FASE 3: SUPABASE (Backend)

### Criar Projeto
- [ ] Projeto Supabase criado
- [ ] Nome do projeto: `clube-esquerda-prod` (ou similar)
- [ ] Região: **South America (São Paulo)**
- [ ] Senha do database anotada e salva
- [ ] Projeto está ativo (ícone verde)

### Executar Schema SQL
- [ ] Abri **SQL Editor** no Supabase
- [ ] Copiei TODO o conteúdo de `/supabase/schema.sql`
- [ ] Colei no editor
- [ ] Executei (cliquei "Run" ou F5)
- [ ] Recebi mensagem de sucesso ✅
- [ ] Verifiquei em **Table Editor** que as tabelas foram criadas:
  - [ ] users
  - [ ] posts
  - [ ] upvotes
  - [ ] messages
  - [ ] communities
  - [ ] community_members
  - [ ] events
  - [ ] event_participants
  - [ ] products
  - [ ] comments
  - [ ] friendships

### Storage (Buckets)
- [ ] Abri **Storage** no menu lateral
- [ ] Criei bucket `images`:
  - [ ] Nome: `images`
  - [ ] ✅ Public bucket marcado
  - [ ] Policies criadas (read public + authenticated upload)
- [ ] Criei bucket `avatars`:
  - [ ] Nome: `avatars`
  - [ ] ✅ Public bucket marcado
  - [ ] Policies criadas
- [ ] Criei bucket `videos`:
  - [ ] Nome: `videos`
  - [ ] ✅ Public bucket marcado
  - [ ] Policies criadas

### Realtime
- [ ] Fui em **Database** > **Replication**
- [ ] Ativei Realtime para:
  - [ ] `messages`
  - [ ] `posts`
  - [ ] `upvotes`
- [ ] Aguardei 1-2 minutos para propagar

### Authentication
- [ ] Fui em **Authentication** > **Providers**
- [ ] Email provider está ativado ✅
- [ ] (Opcional) Confirm email está ativado
- [ ] Salvei as configurações

### Credenciais
- [ ] Fui em **Settings** > **API**
- [ ] Copiei **Project URL**: `https://xxxxx.supabase.co`
- [ ] Copiei **anon/public key**: `eyJhbGc...`
- [ ] SALVEI ambos em local seguro (não perder!)

---

## 🌐 FASE 4: GITHUB

### Repositório
- [ ] Criei repositório no GitHub
- [ ] Nome: `clube-da-esquerda` (ou similar)
- [ ] Tipo: Public ou Private (sua escolha)
- [ ] **NÃO** adicionei README/gitignore (já temos)

### Upload do Código
**Opção A - GitHub Web:**
- [ ] Cliquei "Upload files"
- [ ] Arrastei TODOS os arquivos
- [ ] Commit message: "Deploy inicial"
- [ ] Cliquei "Commit"

**Opção B - Git CLI:**
```bash
- [ ] Executei: git init
- [ ] Executei: git add .
- [ ] Executei: git commit -m "Deploy inicial"
- [ ] Executei: git remote add origin [URL-DO-SEU-REPO]
- [ ] Executei: git push -u origin main
```

### Verificação
- [ ] Vejo todos os arquivos no GitHub
- [ ] Vejo pastas: `components`, `hooks`, `lib`, `supabase`
- [ ] Vejo arquivos: `package.json`, `App.tsx`, `README.md`

---

## 🚀 FASE 5: VERCEL (Deploy)

### Importar Projeto
- [ ] Fui em https://vercel.com
- [ ] Cliquei "Add New..." > "Project"
- [ ] Autorizei Vercel a acessar GitHub (se primeira vez)
- [ ] Encontrei meu repositório `clube-da-esquerda`
- [ ] Cliquei "Import"

### Configuração
- [ ] Framework Preset: `Vite` (detectado automaticamente)
- [ ] Root Directory: `./`
- [ ] Build Command: `npm run build`
- [ ] Output Directory: `dist`
- [ ] Install Command: `npm install`

### Environment Variables
- [ ] Cliquei em "Environment Variables"
- [ ] Adicionei variável 1:
  - [ ] Name: `VITE_SUPABASE_URL`
  - [ ] Value: [colei a Project URL do Supabase]
  - [ ] ✅ Marcado: Production, Preview, Development
- [ ] Adicionei variável 2:
  - [ ] Name: `VITE_SUPABASE_ANON_KEY`
  - [ ] Value: [colei a anon key do Supabase]
  - [ ] ✅ Marcado: Production, Preview, Development

### Deploy
- [ ] Cliquei "Deploy"
- [ ] Aguardei 2-5 minutos
- [ ] Vi confetes/celebração 🎉
- [ ] Cliquei "Visit" ou "View Deployment"
- [ ] **ANOTEI A URL**: `https://xxxxx.vercel.app`

### Verificação do Deploy
- [ ] Site abre sem erros
- [ ] Vejo a página inicial do Clube da Esquerda
- [ ] Vejo o menu circular
- [ ] Vejo botão "Cadastrar" / "Entrar"
- [ ] Console do navegador (F12) sem erros críticos

---

## 🔗 FASE 6: INTEGRAÇÃO (Conectar Tudo)

### Atualizar URLs no Supabase
- [ ] Voltei ao Supabase
- [ ] Fui em **Authentication** > **URL Configuration**
- [ ] Atualizei **Site URL**: [URL da Vercel]
- [ ] Atualizei **Redirect URLs**:
  - [ ] Adicionei: `https://[seu-site].vercel.app`
  - [ ] Adicionei: `https://[seu-site].vercel.app/auth/callback`
  - [ ] Adicionei: `https://*.vercel.app/auth/callback`
- [ ] Salvei

### CORS (se necessário)
- [ ] Supabase > **Settings** > **API**
- [ ] Em "Additional Settings"
- [ ] Adicionei domínio Vercel nas "Allowed origins"
- [ ] Salvei

---

## ✅ FASE 7: TESTES COMPLETOS

### Teste 1: Cadastro de Usuário
- [ ] Abri o site da Vercel
- [ ] Cliquei em "Cadastrar"
- [ ] Preenchi:
  - [ ] Email válido
  - [ ] Senha forte
  - [ ] Nome completo
  - [ ] Username
- [ ] Cliquei "Cadastrar"
- [ ] Recebi email de confirmação
- [ ] Confirmei email (cliquei no link)
- [ ] Fui redirecionado para o site

### Teste 2: Login
- [ ] Cliquei em "Entrar"
- [ ] Digitei email e senha
- [ ] Consegui fazer login ✅
- [ ] Vejo meu nome no perfil
- [ ] Vejo badge "Beta Tester"

### Teste 3: Criar Post
- [ ] Cliquei no botão verde flutuante (canto direito)
- [ ] Modal "Criar Publicação" abriu
- [ ] Escrevi um texto de teste
- [ ] (Opcional) Adicionei uma imagem
- [ ] Cliquei "Publicar"
- [ ] Post apareceu no feed
- [ ] Vejo meu nome como autor

### Teste 4: Sistema UP!
- [ ] Encontrei um post no feed
- [ ] Cliquei em "⬆️ UP!"
- [ ] Botão mudou para "🔥 UP! ✨"
- [ ] Contador aumentou
- [ ] Cliquei novamente
- [ ] Botão voltou ao normal
- [ ] Contador diminuiu

### Teste 5: Upload de Imagem
- [ ] Criei novo post
- [ ] Cliquei em "Imagens"
- [ ] Selecionei uma foto do computador
- [ ] Preview apareceu
- [ ] Publiquei
- [ ] Imagem aparece no feed

### Teste 6: Chat (precisa 2 usuários)
**Usuário 1:**
- [ ] Fiz logout
- [ ] Cadastrei novo usuário (email diferente)
- [ ] Fiz login

**Usuário 2:**
- [ ] Abri site em aba anônima (Ctrl+Shift+N)
- [ ] Fiz login com primeiro usuário
- [ ] Enviei mensagem para segundo usuário
- [ ] Mensagem foi enviada

**Verificação:**
- [ ] Voltei para Usuário 1
- [ ] Recebi mensagem em tempo real
- [ ] Consegui responder

### Teste 7: Navegação
- [ ] Cliquei no menu circular
- [ ] Todas as opções funcionam:
  - [ ] Roda Principal
  - [ ] Perfil
  - [ ] Conversas
  - [ ] Comunidades
  - [ ] Eventos
  - [ ] Loja

---

## 📊 FASE 8: VERIFICAÇÃO ADMINISTRATIVA

### Supabase Dashboard
- [ ] Fui em **Table Editor**
- [ ] Vejo dados nas tabelas:
  - [ ] `users` - tem pelo menos 1 usuário (eu)
  - [ ] `posts` - tem os posts de teste
  - [ ] `upvotes` - tem os upvotes que dei
  - [ ] `communities` - tem as 14 comunidades padrão

### Logs
- [ ] Supabase > **Logs** > **API Logs**
- [ ] Vejo requisições acontecendo
- [ ] Não vejo muitos erros (4xx, 5xx)

### Storage
- [ ] Supabase > **Storage** > `images`
- [ ] Vejo as imagens que fiz upload
- [ ] Cliquei em uma imagem
- [ ] Consegui visualizar

---

## 🎯 FASE 9: OTIMIZAÇÕES (Opcional mas Recomendado)

### Performance
- [ ] Vercel > Projeto > **Analytics** (ativei)
- [ ] Vercel > **Speed Insights** (ativei se disponível)

### Dados Iniciais
- [ ] Executei `/supabase/seed-data.sql` (dados de exemplo)
- [ ] Vejo comunidades populadas
- [ ] Vejo eventos de exemplo

### Email Templates
- [ ] Supabase > **Authentication** > **Email Templates**
- [ ] Personalizei email de confirmação (opcional)
- [ ] Adicionei logo/cores do projeto (opcional)

### Domínio Personalizado (Opcional)
- [ ] Comprei domínio (ex: clubedaesquerda.com.br)
- [ ] Vercel > **Settings** > **Domains**
- [ ] Adicionei domínio personalizado
- [ ] Configurei DNS
- [ ] Aguardei propagação (até 48h)

---

## 📚 FASE 10: DOCUMENTAÇÃO E PRÓXIMOS PASSOS

### Documentação Lida
- [ ] Li **ADMIN_GUIDE.md** (como administrar)
- [ ] Li **IMPLEMENTED_FEATURES.md** (o que tem pronto)
- [ ] Salvei todos os arquivos .md importantes

### Backup
- [ ] Anotei todas as credenciais em local seguro:
  - [ ] Senha GitHub
  - [ ] Senha Supabase
  - [ ] Senha Vercel
  - [ ] Database password Supabase
  - [ ] Project URL
  - [ ] Anon Key
  - [ ] URL do site

### Monitoramento
- [ ] Configurei email para alertas (Supabase)
- [ ] Ativei notificações Vercel (deploy falhos)

### Planejamento
- [ ] Defini próximos passos:
  - [ ] Convidar beta testers (quando?)
  - [ ] Divulgação inicial (onde?)
  - [ ] Primeira meta de usuários (quantos?)

---

## 🎉 CHECKLIST FINAL

### Confirmação Geral
- [ ] ✅ Site está no ar e acessível
- [ ] ✅ Backend (Supabase) funcionando
- [ ] ✅ Frontend (Vercel) funcionando
- [ ] ✅ Cadastro funciona
- [ ] ✅ Login funciona
- [ ] ✅ Posts funcionam
- [ ] ✅ Upload de imagens funciona
- [ ] ✅ Sistema UP! funciona
- [ ] ✅ Chat funciona
- [ ] ✅ Navegação funciona

### Pronto para Produção?
- [ ] ✅ Todos os testes passaram
- [ ] ✅ Não há erros críticos
- [ ] ✅ Performance está boa (carrega rápido)
- [ ] ✅ Mobile funciona bem
- [ ] ✅ Tenho backups/credenciais salvas

---

## 🚨 SE ALGO NÃO FUNCIONOU

### Erros Comuns

**Problema: Build falha na Vercel**
- [ ] Revisei logs de erro na Vercel
- [ ] Verifiquei se variáveis de ambiente estão corretas
- [ ] Tentei redeploy

**Problema: "Failed to fetch"**
- [ ] Verifiquei variáveis de ambiente
- [ ] Verifiquei URLs no Supabase (Authentication > URL Config)
- [ ] Limpei cache do navegador (Ctrl+Shift+Delete)

**Problema: Imagens não carregam**
- [ ] Verifiquei se buckets são Public
- [ ] Verifiquei policies de Storage
- [ ] Tentei upload novamente

**Problema: Chat não funciona**
- [ ] Verifiquei se Realtime está ativo
- [ ] Aguardei 2 minutos
- [ ] Fiz refresh do site (Ctrl+F5)

### Onde Buscar Ajuda
- [ ] Li **DEPLOY.md** > Seção "Solução de Problemas"
- [ ] Li **ADMIN_GUIDE.md** > Seção "Procedimentos de Emergência"
- [ ] Consultei logs do Supabase
- [ ] Consultei logs da Vercel

---

## 📅 PÓS-LANÇAMENTO

### Primeira Semana
- [ ] Monitorar erros diariamente
- [ ] Coletar feedback de usuários
- [ ] Corrigir bugs críticos
- [ ] Adicionar conteúdo inicial

### Primeiro Mês
- [ ] Revisar analytics
- [ ] Ajustar com base em uso real
- [ ] Planejar novas features
- [ ] Considerar upgrade (se necessário)

---

## 🎊 PARABÉNS!

Se você marcou TODOS os itens acima:

✅ **SEU SITE ESTÁ NO AR E FUNCIONANDO!**

🎉 **VOCÊ CONSEGUIU!**

Agora é só compartilhar e construir sua comunidade!

---

**Última atualização**: Dezembro 2025  
**Use este checklist como guia de referência**  
**Salve para consultas futuras**

**BOA SORTE! 🚀**
