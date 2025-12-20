import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner@2.0.3";
import { supabase } from "../lib/supabase";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { BrazilianBackground } from "./BrazilianBackground";
import { ArrowLeft, Check, AlertCircle } from "lucide-react";

interface SignupPageProps {
  onBack: () => void;
  onContinue: () => void;
}

export function SignupPage({ onBack, onContinue }: SignupPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validações
    if (!acceptedTerms) {
      toast.error("Você precisa aceitar os Termos de Uso!");
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error("As senhas não coincidem!");
      return;
    }
    
    if (password.length < 6) {
      toast.error("A senha deve ter no mínimo 6 caracteres!");
      return;
    }
    
    if (!validateCpfCnpj(cpfCnpj)) {
      toast.error("CPF/CNPJ inválido!");
      return;
    }

    try {
      setLoading(true);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            cpf_cnpj: cpfCnpj,
          }
        }
      });

      if (error) {
        if (error.message.includes("already registered")) {
          toast.error("Este email já está cadastrado!");
        } else {
          toast.error(error.message);
        }
        return;
      }

      if (data.user) {
        toast.success("Cadastro realizado! Verifique seu email para confirmar.");
        onContinue();
      }
    } catch (error: any) {
      console.error("Signup error:", error);
      toast.error("Erro ao criar conta. Tente novamente!");
    } finally {
      setLoading(false);
    }
  };

  const formatCpfCnpj = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    
    if (numbers.length <= 11) {
      // Formato CPF: 000.000.000-00
      return numbers
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    } else {
      // Formato CNPJ: 00.000.000/0000-00
      return numbers
        .replace(/(\d{2})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1/$2')
        .replace(/(\d{4})(\d{1,2})$/, '$1-$2');
    }
  };

  const validateCpfCnpj = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.length === 11 || numbers.length === 14;
  };

  const handleCpfCnpjChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCpfCnpj(e.target.value);
    setCpfCnpj(formatted);
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
            Junte-se à Roda
          </motion.h1>

          <motion.div
            className="mb-8 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border-l-4 border-green-500"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <p className="text-lg text-gray-700 mb-4">
              <strong>Faça parte da maior rede social de esquerda do Brasil!</strong>
            </p>
            <ul className="text-base text-gray-600 space-y-2 text-left">
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span>Conecte-se com pessoas que compartilham seus ideais</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span>Participe de debates democráticos e respeitosos</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span>Apoie projetos nas periferias do Brasil</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span>Valorize a cultura brasileira</span>
              </li>
            </ul>
          </motion.div>

          {/* Valores em destaque */}
          <motion.div
            className="grid grid-cols-3 gap-4"
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

        {/* Lado direito - Formulário de Cadastro */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card className="p-8 bg-white/90 backdrop-blur-sm shadow-2xl border-0">
            <Button
              variant="ghost"
              onClick={onBack}
              className="mb-4 -ml-2"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar para Login
            </Button>

            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Criar Nova Conta
              </h2>
              <p className="text-gray-600">
                Preencha os dados para começar sua jornada
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CPF ou CNPJ <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  placeholder="000.000.000-00 ou 00.000.000/0000-00"
                  value={cpfCnpj}
                  onChange={handleCpfCnpjChange}
                  className="h-12"
                  maxLength={18}
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Necessário para validação e segurança da plataforma
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Senha
                </label>
                <Input
                  type="password"
                  placeholder="Mínimo 8 caracteres"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12"
                  minLength={8}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirmar Senha
                </label>
                <Input
                  type="password"
                  placeholder="Digite a senha novamente"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="h-12"
                  required
                />
              </div>

              {/* Termos de Uso */}
              <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="terms"
                    checked={acceptedTerms}
                    onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <label
                      htmlFor="terms"
                      className="text-sm text-gray-700 cursor-pointer"
                    >
                      Li e aceito os{" "}
                      <button
                        type="button"
                        onClick={() => setShowTerms(!showTerms)}
                        className="text-blue-600 hover:text-blue-800 font-medium underline"
                      >
                        Termos de Uso
                      </button>{" "}
                      e concordo com os valores de respeito, democracia e direitos humanos do Clube da Esquerda
                    </label>
                  </div>
                </div>

                {showTerms && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-4 p-4 bg-white rounded border border-gray-200 max-h-60 overflow-y-auto text-xs text-gray-600"
                  >
                    <h4 className="font-bold mb-2 text-gray-800">Termos de Uso - Clube da Esquerda</h4>
                    <p className="mb-2">
                      <strong>1. Respeito mútuo:</strong> Todos os membros devem tratar uns aos outros com respeito, independentemente de divergências políticas. Discursos de ódio, discriminação e assédio não serão tolerados.
                    </p>
                    <p className="mb-2">
                      <strong>2. Direitos Humanos:</strong> Esta plataforma é baseada nos princípios dos Direitos Humanos. Conteúdos que violem esses princípios serão removidos.
                    </p>
                    <p className="mb-2">
                      <strong>3. Democracia e debate:</strong> Incentivamos debates saudáveis e democráticos. Argumentos devem ser fundamentados e respeitosos.
                    </p>
                    <p className="mb-2">
                      <strong>4. Privacidade:</strong> Seus dados pessoais serão protegidos conforme a LGPD. Não compartilharemos suas informações sem consentimento.
                    </p>
                    <p className="mb-2">
                      <strong>5. Conteúdo:</strong> Você é responsável pelo conteúdo que publica. Fake news e desinformação serão moderados.
                    </p>
                    <p className="mb-2">
                      <strong>6. Moderação:</strong> A plataforma reserva-se o direito de moderar e remover conteúdo que viole estes termos.
                    </p>
                    <p className="mb-2">
                      <strong>7. Finalidade:</strong> O Clube da Esquerda não é destinado à coleta de informações pessoais sensíveis ou dados sigilosos.
                    </p>
                  </motion.div>
                )}
              </div>

              <div className="flex items-center gap-2 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                <p className="text-xs text-yellow-800">
                  Esta plataforma não é destinada para coleta de PII (Informações Pessoalmente Identificáveis) ou dados sensíveis.
                </p>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 bg-gradient-to-r from-green-600 via-yellow-500 to-red-600 text-white font-bold hover:shadow-lg transition-all duration-300"
                disabled={!acceptedTerms || loading}
              >
                {loading ? "Carregando..." : "Criar Conta e Continuar"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={onBack}
                className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
              >
                Já tem uma conta? <span className="text-green-600 font-medium">Entre aqui</span>
              </button>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-xs text-center text-gray-500 mb-4">
                Ou cadastre-se com
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