import { motion } from "motion/react";
import { Heart, MapPin, Users, Target, Calendar } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Project {
  id: number;
  title: string;
  description: string;
  location: string;
  image: string;
  goal: number;
  current: number;
  contributors: number;
  deadline: string;
  category: string;
}

const mockProjects: Project[] = [
  {
    id: 1,
    title: "Biblioteca Comunitária na Cidade Tiradentes",
    description: "Criação de uma biblioteca comunitária com acervo focado em literatura brasileira, história afro-brasileira e educação popular para jovens da periferia.",
    location: "Cidade Tiradentes, São Paulo - SP",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    goal: 15000,
    current: 8500,
    contributors: 127,
    deadline: "30 dias",
    category: "Educação"
  },
  {
    id: 2,
    title: "Horta Urbana Cooperativa",
    description: "Implementação de horta urbana cooperativa para produção de alimentos orgânicos e geração de renda para famílias da comunidade.",
    location: "Capão Redondo, São Paulo - SP",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400",
    goal: 12000,
    current: 12000,
    contributors: 89,
    deadline: "Concluído!",
    category: "Sustentabilidade"
  },
  {
    id: 3,
    title: "Centro Cultural Hip Hop",
    description: "Construção de centro cultural para promover a cultura hip hop, oferecendo oficinas de rap, break, grafite e DJ para a juventude periférica.",
    location: "Brasilândia, São Paulo - SP",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400",
    goal: 25000,
    current: 3200,
    contributors: 45,
    deadline: "60 dias",
    category: "Cultura"
  }
];

export function DonationSystem() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getProgressPercentage = (current: number, goal: number) => {
    return Math.min((current / goal) * 100, 100);
  };

  return (
    <div className="w-full p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 mb-4"
        >
          <Heart className="w-8 h-8 text-red-500" />
          <h1 className="text-red-600">Caixinhas Solidárias</h1>
        </motion.div>
        <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Escolha uma caixinha para doar metade da sua mensalidade. Juntos, construímos projetos que transformam periferias brasileiras.
        </p>
      </div>

      {/* Estatísticas gerais */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="p-6 text-center bg-gradient-to-br from-green-50 to-green-100">
          <Target className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <h3 className="text-green-800">47 Projetos</h3>
          <p className="text-green-600 text-sm">Realizados</p>
        </Card>
        <Card className="p-6 text-center bg-gradient-to-br from-yellow-50 to-yellow-100">
          <Users className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
          <h3 className="text-yellow-800">1.247 Pessoas</h3>
          <p className="text-yellow-600 text-sm">Beneficiadas</p>
        </Card>
        <Card className="p-6 text-center bg-gradient-to-br from-red-50 to-red-100">
          <Heart className="w-8 h-8 text-red-600 mx-auto mb-2" />
          <h3 className="text-red-800">R$ 234.567</h3>
          <p className="text-red-600 text-sm">Arrecadados</p>
        </Card>
      </motion.div>

      {/* Lista de projetos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockProjects.map((project, index) => {
          const progress = getProgressPercentage(project.current, project.goal);
          const isCompleted = progress >= 100;

          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                {/* Imagem */}
                <div className="relative h-48">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className={`${
                      isCompleted 
                        ? 'bg-green-500 text-white' 
                        : 'bg-yellow-500 text-white'
                    }`}>
                      {project.category}
                    </Badge>
                  </div>
                  {isCompleted && (
                    <div className="absolute inset-0 bg-green-500 bg-opacity-20 flex items-center justify-center">
                      <div className="bg-green-500 text-white px-4 py-2 rounded-full font-bold">
                        PROJETO REALIZADO! 🎉
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  {/* Título e localização */}
                  <h3 className="mb-2">{project.title}</h3>
                  <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
                    <MapPin className="w-4 h-4" />
                    <span>{project.location}</span>
                  </div>

                  {/* Descrição */}
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Progresso */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">
                        {formatCurrency(project.current)} de {formatCurrency(project.goal)}
                      </span>
                      <span className="text-sm text-gray-500">
                        {Math.round(progress)}%
                      </span>
                    </div>
                    <Progress 
                      value={progress} 
                      className="h-2 bg-gray-200"
                    />
                  </div>

                  {/* Estatísticas */}
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Users className="w-4 h-4" />
                      <span>{project.contributors} apoiadores</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>{project.deadline}</span>
                    </div>
                  </div>

                  {/* Botão de ação */}
                  <Button 
                    className={`w-full ${
                      isCompleted 
                        ? 'bg-green-600 hover:bg-green-700' 
                        : 'bg-red-600 hover:bg-red-700'
                    }`}
                    disabled={isCompleted}
                  >
                    {isCompleted ? (
                      <>
                        <Heart className="w-4 h-4 mr-2" />
                        Ver Implementação
                      </>
                    ) : (
                      <>
                        <Heart className="w-4 h-4 mr-2" />
                        Apoiar Este Projeto
                      </>
                    )}
                  </Button>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Call to action */}
      <motion.div 
        className="text-center mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="p-8 bg-gradient-to-br from-red-50 via-yellow-50 to-green-50">
          <h2 className="mb-4 text-red-600">Sua Solidariedade Transforma Vidas</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Com apenas metade da sua mensalidade, você pode fazer parte de projetos que fortalecem 
            comunidades periféricas e constroem um Brasil mais justo e igualitário.
          </p>
          <Button size="lg" className="bg-gradient-to-r from-green-600 via-yellow-500 to-red-600 text-white">
            <Heart className="w-5 h-5 mr-2" />
            Escolher Minha Caixinha
          </Button>
        </Card>
      </motion.div>
    </div>
  );
}