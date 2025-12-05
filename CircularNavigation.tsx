import { motion } from "motion/react";
import { Heart, MessageCircle, Calendar, Settings, Home, Megaphone, ShoppingBag, Theater } from "lucide-react";

// Componente personalizado para ícone de comunidades (dois círculos)
const CommunityIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="8"/>
    <circle cx="12" cy="12" r="4"/>
  </svg>
);

// Componente personalizado para ícone de perfil (duas pessoas)
const ProfileIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

// Ícone de máscaras de teatro para indicações
const TheaterMasksIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2c-4 0-8 2-8 6 0 3 2 5 4 6l-1 2h10l-1-2c2-1 4-3 4-6 0-4-4-6-8-6z"/>
    <path d="M9 9c0-1 1-2 2-2s2 1 2 2-1 2-2 2-2-1-2-2z"/>
    <path d="M7 11c0 1 1 2 2 2s2-1 2-2"/>
    <path d="M13 11c0 1 1 2 2 2s2-1 2-2"/>
  </svg>
);

// Ícone de presente para brindes
const GiftIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="8" width="18" height="4" rx="1"/>
    <path d="m12 8-1-4h2l-1 4"/>
    <path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
    <rect x="3" y="12" width="18" height="9" rx="1"/>
    <path d="M12 12v9"/>
  </svg>
);

const navItems = [
  { icon: Home, label: "Roda Principal", angle: 0 },
  { icon: ProfileIcon, label: "Perfil", angle: 40 },
  { icon: MessageCircle, label: "Conversas", angle: 80 },
  { icon: CommunityIcon, label: "Comunidades", angle: 120 },
  { icon: Megaphone, label: "Fóruns", angle: 160 },
  { icon: Calendar, label: "Chamados", angle: 200 },
  { icon: TheaterMasksIcon, label: "Indicações", angle: 240 },
  { icon: Heart, label: "Caixinhas", angle: 280 },
  { icon: GiftIcon, label: "Brindes", angle: 320 }
];

interface CircularNavigationProps {
  activeItem: string;
  onItemClick: (item: string) => void;
}

export function CircularNavigation({ activeItem, onItemClick }: CircularNavigationProps) {
  const radius = 120;
  const centerX = 150;
  const centerY = 150;

  return (
    <div className="fixed top-24 left-8 w-[300px] h-[300px] z-50">
      <div className="relative w-full h-full">
        {/* Centro da roda */}
        <motion.div 
          className="absolute top-1/2 left-1/2 w-24 h-24 -mt-12 -ml-12 bg-gradient-to-br from-green-500 via-yellow-400 to-red-500 rounded-full flex items-center justify-center shadow-2xl"
          whileHover={{ scale: 1.1 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <div className="text-center text-white">
            <div className="font-bold text-xs">CLUBE DA</div>
            <div className="font-bold text-xs">ESQUERDA</div>
          </div>
        </motion.div>

        {/* Itens de navegação em círculo */}
        {navItems.map((item, index) => {
          const angle = (item.angle * Math.PI) / 180;
          const x = centerX + radius * Math.cos(angle - Math.PI / 2);
          const y = centerY + radius * Math.sin(angle - Math.PI / 2);
          const Icon = item.icon;
          const isActive = activeItem === item.label;

          return (
            <motion.button
              key={item.label}
              className={`absolute w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                isActive 
                  ? 'bg-red-500 text-white scale-110' 
                  : 'bg-white text-gray-700 hover:bg-yellow-400 hover:text-white'
              }`}
              style={{
                left: x - 28,
                top: y - 28,
              }}
              onClick={() => onItemClick(item.label)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Icon className="w-6 h-6" />
            </motion.button>
          );
        })}

        {/* Linhas conectoras */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {navItems.map((item, index) => {
            const angle = (item.angle * Math.PI) / 180;
            const x = centerX + radius * Math.cos(angle - Math.PI / 2);
            const y = centerY + radius * Math.sin(angle - Math.PI / 2);
            
            return (
              <motion.line
                key={index}
                x1={centerX}
                y1={centerY}
                x2={x}
                y2={y}
                stroke="rgba(220, 38, 38, 0.3)"
                strokeWidth="2"
                strokeDasharray="5,5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
}