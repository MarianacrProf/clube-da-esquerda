import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Users,
  Heart,
  Eye,
  MessageCircle,
  Share2,
  Calendar,
  Award,
  Target,
  Activity,
  BarChart3,
  PieChart,
  Download
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart as RechartsPie,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart
} from "recharts";

interface InstitutionAnalyticsProps {
  onBack: () => void;
}

// Dados mockados para analytics
const engagementData = [
  { mes: "Ago", fãs: 845, interações: 1240, posts: 45 },
  { mes: "Set", fãs: 1032, interações: 1580, posts: 52 },
  { mes: "Out", fãs: 1247, interações: 1890, posts: 48 },
  { mes: "Nov", fãs: 1420, interações: 2100, posts: 61 },
  { mes: "Dez", fãs: 1650, interações: 2450, posts: 58 },
];

const demographicData = [
  { name: "18-24", value: 320, color: "#10b981" },
  { name: "25-34", value: 480, color: "#f59e0b" },
  { name: "35-44", value: 380, color: "#ef4444" },
  { name: "45-54", value: 270, color: "#8b5cf6" },
  { name: "55+", value: 200, color: "#06b6d4" },
];

const interestData = [
  { categoria: "Música", engajamento: 85 },
  { categoria: "Política", engajamento: 92 },
  { categoria: "Educação", engajamento: 78 },
  { categoria: "Cultura", engajamento: 88 },
  { categoria: "Meio Ambiente", engajamento: 65 },
];

const topPosts = [
  {
    id: 1,
    content: "Manifesto pela educação pública e gratuita",
    views: 12450,
    likes: 890,
    comments: 234,
    shares: 156,
    date: "5 dias atrás"
  },
  {
    id: 2,
    content: "Festival de música brasileira - inscrições abertas",
    views: 9870,
    likes: 720,
    comments: 189,
    shares: 134,
    date: "8 dias atrás"
  },
  {
    id: 3,
    content: "Debate sobre reforma agrária",
    views: 7650,
    likes: 580,
    comments: 156,
    shares: 98,
    date: "12 dias atrás"
  },
];

export function InstitutionAnalytics({ onBack }: InstitutionAnalyticsProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [fanGrowth, setFanGrowth] = useState(0);
  const [engagementGrowth, setEngagementGrowth] = useState(0);

  useEffect(() => {
    // Calcular crescimento
    const lastMonth = engagementData[engagementData.length - 1];
    const prevMonth = engagementData[engagementData.length - 2];
    
    const fanIncrease = ((lastMonth.fãs - prevMonth.fãs) / prevMonth.fãs) * 100;
    const engagementIncrease = ((lastMonth.interações - prevMonth.interações) / prevMonth.interações) * 100;
    
    setFanGrowth(fanIncrease);
    setEngagementGrowth(engagementIncrease);
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <Button onClick={onBack} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <div>
            <h1 className="text-green-700">Analytics Institucional</h1>
            <p className="text-gray-600">Métricas e insights do seu perfil</p>
          </div>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Download className="w-4 h-4 mr-2" />
          Exportar Relatório
        </Button>
      </motion.div>

      {/* Cards de resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-purple-900">Total de Fãs</h3>
              <Heart className="w-5 h-5 text-purple-600" />
            </div>
            <div className="text-3xl font-bold text-purple-700 mb-1">
              {engagementData[engagementData.length - 1].fãs.toLocaleString()}
            </div>
            <div className="flex items-center gap-1 text-sm">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-green-600 font-medium">+{fanGrowth.toFixed(1)}%</span>
              <span className="text-gray-600">este mês</span>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-blue-900">Interações</h3>
              <Activity className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-blue-700 mb-1">
              {engagementData[engagementData.length - 1].interações.toLocaleString()}
            </div>
            <div className="flex items-center gap-1 text-sm">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-green-600 font-medium">+{engagementGrowth.toFixed(1)}%</span>
              <span className="text-gray-600">este mês</span>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-green-900">Alcance Médio</h3>
              <Eye className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-green-700 mb-1">
              8.9k
            </div>
            <div className="flex items-center gap-1 text-sm">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-green-600 font-medium">+12.4%</span>
              <span className="text-gray-600">este mês</span>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-yellow-900">Taxa de Engajamento</h3>
              <Target className="w-5 h-5 text-yellow-600" />
            </div>
            <div className="text-3xl font-bold text-yellow-700 mb-1">
              7.2%
            </div>
            <div className="flex items-center gap-1 text-sm">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-green-600 font-medium">+0.8%</span>
              <span className="text-gray-600">este mês</span>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Tabs de conteúdo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white border">
            <TabsTrigger value="overview">
              <BarChart3 className="w-4 h-4 mr-2" />
              Visão Geral
            </TabsTrigger>
            <TabsTrigger value="demographic">
              <PieChart className="w-4 h-4 mr-2" />
              Demografia
            </TabsTrigger>
            <TabsTrigger value="content">
              <MessageCircle className="w-4 h-4 mr-2" />
              Conteúdo
            </TabsTrigger>
            <TabsTrigger value="goals">
              <Award className="w-4 h-4 mr-2" />
              Metas
            </TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="overview" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Gráfico de crescimento */}
                <Card className="p-6">
                  <h3 className="font-medium mb-4">Crescimento de Fãs</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={engagementData}>
                      <defs>
                        <linearGradient id="colorFãs" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="mes" />
                      <YAxis />
                      <Tooltip />
                      <Area 
                        type="monotone" 
                        dataKey="fãs" 
                        stroke="#8b5cf6" 
                        fillOpacity={1} 
                        fill="url(#colorFãs)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </Card>

                {/* Gráfico de interações */}
                <Card className="p-6">
                  <h3 className="font-medium mb-4">Interações Mensais</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={engagementData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="mes" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="interações" fill="#3b82f6" />
                      <Bar dataKey="posts" fill="#10b981" />
                    </BarChart>
                  </ResponsiveContainer>
                </Card>

                {/* Engajamento por categoria */}
                <Card className="p-6 lg:col-span-2">
                  <h3 className="font-medium mb-4">Engajamento por Categoria</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={interestData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" domain={[0, 100]} />
                      <YAxis dataKey="categoria" type="category" width={100} />
                      <Tooltip />
                      <Bar dataKey="engajamento" fill="#f59e0b" />
                    </BarChart>
                  </ResponsiveContainer>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="demographic" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="font-medium mb-4">Distribuição por Faixa Etária</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPie>
                      <Pie
                        data={demographicData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {demographicData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPie>
                  </ResponsiveContainer>
                </Card>

                <Card className="p-6">
                  <h3 className="font-medium mb-4">Estatísticas Demográficas</h3>
                  <div className="space-y-4">
                    {demographicData.map((demo, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-4 h-4 rounded-full" 
                            style={{ backgroundColor: demo.color }}
                          />
                          <span className="font-medium">{demo.name} anos</span>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-lg">{demo.value}</div>
                          <div className="text-sm text-gray-600">
                            {((demo.value / demographicData.reduce((a, b) => a + b.value, 0)) * 100).toFixed(1)}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="content" className="mt-0">
              <Card className="p-6">
                <h3 className="font-medium mb-4">Posts com Melhor Desempenho</h3>
                <div className="space-y-4">
                  {topPosts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-medium mb-1">{post.content}</h4>
                          <p className="text-sm text-gray-500">{post.date}</p>
                        </div>
                        <Badge className="bg-green-100 text-green-700">
                          #{index + 1}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-4 gap-4">
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
                            <Eye className="w-4 h-4" />
                            <span className="text-xs">Visualizações</span>
                          </div>
                          <div className="font-bold text-lg">{post.views.toLocaleString()}</div>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
                            <Heart className="w-4 h-4" />
                            <span className="text-xs">Curtidas</span>
                          </div>
                          <div className="font-bold text-lg">{post.likes}</div>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
                            <MessageCircle className="w-4 h-4" />
                            <span className="text-xs">Comentários</span>
                          </div>
                          <div className="font-bold text-lg">{post.comments}</div>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
                            <Share2 className="w-4 h-4" />
                            <span className="text-xs">Compartilh.</span>
                          </div>
                          <div className="font-bold text-lg">{post.shares}</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="goals" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="font-medium mb-4">Metas do Mês</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Meta de Fãs: 2.000</span>
                        <span className="text-sm text-gray-600">1.650 / 2.000</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-purple-500 h-2 rounded-full transition-all duration-500" 
                          style={{ width: '82.5%' }}
                        />
                      </div>
                      <p className="text-xs text-gray-600 mt-1">82.5% concluído</p>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Meta de Engajamento: 3.000</span>
                        <span className="text-sm text-gray-600">2.450 / 3.000</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-500" 
                          style={{ width: '81.7%' }}
                        />
                      </div>
                      <p className="text-xs text-gray-600 mt-1">81.7% concluído</p>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Meta de Posts: 60</span>
                        <span className="text-sm text-gray-600">58 / 60</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full transition-all duration-500" 
                          style={{ width: '96.7%' }}
                        />
                      </div>
                      <p className="text-xs text-gray-600 mt-1">96.7% concluído</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="font-medium mb-4">Conquistas Recentes</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <Award className="w-8 h-8 text-yellow-600" />
                      <div>
                        <h4 className="font-medium">1.000 Fãs!</h4>
                        <p className="text-xs text-gray-600">Alcançado em 15 Nov</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <TrendingUp className="w-8 h-8 text-blue-600" />
                      <div>
                        <h4 className="font-medium">Post Viral</h4>
                        <p className="text-xs text-gray-600">12k visualizações</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <Users className="w-8 h-8 text-green-600" />
                      <div>
                        <h4 className="font-medium">Comunidade Ativa</h4>
                        <p className="text-xs text-gray-600">7.2% taxa de engajamento</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </motion.div>
    </div>
  );
}
