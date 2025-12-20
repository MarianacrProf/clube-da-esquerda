import { motion } from "motion/react";
import { useState } from "react";

interface CommunityData {
  name: string;
  members: number;
  symbol: string;
  iconColor: string;
  baseColor: string;
  metalColor: string;
  description: string;
  stencilFont?: boolean;
}

interface CommunityButton3DProps {
  community: CommunityData;
  index: number;
  onClick?: () => void;
}

export function CommunityButton3D({ community, index, onClick }: CommunityButton3DProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      className="relative group perspective-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      initial={{ opacity: 0, y: 20, rotateX: -45 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Sombra 3D sutil */}
      <motion.div
        className="absolute inset-0 bg-black/15 rounded-full transform blur-sm"
        animate={{
          translateY: isHovered ? 2 : 4,
          translateX: isHovered ? 2 : 3,
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Pin/Patch principal - formato redondo */}
      <motion.div
        className="relative rounded-full border-2 border-white/70 transform-gpu overflow-hidden shadow-md"
        style={{
          transformStyle: "preserve-3d",
          background: community.baseColor,
          width: '120px',
          height: '120px',
        }}
        animate={{
          rotateX: isHovered ? -8 : -2,
          rotateY: isHovered ? 5 : 0,
          translateZ: isHovered ? 15 : 5,
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >

        {/* Conteúdo do patch - redondo */}
        <div className="relative h-full flex flex-col items-center justify-center text-white p-4">
          {/* Símbolo principal */}
          <motion.div
            className="mb-2 text-center"
            animate={{
              scale: isHovered ? [1, 1.15, 1.1] : 1,
              rotateZ: isHovered ? [0, 3, -3, 0] : 0,
            }}
            transition={{ duration: 0.5 }}
          >
            <div className={`text-3xl ${community.iconColor} filter drop-shadow-lg`}>
              {community.symbol}
            </div>
            
            {/* Efeito de brilho suave no hover */}
            {isHovered && (
              <motion.div
                className="absolute inset-0 bg-white/20 rounded-full"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </motion.div>

          {/* Nome da comunidade com fonte em preto */}
          <motion.h3
            className="font-bold text-xs mb-1 text-center tracking-wide uppercase text-black bg-white/90 px-2 py-1 rounded"
            style={{
              textShadow: '1px 1px 2px rgba(255,255,255,0.8)',
              fontSize: '10px',
              lineHeight: '1.2',
            }}
            animate={{
              scale: isHovered ? 1.05 : 1,
            }}
            transition={{ duration: 0.2 }}
          >
            {community.name}
          </motion.h3>

          {/* Contador de membros simples */}
          <div className="text-center mb-1">
            <motion.div
              className="text-xs text-white/90 bg-black/30 rounded-full px-2 py-1"
              style={{ fontSize: '8px' }}
              animate={{
                scale: isHovered ? 1.05 : 1,
              }}
            >
              {community.members.toLocaleString()}
            </motion.div>
          </div>

          {/* Descrição que aparece no hover */}
          <motion.p
            className="text-xs text-center opacity-0 overflow-hidden font-medium uppercase tracking-wide absolute bottom-2 left-2 right-2"
            style={{ fontSize: '8px' }}
            animate={{
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            {community.description}
          </motion.p>
        </div>

        {/* Efeito de brilho no clique */}
        <motion.div
          className="absolute inset-0 bg-white/30 opacity-0 rounded-full"
          whileTap={{
            opacity: [0, 0.6, 0],
          }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>
    </motion.button>
  );
}

// Dados das comunidades com estética de patches suaves
export const communitiesData: CommunityData[] = [
  {
    name: "Música Brasileira",
    members: 1247,
    symbol: "🪘",
    iconColor: "text-amber-800",
    baseColor: "#fef9e7",
    metalColor: "#f59e0b",
    description: "Som da resistência",
    stencilFont: true
  },
  {
    name: "Literatura",
    members: 890,
    symbol: "📖",
    iconColor: "text-purple-800",
    baseColor: "#f7f3ff",
    metalColor: "#8b5cf6",
    description: "Palavras de luta",
    stencilFont: true
  },
  {
    name: "Filosofia Política",
    members: 2156,
    symbol: "⚡",
    iconColor: "text-yellow-800",
    baseColor: "#fffef0",
    metalColor: "#eab308",
    description: "Pensamento rebelde",
    stencilFont: true
  },
  {
    name: "Festa Brasileira",
    members: 567,
    symbol: "🔥",
    iconColor: "text-orange-800",
    baseColor: "#fef5f0",
    metalColor: "#ea580c",
    description: "Cultura da periferia",
    stencilFont: true
  },
  {
    name: "Saúde Mental",
    members: 1834,
    symbol: "🎗️",
    iconColor: "text-green-800",
    baseColor: "#f0fdf5",
    metalColor: "#16a34a",
    description: "Cuidado coletivo",
    stencilFont: true
  },
  {
    name: "História",
    members: 1023,
    symbol: "🏹",
    iconColor: "text-amber-800",
    baseColor: "#fefdf0",
    metalColor: "#b45309",
    description: "Memória rebelde",
    stencilFont: true
  },
  {
    name: "Educação Pública",
    members: 2890,
    symbol: "✊🏿",
    iconColor: "text-blue-800",
    baseColor: "#f0f8ff",
    metalColor: "#2563eb",
    description: "Educação liberta",
    stencilFont: true
  },
  {
    name: "SUS",
    members: 1456,
    symbol: "⚕️",
    iconColor: "text-red-800",
    baseColor: "#fef5f5",
    metalColor: "#dc2626",
    description: "Saúde é direito",
    stencilFont: true
  }
];