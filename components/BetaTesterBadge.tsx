import { motion } from "motion/react";
import { Sparkles } from "lucide-react";
import { Badge } from "./ui/badge";

interface BetaTesterBadgeProps {
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
  animated?: boolean;
}

export function BetaTesterBadge({ 
  size = "md", 
  showIcon = true,
  animated = true 
}: BetaTesterBadgeProps) {
  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-3 py-1",
    lg: "text-base px-4 py-1.5"
  };

  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5"
  };

  const BadgeContent = () => (
    <Badge 
      className={`
        bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 
        text-white border-0 font-bold
        ${sizeClasses[size]}
        shadow-lg
      `}
    >
      {showIcon && <Sparkles className={`${iconSizes[size]} mr-1.5`} />}
      Beta Tester
    </Badge>
  );

  if (!animated) {
    return <BadgeContent />;
  }

  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ 
        scale: 1, 
        rotate: 0,
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20
      }}
      whileHover={{ 
        scale: 1.1,
        transition: { duration: 0.2 }
      }}
    >
      <motion.div
        animate={{
          boxShadow: [
            "0 0 0 0 rgba(168, 85, 247, 0.4)",
            "0 0 0 10px rgba(168, 85, 247, 0)",
          ]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "loop"
        }}
        className="rounded-full"
      >
        <BadgeContent />
      </motion.div>
    </motion.div>
  );
}
