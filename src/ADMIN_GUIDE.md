# 👑 Guia de Administração - Clube da Esquerda

## 📊 Dashboard de Administração

### Acessar Supabase Dashboard

1. Acesse https://supabase.com
2. Faça login
3. Selecione seu projeto `clube-esquerda-prod`

---

## 👥 Gerenciar Usuários

### Ver Todos os Usuários

1. Supabase > **Authentication** > **Users**
2. Lista completa de usuários cadastrados

### Informações Disponíveis:
- Email
- Data de cadastro
- Último login
- Status de confirmação
- Metadata

### Ações Possíveis:

**Bloquear Usuário:**
1. Clique no usuário
2. Clique em "..." (mais opções)
3. Selecione "Ban user"
4. Confirme

**Desbloquear:**
1. Filtro: "Show banned users"
2. Selecione usuário
3. "Unban user"

**Deletar Usuário:**
1. Clique no usuário
2. "..." > "Delete user"
3. ⚠️ ATENÇÃO: Remove todos os dados associados!

**Redefinir Senha:**
1. Clique no usuário
2. "Send password recovery email"

---

## 📝 Gerenciar Conteúdo

### Moderar Posts

**Via SQL Editor:**

```sql
-- Ver todos os posts recentes
SELECT 
  p.id,
  p.content,
  p.created_at,
  u.name as author,
  u.email as author_email,
  (SELECT COUNT(*) FROM upvotes WHERE post_id = p.id) as upvotes_count
FROM posts p
LEFT JOIN users u ON p.author_id = u.id
ORDER BY p.created_at DESC
LIMIT 50;
```

**Deletar Post Inapropriado:**

```sql
-- Substituir 123 pelo ID do post
DELETE FROM posts WHERE id = 123;
```

**Ver Posts Mais Reportados:**
(Implementar sistema de denúncias primeiro)

### Aprovar Produtos de Parceiros

1. **Table Editor** > **products**
2. Filtro: `approved = false`
3. Revisar:
   - Nome do produto
   - Descrição
   - Preço
   - Empresa/Movimento
4. Se aprovar:
   - Clique no registro
   - Mude `approved` para `true`
   - Save

**SQL para aprovar:**
```sql
UPDATE products 
SET approved = true 
WHERE id = 123;
```

**SQL para rejeitar (deletar):**
```sql
DELETE FROM products WHERE id = 123;
```

---

## 📊 Analytics e Estatísticas

### Estatísticas Gerais

```sql
-- Total de usuários
SELECT COUNT(*) as total_users FROM users;

-- Usuários ativos (última semana)
SELECT COUNT(*) as active_users 
FROM users 
WHERE updated_at > NOW() - INTERVAL '7 days';

-- Total de posts
SELECT COUNT(*) as total_posts FROM posts;

-- Posts hoje
SELECT COUNT(*) as posts_today 
FROM posts 
WHERE created_at > CURRENT_DATE;

-- Comunidade mais popular
SELECT 
  c.name,
  COUNT(cm.id) as members
FROM communities c
LEFT JOIN community_members cm ON c.id = cm.community_id
GROUP BY c.id, c.name
ORDER BY members DESC
LIMIT 10;
```

### Top Usuários (mais engajados)

```sql
-- Usuários com mais posts
SELECT 
  u.name,
  u.email,
  COUNT(p.id) as total_posts,
  SUM((SELECT COUNT(*) FROM upvotes WHERE post_id = p.id)) as total_upvotes
FROM users u
LEFT JOIN posts p ON u.id = p.author_id
GROUP BY u.id, u.name, u.email
ORDER BY total_posts DESC
LIMIT 20;
```

### Posts Mais Populares

```sql
-- Top 10 posts (mais UPs)
SELECT 
  p.id,
  p.content,
  u.name as author,
  COUNT(up.id) as upvotes,
  p.created_at
FROM posts p
LEFT JOIN upvotes up ON p.id = up.post_id
LEFT JOIN users u ON p.author_id = u.id
GROUP BY p.id, u.name
ORDER BY upvotes DESC
LIMIT 10;
```

---

## 🗄️ Backup e Restauração

### Backup Automático (Supabase)

**Plano Free:**
- Backup diário (últimos 7 dias)
- Não é possível baixar

**Plano Pro:**
- Backup diário (últimos 30 dias)
- Download via dashboard
- Point-in-time recovery

### Backup Manual

1. Supabase > **Database** > **Backups**
2. Clique em **"Create backup"**
3. Aguarde processamento
4. Download (se plano Pro)

### Exportar Dados (CSV)

**Via SQL Editor:**

```sql
-- Exportar usuários
COPY (
  SELECT id, email, name, username, created_at 
  FROM users
) TO STDOUT WITH CSV HEADER;
```

**Via Table Editor:**
1. Selecione tabela
2. Clique em "..." > "Export as CSV"

---

## 🔐 Segurança

### Revisar Políticas RLS

1. **Database** > **Policies**
2. Para cada tabela, verifique:
   - Políticas estão ativas
   - Permissões corretas

### Logs de Autenticação

1. **Authentication** > **Logs**
2. Monitore:
   - Tentativas de login
   - Falhas de autenticação
   - Criação de contas

### Logs de API

1. **Logs** > **API Logs**
2. Filtros:
   - Por status code (400, 500)
   - Por método (POST, DELETE)
   - Por tabela

### Alertas de Segurança

**Configurar notificações:**

1. **Settings** > **Notifications**
2. Adicionar email de admin
3. Alertas para:
   - Uso excessivo de API
   - Erros de database
   - Falhas de autenticação

---

## 📈 Monitoramento de Performance

### Database Performance

1. **Database** > **Logs** > **Postgres Logs**
2. Procure por:
   - Queries lentas
   - Tabelas sem índices
   - Deadlocks

### Otimizar Queries Lentas

```sql
-- Ver queries mais lentas
SELECT 
  query,
  mean_exec_time,
  calls
FROM pg_stat_statements
ORDER BY mean_exec_time DESC
LIMIT 10;
```

### Verificar Tamanho do Database

```sql
-- Tamanho total
SELECT pg_size_pretty(pg_database_size(current_database()));

-- Por tabela
SELECT
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

---

## 🗑️ Limpeza e Manutenção

### Deletar Dados Antigos

**Mensagens antigas (>6 meses):**
```sql
DELETE FROM messages 
WHERE created_at < NOW() - INTERVAL '6 months';
```

**Posts sem engajamento:**
```sql
DELETE FROM posts 
WHERE created_at < NOW() - INTERVAL '1 year'
AND id NOT IN (
  SELECT DISTINCT post_id FROM upvotes
)
AND id NOT IN (
  SELECT DISTINCT post_id FROM comments
);
```

### Limpar Storage

1. **Storage** > Selecione bucket
2. Ordene por "Last modified"
3. Delete arquivos muito antigos

**SQL para listar arquivos órfãos:**
```sql
-- Posts com imagens deletadas
SELECT * FROM posts 
WHERE image_url IS NOT NULL
AND image_url NOT IN (
  SELECT name FROM storage.objects 
  WHERE bucket_id = 'images'
);
```

---

## 👨‍💼 Gerenciar Moderadores

### Criar Tabela de Moderadores

```sql
CREATE TABLE IF NOT EXISTS moderators (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'moderator', -- moderator, admin
  granted_by UUID REFERENCES users(id),
  granted_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

ALTER TABLE moderators ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Moderators can view all"
  ON moderators FOR SELECT
  USING (true);
```

### Adicionar Moderador

```sql
-- Substituir email pelo do moderador
INSERT INTO moderators (user_id, role, granted_by)
SELECT 
  id,
  'moderator',
  (SELECT id FROM users WHERE email = 'admin@exemplo.com')
FROM users 
WHERE email = 'moderador@exemplo.com';
```

---

## 📧 Gerenciar Emails

### Templates de Email

1. **Authentication** > **Email Templates**
2. Customizar:
   - Confirmação de cadastro
   - Recuperação de senha
   - Convite de usuário
   - Email de mudança

### Variáveis Disponíveis:

```html
{{ .ConfirmationURL }}  - Link de confirmação
{{ .Email }}            - Email do usuário
{{ .Token }}            - Token de verificação
{{ .SiteURL }}          - URL do site
```

### Teste de Emails

1. Cadastre usuário de teste
2. Verifique se recebe emails
3. Teste links funcionam

---

## 🚨 Procedimentos de Emergência

### Site Fora do Ar

1. **Vercel Dashboard** > Ver status
2. Se build falhou:
   - Veja logs de erro
   - Faça rollback para versão anterior
3. Se Supabase está fora:
   - Verifique status.supabase.com
   - Contate suporte

### Database Corrompido

1. Não entre em pânico
2. NÃO execute comandos aleatórios
3. Contate suporte Supabase
4. Tenha backup pronto

### Ataque ou Spam

**Identificar:**
```sql
-- Usuários criados recentemente
SELECT * FROM users 
WHERE created_at > NOW() - INTERVAL '1 hour'
ORDER BY created_at DESC;

-- Posts em massa
SELECT author_id, COUNT(*) 
FROM posts 
WHERE created_at > NOW() - INTERVAL '1 hour'
GROUP BY author_id 
HAVING COUNT(*) > 10;
```

**Ação Imediata:**
1. Banir usuários suspeitos
2. Deletar posts de spam
3. Ativar captcha (se disponível)
4. Revisar policies RLS

---

## 📊 Relatórios Periódicos

### Relatório Semanal

```sql
-- Copie e execute toda segunda-feira

-- Novos usuários (última semana)
SELECT COUNT(*) as new_users 
FROM users 
WHERE created_at > NOW() - INTERVAL '7 days';

-- Posts criados
SELECT COUNT(*) as new_posts 
FROM posts 
WHERE created_at > NOW() - INTERVAL '7 days';

-- Engajamento (UPs dados)
SELECT COUNT(*) as upvotes_given 
FROM upvotes 
WHERE created_at > NOW() - INTERVAL '7 days';

-- Mensagens enviadas
SELECT COUNT(*) as messages_sent 
FROM messages 
WHERE created_at > NOW() - INTERVAL '7 days';
```

### Relatório Mensal

```sql
-- Crescimento de usuários
SELECT 
  DATE_TRUNC('month', created_at) as month,
  COUNT(*) as new_users
FROM users
WHERE created_at > NOW() - INTERVAL '12 months'
GROUP BY month
ORDER BY month;

-- Retenção de usuários
SELECT 
  COUNT(DISTINCT user_id) as active_users
FROM posts
WHERE created_at > NOW() - INTERVAL '30 days';
```

---

## 🎯 Metas e KPIs

### KPIs Recomendados:

1. **DAU (Daily Active Users)**
   - Meta inicial: 50 usuários/dia
   - Meta 6 meses: 500 usuários/dia

2. **Posts por Dia**
   - Meta inicial: 20 posts/dia
   - Meta 6 meses: 200 posts/dia

3. **Taxa de Engajamento**
   - Meta: >40% (usuários que interagem)

4. **Retenção (7 dias)**
   - Meta: >30% voltam após 7 dias

### Tracking de Metas

```sql
-- DAU (hoje)
SELECT COUNT(DISTINCT author_id) 
FROM posts 
WHERE created_at > CURRENT_DATE;

-- Posts hoje
SELECT COUNT(*) 
FROM posts 
WHERE created_at > CURRENT_DATE;

-- Taxa de engajamento (30 dias)
SELECT 
  ROUND(
    100.0 * COUNT(DISTINCT user_id) / (SELECT COUNT(*) FROM users),
    2
  ) as engagement_rate
FROM (
  SELECT author_id as user_id FROM posts 
  WHERE created_at > NOW() - INTERVAL '30 days'
  UNION
  SELECT user_id FROM upvotes 
  WHERE created_at > NOW() - INTERVAL '30 days'
  UNION
  SELECT sender_id as user_id FROM messages 
  WHERE created_at > NOW() - INTERVAL '30 days'
) as active_users;
```

---

## ✅ Checklist de Manutenção

### Diária:
- [ ] Verificar logs de erro
- [ ] Revisar novos usuários
- [ ] Moderar posts reportados

### Semanal:
- [ ] Gerar relatório semanal
- [ ] Revisar solicitações de parceiros
- [ ] Backup manual (se necessário)
- [ ] Limpar spam

### Mensal:
- [ ] Gerar relatório mensal
- [ ] Revisar KPIs
- [ ] Otimizar database
- [ ] Revisar custos
- [ ] Atualizar dependências

### Trimestral:
- [ ] Revisar políticas de privacidade
- [ ] Atualizar termos de uso
- [ ] Planejar novas features
- [ ] Pesquisa de satisfação

---

## 📞 Suporte

### Supabase Support
- Dashboard > Help
- support@supabase.io
- Discord: https://discord.supabase.com

### Vercel Support
- Dashboard > Help
- vercel.com/support

### Comunidade
- Stack Overflow
- GitHub Issues
- Discord da comunidade

---

**Última atualização**: Dezembro 2025  
**Versão**: 1.0
