import { motion } from "motion/react";
import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Avatar } from "./ui/avatar";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { 
  Heart, 
  MapPin, 
  Users, 
  Calendar,
  Target,
  Zap,
  BookOpen,
  Home,
  Utensils,
  Music,
  Palette,
  GraduationCap,
  Stethoscope,
  Sprout,
  Shield
} from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  goal: number;
  raised: number;
  supporters: number;
  daysLeft: number;
  category: "education" | "health" | "culture" | "environment" | "housing" | "food" | "technology" | "sports";
  location: string;
  organizer: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  image: string;
  isUrgent?: boolean;
  isFeatured?: boolean;
  impact: string;
}

const mockProjects: Project[] = [
  {
    id: 1,
    title: "Biblioteca Comunitária da Vila Esperança",
    description: "Criação de uma biblioteca comunitária com acesso gratuito a livros, computadores e oficinas de leitura para crianças e jovens da periferia de São Paulo.",
    goal: 25000,
    raised: 18750,
    supporters: 156,
    daysLeft: 12,
    category: "education",
    location: "Vila Esperança, SP",
    organizer: {
      name: "Coletivo Leitura Viva",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
      verified: true
    },
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500",
    isFeatured: true,
    impact: "500+ crianças beneficiadas"
  },
  {
    id: 2,
    title: "Horta Urbana Colaborativa",
    description: "Implementação de horta comunitária em terreno abandonado, produzindo alimentos orgânicos para famílias em situação de vulnerabilidade alimentar.",
    goal: 15000,
    raised: 12300,
    supporters: 89,
    daysLeft: 8,
    category: "environment",
    location: "Capão Redondo, SP",
    organizer: {
      name: "MST - Movimento dos Trabalhadores Rurais",
      avatar: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=100",
      verified: true
    },
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=500",
    isUrgent: true,
    impact: "200 famílias alimentadas"
  },
  {
    id: 3,
    title: "Centro de Cultura Hip Hop",
    description: "Reforma e equipamento de espaço cultural para oficinas de rap, break, grafite e DJ para jovens da periferia. Música como ferramenta de transforma��ão social.",
    goal: 35000,
    raised: 21000,
    supporters: 234,
    daysLeft: 25,
    category: "culture",
    location: "Cidade Tiradentes, SP",
    organizer: {
      name: "Coletivo Rima e Resistência",
      avatar: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100",
      verified: true
    },
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500",
    impact: "300+ jovens em atividades culturais"
  },
  {
    id: 4,
    title: "Ambulatório Popular de Saúde Mental",
    description: "Criação de centro de atendimento psicológico gratuito com foco em terapia comunitária e práticas integrativas para comunidades carentes.",
    goal: 45000,
    raised: 32500,
    supporters: 178,
    daysLeft: 18,
    category: "health",
    location: "Brasilândia, SP",
    organizer: {
      name: "Rede de Atenção Psicossocial",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100",
      verified: true
    },
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500",
    impact: "1000+ atendimentos mensais"
  },
  {
    id: 5,
    title: "Moradia Popular Autoconstrução",
    description: "Mutirão para construção de 20 casas populares através do sistema de autoconstrução e economia solidária no movimento de moradia.",
    goal: 120000,
    raised: 78000,
    supporters: 345,
    daysLeft: 45,
    category: "housing",
    location: "Itaquera, SP",
    organizer: {
      name: "MTST - Movimento dos Trabalhadores Sem Teto",
      avatar: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=100",
      verified: true
    },
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=500",
    impact: "20 famílias com casa própria"
  },
  {
    id: 6,
    title: "Cozinha Solidária Comunitária",
    description: "Instalação de cozinha comunitária para preparar e distribuir 500 refeições diárias para pessoas em situação de rua e famílias carentes.",
    goal: 28000,
    raised: 19600,
    supporters: 167,
    daysLeft: 15,
    category: "food",
    location: "Centro, SP",
    organizer: {
      name: "Movimento População de Rua",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100",
      verified: true
    },
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500",
    isUrgent: true,
    impact: "500 refeições diárias"
  }
];

const categories = [
  { id: "all", name: "Todas", icon: Heart, color: "text-red-600" },
  { id: "education", name: "Educação", icon: GraduationCap, color: "text-blue-600" },
  { id: "health", name: "Saúde", icon: Stethoscope, color: "text-green-600" },
  { id: "culture", name: "Cultura", icon: Palette, color: "text-purple-600" },
  { id: "environment", name: "Ambiente", icon: Sprout, color: "text-green-500" },
  { id: "housing", name: "Moradia", icon: Home, color: "text-orange-600" },
  { id: "food", name: "Alimentação", icon: Utensils, color: "text-yellow-600" },
  { id: "technology", name: "Tecnologia", icon: Zap, color: "text-indigo-600" }
];

export function SolidaryBoxes() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [donations, setDonations] = useState<Record<number, number>>({});

  const filteredProjects = mockProjects.filter(project => 
    selectedCategory === "all" || project.category === selectedCategory
  );

  const featuredProjects = mockProjects.filter(project => project.isFeatured);
  const urgentProjects = mockProjects.filter(project => project.isUrgent);

  const handleDonate = (projectId: number, amount: number) => {
    setDonations(prev => ({
      ...prev,
      [projectId]: (prev[projectId] || 0) + amount
    }));
  };

  const getProgressPercentage = (raised: number, goal: number) => {
    return Math.min((raised / goal) * 100, 100);
  };

  const getCategoryIcon = (category: string) => {
    const categoryData = categories.find(cat => cat.id === category);
    return categoryData ? categoryData.icon : Heart;
  };

  const getCategoryColor = (category: string) => {
    const categoryData = categories.find(cat => cat.id === category);
    return categoryData ? categoryData.color : "text-red-600";
  };

  return (
    <div className="w-full p-6">
      {/* Header */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-red-700 mb-4">❤️ Caixinhas Solidárias</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Projetos comunitários que transformam vidas nas periferias do Brasil.
          <span className="block mt-2 font-medium text-red-600">
            Escolha onde destinar sua contribuição mensal!
          </span>
        </p>
      </motion.div>

      {/* Projetos urgentes */}
      {urgentProjects.length > 0 && (
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-orange-600" />
            <h2 className="text-orange-700">🚨 Urgente - Precisam de Apoio</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {urgentProjects.map((project, index) => (
              <motion.div
                key={`urgent-${project.id}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
                  <div className="h-48 overflow-hidden relative">
                    <ImageWithFallback
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-orange-100 text-orange-700">
                        <Zap className="w-3 h-3 mr-1" />
                        {project.daysLeft} dias restantes
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-medium mb-2">{project.title}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {project.description}
                    </p>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>R$ {project.raised.toLocaleString()}</span>
                          <span className="text-gray-500">Meta: R$ {project.goal.toLocaleString()}</span>
                        </div>
                        <Progress value={getProgressPercentage(project.raised, project.goal)} />
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex gap-4 text-xs text-gray-500">
                          <span>{project.supporters} apoiadores</span>
                          <span>{project.impact}</span>
                        </div>
                        
                        <Button
                          onClick={() => handleDonate(project.id, 25)}
                          className="bg-orange-600 hover:bg-orange-700"
                          size="sm"
                        >
                          <Heart className="w-3 h-3 mr-1" />
                          Apoiar
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Filtros de categoria */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className={`${selectedCategory === category.id ? "bg-red-600 hover:bg-red-700" : ""}`}
            >
              <Icon className={`w-4 h-4 mr-1 ${category.color}`} />
              {category.name}
            </Button>
          );
        })}
      </div>

      {/* Grade de projetos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project, index) => {
          const CategoryIcon = getCategoryIcon(project.category);
          const categoryColor = getCategoryColor(project.category);
          const userDonation = donations[project.id] || 0;
          
          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                <div className="h-48 overflow-hidden relative">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-white/90 text-gray-700">
                      <CategoryIcon className={`w-3 h-3 mr-1 ${categoryColor}`} />
                      {categories.find(cat => cat.id === project.category)?.name}
                    </Badge>
                  </div>
                  
                  {project.isFeatured && (
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-yellow-100 text-yellow-700">
                        ⭐ Destaque
                      </Badge>
                    </div>
                  )}
                </div>
                
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-medium mb-2">{project.title}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-3 flex-1">
                    {project.description}
                  </p>
                  
                  {/* Organizador */}
                  <div className="flex items-center gap-2 mb-3">
                    <Avatar className="w-6 h-6">
                      <ImageWithFallback
                        src={project.organizer.avatar}
                        alt={project.organizer.name}
                        className="rounded-full object-cover"
                      />
                    </Avatar>
                    <span className="text-sm text-gray-600 flex-1 truncate">
                      {project.organizer.name}
                    </span>
                    {project.organizer.verified && (
                      <Shield className="w-3 h-3 text-blue-500" />
                    )}
                  </div>
                  
                  {/* Localização */}
                  <div className="flex items-center gap-1 mb-3 text-xs text-gray-500">
                    <MapPin className="w-3 h-3" />
                    <span>{project.location}</span>
                  </div>
                  
                  {/* Progresso */}
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium">
                          R$ {(project.raised + userDonation).toLocaleString()}
                        </span>
                        <span className="text-gray-500">
                          Meta: R$ {project.goal.toLocaleString()}
                        </span>
                      </div>
                      <Progress value={getProgressPercentage(project.raised + userDonation, project.goal)} />
                    </div>
                    
                    {/* Stats */}
                    <div className="flex justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {project.supporters} apoiadores
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {project.daysLeft} dias
                      </div>
                    </div>
                    
                    {/* Impacto */}
                    <div className="text-xs text-green-600 font-medium">
                      <Target className="w-3 h-3 inline mr-1" />
                      {project.impact}
                    </div>
                    
                    {userDonation > 0 && (
                      <Badge className="bg-green-100 text-green-700 w-full justify-center">
                        ❤️ Você doou R$ {userDonation}
                      </Badge>
                    )}
                    
                    {/* Botões de doação */}
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleDonate(project.id, 10)}
                        variant="outline"
                        size="sm"
                        className="flex-1"
                      >
                        R$ 10
                      </Button>
                      <Button
                        onClick={() => handleDonate(project.id, 25)}
                        variant="outline"
                        size="sm"
                        className="flex-1"
                      >
                        R$ 25
                      </Button>
                      <Button
                        onClick={() => handleDonate(project.id, 50)}
                        className="bg-red-600 hover:bg-red-700 flex-1"
                        size="sm"
                      >
                        <Heart className="w-3 h-3 mr-1" />
                        R$ 50
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Estado vazio */}
      {filteredProjects.length === 0 && (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-gray-600 mb-2">Nenhum projeto encontrado</h3>
          <p className="text-sm text-gray-500">
            Tente ajustar os filtros de categoria
          </p>
        </motion.div>
      )}

      {/* Informações sobre as caixinhas */}
      <motion.div
        className="mt-12 p-6 bg-gradient-to-r from-red-100 via-pink-100 to-orange-100 rounded-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="text-center text-red-700 mb-4">❤️ Como Funcionam as Caixinhas</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <Heart className="w-8 h-8 text-red-600 mx-auto mb-2" />
            <h4 className="font-medium mb-2">Escolha seu Projeto</h4>
            <p className="text-sm text-gray-600">
              Destine parte da sua contribuição mensal para projetos que tocam seu coração
            </p>
          </div>
          <div>
            <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <h4 className="font-medium mb-2">Impacto Coletivo</h4>
            <p className="text-sm text-gray-600">
              Sua doação se junta a de outros membros, multiplicando o impacto social
            </p>
          </div>
          <div>
            <Target className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <h4 className="font-medium mb-2">Transparência Total</h4>
            <p className="text-sm text-gray-600">
              Acompanhe o progresso e veja como sua contribuição transforma vidas
            </p>
          </div>
        </div>
        
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600 mb-4">
            Totalmente gerenciado pela comunidade, com prestação de contas pública
          </p>
          <Button className="bg-red-600 hover:bg-red-700">
            <Heart className="w-4 h-4 mr-2" />
            Quero Criar um Projeto
          </Button>
        </div>
      </motion.div>
    </div>
  );
}