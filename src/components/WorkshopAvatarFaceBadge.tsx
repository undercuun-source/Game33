import React from 'react';

export interface WorkshopAvatarFaceBadgeProps {
  className?: string;
  skinColorHex?: number;
  shirtColorHex?: number;
  faceFeatureMode?: string;
  hasShirt?: boolean;
  showFocusReticle?: boolean;
}

export const WorkshopAvatarFaceBadge: React.FC<WorkshopAvatarFaceBadgeProps> = ({
  className = "w-7 h-7",
  skinColorHex = 0xe0a96d,
  shirtColorHex = 0x38bdf8,
  faceFeatureMode = 'classic',
  hasShirt = true,
  showFocusReticle = true,
}) => {
  const skinColor = '#' + (skinColorHex || 0xe0a96d).toString(16).padStart(6, '0');
  const shirtColor = '#' + (shirtColorHex || 0x38bdf8).toString(16).padStart(6, '0');

  // Eyes and mouth elements depending on faceFeatureMode
  const renderFaceFeatures = () => {
    switch (faceFeatureMode) {
      case 'anime':
        return (
          <>
            {/* Glossy Anime Eyes */}
            <rect x="20" y="24" width="7" height="10" rx="3.5" fill="#ec4899" />
            <rect x="37" y="24" width="7" height="10" rx="3.5" fill="#ec4899" />
            <circle cx="22" cy="27" r="1.8" fill="#ffffff" />
            <circle cx="39" cy="27" r="1.8" fill="#ffffff" />
            <circle cx="24" cy="31" r="1" fill="#ffffff" opacity="0.8" />
            <circle cx="41" cy="31" r="1" fill="#ffffff" opacity="0.8" />
            {/* Cute Pink Blush */}
            <rect x="17" y="33" width="5" height="2" rx="1" fill="#f472b6" opacity="0.8" />
            <rect x="42" y="33" width="5" height="2" rx="1" fill="#f472b6" opacity="0.8" />
            {/* Happy anime mouth */}
            <path d="M28 36 C30 39, 34 39, 36 36" stroke="#000000" strokeWidth="2" strokeLinecap="round" fill="none" />
          </>
        );
      case 'angry':
        return (
          <>
            {/* Angled Eyebrows */}
            <path d="M19 22 L28 26" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M45 22 L36 26" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" />
            {/* Focused Eyes */}
            <rect x="22" y="27" width="5" height="5" rx="1" fill="#000000" />
            <rect x="37" y="27" width="5" height="5" rx="1" fill="#000000" />
            {/* Frowning mouth */}
            <path d="M26 38 C29 35, 35 35, 38 38" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </>
        );
      case 'cool':
        return (
          <>
            {/* Sunglasses */}
            <path d="M16 25 H48 V32 C48 34, 40 36, 37 32 H27 C24 36, 16 34, 16 32 Z" fill="#0f172a" stroke="#000000" strokeWidth="1" />
            <path d="M18 26 L26 31" stroke="#ffffff" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
            <path d="M39 26 L45 31" stroke="#ffffff" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
            {/* Cool Smirk */}
            <path d="M28 37 Q34 38 37 35" stroke="#000000" strokeWidth="2" strokeLinecap="round" fill="none" />
          </>
        );
      case 'creepy':
        return (
          <>
            {/* Red Pupils */}
            <rect x="21" y="25" width="6" height="6" rx="1" fill="#ef4444" />
            <rect x="37" y="25" width="6" height="6" rx="1" fill="#ef4444" />
            <circle cx="24" cy="28" r="1" fill="#000000" />
            <circle cx="40" cy="28" r="1" fill="#000000" />
            {/* Creepy Mouth */}
            <path d="M24 35 H40 V40 H24 Z" fill="#000000" />
            <path d="M26 35 L28 38 L30 35 M34 35 L36 38 L38 35" fill="#ffffff" />
          </>
        );
      case 'classic':
      default:
        return (
          <>
            {/* Classic Voxel Blocky Eyes */}
            <rect x="21" y="25" width="5" height="5" rx="1" fill="#000000" />
            <rect x="38" y="25" width="5" height="5" rx="1" fill="#000000" />
            <rect x="23" y="26" width="1.5" height="1.5" fill="#ffffff" opacity="0.7" />
            <rect x="40" y="26" width="1.5" height="1.5" fill="#ffffff" opacity="0.7" />
            {/* Smile */}
            <path d="M25 36 C28 39, 36 39, 39 36" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </>
        );
    }
  };

  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
      <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] select-none pointer-events-none" fill="none">
        <defs>
          <linearGradient id="badgeBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="50%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#c084fc" />
          </linearGradient>
          <linearGradient id="headGloss" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.15" />
          </linearGradient>
        </defs>

        {/* Outer Circular Badge Background */}
        <circle cx="32" cy="32" r="30" fill="url(#badgeBgGrad)" stroke="#ffffff" strokeWidth="2" />

        {/* Shirt / Neck Base at bottom */}
        {hasShirt && (
          <path d="M18 56 C18 46, 46 46, 46 56 V62 H18 Z" fill={shirtColor} stroke="#0f172a" strokeWidth="1.5" />
        )}

        {/* Neck */}
        <rect x="27" y="42" width="10" height="7" rx="2" fill={skinColor} stroke="#0f172a" strokeWidth="1" />

        {/* Character Head (Focused close up on Face) */}
        <rect x="14" y="14" width="36" height="32" rx="8" fill={skinColor} stroke="#0f172a" strokeWidth="2" />
        {/* Glossy top lighting on head */}
        <rect x="14" y="14" width="36" height="32" rx="8" fill="url(#headGloss)" />

        {/* Hair Cap Top */}
        <path d="M14 20 C14 14, 50 14, 50 20 C48 16, 16 16, 14 20 Z" fill="#1e293b" />

        {/* Render Face Features */}
        {renderFaceFeatures()}

        {/* Camera Viewfinder Focus Reticle Overlay ("[  ]" framing face) */}
        {showFocusReticle && (
          <g stroke="#38bdf8" strokeWidth="1.8" strokeLinecap="round" opacity="0.95">
            {/* Top-Left Corner */}
            <path d="M10 18 H15 M10 18 V23" />
            {/* Top-Right Corner */}
            <path d="M54 18 H49 M54 18 V23" />
            {/* Bottom-Left Corner */}
            <path d="M10 46 H15 M10 46 V41" />
            {/* Bottom-Right Corner */}
            <path d="M54 46 H49 M54 46 V41" />
            {/* Central Focus Dot */}
            <circle cx="32" cy="30" r="1" fill="#38bdf8" stroke="none" opacity="0.6" />
          </g>
        )}
      </svg>
    </div>
  );
};
