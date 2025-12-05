import { motion } from "motion/react";

export function BrazilianBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-10 z-0">
      {/* Listras onduladas da floresta */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800" fill="none">
        {/* Ondas verdes da floresta */}
        <motion.path
          d="M0,200 Q300,150 600,200 T1200,200 L1200,250 Q900,300 600,250 T0,250 Z"
          fill="url(#forestGradient1)"
          animate={{ d: [
            "M0,200 Q300,150 600,200 T1200,200 L1200,250 Q900,300 600,250 T0,250 Z",
            "M0,180 Q300,230 600,180 T1200,180 L1200,230 Q900,130 600,230 T0,230 Z",
            "M0,200 Q300,150 600,200 T1200,200 L1200,250 Q900,300 600,250 T0,250 Z"
          ] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <motion.path
          d="M0,350 Q400,300 800,350 T1200,350 L1200,400 Q800,450 400,400 T0,400 Z"
          fill="url(#forestGradient2)"
          animate={{ d: [
            "M0,350 Q400,300 800,350 T1200,350 L1200,400 Q800,450 400,400 T0,400 Z",
            "M0,330 Q400,380 800,330 T1200,330 L1200,380 Q800,280 400,380 T0,380 Z",
            "M0,350 Q400,300 800,350 T1200,350 L1200,400 Q800,450 400,400 T0,400 Z"
          ] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        <motion.path
          d="M0,500 Q200,450 400,500 T800,500 T1200,500 L1200,550 Q1000,600 800,550 T400,550 T0,550 Z"
          fill="url(#forestGradient3)"
          animate={{ d: [
            "M0,500 Q200,450 400,500 T800,500 T1200,500 L1200,550 Q1000,600 800,550 T400,550 T0,550 Z",
            "M0,480 Q200,530 400,480 T800,480 T1200,480 L1200,530 Q1000,430 800,530 T400,530 T0,530 Z",
            "M0,500 Q200,450 400,500 T800,500 T1200,500 L1200,550 Q1000,600 800,550 T400,550 T0,550 Z"
          ] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />

        {/* Gradientes para as ondas */}
        <defs>
          <linearGradient id="forestGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="50%" stopColor="#16a34a" />
            <stop offset="100%" stopColor="#15803d" />
          </linearGradient>
          <linearGradient id="forestGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#eab308" />
            <stop offset="50%" stopColor="#ca8a04" />
            <stop offset="100%" stopColor="#a16207" />
          </linearGradient>
          <linearGradient id="forestGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#dc2626" />
            <stop offset="50%" stopColor="#b91c1c" />
            <stop offset="100%" stopColor="#991b1b" />
          </linearGradient>
        </defs>
      </svg>


    </div>
  );
}