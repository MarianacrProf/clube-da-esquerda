-- ============================================
-- CLUBE DA ESQUERDA - DADOS DE EXEMPLO (SEED)
-- ============================================
-- Execute este SQL APÓS criar o schema principal
-- Para popular o banco com dados de teste/demonstração

-- ============================================
-- 1. DADOS DE EXEMPLO PARA COMUNIDADES
-- ============================================

INSERT INTO communities (name, description, icon, category) VALUES
  ('Música Popular Brasileira', 'Discussões sobre MPB, samba, forró e outros ritmos brasileiros', '🎵', 'Cultura'),
  ('Poesia e Literatura', 'Espaço para poetas, escritores e amantes da palavra escrita', '📚', 'Cultura'),
  ('Filosofia Política', 'Debates profundos sobre teoria política e filosofia', '🧠', 'Política'),
  ('Meio Ambiente e Sustentabilidade', 'Discussões sobre ecologia, clima e futuro do planeta', '🌱', 'Meio Ambiente'),
  ('Direitos Humanos', 'Luta pelos direitos fundamentais de todos os seres humanos', '✊', 'Direitos'),
  ('Arte e Cultura Periférica', 'Expressões artísticas das periferias brasileiras', '🎨', 'Cultura'),
  ('Educação Popular', 'Educação libertadora e transformadora', '📖', 'Educação'),
  ('Economia Solidária', 'Alternativas econômicas baseadas na cooperação', '🤝', 'Economia'),
  ('Feminismo e Equidade', 'Luta pela igualdade de gênero e direitos das mulheres', '♀️', 'Direitos'),
  ('Movimento Negro', 'Combate ao racismo e valorização da cultura negra', '✊🏿', 'Direitos'),
  ('LGBTQIA+', 'Comunidade e luta pelos direitos LGBT+', '🏳️‍🌈', 'Direitos'),
  ('Saúde Pública e SUS', 'Defesa e discussão sobre saúde pública universal', '🏥', 'Saúde'),
  ('Reforma Agrária', 'Luta pela terra e agricultura familiar', '🌾', 'Política'),
  ('Comunicação Popular', 'Mídia alternativa e democratização da comunicação', '📡', 'Comunicação')
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- 2. EVENTOS CULTURAIS DE EXEMPLO
-- ============================================
-- NOTA: Você precisará ter pelo menos um usuário criado
-- para usar como created_by. Ajuste o UUID abaixo.

-- Primeiro, vamos criar uma função helper para pegar um usuário aleatório
CREATE OR REPLACE FUNCTION get_random_user()
RETURNS UUID AS $$
  SELECT id FROM users ORDER BY RANDOM() LIMIT 1;
$$ LANGUAGE SQL;

-- Agora inserir eventos (só funciona se houver usuários)
-- Se não houver usuários, estes INSERTs falharão - tudo bem, são opcionais

DO $$
DECLARE
  sample_user UUID;
BEGIN
  -- Tentar pegar um usuário
  SELECT id INTO sample_user FROM users LIMIT 1;
  
  -- Se existir usuário, inserir eventos
  IF sample_user IS NOT NULL THEN
    INSERT INTO events (title, description, image_url, date, location, created_by) VALUES
      (
        'Roda de Samba da Resistência',
        'Encontro mensal para celebrar a cultura do samba e a resistência popular. Traga seu instrumento!',
        'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800',
        NOW() + INTERVAL '7 days',
        'Praça da República, Centro - SP',
        sample_user
      ),
      (
        'Sarau de Poesia Periférica',
        'Espaço aberto para poetas e artistas das periferias compartilharem suas obras.',
        'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800',
        NOW() + INTERVAL '10 days',
        'Casa de Cultura, Zona Leste - SP',
        sample_user
      ),
      (
        'Debate: Futuro da Educação Pública',
        'Mesa redonda com educadores discutindo os desafios da educação no Brasil.',
        'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800',
        NOW() + INTERVAL '14 days',
        'Auditório da USP - SP',
        sample_user
      ),
      (
        'Mutirão de Plantio de Árvores',
        'Ação coletiva de reflorestamento urbano. Vamos plantar 100 mudas!',
        'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800',
        NOW() + INTERVAL '21 days',
        'Parque do Carmo - SP',
        sample_user
      ),
      (
        'Festival de Cinema da Periferia',
        'Mostra de curtas produzidos por coletivos de audiovisual das periferias.',
        'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800',
        NOW() + INTERVAL '30 days',
        'Cine Belas Artes - SP',
        sample_user
      ),
      (
        'Oficina de Capoeira Angola',
        'Aula aberta de capoeira angola com mestre convidado.',
        'https://images.unsplash.com/photo-1587328920146-76e440d4b3a8?w=800',
        NOW() + INTERVAL '5 days',
        'Praça do Pôr do Sol - SP',
        sample_user
      ),
      (
        'Feirinha de Economia Solidária',
        'Produtos artesanais, orgânicos e de cooperativas populares.',
        'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800',
        NOW() + INTERVAL '3 days',
        'Largo da Batata - SP',
        sample_user
      );
  END IF;
END $$;

-- ============================================
-- 3. POSTS DE EXEMPLO
-- ============================================
-- Também precisa de usuário existente

DO $$
DECLARE
  sample_user UUID;
BEGIN
  SELECT id INTO sample_user FROM users LIMIT 1;
  
  IF sample_user IS NOT NULL THEN
    INSERT INTO posts (author_id, content, image_url) VALUES
      (
        sample_user,
        'Que alegria ver tantas pessoas engajadas na luta por direitos! Juntos somos mais fortes. ✊',
        'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800'
      ),
      (
        sample_user,
        'Acabei de participar de uma roda de conversa incrível sobre educação popular. A troca foi muito rica! 📚',
        'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800'
      ),
      (
        sample_user,
        'Plantamos 50 mudas hoje na comunidade! Cada árvore é um futuro mais verde para nossas crianças. 🌳💚',
        'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800'
      ),
      (
        sample_user,
        'Lembrete importante: a luta antirracista é de todos nós. Racismo não é opinião, é crime.',
        NULL
      ),
      (
        sample_user,
        'Que lindo ver a cultura periférica ganhando mais espaço! A arte sempre foi nossa forma de resistência. 🎨',
        'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800'
      );
  END IF;
END $$;

-- ============================================
-- 4. CONFIGURAÇÕES ÚTEIS
-- ============================================

-- Atualizar contador de membros nas comunidades
-- (será calculado dinamicamente em produção)

UPDATE communities c
SET members_count = (
  SELECT COUNT(*) 
  FROM community_members cm 
  WHERE cm.community_id = c.id
);

-- ============================================
-- 5. FUNÇÕES ÚTEIS PARA ADMINISTRAÇÃO
-- ============================================

-- Função para obter estatísticas gerais
CREATE OR REPLACE FUNCTION get_platform_stats()
RETURNS JSON AS $$
  SELECT json_build_object(
    'total_users', (SELECT COUNT(*) FROM users),
    'total_posts', (SELECT COUNT(*) FROM posts),
    'total_communities', (SELECT COUNT(*) FROM communities),
    'total_events', (SELECT COUNT(*) FROM events),
    'total_messages', (SELECT COUNT(*) FROM messages),
    'active_users_7d', (
      SELECT COUNT(DISTINCT author_id) 
      FROM posts 
      WHERE created_at > NOW() - INTERVAL '7 days'
    ),
    'posts_today', (
      SELECT COUNT(*) 
      FROM posts 
      WHERE created_at > CURRENT_DATE
    )
  );
$$ LANGUAGE SQL;

-- Uso: SELECT get_platform_stats();

-- Função para obter top posts
CREATE OR REPLACE FUNCTION get_top_posts(limit_count INT DEFAULT 10)
RETURNS TABLE (
  post_id BIGINT,
  content TEXT,
  author_name TEXT,
  upvotes_count BIGINT,
  created_at TIMESTAMPTZ
) AS $$
  SELECT 
    p.id,
    p.content,
    u.name,
    COUNT(up.id) as upvotes_count,
    p.created_at
  FROM posts p
  LEFT JOIN upvotes up ON p.id = up.post_id
  LEFT JOIN users u ON p.author_id = u.id
  GROUP BY p.id, u.name
  ORDER BY upvotes_count DESC
  LIMIT limit_count;
$$ LANGUAGE SQL;

-- Uso: SELECT * FROM get_top_posts(5);

-- Função para obter usuários mais ativos
CREATE OR REPLACE FUNCTION get_top_users(limit_count INT DEFAULT 10)
RETURNS TABLE (
  user_name TEXT,
  user_email TEXT,
  total_posts BIGINT,
  total_upvotes_received BIGINT
) AS $$
  SELECT 
    u.name,
    u.email,
    COUNT(DISTINCT p.id) as total_posts,
    COUNT(DISTINCT up.id) as total_upvotes_received
  FROM users u
  LEFT JOIN posts p ON u.id = p.author_id
  LEFT JOIN upvotes up ON p.id = up.post_id
  GROUP BY u.id, u.name, u.email
  ORDER BY total_posts DESC
  LIMIT limit_count;
$$ LANGUAGE SQL;

-- Uso: SELECT * FROM get_top_users(10);

-- ============================================
-- 6. VIEWS ÚTEIS
-- ============================================

-- View de posts com contadores
CREATE OR REPLACE VIEW posts_with_stats AS
SELECT 
  p.*,
  u.name as author_name,
  u.username as author_username,
  u.avatar_url as author_avatar,
  (SELECT COUNT(*) FROM upvotes WHERE post_id = p.id) as upvotes_count,
  (SELECT COUNT(*) FROM comments WHERE post_id = p.id) as comments_count
FROM posts p
LEFT JOIN users u ON p.author_id = u.id;

-- Uso: SELECT * FROM posts_with_stats ORDER BY created_at DESC LIMIT 20;

-- View de comunidades com contadores
CREATE OR REPLACE VIEW communities_with_stats AS
SELECT 
  c.*,
  COUNT(cm.id) as members_count,
  u.name as creator_name
FROM communities c
LEFT JOIN community_members cm ON c.id = cm.community_id
LEFT JOIN users u ON c.created_by = u.id
GROUP BY c.id, u.name;

-- Uso: SELECT * FROM communities_with_stats ORDER BY members_count DESC;

-- ============================================
-- 7. TRIGGERS ÚTEIS
-- ============================================

-- Atualizar contador de membros ao entrar/sair de comunidade
CREATE OR REPLACE FUNCTION update_community_member_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE communities 
    SET members_count = members_count + 1 
    WHERE id = NEW.community_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE communities 
    SET members_count = members_count - 1 
    WHERE id = OLD.community_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER community_member_count_trigger
AFTER INSERT OR DELETE ON community_members
FOR EACH ROW EXECUTE FUNCTION update_community_member_count();

-- ============================================
-- SEED COMPLETO! ✅
-- ============================================

-- Verificar o que foi criado
SELECT 'Comunidades criadas:' as info, COUNT(*) as total FROM communities
UNION ALL
SELECT 'Eventos criados:', COUNT(*) FROM events
UNION ALL
SELECT 'Posts de exemplo:', COUNT(*) FROM posts;

-- ============================================
-- PRÓXIMOS PASSOS:
-- ============================================
-- 1. Crie seu primeiro usuário via interface web
-- 2. Execute novamente os INSERTs de eventos e posts se necessário
-- 3. Convide amigos para testar
-- 4. Use as funções criadas para monitorar (get_platform_stats, etc)

SELECT '✅ Seed data executado com sucesso!' as status;
