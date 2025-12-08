import { useState, useEffect } from 'react'
import { Toaster, toast } from 'sonner'
import { supabase } from './supabaseClient'

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentPage, setCurrentPage] = useState('login')
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [userEmail, setUserEmail] = useState('')

  // Check if user is already logged in
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setIsLoggedIn(true)
        setUserEmail(session.user.email || '')
        setCurrentPage('feed')
      }
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setIsLoggedIn(true)
        setUserEmail(session.user.email || '')
        setCurrentPage('feed')
      } else {
        setIsLoggedIn(false)
        setUserEmail('')
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  // Login function with Supabase
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !password) {
      toast.error('Por favor, preencha todos os campos!')
      return
    }

    if (!email.includes('@')) {
      toast.error('Email inválido!')
      return
    }

    if (password.length < 6) {
      toast.error('Senha deve ter pelo menos 6 caracteres!')
      return
    }

    setLoading(true)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      })

      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          toast.error('Email ou senha incorretos!')
        } else if (error.message.includes('Email not confirmed')) {
          toast.error('Por favor, confirme seu email antes de fazer login!')
        } else {
          toast.error('Erro ao fazer login: ' + error.message)
        }
        setLoading(false)
        return
      }

      if (data.user) {
        toast.success('Login realizado com sucesso! 🎉')
        setIsLoggedIn(true)
        setUserEmail(data.user.email || '')
        setCurrentPage('feed')
      }
    } catch (error: any) {
      toast.error('Erro inesperado: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  // Signup function with Supabase
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !password) {
      toast.error('Por favor, preencha todos os campos!')
      return
    }

    if (!email.includes('@')) {
      toast.error('Email inválido!')
      return
    }

    if (password.length < 6) {
      toast.error('Senha deve ter pelo menos 6 caracteres!')
      return
    }

    setLoading(true)

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      })

      if (error) {
        toast.error('Erro ao criar conta: ' + error.message)
        setLoading(false)
        return
      }

      if (data.user) {
        // Check if email confirmation is required
        if (data.user.identities && data.user.identities.length === 0) {
          toast.error('Este email já está cadastrado!')
          setLoading(false)
          return
        }

        toast.success(
          '✅ Cadastro realizado! Verifique seu email para confirmar sua conta.',
          { duration: 6000 }
        )
        
        // Show message to check email
        toast.info(
          '📧 Um email de confirmação foi enviado. Clique no link para ativar sua conta!',
          { duration: 8000 }
        )

        // Clear fields
        setEmail('')
        setPassword('')
        setAuthMode('login')
      }
    } catch (error: any) {
      toast.error('Erro inesperado: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  // Logout function
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      toast.error('Erro ao sair: ' + error.message)
    } else {
      toast.success('Você saiu da sua conta!')
      setIsLoggedIn(false)
      setUserEmail('')
      setCurrentPage('login')
    }
  }

  // Render login page
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-yellow-50 to-red-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-green-700 mb-2">
              🌀 Clube da Esquerda
            </h1>
            <p className="text-gray-600">
              Rede Social Circular - Democracia e Respeito
            </p>
          </div>

          {/* Tabs */}
          <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setAuthMode('login')}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                authMode === 'login'
                  ? 'bg-white text-green-700 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Entrar
            </button>
            <button
              onClick={() => setAuthMode('signup')}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                authMode === 'signup'
                  ? 'bg-white text-yellow-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Cadastrar
            </button>
          </div>

          {/* Login Form */}
          {authMode === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="login-email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  id="login-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:opacity-50"
                />
              </div>

              <div>
                <label htmlFor="login-password" className="block text-sm font-medium text-gray-700 mb-1">
                  Senha
                </label>
                <input
                  id="login-password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:opacity-50"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Entrando...' : 'Entrar'}
              </button>
            </form>
          )}

          {/* Signup Form */}
          {authMode === 'signup' && (
            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  id="signup-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent disabled:opacity-50"
                />
              </div>

              <div>
                <label htmlFor="signup-password" className="block text-sm font-medium text-gray-700 mb-1">
                  Senha
                </label>
                <input
                  id="signup-password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent disabled:opacity-50"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Cadastrando...' : 'Cadastrar'}
              </button>
            </form>
          )}

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Inspirado nas tradições brasileiras de roda</p>
            <p className="mt-1">Samba • Capoeira • Democracia</p>
          </div>

          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-800">
              ✅ <strong>Autenticação Real Ativa!</strong> Seus dados são salvos com segurança no Supabase.
            </p>
          </div>
        </div>
        <Toaster position="top-center" richColors />
      </div>
    )
  }

  // Render main app
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-red-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-green-700">
                🌀 Clube da Esquerda
              </h1>
            </div>

            <nav className="flex items-center space-x-6">
              <button
                onClick={() => setCurrentPage('feed')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentPage === 'feed'
                    ? 'bg-green-100 text-green-700'
                    : 'text-gray-600 hover:text-green-700'
                }`}
              >
                🏠 Roda Principal
              </button>
              <button
                onClick={() => setCurrentPage('communities')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentPage === 'communities'
                    ? 'bg-green-100 text-green-700'
                    : 'text-gray-600 hover:text-green-700'
                }`}
              >
                🎭 Comunidades
              </button>
              <button
                onClick={() => setCurrentPage('events')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentPage === 'events'
                    ? 'bg-green-100 text-green-700'
                    : 'text-gray-600 hover:text-green-700'
                }`}
              >
                📅 Eventos
              </button>
              <button
                onClick={() => setCurrentPage('profile')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentPage === 'profile'
                    ? 'bg-green-100 text-green-700'
                    : 'text-gray-600 hover:text-green-700'
                }`}
              >
                👤 Perfil
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg font-medium text-red-600 hover:bg-red-50 transition-colors"
              >
                🚪 Sair
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {currentPage === 'feed' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-green-700 mb-4">
                🔥 Feed Principal - Roda da Conversa
              </h2>
              <p className="text-gray-600 mb-6">
                Bem-vindo ao Clube da Esquerda, <strong>{userEmail}</strong>!
              </p>
              
              <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
                <h3 className="font-bold text-green-800 mb-2">
                  ✅ Autenticação Ativa!
                </h3>
                <p className="text-green-700">
                  Você está logado com uma conta REAL do Supabase! 
                  Seus dados estão seguros e você receberá emails de confirmação.
                </p>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
                      U
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-semibold">Usuário Demo</span>
                        <span className="text-xs bg-yellow-500 text-white px-2 py-0.5 rounded">
                          Beta Tester
                        </span>
                      </div>
                      <p className="text-gray-700">
                        Que alegria ver tantas pessoas engajadas na luta por direitos! 
                        Juntos somos mais fortes. ✊
                      </p>
                      <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
                        <button className="hover:text-green-600 font-medium">
                          ⬆️ UP! (42)
                        </button>
                        <button className="hover:text-blue-600">
                          💬 Comentar
                        </button>
                        <button className="hover:text-purple-600">
                          🔗 Compartilhar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white font-bold">
                      M
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-semibold">Movimento Cultural</span>
                        <span className="text-xs bg-green-600 text-white px-2 py-0.5 rounded">
                          Instituição
                        </span>
                      </div>
                      <p className="text-gray-700">
                        Plantamos 50 mudas hoje na comunidade! Cada árvore é um futuro 
                        mais verde para nossas crianças. 🌳💚
                      </p>
                      <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
                        <button className="hover:text-green-600 font-medium">
                          ⬆️ UP! (89)
                        </button>
                        <button className="hover:text-blue-600">
                          💬 Comentar
                        </button>
                        <button className="hover:text-purple-600">
                          🔗 Compartilhar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-green-700 text-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold mb-3">
                ✅ Supabase Configurado!
              </h3>
              <ul className="space-y-2">
                <li>✅ Autenticação real funcionando</li>
                <li>✅ Envio de emails automático</li>
                <li>✅ Dados salvos com segurança</li>
                <li>✅ Você está logado como: {userEmail}</li>
                <li>🚀 Próximo: Adicionar posts, chat e mais!</li>
              </ul>
            </div>
          </div>
        )}

        {currentPage === 'communities' && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-green-700 mb-6">
              🎭 Comunidades Temáticas
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: 'Música Popular', icon: '🎵', color: 'bg-yellow-500' },
                { name: 'Poesia', icon: '📚', color: 'bg-red-500' },
                { name: 'Filosofia Política', icon: '🧠', color: 'bg-green-500' },
                { name: 'Meio Ambiente', icon: '🌱', color: 'bg-emerald-500' },
                { name: 'Direitos Humanos', icon: '✊', color: 'bg-orange-500' },
                { name: 'Arte Periférica', icon: '🎨', color: 'bg-purple-500' },
              ].map((community) => (
                <div
                  key={community.name}
                  className={`${community.color} text-white rounded-lg p-6 shadow-lg hover:scale-105 transition-transform cursor-pointer`}
                >
                  <div className="text-4xl mb-2">{community.icon}</div>
                  <h3 className="font-bold text-lg">{community.name}</h3>
                  <p className="text-sm opacity-90 mt-1">Clique para explorar</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentPage === 'events' && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-green-700 mb-6">
              📅 Eventos Culturais
            </h2>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="text-4xl">🎵</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-green-700">
                      Roda de Samba da Resistência
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">
                      Encontro mensal para celebrar a cultura do samba
                    </p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <span>📍 Praça da República, SP</span>
                      <span>🗓️ Próximo Sábado</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="text-4xl">🌳</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-green-700">
                      Mutirão de Plantio
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">
                      Vamos plantar 100 mudas! Junte-se a nós
                    </p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <span>📍 Parque do Carmo, SP</span>
                      <span>🗓️ Domingo, 14h</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentPage === 'profile' && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-start space-x-6 mb-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-500 to-yellow-500 flex items-center justify-center text-white text-3xl font-bold">
                {userEmail.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h2 className="text-2xl font-bold text-green-700">
                    {userEmail}
                  </h2>
                  <span className="bg-green-500 text-white text-sm px-3 py-1 rounded-full font-semibold">
                    ✅ Conta Verificada
                  </span>
                </div>
                <p className="text-gray-600">
                  Membro autenticado • Engajado na luta por direitos humanos
                </p>
                <div className="flex items-center space-x-6 mt-4 text-sm">
                  <div>
                    <span className="font-bold text-lg text-green-600">0</span>
                    <span className="text-gray-500 ml-1">Posts</span>
                  </div>
                  <div>
                    <span className="font-bold text-lg text-green-600">0</span>
                    <span className="text-gray-500 ml-1">Amigos</span>
                  </div>
                  <div>
                    <span className="font-bold text-lg text-green-600">0</span>
                    <span className="text-gray-500 ml-1">Comunidades</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="font-bold text-lg text-green-700 mb-3">
                🏷️ Patches Políticos
              </h3>
              <div className="flex flex-wrap gap-2">
                <span className="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 text-white px-3 py-1 rounded-full text-sm">
                  🏳️‍🌈 LGBT+
                </span>
                <span className="bg-pink-500 text-white px-3 py-1 rounded-full text-sm">
                  ⚧️ Trans
                </span>
                <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm">
                  ⚒️ Socialismo
                </span>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Floating Button - Create Post */}
      <button
        className="fixed bottom-8 right-8 bg-green-600 hover:bg-green-700 text-white rounded-full p-4 shadow-2xl hover:scale-110 transition-transform z-50"
        title="Criar Publicação"
      >
        <span className="text-2xl">✏️</span>
      </button>

      <Toaster position="top-center" richColors />
    </div>
  )
}
