import { useState } from 'react'
import { Toaster } from 'sonner'

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentPage, setCurrentPage] = useState('login')

  // Mock login function
  const handleLogin = () => {
    setIsLoggedIn(true)
    setCurrentPage('feed')
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

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="seu@email.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Senha
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <button
              onClick={handleLogin}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors"
            >
              Entrar
            </button>

            <button
              onClick={handleLogin}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-lg transition-colors"
            >
              Cadastrar
            </button>
          </div>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Inspirado nas tradições brasileiras de roda</p>
            <p className="mt-1">Samba • Capoeira • Democracia</p>
          </div>
        </div>
        <Toaster position="top-center" />
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
                Bem-vindo ao Clube da Esquerda! Este é o protótipo inicial.
              </p>
              
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
                <h3 className="font-bold text-yellow-800 mb-2">
                  ⚠️ Versão Beta
                </h3>
                <p className="text-yellow-700">
                  Para ativar todas as funcionalidades (upload de imagens, chat em tempo real, 
                  posts, UP!, etc), siga o guia <strong>DEPLOY.md</strong> e configure o Supabase.
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
                🚀 Próximos Passos
              </h3>
              <ul className="space-y-2">
                <li>✅ 1. Leia o arquivo <code className="bg-green-800 px-2 py-1 rounded">DEPLOY.md</code></li>
                <li>✅ 2. Configure o Supabase (backend)</li>
                <li>✅ 3. Configure variáveis de ambiente</li>
                <li>✅ 4. Faça deploy na Vercel</li>
                <li>✅ 5. Todas as funcionalidades estarão ativas!</li>
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
                U
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h2 className="text-2xl font-bold text-green-700">
                    Usuário Demo
                  </h2>
                  <span className="bg-yellow-500 text-white text-sm px-3 py-1 rounded-full font-semibold">
                    ⭐ Beta Tester
                  </span>
                </div>
                <p className="text-gray-600">
                  Membro desde hoje • Engajado na luta por direitos humanos
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
                <span className="bg-rainbow-gradient text-white px-3 py-1 rounded-full text-sm">
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

      <Toaster position="top-center" />
    </div>
  )
}
