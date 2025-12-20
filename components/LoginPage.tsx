import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner@2.0.3";
import { supabase } from "../lib/supabase";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { BrazilianBackground } from "./BrazilianBackground";

interface LoginPageProps {
  onLogin: () => void;
  onSignup: () => void;
}

export function LoginPage({ onLogin, onSignup }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Preencha todos os campos!");
      return;
    }

    try {
      setLoading(true);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          toast.error("Email ou senha incorretos!");
        } else if (error.message.includes("Email not confirmed")) {
          toast.error("Confirme seu email antes de fazer login!");
        } else {
          toast.error(error.message);
        }
        return;
      }

      if (data.user) {
        toast.success("Bem-vinde de volta!");
        onLogin();
      }
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error("Erro ao fazer login. Tente novamente!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-red-50 relative flex items-center justify-center">
      <BrazilianBackground />
      
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Lado esquerdo - Apresentação */}
        <motion.div
          className="text-center lg:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Logo circular girando */}
          <motion.div 
            className="w-32 h-32 mx-auto lg:mx-0 mb-8 bg-gradient-to-br from-green-500 via-yellow-400 to-red-500 rounded-full flex items-center justify-center shadow-2xl"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <div className="text-center text-white">
              <div className="font-bold text-base">CLUBE DA</div>
              <div className="font-bold text-base">ESQUERDA</div>
            </div>
          </motion.div>

          <motion.h1 
            className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-green-600 via-yellow-600 to-red-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Clube da Esquerda
          </motion.h1>

          <motion.div
            className="mb-8 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border-l-4 border-green-500"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <p className="text-lg text-gray-700 mb-4">
              <strong>Bem-vinde ao Clube da Esquerda, a roda mais rodada do Brasil!</strong>
            </p>
            <p className="text-base text-gray-600 mb-4">
              Aqui, todo mundo é livre para construir perspectivas democráticas e criativas de sociedade coletivamente.
            </p>
            <p className="text-base text-gray-600 font-medium">
              <span className="text-red-600">Em roda, o respeito é de lei.</span>
            </p>
          </motion.div>

          {/* Valores em destaque */}
          <motion.div
            className="grid grid-cols-3 gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <div className="text-center p-3 bg-green-100 rounded-lg">
              <div className="text-2xl mb-1">🤝</div>
              <div className="text-sm font-medium text-green-700">Respeito</div>
            </div>
            <div className="text-center p-3 bg-yellow-100 rounded-lg">
              <div className="text-2xl mb-1">🗳️</div>
              <div className="text-sm font-medium text-yellow-700">Democracia</div>
            </div>
            <div className="text-center p-3 bg-red-100 rounded-lg">
              <div className="text-2xl mb-1">⚖️</div>
              <div className="text-sm font-medium text-red-700">Direitos</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Lado direito - Formulário */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card className="p-8 bg-white/90 backdrop-blur-sm shadow-2xl border-0">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Entrar na Roda
              </h2>
              <p className="text-gray-600">
                Bem-vinde de volta, camarada!
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <Input
                type="email"
                placeholder="Seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12"
                required
              />
              
              <Input
                type="password"
                placeholder="Sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12"
                required
              />

              <Button 
                type="submit" 
                className="w-full h-12 bg-gradient-to-r from-green-600 via-yellow-500 to-red-600 text-white font-bold hover:shadow-lg transition-all duration-300"
                disabled={loading}
              >
                {loading ? "Entrando..." : "Entrar na Roda"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={onSignup}
                className="text-sm text-gray-600 hover:text-gray-800 transition-colors font-medium"
              >
                Ainda não faz parte? <span className="text-green-600">Cadastre-se aqui</span>
              </button>
              
              <div className="mt-3">
                <a href="#" className="text-xs text-gray-500 hover:text-gray-700">
                  Esqueceu a senha?
                </a>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-xs text-center text-gray-500 mb-4">
                Ao se cadastrar, você concorda com nossos valores de respeito, democracia e direitos humanos
              </p>
              
              {/* Botões de redes sociais */}
              <div className="flex gap-3 justify-center">
                <Button variant="outline" size="sm" className="flex-1">
                  <span className="mr-2">📱</span>
                  Google
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <span className="mr-2">📘</span>
                  Facebook
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}