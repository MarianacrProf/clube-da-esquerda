# 🚀 Guia de Deploy - Clube da Esquerda

## ✅ Checklist Pré-Deploy

Antes de fazer deploy, certifique-se de que:

- [ ] Todas as dependências estão instaladas (`npm install`)
- [ ] O projeto roda localmente sem erros (`npm run dev`)
- [ ] Variáveis de ambiente estão configuradas
- [ ] Banco de dados Supabase está criado e populado
- [ ] Storage buckets estão criados e configurados
- [ ] Realtime está ativado nas tabelas necessárias
- [ ] Código está commitado no Git

---

## 🗄️ PARTE 1: Configurar Supabase (30 minutos)

### 1.1 Criar Projeto

1. Acesse https://supabase.com
2. Clique em "New Project"
3. Preencha:
   - **Name**: `clube-esquerda-prod`
   - **Database Password**: Crie uma senha forte e **SALVE**
   - **Region**: `South America (São Paulo)`
   - **Pricing**: `Free` ou `Pro` (se precisar de mais recursos)
4. Aguarde 2-3 minutos

### 1.2 Executar Schema SQL

1. No Supabase, vá em **SQL Editor**
2. Clique em **"New query"**
3. Copie todo o conteúdo do arquivo `/supabase/schema.sql`
4. Cole no editor
5. Clique em **"Run"** (ou F5)
6. Aguarde execução (~30 segundos)
7. Deve aparecer: ✅ "Success. No rows returned"

### 1.3 Criar Buckets de Storage

1. Vá em **Storage** (menu lateral)
2. Clique em **"Create bucket"**

**Bucket 1: images**
- Name: `images`
- ✅ Public bucket
- Clique "Create"

**Bucket 2: avatars**
- Name: `avatars`
- ✅ Public bucket
- Clique "Create"

**Bucket 3: videos**
- Name: `videos`
- ✅ Public bucket
- Clique "Create"

### 1.4 Configurar Políticas de Storage

Para cada bucket criado:

1. Clique no bucket
2. Vá em **"Policies"**
3. Clique em **"New Policy"**

**Política 1: Public Read**
- Template: "Allow public read access"
- Review → Save

**Política 2: Authenticated Upload**
- Template: "Allow authenticated uploads"
- Review → Save

Repita para os 3 buckets!

### 1.5 Ativar Realtime

1. Vá em **Database** > **Replication**
2. Encontre as tabelas:
   - `messages`
   - `posts`
   - `upvotes`
3. Para cada uma, clique no toggle para **ATIVAR**
4. Aguarde 1-2 minutos para propagar

### 1.6 Configurar Authentication

1. Vá em **Authentication** > **Providers**
2. Email:
   - ✅ Enable Email provider
   - ✅ Confirm email (opcional)
   - Save

3. Vá em **Authentication** > **URL Configuration**
4. Adicione (vamos atualizar depois do deploy):
   - Site URL: `http://localhost:5173` (temporário)
   - Redirect URLs: `http://localhost:5173/auth/callback`

### 1.7 Pegar Credenciais

1. Vá em **Settings** > **API**
2. Copie e **SALVE EM LOCAL SEGURO**:

```
Project URL: https://xxxxx.supabase.co
anon/public key: eyJhbGc...
```

---

## 🌐 PARTE 2: Deploy na Vercel (15 minutos)

### 2.1 Preparar Repositório GitHub

1. Crie repositório no GitHub:
   - Nome: `clube-da-esquerda`
   - ✅ Public ou Private
   - ❌ NÃO adicione README, .gitignore, license

2. No seu terminal, na pasta do projeto:

```bash
# Inicializar Git (se ainda não fez)
git init

# Adicionar todos os arquivos
git add .

# Fazer commit
git commit -m "Deploy inicial - Clube da Esquerda"

# Adicionar remote
git remote add origin https://github.com/seu-usuario/clube-da-esquerda.git

# Push
git push -u origin main
```

### 2.2 Conectar Vercel

1. Acesse https://vercel.com
2. Clique em **"Add New..."** > **"Project"**
3. Importe do GitHub:
   - Se primeira vez, autorize Vercel no GitHub
   - Selecione `clube-da-esquerda`
4. Clique em **"Import"**

### 2.3 Configurar Projeto

Na tela de configuração:

**Framework Preset**: 
- Vercel detecta automaticamente: `Vite`

**Root Directory**: 
- Deixe `./`

**Build Command**:
- `npm run build` (já vem preenchido)

**Output Directory**:
- `dist` (já vem preenchido)

**Install Command**:
- `npm install` (já vem preenchido)

### 2.4 Adicionar Environment Variables

Clique em **"Environment Variables"**

**Variável 1:**
```
Name:  VITE_SUPABASE_URL
Value: https://xxxxx.supabase.co
```

**Variável 2:**
```
Name:  VITE_SUPABASE_ANON_KEY
Value: eyJhbGc... (sua chave pública)
```

✅ Marque "Production", "Preview", "Development"

### 2.5 Deploy!

1. Clique em **"Deploy"**
2. Aguarde 2-5 minutos
3. 🎉 Quando terminar, verá confetes!
4. Clique em **"Visit"**

### 2.6 Pegar URL do Site

A URL será algo como:
```
https://clube-da-esquerda.vercel.app
```

**COPIE E SALVE ESSA URL!**

---

## 🔗 PARTE 3: Atualizar Configurações (5 minutos)

### 3.1 Atualizar Authentication URLs no Supabase

1. Volte ao Supabase
2. Vá em **Authentication** > **URL Configuration**
3. Atualize:

**Site URL:**
```
https://clube-da-esquerda.vercel.app
```

**Redirect URLs** (adicione todas):
```
https://clube-da-esquerda.vercel.app
https://clube-da-esquerda.vercel.app/auth/callback
https://*.vercel.app/auth/callback
```

4. Salve

### 3.2 Testar CORS

Se tiver problemas de CORS:

1. Supabase > **Settings** > **API**
2. Em "API Settings" > "Additional Settings"
3. Adicione domínio da Vercel nas "Allowed origins"

---

## ✅ PARTE 4: Testes Pós-Deploy (10 minutos)

### 4.1 Teste de Cadastro

1. Acesse seu site na Vercel
2. Clique em "Cadastrar"
3. Preencha dados
4. Verifique email de confirmação
5. Confirme e faça login

### 4.2 Teste de Post

1. Faça login
2. Clique no botão verde flutuante (criar post)
3. Escreva algo e publique
4. Verifique se aparece no feed

### 4.3 Teste de UP!

1. Clique em "UP!" em um post
2. Contador deve aumentar
3. Botão deve ficar colorido
4. Clique novamente para desfazer

### 4.4 Teste de Upload de Imagem

1. Crie novo post
2. Adicione uma imagem
3. Publique
4. Verifique se imagem aparece

### 4.5 Teste de Chat

1. Crie dois usuários (use emails diferentes)
2. Em um, envie mensagem
3. No outro, verifique se recebe
4. Responda e veja em tempo real

---

## 🎨 PARTE 5: Personalização (Opcional)

### 5.1 Domínio Personalizado

**Se você tem um domínio:**

1. Na Vercel, vá em seu projeto
2. **Settings** > **Domains**
3. Clique em **"Add"**
4. Digite seu domínio: `clubedaesquerda.com.br`
5. Siga instruções para configurar DNS
6. Aguarde propagação (até 48h)

**Configuração DNS:**
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### 5.2 Email Personalizado

Configure em **Authentication** > **Email Templates**:

- Personalizar cores
- Adicionar logo
- Textos personalizados

---

## 📊 PARTE 6: Monitoramento

### 6.1 Vercel Analytics

1. No projeto Vercel > **Analytics**
2. Clique em **"Enable"**
3. Grátis até 100k pageviews/mês

### 6.2 Supabase Logs

1. Supabase > **Logs**
2. Monitore:
   - API requests
   - Database queries
   - Errors

### 6.3 Alerts

Configure em Supabase > **Settings** > **Billing**:
- Alert em 80% de uso
- Email de notificação

---

## 🔄 PARTE 7: Atualizações Futuras

### Como fazer deploy de atualizações:

```bash
# 1. Fazer mudanças no código
# 2. Commit
git add .
git commit -m "Descrição da atualização"

# 3. Push
git push origin main

# 4. Vercel faz deploy AUTOMÁTICO! 🎉
```

### Rollback (voltar versão):

1. Vercel > Projeto > **Deployments**
2. Encontre deployment anterior
3. Clique "..." > **"Promote to Production"**

---

## 🐛 Troubleshooting

### Problema: Build falha na Vercel

**Solução:**
1. Verifique logs na Vercel
2. Procure erros em vermelho
3. Geralmente é:
   - Dependência faltando
   - Erro de TypeScript
   - Variável de ambiente faltando

### Problema: Página branca após deploy

**Solução:**
1. Abra DevTools (F12)
2. Veja erros no Console
3. Geralmente é:
   - Variáveis de ambiente não configuradas
   - CORS não configurado

### Problema: "Failed to fetch" em produção

**Solução:**
1. Verifique variáveis de ambiente na Vercel
2. Confirme que Supabase permite origem da Vercel
3. Verifique RLS policies no Supabase

### Problema: Imagens não carregam

**Solução:**
1. Supabase > Storage
2. Verifique se buckets são "Public"
3. Verifique policies (read public)

### Problema: Chat não funciona

**Solução:**
1. Supabase > Database > Replication
2. Certifique Realtime está ATIVO
3. Aguarde 1-2 minutos
4. Force refresh do site (Ctrl+Shift+R)

---

## 💰 Custos Estimados

### Grátis (até ~1000 usuários ativos):
- Vercel: **R$ 0/mês**
- Supabase: **R$ 0/mês**
- **Total: R$ 0/mês** ✅

### Médio (1000-5000 usuários):
- Vercel Pro: **~R$ 100/mês**
- Supabase Pro: **~R$ 125/mês**
- **Total: ~R$ 225/mês**

### Grande (10000+ usuários):
- Vercel Pro: **~R$ 100/mês**
- Supabase Pro: **~R$ 125/mês**
- Add-ons: **~R$ 250/mês**
- **Total: ~R$ 475/mês**

---

## 📈 Próximos Passos

### Semana 1:
- [ ] Testar todas as funcionalidades
- [ ] Convidar 10-20 beta testers
- [ ] Coletar feedback

### Semana 2-4:
- [ ] Corrigir bugs reportados
- [ ] Adicionar analytics
- [ ] Configurar domínio próprio

### Mês 2-3:
- [ ] Adicionar mais features
- [ ] Expandir base de usuários
- [ ] Considerar upgrade se necessário

---

## ✅ Checklist Final

- [ ] Supabase criado e configurado
- [ ] Schema SQL executado
- [ ] Storage buckets criados
- [ ] Realtime ativado
- [ ] Authentication configurado
- [ ] Código no GitHub
- [ ] Deploy na Vercel feito
- [ ] Variáveis de ambiente adicionadas
- [ ] URLs atualizadas no Supabase
- [ ] Todos os testes passaram
- [ ] Site acessível publicamente
- [ ] Monitoramento ativo

---

## 🎉 Parabéns!

**Seu site está NO AR e FUNCIONANDO em produção!** 🚀

Agora é só compartilhar e crescer sua comunidade!

---

**Última atualização**: Dezembro 2025  
**Tempo total de deploy**: ~1 hora  
**Custo inicial**: R$ 0 (100% grátis)
