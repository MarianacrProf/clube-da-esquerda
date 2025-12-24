import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

interface BetaTesterBadgeProps {
  onClick?: () => void;
}

export function BetaTesterBadge({ onClick }: BetaTesterBadgeProps) {
  return (
    <motion.button
      onClick={onClick}
      className="relative px-4 py-2 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-full text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all cursor-pointer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="flex items-center gap-2">
        <Sparkles className="w-4 h-4" />
        <span>BETA TESTER</span>
        <Sparkles className="w-4 h-4" />
      </div>
      <motion.div
        className="absolute inset-0 rounded-full bg-white"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      />
    </motion.button>
  );
}
