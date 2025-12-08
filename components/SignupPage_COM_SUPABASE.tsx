import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "../src/supabaseClient";
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
      
      // Criar conta no Supabase
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            cpf_cnpj: cpfCnpj.replace(/\D/g, ''), // Salvar só números
          },
        },
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
        // Verificar se precisa confirmar email
        if (data.user.identities && data.user.identities.length === 0) {
          toast.error("Este email já está cadastrado!");
          return;
        }
        
        // Sucesso! Pode ou não precisar confirmar email dependendo da config do Supabase
        if (data.user.confirmed_at) {
          // Email já confirmado (confirmação desabilitada)
          toast.success("Cadastro realizado! Bem-vinde!");
          onContinue();
        } else {
          // Precisa confirmar email
          toast.success("Cadastro realizado! Verifique seu email para confirmar.");
          // Ainda assim, continua para seleção de plano
          onContinue();
        }
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
            className="mb-8 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border-l-4 border-yellow-500"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <p className="text-lg text-gray-700 mb-4">
              <strong>Faça parte de algo maior!</strong>
            </p>
            <p className="text-base text-gray-600 mb-4">
              Uma rede social baseada em valores de democracia, respeito e direitos humanos.
            </p>
            <p className="text-base text-gray-600 font-medium">
              <span className="text-green-600">Cadastro 100% gratuito!</span>
            </p>
          </motion.div>

          {/* Benefícios em destaque */}
          <motion.div
            className="space-y-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <div className="flex items-center gap-3 bg-white/70 backdrop-blur-sm p-3 rounded-lg">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Check className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm text-gray-700">Comunidades temáticas engajadas</span>
            </div>
            <div className="flex items-center gap-3 bg-white/70 backdrop-blur-sm p-3 rounded-lg">
              <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Check className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm text-gray-700">Fóruns e debates democráticos</span>
            </div>
            <div className="flex items-center gap-3 bg-white/70 backdrop-blur-sm p-3 rounded-lg">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Check className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm text-gray-700">Apoie projetos nas periferias</span>
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
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors"
              disabled={loading}
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Voltar</span>
            </button>

            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Criar Conta
              </h2>
              <p className="text-gray-600">
                Preencha os dados para começar
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="email"
                placeholder="Seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12"
                required
                disabled={loading}
              />
              
              <Input
                type="text"
                placeholder="CPF ou CNPJ"
                value={cpfCnpj}
                onChange={handleCpfCnpjChange}
                className="h-12"
                maxLength={18}
                required
                disabled={loading}
              />
              
              <Input
                type="password"
                placeholder="Crie uma senha (mínimo 6 caracteres)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12"
                required
                minLength={6}
                disabled={loading}
              />
              
              <Input
                type="password"
                placeholder="Confirme sua senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="h-12"
                required
                disabled={loading}
              />

              {/* Checkbox de Termos */}
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <Checkbox
                  id="terms"
                  checked={acceptedTerms}
                  onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
                  disabled={loading}
                />
                <label
                  htmlFor="terms"
                  className="text-sm text-gray-700 leading-tight cursor-pointer"
                >
                  Aceito os{" "}
                  <button
                    type="button"
                    onClick={() => setShowTerms(!showTerms)}
                    className="text-green-600 hover:underline font-medium"
                  >
                    Termos de Uso
                  </button>{" "}
                  e concordo com os valores de respeito, democracia e direitos humanos
                </label>
              </div>

              {/* Termos expandidos */}
              {showTerms && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-xs text-gray-600 space-y-2"
                >
                  <p><strong>Termos de Uso do Clube da Esquerda:</strong></p>
                  <p>1. Esta é uma rede social baseada em respeito, democracia e direitos humanos.</p>
                  <p>2. Não toleramos discursos de ódio, preconceito ou violência.</p>
                  <p>3. Todos os membros devem contribuir para um ambiente respeitoso e inclusivo.</p>
                  <p>4. Seus dados pessoais serão protegidos conforme a LGPD.</p>
                  <p>5. Você pode excluir sua conta a qualquer momento.</p>
                </motion.div>
              )}

              <Button 
                type="submit" 
                className="w-full h-12 bg-gradient-to-r from-green-600 via-yellow-500 to-red-600 text-white font-bold hover:shadow-lg transition-all duration-300"
                disabled={loading}
              >
                {loading ? "Criando conta..." : "Criar Conta e Continuar"}
              </Button>
            </form>

            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500">
              <AlertCircle className="w-4 h-4" />
              <span>Após cadastro, você escolherá seu plano</span>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
