import React, { useState, useEffect, useRef } from 'react';
import { Home, Globe, Settings, LogOut, Search, User, Play, Users, RefreshCw, MoreHorizontal, ChevronRight, Check, Sparkles, Store, Loader2, Pencil, Cpu, Wrench, Compass, Send } from 'lucide-react';
import { WorkshopAvatarFaceBadge } from './WorkshopAvatarFaceBadge';
import { RealisticFluidEngine } from '../engine/realisticFluidEngine';

export interface ServerInfo {
  id: string;
  name: string;
  mapId: string;
  maxPlayers: number;
  playerCount: number;
  pingMs: number;
  status: string;
}

interface GameMenuModalProps {
  isOpen: boolean;
  onStartSingleplayer: (mapId: string) => void;
  onJoinMultiplayer: (server: ServerInfo, playerName: string) => void;
  onClose?: () => void;
  currentMapId?: string;
  onOpenAvatarEditor?: () => void;
}

// Beautiful Vector SVG Icons created with pure code (no emojis)
const CosmicSVGIcon: React.FC = () => (
  <svg viewBox="0 0 64 64" className="w-10 h-10 select-none pointer-events-none" fill="none">
    <circle cx="32" cy="32" r="28" fill="url(#cosmicGrad)" />
    <path d="M16,32 C22,16 42,16 48,32 C42,48 22,48 16,32 Z" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
    <circle cx="32" cy="32" r="8" fill="#ffffff" />
    <circle cx="20" cy="24" r="2" fill="#ffffff" />
    <circle cx="44" cy="40" r="1.5" fill="#ffffff" />
    <circle cx="48" cy="22" r="1" fill="#ffffff" />
    <defs>
      <radialGradient id="cosmicGrad" cx="32" cy="32" r="28" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#8b5cf6" />
        <stop offset="50%" stopColor="#4c1d95" />
        <stop offset="100%" stopColor="#0f172a" />
      </radialGradient>
    </defs>
  </svg>
);

const LavaSVGIcon: React.FC = () => (
  <svg viewBox="0 0 64 64" className="w-10 h-10 select-none pointer-events-none" fill="none">
    <circle cx="32" cy="32" r="28" fill="url(#lavaIconGrad)" />
    <path d="M32,12 C32,12 18,28 18,40 C18,48 24,52 32,52 C40,52 46,48 46,40 C46,28 32,12 32,12 Z" fill="url(#fireGrad)" />
    <circle cx="28" cy="42" r="3" fill="#ffedd5" />
    <circle cx="38" cy="36" r="2" fill="#ffedd5" />
    <defs>
      <radialGradient id="lavaIconGrad" cx="32" cy="32" r="28" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#ea580c" />
        <stop offset="70%" stopColor="#991b1b" />
        <stop offset="100%" stopColor="#180404" />
      </radialGradient>
      <linearGradient id="fireGrad" x1="32" y1="12" x2="32" y2="52" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#fde047" />
        <stop offset="40%" stopColor="#f97316" />
        <stop offset="100%" stopColor="#dc2626" />
      </linearGradient>
    </defs>
  </svg>
);

const DollSVGIcon: React.FC = () => (
  <svg viewBox="0 0 64 64" className="w-10 h-10 select-none pointer-events-none" fill="none">
    {/* Body structure dummy */}
    <circle cx="32" cy="20" r="7" fill="#64748b" stroke="#000000" strokeWidth="2.5" />
    <rect x="25" y="29" width="14" height="18" rx="4" fill="#64748b" stroke="#000000" strokeWidth="2.5" />
    <line x1="25" y1="32" x2="16" y2="40" stroke="#000000" strokeWidth="3" strokeLinecap="round" />
    <line x1="39" y1="32" x2="48" y2="40" stroke="#000000" strokeWidth="3" strokeLinecap="round" />
    <line x1="28" y1="47" x2="24" y2="58" stroke="#000000" strokeWidth="3" strokeLinecap="round" />
    <line x1="36" y1="47" x2="40" y2="58" stroke="#000000" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

const VuduSVGIcon: React.FC = () => (
  <svg viewBox="0 0 64 64" className="w-10 h-10 select-none pointer-events-none" fill="none">
    {/* Puppet */}
    <circle cx="32" cy="20" r="8" fill="#d97706" stroke="#000000" strokeWidth="2" />
    {/* Stitch eyes */}
    <path d="M28,18 L30,22 M30,18 L28,22" stroke="#000000" strokeWidth="2" />
    <path d="M34,18 L36,22 M36,18 L34,22" stroke="#000000" strokeWidth="2" />
    {/* Stitched mouth */}
    <path d="M26,25 L38,25 M29,23 L29,27 M32,23 L32,27 M35,23 L35,27" stroke="#000000" strokeWidth="1.5" />
    {/* Pin sticking out */}
    <line x1="48" y1="14" x2="35" y2="24" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="48" cy="14" r="3" fill="#dc2626" />
    {/* Body */}
    <path d="M24,30 L40,30 L36,52 L28,52 Z" fill="#d97706" stroke="#000000" strokeWidth="2" />
  </svg>
);

const MilkSVGIcon: React.FC = () => (
  <svg viewBox="0 0 64 64" className="w-10 h-10 select-none pointer-events-none" fill="none">
    {/* Milk carton shape */}
    <path d="M22,24 L32,14 L42,24 L42,54 L22,54 Z" fill="#ffffff" stroke="#000000" strokeWidth="2.5" />
    <path d="M22,24 L42,24" stroke="#000000" strokeWidth="2.5" />
    <path d="M22,34 C22,34 27,31 32,34 C37,37 42,34 42,34 L42,44 C42,44 37,41 32,44 C27,47 22,44 22,44 Z" fill="#3b82f6" />
    <text x="32" y="50" textAnchor="middle" fill="#000000" fontSize="7" fontWeight="bold" fontFamily="sans-serif">MILK</text>
  </svg>
);

// Beautiful vector representation of the glossy green Windows Live Messenger (MSN) Buddy Icon
const MSNBuddySVG: React.FC<{ hueShift?: number; className?: string }> = ({ hueShift = 0, className = "w-14 h-14" }) => {
  return (
    <div className={`relative flex items-center justify-center shrink-0 overflow-hidden ${className}`} style={{ filter: `hue-rotate(${hueShift}deg)` }}>
      <svg viewBox="0 0 100 100" className="w-full h-full select-none pointer-events-none" fill="none">
        {/* Outer Dark Blue Contour Drop-shadow-like Outline */}
        <path 
          d="M50,11 C61.6,11 71,20.4 71,32 C71,39.6 67,46.2 61,50 C74.2,54 84,65.8 84,80 C84,86.6 78.6,92 72,92 L28,92 C21.4,92 16,86.6 16,80 C16,65.8 25.8,54 39,50 C33,46.2 29,39.6 29,32 C29,20.4 38.4,11 50,11 Z" 
          fill="none" 
          stroke="#004da8" 
          strokeWidth="6" 
          strokeLinejoin="round" 
        />
        
        <defs>
          <linearGradient id="msnBodyGrad" x1="50" y1="52" x2="50" y2="92" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#256c70" />
            <stop offset="40%" stopColor="#4bb631" />
            <stop offset="85%" stopColor="#b4f84c" />
            <stop offset="100%" stopColor="#a3eb34" />
          </linearGradient>
          <radialGradient id="msnHeadGrad" cx="50" cy="28" r="21" fx="50" fy="23" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#d9ff73" />
            <stop offset="50%" stopColor="#52cc29" />
            <stop offset="85%" stopColor="#1e6b54" />
            <stop offset="100%" stopColor="#114b3a" />
          </radialGradient>
        </defs>

        {/* Body Shape */}
        <path 
          d="M50,47.5 C68.5,47.5 83.5,62 83.5,80 C83.5,85.5 79,90 73.5,90 L26.5,90 C21,90 16.5,85.5 16.5,80 C16.5,62 31.5,47.5 50,47.5 Z" 
          fill="url(#msnBodyGrad)" 
          stroke="#004da8" 
          strokeWidth="1.5"
        />

        {/* Head Shape */}
        <circle 
          cx="50" 
          cy="32" 
          r="21" 
          fill="url(#msnHeadGrad)" 
          stroke="#004da8" 
          strokeWidth="1.5" 
        />

        {/* Glossy highlight overlay on the Head (classic bubble shine) */}
        <path 
          d="M32.5,27 C33,18.5 40,13.5 50,13.5 C60,13.5 67,18.5 67.5,27 C64,21 58,16 50,16 C42,16 36,21 32.5,27 Z" 
          fill="rgba(255, 255, 255, 0.6)" 
        />
        <ellipse cx="50" cy="18" rx="11" ry="5.5" fill="rgba(255, 255, 255, 0.4)" />

        {/* Reflection on lower head */}
        <path 
          d="M31.5,38 C35.5,46 44.5,49.5 50,49.5 C55.5,49.5 64.5,46 68.5,38 C65.5,43 58.5,46.5 50,46.5 C41.5,46.5 34.5,43 31.5,38 Z" 
          fill="rgba(255, 255, 255, 0.25)" 
        />

        {/* Glossy highlights on shoulders & chest */}
        <path 
          d="M19,74 C18.5,66 23.5,55.5 32.5,51.5 C27,56.5 22.5,64 22,74 Z" 
          fill="rgba(255, 255, 255, 0.35)" 
        />
        <path 
          d="M81,74 C81.5,66 76.5,55.5 67.5,51.5 C73,56.5 77.5,64 78,74 Z" 
          fill="rgba(255, 255, 255, 0.35)" 
        />

        {/* Chest bright highlight */}
        <ellipse cx="50" cy="81" rx="18" ry="7" fill="rgba(255, 255, 255, 0.2)" />
        <ellipse cx="50" cy="85" rx="14" ry="4" fill="rgba(255, 255, 255, 0.3)" />
      </svg>
    </div>
  );
};

// Premium glossy banners (Frutiger Aero / Toxic Chemical styles) for profile cards
const ProfileBannerView: React.FC<{ style?: string }> = ({ style = 'default' }) => {
  if (style === 'banner_frutiger' || style === 'default') {
    return (
      <div className="absolute top-0 left-0 right-0 h-28 w-full bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 overflow-hidden border-b-[4px] border-black">
        {/* Shiny bubble shapes and glass reflections */}
        <div className="absolute -top-10 -left-10 w-24 h-24 bg-white/20 rounded-full blur-xl" />
        <div className="absolute top-4 right-12 w-12 h-12 bg-sky-200/40 rounded-full border border-white/30" />
        <div className="absolute bottom-2 left-20 w-6 h-6 bg-white/30 rounded-full border border-white/40" />
        <div className="absolute top-1 left-1/3 w-16 h-8 bg-gradient-to-b from-white/40 to-transparent rounded-full" />
        <div className="absolute bottom-1 right-4 w-4 h-4 bg-white/20 rounded-full" />
      </div>
    );
  }
  if (style === 'banner_toxic') {
    return (
      <div className="absolute top-0 left-0 right-0 h-28 w-full bg-neutral-950 overflow-hidden border-b-[4px] border-black">
        {/* Toxic hazard lines and bright neon green bio elements */}
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,#10b981_25%,#10b981_50%,transparent_50%,transparent_75%,#10b981_75%)] bg-[size:24px_24px] opacity-20" />
        <div className="absolute top-2 right-4 w-14 h-14 rounded-full bg-emerald-500/20 blur-md border border-emerald-500/40 animate-pulse" />
        <div className="absolute -bottom-6 left-6 w-20 h-20 rounded-full bg-green-500/10 blur-xl" />
        <div className="absolute bottom-4 right-6 text-[9px] font-mono font-black text-emerald-400 opacity-80 border border-emerald-500/30 px-2 py-0.5 rounded bg-emerald-950/40">☣️ TOXIC ZONE</div>
      </div>
    );
  }
  // Default simple banner fallback
  return (
    <div className="absolute top-0 left-0 right-0 h-28 w-full bg-gradient-to-r from-pink-100 to-rose-100 border-b-[4px] border-black" />
  );
};

// Beautiful high-gloss Vector SVG Shopping Cart icon
export const ShoppingCartSVG: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 64 64" className={`${className} select-none pointer-events-none drop-shadow-[0_1.5px_3px_rgba(0,0,0,0.35)]`} fill="none">
    <defs>
      <linearGradient id="cartGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="50%" stopColor="#eab308" />
        <stop offset="100%" stopColor="#a16207" />
      </linearGradient>
    </defs>
    <path d="M12,16 L18,16 L24,38 L48,38 L54,20 L20,20" stroke="url(#cartGoldGrad)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="26" cy="48" r="4.5" fill="url(#cartGoldGrad)" stroke="#0f172a" strokeWidth="1.5" />
    <circle cx="46" cy="48" r="4.5" fill="url(#cartGoldGrad)" stroke="#0f172a" strokeWidth="1.5" />
  </svg>
);

// Beautiful high-gloss Vector SVG Jigsaw Puzzle piece icon
export const PuzzleSVG: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 64 64" className={`${className} select-none pointer-events-none drop-shadow-[0_1.5px_3px_rgba(0,0,0,0.35)]`} fill="none">
    <defs>
      <linearGradient id="puzzleNeonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#818cf8" />
        <stop offset="50%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#1e3a8a" />
      </linearGradient>
    </defs>
    <path d="M14,16 L22,16 C22,12 26,12 28,12 C30,12 34,12 34,16 L46,16 L46,28 C42,28 42,32 42,34 C42,36 42,40 46,40 L46,50 L34,50 C34,46 30,46 28,46 C26,46 22,46 22,50 L14,50 L14,40 L22,40 C22,36 22,32 22,28 L14,28 L14,16 Z" fill="url(#puzzleNeonGrad)" stroke="#1e1b4b" strokeWidth="2.5" strokeLinejoin="round" />
  </svg>
);

// Beautiful high-gloss Vector SVG Drawing Museum frame icon
export const MuseumDrawingSVG: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 64 64" className={`${className} select-none pointer-events-none drop-shadow-[0_1.5px_3px_rgba(0,0,0,0.35)]`} fill="none">
    <defs>
      <linearGradient id="museumArtGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f472b6" />
        <stop offset="50%" stopColor="#ec4899" />
        <stop offset="100%" stopColor="#be185d" />
      </linearGradient>
      <linearGradient id="museumFrameGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#fbbf24" />
        <stop offset="100%" stopColor="#d97706" />
      </linearGradient>
    </defs>
    {/* Golden outer picture frame */}
    <rect x="10" y="10" width="44" height="44" rx="6" fill="none" stroke="url(#museumFrameGrad)" strokeWidth="3.5" strokeLinejoin="round" />
    {/* Inner drawing/artwork canvas */}
    <rect x="15" y="15" width="34" height="34" rx="3" fill="url(#museumArtGrad)" />
    {/* Drawing content: mountain peaks and shining sun */}
    <path d="M19,39 L26,30 L32,36 L39,26 L45,39 Z" fill="#fff" opacity="0.8" />
    <circle cx="38" cy="21" r="3.5" fill="#fef08a" />
  </svg>
);

// Premium, completely custom SVG logos crafted specifically (no emojis or pre-existing marketplace icons)
export const CustomMarketLogo: React.FC<{ className?: string }> = ({ className = "w-12 h-12" }) => (
  <svg viewBox="0 0 64 64" className={`${className} select-none pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]`} fill="none">
    <defs>
      <linearGradient id="marketGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="50%" stopColor="#eab308" />
        <stop offset="100%" stopColor="#a16207" />
      </linearGradient>
      <linearGradient id="marketDarkGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#1e293b" />
        <stop offset="100%" stopColor="#0f172a" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="28" fill="url(#marketDarkGrad)" stroke="url(#marketGoldGrad)" strokeWidth="3" />
    <path d="M32,14 L46,22 L46,42 L32,50 L18,42 L18,22 Z" fill="none" stroke="url(#marketGoldGrad)" strokeWidth="2" strokeLinejoin="round" />
    <circle cx="32" cy="32" r="10" fill="url(#marketGoldGrad)" />
    <polygon points="32,25 35,30 40,30 36,34 38,39 32,36 26,39 28,34 24,30 29,30" fill="#0f172a" />
    <line x1="32" y1="6" x2="32" y2="11" stroke="url(#marketGoldGrad)" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="32" y1="53" x2="32" y2="58" stroke="url(#marketGoldGrad)" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="6" y1="32" x2="11" y2="32" stroke="url(#marketGoldGrad)" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="53" y1="32" x2="58" y2="32" stroke="url(#marketGoldGrad)" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

export const CustomPluginLogo: React.FC<{ className?: string }> = ({ className = "w-12 h-12" }) => (
  <svg viewBox="0 0 64 64" className={`${className} select-none pointer-events-none drop-shadow-[0_2px_5px_rgba(0,0,0,0.4)]`} fill="none">
    <defs>
      <linearGradient id="pluginMetalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#475569" />
        <stop offset="50%" stopColor="#1e293b" />
        <stop offset="100%" stopColor="#0f172a" />
      </linearGradient>
      <linearGradient id="pluginNeonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#818cf8" />
        <stop offset="100%" stopColor="#38bdf8" />
      </linearGradient>
    </defs>
    <path d="M12,8 L52,8 L56,12 L56,52 L52,56 L12,56 L8,52 L8,12 Z" fill="url(#pluginMetalGrad)" stroke="url(#pluginNeonGrad)" strokeWidth="2.5" />
    <rect x="22" y="22" width="20" height="20" rx="4" fill="#0f172a" stroke="url(#pluginNeonGrad)" strokeWidth="2" />
    <rect x="26" y="26" width="12" height="12" rx="2" fill="url(#pluginNeonGrad)" />
    <path d="M14,20 L22,20 M14,32 L22,32 M14,44 L22,44 M42,20 L50,20 M42,32 L50,32 M42,44 L50,44 M20,14 L20,22 M32,14 L32,22 M44,14 L44,22 M20,42 L20,50 M32,42 L32,50 M44,42 L44,50" stroke="url(#pluginNeonGrad)" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const GlowingRockLogo: React.FC<{ className?: string }> = ({ className = "w-16 h-16" }) => (
  <svg viewBox="0 0 100 100" className={`${className} filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.65)]`} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      {/* Intense White Neon Glow Filter */}
      <filter id="neonGlowWhite" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="1.5" result="blur1" />
        <feGaussianBlur stdDeviation="3.5" result="blur2" />
        <feGaussianBlur stdDeviation="7.5" result="blur3" />
        <feMerge>
          <feMergeNode in="blur3" />
          <feMergeNode in="blur2" />
          <feMergeNode in="blur1" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      {/* High-fidelity facet linear gradients (extremely dark charcoal/obsidian, NO white or light parts) */}
      <linearGradient id="rockFacetLight" x1="20" y1="10" x2="60" y2="80" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#3a3a3c" />
        <stop offset="50%" stopColor="#252527" />
        <stop offset="100%" stopColor="#18181a" />
      </linearGradient>
      <linearGradient id="rockFacetMid" x1="40" y1="20" x2="80" y2="90" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#242426" />
        <stop offset="50%" stopColor="#1a1a1c" />
        <stop offset="100%" stopColor="#101011" />
      </linearGradient>
      <linearGradient id="rockFacetDark" x1="10" y1="30" x2="50" y2="100" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#141415" />
        <stop offset="100%" stopColor="#050505" />
      </linearGradient>
    </defs>
    
    {/* Ultra-detailed Faceted Pointy Rock Poly-Mesh Structure (PREVIOUS FAVORITE LOGO) */}
    {/* Main central sharp peak */}
    <polygon points="50,5 32,45 50,50" fill="url(#rockFacetLight)" stroke="#09090b" strokeWidth="1.2" />
    <polygon points="50,5 50,50 68,40" fill="url(#rockFacetMid)" stroke="#09090b" strokeWidth="1.2" />
    
    {/* Left secondary sharp peak */}
    <polygon points="30,22 15,55 32,45" fill="url(#rockFacetLight)" stroke="#09090b" strokeWidth="1.2" />
    <polygon points="30,22 32,45 50,50" fill="url(#rockFacetMid)" stroke="#09090b" strokeWidth="1.2" />
    
    {/* Right secondary sharp peak */}
    <polygon points="70,25 50,50 68,40" fill="url(#rockFacetMid)" stroke="#09090b" strokeWidth="1.2" />
    <polygon points="70,25 68,40 85,60" fill="url(#rockFacetDark)" stroke="#09090b" strokeWidth="1.2" />
    
    {/* Lower structural rocky facets */}
    <polygon points="15,55 25,82 50,50" fill="url(#rockFacetDark)" stroke="#09090b" strokeWidth="1.2" />
    <polygon points="50,50 25,82 50,95" fill="url(#rockFacetMid)" stroke="#09090b" strokeWidth="1.2" />
    <polygon points="50,50 50,95 75,82" fill="url(#rockFacetDark)" stroke="#09090b" strokeWidth="1.2" />
    <polygon points="68,40 50,50 75,82" fill="url(#rockFacetMid)" stroke="#09090b" strokeWidth="1.2" />
    <polygon points="68,40 75,82 85,60" fill="url(#rockFacetDark)" stroke="#09090b" strokeWidth="1.2" />
    
    {/* Detailed White Neon Glowing Cracks in X-shape shifted slightly lower down */}
    <path d="M30,42 L70,78" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" filter="url(#neonGlowWhite)" opacity="1" />
    <path d="M70,42 L30,78" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" filter="url(#neonGlowWhite)" opacity="1" />
  </svg>
);

export const CustomAvatarLogo: React.FC<{ className?: string; hue?: number }> = ({ className = "w-12 h-12" }) => {
  return (
    <WorkshopAvatarFaceBadge className={className} showFocusReticle={true} />
  );
};

// Metallic-styled Urbia brand alignment with pointing glowing rock logo inline at start
export const DoloverBrand: React.FC<{ className?: string; isDarkBg?: boolean }> = ({ className = "" }) => {
  return (
    <span className="inline-flex items-center gap-2">
      <GlowingRockLogo className="w-7 h-7 shrink-0 animate-none" />
      <span 
        className={`font-black uppercase tracking-tight select-none ${className}`}
        style={{
          background: 'linear-gradient(135deg, #737373 0%, #a3a3a3 25%, #404040 50%, #171717 75%, #404040 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          filter: 'drop-shadow(1px 1px 1.5px rgba(0,0,0,0.5)) drop-shadow(0px 0px 2px rgba(255,255,255,0.1))',
          letterSpacing: '-0.02em',
          display: 'inline-block'
        }}
      >
        Urbia
      </span>
    </span>
  );
};

const getProfileHueForPlayer = (player: any) => {
  if (player && typeof player.profileHue === 'number') {
    return player.profileHue;
  }
  const name = player && player.name ? player.name : '';
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % 360;
};

// Security Checksum to prevent manual tampering of downloaded account backup files (Anti-Cheat/Anti-Tamper)
// Security Checksum to prevent manual tampering of downloaded account backup files (Anti-Cheat/Anti-Tamper)
const CosmicBackgroundCanvas: React.FC<{ className?: string }> = ({ className = "absolute inset-0 w-full h-full pointer-events-none z-0 rounded-[2.3rem] overflow-hidden" }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.width = canvas.offsetWidth || 340;
    let height = canvas.height = canvas.offsetHeight || 520;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth || 340;
      height = canvas.height = canvas.offsetHeight || 520;
    };
    window.addEventListener('resize', handleResize);

    interface Planet {
      x: number;
      y: number;
      radius: number;
      color1: string;
      color2: string;
      speedX: number;
      speedY: number;
      angle: number;
      orbitRadius: number;
      orbitSpeed: number;
      isOrbiter: boolean;
      pulseSpeed: number;
      pulsePhase: number;
    }

    const planets: Planet[] = [
      {
        x: width * 0.25,
        y: height * 0.2,
        radius: 22,
        color1: '#a855f7',
        color2: '#581c87',
        speedX: 0.25,
        speedY: 0.12,
        angle: 0,
        orbitRadius: 0,
        orbitSpeed: 0,
        isOrbiter: false,
        pulseSpeed: 0.007,
        pulsePhase: 0,
      },
      {
        x: width * 0.75,
        y: height * 0.45,
        radius: 17,
        color1: '#fbbf24',
        color2: '#9a3412',
        speedX: -0.18,
        speedY: 0.22,
        angle: 2,
        orbitRadius: 0,
        orbitSpeed: 0,
        isOrbiter: false,
        pulseSpeed: 0.009,
        pulsePhase: Math.PI / 3,
      },
      {
        x: width * 0.35,
        y: height * 0.75,
        radius: 13,
        color1: '#06b6d4',
        color2: '#0e7490',
        speedX: 0.3,
        speedY: -0.15,
        angle: 4,
        orbitRadius: 0,
        orbitSpeed: 0,
        isOrbiter: false,
        pulseSpeed: 0.012,
        pulsePhase: Math.PI,
      },
      {
        x: 0,
        y: 0,
        radius: 6,
        color1: '#ec4899',
        color2: '#9d174d',
        speedX: 0,
        speedY: 0,
        angle: 0,
        orbitRadius: 42,
        orbitSpeed: 0.025,
        isOrbiter: true,
        pulseSpeed: 0.02,
        pulsePhase: 0,
      },
      {
        x: 0,
        y: 0,
        radius: 4,
        color1: '#22d3ee',
        color2: '#0891b2',
        speedX: 0,
        speedY: 0,
        angle: Math.PI,
        orbitRadius: 32,
        orbitSpeed: -0.035,
        isOrbiter: true,
        pulseSpeed: 0.015,
        pulsePhase: Math.PI / 2,
      }
    ];

    const stars: { x: number; y: number; size: number; alpha: number; speed: number }[] = [];
    for (let i = 0; i < 40; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.8 + 0.4,
        alpha: Math.random(),
        speed: 0.006 + Math.random() * 0.012
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const nebulaGrad = ctx.createRadialGradient(
        width * 0.5, height * 0.5, 10,
        width * 0.5, height * 0.5, Math.max(width, height) * 0.7
      );
      nebulaGrad.addColorStop(0, '#0a0f1d');
      nebulaGrad.addColorStop(0.5, '#120d2d');
      nebulaGrad.addColorStop(1, '#020208');
      ctx.fillStyle = nebulaGrad;
      ctx.fillRect(0, 0, width, height);

      ctx.globalCompositeOperation = 'screen';
      const time = Date.now() * 0.0006;
      
      const cloudGrad1 = ctx.createRadialGradient(
        width * 0.4 + Math.sin(time) * 25, height * 0.3 + Math.cos(time) * 15, 15,
        width * 0.4 + Math.sin(time) * 25, height * 0.3 + Math.cos(time) * 15, 130
      );
      cloudGrad1.addColorStop(0, 'rgba(124, 58, 237, 0.2)');
      cloudGrad1.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = cloudGrad1;
      ctx.beginPath();
      ctx.arc(width * 0.4 + Math.sin(time) * 25, height * 0.3 + Math.cos(time) * 15, 130, 0, Math.PI * 2);
      ctx.fill();

      const cloudGrad2 = ctx.createRadialGradient(
        width * 0.65 + Math.cos(time * 0.9) * 30, height * 0.7 + Math.sin(time * 0.9) * 20, 5,
        width * 0.65 + Math.cos(time * 0.9) * 30, height * 0.7 + Math.sin(time * 0.9) * 20, 110
      );
      cloudGrad2.addColorStop(0, 'rgba(236, 72, 153, 0.15)');
      cloudGrad2.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = cloudGrad2;
      ctx.beginPath();
      ctx.arc(width * 0.65 + Math.cos(time * 0.9) * 30, height * 0.7 + Math.sin(time * 0.9) * 20, 110, 0, Math.PI * 2);
      ctx.fill();

      ctx.globalCompositeOperation = 'source-over';

      stars.forEach(star => {
        star.alpha += star.speed;
        if (star.alpha > 1 || star.alpha < 0.1) {
          star.speed = -star.speed;
        }
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.1, Math.min(star.alpha, 0.95))})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      planets.forEach(p => {
        if (!p.isOrbiter) {
          p.x += p.speedX;
          p.y += p.speedY;

          if (p.x < p.radius + 8 || p.x > width - p.radius - 8) {
            p.speedX = -p.speedX;
          }
          if (p.y < p.radius + 8 || p.y > height - p.radius - 8) {
            p.speedY = -p.speedY;
          }
        }
      });

      planets[3].x = planets[0].x + Math.cos(planets[3].angle) * planets[3].orbitRadius;
      planets[3].y = planets[0].y + Math.sin(planets[3].angle) * planets[3].orbitRadius;
      planets[3].angle += planets[3].orbitSpeed;

      planets[4].x = planets[1].x + Math.cos(planets[4].angle) * planets[4].orbitRadius;
      planets[4].y = planets[1].y + Math.sin(planets[4].angle) * planets[4].orbitRadius;
      planets[4].angle += planets[4].orbitSpeed;

      planets.forEach((p, idx) => {
        p.pulsePhase += p.pulseSpeed;
        const currentRadius = p.radius * (1 + Math.sin(p.pulsePhase) * 0.05);

        const glowGrad = ctx.createRadialGradient(
          p.x, p.y, currentRadius * 0.7,
          p.x, p.y, currentRadius * 1.6
        );
        glowGrad.addColorStop(0, p.color1 + '35');
        glowGrad.addColorStop(0.5, p.color1 + '0a');
        glowGrad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentRadius * 1.6, 0, Math.PI * 2);
        ctx.fill();

        if (idx === 1) {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(Math.PI / 6);
          ctx.strokeStyle = 'rgba(251, 191, 36, 0.35)';
          ctx.lineWidth = 3.5;
          ctx.beginPath();
          ctx.ellipse(0, 0, currentRadius * 1.6, currentRadius * 0.35, 0, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
        }

        const sphereGrad = ctx.createRadialGradient(
          p.x - currentRadius * 0.3, p.y - currentRadius * 0.3, currentRadius * 0.05,
          p.x, p.y, currentRadius
        );
        sphereGrad.addColorStop(0, p.color1);
        sphereGrad.addColorStop(0.7, p.color2);
        sphereGrad.addColorStop(1, '#010103');
        ctx.fillStyle = sphereGrad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentRadius * 0.82, Math.PI * 1.15, Math.PI * 1.55);
        ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className={className}
    />
  );
};

const LavaBackgroundCanvas: React.FC<{ className?: string }> = ({ className = "absolute inset-0 w-full h-full pointer-events-none z-0 rounded-[2.3rem] overflow-hidden" }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.width = canvas.offsetWidth || 340;
    let height = canvas.height = canvas.offsetHeight || 520;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth || 340;
      height = canvas.height = canvas.offsetHeight || 520;
    };
    window.addEventListener('resize', handleResize);

    let time = 0;

    interface Bubble {
      x: number;
      y: number;
      radius: number;
      baseRadius: number;
      speedY: number;
      wiggleSpeed: number;
      wiggleOffset: number;
      color: string;
      life: number;
      maxLife: number;
      burstState: 'rising' | 'bursting';
    }

    interface SplashParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;
      life: number;
      maxLife: number;
    }

    const bubbles: Bubble[] = [];
    const particles: SplashParticle[] = [];

    const triggerSplash = (x: number, y: number) => {
      const colors = ['#f97316', '#ef4444', '#f59e0b', '#ff4500', '#ff8c00'];
      const count = 12 + Math.floor(Math.random() * 8);
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.5 + Math.random() * 1.5;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.5,
          size: 1.5 + Math.random() * 2.5,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1.0,
          life: 0,
          maxLife: 20 + Math.floor(Math.random() * 25),
        });
      }
    };

    for (let i = 0; i < 8; i++) {
      bubbles.push({
        x: Math.random() * width,
        y: height + Math.random() * 100,
        baseRadius: 6 + Math.random() * 10,
        radius: 0,
        speedY: 0.15 + Math.random() * 0.25,
        wiggleSpeed: 0.01 + Math.random() * 0.02,
        wiggleOffset: Math.random() * Math.PI * 2,
        color: 'rgba(249, 115, 22, 0.65)',
        life: 0,
        maxLife: 150 + Math.random() * 100,
        burstState: 'rising',
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      time += 0.003;

      const lavaGrad = ctx.createLinearGradient(0, 0, 0, height);
      lavaGrad.addColorStop(0, '#1c0702');
      lavaGrad.addColorStop(0.4, '#2e0b04');
      lavaGrad.addColorStop(0.8, '#4c0f05');
      lavaGrad.addColorStop(1, '#661102');
      ctx.fillStyle = lavaGrad;
      ctx.fillRect(0, 0, width, height);

      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      for (let wave = 0; wave < 3; wave++) {
        ctx.fillStyle = wave === 0 ? 'rgba(120, 20, 2, 0.15)' : wave === 1 ? 'rgba(239, 68, 68, 0.08)' : 'rgba(249, 115, 22, 0.04)';
        ctx.beginPath();
        ctx.moveTo(0, 0);
        
        const waveOffset = wave * Math.PI / 1.5;
        const waveFreq = 0.004 + wave * 0.002;
        const waveAmp = 35 - wave * 8;
        
        for (let y = 0; y <= height; y += 15) {
          const x = width * (0.3 + wave * 0.2) + Math.sin(y * waveFreq + time * 0.8 + waveOffset) * waveAmp;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(width, height);
        ctx.lineTo(width, 0);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();

      bubbles.forEach((b) => {
        if (b.burstState === 'rising') {
          b.y -= b.speedY;
          b.wiggleOffset += b.wiggleSpeed;
          b.x += Math.sin(b.wiggleOffset) * 0.15;

          b.radius = b.baseRadius * (1 + Math.sin(b.wiggleOffset * 2) * 0.08);

          const grad = ctx.createRadialGradient(
            b.x - b.radius * 0.2, b.y - b.radius * 0.2, 1,
            b.x, b.y, b.radius
          );
          grad.addColorStop(0, 'rgba(253, 186, 116, 0.9)');
          grad.addColorStop(0.5, 'rgba(239, 68, 68, 0.6)');
          grad.addColorStop(1, 'rgba(120, 10, 0, 0.1)');
          
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = 'rgba(249, 115, 22, 0.8)';
          ctx.lineWidth = 1.2;
          ctx.stroke();

          ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
          ctx.beginPath();
          ctx.arc(b.x - b.radius * 0.35, b.y - b.radius * 0.35, b.radius * 0.25, 0, Math.PI * 2);
          ctx.fill();

          const nearTop = b.y < height * 0.2;
          const randomBurst = Math.random() < 0.0015;
          if (nearTop || randomBurst) {
            b.burstState = 'bursting';
            triggerSplash(b.x, b.y);
          }
        } else {
          b.x = Math.random() * width;
          b.y = height + 40 + Math.random() * 60;
          b.burstState = 'rising';
          b.baseRadius = 5 + Math.random() * 9;
        }
      });

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.035;
        p.alpha = 1.0 - (p.life / p.maxLife);

        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
          continue;
        }

        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className={className}
    />
  );
};

const CloudBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.width = canvas.offsetWidth || 340;
    let height = canvas.height = canvas.offsetHeight || 520;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth || 340;
      height = canvas.height = canvas.offsetHeight || 520;
    };
    window.addEventListener('resize', handleResize);

    interface Cloud {
      x: number;
      y: number;
      radiusX: number;
      radiusY: number;
      color: string;
      speed: number;
      opacity: number;
    }

    // Generate beautiful soft blurry clouds (silver & white themed)
    const clouds: Cloud[] = [];
    const colors = [
      'rgba(255, 255, 255, 0.85)', // pristine white
      'rgba(248, 250, 252, 0.75)', // slate-50 (gorgeous light grey/silver)
      'rgba(241, 245, 249, 0.65)', // slate-100
      'rgba(226, 232, 240, 0.55)', // slate-200
    ];

    for (let i = 0; i < 7; i++) {
      clouds.push({
        x: Math.random() * width,
        y: height * 0.05 + Math.random() * (height * 0.9),
        radiusX: 120 + Math.random() * 110,
        radiusY: 80 + Math.random() * 70,
        color: colors[i % colors.length],
        speed: 0.12 + Math.random() * 0.22, // slow-moving on X axis
        opacity: 0.15 + Math.random() * 0.15,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Base Frutiger Aero white gradient background
      const baseGrad = ctx.createLinearGradient(0, 0, 0, height);
      baseGrad.addColorStop(0, '#ffffff'); // pure white
      baseGrad.addColorStop(0.5, '#f8fafc'); // soft slate-50
      baseGrad.addColorStop(1, '#f1f5f9'); // elegant slate-100
      ctx.fillStyle = baseGrad;
      ctx.fillRect(0, 0, width, height);

      // Bottom right glowing white/silver accent
      const glowGrad = ctx.createRadialGradient(
        width * 0.8, height * 0.85, 5,
        width * 0.8, height * 0.85, width * 0.75
      );
      glowGrad.addColorStop(0, 'rgba(255, 255, 255, 0.85)'); // bright white glow
      glowGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, width, height);

      // Top right white glow accent
      const topWhiteGlow = ctx.createRadialGradient(
        width * 0.2, height * 0.15, 10,
        width * 0.2, height * 0.15, width * 0.5
      );
      topWhiteGlow.addColorStop(0, 'rgba(255, 255, 255, 0.25)');
      topWhiteGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = topWhiteGlow;
      ctx.fillRect(0, 0, width, height);

      // Dynamic wavy ribbons (white & silver themed)
      ctx.save();
      const time = Date.now() * 0.00035;
      ctx.globalCompositeOperation = 'source-over'; // standard overlay for slate

      // Wave 1 - Glossy silvery-white ribbon
      ctx.fillStyle = 'rgba(226, 232, 240, 0.35)'; // slate-200 with transparency
      ctx.beginPath();
      ctx.moveTo(0, height * 0.35);
      for (let x = 0; x <= width; x += 15) {
        const y = height * 0.35 + Math.sin(x * 0.012 + time) * 18;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.fill();

      // Wave 2 - Soft silver ribbon
      ctx.fillStyle = 'rgba(203, 213, 225, 0.25)'; // slate-300 with transparency
      ctx.beginPath();
      ctx.moveTo(0, height * 0.48);
      for (let x = 0; x <= width; x += 15) {
        const y = height * 0.48 + Math.cos(x * 0.009 + time * 0.8) * 22;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.fill();

      ctx.restore();

      // Slow-moving blurry clouds
      ctx.save();
      if ('filter' in ctx) {
        ctx.filter = 'blur(45px)';
      }

      clouds.forEach((cloud) => {
        cloud.x += cloud.speed;
        if (cloud.x - cloud.radiusX > width) {
          cloud.x = -cloud.radiusX;
          cloud.y = height * 0.05 + Math.random() * (height * 0.9);
        }

        const grad = ctx.createRadialGradient(
          cloud.x, cloud.y, 0,
          cloud.x, cloud.y, Math.max(cloud.radiusX, cloud.radiusY)
        );
        grad.addColorStop(0, cloud.color);
        grad.addColorStop(0.5, cloud.color.replace(/, [0-9.]+\)/, ', ' + (cloud.opacity * 0.5) + ')'));
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.ellipse(cloud.x, cloud.y, cloud.radiusX, cloud.radiusY, 0, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.restore();

      // Rising glossy water drops/bubbles
      ctx.save();
      const bubbleTime = Date.now() * 0.0009;
      for (let i = 0; i < 5; i++) {
        const bx = (width * (0.12 + i * 0.2) + Math.sin(bubbleTime * 1.5 + i) * 10) % width;
        const by = (height * 0.85 - (bubbleTime * (6 + i * 2)) % (height * 0.8));
        const br = 2.5 + (i % 3) * 1.5;

        const bGrad = ctx.createRadialGradient(
          bx - br * 0.35, by - br * 0.35, 1,
          bx, by, br
        );
        bGrad.addColorStop(0, 'rgba(255, 255, 255, 0.65)');
        bGrad.addColorStop(0.6, 'rgba(255, 255, 255, 0.18)');
        bGrad.addColorStop(1, 'rgba(255, 255, 255, 0.04)');

        ctx.fillStyle = bGrad;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.arc(bx, by, br, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Gloss sheen highlight
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.beginPath();
        ctx.arc(bx - br * 0.3, by - br * 0.3, br * 0.22, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // Top glass glossy overlay reflection
      const reflectionGrad = ctx.createLinearGradient(0, 0, 0, height * 0.4);
      reflectionGrad.addColorStop(0, 'rgba(255, 255, 255, 0.25)');
      reflectionGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.05)');
      reflectionGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = reflectionGrad;
      ctx.fillRect(0, 0, width, height * 0.4);

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-none z-0 rounded-[2.3rem] overflow-hidden"
    />
  );
};

export function calculateAccountChecksum(username: string, money: number, isVerified18: boolean, password?: string): string {
  const secretSalt = "gorebox_vps_salt_2026_antitamper";
  const dataString = `${username.trim().toLowerCase()}:${money}:${isVerified18 ? 'true' : 'false'}:${password || ''}:${secretSalt}`;
  let hash = 0;
  for (let i = 0; i < dataString.length; i++) {
    const char = dataString.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(16);
}

// Simple cipher to encrypt and decrypt the private key text so users cannot easily edit it
export function encryptAccountData(data: any): string {
  const jsonStr = JSON.stringify(data);
  const key = "gorebox_suburbia_super_secret_vps_key_2026";
  let output = "";
  for (let i = 0; i < jsonStr.length; i++) {
    const charCode = jsonStr.charCodeAt(i);
    const keyChar = key.charCodeAt(i % key.length);
    const obfuscated = charCode ^ keyChar;
    output += String.fromCharCode(obfuscated);
  }
  return btoa(unescape(encodeURIComponent(output)));
}

export function decryptAccountData(encryptedStr: string): any {
  let rawStr = "";
  try {
    rawStr = decodeURIComponent(escape(atob(encryptedStr)));
  } catch {
    // If base64 fails, maybe it is raw text or old format
    return JSON.parse(encryptedStr);
  }
  
  const key = "gorebox_suburbia_super_secret_vps_key_2026";
  let jsonStr = "";
  for (let i = 0; i < rawStr.length; i++) {
    const charCode = rawStr.charCodeAt(i);
    const keyChar = key.charCodeAt(i % key.length);
    jsonStr += String.fromCharCode(charCode ^ keyChar);
  }
  return JSON.parse(jsonStr);
}

export function parseAccountFile(fileContent: string): any {
  const parsed = JSON.parse(fileContent);
  if (parsed && parsed.encrypted && typeof parsed.data === 'string') {
    return decryptAccountData(parsed.data);
  }
  return parsed;
}

const PixelGreenCoin = () => (
  <svg 
    width="16" 
    height="16" 
    viewBox="0 0 16 16" 
    className="shrink-0 inline-block align-middle select-none" 
    style={{ imageRendering: 'pixelated' }}
  >
    {/* Dark green border */}
    <path d="M5 0h6v1H5V0zm-2 1h2v1H3V1zm8 0h2v1h-2V1zm-2 1h2v1h-2V2zM2 2h1v1H2V2zm11 0h1v1h-1V2zM1 3h1v2H1V3zm13 0h1v2h-1V3zM0 5h1v6H0V5zm15 0h1v6h-1V5zM1 11h1v2H1v-2zm13 0h1v2h-1v-2zm1 1h1v1h-1v-1zM2 13h1v1H2v-1zm11 0h1v1h-1v-1zm-2 1h2v1h-2v-1zm-6 0h2v1H5v-1zm1 1h4v1H6v-1z" fill="#043214" />
    {/* Coin base fill (green) */}
    <path d="M5 1h6v1H5V1zM3 2h8v1H3V2zm-1 1h12v2H2V3zm-1 2h14v6H1V5zm1 6h12v2H2v-2zm1 2h8v1H3v-1zm2 1h4v1H5v-1z" fill="#22c55e" />
    {/* Light Green highlights */}
    <path d="M5 2h4v1H5V2zM3 3h2v1H3V3zm-1 2h1v4H2V5zm1 4h1v2H3V9z" fill="#8efc9f" />
    {/* Darker green shadow inner */}
    <path d="M12 3h1v4h-1V3zm1 4h1v4h-1V7zm-2 4h1v1h-1v-1zm-2 1h2v1h-2v-1z" fill="#15803d" />
    {/* Pixel '$' symbol in dark green */}
    <path d="M7 4h3v1H7V4zm-1 1h1v2H6V5zm1 2h2v1H7V7zm2 1h1v2H9V8zm-3 2h3v1H6v-1zM8 3h1v9H8V3z" fill="#052e16" />
  </svg>
);

function hexToHsl(hex: string): { h: number, s: number, l: number } {
  let c = hex.replace(/^#/, '');
  if (c.length === 3) {
    c = c[0] + c[0] + c[1] + c[1] + c[2] + c[2];
  }
  if (c.length !== 6) {
    return { h: 205, s: 100, l: 50 };
  }
  const r = parseInt(c.slice(0, 2), 16) / 255;
  const g = parseInt(c.slice(2, 4), 16) / 255;
  const b = parseInt(c.slice(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}

const renderProfilePersonLogo = (color: string, sizeClass: string = "w-10 h-10") => {
  let hex = color;
  if (!hex || !hex.startsWith('#')) {
    hex = '#0055ff'; 
  }
  
  const { h, s, l } = hexToHsl(hex);
  
  const outlineColor = `hsl(${h}, ${Math.max(60, s)}%, ${Math.max(10, l * 0.35)}%)`;
  const baseGradStart = `hsl(${h}, ${Math.max(80, s)}%, ${Math.max(15, l * 0.55)}%)`;
  const baseGradMid = `hsl(${h}, ${Math.max(80, s)}%, ${Math.max(25, l * 0.9)}%)`;
  const baseGradEnd = `hsl(${h}, ${Math.max(80, s)}%, ${Math.min(95, l * 1.5)}%)`;
  
  const headGradStart = `hsl(${h}, ${Math.max(80, s)}%, ${Math.min(95, l * 1.6)}%)`;
  const headGradMid = `hsl(${h}, ${Math.max(80, s)}%, ${Math.max(30, l * 1.1)}%)`;
  const headGradEnd = `hsl(${h}, ${Math.max(80, s)}%, ${Math.max(15, l * 0.6)}%)`;
  
  const shoulderGlow = `hsl(${h}, ${Math.max(80, s)}%, ${Math.min(95, l * 1.4)}%)`;

  const uniqueId = `msn-avatar-${h}-${Math.round(s)}-${Math.round(l)}`;

  return (
    <div className={`${sizeClass} flex items-center justify-center shrink-0 overflow-hidden relative select-none pointer-events-none rounded-full`}>
      <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
        <defs>
          <linearGradient id={`${uniqueId}-body`} x1="50" y1="48" x2="50" y2="87" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={baseGradStart} />
            <stop offset="45%" stopColor={baseGradMid} />
            <stop offset="90%" stopColor={baseGradEnd} />
            <stop offset="100%" stopColor={shoulderGlow} />
          </linearGradient>
          <radialGradient id={`${uniqueId}-head`} cx="50" cy="34" r="16" fx="50" fy="28" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={headGradStart} />
            <stop offset="50%" stopColor={headGradMid} />
            <stop offset="90%" stopColor={headGradEnd} />
            <stop offset="100%" stopColor={outlineColor} />
          </radialGradient>
        </defs>

        {/* Outer dark outline contours (fully rounded) */}
        <path 
          d="M50,18 C58.8,18 66,25.2 66,34 C66,39.5 63.5,44 59.5,46.5 C69,48 75,56 75,67 C75,78 63.8,87 50,87 C36.2,87 25,78 25,67 C25,56 31,48 40.5,46.5 C36.5,44 34,39.5 34,34 C34,25.2 41.2,18 50,18 Z" 
          fill="none" 
          stroke={outlineColor} 
          strokeWidth="7" 
          strokeLinejoin="round" 
        />
        <path 
          d="M50,18 C58.8,18 66,25.2 66,34 C66,39.5 63.5,44 59.5,46.5 C69,48 75,56 75,67 C75,78 63.8,87 50,87 C36.2,87 25,78 25,67 C25,56 31,48 40.5,46.5 C36.5,44 34,39.5 34,34 C34,25.2 41.2,18 50,18 Z" 
          fill="none" 
          stroke="rgba(255,255,255,0.4)" 
          strokeWidth="2" 
          strokeLinejoin="round" 
        />

        {/* Body Shape (Fully rounded ellipse belly) */}
        <path 
          d="M50,47.5 C63.8,47.5 75,56.2 75,67 C75,77.8 63.8,86.5 50,86.5 C36.2,86.5 25,77.8 25,67 C25,56.2 36.2,47.5 50,47.5 Z" 
          fill={`url(#${uniqueId}-body)`} 
          stroke={outlineColor} 
          strokeWidth="1.5"
        />

        {/* Head Shape */}
        <circle 
          cx="50" 
          cy="34" 
          r="16" 
          fill={`url(#${uniqueId}-head)`} 
          stroke={outlineColor} 
          strokeWidth="1.5" 
        />

        {/* Glossy highlight overlay on the Head */}
        <path 
          d="M36.5,30 C37,22.5 42,19.5 50,19.5 C58,19.5 63,22.5 63.5,30 C60.5,25 56.5,21.5 50,21.5 C43.5,21.5 39.5,25 36.5,30 Z" 
          fill="rgba(255, 255, 255, 0.65)" 
        />
        <ellipse cx="50" cy="22" rx="9" ry="4.5" fill="rgba(255, 255, 255, 0.45)" />

        {/* Reflection on lower head */}
        <path 
          d="M35.2,38.8 C38.4,45.2 45.6,48 50,48 C54.4,48 61.6,45.2 64.8,38.8 C62.4,42.8 56.8,45.6 50,45.6 C43.2,45.6 37.6,42.8 35.2,38.8 Z" 
          fill="rgba(255, 255, 255, 0.25)" 
        />

        {/* Glossy highlights on shoulders & chest */}
        <path 
          d="M27,68 C26.5,61.6 30.5,53.2 37.7,50 C33.3,54 29.7,60 29.3,68 Z" 
          fill="rgba(255, 255, 255, 0.35)" 
        />
        <path 
          d="M73,68 C73.5,61.6 69.5,53.2 62.3,50 C66.7,54 70.3,60 70.7,68 Z" 
          fill="rgba(255, 255, 255, 0.35)" 
        />

        {/* Chest bright highlight */}
        <ellipse cx="50" cy="78" rx="15" ry="5.5" fill="rgba(255, 255, 255, 0.2)" />
        <ellipse cx="50" cy="82" rx="11" ry="3" fill="rgba(255, 255, 255, 0.3)" />
      </svg>
    </div>
  );
};

const PlayerAvatarPreview = ({ player }: { player: any }) => {
  const skinColor = player?.skinColor || '#e0a96d';
  const faceStyle = player?.faceStyle || 'classic';
  
  const colors = ['#f43f5e', '#ec4899', '#d946ef', '#a855f7', '#8b5cf6', '#6366f1', '#3b82f6', '#0ea5e9', '#06b6d4', '#14b8a6', '#10b981', '#22c55e', '#84cc16', '#eab308', '#f97316'];
  const getProfileColor = () => {
    if (player?.profileColor) return player.profileColor;
    const name = player?.username || player?.name || 'Guest';
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % colors.length;
    return colors[index];
  };
  const avatarBgColor = getProfileColor();

  let faceElements = null;
  if (faceStyle === 'classic') {
    faceElements = (
      <svg viewBox="0 0 16 16" className="w-16 h-16">
        <rect x="4" y="5" width="2" height="2" fill="#000000" />
        <rect x="10" y="5" width="2" height="2" fill="#000000" />
        <rect x="5" y="10" width="6" height="1" fill="#000000" />
        <rect x="4" y="9" width="1" height="1" fill="#000000" />
        <rect x="11" y="9" width="1" height="1" fill="#000000" />
      </svg>
    );
  } else if (faceStyle === 'angry') {
    faceElements = (
      <svg viewBox="0 0 16 16" className="w-16 h-16">
        <path d="M3 4l3 1M13 4l-3 1" stroke="#000000" strokeWidth="1" strokeLinecap="round" />
        <rect x="4" y="6" width="2" height="2" fill="#000000" />
        <rect x="10" y="6" width="2" height="2" fill="#000000" />
        <rect x="5" y="10" width="6" height="1.5" fill="#000000" />
      </svg>
    );
  } else if (faceStyle === 'creepy') {
    faceElements = (
      <svg viewBox="0 0 16 16" className="w-16 h-16">
        <rect x="4" y="5" width="2" height="2" fill="#ef4444" />
        <rect x="10" y="5" width="2" height="2" fill="#ef4444" />
        <path d="M4 9h8v4H4V9z" fill="#000" />
        <path d="M5 9l1 2 1-2M9 9l1 2 1-2" fill="#fff" />
      </svg>
    );
  } else if (faceStyle === 'anime') {
    faceElements = (
      <svg viewBox="0 0 16 16" className="w-16 h-16">
        <rect x="3" y="4" width="3" height="4" rx="1" fill="#ec4899" />
        <rect x="10" y="4" width="3" height="4" rx="1" fill="#ec4899" />
        <rect x="4" y="5" width="1" height="1" fill="#ffffff" />
        <rect x="11" y="5" width="1" height="1" fill="#ffffff" />
        <rect x="2" y="8" width="2" height="1" fill="#fbcfe8" />
        <rect x="12" y="8" width="2" height="1" fill="#fbcfe8" />
        <path d="M7 9.5a1 1 0 012 0" stroke="#000" fill="none" />
      </svg>
    );
  } else if (faceStyle === 'cool') {
    faceElements = (
      <svg viewBox="0 0 16 16" className="w-16 h-16">
        <path d="M2 5h12v3H9L8 6 7 8H2V5z" fill="#111827" />
        <path d="M3 6h2v1H3V6zm7 0h2v1h-10V6z" fill="#ffffff" opacity="0.4" />
        <rect x="6" y="10" width="5" height="1" fill="#000000" />
      </svg>
    );
  } else {
    faceElements = (
      <svg viewBox="0 0 64 64" className="w-16 h-16 select-none pointer-events-none" fill="none">
        <circle cx="32" cy="22" r="11" fill="#ffffff" />
        <path d="M14,54 C14,41.5 22,36 32,36 C42,36 50,41.5 50,54 Z" fill="#ffffff" />
      </svg>
    );
  }

  return (
    <div 
      className="w-24 h-24 rounded-3xl border-[4px] border-black flex items-center justify-center shadow-lg transition-transform overflow-hidden relative"
      style={{ backgroundColor: faceStyle === 'default' ? avatarBgColor : skinColor }}
    >
      <div className="w-20 h-20 flex items-center justify-center relative">
        {faceElements}
      </div>
    </div>
  );
};

export const GameMenuModal: React.FC<GameMenuModalProps> = ({
  isOpen,
  onStartSingleplayer,
  onJoinMultiplayer,
  currentMapId = 'lab',
  onOpenAvatarEditor,
}) => {
  const [view, setView] = useState<'main' | 'multiplayer' | 'personalize' | 'settings'>('main');
  const [selectedUserProfile, setSelectedUserProfile] = useState<any | null>(null);
  const [cosmicBgEnabled, setCosmicBgEnabled] = useState<boolean>(() => {
    return localStorage.getItem('gorebox_cosmic_bg_enabled') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('gorebox_cosmic_bg_enabled', cosmicBgEnabled ? 'true' : 'false');
  }, [cosmicBgEnabled]);

  const [lavaBgEnabled, setLavaBgEnabled] = useState<boolean>(() => {
    return localStorage.getItem('gorebox_lava_bg_enabled') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('gorebox_lava_bg_enabled', lavaBgEnabled ? 'true' : 'false');
  }, [lavaBgEnabled]);

  const [profileColor, setProfileColor] = useState<string>(() => {
    const colors = ['#38bdf8', '#10b981', '#ef4444', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4', '#14b8a6', '#f43f5e'];
    return colors[Math.floor(Math.random() * colors.length)];
  });

  useEffect(() => {
    localStorage.setItem('gorebox_profile_color', profileColor);
  }, [profileColor]);

  const [equippedBanner, setEquippedBanner] = useState<string>(() => {
    return localStorage.getItem('gorebox_equipped_banner') || 'default';
  });

  useEffect(() => {
    localStorage.setItem('gorebox_equipped_banner', equippedBanner);
  }, [equippedBanner]);

  const [marketCategory, setMarketCategory] = useState<'fondos' | 'perfil_usuario' | 'banner'>('fondos');

  const [fpsLimit, setFpsLimit] = useState<string>(() => {
    return localStorage.getItem('gorebox_fps_limit') || '60';
  });

  const [menuFpsCap, setMenuFpsCap] = useState<boolean>(() => {
    return localStorage.getItem('gorebox_menu_fps_cap') !== 'false';
  });

  const [backgroundThrottle, setBackgroundThrottle] = useState<boolean>(() => {
    return localStorage.getItem('gorebox_background_throttle') !== 'false';
  });

  const [enableFluidJet, setEnableFluidJet] = useState<boolean>(() => {
    return localStorage.getItem('gorebox_enable_fluid_jet') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('gorebox_enable_fluid_jet', enableFluidJet ? 'true' : 'false');
    RealisticFluidEngine.getInstance().enableFluidJet = enableFluidJet;
  }, [enableFluidJet]);

  useEffect(() => {
    localStorage.setItem('gorebox_fps_limit', fpsLimit);
    window.dispatchEvent(new CustomEvent('gorebox_fps_change', { detail: fpsLimit }));
  }, [fpsLimit]);

  useEffect(() => {
    localStorage.setItem('gorebox_menu_fps_cap', menuFpsCap ? 'true' : 'false');
  }, [menuFpsCap]);

  useEffect(() => {
    localStorage.setItem('gorebox_background_throttle', backgroundThrottle ? 'true' : 'false');
  }, [backgroundThrottle]);
  const [playerPassword, setPlayerPassword] = useState<string>(() => {
    return localStorage.getItem('gorebox_player_password') || '';
  });
  const [personalizeSubView, setPersonalizeSubView] = useState<'choice' | 'avatar' | 'market' | 'plugins' | 'museum'>('choice');
  const [museumSearchQuery, setMuseumSearchQuery] = useState<string>('');
  const [marketSearchQuery, setMarketSearchQuery] = useState<string>('');
  const [pluginsSearchQuery, setPluginsSearchQuery] = useState<string>('');
  const [selectedDrawing, setSelectedDrawing] = useState<any | null>(null);
  const [birthdate, setBirthdate] = useState<string>('');
  const [birthdateError, setBirthdateError] = useState<string>('');
  const [unlockedItems, setUnlockedItems] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('gorebox_unlocked_items');
      let parsed = saved ? JSON.parse(saved) : [];
      if (!Array.isArray(parsed)) parsed = [];
      const defaults = [
        'normal_skin', 'zombie_skin', 'blue_skin', 'classic_face', 'angry_face', 'anime_face',
        'plugin_doll', 'plugin_vudu', 'plugin_milk'
      ];
      defaults.forEach(d => {
        if (!parsed.includes(d)) parsed.push(d);
      });
      return parsed;
    } catch {
      return [
        'normal_skin', 'zombie_skin', 'blue_skin', 'classic_face', 'angry_face', 'anime_face',
        'plugin_doll', 'plugin_vudu', 'plugin_milk'
      ];
    }
  });
  const [playerName, setPlayerName] = useState<string>(() => {
    return localStorage.getItem('gorebox_player_name') || `Player_${Math.floor(100 + Math.random() * 900)}`;
  });

  const [language, setLanguage] = useState<'en' | 'es'>(() => {
    return (localStorage.getItem('gorebox_game_language') as 'en' | 'es') || 'es';
  });

  const [signedIn, setSignedIn] = useState<boolean>(() => {
    return localStorage.getItem('gorebox_signed_in') === 'true';
  });
  const [isVerified18, setIsVerified18] = useState<boolean>(() => {
    return localStorage.getItem('gorebox_verified_18') === 'true';
  });
  const [isFaceScannerOpen, setIsFaceScannerOpen] = useState<boolean>(false);
  const [faceScanStatus, setFaceScanStatus] = useState<'scanning' | 'success' | 'idle'>('idle');

  const startFaceIdVerification = () => {
    setIsFaceScannerOpen(true);
    setFaceScanStatus('idle');
    setBirthdate('');
    setBirthdateError('');
  };

  // Money & DB States
  const [money, setMoney] = useState<number>(() => {
    return parseInt(localStorage.getItem('gorebox_player_money') || '0', 10);
  });
  const [dbUsers, setDbUsers] = useState<any[]>([]);

  // Admin Panel & Draggable Button states for "Xrency"
  const [adminMenuOpen, setAdminMenuOpen] = useState<boolean>(false);
  const [adminTab, setAdminTab] = useState<'player' | 'rank' | 'records' | 'aprobaciones'>('player');
  const [adminTargetPlayer, setAdminTargetPlayer] = useState<string>('');
  const [adminMoneyAmount, setAdminMoneyAmount] = useState<number>(1000);
  const [adminRankLevel, setAdminRankLevel] = useState<number>(1);
  const [adminRankName, setAdminRankName] = useState<string>('Ayudante');
  const [isRankDropdownOpen, setIsRankDropdownOpen] = useState<boolean>(false);
  const [adminPlayerSearchQuery, setAdminPlayerSearchQuery] = useState<string>('');
  const [adminAccountSearchQuery, setAdminAccountSearchQuery] = useState<string>('');
  const [adminFeedback, setAdminFeedback] = useState<string>('');
  const [adminAccountsLog, setAdminAccountsLog] = useState<any[]>([]);
  const [selectedAdminUsernames, setSelectedAdminUsernames] = useState<string[]>([]);

  const [pendingServersList, setPendingServersList] = useState<any[]>([]);
  const [loadingPending, setLoadingPending] = useState<boolean>(false);

  const fetchPendingServers = async () => {
    setLoadingPending(true);
    try {
      const res = await fetch('/api/servers/pending');
      if (res.ok) {
        const data = await res.json();
        if (data.pendingServers) {
          setPendingServersList(data.pendingServers);
        }
      }
    } catch (err) {
      console.error("Error fetching pending servers:", err);
    } finally {
      setLoadingPending(false);
    }
  };

  useEffect(() => {
    if (adminMenuOpen && adminTab === 'aprobaciones') {
      fetchPendingServers();
    }
  }, [adminMenuOpen, adminTab]);

  const fetchAdminAccountsLog = async () => {
    try {
      const res = await fetch('/api/vps/admin/accounts');
      if (res.ok) {
        const data = await res.json();
        if (data.accounts && Array.isArray(data.accounts)) {
          setAdminAccountsLog(data.accounts);
        }
      }
    } catch (err) {
      console.error("Error fetching admin accounts log:", err);
    }
  };

  const handleBulkKick = async () => {
    if (selectedAdminUsernames.length === 0) return;
    const targets = selectedAdminUsernames.filter(name => name.toLowerCase() !== 'xrency' && name.toLowerCase() !== playerName.toLowerCase());
    if (targets.length === 0) {
      alert(language === 'es' ? 'No puedes kickearte a ti mismo ni al Owner supremo.' : 'Cannot kick yourself or Supreme Owner.');
      return;
    }
    if (!confirm(language === 'es' ? `¿Expulsar (KICK) a ${targets.length} jugadores seleccionados?` : `Kick ${targets.length} selected players?`)) return;
    
    let successCount = 0;
    for (const targetName of targets) {
      try {
        const res = await fetch('/api/vps/admin/kick', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ targetName })
        });
        if (res.ok) successCount++;
      } catch (err) {
        console.error("Bulk kick error for", targetName, err);
      }
    }
    setAdminFeedback(
      language === 'es'
        ? `Se expulsaron ${successCount} de ${targets.length} jugadores.`
        : `Kicked ${successCount} of ${targets.length} players.`
    );
    setSelectedAdminUsernames([]);
    fetchAdminAccountsLog();
  };

  const handleBulkBan = async () => {
    if (selectedAdminUsernames.length === 0) return;
    const targets = selectedAdminUsernames.filter(name => name.toLowerCase() !== 'xrency' && name.toLowerCase() !== playerName.toLowerCase());
    if (targets.length === 0) {
      alert(language === 'es' ? 'No puedes banearte a ti mismo ni al Owner supremo.' : 'Cannot ban yourself or Supreme Owner.');
      return;
    }
    if (!confirm(language === 'es' ? `🛑 ¿BANNEAR PERMANENTEMENTE a ${targets.length} jugadores seleccionados?` : `Permanently ban ${targets.length} selected players?`)) return;

    let successCount = 0;
    for (const targetName of targets) {
      try {
        const res = await fetch('/api/vps/admin/ban', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ targetName })
        });
        if (res.ok) successCount++;
      } catch (err) {
        console.error("Bulk ban error for", targetName, err);
      }
    }
    setAdminFeedback(
      language === 'es'
        ? `Se bannearon ${successCount} de ${targets.length} jugadores.`
        : `Permanently banned ${successCount} of ${targets.length} players.`
    );
    setSelectedAdminUsernames([]);
    fetchAdminAccountsLog();
  };

  const handleAdminKickUser = async (targetName: string) => {
    if (!targetName) return;
    if (targetName.toLowerCase() === 'xrency') {
      alert(language === 'es' ? 'No se puede expulsar al Owner supremo.' : 'Cannot kick Supreme Owner.');
      return;
    }
    if (!confirm(language === 'es' ? `¿Expulsar (KICK) a ${targetName}?` : `Kick player ${targetName}?`)) return;
    try {
      const res = await fetch('/api/vps/admin/kick', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetName })
      });
      const data = await res.json();
      if (res.ok) {
        setAdminFeedback(data.message);
        fetchAdminAccountsLog();
      } else {
        setAdminFeedback(data.error || 'Error');
      }
    } catch (err) {
      console.error(err);
      setAdminFeedback('Error');
    }
  };

  const handleAdminBanUser = async (targetName: string) => {
    if (!targetName) return;
    if (targetName.toLowerCase() === 'xrency') {
      alert(language === 'es' ? 'No se puede bannear al Owner supremo.' : 'Cannot ban Supreme Owner.');
      return;
    }
    if (!confirm(language === 'es' ? `⚠️ BANNEAR PERMANENTEMENTE a ${targetName}?` : `Permanently ban player ${targetName}?`)) return;
    try {
      const res = await fetch('/api/vps/admin/ban', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetName })
      });
      const data = await res.json();
      if (res.ok) {
        setAdminFeedback(data.message);
        fetchAdminAccountsLog();
      } else {
        setAdminFeedback(data.error || 'Error');
      }
    } catch (err) {
      console.error(err);
      setAdminFeedback('Error');
    }
  };

  useEffect(() => {
    fetchAdminAccountsLog();
  }, []);

  useEffect(() => {
    if (adminMenuOpen || adminTab === 'records') {
      fetchAdminAccountsLog();
    }
  }, [adminMenuOpen, adminTab]);

  const [adminBtnPos, setAdminBtnPos] = useState({ x: 20, y: 150 });
  const [isDragging, setIsDragging] = useState(false);
  const [discoverSubMode, setDiscoverSubMode] = useState<'servers' | 'create_menu'>('servers');
  const [serverCreationChoice, setServerCreationChoice] = useState<'create' | 'load'>('create');
  const dragStart = useRef({ x: 0, y: 0 });
  const dragMoved = useRef(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    setIsDragging(true);
    dragMoved.current = false;
    dragStart.current = {
      x: e.clientX - adminBtnPos.x,
      y: e.clientY - adminBtnPos.y
    };
    buttonRef.current?.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!isDragging) return;
    const newX = Math.max(0, Math.min(window.innerWidth - 60, e.clientX - dragStart.current.x));
    const newY = Math.max(0, Math.min(window.innerHeight - 60, e.clientY - dragStart.current.y));
    
    if (Math.abs(newX - adminBtnPos.x) > 3 || Math.abs(newY - adminBtnPos.y) > 3) {
      dragMoved.current = true;
    }
    setAdminBtnPos({ x: newX, y: newY });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLButtonElement>) => {
    setIsDragging(false);
    buttonRef.current?.releasePointerCapture(e.pointerId);
  };

  const handleAdminGiveMoney = async () => {
    if (!adminTargetPlayer) {
      setAdminFeedback(language === 'es' ? 'Selecciona un jugador' : 'Select a player');
      return;
    }
    try {
      const getRes = await fetch(`/api/vps/user/${encodeURIComponent(adminTargetPlayer)}`);
      let currentMoney = 0;
      if (getRes.ok) {
        const d = await getRes.json();
        currentMoney = d.user?.money || 0;
      }
      const newMoney = currentMoney + adminMoneyAmount;

      await fetch('/api/vps/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: adminTargetPlayer, money: newMoney })
      });

      if (adminTargetPlayer.toLowerCase() === playerName.toLowerCase()) {
        setMoney(newMoney);
        localStorage.setItem('gorebox_player_money', newMoney.toString());
      }

      setAdminFeedback(
        language === 'es' 
          ? `¡Dinero entregado con éxito! Nuevo saldo: ☘️${newMoney}`
          : `Money added successfully! New balance: ☘️${newMoney}`
      );
      
      fetchAllUsersFromVps();
    } catch (err) {
      console.error("Error giving money as admin via VPS:", err);
      setAdminFeedback(language === 'es' ? 'Error al actualizar el servidor' : 'Server update error');
    }
  };

  const handleAdminChangeRank = async () => {
    if (!adminTargetPlayer) {
      setAdminFeedback(language === 'es' ? 'Selecciona un jugador' : 'Select a player');
      return;
    }
    const rankMap: { [key: string]: number } = {
      'Ayudante': 10,
      'Mod': 20,
      'Super Mod': 30,
      'Administrador': 50,
      'Super Administrador': 100
    };
    const levelToSave = rankMap[adminRankName] || 1;

    try {
      await fetch('/api/vps/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          username: adminTargetPlayer, 
          level: levelToSave,
          rankName: adminRankName
        })
      });

      setAdminFeedback(
        language === 'es' 
          ? `¡Rango cambiado a "${adminRankName}" con éxito!`
          : `Rank successfully changed to "${adminRankName}"!`
      );
      
      fetchAllUsersFromVps();
    } catch (err) {
      console.error("Error changing rank as admin via VPS:", err);
      setAdminFeedback(language === 'es' ? 'Error al actualizar rango en el servidor' : 'Server rank update error');
    }
  };

  const showAdminFeatures = signedIn && (playerName.trim().toLowerCase() === 'xrency' || playerName.trim().toLowerCase() === 'xrenxy');

  const PendingServerCard = ({ server, language, onApproved, onRejected }: any) => {
    const [showSection, setShowSection] = useState<'user' | 'server' | null>(null);
    const [ownerDetails, setOwnerDetails] = useState<any | null>(null);
    const [loadingOwner, setLoadingOwner] = useState(false);

    const handleShowUser = async () => {
      if (showSection === 'user') {
        setShowSection(null);
        return;
      }
      setShowSection('user');
      if (!ownerDetails) {
        setLoadingOwner(true);
        try {
          const res = await fetch(`/api/vps/user/${encodeURIComponent(server.ownerName)}`);
          if (res.ok) {
            const data = await res.json();
            if (data.user) {
              setOwnerDetails(data.user);
            }
          }
        } catch (err) {
          console.error("Error loading owner details:", err);
        } finally {
          setLoadingOwner(false);
        }
      }
    };

    const handleShowServer = () => {
      setShowSection(showSection === 'server' ? null : 'server');
    };

    const handleApprove = async () => {
      try {
        const myPrivateKey = localStorage.getItem('gorebox_admin_private_key') || `pk_${playerName.toLowerCase()}_baughborxd_gorebox_staff`;
        const res = await fetch('/api/servers/approve', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            id: server.id,
            approvedBy: playerName,
            approvedByPrivateKey: myPrivateKey
          })
        });
        const data = await res.json();
        if (res.ok) {
          alert(language === 'es' ? `¡Servidor aprobado y firmado digitalmente con éxito!` : `Server approved and digitally signed successfully!`);
          onApproved();
        } else {
          alert(data.error || 'Error approving server');
        }
      } catch (err) {
        console.error(err);
        alert('Connection error');
      }
    };

    const handleReject = async () => {
      try {
        const res = await fetch('/api/servers/reject', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: server.id })
        });
        if (res.ok) {
          onRejected();
        } else {
          alert('Error rejecting server');
        }
      } catch (err) {
        console.error(err);
      }
    };

    return (
      <div className="bg-zinc-950 border-2 border-[#00ff00]/60 rounded-2xl p-4 space-y-3 shadow-[0_0_15px_rgba(0,255,0,0.1)] text-white font-mono text-xs">
        <div className="flex items-center justify-between border-b border-[#00ff00]/30 pb-2">
          <span className="font-bold text-[#00ff00] truncate flex-1">🖥️ {server.name}</span>
          <span className="text-[10px] bg-amber-500/10 border border-amber-500/40 text-amber-400 px-2.5 py-0.5 rounded uppercase font-black animate-pulse">
            PENDIENTE
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={handleShowUser}
            className={`py-1.5 rounded-lg border font-black uppercase text-[10px] transition-all cursor-pointer ${
              showSection === 'user'
                ? 'bg-[#00ff00] text-black border-[#00ff00]'
                : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            👤 JUGADOR
          </button>
          <button
            type="button"
            onClick={handleShowServer}
            className={`py-1.5 rounded-lg border font-black uppercase text-[10px] transition-all cursor-pointer ${
              showSection === 'server'
                ? 'bg-[#00ff00] text-black border-[#00ff00]'
                : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            🖥️ SERVIDOR
          </button>
        </div>

        {showSection === 'user' && (
          <div className="bg-zinc-900/50 rounded-xl p-3 border border-zinc-800 text-[11px] space-y-1.5 text-zinc-300">
            {loadingOwner ? (
              <div className="text-center text-[#00ff00] font-bold py-1">CONSULTANDO BASE DE DATOS...</div>
            ) : ownerDetails ? (
              <>
                <div className="flex justify-between"><span className="text-zinc-500">CREADOR:</span> <span className="font-bold text-white">{ownerDetails.username}</span></div>
                <div className="flex justify-between"><span className="text-zinc-500">DINERO:</span> <span className="text-emerald-400 font-bold">☘️{(ownerDetails.money || 0).toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-zinc-500">REGISTRO:</span> <span className="text-zinc-400">{ownerDetails.createdAt ? new Date(ownerDetails.createdAt).toLocaleDateString() : 'N/A'}</span></div>
              </>
            ) : (
              <div className="text-center text-rose-500 font-bold">Cuentas creadas locales no registradas en VPS</div>
            )}
          </div>
        )}

        {showSection === 'server' && (
          <div className="bg-zinc-900/50 rounded-xl p-3 border border-zinc-800 text-[11px] space-y-2 text-zinc-300">
            <div className="grid grid-cols-2 gap-2">
              <div><span className="text-zinc-500">MAPA:</span> <span className="text-white block font-bold">{server.mapId === 'cesped2' ? 'Césped Forest 2' : 'Laboratory'}</span></div>
              <div><span className="text-zinc-500">MAX JUGADORES:</span> <span className="text-white block font-bold">{server.maxPlayers || 16}</span></div>
            </div>
            {server.previewImage && (
              <div className="space-y-1.5">
                <span className="text-zinc-500">PORTADA:</span>
                <div className="w-24 h-24 bg-zinc-950 border border-zinc-800 flex items-center justify-center overflow-hidden mx-auto rounded-lg">
                  <img src={server.previewImage} alt="Server icon" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                </div>
              </div>
            )}
          </div>
        )}

        <div className="flex gap-2 pt-2 border-t border-zinc-900">
          <button
            type="button"
            onClick={handleReject}
            className="flex-1 py-2 bg-red-950/40 hover:bg-red-900 border border-red-500/40 text-red-400 font-black uppercase text-[10px] rounded-lg transition-all cursor-pointer"
          >
            ❌ RECHAZAR
          </button>
          <button
            type="button"
            onClick={handleApprove}
            className="flex-1 py-2 bg-emerald-950/40 hover:bg-emerald-900 border border-emerald-500/40 text-[#00ff00] font-black uppercase text-[10px] rounded-lg shadow-lg transition-all cursor-pointer"
          >
            ✓ APROBAR CON FIRMA
          </button>
        </div>
      </div>
    );
  };

  const renderAdminUI = () => {
    if (!showAdminFeatures) return null;
    return (
      <>
        {/* Circular Draggable Admin Trigger Button with glass Frutiger Aero design */}
        <button
          ref={buttonRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onClick={() => {
            if (!dragMoved.current) {
              setAdminMenuOpen(!adminMenuOpen);
            }
          }}
          style={{
            left: `${adminBtnPos.x}px`,
            top: `${adminBtnPos.y}px`,
            touchAction: 'none'
          }}
          className="fixed z-[100] w-14 h-14 rounded-full bg-gradient-to-br from-red-600 via-red-500 to-amber-500 hover:from-red-700 hover:via-red-600 hover:to-amber-600 text-white font-mono flex flex-col items-center justify-center shadow-[0_0_20px_rgba(239,68,68,0.5),_inset_0_1px_3px_rgba(255,255,255,0.4)] border-2 border-white select-none cursor-grab active:cursor-grabbing transition-transform active:scale-95 duration-75 p-0"
          title="Staff Console (Arrastrame / Draggable)"
        >
          {/* Pulsing online status indicator badge */}
          <div className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border border-white"></span>
          </div>
          <span className="text-[7px] font-bold opacity-80 tracking-widest leading-none mb-0.5">STAFF</span>
          <span className="text-[10px] font-black tracking-tighter leading-none text-white uppercase">admin</span>
        </button>

        {/* Remade Sleek Hacker Admin Panel */}
        {adminMenuOpen && (
          <div className="fixed inset-0 z-[101] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-zinc-950 border-4 border-[#00ff00] rounded-3xl w-full max-w-[460px] h-[580px] max-h-[90vh] flex flex-col overflow-hidden shadow-[0_0_50px_rgba(0,255,0,0.3)] animate-in zoom-in-95 duration-200">
              
              {/* Terminal Header */}
              <div className="bg-[#00ff00] text-black px-5 py-3.5 flex items-center justify-between shrink-0 border-b-2 border-black font-mono">
                <div className="flex items-center gap-2">
                  <span className="text-xl">☣️</span>
                  <span className="font-black text-xs uppercase tracking-widest text-black">SUBURBIA STAFF PORTAL v4.2</span>
                </div>
                <button 
                  type="button"
                  onClick={() => {
                    setAdminMenuOpen(false);
                    setAdminFeedback('');
                  }}
                  className="w-7 h-7 rounded-lg bg-black text-[#00ff00] hover:bg-zinc-900 border border-[#00ff00] flex items-center justify-center font-black text-xs transition-transform active:scale-90 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Console Tabs Row */}
              <div className="bg-zinc-900 p-2.5 flex items-center gap-1 overflow-x-auto scrollbar-none shrink-0 border-b border-[#00ff00]/20">
                {[
                  { id: 'player', label: '👤 GRUPO' },
                  { id: 'rank', label: '🏆 RANGO' },
                  { id: 'records', label: '📋 CUENTAS' },
                  { id: 'aprobaciones', label: '🖥️ SERVERS' },
                  { id: 'paint', label: '🎨 PORTADA' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      setAdminTab(tab.id as any);
                      setAdminFeedback('');
                      if (tab.id === 'aprobaciones') fetchPendingServers();
                      if (tab.id === 'records') fetchAdminAccountsLog();
                    }}
                    className={`px-3 py-1.5 rounded-lg font-mono font-black text-[9px] uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                      adminTab === tab.id
                        ? 'bg-[#00ff00] text-black shadow-inner font-extrabold'
                        : 'bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Scrollable Content Container */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4 font-mono text-zinc-300">
                
                {/* Global Status/Feedback banner */}
                {adminFeedback && (
                  <div className="p-3 rounded-xl bg-zinc-900 border border-[#00ff00]/60 text-[#00ff00] text-[10px] font-bold text-center flex items-center justify-center gap-1.5 shadow-[0_0_10px_rgba(0,255,0,0.1)]">
                    <span className="text-xs">▶</span>
                    <span>{adminFeedback}</span>
                  </div>
                )}

                {/* Sub-modules */}

                {/* Target Player Search/Selection Area */}
                {(adminTab === 'player' || adminTab === 'rank') && (
                  <div className="space-y-2 bg-zinc-900/50 p-3.5 border border-zinc-800/80 rounded-2xl">
                    <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest block">
                      SELECCIÓN DE OBJETIVO (JUGADOR ACTIVO)
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={adminPlayerSearchQuery}
                        onChange={(e) => setAdminPlayerSearchQuery(e.target.value)}
                        placeholder="Escribe el nombre del jugador para buscar..."
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-9 pr-3 py-2.5 text-xs font-mono font-bold text-white outline-none focus:border-[#00ff00] transition-all placeholder-zinc-600"
                      />
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 text-xs">🔍</span>
                      {adminPlayerSearchQuery && (
                        <button
                          type="button"
                          onClick={() => setAdminPlayerSearchQuery('')}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white font-bold text-xs"
                        >
                          ✕
                        </button>
                      )}
                    </div>

                    {/* Auto-suggest results */}
                    {adminPlayerSearchQuery && (
                      <div className="bg-zinc-950 border border-zinc-800 rounded-xl mt-1.5 max-h-36 overflow-y-auto shadow-2xl divide-y divide-zinc-900/80">
                        {allSearchablePlayers
                          .filter(p => p.name.toLowerCase().includes(adminPlayerSearchQuery.toLowerCase()))
                          .map(p => (
                            <button
                              key={p.name}
                              type="button"
                              onClick={() => {
                                setAdminTargetPlayer(p.name);
                                setAdminPlayerSearchQuery('');
                              }}
                              className={`w-full text-left px-3.5 py-2 text-xs font-bold font-mono flex items-center justify-between hover:bg-zinc-900 ${adminTargetPlayer === p.name ? 'text-[#00ff00] bg-zinc-900/50' : 'text-zinc-300'}`}
                            >
                              <span className="flex items-center gap-2">
                                <span>{p.icon || '👤'}</span>
                                <span>{p.name}</span>
                              </span>
                              <span className="text-[10px] text-zinc-500">☘️{p.money.toLocaleString()}</span>
                            </button>
                          ))
                        }
                        {allSearchablePlayers.filter(p => p.name.toLowerCase().includes(adminPlayerSearchQuery.toLowerCase())).length === 0 && (
                          <div className="p-3 text-center text-[11px] text-zinc-600">No se encontraron registros</div>
                        )}
                      </div>
                    )}

                    {adminTargetPlayer && (
                      <div className="text-[10px] font-black text-[#00ff00] bg-[#00ff00]/5 border border-[#00ff00]/20 px-3.5 py-2.5 rounded-xl flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <span>🎯 JUGADOR ACTIVO:</span>
                          <strong className="underline text-white font-black">{adminTargetPlayer}</strong>
                        </span>
                        <button type="button" onClick={() => setAdminTargetPlayer('')} className="text-zinc-500 hover:text-white font-bold">✕</button>
                      </div>
                    )}
                  </div>
                )}

                {/* Tab Content: Give Money */}
                {adminTab === 'player' && (
                  <div className="space-y-4">
                    <div className="space-y-1.5 bg-zinc-900/30 p-3 rounded-2xl border border-zinc-800">
                      <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest block">CANTIDAD DE DINERO (SUBURBIA COINS)</label>
                      <input
                        type="number"
                        min="1"
                        max="999999"
                        value={adminMoneyAmount}
                        onChange={(e) => setAdminMoneyAmount(parseInt(e.target.value) || 0)}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs font-mono font-bold text-[#00ff00] outline-none focus:border-[#00ff00]"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleAdminGiveMoney}
                      className="w-full py-3 bg-[#00ff00]/10 hover:bg-[#00ff00]/20 border-2 border-[#00ff00] text-[#00ff00] font-mono font-black text-[11px] uppercase tracking-wider rounded-xl shadow-[0_0_15px_rgba(0,255,0,0.15)] transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                    >
                      <span>💸</span> ENTREGAR Y MODIFICAR BASE DE DATOS
                    </button>
                  </div>
                )}

                {/* Tab Content: Change Rank */}
                {adminTab === 'rank' && (
                  <div className="space-y-4">
                    <div className="space-y-1.5 bg-zinc-900/30 p-3 rounded-2xl border border-zinc-800 relative">
                      <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest block mb-1">RANGOS DISPONIBLES DE STAFF</label>
                      <button
                        type="button"
                        onClick={() => setIsRankDropdownOpen(!isRankDropdownOpen)}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs font-mono font-black text-white flex items-center justify-between transition-colors shadow-inner"
                      >
                        <span className="flex items-center gap-2 text-[#00ff00]">
                          <span>🛡️</span>
                          <span>{adminRankName.toUpperCase()}</span>
                        </span>
                        <span className="text-zinc-500 text-[9px]">{isRankDropdownOpen ? '▲' : '▼'}</span>
                      </button>

                      {isRankDropdownOpen && (
                        <div className="absolute left-3 right-3 mt-1 bg-zinc-950 border-2 border-[#00ff00]/60 rounded-xl shadow-2xl z-40 divide-y divide-zinc-900 overflow-hidden animate-in fade-in duration-100">
                          {['Ayudante', 'Mod', 'Super Mod', 'Administrador', 'Super Administrador'].map((rank) => (
                            <button
                              key={rank}
                              type="button"
                              onClick={() => {
                                setAdminRankName(rank);
                                setIsRankDropdownOpen(false);
                              }}
                              className={`w-full text-left px-4 py-2.5 text-xs font-bold transition-colors hover:bg-zinc-900 flex items-center justify-between ${adminRankName === rank ? 'text-[#00ff00]' : 'text-zinc-400'}`}
                            >
                              <span>{rank.toUpperCase()}</span>
                              {adminRankName === rank && <span>✓</span>}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={handleAdminChangeRank}
                      className="w-full py-3 bg-[#00ff00]/10 hover:bg-[#00ff00]/20 border-2 border-[#00ff00] text-[#00ff00] font-mono font-black text-[11px] uppercase tracking-wider rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                    >
                      <span>🏆</span> APLICAR NIVEL DE STAFF A VPS
                    </button>
                  </div>
                )}

                {/* Tab Content: Live Accounts list */}
                {adminTab === 'records' && (
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
                      <span className="text-[10px] font-black text-zinc-500 tracking-wider">CUENTAS REGISTRADAS EN LA RED</span>
                      <button
                        type="button"
                        onClick={fetchAdminAccountsLog}
                        className="px-3 py-1 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 font-bold text-[9px] rounded-lg transition-all active:scale-95 cursor-pointer"
                      >
                        🔄 RECARGAR
                      </button>
                    </div>

                    {/* Search bar inside admin account panel */}
                    <div className="relative mb-3">
                      <input
                        type="text"
                        value={adminAccountSearchQuery}
                        onChange={(e) => setAdminAccountSearchQuery(e.target.value)}
                        placeholder="Buscar cuenta por nombre..."
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-zinc-600 outline-none focus:border-[#00ff00] transition-all font-mono"
                      />
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 text-xs">🔍</span>
                      {adminAccountSearchQuery && (
                        <button
                          type="button"
                          onClick={() => setAdminAccountSearchQuery('')}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white text-xs font-bold"
                        >
                          ✕
                        </button>
                      )}
                    </div>

                    {/* Bulk Selection and Action controls */}
                    {(() => {
                      const selectableUsers = adminAccountsLog.filter(acc => 
                        (acc.username || '').toLowerCase().includes(adminAccountSearchQuery.toLowerCase()) &&
                        acc.username.toLowerCase() !== 'xrency' &&
                        acc.username.toLowerCase() !== playerName.toLowerCase()
                      );
                      if (selectableUsers.length > 0) {
                        const allSelected = selectableUsers.every(acc => selectedAdminUsernames.includes(acc.username));
                        return (
                          <div className="flex flex-col gap-2 mb-3">
                            <div className="flex items-center justify-between text-[10px] font-bold font-mono">
                              <button
                                type="button"
                                onClick={() => {
                                  if (allSelected) {
                                    // Deselect all filtered
                                    setSelectedAdminUsernames(prev => prev.filter(name => !selectableUsers.some(u => u.username === name)));
                                  } else {
                                    // Select all filtered
                                    setSelectedAdminUsernames(prev => {
                                      const union = new Set([...prev, ...selectableUsers.map(u => u.username)]);
                                      return Array.from(union);
                                    });
                                  }
                                }}
                                className="text-zinc-400 hover:text-[#00ff00] transition-colors"
                              >
                                {allSelected ? '☐ DESELECCIONAR TODOS FILTRADOS' : '☑ SELECCIONAR TODOS FILTRADOS'}
                              </button>
                            </div>

                            {selectedAdminUsernames.length > 0 && (
                              <div className="bg-zinc-900 border-2 border-red-500 p-3 rounded-2xl flex flex-col gap-2 text-xs font-mono font-bold animate-pulse text-red-400">
                                <div className="flex items-center justify-between">
                                  <span>{selectedAdminUsernames.length} SELECCIONADOS</span>
                                  <button
                                    type="button"
                                    onClick={() => setSelectedAdminUsernames([])}
                                    className="text-zinc-400 hover:text-white"
                                  >
                                    ✕
                                  </button>
                                </div>
                                <div className="flex gap-2">
                                  <button
                                    type="button"
                                    onClick={handleBulkKick}
                                    className="flex-1 py-1.5 bg-amber-950/60 hover:bg-amber-900/80 text-amber-400 border border-amber-500/30 rounded-lg active:scale-95 cursor-pointer text-center text-[10px]"
                                  >
                                    ❌ Kickear ({selectedAdminUsernames.length})
                                  </button>
                                  <button
                                    type="button"
                                    onClick={handleBulkBan}
                                    className="flex-1 py-1.5 bg-rose-950/60 hover:bg-rose-900/80 text-rose-400 border border-rose-500/30 rounded-lg active:scale-95 cursor-pointer text-center text-[10px]"
                                  >
                                    🛑 Banear ({selectedAdminUsernames.length})
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      }
                      return null;
                    })()}

                    <div className="space-y-2.5 max-h-[320px] overflow-y-auto pr-1 scrollbar-thin">
                      {(() => {
                        const filtered = adminAccountsLog.filter(acc => 
                          (acc.username || '').toLowerCase().includes(adminAccountSearchQuery.toLowerCase())
                        );
                        if (filtered.length === 0) {
                          return (
                            <div className="text-center py-8 text-zinc-600 font-bold text-[11px]">
                              {adminAccountsLog.length === 0 ? 'CONSULTANDO VPS...' : 'NO SE ENCONTRARON CUENTAS'}
                            </div>
                          );
                        }
                        return filtered.map((acc: any, idx: number) => {
                          const isSelf = acc.username && acc.username.toLowerCase() === playerName.toLowerCase();
                          const isOwner = acc.username && acc.username.toLowerCase() === 'xrency';
                          const isChecked = selectedAdminUsernames.includes(acc.username);
                          return (
                            <div key={idx} className="bg-zinc-950 border border-zinc-800/80 rounded-2xl p-4 space-y-3.5 shadow-inner">
                              <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
                                <span className="font-black text-xs text-white flex items-center gap-2">
                                  {!(isSelf || isOwner) && (
                                    <input 
                                      type="checkbox"
                                      checked={isChecked}
                                      onChange={() => {
                                        if (isChecked) {
                                          setSelectedAdminUsernames(prev => prev.filter(name => name !== acc.username));
                                        } else {
                                          setSelectedAdminUsernames(prev => [...prev, acc.username]);
                                        }
                                      }}
                                      className="w-3.5 h-3.5 accent-[#00ff00] cursor-pointer"
                                    />
                                  )}
                                  {renderProfilePersonLogo(acc.profileColor || '#ff007f', "w-6 h-6")} 
                                  <span>{acc.username}</span>
                                  {acc.banned && (
                                    <span className="text-[8px] bg-red-950/80 text-red-400 border border-red-500/30 px-1.5 py-0.5 rounded font-bold">
                                      BANNED
                                    </span>
                                  )}
                                </span>
                                <span className="text-[#00ff00] font-black text-xs">
                                  ☘️{(acc.money || 0).toLocaleString()}
                                </span>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-2 text-[10px] text-zinc-400">
                                <div><span className="text-zinc-600 font-bold">ROL:</span> <span className="text-[#00ff00] uppercase font-black">{acc.role || ((acc.level || 1) >= 50 ? 'ADMIN' : 'USER')}</span></div>
                                <div><span className="text-zinc-600 font-bold">ESTADO:</span> <span className={acc.status === 'ONLINE' ? 'text-emerald-400 font-bold' : 'text-zinc-500'}>{acc.status || 'OFFLINE'}</span></div>
                                <div className="col-span-2 truncate"><span className="text-zinc-600 font-bold">FECHA:</span> <span className="text-zinc-500">{acc.createdAt ? new Date(acc.createdAt).toLocaleString() : 'N/A'}</span></div>
                              </div>

                              {/* Moderation Controls (Kick & Ban) */}
                              <div className="flex gap-2 pt-1 border-t border-zinc-900">
                                <button
                                  type="button"
                                  disabled={isSelf || isOwner}
                                  onClick={() => handleAdminKickUser(acc.username)}
                                  className={`flex-1 py-1.5 rounded-xl font-bold text-[9px] uppercase tracking-wider transition-all border ${
                                    isSelf || isOwner
                                      ? 'bg-zinc-900 text-zinc-700 border-zinc-900 cursor-not-allowed opacity-40'
                                      : 'bg-amber-950/20 hover:bg-amber-900/40 text-amber-400 border-amber-500/30 active:scale-95 cursor-pointer'
                                  }`}
                                >
                                  ❌ Kickear
                                </button>
                                <button
                                  type="button"
                                  disabled={isSelf || isOwner || acc.banned}
                                  onClick={() => handleAdminBanUser(acc.username)}
                                  className={`flex-1 py-1.5 rounded-xl font-black text-[9px] uppercase tracking-wider transition-all border ${
                                    isSelf || isOwner || acc.banned
                                      ? 'bg-zinc-900 text-zinc-700 border-zinc-900 cursor-not-allowed opacity-40'
                                      : 'bg-rose-950/20 hover:bg-rose-900/40 text-rose-400 border-rose-500/30 active:scale-95 cursor-pointer'
                                  }`}
                                >
                                  🛑 Banear
                                </button>
                              </div>
                            </div>
                          );
                        });
                      })()}
                    </div>
                  </div>
                )}

                {/* Tab Content: Portada Paint Canvas */}
                {adminTab === 'paint' && (
                  <div className="space-y-3 bg-zinc-900/20 p-4 border border-zinc-800 rounded-3xl">
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">DIBUJO DE PORTADA / ICONO PERSONALIZADO</p>
                    
                    <div className="flex flex-col items-center gap-3 bg-zinc-950 p-4 rounded-2xl border border-zinc-800">
                      <canvas 
                        ref={(el) => {
                          if (el && !el.dataset.initialized) {
                            el.dataset.initialized = 'true';
                            const ctx = el.getContext('2d');
                            if (ctx) {
                              ctx.fillStyle = '#09090b';
                              ctx.fillRect(0, 0, 120, 120);
                            }
                          }
                        }}
                        id="admin-paint-canvas"
                        width={120}
                        height={120}
                        className="w-36 h-36 bg-zinc-950 border-2 border-[#00ff00] rounded-2xl cursor-crosshair touch-none shadow-inner shadow-black"
                        onMouseDown={(e) => {
                          const canvas = e.currentTarget;
                          const ctx = canvas.getContext('2d');
                          if (!ctx) return;
                          ctx.strokeStyle = '#00ff00';
                          ctx.lineWidth = 6;
                          ctx.lineCap = 'round';
                          const rect = canvas.getBoundingClientRect();
                          const x = ((e.clientX - rect.left) / rect.width) * canvas.width;
                          const y = ((e.clientY - rect.top) / rect.height) * canvas.height;
                          ctx.beginPath();
                          ctx.moveTo(x, y);
                          canvas.dataset.drawing = 'true';
                        }}
                        onMouseMove={(e) => {
                          const canvas = e.currentTarget;
                          if (canvas.dataset.drawing !== 'true') return;
                          const ctx = canvas.getContext('2d');
                          if (!ctx) return;
                          const rect = canvas.getBoundingClientRect();
                          const x = ((e.clientX - rect.left) / rect.width) * canvas.width;
                          const y = ((e.clientY - rect.top) / rect.height) * canvas.height;
                          ctx.lineTo(x, y);
                          ctx.stroke();
                        }}
                        onMouseUp={(e) => { e.currentTarget.dataset.drawing = 'false'; }}
                        onMouseLeave={(e) => { e.currentTarget.dataset.drawing = 'false'; }}
                        onTouchStart={(e) => {
                          const canvas = e.currentTarget;
                          const ctx = canvas.getContext('2d');
                          if (!ctx || e.touches.length === 0) return;
                          ctx.strokeStyle = '#00ff00';
                          ctx.lineWidth = 6;
                          ctx.lineCap = 'round';
                          const rect = canvas.getBoundingClientRect();
                          const x = ((e.touches[0].clientX - rect.left) / rect.width) * canvas.width;
                          const y = ((e.touches[0].clientY - rect.top) / rect.height) * canvas.height;
                          ctx.beginPath();
                          ctx.moveTo(x, y);
                          canvas.dataset.drawing = 'true';
                          e.preventDefault();
                        }}
                        onTouchMove={(e) => {
                          const canvas = e.currentTarget;
                          if (canvas.dataset.drawing !== 'true' || e.touches.length === 0) return;
                          const ctx = canvas.getContext('2d');
                          if (!ctx) return;
                          const rect = canvas.getBoundingClientRect();
                          const x = ((e.touches[0].clientX - rect.left) / rect.width) * canvas.width;
                          const y = ((e.touches[0].clientY - rect.top) / rect.height) * canvas.height;
                          ctx.lineTo(x, y);
                          ctx.stroke();
                          e.preventDefault();
                        }}
                        onTouchEnd={(e) => { e.currentTarget.dataset.drawing = 'false'; }}
                      />

                      <div className="flex gap-2 w-full mt-1">
                        <button
                          type="button"
                          onClick={() => {
                            const canvas = document.getElementById('admin-paint-canvas') as HTMLCanvasElement;
                            if (!canvas) return;
                            const ctx = canvas.getContext('2d');
                            if (!ctx) return;
                            ctx.fillStyle = '#09090b';
                            ctx.fillRect(0, 0, canvas.width, canvas.height);
                            setAdminFeedback('Lienzo limpiado');
                          }}
                          className="flex-1 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 font-bold text-[10px] uppercase rounded-xl cursor-pointer transition-all active:scale-95"
                        >
                          LIMPIAR
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const canvas = document.getElementById('admin-paint-canvas') as HTMLCanvasElement;
                            if (!canvas) return;
                            const dataUrl = canvas.toDataURL('image/png');
                            setServerPreviewDataUrl(dataUrl);
                            setAdminFeedback('¡Dibujo de portada guardado para la creación de tu servidor!');
                          }}
                          className="flex-1 py-2 bg-[#00ff00] hover:bg-[#00dd00] text-black font-black text-[10px] uppercase rounded-xl shadow-lg cursor-pointer transition-all active:scale-95"
                        >
                          GUARDAR DIBUJO
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab Content: Aprobación de Servidores con el nuevo sistema */}
                {adminTab === 'aprobaciones' && (
                  <div className="space-y-4">
                    {/* Sub-tab Selection */}
                    <div className="flex gap-2 p-1 bg-zinc-900 border border-zinc-800 rounded-xl">
                      <button
                        type="button"
                        onClick={() => {
                          setAdminAprobacionesSubTab('pending');
                          fetchPendingServers();
                        }}
                        className={`flex-1 py-2 text-[10px] font-black rounded-lg uppercase tracking-wider transition-all cursor-pointer ${
                          adminAprobacionesSubTab === 'pending'
                            ? 'bg-[#00ff00] text-black font-extrabold'
                            : 'text-zinc-500 hover:text-zinc-300'
                        }`}
                      >
                        PENDIENTES
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setAdminAprobacionesSubTab('registry');
                          fetchRegistryServers();
                        }}
                        className={`flex-1 py-2 text-[10px] font-black rounded-lg uppercase tracking-wider transition-all cursor-pointer ${
                          adminAprobacionesSubTab === 'registry'
                            ? 'bg-[#00ff00] text-black font-extrabold'
                            : 'text-zinc-500 hover:text-zinc-300'
                        }`}
                      >
                        REGISTRO GLOBAL
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setAdminAprobacionesSubTab('waiting');
                          fetchServers();
                        }}
                        className={`flex-1 py-2 text-[10px] font-black rounded-lg uppercase tracking-wider transition-all cursor-pointer ${
                          adminAprobacionesSubTab === 'waiting'
                            ? 'bg-[#00ff00] text-black font-extrabold'
                            : 'text-zinc-500 hover:text-zinc-300'
                        }`}
                      >
                        ⏳ EN ESPERA
                      </button>
                    </div>

                    {adminAprobacionesSubTab === 'pending' && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between border-b border-zinc-900 pb-1">
                          <span className="text-[10px] font-bold text-zinc-500">COLA DE APROBACIÓN DE SERVIDORES</span>
                          <button
                            type="button"
                            onClick={fetchPendingServers}
                            className="text-[9px] text-[#00ff00] font-black underline bg-transparent"
                          >
                            [RECARGAR COLA]
                          </button>
                        </div>

                        <div className="space-y-3.5">
                          {loadingPending ? (
                            <div className="text-center py-6 text-zinc-400 font-bold flex items-center justify-center gap-2">
                              <Loader2 className="w-4 h-4 animate-spin text-[#00ff00]" />
                              <span>CARGANDO COLA DE VPS...</span>
                            </div>
                          ) : pendingServersList.length === 0 ? (
                            <div className="text-center py-8 text-zinc-600 font-black text-xs border border-dashed border-zinc-900 rounded-2xl bg-zinc-950/20">
                              NINGÚN SERVIDOR ESPERANDO APROBACIÓN
                            </div>
                          ) : (
                            pendingServersList.map((server: any) => (
                              <PendingServerCard 
                                key={server.id} 
                                server={server} 
                                language={language}
                                onApproved={fetchPendingServers}
                                onRejected={fetchPendingServers}
                              />
                            ))
                          )}
                        </div>
                      </div>
                    )}

                    {adminAprobacionesSubTab === 'registry' && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between border-b border-zinc-900 pb-1">
                          <span className="text-[10px] font-bold text-zinc-500">REGISTRO DE SERVIDORES AUTORIZADOS</span>
                          <button
                            type="button"
                            onClick={fetchRegistryServers}
                            className="text-[9px] text-[#00ff00] font-black underline bg-transparent"
                          >
                            [RECARGAR REGISTRO]
                          </button>
                        </div>

                        {/* List of approved servers from DB and presence info */}
                        <div className="space-y-3">
                          {loadingRegistry ? (
                            <div className="text-center py-6 text-zinc-400 font-bold flex items-center justify-center gap-2">
                              <Loader2 className="w-4 h-4 animate-spin text-[#00ff00]" />
                              <span>CARGANDO REGISTRO...</span>
                            </div>
                          ) : registryServersList.length === 0 ? (
                            <div className="text-center py-8 text-zinc-600 font-black text-xs border border-dashed border-zinc-900 rounded-2xl bg-zinc-950/20">
                              EL REGISTRO ESTÁ VACÍO
                            </div>
                          ) : (
                            registryServersList.map((server: any, idx: number) => {
                              const isApproved = server.status === 'approved';
                              const approver = server.approvedBy || 'xrency';
                              const isApproverOnline = server.isApproverOnline;
                              
                              return (
                                <div key={idx} className="bg-zinc-950 border border-zinc-900 p-4 rounded-2xl flex flex-col gap-2.5 text-[11px] font-mono shadow-inner shadow-black">
                                  <div className="flex items-start justify-between border-b border-zinc-900 pb-2">
                                    <div>
                                      <h5 className="font-extrabold text-white text-xs truncate">🖥️ {server.name}</h5>
                                      <p className="text-[9px] text-zinc-500 mt-0.5 font-bold">
                                        PROPIETARIO: <strong className="text-pink-400">{server.ownerName}</strong>
                                      </p>
                                    </div>
                                    <div>
                                      <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider ${isApproved ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'}`}>
                                        {server.status}
                                      </span>
                                    </div>
                                  </div>

                                  {isApproved && (
                                    <div className="space-y-2">
                                      {/* Security Metadata & Presence Status Checklist */}
                                      <div className="bg-zinc-900/40 border border-zinc-900 p-2.5 rounded-xl text-[10px] space-y-1">
                                        <div className="flex items-center justify-between">
                                          <span className="text-zinc-500">APROBADO POR:</span>
                                          <span className="text-white font-black">{approver}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                          <span className="text-zinc-500">ESTADO DEL STAFF:</span>
                                          <span className={`font-black flex items-center gap-1 ${isApproverOnline ? 'text-emerald-400' : 'text-rose-500 animate-pulse'}`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${isApproverOnline ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]' : 'bg-rose-500 shadow-[0_0_8px_#f43f5e]'}`}></span>
                                            {isApproverOnline ? 'ONLINE' : 'OFFLINE'}
                                          </span>
                                        </div>
                                        <div className="flex items-center justify-between text-[9px] text-zinc-600 font-mono truncate">
                                          <span>FIRMA PRIVATE-KEY:</span>
                                          <span className="text-[#00ff00] font-bold">{server.approvedByPrivateKey ? server.approvedByPrivateKey.slice(0, 18) + '...' : 'pk_default_legacy'}</span>
                                        </div>
                                      </div>

                                      {/* Revoke Permission button */}
                                      <button
                                        type="button"
                                        onClick={async () => {
                                          if (!confirm(language === 'es' 
                                            ? `¿Estás seguro de que quieres quitarle el permiso de aprobación al servidor "${server.name}" de "${server.ownerName}"?` 
                                            : `Are you sure you want to revoke the approval of "${server.name}" owned by "${server.ownerName}"?`
                                          )) return;

                                          try {
                                            const res = await fetch('/api/servers/revoke', {
                                              method: 'POST',
                                              headers: { 'Content-Type': 'application/json' },
                                              body: JSON.stringify({
                                                ownerName: server.ownerName,
                                                serverName: server.name,
                                              })
                                            });
                                            const rdata = await res.json();
                                            if (res.ok) {
                                              alert(rdata.message || 'Revocación exitosa!');
                                              fetchRegistryServers();
                                            } else {
                                              alert(rdata.error || 'Error');
                                            }
                                          } catch (e) {
                                            console.error(e);
                                            alert('Error de conexión');
                                          }
                                        }}
                                        className="w-full py-1.5 bg-rose-950/20 hover:bg-rose-900/60 border border-rose-500/40 text-rose-400 font-bold text-[9px] uppercase rounded-xl transition-all active:scale-95 cursor-pointer"
                                      >
                                        REVOCAR PERMISO DE PUBLICACIÓN (QUITAR FIRMA)
                                      </button>
                                    </div>
                                  )}
                                </div>
                              );
                            })
                          )}
                        </div>
                      </div>
                    )}

                    {adminAprobacionesSubTab === 'waiting' && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between border-b border-zinc-900 pb-1">
                          <span className="text-[10px] font-bold text-zinc-500">SERVIDORES EN ESPERA DE USUARIOS</span>
                          <button
                            type="button"
                            onClick={fetchServers}
                            className="text-[9px] text-[#00ff00] font-black underline bg-transparent"
                          >
                            [RECARGAR LISTA]
                          </button>
                        </div>

                        <div className="space-y-3">
                          {isLoadingServers ? (
                            <div className="text-center py-6 text-zinc-400 font-bold flex items-center justify-center gap-2">
                              <Loader2 className="w-4 h-4 animate-spin text-[#00ff00]" />
                              <span>ESCANEANDO SERVIDORES...</span>
                            </div>
                          ) : (() => {
                            const waitingServersList = servers.filter(s => (s.playerCount ?? 0) === 0);
                            if (waitingServersList.length === 0) {
                              return (
                                <div className="text-center py-8 text-zinc-600 font-black text-xs border border-dashed border-zinc-900 rounded-2xl bg-zinc-950/20 leading-relaxed px-4">
                                  TODOS LOS SERVIDORES ACTIVOS TIENEN JUGADORES O NO HAY NINGÚN SERVIDOR PÚBLICO DISPONIBLE
                                </div>
                              );
                            }
                            return waitingServersList.map((server, idx) => (
                              <div key={idx} className="bg-zinc-950 border border-zinc-900 p-4 rounded-2xl flex flex-col gap-2.5 text-[11px] font-mono shadow-inner shadow-black animate-in fade-in-50 duration-200">
                                <div className="flex items-start justify-between border-b border-zinc-900 pb-2">
                                  <div>
                                    <h5 className="font-extrabold text-[#00ff00] text-xs truncate">🖥️ {server.name}</h5>
                                    <p className="text-[9px] text-zinc-500 mt-0.5 font-bold">
                                      MAPA: <strong className="text-pink-400 uppercase">{server.mapId}</strong>
                                    </p>
                                  </div>
                                  <div className="flex flex-col items-end">
                                    <span className="px-2 py-0.5 rounded text-[8px] font-black bg-amber-500/10 text-amber-400 border border-amber-500/30 animate-pulse">
                                      SIN JUGADORES
                                    </span>
                                    <span className="text-[8px] text-zinc-600 font-bold mt-1">
                                      PING: {server.pingMs || 15}ms
                                    </span>
                                  </div>
                                </div>

                                <div className="bg-zinc-900/40 border border-zinc-900 p-2.5 rounded-xl text-[10px] space-y-1">
                                  <div className="flex items-center justify-between">
                                    <span className="text-zinc-500">ID SERVIDOR:</span>
                                    <span className="text-white font-mono font-bold text-[9px]">{server.id}</span>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <span className="text-zinc-500">CAPACIDAD MÁXIMA:</span>
                                    <span className="text-white font-bold">{server.maxPlayers || 16} JUGADORES</span>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <span className="text-zinc-500">JUGADORES ACTUALES:</span>
                                    <span className="text-rose-400 font-black animate-pulse">0 JUGADORES</span>
                                  </div>
                                </div>

                                <button
                                  type="button"
                                  onClick={() => {
                                    alert(language === 'es' ? `Uniendo al servidor '${server.name}'...` : `Joining server '${server.name}'...`);
                                    setAdminMenuOpen(false);
                                  }}
                                  className="w-full py-1.5 bg-[#00ff00]/10 hover:bg-[#00ff00]/30 border border-[#00ff00]/40 text-[#00ff00] font-black text-[9px] uppercase rounded-xl transition-all active:scale-95 cursor-pointer"
                                >
                                  INGRESAR COMO ADMINISTRADOR / PROBAR CONEXIÓN
                                </button>
                              </div>
                            ));
                          })()}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

  // Auth States
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [registeredDataForDownload, setRegisteredDataForDownload] = useState<any | null>(null);
  const [showDownloadBtn, setShowDownloadBtn] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [authName, setAuthName] = useState<string>('');
  const [authPassword, setAuthPassword] = useState<string>('');
  const [authEmail, setAuthEmail] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');
  const [authSuccess, setAuthSuccess] = useState<string>('');
  const [adminConfirmOpen, setAdminConfirmOpen] = useState<boolean>(false);
  const [adminConfirmPassword, setAdminConfirmPassword] = useState<string>('');
  const [adminConfirmError, setAdminConfirmError] = useState<string>('');
  const [adminConfirmed, setAdminConfirmed] = useState<boolean>(false);
  const [hasDownloadedKey, setHasDownloadedKey] = useState<boolean>(false);
  const [registerBirthdate, setRegisterBirthdate] = useState<string>('');

  const [mySavedServers, setMySavedServers] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem('gorebox_my_saved_servers');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [adminAprobacionesSubTab, setAdminAprobacionesSubTab] = useState<'pending' | 'registry' | 'waiting'>('pending');
  const [registryServersList, setRegistryServersList] = useState<any[]>([]);
  const [loadingRegistry, setLoadingRegistry] = useState<boolean>(false);

  const fetchRegistryServers = async () => {
    setLoadingRegistry(true);
    try {
      const res = await fetch('/api/servers/registry');
      if (res.ok) {
        const data = await res.json();
        if (data.servers) {
          setRegistryServersList(data.servers);
        }
      }
    } catch (err) {
      console.error("Error fetching registry servers:", err);
    } finally {
      setLoadingRegistry(false);
    }
  };

  useEffect(() => {
    localStorage.setItem('gorebox_my_saved_servers', JSON.stringify(mySavedServers));
  }, [mySavedServers]);

  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [randomBannerColor, setRandomBannerColor] = useState<string>(() => {
    const colors = ['#38bdf8', '#10b981', '#ef4444', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4', '#14b8a6', '#f43f5e'];
    return colors[Math.floor(Math.random() * colors.length)];
  });

  // Personalization State (Stored locally)
  const [skinPreset, setSkinPreset] = useState<string>(() => localStorage.getItem('gbox_skin_preset') || 'normal');
  const [skinColor, setSkinColor] = useState<string>(() => localStorage.getItem('gbox_skin_color') || '#e0a96d');
  const [faceStyle, setFaceStyle] = useState<string>(() => localStorage.getItem('gbox_face_style') || 'classic');
  const [headScale, setHeadScale] = useState<number>(() => parseFloat(localStorage.getItem('gbox_head_scale') || '1.0'));
  
  const [profileHue, setProfileHue] = useState<number>(() => {
    const saved = localStorage.getItem('gbox_profile_hue');
    if (saved !== null) {
      return parseInt(saved, 10);
    }
    const randomHue = Math.floor(Math.random() * 360);
    localStorage.setItem('gbox_profile_hue', randomHue.toString());
    return randomHue;
  });

  const [profileBanner, setProfileBanner] = useState<string>(() => {
    return localStorage.getItem('gbox_profile_banner') || 'default';
  });

  const [isLoadingServers, setIsLoadingServers] = useState<boolean>(false);
  const [servers, setServers] = useState<ServerInfo[]>([
    {
      id: 'server-1',
      name: 'Default Server',
      mapId: 'cesped2',
      maxPlayers: 16,
      playerCount: 1,
      pingMs: 14,
      status: 'ONLINE',
    },
    {
      id: 'server-3',
      name: 'Deathmatch Arena',
      mapId: 'cesped2',
      maxPlayers: 24,
      playerCount: 12,
      pingMs: 25,
      status: 'ONLINE',
    },
    {
      id: 'server-4',
      name: 'Roleplay Downtown',
      mapId: 'lab',
      maxPlayers: 32,
      playerCount: 30,
      pingMs: 45,
      status: 'ONLINE',
    }
  ]);

  const recommendedServers = React.useMemo(() => {
    return [...servers].sort(() => 0.5 - Math.random()).slice(0, 2);
  }, [servers]);

  const fetchServers = async () => {
    setIsLoadingServers(true);
    try {
      const viewerParam = playerName ? `?viewer=${encodeURIComponent(playerName)}` : '';
      const res = await fetch(`/api/servers${viewerParam}`);
      if (res.ok) {
        const data = await res.json();
        if (data.servers && Array.isArray(data.servers)) {
          setServers(data.servers);
        }
      }
    } catch {
      // Fallback local list if offline
    } finally {
      setIsLoadingServers(false);
    }
  };

  const fetchAllUsersFromVps = async () => {
    try {
      const res = await fetch('/api/vps/users');
      if (res.ok) {
        const data = await res.json();
        if (data.users && Array.isArray(data.users)) {
          setDbUsers(data.users);
        }
      }
    } catch (err) {
      console.error("Error fetching users from VPS:", err);
    }
  };

  useEffect(() => {
    fetchAllUsersFromVps();
  }, []);

  useEffect(() => {
    if (searchOpen) {
      fetchAllUsersFromVps();
    }
  }, [searchOpen]);

  useEffect(() => {
    const loadUserData = async () => {
      if (signedIn && playerName) {
        try {
          const res = await fetch(`/api/vps/user/${encodeURIComponent(playerName)}`);
          if (res.ok) {
            const data = await res.json();
            const user = data.user;
            if (user) {
              if (user.money !== undefined) {
                setMoney(user.money);
                localStorage.setItem('gorebox_player_money', user.money.toString());
              }
              if (user.createdAt) {
                localStorage.setItem('gorebox_player_created_at', user.createdAt);
              }
              if (user.skinPreset) setSkinPreset(user.skinPreset);
              if (user.skinColor) setSkinColor(user.skinColor);
              if (user.faceStyle) setFaceStyle(user.faceStyle);
              if (user.headScale) setHeadScale(user.headScale);
              if (user.cosmicBgEnabled !== undefined) {
                setCosmicBgEnabled(user.cosmicBgEnabled);
                localStorage.setItem('gorebox_cosmic_bg_enabled', user.cosmicBgEnabled ? 'true' : 'false');
              }
              if (user.lavaBgEnabled !== undefined) {
                setLavaBgEnabled(user.lavaBgEnabled);
                localStorage.setItem('gorebox_lava_bg_enabled', user.lavaBgEnabled ? 'true' : 'false');
              }
              if (user.unlockedItems) {
                setUnlockedItems(user.unlockedItems);
                localStorage.setItem('gorebox_unlocked_items', JSON.stringify(user.unlockedItems));
              }
              if (user.isVerified18 !== undefined) {
                setIsVerified18(user.isVerified18);
                localStorage.setItem('gorebox_verified_18', user.isVerified18 ? 'true' : 'false');
              }
              if (user.servers) {
                setMySavedServers(user.servers);
                localStorage.setItem('gorebox_my_saved_servers', JSON.stringify(user.servers));
              }
            }
          }
        } catch (err) {
          console.error("Error loading user data from VPS:", err);
        }
      }
    };
    loadUserData();
  }, [signedIn, playerName]);

  useEffect(() => {
    if (view === 'multiplayer') {
      fetchServers();
    }
  }, [view]);

  useEffect(() => {
    localStorage.setItem('gorebox_player_name', playerName);
  }, [playerName]);

  useEffect(() => {
    localStorage.setItem('gorebox_game_language', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('gorebox_signed_in', signedIn ? 'true' : 'false');
  }, [signedIn]);

  useEffect(() => {
    localStorage.setItem('gorebox_player_money', money.toString());
  }, [money]);

  useEffect(() => {
    localStorage.setItem('gbox_skin_preset', skinPreset);
    localStorage.setItem('gbox_skin_color', skinColor);
    localStorage.setItem('gbox_face_style', faceStyle);
    localStorage.setItem('gbox_head_scale', headScale.toString());
  }, [skinPreset, skinColor, faceStyle, headScale]);

  const handleNameChange = (val: string) => {
    const clean = val.replace(/[^a-zA-Z0-9_]/g, '');
    setPlayerName(clean);
  };

  const getFansCount = (player: any) => {
    return 0;
  };

  const getFriendsCount = (player: any) => {
    return 0;
  };

  // Translations Dictionary
  const translations = {
    en: {
      menu: "Menu",
      discover: "Discover",
      settings: "Settings",
      personalize: "Workshop",
      exit: "Exit",
      signIn: "Sign In",
      signedIn: "Signed In",
      offlineMaps: "Offline Maps",
      defaultGrass: "Grass Plate",
      grassForest: "Grass Forest 2",
      warehouse: "Industrial Warehouse",
      recommended: "Servers with more users",
      refresh: "Refresh List",
      language: "Language",
      selectLanguage: "Select Language",
      searchPlayers: "Search Players",
      searchServers: "Search Servers",
      searchPlaceholder: "search player",
      searchServersPlaceholder: "Search server names...",
      playerLevel: "Level",
      playerStatus: "Online",
      noPlayersFound: "No players found",
      noServersFound: "No servers found",
      customizeAvatar: "Personalize Avatar",
      skinPreset: "Skin Preset",
      skinColor: "Skin Color",
      faceStyle: "Face Style",
      headSize: "Head Size",
      save: "Apply Customizations",
      savedAlert: "Customizations Applied!",
      classic: "Classic",
      zombie: "Zombie",
      werewolf: "Werewolf",
      neonBlue: "Neon Blue",
      cyberPink: "Cyber Pink",
      golden: "Golden Elite",
      angry: "Angry",
      creepy: "Creepy",
      anime: "Anime Glow",
      cool: "Cool Shades",
      audioGraphics: "Audio, graphics, and gameplay settings will be added in a future update.",
      verifiedBadge: "Verified",
    },
    es: {
      menu: "Menú",
      discover: "Descubrir",
      settings: "Configuración",
      personalize: "Taller",
      exit: "Salir",
      signIn: "Iniciar Sesión",
      signedIn: "Sesión Iniciada",
      offlineMaps: "Mapas Locales",
      defaultGrass: "Placa de Césped",
      grassForest: "Bosque de Césped 2",
      warehouse: "Almacén Industrial",
      recommended: "Servidores con más usuarios",
      refresh: "Actualizar Lista",
      language: "Idioma",
      selectLanguage: "Seleccionar Idioma",
      searchPlayers: "Buscar Jugadores",
      searchServers: "Buscar Servidores",
      searchPlaceholder: "buscar jugador",
      searchServersPlaceholder: "Buscar servidores...",
      playerLevel: "Nivel",
      playerStatus: "En línea",
      noPlayersFound: "No se encontraron jugadores",
      noServersFound: "No se encontraron servidores",
      customizeAvatar: "Personalizar Avatar",
      skinPreset: "Aspecto del Cuerpo",
      skinColor: "Color de Piel",
      faceStyle: "Estilo de Cara",
      headSize: "Tamaño de Cabeza",
      save: "Aplicar Personalización",
      savedAlert: "¡Personalización Aplicada!",
      classic: "Clásico",
      zombie: "Zombi",
      werewolf: "Hombre Lobo",
      neonBlue: "Azul Neón",
      cyberPink: "Rosa Ciber",
      golden: "Élite Dorado",
      angry: "Enojado",
      creepy: "Escalofríos",
      anime: "Brillo Anime",
      cool: "Gafas de Sol",
      audioGraphics: "La configuración de audio, gráficos y jugabilidad se agregará en una futura actualización.",
      verifiedBadge: "Verificado",
    }
  };

  const t = translations[language];

  const getPlayerRankInfo = (player: any) => {
    const nameLower = (player.name || '').toLowerCase();
    if (nameLower === 'xrency' || player.role === 'owner' || (player.level || 0) >= 100) {
      return { name: 'OWNER', bg: 'bg-purple-600 text-white shadow-purple-500/30 border border-purple-400' };
    }
    if ((player.level || 0) >= 50 || player.role === 'superadmin' || player.role === 'admin') {
      return { name: 'ADMINISTRADOR', bg: 'bg-red-600 text-white shadow-red-500/30' };
    }
    if ((player.level || 0) >= 30) {
      return { name: 'SUPER MOD', bg: 'bg-blue-600 text-white shadow-blue-500/30' };
    }
    if ((player.level || 0) >= 20) {
      return { name: 'MOD', bg: 'bg-emerald-600 text-white shadow-emerald-500/30' };
    }
    if ((player.level || 0) >= 10) {
      return { name: 'AYUDANTE', bg: 'bg-indigo-600 text-white shadow-indigo-500/30' };
    }
    return { name: 'JUGADOR', bg: 'bg-slate-700 text-white shadow-slate-500/30' };
  };

  // Simulated & Admin Registered Players for Player Search
  const simulatedPlayers = [
    { name: "GoreMaster", email: "goremaster@vps.net", level: 99, status: "ONLINE", icon: "🔥", money: 50000, skinPreset: 'normal', skinColor: '#e0a96d', faceStyle: 'angry' },
    { name: "BlockySlayer", email: "blocky@vps.net", level: 42, status: "ONLINE", icon: "⚔️", money: 12000, skinPreset: 'zombie', skinColor: '#52b788', faceStyle: 'creepy' },
    { name: "RagdollKing", email: "king@vps.net", level: 77, status: "ONLINE", icon: "👑", money: 25000, skinPreset: 'werewolf', skinColor: '#4a4e69', faceStyle: 'classic' },
    { name: "PhysX_Fan", email: "physx@vps.net", level: 12, status: "ONLINE", icon: "🔮", money: 1500, skinPreset: 'blue', skinColor: '#06b6d4', faceStyle: 'anime' },
    { name: "AlphaWerewolf", email: "alpha@vps.net", level: 85, status: "ONLINE", icon: "🐺", money: 18000, skinPreset: 'werewolf', skinColor: '#4a4e69', faceStyle: 'classic' },
    { name: "SuburbanVoxel", email: "voxel@vps.net", level: 23, status: "ONLINE", icon: "🏠", money: 4500, skinPreset: 'pink', skinColor: '#ec4899', faceStyle: 'cool' }
  ];

  // Combined searchable players, combining simulated with registered Firestore players
  const allSearchablePlayers = React.useMemo(() => {
    const map = new Map<string, any>();
    const currentLocalName = (playerName || '').trim().toLowerCase();

    simulatedPlayers.forEach(p => {
      map.set(p.name.toLowerCase(), { ...p, isReal: false });
    });

    dbUsers.forEach(u => {
      const uNameLower = (u.name || '').toLowerCase();
      
      // Strict rule for xrency: Only show xrency if xrency is registered AND status is ONLINE (or if local user is xrency)!
      if (uNameLower === 'xrency') {
        const isSelf = currentLocalName === 'xrency' && signedIn;
        const isOnlineInDb = u.status === 'ONLINE';
        if (!isSelf && !isOnlineInDb) {
          return; // Skip xrency when not registered/logged in
        }
      }

      map.set(uNameLower, {
        name: u.name,
        level: u.level || 1,
        status: u.status || 'OFFLINE',
        icon: u.icon || '👤',
        money: u.money || 0,
        role: u.role || (uNameLower === 'xrency' ? 'owner' : 'user'),
        skinPreset: u.skinPreset || 'normal',
        skinColor: u.skinColor || '#e0a96d',
        faceStyle: u.faceStyle || 'classic',
        headScale: u.headScale || 1.0,
        isReal: true,
        cosmicBgEnabled: u.cosmicBgEnabled || false,
        lavaBgEnabled: u.lavaBgEnabled || false,
        profileHue: u.profileHue !== undefined ? u.profileHue : undefined,
        profileBanner: u.profileBanner || 'default'
      });
    });

    return Array.from(map.values()).filter(p => {
      if (p.name.toLowerCase() === 'xrency') {
        const xrencyInDb = dbUsers.find(u => u.name && u.name.toLowerCase() === 'xrency');
        if (!xrencyInDb) return false; // Not registered in DB
        const isSelf = currentLocalName === 'xrency' && signedIn;
        if (!isSelf && xrencyInDb.status !== 'ONLINE') return false; // Not logged in
      }
      return true;
    });
  }, [dbUsers, playerName, signedIn]);

  const filteredPlayers = allSearchablePlayers.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredServers = servers.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggleSignIn = async () => {
    if (signedIn) {
      if (playerName) {
        try {
          await fetch('/api/vps/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: playerName })
          });
        } catch (e) {
          console.error("Presence logout error:", e);
        }
      }
      setSignedIn(false);
      localStorage.removeItem('gorebox_signed_in');
      setMoney(0);
      localStorage.removeItem('gorebox_player_money');
      localStorage.removeItem('gorebox_admin_private_key');
    } else {
      setRegisteredDataForDownload(null);
      setIsAuthOpen(true);
      setAuthMode('login');
      setAuthName('');
      setAuthPassword('');
      setAuthEmail('');
      setAuthError('');
      setAuthSuccess('');
      setAdminConfirmed(false);
      setHasDownloadedKey(false);
    }
  };

  const handleLoginWithFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      e.target.value = ''; // Reset to allow re-selecting the same file
      fileReader.readAsText(file, "UTF-8");
      fileReader.onload = async (event) => {
        try {
          const parsed = parseAccountFile(event.target?.result as string);
          if (!parsed.playerName || !parsed.password) {
            setAuthError(language === 'es' ? 'Archivo de cuenta inválido o sin contraseña.' : 'Invalid account file or missing password.');
            return;
          }
          
          // Check anti-tamper signature
          const expectedSig = calculateAccountChecksum(
            parsed.playerName,
            parsed.money || 0,
            !!parsed.isVerified18,
            parsed.password
          );
          if (parsed.security_signature !== expectedSig) {
            setAuthError(
              language === 'es'
                ? '🛑 ¡ERROR DE SEGURIDAD! El archivo de guardado ha sido modificado de forma ilegal.'
                : '🛑 SECURITY ERROR! The save file has been illegally modified.'
            );
            return;
          }

          setAuthName(parsed.playerName);
          setAuthPassword(parsed.password);
          setAuthError('');
          setAuthSuccess(language === 'es' ? '¡Archivo verificado! Iniciando sesión...' : 'File verified! Logging in...');
          
          const res = await fetch('/api/vps/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: parsed.playerName, password: parsed.password })
          });
          const data = await res.json();
          
          if (!res.ok) {
            // Not found on VPS server (e.g. server restart), register on server now to keep search persistence
            setAuthSuccess(language === 'es' ? 'Registrando en Google Cloud...' : 'Registering on Google Cloud...');
            const regRes = await fetch('/api/vps/register', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                username: parsed.playerName,
                password: parsed.password,
                createdAt: parsed.createdAt || parsed.saveDate || new Date().toISOString()
              })
            });
            if (regRes.ok) {
              await fetch('/api/vps/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  username: parsed.playerName,
                  money: parsed.money || 1000,
                  unlockedItems: parsed.unlockedItems || [],
                  skinPreset: parsed.skinPreset || 'normal',
                  skinColor: parsed.skinColor || '#e0a96d',
                  faceStyle: parsed.faceStyle || 'classic',
                  headScale: parsed.headScale || 1.0,
                  isVerified18: !!parsed.isVerified18
                })
              });
              
              setPlayerName(parsed.playerName);
              setMoney(parsed.money ?? 1000);
              localStorage.setItem('gorebox_player_money', (parsed.money ?? 1000).toString());
              setPlayerPassword(parsed.password);
              localStorage.setItem('gorebox_player_password', parsed.password);
              localStorage.setItem('gorebox_player_created_at', parsed.createdAt || parsed.saveDate || new Date().toISOString());
              if (parsed.skinPreset) setSkinPreset(parsed.skinPreset);
              if (parsed.skinColor) setSkinColor(parsed.skinColor);
              if (parsed.faceStyle) setFaceStyle(parsed.faceStyle);
              if (parsed.headScale) setHeadScale(parsed.headScale);
              if (parsed.unlockedItems) {
                setUnlockedItems(parsed.unlockedItems);
                localStorage.setItem('gorebox_unlocked_items', JSON.stringify(parsed.unlockedItems));
              }
              if (parsed.isVerified18 !== undefined) {
                setIsVerified18(parsed.isVerified18);
                localStorage.setItem('gorebox_verified_18', parsed.isVerified18 ? 'true' : 'false');
              }
              setSignedIn(true);
              setAuthSuccess(language === 'es' ? '¡Sesión iniciada con éxito!' : 'Logged in successfully!');
              fetchAllUsersFromVps();
              setTimeout(() => setIsAuthOpen(false), 1500);
            } else {
              setAuthError(language === 'es' ? 'Error al restaurar cuenta en el servidor.' : 'Error restoring account on the server.');
            }
            return;
          }
          
          const user = data.user;
          setPlayerName(user.username);
          setMoney(user.money ?? 1000);
          localStorage.setItem('gorebox_player_money', (user.money ?? 1000).toString());
          setPlayerPassword(parsed.password);
          localStorage.setItem('gorebox_player_password', parsed.password);
          localStorage.setItem('gorebox_player_created_at', user.createdAt || parsed.createdAt || parsed.saveDate || new Date().toISOString());
          if (user.skinPreset) setSkinPreset(user.skinPreset);
          if (user.skinColor) setSkinColor(user.skinColor);
          if (user.faceStyle) setFaceStyle(user.faceStyle);
          if (user.headScale) setHeadScale(user.headScale);
          if (user.unlockedItems) {
            setUnlockedItems(user.unlockedItems);
            localStorage.setItem('gorebox_unlocked_items', JSON.stringify(user.unlockedItems));
          }
          if (user.isVerified18 !== undefined) {
            setIsVerified18(user.isVerified18);
            localStorage.setItem('gorebox_verified_18', user.isVerified18 ? 'true' : 'false');
          }
          setSignedIn(true);
          setAuthSuccess(language === 'es' ? '¡Sesión iniciada con éxito!' : 'Logged in successfully!');
          fetchAllUsersFromVps();
          setTimeout(() => setIsAuthOpen(false), 1500);
        } catch (err) {
          setAuthError(language === 'es' ? 'Archivo corrupto o inválido.' : 'Corrupted or invalid file.');
        }
      };
    }
  };

  const handleEntrarFileCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      e.target.value = ''; // Reset to allow re-selecting the same file
      fileReader.readAsText(file, "UTF-8");
      fileReader.onload = async (event) => {
        try {
          const parsed = parseAccountFile(event.target?.result as string);
          if (!parsed.playerName || !parsed.password) {
            setAuthError(language === 'es' ? 'Archivo de cuenta inválido o sin contraseña.' : 'Invalid account file or missing password.');
            return;
          }

          // Anti-tamper verification
          const expectedSig = calculateAccountChecksum(
            parsed.playerName,
            parsed.money || 0,
            !!parsed.isVerified18,
            parsed.password
          );
          if (parsed.security_signature !== expectedSig) {
            setAuthError(
              language === 'es'
                ? '🛑 ¡ERROR DE SEGURIDAD! El archivo de guardado ha sido modificado ilegalmente.'
                : '🛑 SECURITY ERROR! The save file has been illegally modified.'
            );
            return;
          }

          const cleanInputName = authName.trim().toLowerCase();
          const cleanFilePlayerName = parsed.playerName.trim().toLowerCase();

          if (cleanFilePlayerName !== cleanInputName || parsed.password !== authPassword) {
            setAuthError(
              language === 'es'
                ? '❌ El nombre de usuario o la contraseña ingresados no coinciden con el archivo de registro seleccionado.'
                : '❌ Entered username or password does not match the selected registration file.'
            );
            return;
          }

          setAuthError('');
          setAuthSuccess(language === 'es' ? '¡Coincidencia exitosa! Iniciando sesión...' : 'Credentials match successfully! Logging in...');

          const res = await fetch('/api/vps/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: parsed.playerName, password: parsed.password })
          });
          const data = await res.json();

          if (res.ok && data.user && data.user.privateKey) {
            localStorage.setItem('gorebox_admin_private_key', data.user.privateKey);
          }

          if (!res.ok) {
            // Register on server if missing to ensure consistency
            await fetch('/api/vps/register', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                username: parsed.playerName,
                password: parsed.password,
                createdAt: parsed.createdAt || parsed.saveDate || new Date().toISOString()
              })
            });
            await fetch('/api/vps/update', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                username: parsed.playerName,
                money: parsed.money || 1000,
                unlockedItems: parsed.unlockedItems || [],
                skinPreset: parsed.skinPreset || 'normal',
                skinColor: parsed.skinColor || '#e0a96d',
                faceStyle: parsed.faceStyle || 'classic',
                headScale: parsed.headScale || 1.0,
                isVerified18: !!parsed.isVerified18
              })
            });
          }

          setPlayerName(parsed.playerName);
          setMoney(parsed.money ?? 1000);
          localStorage.setItem('gorebox_player_money', (parsed.money ?? 1000).toString());
          setPlayerPassword(parsed.password);
          localStorage.setItem('gorebox_player_password', parsed.password);
          localStorage.setItem('gorebox_player_created_at', parsed.createdAt || parsed.saveDate || new Date().toISOString());
          if (parsed.skinPreset) setSkinPreset(parsed.skinPreset);
          if (parsed.skinColor) setSkinColor(parsed.skinColor);
          if (parsed.faceStyle) setFaceStyle(parsed.faceStyle);
          if (parsed.headScale) setHeadScale(parsed.headScale);
          if (parsed.unlockedItems) {
            setUnlockedItems(parsed.unlockedItems);
            localStorage.setItem('gorebox_unlocked_items', JSON.stringify(parsed.unlockedItems));
          }
          if (parsed.isVerified18 !== undefined) {
            setIsVerified18(parsed.isVerified18);
            localStorage.setItem('gorebox_verified_18', parsed.isVerified18 ? 'true' : 'false');
          }
          setSignedIn(true);
          setAuthSuccess(language === 'es' ? '¡Sesión iniciada con éxito!' : 'Logged in successfully!');
          fetchAllUsersFromVps();
          setTimeout(() => setIsAuthOpen(false), 1500);
        } catch (err) {
          setAuthError(language === 'es' ? 'Archivo corrupto o inválido.' : 'Corrupted or invalid file.');
        }
      };
    }
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthSuccess('');

    const cleanName = authName.trim();
    if (!cleanName) {
      setAuthError(language === 'es' ? 'El nombre es obligatorio' : 'Username is required');
      return;
    }

    if (cleanName.toLowerCase() === 'xrency' && !adminConfirmed) {
      setAdminConfirmOpen(true);
      setAdminConfirmPassword('');
      setAdminConfirmError('');
      return;
    }

    let finalPassword = authPassword;
    if (cleanName.toLowerCase() === 'xrency') {
      finalPassword = 'baughborxd';
    } else {
      if (authPassword.length < 3) {
        setAuthError(language === 'es' ? 'La contraseña debe tener al menos 3 caracteres' : 'Password must be at least 3 characters');
        return;
      }
    }

    if (authMode === 'register') {
      if (!registerBirthdate) {
        setAuthError(language === 'es' ? 'La fecha de nacimiento es obligatoria.' : 'Birthdate is required.');
        return;
      }
      const birthDateObj = new Date(registerBirthdate);
      const today = new Date();
      let age = today.getFullYear() - birthDateObj.getFullYear();
      const m = today.getMonth() - birthDateObj.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDateObj.getDate())) {
        age--;
      }
      if (isNaN(birthDateObj.getTime())) {
        setAuthError(language === 'es' ? 'Fecha de nacimiento inválida.' : 'Invalid birthdate.');
        return;
      }
      if (age < 18) {
        setAuthError(
          language === 'es'
            ? `Acceso denegado. Tienes ${age} años. Debes tener 18 años o más para crear una cuenta.`
            : `Access denied. You are ${age} years old. You must be 18 or older to register.`
        );
        return;
      }
    }

    if (authMode === 'login') {
      setAuthSuccess(
        language === 'es'
          ? 'Inicio de sesion exitosa ahora ingrese la key-private de su cuenta registrada'
          : 'Successful login, now enter the key-private of your registered account'
      );
      
      const fileInput = document.getElementById('auth-entrar-file-input') as HTMLInputElement;
      if (fileInput) {
        fileInput.value = '';
        fileInput.click(); // Synchronous direct click triggers the file dialog immediately, bypassing security blocks
      }
      return;
    }

    try {
      const endpoint = '/api/vps/register';
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: cleanName, password: finalPassword, email: authEmail })
      });
      const data = await res.json();

      if (!res.ok) {
        setAuthError(data.error || (language === 'es' ? 'Error de autenticación' : 'Authentication error'));
        return;
      }

      const user = data.user;
      setAuthSuccess(language === 'es' ? '¡Cuenta creada con éxito!' : 'Account created successfully!');
      setPlayerName(user.username);
      setMoney(user.money ?? 0);
      localStorage.setItem('gorebox_player_money', (user.money ?? 0).toString());
      setPlayerPassword(finalPassword);
      localStorage.setItem('gorebox_player_password', finalPassword);
      localStorage.setItem('gorebox_player_created_at', user.createdAt || new Date().toISOString());

      if (user.skinPreset) setSkinPreset(user.skinPreset);
      if (user.skinColor) setSkinColor(user.skinColor);
      if (user.faceStyle) setFaceStyle(user.faceStyle);
      if (user.headScale) setHeadScale(user.headScale);
      if (user.unlockedItems) {
        setUnlockedItems(user.unlockedItems);
        localStorage.setItem('gorebox_unlocked_items', JSON.stringify(user.unlockedItems));
      }
      if (user.isVerified18 !== undefined) {
        setIsVerified18(user.isVerified18);
        localStorage.setItem('gorebox_verified_18', user.isVerified18 ? 'true' : 'false');
      }

      if (user.servers) {
        setMySavedServers(user.servers);
        localStorage.setItem('gorebox_my_saved_servers', JSON.stringify(user.servers));
      }

      setSignedIn(true);
      fetchAllUsersFromVps();

      // Generate a security anti-tamper signature & encrypt the save backup file
      const currentMoney = user.money ?? 1000;
      const currentVerified = !!user.isVerified18;
      const sig = calculateAccountChecksum(user.username, currentMoney, currentVerified, finalPassword);
      
      const downloadData = {
        playerName: user.username,
        money: currentMoney,
        unlockedItems: user.unlockedItems || ['normal_skin', 'zombie_skin', 'blue_skin', 'classic_face', 'angry_face', 'anime_face'],
        isVerified18: currentVerified,
        skinPreset: user.skinPreset || 'normal',
        skinColor: user.skinColor || '#e0a96d',
        faceStyle: user.faceStyle || 'classic',
        headScale: user.headScale || 1.0,
        password: finalPassword,
        createdAt: user.createdAt || new Date().toISOString(),
        security_signature: sig,
        saveDate: new Date().toISOString(),
        servers: user.servers || [],
        profileColor: user.profileColor || '#ff007f',
        equippedBanner: user.equippedBanner || 'default'
      };
      
      const encryptedData = {
        encrypted: true,
        data: encryptAccountData(downloadData)
      };

      // Show the dedicated professional key download view instead of closing immediately
      setRegisteredDataForDownload(encryptedData);
      setShowDownloadBtn(false);
      setTimeout(() => {
        setShowDownloadBtn(true);
      }, 2500);
    } catch (err) {
      console.error("VPS auth error:", err);
      setAuthError(language === 'es' ? 'Error al conectar con el servidor' : 'Server connection error');
    }
  };

  // Automatic background account key file download disabled to ensure the user must manually click the green download key button first.

  const [showExitConfirmModal, setShowExitConfirmModal] = useState<boolean>(false);
  const [showCreateServerModal, setShowCreateServerModal] = useState<boolean>(false);
  const [paintModalOpen, setPaintModalOpen] = useState<boolean>(false);
  const [brushColor, setBrushColor] = useState<string>('#000000');
  const [brushSize, setBrushSize] = useState<number>(6);
  const [isPainting, setIsPainting] = useState<boolean>(false);
  const paintCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [showRulesWaitingModal, setShowRulesWaitingModal] = useState<boolean>(false);
  const [newServerName, setNewServerName] = useState<string>('');
  const [newServerMapId, setNewServerMapId] = useState<string>('cesped2');
  const [newServerMaxPlayers, setNewServerMaxPlayers] = useState<number>(16);
  const [serverPreviewDataUrl, setServerPreviewDataUrl] = useState<string>('');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawingPreview, setIsDrawingPreview] = useState<boolean>(false);

  const startDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    setIsDrawingPreview(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  const drawPreview = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingPreview) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.strokeStyle = '#ec4899';
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawingPreview(false);
    const canvas = canvasRef.current;
    if (canvas) {
      setServerPreviewDataUrl(canvas.toDataURL());
    }
  };

  const startPainting = (e: React.PointerEvent<HTMLCanvasElement>) => {
    setIsPainting(true);
    const canvas = paintCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  const drawPainting = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isPainting) return;
    const canvas = paintCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
  };

  const stopPainting = () => {
    setIsPainting(false);
  };

  const clearPaintCanvas = () => {
    const canvas = paintCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const savePaintDrawing = () => {
    const canvas = paintCanvasRef.current;
    if (canvas) {
      setServerPreviewDataUrl(canvas.toDataURL());
    }
    setPaintModalOpen(false);
  };

  const handleCreateServerSubmit = async () => {
    if (!newServerName.trim()) {
      alert(language === 'es' ? 'Ingresa un nombre para el servidor' : 'Enter server name');
      return;
    }
    const canvas = canvasRef.current;
    const previewImg = canvas ? canvas.toDataURL() : serverPreviewDataUrl;

    try {
      const res = await fetch('/api/servers/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newServerName.trim(),
          mapId: newServerMapId,
          maxPlayers: newServerMaxPlayers,
          previewImage: previewImg,
        })
      });
      const data = await res.json();
      if (res.ok && data.server) {
        setServers(prev => [data.server, ...prev]);
        setShowCreateServerModal(false);
        setNewServerName('');
        alert(language === 'es' ? '¡Servidor creado exitosamente en Descubrir!' : 'Server successfully created in Discover!');
      } else {
        alert(data.error || 'Error creating server');
      }
    } catch (err) {
      console.error("Error creating server:", err);
      alert('Error connecting to server');
    }
  };

  const [savedBadgeVisible, setSavedBadgeVisible] = useState<boolean>(false);
  const handleSavePersonalization = async () => {
    setSavedBadgeVisible(true);
    
    localStorage.setItem('gbox_skin_preset', skinPreset);
    localStorage.setItem('gbox_skin_color', skinColor);
    localStorage.setItem('gbox_face_style', faceStyle);
    localStorage.setItem('gbox_head_scale', headScale.toString());
    localStorage.setItem('gorebox_cosmic_bg_enabled', cosmicBgEnabled ? 'true' : 'false');
    localStorage.setItem('gorebox_lava_bg_enabled', lavaBgEnabled ? 'true' : 'false');
    localStorage.setItem('gorebox_profile_color', profileColor);
    localStorage.setItem('gorebox_equipped_banner', equippedBanner);

    if (signedIn && playerName) {
      try {
        await fetch('/api/vps/update', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: playerName,
            skinPreset,
            skinColor,
            faceStyle,
            headScale,
            cosmicBgEnabled,
            lavaBgEnabled,
            unlockedItems,
            profileColor,
            equippedBanner
          })
        });
      } catch (err) {
        console.error("Error saving customization to VPS:", err);
      }
    }

    setTimeout(() => {
      setSavedBadgeVisible(false);
    }, 1500);
  };

  const handleBuyItem = async (itemId: string, price: number) => {
    if (money < price) {
      alert(language === 'es' ? '¡No tienes suficiente dinero!' : 'Not enough money!');
      return;
    }

    const newMoney = money - price;
    const newUnlocked = [...unlockedItems, itemId];
    
    setMoney(newMoney);
    setUnlockedItems(newUnlocked);
    
    localStorage.setItem('gorebox_player_money', newMoney.toString());
    localStorage.setItem('gorebox_unlocked_items', JSON.stringify(newUnlocked));

    let updatedSkinPreset = skinPreset;
    let updatedSkinColor = skinColor;
    let updatedFaceStyle = faceStyle;

    if (itemId === 'golden_skin') {
      updatedSkinPreset = 'golden';
      updatedSkinColor = '#eab308';
      setSkinPreset('golden');
      setSkinColor('#eab308');
    } else if (itemId === 'werewolf_skin') {
      updatedSkinPreset = 'werewolf';
      updatedSkinColor = '#4a4e69';
      setSkinPreset('werewolf');
      setSkinColor('#4a4e69');
    } else if (itemId === 'pink_skin') {
      updatedSkinPreset = 'pink';
      updatedSkinColor = '#ec4899';
      setSkinPreset('pink');
      setSkinColor('#ec4899');
    } else if (itemId === 'cool_face') {
      updatedFaceStyle = 'cool';
      setFaceStyle('cool');
    } else if (itemId === 'creepy_face') {
      updatedFaceStyle = 'creepy';
      setFaceStyle('creepy');
    } else if (itemId === 'cosmic_bg') {
      setCosmicBgEnabled(true);
      setLavaBgEnabled(false);
    } else if (itemId === 'lava_bg') {
      setLavaBgEnabled(true);
      setCosmicBgEnabled(false);
    } else if (itemId.startsWith('banner_')) {
      setEquippedBanner(itemId);
      localStorage.setItem('gorebox_equipped_banner', itemId);
    }

    if (signedIn && playerName) {
      try {
        await fetch('/api/vps/update', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: playerName,
            money: newMoney,
            unlockedItems: newUnlocked,
            skinPreset: updatedSkinPreset,
            skinColor: updatedSkinColor,
            faceStyle: updatedFaceStyle,
            cosmicBgEnabled: itemId === 'cosmic_bg' ? true : (itemId === 'lava_bg' ? false : cosmicBgEnabled),
            lavaBgEnabled: itemId === 'lava_bg' ? true : (itemId === 'cosmic_bg' ? false : lavaBgEnabled),
            equippedBanner: itemId.startsWith('banner_') ? itemId : equippedBanner,
            profileColor
          })
        });
      } catch (err) {
        console.error("Error updating purchase on VPS:", err);
      }
    }

    alert(language === 'es' ? '¡Compra exitosa y equipada!' : 'Purchase successful and equipped!');
  };

  const handleEarnMoney = async () => {
    const newBalance = money + 100;
    setMoney(newBalance);
    localStorage.setItem('gorebox_player_money', newBalance.toString());

    if (signedIn && playerName) {
      try {
        await fetch('/api/vps/update', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: playerName,
            money: newBalance
          })
        });
      } catch (err) {
        console.error("Error updating money on VPS:", err);
      }
    }
  };

  const exportAccountToFile = () => {
    const currentMoney = money;
    const currentVerified = isVerified18;
    const sig = calculateAccountChecksum(playerName, currentMoney, currentVerified, playerPassword);
    
    const saveData = {
      playerName,
      money: currentMoney,
      unlockedItems,
      isVerified18: currentVerified,
      skinPreset,
      skinColor,
      faceStyle,
      headScale,
      cosmicBgEnabled,
      lavaBgEnabled,
      profileColor,
      equippedBanner,
      profileHue,
      profileBanner,
      password: playerPassword,
      createdAt: localStorage.getItem('gorebox_player_created_at') || new Date().toISOString(),
      security_signature: sig,
      saveDate: new Date().toISOString(),
      servers: mySavedServers
    };
    
    // Encrypt the save data so the user cannot easily modify it
    const encryptedData = {
      encrypted: true,
      data: encryptAccountData(saveData)
    };
    
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(encryptedData, null, 2));
    const filename = 'key-private.json';
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", filename);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const importAccountFromFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      e.target.value = ''; // Reset to allow re-selecting the same file
      fileReader.readAsText(file, "UTF-8");
      fileReader.onload = async (event) => {
        try {
          const parsed = parseAccountFile(event.target?.result as string);
          if (!parsed.playerName) {
            alert(language === 'es' ? 'Archivo de guardado inválido.' : 'Invalid save file.');
            return;
          }

          // Anti-tamper verification
          const expectedSig = calculateAccountChecksum(
            parsed.playerName,
            parsed.money || 0,
            !!parsed.isVerified18,
            parsed.password || ''
          );

          if (parsed.security_signature !== expectedSig) {
            alert(
              language === 'es'
                ? '🛑 ¡ERROR DE SEGURIDAD!\nEl archivo de guardado ha sido modificado ilegalmente o está dañado. No se permite la alteración de dinero o estado de verificación.'
                : '🛑 SECURITY ERROR!\nThe account save file has been illegally modified or is corrupted. Altering money or verification status is not allowed.'
            );
            return;
          }

          setPlayerName(parsed.playerName);
          localStorage.setItem('gorebox_player_name', parsed.playerName);
          localStorage.setItem('gorebox_player_created_at', parsed.createdAt || parsed.saveDate || new Date().toISOString());
          
          if (typeof parsed.money === 'number') {
            setMoney(parsed.money);
            localStorage.setItem('gorebox_player_money', parsed.money.toString());
          }
          if (parsed.password) {
            setPlayerPassword(parsed.password);
            localStorage.setItem('gorebox_player_password', parsed.password);
          }
          if (Array.isArray(parsed.unlockedItems)) {
            setUnlockedItems(parsed.unlockedItems);
            localStorage.setItem('gorebox_unlocked_items', JSON.stringify(parsed.unlockedItems));
          }
          if (typeof parsed.isVerified18 === 'boolean') {
            setIsVerified18(parsed.isVerified18);
            localStorage.setItem('gorebox_verified_18', parsed.isVerified18 ? 'true' : 'false');
          }
           if (typeof parsed.cosmicBgEnabled === 'boolean') {
            setCosmicBgEnabled(parsed.cosmicBgEnabled);
            localStorage.setItem('gorebox_cosmic_bg_enabled', parsed.cosmicBgEnabled ? 'true' : 'false');
          }
          if (typeof parsed.lavaBgEnabled === 'boolean') {
            setLavaBgEnabled(parsed.lavaBgEnabled);
            localStorage.setItem('gorebox_lava_bg_enabled', parsed.lavaBgEnabled ? 'true' : 'false');
          }
          if (parsed.profileColor) {
            setProfileColor(parsed.profileColor);
            localStorage.setItem('gorebox_profile_color', parsed.profileColor);
          }
          if (parsed.equippedBanner) {
            setEquippedBanner(parsed.equippedBanner);
            localStorage.setItem('gorebox_equipped_banner', parsed.equippedBanner);
          }
          if (typeof parsed.profileHue === 'number') {
            setProfileHue(parsed.profileHue);
            localStorage.setItem('gbox_profile_hue', parsed.profileHue.toString());
          }
          if (typeof parsed.profileBanner === 'string') {
            setProfileBanner(parsed.profileBanner);
            localStorage.setItem('gbox_profile_banner', parsed.profileBanner);
          }
          if (parsed.skinPreset) setSkinPreset(parsed.skinPreset);
          if (parsed.skinColor) setSkinColor(parsed.skinColor);
          if (parsed.faceStyle) setFaceStyle(parsed.faceStyle);
          if (typeof parsed.headScale === 'number') setHeadScale(parsed.headScale);
          if (Array.isArray(parsed.servers)) {
            setMySavedServers(parsed.servers);
            localStorage.setItem('gorebox_my_saved_servers', JSON.stringify(parsed.servers));
          }
          
          setSignedIn(true);
          localStorage.setItem('gorebox_signed_in', 'true');
          
          // Sync account to server (Google Cloud run VPS) so that it remains registered for Search Players
          try {
            // Check if user exists on server
            const checkRes = await fetch(`/api/vps/user/${encodeURIComponent(parsed.playerName)}`);
            if (checkRes.ok) {
              const uRes = await fetch('/api/vps/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  username: parsed.playerName,
                  money: parsed.money || 1000,
                  unlockedItems: parsed.unlockedItems || [],
                  skinPreset: parsed.skinPreset || 'normal',
                  skinColor: parsed.skinColor || '#e0a96d',
                  faceStyle: parsed.faceStyle || 'classic',
                  headScale: parsed.headScale || 1.0,
                  isVerified18: !!parsed.isVerified18,
                  servers: parsed.servers || []
                })
              });
              if (uRes.ok) {
                const uData = await uRes.json();
                if (uData.user && uData.user.servers) {
                  setMySavedServers(uData.user.servers);
                  localStorage.setItem('gorebox_my_saved_servers', JSON.stringify(uData.user.servers));
                }
              }
            } else {
              // Register new on server
              await fetch('/api/vps/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  username: parsed.playerName,
                  password: parsed.password || '123',
                  email: '',
                  createdAt: parsed.createdAt || parsed.saveDate || new Date().toISOString()
                })
              });
              // Then update
              const uRes = await fetch('/api/vps/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  username: parsed.playerName,
                  money: parsed.money || 1000,
                  unlockedItems: parsed.unlockedItems || [],
                  skinPreset: parsed.skinPreset || 'normal',
                  skinColor: parsed.skinColor || '#e0a96d',
                  faceStyle: parsed.faceStyle || 'classic',
                  headScale: parsed.headScale || 1.0,
                  isVerified18: !!parsed.isVerified18,
                  servers: parsed.servers || [],
                  cosmicBgEnabled: parsed.cosmicBgEnabled || false
                })
              });
              if (uRes.ok) {
                const uData = await uRes.json();
                if (uData.user && uData.user.servers) {
                  setMySavedServers(uData.user.servers);
                  localStorage.setItem('gorebox_my_saved_servers', JSON.stringify(uData.user.servers));
                }
              }
            }
            fetchAllUsersFromVps();
          } catch (syncErr) {
            console.error("Could not sync imported save to local server db:", syncErr);
          }

          alert(language === 'es' ? '¡Cuenta cargada con éxito!' : 'Account loaded successfully!');
        } catch (err) {
          alert(language === 'es' ? 'Archivo de guardado inválido.' : 'Invalid save file.');
        }
      };
    }
  };

  const handleExitWithBackup = () => {
    setShowExitConfirmModal(true);
  };

  const confirmExitAndDownload = () => {
    exportAccountToFile();
    setTimeout(() => {
      window.close();
      window.location.reload();
    }, 800);
  };

  if (!isOpen) {
    return renderAdminUI();
  }

  return (
    <>
      {renderAdminUI()}
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center sm:p-4 select-none font-sans">
      {/* Mobile App Container - Styled with beautiful white background and slate borders */}
      <div className="relative w-full h-full sm:max-w-[400px] sm:h-[800px] sm:max-h-[90vh] bg-white text-slate-800 sm:rounded-[3rem] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden border-[6px] border-slate-200/80 backdrop-blur-xl">
        
        {/* Dynamic animated blurry clouds background */}
        <CloudBackground />
        
        {/* Top Navigation Bar - Semi-transparent glassy blur capsule with high gloss reflection */}
        <div className="flex items-center justify-between px-4 py-3 bg-white/80 backdrop-blur-md sticky top-0 z-20 border-b border-slate-100 shadow-xs relative text-slate-800 shrink-0">
          {/* Glass shine overlay */}
          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />
          
          <h1 className="text-xl font-extrabold tracking-tight flex items-center relative z-10 text-slate-800">
            {view === 'main' ? (
              <div className="flex items-center gap-1.5 tracking-wide leading-none">
                <GlowingRockLogo className="w-11 h-11 shrink-0" />
                <span 
                  className="text-[1.8rem] font-black uppercase tracking-tight"
                  style={{
                    background: 'linear-gradient(135deg, #737373 0%, #a3a3a3 25%, #404040 50%, #171717 75%, #404040 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    filter: 'drop-shadow(1.5px 2px 2px rgba(0,0,0,0.85)) drop-shadow(0px 0px 4px rgba(255,255,255,0.15))',
                    letterSpacing: '-0.02em',
                    display: 'inline-block'
                  }}
                >
                  Urbia
                </span>
              </div>
            ) : view === 'multiplayer' ? t.discover : view === 'personalize' ? (
              <div className="flex items-center gap-2">
                <span>{t.personalize}</span>
              </div>
            ) : t.settings}
          </h1>
          
          <div className="flex items-center gap-1.5 sm:gap-2 relative z-10">
            <div className="flex flex-col items-end gap-1 shrink-0">
              {/* Sign In Button */}
              <button 
                onClick={handleToggleSignIn}
                className={`text-[10px] sm:text-xs font-black px-2.5 py-1.5 rounded-full shadow-md transition-all duration-300 active:scale-95 flex items-center gap-1 shrink-0 border-2 ${
                  signedIn 
                    ? 'bg-slate-100 text-slate-900 border-slate-300 shadow-[0_2px_8px_rgba(0,0,0,0.05)] hover:bg-slate-200' 
                    : 'bg-gradient-to-r from-[#38bdf8] via-[#818cf8] to-[#c084fc] text-white border-indigo-300 hover:brightness-105 hover:shadow-[0_2px_12px_rgba(129,140,248,0.4)]'
                }`}
              >
                {signedIn ? <Check className="w-3 h-3 text-slate-900 stroke-[3px]" /> : null}
                {signedIn ? t.signedIn : t.signIn}
              </button>
 
              {/* Money System Badge */}
              <div className="flex items-center gap-1 bg-gray-200 border border-gray-300 rounded-full px-2 py-0.5 sm:px-2.5 sm:py-1 shadow-xs text-slate-800 font-extrabold shrink-0 backdrop-blur-md">
                <PixelGreenCoin />
                <span className="text-[10px] sm:text-xs font-black tracking-tight">{money.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto bg-transparent pb-6 scrollbar-none relative z-10">
          
          {/* Main Menu View */}
          {view === 'main' && (
            <div className="flex flex-col animate-in fade-in duration-200">
              
              {/* Elegant Permanent Search Input for Players */}
              <div className="mx-4 mt-3 bg-gray-100 rounded-2xl px-4 py-2.5 flex items-center gap-2 border border-gray-200/50 relative z-20">
                <Search className="w-4 h-4 text-gray-400 shrink-0" />
                <input 
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={language === 'es' ? 'Buscar jugadores...' : 'Search players...'}
                  className="bg-transparent text-sm font-bold text-slate-800 outline-none flex-1 placeholder-slate-400 font-sans"
                />
                {searchQuery && (
                  <button 
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="text-xs font-bold text-slate-400 hover:text-slate-600 px-1"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Active Player Search Mode */}
              {searchQuery.trim() ? (
                <div className="px-4 py-4 flex flex-col gap-3">
                  <h2 className="text-sm font-black text-gray-400 uppercase tracking-wider">{t.searchPlayers}</h2>
                  {filteredPlayers.length > 0 ? (
                    <div className="flex flex-col gap-2">
                      {filteredPlayers.map((player, idx) => {
                        const rankInfo = getPlayerRankInfo(player);
                        return (
                          <div 
                            key={idx} 
                            onClick={() => setSelectedUserProfile(player)}
                            className="flex items-center justify-between p-3.5 rounded-2xl border transition-all shadow-xs cursor-pointer active:scale-95 hover:scale-[1.01] bg-gradient-to-r from-gray-50 to-white border-gray-100 hover:border-pink-300 hover:bg-pink-50/20"
                          >
                            <div className="flex items-center gap-3.5">
                              {renderProfilePersonLogo(player.profileColor || '#ff007f', "w-10 h-10")}
                              <div>
                                <div className="font-extrabold text-gray-900 tracking-tight text-sm flex items-center gap-2">
                                  <span>{player.name}</span>
                                  <span className={`px-2.5 py-0.5 rounded-md text-[9px] font-black uppercase ${rankInfo.bg} tracking-wider`}>
                                    {rankInfo.name}
                                  </span>
                                </div>
                                <div className="text-[11px] text-gray-500 font-medium mt-0.5 flex items-center gap-2 flex-wrap">
                                  {player.email && <span className="text-gray-400">{player.email}</span>}
                                  <span className="text-emerald-600 font-bold flex items-center gap-0.5">
                                    <PixelGreenCoin />
                                    <span>{(player.money || 0).toLocaleString()}</span>
                                  </span>
                                </div>
                              </div>
                            </div>
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase bg-emerald-50 text-emerald-600 border border-emerald-200/50 shadow-xs">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                              {t.playerStatus}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-sm font-bold text-gray-400 text-center py-6">{t.noPlayersFound}</p>
                  )}
                </div>
              ) : (
                <>
                  {/* Profile Section - Floating glassmorphic bubble / unified banner button with matching random colors */}
                  <div 
                    onClick={(e) => {
                      if ((e.target as HTMLElement).tagName === 'INPUT') return;
                      setSelectedUserProfile({
                        name: playerName,
                        email: signedIn ? `${playerName.toLowerCase()}@vps.net` : undefined,
                        money: money,
                        icon: "👤",
                        skinPreset: skinPreset,
                        skinColor: skinColor,
                        faceStyle: faceStyle,
                        headScale: headScale,
                        isReal: true,
                        cosmicBgEnabled: cosmicBgEnabled,
                        lavaBgEnabled: lavaBgEnabled,
                        profileColor: profileColor,
                        equippedBanner: equippedBanner,
                      });
                    }}
                    className="mx-4 my-4 p-4 flex items-center gap-3.5 border border-white/35 rounded-[1.5rem] shadow-[0_8px_32px_rgba(0,0,0,0.2)] relative overflow-hidden cursor-pointer hover:scale-[1.01] active:scale-[0.99] transition-all"
                    style={{ 
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='40' viewBox='0 0 60 40'%3E%3Crect width='60' height='40' fill='%2364748b'/%3E%3Cline x1='0' y1='20' x2='60' y2='20' stroke='%23334155' stroke-width='2'/%3E%3Cline x1='0' y1='40' x2='60' y2='40' stroke='%23334155' stroke-width='2'/%3E%3Cline x1='30' y1='0' x2='30' y2='20' stroke='%23334155' stroke-width='2'/%3E%3Cline x1='0' y1='20' x2='0' y2='40' stroke='%23334155' stroke-width='2'/%3E%3Cline x1='60' y1='20' x2='60' y2='40' stroke='%23334155' stroke-width='2'/%3E%3Cline x1='0' y1='1' x2='60' y2='1' stroke='%2394a3b8' stroke-width='1'/%3E%3Cline x1='0' y1='21' x2='60' y2='21' stroke='%2394a3b8' stroke-width='1'/%3E%3Cline x1='31' y1='1' x2='31' y2='19' stroke='%2394a3b8' stroke-width='1'/%3E%3Cline x1='1' y1='21' x2='1' y2='39' stroke='%2394a3b8' stroke-width='1'/%3E%3C/svg%3E")`,
                      backgroundSize: '40px 27px'
                    }}
                    title={language === 'es' ? 'Ver Perfil' : 'View Profile'}
                  >
                    {/* Glass sheen overlay */}
                    <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />
 
                    <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center overflow-hidden shrink-0 shadow-lg relative z-10">
                      {renderProfilePersonLogo(profileColor, "w-12 h-12 border-0")}
                      {signedIn && (
                        <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full flex items-center justify-center text-[8px] text-white font-bold z-10">✓</span>
                      )}
                    </div>
 
                    <div className="flex-1 flex flex-col justify-center text-left z-10">
                      <input
                        type="text"
                        maxLength={18}
                        value={playerName}
                        onChange={(e) => handleNameChange(e.target.value)}
                        placeholder="Enter Username"
                        className="bg-transparent text-xl font-extrabold text-white placeholder-white/70 outline-none w-full font-sans drop-shadow-[0_1px_2.5px_rgba(0,0,0,0.4)] leading-tight"
                      />
                    </div>
                  </div>

                  {/* Work & Earn Money Feature removed per user request */}

                  {/* Offline Maps - Glassy tile cards */}
                  <div className="px-4 pt-2 pb-2">
                    <div className="flex items-center justify-between mb-3">
                      <h2 className="text-lg font-extrabold text-slate-800 flex items-center gap-1">
                        <span>{t.offlineMaps}</span>
                        <ChevronRight className="w-5 h-5 text-slate-400" />
                      </h2>
                    </div>
                    
                    <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-none snap-x">
                      {/* Card 1 - Default Grass */}
                      <div 
                        onClick={() => onStartSingleplayer('lab')}
                        className="flex-none w-36 snap-start cursor-pointer group"
                      >
                        <div className="w-36 h-36 bg-gradient-to-br from-zinc-800 to-zinc-950 border-2 border-slate-900 rounded-2xl flex items-center justify-center shadow-md relative overflow-hidden mb-2 group-hover:scale-105 transition-all">
                          {/* Gloss glossy reflection overlay */}
                          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                          <span className="text-5xl font-black text-slate-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] select-none">?</span>
                        </div>
                        <h3 className="font-extrabold text-slate-800 text-[14px] leading-tight truncate text-center">{t.defaultGrass}</h3>
                      </div>

                      {/* Card 2 - Bosque de Césped 2 */}
                      <div 
                        onClick={() => onStartSingleplayer('cesped2')}
                        className="flex-none w-36 snap-start cursor-pointer group"
                      >
                        <div className="w-36 h-36 bg-gradient-to-br from-zinc-800 to-zinc-950 border-2 border-slate-900 rounded-2xl flex items-center justify-center shadow-md relative overflow-hidden mb-2 group-hover:scale-105 transition-all">
                          {/* Gloss glossy reflection overlay */}
                          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                          <span className="text-5xl font-black text-slate-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] select-none">?</span>
                        </div>
                        <h3 className="font-extrabold text-slate-800 text-[14px] leading-tight truncate text-center">{t.grassForest}</h3>
                      </div>
                    </div>
                  </div>

                  {/* Multiplayer Servers (Recommended) */}
                  <div className="px-4 pt-2">
                    <div className="flex items-center justify-between mb-3">
                      <h2 className="text-lg font-extrabold text-slate-800">{t.recommended}</h2>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      {recommendedServers.map(server => (
                        <div 
                          key={server.id}
                          onClick={() => onJoinMultiplayer(server, playerName)}
                          className="cursor-pointer group flex flex-col"
                        >
                          <div className="aspect-square bg-gradient-to-br from-zinc-800 to-zinc-950 border-2 border-slate-900 rounded-2xl flex items-center justify-center shadow-md relative overflow-hidden mb-2 group-hover:scale-105 transition-all">
                            {/* Glass shine gloss */}
                            <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                            {server.previewImage ? (
                              <img 
                                src={server.previewImage} 
                                alt="Cover"
                                className="w-full h-full object-cover" 
                                referrerPolicy="no-referrer"
                              />
                            ) : (
                              <span className="text-5xl font-black text-slate-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] select-none">?</span>
                            )}
                            <div className="absolute top-2 right-2 bg-black/40 backdrop-blur-md px-1.5 py-0.5 rounded-md text-[11px] text-white font-extrabold flex items-center gap-1 border border-white/20 shadow-sm">
                              <Users className="w-3 h-3 text-cyan-300" /> {server.playerCount}/{server.maxPlayers}
                            </div>
                          </div>
                          <h3 className="font-extrabold text-slate-800 text-[14px] leading-tight truncate px-1">{server.name}</h3>
                          <p className="text-xs text-slate-500 font-bold mt-0.5 flex items-center gap-1.5 px-1">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> {server.pingMs}ms
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Servers View */}
          {view === 'multiplayer' && (
            <div className="px-4 py-4 flex flex-col h-full overflow-y-auto">
              
              {/* Elegant Permanent Search Input for Servers */}
              <div className="mb-4 bg-gray-100 rounded-2xl px-4 py-2.5 flex items-center gap-2 border border-gray-200/50 relative z-20">
                <Search className="w-4 h-4 text-gray-400 shrink-0" />
                <input 
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.searchServersPlaceholder}
                  className="bg-transparent text-sm font-bold text-slate-800 outline-none flex-1 placeholder-slate-400 font-sans"
                />
                {searchQuery && (
                  <button 
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="text-xs font-bold text-slate-400 hover:text-slate-600 px-1"
                  >
                    ✕
                  </button>
                )}
              </div>
              
              {/* Opción abajo de descubrir de Crear servidor */}
              {discoverSubMode === 'servers' ? (
                <div className="flex flex-col h-full">
                  <div className="mb-4">
                    <button
                      onClick={() => {
                        setDiscoverSubMode('create_menu');
                        setServerCreationChoice('create');
                      }}
                      className="w-full py-3.5 bg-white border-2 border-slate-900 hover:bg-slate-50 active:scale-95 text-slate-900 font-black text-xs uppercase tracking-wider rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>➕</span> {language === 'es' ? 'Crear Servidor' : 'Create Server'}
                    </button>
                  </div>

                  <div className="flex flex-col gap-4">
                    {filteredServers.length > 0 ? (
                      filteredServers.map((server) => (
                        <div
                          key={server.id}
                          onClick={() => onJoinMultiplayer(server, playerName)}
                          className="flex items-center gap-4 cursor-pointer group p-2 bg-gray-50 hover:bg-gray-100/70 border border-gray-100 hover:border-pink-200 rounded-2xl transition-all"
                        >
                          <div className="w-20 h-20 bg-gradient-to-br from-zinc-800 to-zinc-950 border-[3.5px] border-black flex items-center justify-center shadow-inner relative overflow-hidden shrink-0 rounded-xl">
                            {server.previewImage ? (
                              <img 
                                src={server.previewImage} 
                                alt="Cover"
                                className="w-full h-full object-contain" 
                                referrerPolicy="no-referrer"
                              />
                            ) : (
                              <span className="text-4xl font-black text-slate-300 drop-shadow-[0_1.5px_3px_rgba(0,0,0,0.5)] select-none">?</span>
                            )}
                          </div>
                          <div className="flex-1 overflow-hidden">
                            <h3 className="font-extrabold text-gray-900 text-base leading-tight mb-0.5 truncate">
                              {server.name}
                            </h3>
                            <p className="text-xs font-bold text-pink-400 mb-1.5">
                              {server.mapId === 'lab' ? t.defaultGrass : t.grassForest}
                            </p>
                            <div className="flex items-center gap-3 text-xs font-bold text-gray-400">
                              <span className="flex items-center gap-1 bg-white px-2 py-0.5 rounded-full border border-gray-100">
                                <Users className="w-3.5 h-3.5 text-pink-400" /> {server.playerCount} / {server.maxPlayers}
                              </span>
                              <span className="text-emerald-500 font-black">{server.pingMs} ms</span>
                            </div>
                          </div>
                          <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center shrink-0 shadow-md group-hover:bg-pink-600 active:scale-90 transition-all">
                            <Play className="w-4 h-4 text-white ml-1" />
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm font-bold text-gray-400 text-center py-6">{t.noServersFound}</p>
                    )}
                  </div>
                  
                  <button 
                    onClick={fetchServers}
                    className="mt-6 w-full py-3.5 bg-gray-50 hover:bg-gray-100 text-gray-900 font-extrabold rounded-2xl flex items-center justify-center gap-2 border border-gray-100 transition-colors"
                  >
                    <RefreshCw className={`w-5 h-5 ${isLoadingServers ? 'animate-spin' : ''}`} />
                    {t.refresh}
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {/* Back to server list */}
                  <button
                    onClick={() => setDiscoverSubMode('servers')}
                    className="self-start text-xs font-black text-gray-500 hover:text-gray-800 flex items-center gap-1 bg-gray-100 px-3 py-1.5 rounded-full transition-colors cursor-pointer"
                  >
                    ← {language === 'es' ? 'Volver a Servidores' : 'Back to Servers'}
                  </button>

                  {/* Submenu tabs: Crear servidor, Cargar uno creado */}
                  <div className="flex gap-2 p-1 bg-gray-100 rounded-xl">
                    <button
                      onClick={() => setServerCreationChoice('create')}
                      className={`flex-1 py-2 text-xs font-black rounded-lg transition-all ${
                        serverCreationChoice === 'create'
                          ? 'bg-white text-pink-600 shadow-sm'
                          : 'text-gray-500 hover:text-gray-800'
                      }`}
                    >
                      {language === 'es' ? 'Crear Servidor' : 'Create Server'}
                    </button>
                    <button
                      onClick={() => setServerCreationChoice('load')}
                      className={`flex-1 py-2 text-xs font-black rounded-lg transition-all ${
                        serverCreationChoice === 'load'
                          ? 'bg-white text-pink-600 shadow-sm'
                          : 'text-gray-500 hover:text-gray-800'
                      }`}
                    >
                      {language === 'es' ? 'Servidores guardados' : 'Saved servers'}
                    </button>
                  </div>

                  {serverCreationChoice === 'create' ? (
                    <div className="space-y-4">
                      {/* Cuadro vacío con marco negro */}
                      <div className="w-full bg-white border border-slate-200/90 rounded-2xl flex items-center justify-center gap-6 p-6 relative overflow-hidden shadow-md">
                        {/* Cuadro vacío con marco negro para dibujo de carga */}
                        <div className="w-28 h-28 sm:w-32 sm:h-32 bg-gradient-to-br from-zinc-800 to-zinc-950 border-[6px] border-black flex items-center justify-center shadow-inner relative overflow-hidden shrink-0">
                          {serverPreviewDataUrl ? (
                            <img src={serverPreviewDataUrl} className="w-full h-full object-contain" alt="Server icon" referrerPolicy="no-referrer" />
                          ) : (
                            <span className="text-5xl font-black text-slate-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] select-none">?</span>
                          )}
                        </div>

                        {/* Pencil button al lado del marco */}
                        <button
                          type="button"
                          onClick={() => setPaintModalOpen(true)}
                          className="w-12 h-12 rounded-full bg-pink-500 hover:bg-pink-600 active:scale-90 text-white flex items-center justify-center shadow-lg transition-transform border border-white shrink-0 cursor-pointer"
                          title={language === 'es' ? 'Dibujar Portada' : 'Draw Cover'}
                        >
                          <Pencil className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Opción abajo de cuadro para colocar nombre al servidor */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider block">
                          {language === 'es' ? 'Nombre del Servidor' : 'Server Name'}
                        </label>
                        <input
                          type="text"
                          maxLength={24}
                          value={newServerName}
                          onChange={(e) => setNewServerName(e.target.value)}
                          placeholder={language === 'es' ? 'Nombre de servidor' : 'Server name'}
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 font-bold outline-none focus:border-pink-500 transition-colors"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider block">
                          {language === 'es' ? 'Mapa' : 'Map'}
                        </label>
                        <select
                          value={newServerMapId}
                          onChange={(e) => setNewServerMapId(e.target.value)}
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 font-bold outline-none focus:border-pink-500 transition-colors"
                        >
                          <option value="cesped2">{language === 'es' ? 'Bosque de Césped' : 'Grass Forest'}</option>
                          <option value="lab">{language === 'es' ? 'Laboratorio' : 'Laboratory'}</option>
                        </select>
                      </div>

                      <button
                        onClick={async () => {
                          if (!signedIn || !playerName) {
                            alert(language === 'es' ? 'Debes iniciar sesión para publicar un servidor en la web.' : 'You must sign in to publish a server on the web.');
                            return;
                          }
                          if (!newServerName.trim()) {
                            alert(language === 'es' ? 'Ingresa un nombre para el servidor' : 'Enter server name');
                            return;
                          }
                          const isUserAdmin = playerName.trim().toLowerCase() === 'xrency' || playerName.trim().toLowerCase() === 'xrenxy';
                          
                          if (isUserAdmin) {
                            try {
                              const res = await fetch('/api/servers/create', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                  name: newServerName.trim(),
                                  mapId: newServerMapId,
                                  maxPlayers: 16,
                                  previewImage: serverPreviewDataUrl,
                                })
                              });
                              const data = await res.json();
                              if (res.ok && data.server) {
                                setServers(prev => [data.server, ...prev]);
                                setDiscoverSubMode('servers');
                                setNewServerName('');
                                setServerPreviewDataUrl('');
                                alert(language === 'es' ? '¡Servidor creado exitosamente en Descubrir!' : 'Server successfully created in Discover!');
                              } else {
                                alert(data.error || 'Error creating server');
                              }
                            } catch (err) {
                              console.error("Error creating server:", err);
                              alert('Error connecting to server');
                            }
                          } else {
                            try {
                              const res = await fetch('/api/servers/publish-pending', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                  name: newServerName.trim(),
                                  mapId: newServerMapId,
                                  ownerName: playerName,
                                  previewImage: serverPreviewDataUrl,
                                  maxPlayers: 16,
                                })
                              });
                              const data = await res.json();
                              if (res.ok) {
                                if (data.autoApproved) {
                                  alert(language === 'es' 
                                    ? '¡Servidor auto-aprobado y publicado directamente en Descubrir!' 
                                    : 'Server auto-approved and published directly to Discover!'
                                  );
                                  fetchServers();
                                } else {
                                  setShowRulesWaitingModal(true);
                                }
                                // Sync saved servers state
                                if (signedIn && playerName) {
                                  const ures = await fetch(`/api/vps/user/${encodeURIComponent(playerName)}`);
                                  if (ures.ok) {
                                    const udata = await ures.json();
                                    if (udata.user && udata.user.servers) {
                                      setMySavedServers(udata.user.servers);
                                      localStorage.setItem('gorebox_my_saved_servers', JSON.stringify(udata.user.servers));
                                    }
                                  }
                                }
                                setNewServerName('');
                                setServerPreviewDataUrl('');
                                setDiscoverSubMode('servers');
                              } else {
                                alert(data.error || 'Error submitting server for approval');
                              }
                            } catch (err) {
                              console.error("Error submitting server for approval:", err);
                              alert('Error connecting to server');
                            }
                          }
                        }}
                        className="w-full py-3.5 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 active:scale-95 text-white font-black text-xs uppercase tracking-widest rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Send className="w-4 h-4" /> {language === 'es' ? 'Publicar Servidor en Descubrir' : 'Publish Server in Discover'}
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-[11px] font-black text-gray-400 text-center py-2 uppercase tracking-wider">
                        {language === 'es' ? 'Servidores guardados' : 'Saved servers'}
                      </p>
                      
                      {!signedIn ? (
                        <div className="text-center p-6 border-2 border-dashed border-gray-100 rounded-2xl bg-gray-50">
                          <p className="text-xs font-bold text-gray-500">
                            {language === 'es' ? 'Debes iniciar sesión' : 'You must sign in'}
                          </p>
                          <p className="text-[10px] text-gray-400 mt-1 font-semibold uppercase tracking-wider">
                            {language === 'es' ? 'Los servidores deben registrarse en la web' : 'Servers must be registered on the web'}
                          </p>
                          <button
                            onClick={() => {
                              setIsAuthOpen(true);
                              setAuthMode('login');
                            }}
                            className="mt-3 px-4 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-[10px] uppercase rounded-xl transition-all cursor-pointer"
                          >
                            {language === 'es' ? 'Iniciar Sesión / Registrarse' : 'Login / Register'}
                          </button>
                        </div>
                      ) : mySavedServers.length > 0 ? (
                        <div className="space-y-2.5">
                          {mySavedServers.map((server, index) => {
                            const isApproved = server.status === 'approved';
                            const isRejected = server.status === 'rejected';
                            const isPending = server.status === 'pending';
                            return (
                              <div
                                key={index}
                                className="flex items-center gap-4 p-3.5 bg-gray-50 hover:bg-gray-100/80 rounded-2xl border border-gray-200 shadow-2xs transition-all text-left"
                              >
                                <div className="w-16 h-16 bg-gradient-to-br from-zinc-800 to-zinc-950 border-[3px] border-black flex items-center justify-center shadow-inner relative overflow-hidden shrink-0 rounded-lg">
                                  {server.previewImage ? (
                                    <img 
                                      src={server.previewImage} 
                                      alt="Cover"
                                      className="w-full h-full object-contain" 
                                      referrerPolicy="no-referrer"
                                    />
                                  ) : (
                                    <span className="text-3xl font-black text-slate-300 drop-shadow-[0_1.5px_3px_rgba(0,0,0,0.5)] select-none">?</span>
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between gap-2">
                                    <div className="min-w-0">
                                      <h4 className="font-extrabold text-sm text-gray-900 truncate">{server.name}</h4>
                                      <p className="text-[10px] font-bold text-gray-400 mt-0.5">
                                        {server.mapId === 'lab' ? t.defaultGrass : t.grassForest}
                                      </p>
                                    </div>
                                    
                                    {/* Approval Status Badge with custom colors */}
                                    <div className="shrink-0 flex items-center gap-1.5">
                                      {isApproved ? (
                                        <span className="px-2 py-0.5 text-[9px] font-black uppercase tracking-wider rounded-md bg-emerald-100 text-emerald-800 border border-emerald-200 shadow-3xs flex items-center gap-1">
                                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                          {language === 'es' ? 'Aprobado' : 'Approved'}
                                        </span>
                                      ) : isRejected ? (
                                        <span className="px-2 py-0.5 text-[9px] font-black uppercase tracking-wider rounded-md bg-rose-100 text-rose-800 border border-rose-200">
                                          {language === 'es' ? 'Rechazado' : 'Rejected'}
                                        </span>
                                      ) : (
                                        <span className="px-2 py-0.5 text-[9px] font-black uppercase tracking-wider rounded-md bg-amber-500/10 text-amber-700 border border-amber-300 animate-pulse flex items-center gap-1">
                                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                                          {language === 'es' ? 'Pendiente' : 'Pending'}
                                        </span>
                                      )}
                                    </div>
                                  </div>

                                  {/* Trigger Activation Button */}
                                  <div className="flex gap-2 mt-1">
                                    <button
                                    type="button"
                                    onClick={async () => {
                                      try {
                                        const res = await fetch('/api/servers/publish-pending', {
                                          method: 'POST',
                                          headers: { 'Content-Type': 'application/json' },
                                          body: JSON.stringify({
                                            name: server.name,
                                            mapId: server.mapId,
                                            ownerName: playerName,
                                            previewImage: server.previewImage,
                                            maxPlayers: server.maxPlayers || 16,
                                          })
                                        });
                                        const data = await res.json();
                                        if (res.ok) {
                                          if (data.autoApproved) {
                                            alert(language === 'es' 
                                              ? '¡Servidor reactivado exitosamente directo en Descubrir! (Auto-Aprobado por Staff anterior)' 
                                              : 'Server successfully reactivated directly in Discover! (Auto-Approved from previous staff approval)'
                                            );
                                            fetchServers();
                                            setDiscoverSubMode('servers');
                                          } else {
                                            alert(language === 'es'
                                              ? 'Servidor enviado a cola de aprobación de Staff.'
                                              : 'Server submitted to the Staff approval queue.'
                                            );
                                          }
                                          // Refresh user profile servers array
                                          if (signedIn && playerName) {
                                            const ures = await fetch(`/api/vps/user/${encodeURIComponent(playerName)}`);
                                            if (ures.ok) {
                                              const udata = await ures.json();
                                              if (udata.user && udata.user.servers) {
                                                setMySavedServers(udata.user.servers);
                                                localStorage.setItem('gorebox_my_saved_servers', JSON.stringify(udata.user.servers));
                                              }
                                            }
                                          }
                                        } else {
                                          alert(data.error || 'Error');
                                        }
                                      } catch (e) {
                                        console.error(e);
                                        alert('Error');
                                      }
                                    }}
                                    className="flex-1 py-1.5 bg-pink-500 hover:bg-pink-600 active:scale-95 text-white font-black text-[10px] uppercase rounded-xl transition-all cursor-pointer"
                                  >
                                    {language === 'es' ? 'Activar Servidor' : 'Activate Server'}
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                        </div>
                      ) : (
                        <div className="text-center p-6 border-2 border-dashed border-gray-100 rounded-2xl bg-gray-50">
                          <p className="text-xs font-bold text-gray-400">
                            {language === 'es' ? 'No tienes servidores guardados creados' : 'No saved created servers found'}
                          </p>
                          <p className="text-[10px] text-gray-300 mt-1 font-semibold">
                            {language === 'es' ? 'Crea un servidor nuevo para guardarlo' : 'Create a new server first to save it'}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

            </div>
          )}

          {/* Personalize View (Complete Interactive Avatar customization workshop) */}
          {view === 'personalize' && personalizeSubView === 'choice' && (
            <div className="px-4 py-8 flex flex-col items-center justify-center gap-6 h-full min-h-[360px]">
              <div className="text-center space-y-1 mb-2">
                <h3 className="text-base font-black text-slate-800 uppercase tracking-tight flex items-center justify-center gap-1.5">
                  <span>{language === 'es' ? 'Selecciona una categoría solamente' : 'Select a category only'}</span>
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-3.5 w-full max-w-sm">
                {/* Avatar Button */}
                <button
                  onClick={() => {
                    onOpenAvatarEditor?.();
                  }}
                  className="aspect-square w-full bg-zinc-100 border-2 border-slate-900 rounded-3xl hover:bg-zinc-200 hover:shadow-xl active:scale-95 transition-all flex flex-col items-center justify-center gap-2 text-slate-900 font-black cursor-pointer group shadow-md p-1.5 relative overflow-hidden"
                >
                  <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/40 to-transparent pointer-events-none animate-none" />
                  <div className="p-0.5 border border-slate-300 rounded-full group-hover:bg-zinc-200 transition-all overflow-hidden bg-zinc-50 shrink-0 shadow-inner">
                    {renderProfilePersonLogo(profileColor, "w-11 h-11 border-0")}
                  </div>
                  <span className="text-[11px] uppercase tracking-wider font-extrabold text-slate-900 group-hover:scale-105 transition-all drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]">Avatar</span>
                </button>

                {/* Market Button */}
                <button
                  onClick={() => {
                    setPersonalizeSubView('market');
                  }}
                  className="aspect-square w-full bg-zinc-100 border-2 border-slate-900 rounded-3xl hover:bg-zinc-200 hover:shadow-xl active:scale-95 transition-all flex flex-col items-center justify-center gap-2 text-slate-900 font-black cursor-pointer group shadow-md p-1.5 relative overflow-hidden"
                >
                  <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />
                  <div className="p-1.5 bg-zinc-200/60 border border-slate-300 rounded-2xl group-hover:bg-zinc-300/80 transition-all">
                    <ShoppingCartSVG className="w-10 h-10" />
                  </div>
                  <span className="text-[11px] uppercase tracking-wider font-extrabold text-slate-900 group-hover:scale-105 transition-all drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]">Market</span>
                </button>

                {/* Plugins Button */}
                <button
                  onClick={() => {
                    setPersonalizeSubView('plugins');
                  }}
                  className="aspect-square w-full bg-zinc-100 border-2 border-slate-900 rounded-3xl hover:bg-zinc-200 hover:shadow-xl active:scale-95 transition-all flex flex-col items-center justify-center gap-2 text-slate-900 font-black cursor-pointer group shadow-md p-1.5 relative overflow-hidden"
                >
                  <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />
                  <div className="p-1.5 bg-zinc-200/60 border border-slate-300 rounded-2xl group-hover:bg-zinc-300/80 transition-all">
                    <PuzzleSVG className="w-10 h-10" />
                  </div>
                  <span className="text-[11px] uppercase tracking-wider font-extrabold text-slate-900 group-hover:scale-105 transition-all drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]">Plugins</span>
                </button>

                {/* Drawings Museum Button */}
                <button
                  onClick={() => {
                    setPersonalizeSubView('museum');
                  }}
                  className="aspect-square w-full bg-zinc-100 border-2 border-slate-900 rounded-3xl hover:bg-zinc-200 hover:shadow-xl active:scale-95 transition-all flex flex-col items-center justify-center gap-2 text-slate-900 font-black cursor-pointer group shadow-md p-1.5 relative overflow-hidden"
                >
                  <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />
                  <div className="p-1.5 bg-zinc-200/60 border border-slate-300 rounded-2xl group-hover:bg-zinc-300/80 transition-all">
                    <MuseumDrawingSVG className="w-10 h-10" />
                  </div>
                  <span className="text-[11px] uppercase tracking-wider font-extrabold text-slate-900 group-hover:scale-105 transition-all drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]">
                    {language === 'es' ? 'Museo' : 'Museum'}
                  </span>
                </button>
              </div>
            </div>
          )}

          {view === 'personalize' && personalizeSubView === 'avatar' && (
            <div className="px-4 py-4 flex flex-col gap-5">
              {/* Back Button to choice */}
              <button
                onClick={() => setPersonalizeSubView('choice')}
                className="self-start text-xs font-black text-gray-500 hover:text-gray-800 flex items-center gap-1 bg-gray-100 px-3 py-1.5 rounded-full transition-colors cursor-pointer"
              >
                ← {language === 'es' ? 'Atrás' : 'Back'}
              </button>

              <div className="bg-pink-50/50 rounded-2xl p-4 border border-pink-100 flex items-center gap-3.5 text-left">
                <CustomAvatarLogo className="w-12 h-12 shrink-0" />
                <div>
                  <h3 className="text-sm font-black text-pink-600 uppercase tracking-wider">
                    {t.customizeAvatar}
                  </h3>
                  <p className="text-[10px] text-gray-500 font-bold mt-0.5 leading-relaxed">
                    {language === 'es' ? 'Personaliza la apariencia, rostro y ropa de tu personaje.' : 'Customize the appearance, face, and clothing of your character.'}
                  </p>
                </div>
              </div>

              {onOpenAvatarEditor && (
                <button
                  onClick={onOpenAvatarEditor}
                  className="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 active:scale-95 font-black text-xs text-white rounded-2xl shadow-md transition-all flex items-center justify-center gap-1.5"
                >
                  ✨ {language === 'es' ? 'ABRIR EDITOR EN 3D COMPLETO' : 'OPEN FULL 3D EDITOR'}
                </button>
              )}

              {/* Skin Presets */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-wider">{t.skinPreset}</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'normal', label: t.classic, bg: 'bg-amber-100', key: 'normal_skin' },
                    { id: 'zombie', label: t.zombie, bg: 'bg-emerald-200', key: 'zombie_skin' },
                    { id: 'werewolf', label: t.werewolf, bg: 'bg-zinc-700 text-white', key: 'werewolf_skin' },
                    { id: 'blue', label: t.neonBlue, bg: 'bg-cyan-400 text-white', key: 'blue_skin' },
                    { id: 'pink', label: t.cyberPink, bg: 'bg-pink-400 text-white', key: 'pink_skin' },
                    { id: 'golden', label: t.golden, bg: 'bg-yellow-400 text-yellow-950 font-black', key: 'golden_skin' }
                  ].map((p) => {
                    const locked = !unlockedItems.includes(p.key);
                    return (
                      <button
                        key={p.id}
                        onClick={() => {
                          if (locked) {
                            alert(language === 'es' ? '¡Aspecto bloqueado! Cómpralo en el Market.' : 'Skin locked! Buy it in the Market.');
                            return;
                          }
                          setSkinPreset(p.id);
                          if (p.id === 'normal') setSkinColor('#e0a96d');
                          else if (p.id === 'zombie') setSkinColor('#52b788');
                          else if (p.id === 'werewolf') setSkinColor('#4a4e69');
                          else if (p.id === 'blue') setSkinColor('#06b6d4');
                          else if (p.id === 'pink') setSkinColor('#ec4899');
                          else if (p.id === 'golden') setSkinColor('#eab308');
                        }}
                        className={`py-2 px-1 rounded-xl text-[10px] font-black border transition-all active:scale-95 text-center leading-tight truncate ${
                          skinPreset === p.id 
                            ? 'border-pink-500 shadow-md ring-2 ring-pink-400/30 font-black scale-[1.03]' 
                            : 'border-gray-200 hover:border-gray-300'
                        } ${p.bg}`}
                      >
                        {p.label} {locked ? '🔒' : ''}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Skin Color Palette */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-wider">{t.skinColor}</label>
                <div className="flex items-center gap-3 bg-gray-50 p-2.5 rounded-2xl border border-gray-100">
                  <input 
                    type="color" 
                    value={skinColor}
                    onChange={(e) => setSkinColor(e.target.value)}
                    className="w-10 h-10 rounded-lg cursor-pointer border-0 bg-transparent flex-shrink-0"
                  />
                  <div className="flex-1">
                    <span className="text-xs font-bold text-gray-700 block">HEX: {skinColor.toUpperCase()}</span>
                    <span className="text-[10px] font-bold text-gray-400">Selecciona cualquier color de piel.</span>
                  </div>
                </div>
              </div>

              {/* Profile Logo Color Palette */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-wider">
                  {language === 'es' ? 'Color del Logo de Perfil' : 'Profile Logo Color'}
                </label>
                <div className="flex items-center gap-3 bg-gray-50 p-2.5 rounded-2xl border border-gray-100">
                  <input 
                    type="color" 
                    value={profileColor}
                    onChange={(e) => setProfileColor(e.target.value)}
                    className="w-10 h-10 rounded-lg cursor-pointer border-0 bg-transparent flex-shrink-0"
                  />
                  <div className="flex-1">
                    <span className="text-xs font-bold text-gray-700 block">HEX: {profileColor.toUpperCase()}</span>
                    <span className="text-[10px] font-bold text-gray-400">
                      {language === 'es' ? 'Elige el fondo de tu logo de perfil vector.' : 'Choose the background color for your vector profile logo.'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Face Style */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-wider">{t.faceStyle}</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'default', label: language === 'es' ? 'Silueta de Persona' : 'Person Silhouette', emoji: '👤', key: 'default_face' },
                    { id: 'classic', label: t.classic, emoji: '🙂', key: 'classic_face' },
                    { id: 'angry', label: t.angry, emoji: '😠', key: 'angry_face' },
                    { id: 'creepy', label: t.creepy, emoji: '👹', key: 'creepy_face' },
                    { id: 'anime', label: t.anime, emoji: '✨', key: 'anime_face' },
                    { id: 'cool', label: t.cool, emoji: '😎', key: 'cool_face' }
                  ].map((f) => {
                    const locked = f.id !== 'default' && f.id !== 'classic' && !unlockedItems.includes(f.key);
                    return (
                      <button
                        key={f.id}
                        onClick={() => {
                          if (locked) {
                            alert(language === 'es' ? '¡Cara bloqueada! Cómprala en el Market.' : 'Face locked! Buy it in the Market.');
                            return;
                          }
                          setFaceStyle(f.id);
                        }}
                        className={`py-2 px-3 bg-gray-50 border rounded-xl font-bold text-xs flex items-center justify-between transition-all active:scale-95 ${
                          faceStyle === f.id 
                            ? 'border-pink-500 bg-pink-50/20 shadow-sm shadow-pink-500/10' 
                            : 'border-gray-100 hover:border-gray-200'
                        }`}
                      >
                        <span className="text-gray-900 truncate pr-1">{f.label} {locked ? '🔒' : ''}</span>
                        <span className="text-lg shrink-0">{f.emoji}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Head Size */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs font-black text-gray-400 uppercase tracking-wider">
                  <span>{t.headSize}</span>
                  <span className="text-pink-500 font-mono font-black">{Math.round(headScale * 100)}%</span>
                </div>
                <input 
                  type="range"
                  min="0.5"
                  max="2.5"
                  step="0.1"
                  value={headScale}
                  onChange={(e) => setHeadScale(parseFloat(e.target.value))}
                  className="w-full accent-pink-500 h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Apply Changes Button */}
              <div className="relative pt-2">
                <button
                  onClick={handleSavePersonalization}
                  className="w-full py-3 bg-pink-500 hover:bg-pink-600 active:scale-95 font-black text-sm text-white rounded-2xl shadow-lg shadow-pink-500/25 transition-all flex items-center justify-center gap-1.5 animate-pulse"
                >
                  <span>💾</span>
                  <span>{t.save}</span>
                </button>

                {savedBadgeVisible && (
                  <div className="absolute top-[-30px] left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-[11px] font-black px-3 py-1 rounded-full shadow-md animate-bounce flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    <span>{t.savedAlert}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Market Sub-View */}
          {view === 'personalize' && personalizeSubView === 'market' && (
            <div className="px-4 py-4 flex flex-col gap-4 h-full min-h-[460px]">
              {/* Back Button to choice */}
              <button
                onClick={() => setPersonalizeSubView('choice')}
                className="self-start text-xs font-black text-gray-500 hover:text-gray-800 flex items-center gap-1 bg-gray-100 px-3.5 py-1.5 rounded-full transition-colors cursor-pointer"
              >
                ← {language === 'es' ? 'Atrás' : 'Back'}
              </button>

              {/* Premium, Clean Market Introduction Banner */}
              <div className="bg-gray-50 border border-gray-150 rounded-2xl p-4 flex items-center gap-3 text-left">
                <CustomMarketLogo className="w-12 h-12 shrink-0" />
                <div className="flex flex-col gap-0.5">
                  <h3 className="text-xs font-black text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
                    <span>{language === 'es' ? 'Mercado de Artículos' : 'Item Market'}</span>
                  </h3>
                  <p className="text-[10px] text-gray-500 font-bold leading-relaxed">
                    {language === 'es' ? 'Compra cosas para decorar tu perfil y personalizar tu identidad.' : 'Buy beautiful items to decorate your profile and customize your identity.'}
                  </p>
                </div>
              </div>

              {/* Category tabs */}
              <div className="flex gap-1.5 p-1 bg-gray-100 rounded-xl shrink-0">
                <button
                  type="button"
                  onClick={() => setMarketCategory('fondos')}
                  className={`flex-1 py-2 text-[10px] font-black uppercase rounded-lg transition-all cursor-pointer text-center ${
                    marketCategory === 'fondos'
                      ? 'bg-white text-emerald-600 shadow-sm border border-emerald-100'
                      : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  {language === 'es' ? 'Fondos' : 'Backgrounds'}
                </button>
                <button
                  type="button"
                  onClick={() => setMarketCategory('perfil_usuario')}
                  className={`flex-1 py-2 text-[10px] font-black uppercase rounded-lg transition-all cursor-pointer text-center ${
                    marketCategory === 'perfil_usuario'
                      ? 'bg-white text-emerald-600 shadow-sm border border-emerald-100'
                      : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  {language === 'es' ? 'Perfil' : 'Profile'}
                </button>
                <button
                  type="button"
                  onClick={() => setMarketCategory('banner')}
                  className={`flex-1 py-2 text-[10px] font-black uppercase rounded-lg transition-all cursor-pointer text-center ${
                    marketCategory === 'banner'
                      ? 'bg-white text-emerald-600 shadow-sm border border-emerald-100'
                      : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  {language === 'es' ? 'Banner' : 'Banner'}
                </button>
              </div>

              {/* Market Search Bar */}
              <div className="relative shrink-0">
                <input
                  type="text"
                  value={marketSearchQuery}
                  onChange={(e) => setMarketSearchQuery(e.target.value)}
                  placeholder={language === 'es' ? 'Buscar...' : 'Search...'}
                  className="w-full bg-white border border-slate-300 rounded-xl pl-9 pr-8 py-2.5 text-xs font-mono font-bold text-slate-800 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder-slate-400 shadow-sm"
                />
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs">🔍</span>
                {marketSearchQuery && (
                  <button
                    type="button"
                    onClick={() => setMarketSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-800 font-bold text-xs"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Items List - Horizontal server-style cards */}
              <div className="space-y-3.5 max-h-[340px] overflow-y-auto pr-1 scrollbar-thin">
                {(() => {
                  let items: any[] = [];
                  if (marketCategory === 'fondos') {
                    items = [
                      { 
                        id: 'cosmic_bg', 
                        name: language === 'es' ? 'Fondo Cósmico' : 'Cosmic Background', 
                        price: 890, 
                        desc: language === 'es' ? 'Fondo universo en movimiento para tu perfil.' : 'Moving universe background for your profile.', 
                        renderIcon: () => <CosmicBackgroundCanvas className="absolute inset-0 w-full h-full pointer-events-none z-0 rounded-lg overflow-hidden" />
                      },
                      { 
                        id: 'lava_bg', 
                        name: language === 'es' ? 'Fondo Lava' : 'Lava Background', 
                        price: 5500, 
                        desc: language === 'es' ? 'Fondo de lava ardiente fluida con explosiones.' : 'Burning flowing lava background for your profile.', 
                        renderIcon: () => <LavaBackgroundCanvas className="absolute inset-0 w-full h-full pointer-events-none z-0 rounded-lg overflow-hidden" />
                      }
                    ];
                  } else if (marketCategory === 'perfil_usuario') {
                    items = [
                      {
                        id: 'golden_skin',
                        name: language === 'es' ? 'Aspecto Dorado' : 'Golden Skin',
                        price: 4000,
                        desc: language === 'es' ? 'Aspecto dorado brillante de puro lujo.' : 'A luxurious golden skin preset.',
                        renderIcon: () => (
                          <div className="w-10 h-10 rounded-full bg-yellow-400 border-2 border-yellow-500 flex items-center justify-center font-black text-[10px] text-yellow-950">GLD</div>
                        )
                      },
                      {
                        id: 'werewolf_skin',
                        name: language === 'es' ? 'Aspecto Hombre Lobo' : 'Werewolf Skin',
                        price: 1800,
                        desc: language === 'es' ? 'Aspecto de hombre lobo salvaje.' : 'A wild werewolf skin preset.',
                        renderIcon: () => (
                          <div className="w-10 h-10 rounded-full bg-slate-700 border-2 border-slate-800 flex items-center justify-center font-black text-[10px] text-white">WLF</div>
                        )
                      },
                      {
                        id: 'pink_skin',
                        name: language === 'es' ? 'Aspecto Rosa Cyber' : 'Cyber Pink Skin',
                        price: 1500,
                        desc: language === 'es' ? 'Aspecto de color rosa cyberpunk.' : 'A glowing cyber pink skin preset.',
                        renderIcon: () => (
                          <div className="w-10 h-10 rounded-full bg-pink-500 border-2 border-pink-600 flex items-center justify-center font-black text-[10px] text-white">PNK</div>
                        )
                      },
                      {
                        id: 'cool_face',
                        name: language === 'es' ? 'Cara con Lentes' : 'Cool Glasses Face',
                        price: 800,
                        desc: language === 'es' ? 'Equipa lentes de sol negros pro.' : 'Equip cool dark sunglasses face.',
                        renderIcon: () => (
                          <span className="text-xl">😎</span>
                        )
                      },
                      {
                        id: 'creepy_face',
                        name: language === 'es' ? 'Cara Creepy' : 'Creepy Devil Face',
                        price: 1000,
                        desc: language === 'es' ? 'Una terrorífica cara de demonio rojo.' : 'A terrifying red demon face.',
                        renderIcon: () => (
                          <span className="text-xl">👹</span>
                        )
                      }
                    ];
                  } else if (marketCategory === 'banner') {
                    items = [
                      {
                        id: 'default',
                        name: language === 'es' ? 'Banner del Menú (Predeterminado)' : 'Menu Banner (Default)',
                        price: 0,
                        desc: language === 'es' ? 'El banner clásico estilo Frutiger Aero con diseño brillante del menú principal.' : 'The classic glossy Frutiger Aero style banner from the main menu.',
                        renderIcon: () => (
                          <div className="w-12 h-6 rounded bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 border border-blue-400" />
                        )
                      }
                    ];
                  }

                   const filteredItems = items.filter(item => 
                    item.name.toLowerCase().includes(marketSearchQuery.toLowerCase()) || 
                    item.desc.toLowerCase().includes(marketSearchQuery.toLowerCase())
                  );

                  if (filteredItems.length === 0) {
                    return <div className="text-center py-6 text-gray-400 font-bold">{language === 'es' ? 'Sin artículos que coincidan' : 'No matching items'}</div>;
                  }

                  return filteredItems.map((item) => {
                    const owned = item.id === 'default' || unlockedItems.includes(item.id);
                    const isBgEquipped = (item.id === 'cosmic_bg' ? cosmicBgEnabled : item.id === 'lava_bg' ? lavaBgEnabled : false);
                    const isBannerEquipped = (item.id.startsWith('banner_') || item.id === 'default') && equippedBanner === item.id;
                    const isEquipped = isBgEquipped || isBannerEquipped || (owned && (item.id === 'golden_skin' ? skinPreset === 'golden' : item.id === 'werewolf_skin' ? skinPreset === 'werewolf' : item.id === 'pink_skin' ? skinPreset === 'pink' : item.id === 'cool_face' ? faceStyle === 'cool' : item.id === 'creepy_face' ? faceStyle === 'creepy' : false));

                    return (
                      <div 
                        key={item.id} 
                        className="flex items-center gap-4 cursor-pointer group p-2.5 bg-gray-50 hover:bg-gray-100/70 border border-gray-150 hover:border-emerald-300 rounded-2xl transition-all text-slate-900"
                      >
                        {/* Cuadro marco vacío con marco negro como el del servidor */}
                        <div className="w-20 h-20 bg-zinc-50 border-[3.5px] border-black flex items-center justify-center shadow-inner relative overflow-hidden rounded-xl shrink-0">
                          {item.renderIcon()}
                        </div>

                        {/* Middle info */}
                        <div className="flex-1 min-w-0 text-left">
                          <h4 className="font-extrabold text-gray-900 text-sm leading-tight flex items-center gap-1.5 flex-wrap uppercase tracking-wider">
                            {item.name}
                          </h4>
                          <p className="text-[10px] text-gray-500 font-bold mt-0.5 leading-snug">{item.desc}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                              <PixelGreenCoin />
                              <span>{item.price.toLocaleString()}</span>
                            </span>
                          </div>
                        </div>

                        {/* Action buttons on the right */}
                        <div className="shrink-0 pr-1">
                          {owned ? (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (item.id === 'cosmic_bg') {
                                  const nextState = !cosmicBgEnabled;
                                  setCosmicBgEnabled(nextState);
                                  if (nextState) setLavaBgEnabled(false);
                                } else if (item.id === 'lava_bg') {
                                  const nextState = !lavaBgEnabled;
                                  setLavaBgEnabled(nextState);
                                  if (nextState) setCosmicBgEnabled(false);
                                } else if (item.id.startsWith('banner_')) {
                                  const nextState = equippedBanner === item.id ? 'default' : item.id;
                                  setEquippedBanner(nextState);
                                  localStorage.setItem('gorebox_equipped_banner', nextState);
                                  if (signedIn && playerName) {
                                    fetch('/api/vps/update', {
                                      method: 'POST',
                                      headers: { 'Content-Type': 'application/json' },
                                      body: JSON.stringify({ username: playerName, equippedBanner: nextState })
                                    }).catch(console.error);
                                  }
                                } else if (item.id === 'golden_skin') {
                                  setSkinPreset('golden');
                                  setSkinColor('#eab308');
                                  localStorage.setItem('gbox_skin_preset', 'golden');
                                  localStorage.setItem('gbox_skin_color', '#eab308');
                                } else if (item.id === 'werewolf_skin') {
                                  setSkinPreset('werewolf');
                                  setSkinColor('#4a4e69');
                                  localStorage.setItem('gbox_skin_preset', 'werewolf');
                                  localStorage.setItem('gbox_skin_color', '#4a4e69');
                                } else if (item.id === 'pink_skin') {
                                  setSkinPreset('pink');
                                  setSkinColor('#ec4899');
                                  localStorage.setItem('gbox_skin_preset', 'pink');
                                  localStorage.setItem('gbox_skin_color', '#ec4899');
                                } else if (item.id === 'cool_face') {
                                  setFaceStyle('cool');
                                  localStorage.setItem('gbox_face_style', 'cool');
                                } else if (item.id === 'creepy_face') {
                                  setFaceStyle('creepy');
                                  localStorage.setItem('gbox_face_style', 'creepy');
                                }
                              }}
                              className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-xs transition-all active:scale-90 cursor-pointer border-2 border-black shadow-md ${
                                isEquipped
                                  ? 'bg-emerald-500 text-white'
                                  : 'bg-white text-gray-700 hover:bg-gray-50'
                              }`}
                            >
                              {isEquipped ? 'ON' : 'OFF'}
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleBuyItem(item.id, item.price);
                              }}
                              className="w-10 h-10 rounded-full bg-pink-500 hover:bg-pink-600 text-white font-black border-2 border-black active:scale-90 transition-all shadow-md flex items-center justify-center cursor-pointer text-center"
                            >
                              🛒
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>
            </div>
          )}

          {/* Plugins Sub-View */}
          {view === 'personalize' && personalizeSubView === 'plugins' && (
            <div className="px-4 py-4 flex flex-col gap-4 h-full min-h-[460px] text-left">
              {/* Back Button */}
              <button
                onClick={() => setPersonalizeSubView('choice')}
                className="self-start text-xs font-black text-gray-500 hover:text-gray-800 flex items-center gap-1 bg-gray-100 px-3.5 py-1.5 rounded-full transition-colors cursor-pointer"
              >
                ← {language === 'es' ? 'Atrás' : 'Back'}
              </button>

              {/* Premium, Clean Plugins Introduction Banner */}
              <div className="bg-gray-50 border border-gray-150 rounded-2xl p-4 flex items-center gap-3 text-left">
                <CustomPluginLogo className="w-12 h-12 shrink-0" />
                <div className="flex flex-col gap-0.5">
                  <h3 className="text-xs font-black text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
                    <span>{language === 'es' ? 'Taller de Plugins' : 'Plugins Workshop'}</span>
                  </h3>
                  <p className="text-[10px] text-gray-500 font-bold leading-relaxed">
                    {language === 'es' ? 'Equipa y activa tus extensiones especiales para expandir tu juego.' : 'Equip and toggle your custom engine mods to expand your gameplay.'}
                  </p>
                </div>
              </div>

              {/* Plugins Search Bar */}
              <div className="relative shrink-0">
                <input
                  type="text"
                  value={pluginsSearchQuery}
                  onChange={(e) => setPluginsSearchQuery(e.target.value)}
                  placeholder={language === 'es' ? 'Buscar...' : 'Search...'}
                  className="w-full bg-white border border-slate-300 rounded-xl pl-9 pr-8 py-2.5 text-xs font-mono font-bold text-slate-800 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder-slate-400 shadow-sm"
                />
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs">🔍</span>
                {pluginsSearchQuery && (
                  <button
                    type="button"
                    onClick={() => setPluginsSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-800 font-bold text-xs"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Plugins List - Rows of beautiful horizontal server-style cards */}
              <div className="flex flex-col gap-3.5 max-h-[380px] overflow-y-auto pr-1 scrollbar-thin py-1">
                {[
                  { id: 'plugin_doll', name: 'Doll from player', price: 2000, desc: language === 'es' ? 'Clon de tu personaje.' : 'Clone of your character.', renderIcon: () => <DollSVGIcon /> },
                  { id: 'plugin_vudu', name: 'Vuduu Doll from player', price: 3000, desc: language === 'es' ? 'Muñeco vudú vinculado.' : 'Interactive linked doll.', renderIcon: () => <VuduSVGIcon /> },
                  { id: 'plugin_milk', name: 'Milk spawner', price: 1000, desc: language === 'es' ? 'Generador de leche.' : 'Active physical milk carton.', renderIcon: () => <MilkSVGIcon /> }
                ]
                .filter(item => 
                  item.name.toLowerCase().includes(pluginsSearchQuery.toLowerCase()) || 
                  item.desc.toLowerCase().includes(pluginsSearchQuery.toLowerCase())
                )
                .map((item) => {
                  const owned = unlockedItems.includes(item.id);
                  const isEnabled = localStorage.getItem(`gbox_${item.id}`) !== 'false';

                  return (
                    <div 
                      key={item.id} 
                      onClick={() => {
                        if (owned) {
                          const nextState = !isEnabled;
                          localStorage.setItem(`gbox_${item.id}`, nextState ? 'true' : 'false');
                          window.dispatchEvent(new Event('storage'));
                          alert(language === 'es' 
                            ? `Plugin ${nextState ? 'activado' : 'desactivado'} correctamente.` 
                            : `Plugin ${nextState ? 'enabled' : 'disabled'} successfully.`
                          );
                          setUnlockedItems([...unlockedItems]);
                        } else {
                          handleBuyItem(item.id, item.price);
                        }
                      }}
                      className="flex items-center gap-4 cursor-pointer group p-2.5 bg-gray-50 hover:bg-gray-100/70 border border-gray-150 hover:border-indigo-300 rounded-2xl transition-all text-slate-900"
                    >
                      {/* Cuadro marco vacío con marco negro como el del servidor */}
                      <div className="w-20 h-20 bg-zinc-50 border-[3.5px] border-black flex items-center justify-center shadow-inner relative overflow-hidden rounded-xl shrink-0">
                        {item.renderIcon()}
                      </div>

                      {/* Middle Content */}
                      <div className="flex-1 min-w-0 text-left">
                        <span className="font-extrabold text-gray-900 text-sm uppercase tracking-wider leading-tight block group-hover:text-indigo-600 transition-colors">
                          {item.name}
                        </span>
                        <span className="text-[10px] text-gray-500 font-bold leading-snug block mt-0.5">
                          {item.desc}
                        </span>
                        <div className="flex items-center gap-2 mt-1 text-xs font-bold">
                          {!owned && (
                            <span className="text-emerald-600 font-extrabold uppercase text-[9px] tracking-wider bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 flex items-center gap-1">
                              <PixelGreenCoin /> {item.price.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Action buttons on the right */}
                      <div className="shrink-0 pr-1">
                        {owned ? (
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md active:scale-90 transition-all border-2 border-black ${
                            isEnabled ? 'bg-indigo-500 text-white' : 'bg-white text-gray-400'
                          }`}>
                            <span className="text-[11px] font-black">{isEnabled ? 'ON' : 'OFF'}</span>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleBuyItem(item.id, item.price);
                            }}
                            className="w-10 h-10 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-black border-2 border-black active:scale-90 transition-all shadow-md flex items-center justify-center"
                          >
                            ➕
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Drawings Museum Sub-View */}
          {view === 'personalize' && personalizeSubView === 'museum' && (
            <div className="px-4 py-4 flex flex-col gap-4 h-full min-h-[460px] text-left">
              {/* Back Button */}
              <button
                onClick={() => setPersonalizeSubView('choice')}
                className="self-start text-xs font-black text-gray-500 hover:text-gray-800 flex items-center gap-1 bg-gray-100 px-3.5 py-1.5 rounded-full transition-colors cursor-pointer"
              >
                ← {language === 'es' ? 'Atrás' : 'Back'}
              </button>

              {/* Premium, Clean Museum Introduction Banner */}
              <div className="bg-gray-50 border border-gray-150 rounded-2xl p-4 flex items-center gap-3 text-left">
                <MuseumDrawingSVG className="w-12 h-12 shrink-0" />
                <div className="flex flex-col gap-0.5">
                  <h3 className="text-xs font-black text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
                    <span>{language === 'es' ? 'Museo' : 'Museum'}</span>
                  </h3>
                  <p className="text-[10px] text-gray-500 font-bold leading-relaxed">
                    {language === 'es' ? 'Explora y busca obras de arte digitales de la comunidad de Subur25.' : 'Explore and search digital artwork created by the Subur25 community.'}
                  </p>
                </div>
              </div>

              {/* Professional Search Bar (as requested "como el de menu de buscar jugador") */}
              <div className="relative shrink-0">
                <input
                  type="text"
                  value={museumSearchQuery}
                  onChange={(e) => setMuseumSearchQuery(e.target.value)}
                  placeholder={language === 'es' ? 'Buscar...' : 'Search...'}
                  className="w-full bg-white border border-slate-300 rounded-xl pl-9 pr-8 py-2.5 text-xs font-mono font-bold text-slate-800 outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all placeholder-slate-400 shadow-sm"
                />
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs">🔍</span>
                {museumSearchQuery && (
                  <button
                    type="button"
                    onClick={() => setMuseumSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-800 font-bold text-xs"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Drawings Grid or List */}
              <div className="flex flex-col gap-3.5 max-h-[280px] overflow-y-auto pr-1 scrollbar-thin py-1">
                {[
                  { 
                    id: 'art_gracioso', 
                    name: language === 'es' ? 'El Gato Cúbico Hambriento' : 'The Hungry Cubic Cat', 
                    artist: 'MemeLord2026', 
                    date: '2026-10-03', 
                    desc: language === 'es' ? 'Un dibujo extremadamente gracioso de un gato compuesto por bloques destructibles que intenta morder un electro-cubo, pero se le electrocuta la cola blocky.' : 'An extremely funny drawing of a cat made of destructible blocks trying to bite an electro-cube, but getting its blocky tail electrocuted.', 
                    color: '#fbbf24', 
                    icon: '🐱' 
                  }
                ]
                .filter(item => item.name.toLowerCase().includes(museumSearchQuery.toLowerCase()) || item.artist.toLowerCase().includes(museumSearchQuery.toLowerCase()))
                .map((item) => (
                  <div 
                    key={item.id} 
                    onClick={() => setSelectedDrawing(item)}
                    className="flex items-center gap-4 cursor-pointer group p-3 bg-gray-50 hover:bg-gray-100/80 border border-gray-150 hover:border-pink-300 rounded-2xl transition-all text-slate-900"
                  >
                    {/* Drawing representation thumbnail */}
                    <div className="w-16 h-16 rounded-xl border-[3px] border-black flex items-center justify-center shadow-inner relative overflow-hidden shrink-0" style={{ backgroundColor: `${item.color}15` }}>
                      <span className="text-3xl filter drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.3)]">{item.icon}</span>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0 text-left">
                      <span className="font-extrabold text-gray-900 text-sm uppercase tracking-wider leading-tight block group-hover:text-pink-600 transition-colors">
                        {item.name}
                      </span>
                      <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-bold mt-0.5">
                        <span>{language === 'es' ? `Por ${item.artist}` : `By ${item.artist}`}</span>
                        <span>•</span>
                        <span>{item.date}</span>
                      </div>
                      <span className="text-[10px] text-gray-500 font-bold leading-snug block mt-1 line-clamp-1">
                        {item.desc}
                      </span>
                    </div>

                    {/* Open arrow */}
                    <div className="text-gray-300 group-hover:text-pink-500 transition-colors pr-1 shrink-0">
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Selected drawing detail modal overlay */}
              {selectedDrawing && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
                  <div className="w-full max-w-md bg-white border-[3px] border-black rounded-[2.3rem] shadow-2xl p-6 relative overflow-hidden flex flex-col gap-4 text-center">
                    <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />
                    
                    {/* Large display */}
                    <div className="w-32 h-32 mx-auto rounded-3xl border-[4px] border-black flex items-center justify-center shadow-lg relative overflow-hidden" style={{ backgroundColor: `${selectedDrawing.color}20` }}>
                      <span className="text-6xl filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)] animate-pulse">{selectedDrawing.icon}</span>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent pointer-events-none" />
                    </div>

                    <div>
                      <h2 className="text-lg font-black text-slate-900 uppercase tracking-wide">{selectedDrawing.name}</h2>
                      <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 font-bold mt-0.5">
                        <span>{language === 'es' ? `Artista: ${selectedDrawing.artist}` : `Artist: ${selectedDrawing.artist}`}</span>
                        <span>•</span>
                        <span>{selectedDrawing.date}</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 font-semibold bg-slate-50 border border-slate-100 p-4 rounded-2xl leading-relaxed">
                      {selectedDrawing.desc}
                    </p>

                    <div className="flex gap-2.5 mt-2">
                      <button
                        type="button"
                        onClick={() => {
                          alert(language === 'es' ? `¡${selectedDrawing.name} equipado como spray para el juego!` : `Equipped ${selectedDrawing.name} as play spray!`);
                          setSelectedDrawing(null);
                        }}
                        className="flex-1 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-black text-xs uppercase rounded-2xl shadow-md hover:shadow-lg border-2 border-black hover:scale-102 active:scale-98 transition-all cursor-pointer"
                      >
                        {language === 'es' ? 'Equipar Spray' : 'Equip Spray'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedDrawing(null)}
                        className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-xs uppercase rounded-2xl border-2 border-black hover:scale-102 active:scale-98 transition-all cursor-pointer"
                      >
                        {language === 'es' ? 'Cerrar' : 'Close'}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Settings View with Choose Language ONLY */}
          {view === 'settings' && (
            <div className="px-4 py-4 flex flex-col gap-5">
              
              {/* Language Selector HUD */}
              <div className="bg-gray-50 border border-gray-100 p-4 rounded-2xl flex flex-col gap-3">
                <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider flex items-center gap-2">
                  <span>🌐</span> {t.language}
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => setLanguage('es')}
                    className={`flex-1 py-3 px-4 rounded-xl text-sm font-extrabold border transition-all active:scale-95 flex items-center justify-center gap-2 ${
                      language === 'es'
                        ? 'bg-pink-500 text-white border-pink-600 shadow-md shadow-pink-500/20 font-black'
                        : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <span>🇪🇸</span> Español
                  </button>
                  <button
                    onClick={() => setLanguage('en')}
                    className={`flex-1 py-3 px-4 rounded-xl text-sm font-extrabold border transition-all active:scale-95 flex items-center justify-center gap-2 ${
                      language === 'en'
                        ? 'bg-pink-500 text-white border-pink-600 shadow-md shadow-pink-500/20 font-black'
                        : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <span>🇺🇸</span> English
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Navigation Bar - Glassy panel with Aero active highlights */}
        <div className="bg-white/80 backdrop-blur-lg border-t border-slate-200 flex items-center justify-around py-2 px-1 sticky bottom-0 z-20 pb-safe shadow-[0_-8px_24px_rgba(0,0,0,0.05)] relative text-slate-800 shrink-0">
          {/* Glass shine reflection overlay */}
          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />
          
          {/* Menu Button (Renamed from Home) */}
          <button 
            onClick={() => {
              setView('main');
              setSearchOpen(false);
              setSearchQuery('');
            }} 
            className={`flex-1 py-2 flex flex-col items-center gap-1 transition-all ${
              view === 'main' 
                ? 'text-slate-900 font-extrabold' 
                : 'text-gray-400 hover:text-gray-500'
            }`}
          >
            <div 
              className={`p-1.5 rounded-xl transition-all ${
                view === 'main' 
                  ? 'border border-white/60 shadow-[0_0_12px_rgba(100,116,139,0.5),inset_0_1px_2.5px_rgba(255,255,255,0.85)] scale-105' 
                  : 'bg-transparent border border-transparent'
              }`}
              style={view === 'main' ? { backgroundColor: '#64748b', boxShadow: `0 0 12px rgba(100,116,139,0.5), inset 0 1px 2.5px rgba(255,255,255,0.85)` } : {}}
            >
              <Home className={`w-6 h-6 sm:w-7 sm:h-7 ${view === 'main' ? 'fill-current text-white' : 'text-gray-400 hover:text-gray-500'}`} />
            </div>
            <span className="text-[10px] font-bold text-gray-500">{view === 'main' ? t.menu : t.menu}</span>
          </button>
 
          {/* Personalize Button */}
          <button 
            onClick={() => {
              setView('personalize');
              setPersonalizeSubView('choice');
              setSearchOpen(false);
              setSearchQuery('');
            }} 
            className={`flex-1 py-2 flex flex-col items-center gap-1 transition-all ${
              view === 'personalize' 
                ? 'text-slate-900 font-extrabold' 
                : 'text-gray-400 hover:text-gray-500'
            }`}
          >
            <div 
              className={`p-1.5 rounded-xl transition-all ${
                view === 'personalize' 
                  ? 'border border-white/60 shadow-[0_0_12px_rgba(100,116,139,0.5),inset_0_1px_2.5px_rgba(255,255,255,0.85)] scale-105' 
                  : 'bg-transparent border border-transparent'
              }`}
              style={view === 'personalize' ? { backgroundColor: '#64748b', boxShadow: `0 0 12px rgba(100,116,139,0.5), inset 0 1px 2.5px rgba(255,255,255,0.85)` } : {}}
            >
              <Wrench className={`w-6 h-6 sm:w-7 sm:h-7 ${view === 'personalize' ? 'text-white' : 'text-gray-400 hover:text-gray-500'}`} />
            </div>
            <span className="text-[10px] font-bold text-gray-500">{view === 'personalize' ? t.personalize : t.personalize}</span>
          </button>
 
          {/* Servers Button */}
          <button 
            onClick={() => {
              setView('multiplayer');
              setSearchOpen(false);
              setSearchQuery('');
            }} 
            className={`flex-1 py-2 flex flex-col items-center gap-1 transition-all ${
              view === 'multiplayer' 
                ? 'text-slate-900 font-extrabold' 
                : 'text-gray-400 hover:text-gray-500'
            }`}
          >
            <div 
              className={`p-1.5 rounded-xl transition-all ${
                view === 'multiplayer' 
                  ? 'border border-white/60 shadow-[0_0_12px_rgba(100,116,139,0.5),inset_0_1px_2.5px_rgba(255,255,255,0.85)] scale-105' 
                  : 'bg-transparent border border-transparent'
              }`}
              style={view === 'multiplayer' ? { backgroundColor: '#64748b', boxShadow: `0 0 12px rgba(100,116,139,0.5), inset 0 1px 2.5px rgba(255,255,255,0.85)` } : {}}
            >
              <Compass className={`w-6 h-6 sm:w-7 sm:h-7 ${view === 'multiplayer' ? 'text-white' : 'text-gray-400 hover:text-gray-500'}`} />
            </div>
            <span className="text-[10px] font-bold text-gray-500">{view === 'multiplayer' ? t.discover : t.discover}</span>
          </button>
 
          {/* Settings Button */}
          <button 
            onClick={() => {
              setView('settings');
              setSearchOpen(false);
              setSearchQuery('');
            }} 
            className={`flex-1 py-2 flex flex-col items-center gap-1 transition-all ${
              view === 'settings' 
                ? 'text-slate-900 font-extrabold' 
                : 'text-gray-400 hover:text-gray-500'
            }`}
          >
            <div 
              className={`p-1.5 rounded-xl transition-all ${
                view === 'settings' 
                  ? 'border border-white/60 shadow-[0_0_12px_rgba(100,116,139,0.5),inset_0_1px_2.5px_rgba(255,255,255,0.85)] scale-105' 
                  : 'bg-transparent border border-transparent'
              }`}
              style={view === 'settings' ? { backgroundColor: '#64748b', boxShadow: `0 0 12px rgba(100,116,139,0.5), inset 0 1px 2.5px rgba(255,255,255,0.85)` } : {}}
            >
              <MoreHorizontal className={`w-6 h-6 sm:w-7 sm:h-7 ${view === 'settings' ? 'text-white' : 'text-gray-400 hover:text-gray-500'}`} />
            </div>
            <span className="text-[10px] font-bold text-gray-500">{view === 'settings' ? t.settings : t.settings}</span>
          </button>
 
          {/* Exit / Save Button Unified */}
          <div className="flex-1 flex flex-col items-center relative">
            <button 
              onClick={async () => {
                await handleSavePersonalization();
                handleExitWithBackup();
              }} 
              className="py-1 flex flex-col items-center gap-1 text-slate-700 hover:text-emerald-600 transition-all active:scale-95 cursor-pointer"
            >
              <div className="relative p-1.5 rounded-xl bg-gradient-to-b from-emerald-400 to-green-500 border border-white/50 shadow-[0_4px_12px_rgba(16,185,129,0.45),inset_0_1px_2.5px_rgba(255,255,255,0.75)] hover:from-emerald-300 hover:to-green-400 flex items-center justify-center">
                <LogOut className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                <span className="absolute -top-1 -right-1 bg-white text-emerald-600 text-[8px] font-black rounded-full w-4 h-4 border border-emerald-200 flex items-center justify-center shadow-xs">
                  💾
                </span>
              </div>
              <span className="text-[9px] font-black uppercase tracking-tight text-center leading-tight">
                {language === 'es' ? 'Salir y Guardar' : 'Exit & Save'}
              </span>
            </button>
          </div>
        </div>

        {/* Authentication Modal Overlay */}
        {isAuthOpen && (
          <div className="absolute inset-0 z-30 bg-black/80 backdrop-blur-md flex flex-col justify-end text-slate-800">
            <div className="relative bg-zinc-300 border-t-2 border-zinc-400 rounded-t-[2rem] p-6 space-y-6 shadow-2xl animate-in slide-in-from-bottom duration-300">
              {adminConfirmOpen && (
                <div className="absolute inset-0 z-40 bg-zinc-300/95 backdrop-blur-md flex flex-col justify-center p-6 space-y-6 rounded-t-[2rem] text-slate-800">
                  <div className="text-center space-y-2">
                    <span className="text-4xl">🛡️</span>
                    <h3 className="text-lg font-black text-slate-900 tracking-tight leading-snug">
                      Debemos confirmar si eres un verdadero administrador
                    </h3>
                    <p className="text-xs text-slate-500 font-bold">
                      Insertar contraseña:
                    </p>
                  </div>
 
                  <div className="space-y-4">
                    {adminConfirmError && (
                      <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 text-xs font-bold text-center">
                        ⚠️ {adminConfirmError}
                      </div>
                    )}
 
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={adminConfirmPassword}
                      onChange={(e) => setAdminConfirmPassword(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 font-bold outline-none placeholder-slate-400 focus:border-pink-500 transition-colors text-center"
                      autoFocus
                    />
 
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setAdminConfirmOpen(false);
                          setAdminConfirmPassword('');
                          setAdminConfirmError('');
                        }}
                        className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-extrabold uppercase tracking-wider rounded-xl border border-slate-200 transition-colors cursor-pointer"
                      >
                        {language === 'es' ? 'Cancelar' : 'Cancel'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (adminConfirmPassword === 'baughborxd') {
                            setAdminConfirmed(true);
                            setAdminConfirmOpen(false);
                            setAuthPassword('baughborxd');
                            setAdminConfirmError('');
                            setTimeout(() => {
                              const form = document.querySelector('form') as HTMLFormElement;
                              if (form) {
                                form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
                              }
                            }, 100);
                          } else {
                            setAdminConfirmError(language === 'es' ? 'Contraseña incorrecta' : 'Incorrect password');
                          }
                        }}
                        className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md transition-colors cursor-pointer"
                      >
                        {language === 'es' ? 'Confirmar' : 'Confirm'}
                      </button>
                    </div>
                  </div>
                </div>
              )}
 
              {registeredDataForDownload ? (
                /* Dedicated key-private.json download view upon registration */
                <div className="flex flex-col items-center text-center space-y-5 py-4 animate-in zoom-in-95 duration-200">
                  <div className="w-14 h-14 bg-emerald-500/15 border border-emerald-500/30 rounded-2xl flex items-center justify-center text-emerald-600 shadow-inner">
                    <Check className="w-7 h-7 stroke-[2.5]" />
                  </div>
                  
                  <div className="space-y-1">
                    <h2 className="text-xl font-black text-slate-900 tracking-tight">
                      {language === 'es' ? '¡Registro Exitoso!' : 'Registration Successful!'}
                    </h2>
                    <p className="text-[10px] text-emerald-600 font-bold tracking-wider uppercase">
                      SERVIDOR PRINCIPAL • CONEXIÓN EXITOSA
                    </p>
                  </div>
 
                  <p className="text-xs sm:text-sm text-slate-600 font-semibold leading-relaxed max-w-[320px]">
                    {language === 'es'
                      ? 'Por favor, descargue la siguiente clave privada (private-key) para que pueda iniciar sesión, ya que es parte fundamental de su cuenta. Mantenga este archivo en un lugar seguro.'
                      : 'Please download the following private-key to log into your account, as it is a fundamental part of your credentials. Keep this file safe.'}
                  </p>
 
                  {!showDownloadBtn ? (
                    <div className="flex flex-col items-center gap-2 py-2">
                      <div className="w-5 h-5 border-2 border-emerald-500/30 border-t-emerald-400 rounded-full animate-spin" />
                      <span className="text-[11px] text-emerald-600/80 font-semibold tracking-wide">
                        {language === 'es' ? 'Preparando clave de seguridad cifrada...' : 'Preparing encrypted security key...'}
                      </span>
                    </div>
                  ) : (
                    <div className="w-full space-y-3.5 animate-in fade-in duration-300">
                      {/* Private Key Download Button (styled GREEN as requested) */}
                      <button
                        type="button"
                        onClick={() => {
                          const fileDataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(registeredDataForDownload, null, 2));
                          const backupFilename = 'key-private.json';
                          const anchor = document.createElement('a');
                          anchor.setAttribute("href", fileDataStr);
                          anchor.setAttribute("download", backupFilename);
                          document.body.appendChild(anchor);
                          anchor.click();
                          anchor.remove();
                          setHasDownloadedKey(true);
                        }}
                        className="w-full py-3.5 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 active:scale-95 text-white font-black text-xs uppercase tracking-widest rounded-xl shadow-lg shadow-pink-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>📥</span> {language === 'es' ? 'Descargar clave privada' : 'Download private key'}
                      </button>
 
                      {/* Accept and Continue Button (Disabled until private key is downloaded) */}
                      <button
                        type="button"
                        disabled={!hasDownloadedKey}
                        onClick={() => {
                          setRegisteredDataForDownload(null);
                          setIsAuthOpen(false);
                        }}
                        className={`w-full py-2.5 text-xs font-extrabold uppercase tracking-wider rounded-xl border transition-colors ${
                          hasDownloadedKey
                            ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200 cursor-pointer'
                            : 'bg-slate-50 text-slate-400 border-slate-100 cursor-not-allowed opacity-50'
                        }`}
                      >
                        {language === 'es' ? 'Aceptar y Continuar' : 'Accept & Continue'}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  {/* Header */}
                  <div className="flex items-center justify-between text-slate-800">
                    <div>
                      <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                        {authMode === 'login' 
                          ? (language === 'es' ? 'Iniciar Sesión' : 'Sign In') 
                          : (language === 'es' ? 'Crear Cuenta' : 'Register Account')}
                      </h2>
                      <p className="text-xs text-slate-500 font-bold mt-0.5">
                        {authMode === 'login'
                          ? (language === 'es' ? 'Ingresa a tu cuenta de Urbia' : 'Access your Urbia account')
                          : (language === 'es' ? 'Regístrate y guarda tu progreso' : 'Sign up to persist your progress')}
                      </p>
                    </div>
                    <button
                      onClick={() => setIsAuthOpen(false)}
                      className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 font-bold flex items-center justify-center text-sm transition-colors"
                    >
                      ✕
                    </button>
                  </div>
 
                  {/* Form */}
                  <form onSubmit={handleAuthSubmit} className="space-y-4 text-slate-800">
                    {/* Error & Success Messages */}
                    {authError && (
                      <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 text-xs font-bold text-center">
                        ⚠️ {authError}
                      </div>
                    )}
                    {authSuccess && (
                      <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 text-xs font-bold text-center">
                        ✨ {authSuccess}
                      </div>
                    )}
 
                    {/* Input Fields */}
                    <div className="space-y-3.5">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider block">
                          {language === 'es' ? 'Nombre de Usuario' : 'Username'}
                        </label>
                        <input
                          type="text"
                          maxLength={18}
                          placeholder={language === 'es' ? 'Tu nombre de jugador' : 'Your player name'}
                          value={authName}
                          onChange={(e) => setAuthName(e.target.value.replace(/[^a-zA-Z0-9_]/g, ''))}
                          className="w-full bg-zinc-100 border border-zinc-400 rounded-xl px-4 py-3 text-sm text-zinc-800 font-bold outline-none placeholder-zinc-400 focus:border-zinc-500 focus:bg-white transition-colors"
                          required
                        />
                      </div>
  
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider block">
                          {language === 'es' ? 'Contraseña' : 'Password'}
                        </label>
                        <input
                          type="password"
                          placeholder="••••••••"
                          value={authPassword}
                          onChange={(e) => setAuthPassword(e.target.value)}
                          className="w-full bg-zinc-100 border border-zinc-400 rounded-xl px-4 py-3 text-sm text-zinc-800 font-bold outline-none placeholder-zinc-400 focus:border-zinc-500 focus:bg-white transition-colors"
                          required
                        />
                      </div>
  
                      {authMode === 'register' && (
                        <>
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider block">
                              {language === 'es' ? 'Fecha de Nacimiento (Mayor de 18)' : 'Date of Birth (18+ Required)'}
                            </label>
                            <input
                              type="date"
                              value={registerBirthdate}
                              onChange={(e) => setRegisterBirthdate(e.target.value)}
                              className="w-full bg-zinc-100 border border-zinc-400 rounded-xl px-4 py-3 text-sm text-zinc-800 font-bold outline-none focus:border-zinc-500 focus:bg-white transition-colors text-center cursor-pointer"
                              required
                            />
                          </div>
  
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider block">
                              {language === 'es' ? 'Correo Electrónico (Opcional)' : 'Email Address (Optional)'}
                            </label>
                            <input
                              type="email"
                              placeholder="ejemplo@correo.com"
                              value={authEmail}
                              onChange={(e) => setAuthEmail(e.target.value)}
                              className="w-full bg-zinc-100 border border-zinc-400 rounded-xl px-4 py-3 text-sm text-zinc-800 font-bold outline-none placeholder-zinc-400 focus:border-zinc-500 focus:bg-white transition-colors"
                            />
                          </div>
                        </>
                      )}
                    </div>
 
                    {/* Hidden check input for "Entrar" button flow */}
                    {authMode === 'login' && (
                      <input
                        type="file"
                        accept="*/*"
                        id="auth-entrar-file-input"
                        className="hidden"
                        onChange={handleEntrarFileCheck}
                      />
                    )}
 
                    {/* Submit button */}
                    <button
                      type="submit"
                      className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 active:scale-98 text-white font-black text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-1.5"
                    >
                      {authMode === 'login' 
                        ? (language === 'es' ? 'Entrar' : 'Sign In') 
                        : (language === 'es' ? 'Registrarse' : 'Create Account')}
                    </button>
                  </form>
 
                  {/* Mode Toggle footer */}
                  <div className="text-center pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode(authMode === 'login' ? 'register' : 'login');
                        setAuthError('');
                        setAuthSuccess('');
                        setAdminConfirmed(false);
                        setHasDownloadedKey(false);
                      }}
                      className="text-xs font-black text-emerald-500 hover:text-emerald-400 transition-colors"
                    >
                      {authMode === 'login'
                        ? (language === 'es' ? '¿No tienes cuenta? Regístrate aquí' : "Don't have an account? Register here")
                        : (language === 'es' ? '¿Ya tienes cuenta? Inicia sesión' : 'Already have an account? Sign In')}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>

    {/* Birthdate & Age Verification Scanner Modal */}
    {isFaceScannerOpen && (
      <div className="fixed inset-0 z-[120] bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
        <div className="bg-zinc-950 border-2 border-indigo-500/50 rounded-[2rem] w-full max-w-sm p-6 text-white flex flex-col items-center text-center shadow-[0_0_35px_rgba(99,102,241,0.25)] animate-in zoom-in-95">
          <div className="w-16 h-16 rounded-full bg-indigo-500/10 border border-indigo-500/40 flex items-center justify-center text-indigo-400 mb-4 shadow-inner">
            <span className="text-3.5xl">📅</span>
          </div>
          <h2 className="text-base font-black tracking-widest uppercase text-indigo-400 mb-1">
            {language === 'es' ? 'Verificación de Edad' : 'Age Verification'}
          </h2>
          <p className="text-[11px] text-zinc-400 mb-5 leading-normal">
            {language === 'es' 
              ? 'Introduce tu fecha de nacimiento. El sistema detectará si eres mayor de 18 años.' 
              : 'Enter your birthdate. The system will detect if you are over 18.'}
          </p>

          {faceScanStatus === 'idle' ? (
            <div className="w-full space-y-4">
              <div className="space-y-1.5 text-left">
                <label className="text-[10px] font-black uppercase text-zinc-500 tracking-wider">
                  {language === 'es' ? 'Fecha de Nacimiento' : 'Date of Birth'}
                </label>
                <input
                  type="date"
                  value={birthdate}
                  onChange={(e) => {
                    setBirthdate(e.target.value);
                    setBirthdateError('');
                  }}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white font-extrabold outline-none focus:border-indigo-500/50 transition-colors text-center cursor-pointer"
                />
              </div>

              {birthdateError && (
                <div className="p-3 bg-red-900/30 border border-red-500/30 text-red-300 rounded-xl text-xs font-bold leading-relaxed text-left">
                  ⚠️ {birthdateError}
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsFaceScannerOpen(false)}
                  className="flex-1 py-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 text-xs font-extrabold uppercase rounded-xl border border-zinc-800 transition-colors cursor-pointer active:scale-95"
                >
                  {language === 'es' ? 'Cancelar' : 'Cancel'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (!birthdate) {
                      setBirthdateError(language === 'es' ? 'Por favor, selecciona una fecha válida.' : 'Please select a valid date.');
                      return;
                    }
                    const birthDateObj = new Date(birthdate);
                    const today = new Date();
                    let age = today.getFullYear() - birthDateObj.getFullYear();
                    const m = today.getMonth() - birthDateObj.getMonth();
                    if (m < 0 || (m === 0 && today.getDate() < birthDateObj.getDate())) {
                      age--;
                    }

                    if (isNaN(birthDateObj.getTime())) {
                      setBirthdateError(language === 'es' ? 'Fecha inválida.' : 'Invalid date.');
                      return;
                    }

                    if (age < 18) {
                      setBirthdateError(language === 'es' 
                        ? `Acceso denegado. Tienes ${age} años. Debes tener 18 o más.` 
                        : `Access denied. You are ${age} years old. You must be 18 or older.`
                      );
                    } else {
                      // Trigger scanning animation
                      setFaceScanStatus('scanning');
                      setTimeout(() => {
                        setFaceScanStatus('success');
                        setTimeout(async () => {
                          setIsVerified18(true);
                          localStorage.setItem('gorebox_verified_18', 'true');
                          setIsFaceScannerOpen(false);
                          setFaceScanStatus('idle');

                          if (playerName) {
                            try {
                              await fetch('/api/vps/update', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                  username: playerName,
                                  isVerified18: true,
                                  verificationDate: new Date().toISOString()
                                })
                              });
                            } catch (e) {
                              console.error("VPS verification save error:", e);
                            }
                          }
                        }, 1500);
                      }, 2000);
                    }
                  }}
                  className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black uppercase rounded-xl shadow-md transition-colors cursor-pointer active:scale-95"
                >
                  {language === 'es' ? 'Verificar' : 'Verify'}
                </button>
              </div>
            </div>
          ) : (
            <div className="w-full flex flex-col items-center">
              <div className="relative w-44 h-44 rounded-2xl bg-zinc-900 border border-indigo-500/30 overflow-hidden mb-5 flex items-center justify-center">
                {faceScanStatus === 'scanning' && (
                  <div className="absolute inset-x-0 h-1 bg-indigo-500 shadow-[0_0_10px_indigo] animate-[bounce_1.5s_infinite]" />
                )}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.1)_0%,transparent_70%)]" />
                <div className="flex flex-col items-center gap-2 z-10 px-2">
                  {faceScanStatus === 'scanning' && (
                    <span className="text-[10px] font-mono text-indigo-300 animate-pulse uppercase tracking-wider">
                      {language === 'es' ? 'Validando fecha de nacimiento...' : 'Analyzing date of birth...'}
                    </span>
                  )}
                  {faceScanStatus === 'success' && (
                    <div className="flex flex-col items-center text-emerald-400 animate-in zoom-in">
                      <span className="text-3xl mb-1">✓</span>
                      <span className="text-xs font-black tracking-wider uppercase">
                        {language === 'es' ? '¡Mayor de edad verificado!' : 'Over 18+ Detected!'}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="text-[11px] font-mono text-zinc-500">
                {faceScanStatus === 'scanning' 
                  ? (language === 'es' ? 'Ejecutando algoritmo inteligente...' : 'Executing check algorithm...') 
                  : (language === 'es' ? '¡Verificación completada!' : 'Verification completed!')}
              </div>
            </div>
          )}
        </div>
      </div>
    )}

    {/* Exit Confirmation Professional Backup Modal */}
    {showExitConfirmModal && (
      <div className="fixed inset-0 z-[130] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
        <div className="bg-slate-900 border border-slate-800 rounded-[2rem] w-full max-w-sm p-6 text-white flex flex-col items-center text-center shadow-2xl animate-in zoom-in-95">
          <div className="w-14 h-14 rounded-2xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-4 shadow-inner">
            <LogOut className="w-7 h-7" />
          </div>
          <h2 className="text-base font-black tracking-wider uppercase text-white mb-2">Aviso de Salida</h2>
          <p className="text-xs text-slate-300 font-medium mb-6 leading-relaxed">
            {language === 'es'
              ? '¿Deseas descargar una copia de seguridad profesional de tus datos actuales antes de salir del juego?'
              : 'Do you want to download a professional backup of your current game data before exiting?'}
          </p>

          <div className="flex flex-col gap-2.5 w-full">
            <button
              onClick={confirmExitAndDownload}
              className="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 active:scale-95 text-white font-black text-xs uppercase tracking-widest rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>📥</span> {language === 'es' ? 'Descargar Copia y Salir' : 'Download Backup & Exit'}
            </button>
            <button
              onClick={() => {
                setShowExitConfirmModal(false);
                window.close();
              }}
              className="w-full py-2.5 bg-white hover:bg-slate-50 active:scale-95 text-slate-900 font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer border border-slate-200"
            >
              {language === 'es' ? 'Salir sin Guardar' : 'Exit Without Saving'}
            </button>
            <button
              onClick={() => setShowExitConfirmModal(false)}
              className="w-full py-2 text-slate-500 hover:text-slate-300 font-bold text-xs transition-colors cursor-pointer mt-1"
            >
              {language === 'es' ? 'Cancelar' : 'Cancel'}
            </button>
          </div>
        </div>
      </div>
    )}

    {/* Create Server Modal in Discover */}
    {showCreateServerModal && (
      <div className="fixed inset-0 z-[130] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
        <div className="bg-slate-900 border border-slate-800 rounded-[2rem] w-full max-w-sm p-6 text-white flex flex-col shadow-2xl animate-in zoom-in-95">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-black tracking-wider uppercase text-white">
              {language === 'es' ? 'Crear Servidor Privado' : 'Create Private Server'}
            </h2>
            <button
              onClick={() => setShowCreateServerModal(false)}
              className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 hover:bg-slate-700 font-bold flex items-center justify-center text-sm"
            >
              ✕
            </button>
          </div>

          <div className="space-y-4 mb-6">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">
                {language === 'es' ? 'Nombre del Servidor' : 'Server Name'}
              </label>
              <input
                type="text"
                maxLength={24}
                value={newServerName}
                onChange={(e) => setNewServerName(e.target.value)}
                placeholder={language === 'es' ? 'Ej: Servidor Pro Gore' : 'Ex: Pro Gore Server'}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white font-bold outline-none focus:border-pink-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">
                {language === 'es' ? 'Mapa' : 'Map'}
              </label>
              <select
                value={newServerMapId}
                onChange={(e) => setNewServerMapId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white font-bold outline-none focus:border-pink-500"
              >
                <option value="cesped2">Bosque de Césped</option>
                <option value="lab">Laboratorio</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">
                {language === 'es' ? 'Dibujar / Crear Vista Previa del Servidor' : 'Draw / Create Server Preview'}
              </label>
              <div className="w-full h-32 bg-slate-950 border border-slate-800 rounded-xl overflow-hidden relative touch-none flex items-center justify-center">
                <canvas
                  ref={canvasRef}
                  width={280}
                  height={128}
                  onPointerDown={startDrawing}
                  onPointerMove={drawPreview}
                  onPointerUp={stopDrawing}
                  onPointerLeave={stopDrawing}
                  className="w-full h-full cursor-crosshair bg-zinc-950"
                />
                {!serverPreviewDataUrl && (
                  <span className="absolute text-[10px] text-zinc-500 font-bold pointer-events-none">
                    {language === 'es' ? 'Dibuja aquí tu portada' : 'Draw your cover here'}
                  </span>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={handleCreateServerSubmit}
            className="w-full py-3.5 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 active:scale-95 text-white font-black text-xs uppercase tracking-widest rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Send className="w-4 h-4" /> {language === 'es' ? 'Publicar Servidor en Descubrir' : 'Publish Server in Discover'}
          </button>
        </div>
      </div>
    )}

    {/* Canvas Painting Modal */}
    {paintModalOpen && (
      <div className="fixed inset-0 z-[140] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 select-none">
        <div className="bg-white border-4 border-black rounded-[2rem] w-full max-w-sm p-6 text-slate-900 flex flex-col shadow-2xl animate-in zoom-in-95">
          <div className="flex items-center justify-between mb-4 shrink-0">
            <h2 className="text-xs font-black tracking-wider uppercase text-gray-800 flex items-center gap-1.5">
              <span>🎨</span> {language === 'es' ? 'Dibujar Portada de Servidor' : 'Draw Server Cover'}
            </h2>
            <button
              onClick={() => setPaintModalOpen(false)}
              className="w-8 h-8 rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200 font-bold flex items-center justify-center text-xs"
            >
              ✕
            </button>
          </div>

          <div className="flex flex-col items-center gap-4">
            {/* Color Palette */}
            <div className="flex flex-wrap gap-2 justify-center shrink-0">
              {[
                { name: 'Negro', code: '#000000' },
                { name: 'Rojo', code: '#ef4444' },
                { name: 'Azul', code: '#3b82f6' },
                { name: 'Verde', code: '#10b981' },
                { name: 'Amarillo', code: '#f59e0b' },
                { name: 'Rosa', code: '#ec4899' },
                { name: 'Gris', code: '#6b7280' },
                { name: 'Blanco', code: '#ffffff' }
              ].map((color) => (
                <button
                  key={color.code}
                  type="button"
                  onClick={() => setBrushColor(color.code)}
                  className={`w-6 h-6 rounded-full border-2 transition-all cursor-pointer ${
                    brushColor === color.code ? 'border-pink-500 scale-110 shadow-md' : 'border-gray-300 hover:scale-105'
                  }`}
                  style={{ backgroundColor: color.code }}
                  title={color.name}
                />
              ))}
            </div>

            {/* Brush Size Slider */}
            <div className="w-full flex items-center gap-3 shrink-0">
              <span className="text-[10px] font-black uppercase text-gray-400">Grosor:</span>
              <input
                type="range"
                min="2"
                max="24"
                value={brushSize}
                onChange={(e) => setBrushSize(parseInt(e.target.value) || 6)}
                className="flex-1 accent-pink-500"
              />
              <span className="text-xs font-black text-gray-700 w-5 text-right">{brushSize}px</span>
            </div>

            {/* Drawing Canvas */}
            <div className="w-64 h-64 bg-white border-[4px] border-black rounded-2xl overflow-hidden relative touch-none shadow-inner">
              <canvas
                ref={paintCanvasRef}
                width={256}
                height={256}
                onPointerDown={startPainting}
                onPointerMove={drawPainting}
                onPointerUp={stopPainting}
                onPointerLeave={stopPainting}
                className="w-full h-full bg-white cursor-crosshair"
              />
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-3 w-full shrink-0">
              <button
                type="button"
                onClick={clearPaintCanvas}
                className="py-2.5 bg-gray-100 hover:bg-gray-200 active:scale-95 text-gray-700 font-black text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer"
              >
                🗑️ {language === 'es' ? 'Limpiar' : 'Clear'}
              </button>
              <button
                type="button"
                onClick={savePaintDrawing}
                className="py-2.5 bg-pink-500 hover:bg-pink-600 active:scale-95 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md transition-all cursor-pointer"
              >
                💾 {language === 'es' ? 'Guardar' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      </div>
    )}

    {/* Rules Compliance Delay Notification Modal */}
    {showRulesWaitingModal && (
      <div className="fixed inset-0 z-[150] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 select-none">
        <div className="bg-white border-4 border-black rounded-[2.5rem] w-full max-w-sm p-6 text-slate-900 flex flex-col items-center text-center shadow-2xl animate-in zoom-in-95">
          <div className="w-16 h-16 rounded-3xl bg-pink-50 border-2 border-pink-500 flex items-center justify-center text-pink-500 mb-4 animate-bounce">
            <span className="text-3xl">⏳</span>
          </div>
          <h2 className="text-sm font-black tracking-wider uppercase text-gray-900 mb-2">
            {language === 'es' ? 'Servidor Recibido' : 'Server Submitted'}
          </h2>
          <p className="text-xs text-gray-500 font-bold leading-relaxed mb-6 px-1">
            {language === 'es'
              ? 'Por favor espere hasta que un administrador confirme que el servidor cumple con las reglas para que aparezca en Descubrir.'
              : 'Please wait until an administrator confirms that the server complies with the rules to appear in Discover.'}
          </p>
          <button
            onClick={() => setShowRulesWaitingModal(false)}
            className="w-full py-3.5 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 active:scale-95 text-white font-black text-xs uppercase tracking-widest rounded-xl shadow-md transition-all cursor-pointer"
          >
            {language === 'es' ? 'Comprendido' : 'Got it'}
          </button>
        </div>
      </div>
    )}

    {/* Search Profile Viewer Modal */}
    {selectedUserProfile && (() => {
      const isOwn = selectedUserProfile && selectedUserProfile.name && selectedUserProfile.name.trim().toLowerCase() === playerName.trim().toLowerCase();
      const userHasCosmic = (selectedUserProfile.cosmicBgEnabled === true || (isOwn && cosmicBgEnabled)) && !(selectedUserProfile.lavaBgEnabled === true || (isOwn && lavaBgEnabled));
      const userHasLava = selectedUserProfile.lavaBgEnabled === true || (isOwn && lavaBgEnabled);
      const userHasCustomBg = userHasCosmic || userHasLava;
      return (
        <div className="fixed inset-0 z-[160] bg-black/80 backdrop-blur-lg flex items-center justify-center p-4">
          <div 
            className={`w-full max-w-[340px] rounded-[2.5rem] overflow-hidden transform transition-all p-7 relative animate-scale-up border-[6px] ${
              userHasLava
                ? 'bg-neutral-950 border-orange-500/40 text-white shadow-[0_0_50px_rgba(249,115,22,0.5)]'
                : userHasCosmic 
                  ? 'bg-slate-950 border-indigo-500/40 text-white shadow-[0_0_50px_rgba(99,102,241,0.5)]' 
                  : 'bg-white border-pink-200 text-slate-900 shadow-[0_24px_50px_rgba(219,39,119,0.25)]'
            }`}
            style={{
              boxShadow: userHasLava
                ? '0 24px 60px rgba(249, 115, 22, 0.45), inset 0 2px 4px rgba(255, 255, 255, 0.15)'
                : userHasCosmic 
                  ? '0 24px 60px rgba(99, 102, 241, 0.45), inset 0 2px 4px rgba(255, 255, 255, 0.15)' 
                  : '0 24px 60px rgba(219, 39, 119, 0.25), inset 0 2px 4px rgba(255, 255, 255, 0.5)'
            }}
          >
            {/* Elegant Moving Cosmic or Lava Background Stars & Particles Canvas Layer */}
            {userHasCosmic && <CosmicBackgroundCanvas />}
            {userHasLava && <LavaBackgroundCanvas />}

            {/* Profile Banner */}
            {(() => {
              const bannerType = selectedUserProfile.equippedBanner || (isOwn ? equippedBanner : 'default');
              if (bannerType === 'banner_cyberpunk') {
                return (
                  <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 z-0 overflow-hidden opacity-95">
                    <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:10px_10px]" />
                  </div>
                );
              } else if (bannerType === 'banner_fire') {
                return (
                  <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 z-0 overflow-hidden opacity-95 animate-pulse">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(251,146,60,0.4),transparent_60%)]" />
                  </div>
                );
              } else if (bannerType === 'banner_galaxy') {
                return (
                  <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-r from-indigo-950 via-purple-900 to-blue-900 z-0 overflow-hidden opacity-95">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.25)_0%,transparent_1px)] bg-[size:8px_8px]" />
                  </div>
                );
              } else if (bannerType === 'banner_gold') {
                return (
                  <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 z-0 overflow-hidden opacity-95">
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_45%,rgba(255,255,255,0.4)_50%,transparent_55%)] bg-[size:200%_100%] animate-[shimmer_3s_infinite_linear]" />
                  </div>
                );
              } else {
                return (
                  <div className={`absolute top-0 inset-x-0 h-28 z-0 ${userHasLava ? 'bg-orange-950/40' : userHasCosmic ? 'bg-indigo-950/40' : 'bg-slate-100'}`} />
                );
              }
            })()}

            {/* Header / Close Button */}
            <button 
              onClick={() => setSelectedUserProfile(null)}
              className={`absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center font-black text-sm cursor-pointer transition-transform active:scale-90 z-20 ${
                userHasCustomBg 
                  ? 'bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/50' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700'
              }`}
            >
              ✕
            </button>

            {/* Profile Content */}
            <div className="flex flex-col items-center text-center mt-14 relative z-10">
              
              {/* Dynamic Animated Avatar Frame */}
              <div className="relative mb-5">
                <div className={`p-1.5 rounded-[2rem] inline-block ${
                  userHasLava
                    ? 'bg-gradient-to-tr from-orange-500 via-red-500 to-yellow-500 shadow-[0_0_20px_rgba(249,115,22,0.4)] animate-[pulse_4s_infinite]'
                    : userHasCosmic 
                      ? 'bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 shadow-[0_0_20px_rgba(168,85,247,0.4)] animate-[pulse_4s_infinite]' 
                      : 'bg-gradient-to-tr from-pink-400 to-rose-400 shadow-md'
                }`}>
                  <div className={`rounded-[1.7rem] overflow-hidden ${userHasCustomBg ? 'bg-slate-900/90' : 'bg-white'}`}>
                    <PlayerAvatarPreview player={selectedUserProfile} />
                  </div>
                </div>
                {userHasCosmic && (
                  <span className="absolute -bottom-1 -right-1 bg-indigo-500 text-white rounded-full p-1 text-[10px] shadow-md border border-indigo-300 animate-bounce">
                    🌌
                  </span>
                )}
                {userHasLava && (
                  <span className="absolute -bottom-1 -right-1 bg-orange-500 text-white rounded-full p-1 text-[10px] shadow-md border border-orange-300 animate-bounce">
                    🔥
                  </span>
                )}
              </div>

              {/* Player Name & Badges */}
              <h3 className="text-2xl font-black tracking-tight flex items-center gap-1.5 justify-center flex-wrap relative z-10">
                <span className={userHasCustomBg ? 'text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]' : 'text-slate-900'}>
                  {selectedUserProfile.name}
                </span>
                {(() => {
                  const rankInfo = getPlayerRankInfo(selectedUserProfile);
                  return (
                    <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${
                      userHasLava && rankInfo.name.toLowerCase() === 'owner'
                        ? 'bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 text-white border border-orange-400/50'
                        : userHasCosmic && rankInfo.name.toLowerCase() === 'owner'
                          ? 'bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500 text-white border border-purple-400/50'
                          : rankInfo.bg
                    }`}>
                      {rankInfo.name}
                    </span>
                  );
                })()}
              </h3>

              {/* Status */}
              <p className="text-[10px] font-black mt-1.5 uppercase tracking-widest flex items-center gap-1 relative z-10">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block animate-ping" />
                <span className={userHasLava ? 'text-orange-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]' : userHasCosmic ? 'text-indigo-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]' : 'text-gray-400'}>
                  {language === 'es' ? 'En línea' : 'Online'}
                </span>
              </p>

              {/* Dividers */}
              <div className={`w-full h-px my-5 ${userHasLava ? 'bg-orange-500/20' : userHasCosmic ? 'bg-indigo-500/20' : 'bg-gray-100'}`} />

              {/* Stats Grid: Fanáticos & Amigos */}
              <div className="grid grid-cols-2 gap-4 w-full relative z-10">
                {/* Fanáticos Card */}
                <div className={`p-4 rounded-3xl flex flex-col items-center transition-all ${
                  userHasLava
                    ? 'bg-orange-950/45 border border-orange-500/35 backdrop-blur-md hover:border-orange-500/50 shadow-inner'
                    : userHasCosmic 
                      ? 'bg-indigo-950/45 border border-indigo-500/35 backdrop-blur-md hover:border-indigo-500/50 shadow-inner' 
                      : 'bg-pink-50/60 border border-pink-100/50 hover:bg-pink-50/90'
                }`}>
                  <span className="text-2xl mb-1 filter drop-shadow-md select-none transform hover:scale-110 transition-transform">⭐</span>
                  <span className={`text-[10px] font-black uppercase tracking-widest leading-none ${
                    userHasLava ? 'text-orange-300' : userHasCosmic ? 'text-indigo-300' : 'text-pink-500'
                  }`}>
                    {language === 'es' ? 'Fanáticos' : 'Fans'}
                  </span>
                  <span className={`text-xl font-black mt-1.5 ${userHasLava ? 'text-orange-200' : userHasCosmic ? 'text-indigo-200' : 'text-pink-600'}`}>
                    {selectedUserProfile.fans || 0}
                  </span>
                </div>

                {/* Amigos Card */}
                <div className={`p-4 rounded-3xl flex flex-col items-center transition-all ${
                  userHasLava
                    ? 'bg-orange-950/45 border border-orange-500/35 backdrop-blur-md hover:border-orange-500/50 shadow-inner'
                    : userHasCosmic 
                      ? 'bg-indigo-950/45 border border-indigo-500/35 backdrop-blur-md hover:border-indigo-500/50 shadow-inner' 
                      : 'bg-emerald-50/60 border border-emerald-100/50 hover:bg-emerald-50/90'
                }`}>
                  <span className="text-2xl mb-1 filter drop-shadow-md select-none transform hover:scale-110 transition-transform">🤝</span>
                  <span className={`text-[10px] font-black uppercase tracking-widest leading-none ${
                    userHasLava ? 'text-orange-300' : userHasCosmic ? 'text-indigo-300' : 'text-emerald-500'
                  }`}>
                    {language === 'es' ? 'Amigos' : 'Friends'}
                  </span>
                  <span className={`text-xl font-black mt-1.5 ${userHasLava ? 'text-orange-200' : userHasCosmic ? 'text-indigo-200' : 'text-emerald-600'}`}>
                    {selectedUserProfile.friends || 0}
                  </span>
                </div>
              </div>

              {/* Extra Info: Balance/Money only shown if viewing own profile */}
              {selectedUserProfile && selectedUserProfile.name && selectedUserProfile.name.trim().toLowerCase() === playerName.trim().toLowerCase() && (
                <div className={`mt-5 rounded-full px-4 py-2 flex items-center gap-2 shadow-xs text-xs font-black ${
                  userHasLava
                    ? 'bg-emerald-500/15 border border-emerald-500/40 text-emerald-300'
                    : userHasCosmic 
                      ? 'bg-emerald-500/15 border border-emerald-500/40 text-emerald-300' 
                      : 'bg-emerald-50/60 border border-emerald-200/60 text-emerald-700'
                }`}>
                  <PixelGreenCoin />
                  <span>{selectedUserProfile.money ? selectedUserProfile.money.toLocaleString() : '0'}</span>
                </div>
              )}

              {/* Friend Request & Admire Buttons */}
              <div className="grid grid-cols-2 gap-2.5 w-full mt-5 relative z-10">
                <button
                  disabled={isOwn}
                  onClick={() => {
                    if (!isOwn) {
                      try {
                        const priv = JSON.parse(localStorage.getItem('gorebox_key_private_state') || '{}');
                        priv.friendRequested = priv.friendRequested || {};
                        priv.friendRequested[selectedUserProfile.name] = true;
                        localStorage.setItem('gorebox_key_private_state', JSON.stringify(priv));
                      } catch {}
                      alert(language === 'es' ? '¡Solicitud de amistad enviada y guardada en key-private!' : 'Friend request sent and saved to key-private!');
                    }
                  }}
                  className={`py-3 px-3 rounded-2xl font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                    isOwn
                      ? 'bg-gray-200 text-gray-400 border border-gray-300 opacity-50 cursor-not-allowed pointer-events-none'
                      : userHasLava
                        ? 'bg-orange-600 hover:bg-orange-700 text-white border border-orange-500/50 shadow-md active:scale-95 cursor-pointer'
                        : userHasCosmic
                          ? 'bg-indigo-600 hover:bg-indigo-700 text-white border border-indigo-500/50 shadow-md active:scale-95 cursor-pointer'
                          : 'bg-pink-500 hover:bg-pink-600 text-white shadow-md active:scale-95 cursor-pointer'
                  }`}
                >
                  <span>🤝</span>
                  <span>{language === 'es' ? 'Pedir Amistad' : 'Add Friend'}</span>
                </button>

                <button
                  disabled={isOwn}
                  onClick={() => {
                    if (!isOwn) {
                      try {
                        const priv = JSON.parse(localStorage.getItem('gorebox_key_private_state') || '{}');
                        priv.admired = priv.admired || {};
                        priv.admired[selectedUserProfile.name] = true;
                        localStorage.setItem('gorebox_key_private_state', JSON.stringify(priv));
                      } catch {}
                      alert(language === 'es' ? '¡Ahora eres admirador y se guardó en key-private!' : 'You are now admiring and saved to key-private!');
                    }
                  }}
                  className={`py-3 px-3 rounded-2xl font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                    isOwn
                      ? 'bg-gray-200 text-gray-400 border border-gray-300 opacity-50 cursor-not-allowed pointer-events-none'
                      : userHasLava
                        ? 'bg-red-600 hover:bg-red-700 text-white border border-red-500/50 shadow-md active:scale-95 cursor-pointer'
                        : userHasCosmic
                          ? 'bg-pink-600 hover:bg-pink-700 text-white border border-pink-500/50 shadow-md active:scale-95 cursor-pointer'
                          : 'bg-pink-500 hover:bg-pink-600 text-white shadow-md active:scale-95 cursor-pointer'
                  }`}
                >
                  <span>⭐</span>
                  <span>{language === 'es' ? 'Admirar' : 'Admire'}</span>
                </button>
              </div>

              {/* Action Button */}
              <button 
                onClick={() => setSelectedUserProfile(null)}
                className={`w-full mt-6 py-3 text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-lg active:scale-95 transition-transform cursor-pointer relative z-10 ${
                  userHasLava
                    ? 'bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 hover:from-orange-600 hover:via-red-600 hover:to-yellow-600 shadow-orange-500/35 border border-orange-400/30'
                    : userHasCosmic
                      ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 shadow-indigo-500/35 border border-indigo-400/30'
                      : 'bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 shadow-pink-500/20'
                }`}
              >
                {language === 'es' ? 'Cerrar Perfil' : 'Close Profile'}
              </button>

            </div>
          </div>
        </div>
      );
    })()}
    </>
  );
};
