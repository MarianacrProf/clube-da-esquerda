# 🚀 Guia Completo de Deploy no Vercel - Clube da Esquerda

## 📋 Pré-requisitos

Antes de começar, você vai precisar de:
- ✅ Uma conta no GitHub (gratuita)
- ✅ Git instalado no seu computador
- ✅ O código do projeto no seu computador

---

## 🎯 MÉTODO 1: Deploy via GitHub (RECOMENDADO)

Este é o método mais fácil e permite atualizações automáticas.

### Passo 1: Preparar o Projeto

1. **Crie um arquivo `package.json`** na raiz do projeto com este conteúdo:

```json
{
  "name": "clube-da-esquerda",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.22.0",
    "lucide-react": "^0.index.ts",
    "recharts": "^2.12.0",
    "sonner": "^2.0.3",
    "react-hook-form": "^7.55.0",
    "@radix-ui/react-avatar": "^1.0.4",
    "@radix-ui/react-dialog": "^1.0.5",
    "@radix-ui/react-dropdown-menu": "^2.0.6",
    "@radix-ui/react-label": "^2.0.2",
    "@radix-ui/react-select": "^2.0.0",
    "@radix-ui/react-slot": "^1.0.2",
    "@radix-ui/react-tabs": "^1.0.4",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.1"
  },
  "devDependencies": {
    "@types/react": "^18.3.1",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.2.1",
    "vite": "^5.1.0",
    "tailwindcss": "^4.0.0",
    "autoprefixer": "^10.4.17",
    "postcss": "^8.4.35",
    "typescript": "^5.3.3"
  }
}
```

2. **Crie um arquivo `vite.config.ts`** na raiz:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
```

3. **Crie um arquivo `tsconfig.json`** na raiz:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["**/*.ts", "**/*.tsx"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

4. **Crie um arquivo `tsconfig.node.json`** na raiz:

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
```

5. **Crie um arquivo `index.html`** na raiz:

```html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Clube da Esquerda - Rede social democrática e respeitosa baseada nos direitos humanos" />
    <title>Clube da Esquerda</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/main.tsx"></script>
  </body>
</html>
```

6. **Crie um arquivo `main.tsx`** na raiz:

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/globals.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

7. **Crie um arquivo `.gitignore`** na raiz:

```
# Dependencies
node_modules
/.pnp
.pnp.js

# Testing
/coverage

# Production
/build
/dist

# Misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# Editor
.vscode/
.idea/

# Vercel
.vercel
```

### Passo 2: Criar Repositório no GitHub

1. Acesse [github.com](https://github.com) e faça login (ou crie uma conta gratuita)
2. Clique no botão **"New"** (verde) ou no **"+"** no canto superior direito
3. Escolha **"New repository"**
4. Configure o repositório:
   - **Nome**: `clube-da-esquerda`
   - **Descrição**: "Rede social democrática brasileira"
   - **Visibilidade**: Public (ou Private se preferir)
   - **NÃO** marque "Initialize with README"
5. Clique em **"Create repository"**

### Passo 3: Conectar seu Projeto ao GitHub

Abra o terminal/prompt na pasta do projeto e execute:

```bash
# Inicializar Git (se ainda não foi feito)
git init

# Adicionar todos os arquivos
git add .

# Fazer o primeiro commit
git commit -m "Initial commit - Clube da Esquerda"

# Conectar ao repositório do GitHub (substitua SEU-USUARIO)
git remote add origin https://github.com/SEU-USUARIO/clube-da-esquerda.git

# Enviar o código
git branch -M main
git push -u origin main
```

**Nota**: Substitua `SEU-USUARIO` pelo seu nome de usuário do GitHub.

### Passo 4: Deploy no Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Clique em **"Sign Up"** (ou **"Login"** se já tiver conta)
3. Escolha **"Continue with GitHub"** para conectar sua conta
4. Autorize o Vercel a acessar seus repositórios
5. Na dashboard do Vercel, clique em **"Add New..."** → **"Project"**
6. Procure e selecione o repositório **"clube-da-esquerda"**
7. Clique em **"Import"**
8. Configure o projeto:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (deixe como está)
   - **Build Command**: `npm run build` (já vem preenchido)
   - **Output Directory**: `dist` (já vem preenchido)
9. Clique em **"Deploy"**

### Passo 5: Aguardar o Deploy

- O Vercel vai instalar as dependências e fazer o build
- Isso leva normalmente 1-3 minutos
- Você verá logs em tempo real do processo
- Quando aparecer "🎉 Congratulations!", seu site está no ar!

### Passo 6: Acessar seu Site

- O Vercel gera automaticamente uma URL tipo: `clube-da-esquerda.vercel.app`
- Clique no botão **"Visit"** ou copie a URL
- Compartilhe com seus amigos! 🎉

---

## 🔄 Como Fazer Atualizações

Sempre que você modificar o código:

```bash
# Adicionar os arquivos modificados
git add .

# Fazer commit com uma mensagem descritiva
git commit -m "Descrição da mudança"

# Enviar para o GitHub
git push
```

**O Vercel vai automaticamente detectar a mudança e fazer um novo deploy!** 🚀

---

## 🌐 MÉTODO 2: Deploy Direto (sem GitHub)

Se preferir não usar GitHub, pode fazer upload direto:

### Via CLI do Vercel

1. **Instalar a CLI do Vercel**:
```bash
npm install -g vercel
```

2. **Fazer login**:
```bash
vercel login
```

3. **Deploy**:
```bash
vercel
```

4. **Seguir as instruções** no terminal

**Desvantagem**: Você precisa rodar `vercel` manualmente cada vez que quiser atualizar.

---

## 🎨 Domínio Personalizado (Opcional)

Se você quiser usar um domínio próprio (ex: `clubedaesquerda.com.br`):

1. Compre um domínio em sites como:
   - [registro.br](https://registro.br) (domínios .br)
   - Hostinger, GoDaddy, Namecheap, etc.

2. No painel do Vercel:
   - Vá em **Settings** → **Domains**
   - Clique em **"Add"**
   - Digite seu domínio
   - Siga as instruções para configurar o DNS

---

## ⚙️ Variáveis de Ambiente (se necessário)

Se futuramente você adicionar APIs ou chaves secretas:

1. No painel do Vercel, vá em **Settings** → **Environment Variables**
2. Adicione as variáveis necessárias
3. Faça um novo deploy

---

## 🐛 Solução de Problemas Comuns

### Erro: "Build failed"
- Verifique se todos os arquivos de configuração foram criados
- Confira se não há erros no código TypeScript
- Veja os logs do Vercel para identificar o erro específico

### Erro: "Module not found"
- Verifique se todas as dependências estão no `package.json`
- Certifique-se de que os imports estão corretos

### Site não carrega corretamente
- Limpe o cache do navegador
- Verifique se o build local funciona: `npm run build && npm run preview`

### Rotas não funcionam (erro 404)
- O Vercel já configura automaticamente SPAs
- Se tiver problemas, crie um arquivo `vercel.json`:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

---

## 📊 Recursos Gratuitos do Vercel

✅ **Incluído no plano gratuito**:
- Domínio `.vercel.app` grátis
- HTTPS automático
- Deploy ilimitados
- 100GB de largura de banda/mês
- Builds ilimitados
- Analytics básicos

---

## 📞 Suporte

- **Documentação Vercel**: [vercel.com/docs](https://vercel.com/docs)
- **Comunidade**: [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)

---

## ✅ Checklist Final

Antes de fazer o deploy, confirme que você tem:

- [ ] Todos os arquivos de configuração criados
- [ ] Código funcionando localmente
- [ ] Repositório no GitHub (Método 1)
- [ ] Conta no Vercel criada
- [ ] Deploy realizado com sucesso
- [ ] Site acessível via URL do Vercel

---

## 🎯 Próximos Passos Após o Deploy

1. **Teste todas as funcionalidades** do site em produção
2. **Compartilhe a URL** com amigos e coletores de feedback
3. **Configure um domínio personalizado** (opcional)
4. **Adicione o Google Analytics** para monitorar acessos
5. **Considere adicionar Supabase** para funcionalidades backend

---

**Boa sorte com o deploy do Clube da Esquerda! 🚀🇧🇷**

Se tiver qualquer dúvida durante o processo, é só perguntar!
