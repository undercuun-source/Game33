import React, { useState } from 'react';
import {
  Shirt,
  Sparkles,
  X,
  Palette,
  Eye,
  User,
  Sliders,
  Check,
  Layers,
  Flame,
  Droplets,
  RotateCw,
  Camera,
  Heart,
  Smile,
  Maximize2,
  Globe,
  Dices,
} from 'lucide-react';
import { FaceFeatureMode, ShirtStyle } from '../types/physics3d';

export const MuscleIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 4C10 4 8.5 5.5 8 7C6.5 7.2 5 8.5 5 10.5C5 12 6 13 7.5 13.5L8.5 18C8.8 19.5 10 20.5 11.5 20.5H16.5C18 20.5 19.2 19.3 19.5 17.8L20 15C20.5 12 18.5 9 15.5 8.5C14.5 8.3 13.5 7 13 5.5C12.8 4.6 12.5 4 12 4Z" fill="currentColor" fillOpacity="0.3" />
    <path d="M11 8.5C12.5 8.5 14 9.5 14.5 11" />
    <path d="M7.5 13.5C8.5 14.5 10 15 12 15" />
  </svg>
);

interface AvatarEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  isWorkshopMode?: boolean;

  // 3D In-Frame Camera Angle Controls
  previewAngle?: 'front' | 'side' | 'back' | 'face';
  onSetPreviewAngle?: (angle: 'front' | 'side' | 'back' | 'face') => void;
  previewDistance?: number;
  onSetPreviewDistance?: (dist: number) => void;

  // In-game camera controls for focusing character in the live game
  onRotateCameraToFront?: () => void;
  onRotateCameraToBack?: () => void;
  onRotateCameraToSide?: () => void;
  onFocusCameraOnPlayer?: () => void;

  // Fluid & Erection triggers
  isFluidEmitting?: boolean;
  onTogglePlayerFluidEmission?: () => void;
  onTriggerPlayerFluidBurst?: () => void;
  onTriggerErection?: () => void;

  // Face & 3D Eyes props
  faceFeatureMode?: FaceFeatureMode;
  faceFloatDepth?: number;
  eyeHolesEnabled?: boolean;
  onFaceFeatureModeChange?: (mode: FaceFeatureMode) => void;
  onFaceFloatDepthChange?: (depth: number) => void;
  onToggleEyeHoles?: (enabled: boolean) => void;

  // Shirt props
  hasShirt: boolean;
  shirtColorHex: number;
  shirtCoverageLevel?: number;
  shirtStyle?: ShirtStyle;
  shirtSecondaryColorHex?: number;
  onToggleShirt: (enabled: boolean) => void;
  onShirtColorChange: (color: number) => void;
  onShirtCoverageLevelChange?: (level: number) => void;
  onShirtStyleChange?: (style: ShirtStyle) => void;
  onShirtSecondaryColorChange?: (color: number) => void;

  // Pants props
  hasPants?: boolean;
  pantsColorHex: number;
  pantsCoverageLevel?: number;
  pantsStyle?: 'solid' | 'stripes' | 'camo' | 'jeans' | 'sweatpants' | 'cargo';
  pantsSecondaryColorHex?: number;
  onTogglePants?: (enabled: boolean) => void;
  onPantsColorChange: (color: number) => void;
  onPantsCoverageLevelChange?: (level: number) => void;
  onPantsStyleChange?: (style: 'solid' | 'stripes' | 'camo' | 'jeans' | 'sweatpants' | 'cargo') => void;
  onPantsSecondaryColorChange?: (color: number) => void;

  // Underwear props
  hasUnderwear?: boolean;
  underwearColorHex?: number;
  onToggleUnderwear?: (enabled: boolean) => void;
  onUnderwearColorChange?: (color: number) => void;

  // Gloves props
  hasGloves?: boolean;
  glovesColorHex?: number;
  glovesCoverageLevel?: number;
  glovesStyle?: 'solid' | 'stripes' | 'camo' | 'tactical' | 'fingerless' | 'leather';
  glovesSecondaryColorHex?: number;
  onToggleGloves?: (enabled: boolean) => void;
  onGlovesColorChange?: (color: number) => void;
  onGlovesCoverageLevelChange?: (level: number) => void;
  onGlovesStyleChange?: (style: 'solid' | 'stripes' | 'camo' | 'tactical' | 'fingerless' | 'leather') => void;
  onGlovesSecondaryColorChange?: (color: number) => void;

  // Boots props
  hasBoots?: boolean;
  bootsColorHex?: number;
  onToggleBoots?: (enabled: boolean) => void;
  onBootsColorChange?: (color: number) => void;

  // Socks props
  hasSocks?: boolean;
  socksColorHex?: number;
  onToggleSocks?: (enabled: boolean) => void;
  onSocksColorChange?: (color: number) => void;

  // Skin props
  skinColorHex: number;
  onSkinColorChange: (color: number) => void;

  // Joint / Contour style
  contourJointStyle: 'pseudo3d' | 'blocky' | 'cylinder';
  contourLevel: number;
  contourEnabled: boolean;
  onContourJointStyleChange: (style: 'pseudo3d' | 'blocky' | 'cylinder') => void;
  onContourLevelChange: (level: number) => void;
  onToggleContour: (enabled: boolean) => void;

  // Anatomy props
  hasBustAndGlutes: boolean;
  onToggleBustAndGlutes: (enabled: boolean) => void;
  genitalType?: 'none' | 'male' | 'female';
  onGenitalTypeChange?: (type: 'none' | 'male' | 'female') => void;
  genitalMShaftLength?: number;
  onGenitalMShaftLengthChange?: (val: number) => void;
  genitalMShaftThickness?: number;
  onGenitalMShaftThicknessChange?: (val: number) => void;
  genitalMPinkSize?: number;
  onGenitalMPinkSizeChange?: (val: number) => void;
  genitalFSize?: number;
  onGenitalFSizeChange?: (val: number) => void;

  // Density props
  voxelDensity?: number;
  onVoxelDensityChange?: (val: number) => void;
  voxelShape?: 'cube' | 'sphere';
  onVoxelShapeChange?: (shape: 'cube' | 'sphere') => void;
  onSpawnPaloRod?: () => void;

  // Hair & Accessories props
  hairType?: string;
  hairColorHex?: number;
  onHairTypeChange?: (type: string) => void;
  onHairColorChange?: (color: number) => void;
  beardType?: string;
  beardColorHex?: number;
  onBeardTypeChange?: (type: string) => void;
  onBeardColorChange?: (color: number) => void;
  hatType?: string;
  hatColorHex?: number;
  onHatTypeChange?: (type: string) => void;
  onHatColorChange?: (color: number) => void;
  glassesType?: string;
  glassesColorHex?: number;
  onGlassesTypeChange?: (type: string) => void;
  onGlassesColorChange?: (color: number) => void;

  // Pubic hair options
  pubicHairEnabled?: boolean;
  onPubicHairEnabledChange?: (enabled: boolean) => void;
  pubicHairIntensity?: number;
  onPubicHairIntensityChange?: (val: number) => void;

  // Cubicity & Limb size props
  bodyCubicity?: number;
  onBodyCubicityChange?: (val: number) => void;
  limbSizeMultiplier?: number;
  onLimbSizeMultiplierChange?: (val: number) => void;

  onOpenMainMenu?: () => void;
  onUpdateSpecificLimbWidth?: (partName: string, mult: number) => void;
  limbScreenPositions?: Record<string, { top: string; left: string }>;
  onToggleMuscleOverlay?: (active: boolean) => void;
  isSymmetricAdjustment?: boolean;
  onToggleSymmetry?: () => void;
  initialTab?: 'clothing' | 'accessories' | 'contour' | 'anatomy' | 'face';
}

const SKIN_PALETTE = [
  { name: 'Pálido', hex: 0xfde2d9 },
  { name: 'Claro', hex: 0xfbcfe8 },
  { name: 'Melocotón', hex: 0xf5d0b5 },
  { name: 'Bronceado', hex: 0xd4a373 },
  { name: 'Moreno', hex: 0x9c6644 },
  { name: 'Oscuro', hex: 0x582f0e },
  { name: 'Anime Pink', hex: 0xf472b6 },
  { name: 'Cian Pálido', hex: 0xa5f3fc },
  { name: 'Gris Cadáver', hex: 0xcbd5e1 },
  { name: 'Gótico Nocturno', hex: 0x334155 },
];

const CLOTHING_PALETTE = [
  { name: 'Blanco Puro', hex: 0xffffff },
  { name: 'Negro Táctico', hex: 0x111827 },
  { name: 'Rojo Carmesí', hex: 0x991b1b },
  { name: 'Azul Medianoche', hex: 0x1e3a8a },
  { name: 'Cian Militar', hex: 0x0891b2 },
  { name: 'Verde Oliva', hex: 0x3f6212 },
  { name: 'Gris Carbón', hex: 0x374151 },
  { name: 'Marrón Cuero', hex: 0x78350f },
  { name: 'Ocre Seco', hex: 0xca8a04 },
  { name: 'Púrpura Oscuro', hex: 0x581c87 },
  { name: 'Rosa Ceniza', hex: 0xda70d6 },
  { name: 'Verde Bosque', hex: 0x064e3b },
  { name: 'Gris Plomo', hex: 0x64748b },
  { name: 'Rojo Sangre', hex: 0x7f1d1d },
];

const LimbWidthPointHandle: React.FC<{
  limbKey: string;
  label: string;
  top: string;
  left: string;
  currentVal: number;
  onChange: (key: string, val: number) => void;
}> = ({ limbKey, label, top, left, currentVal, onChange }) => {
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = React.useRef<number>(0);
  const startValRef = React.useRef<number>(1.0);

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch (err) {}
    setIsDragging(true);
    startXRef.current = e.clientX;
    startValRef.current = currentVal;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startXRef.current;
    const sensitivity = 0.008;
    const newVal = Math.max(0.45, Math.min(3.0, startValRef.current + deltaX * sensitivity));
    onChange(limbKey, newVal);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isDragging) {
      try {
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      } catch (err) {}
      setIsDragging(false);
    }
  };

  return (
    <div
      style={{ top, left }}
      className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto flex items-center justify-center group z-30 select-none transition-all duration-75"
    >
      {/* Indicador HUD de músculo: Punto con línea corta semitransparente */}
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="relative flex items-center justify-center p-2 cursor-ew-resize select-none touch-none group"
        title={`${label} (${currentVal.toFixed(2)}x)`}
      >
        {/* Línea corta semitransparente */}
        <div className={`w-6 h-[1.5px] rounded-full transition-all duration-150 ${
          isDragging
            ? 'bg-amber-300 shadow-sm shadow-amber-400 opacity-95'
            : 'bg-amber-300/40 group-hover:bg-amber-300/80 opacity-60 group-hover:opacity-100'
        }`} />

        {/* Punto central (Dot) */}
        <div className={`absolute w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-150 ${
          isDragging
            ? 'bg-amber-300 ring-4 ring-amber-400/80 scale-125 shadow-md shadow-amber-400'
            : 'bg-amber-400 ring-2 ring-amber-300/60 group-hover:ring-amber-200 group-hover:scale-120 shadow-sm shadow-amber-500/50'
        }`} />
      </div>
    </div>
  );
};

export const AvatarEditorModal: React.FC<AvatarEditorModalProps> = ({
  isOpen,
  onClose,
  isWorkshopMode = false,
  onRotateCameraToFront,
  onRotateCameraToBack,
  onRotateCameraToSide,
  onFocusCameraOnPlayer,
  isFluidEmitting = false,
  onTogglePlayerFluidEmission,
  onTriggerPlayerFluidBurst,
  onTriggerErection,
  faceFeatureMode = 'anime_canvas',
  faceFloatDepth = 0.002,
  eyeHolesEnabled = true,
  onFaceFeatureModeChange,
  onFaceFloatDepthChange,
  onToggleEyeHoles,
  hasShirt,
  shirtColorHex,
  shirtCoverageLevel = 6,
  shirtStyle = 'solid',
  shirtSecondaryColorHex = 0x1e293b,
  onToggleShirt,
  onShirtColorChange,
  onShirtCoverageLevelChange,
  onShirtStyleChange,
  onShirtSecondaryColorChange,
  hasPants = true,
  pantsColorHex,
  pantsCoverageLevel = 5,
  pantsStyle = 'solid',
  pantsSecondaryColorHex = 0x0f172a,
  onTogglePants,
  onPantsColorChange,
  onPantsCoverageLevelChange,
  onPantsStyleChange,
  onPantsSecondaryColorChange,
  hasUnderwear = true,
  underwearColorHex = 0xffffff,
  onToggleUnderwear,
  onUnderwearColorChange,
  hasGloves = false,
  glovesColorHex = 0x111827,
  glovesCoverageLevel = 4,
  glovesStyle = 'solid',
  glovesSecondaryColorHex = 0x334155,
  onToggleGloves,
  onGlovesColorChange,
  onGlovesCoverageLevelChange,
  onGlovesStyleChange,
  onGlovesSecondaryColorChange,
  hasBoots = true,
  bootsColorHex = 0x111827,
  onToggleBoots,
  onBootsColorChange,
  hasSocks = false,
  socksColorHex = 0xffffff,
  onToggleSocks,
  onSocksColorChange,
  skinColorHex,
  onSkinColorChange,
  contourJointStyle,
  contourLevel,
  contourEnabled,
  onContourJointStyleChange,
  onContourLevelChange,
  onToggleContour,
  hasBustAndGlutes,
  onToggleBustAndGlutes,
  genitalType = 'none',
  onGenitalTypeChange,
  genitalMShaftLength = 0.16,
  onGenitalMShaftLengthChange,
  genitalMShaftThickness = 0.045,
  onGenitalMShaftThicknessChange,
  genitalMPinkSize = 1.0,
  onGenitalMPinkSizeChange,
  genitalFSize = 0.08,
  onGenitalFSizeChange,
  voxelDensity = 1.0,
  onVoxelDensityChange,
  voxelShape = 'cube',
  onVoxelShapeChange,
  hairType = 'none',
  hairColorHex = 0x1c1917,
  onHairTypeChange,
  onHairColorChange,
  beardType = 'none',
  beardColorHex = 0x1c1917,
  onBeardTypeChange,
  onBeardColorChange,
  hatType = 'none',
  hatColorHex = 0x111827,
  onHatTypeChange,
  onHatColorChange,
  glassesType = 'none',
  glassesColorHex = 0x111827,
  onGlassesTypeChange,
  onGlassesColorChange,
  previewAngle = 'back',
  onSetPreviewAngle,
  previewDistance = 4.2,
  onSetPreviewDistance,
  pubicHairEnabled = false,
  onPubicHairEnabledChange,
  pubicHairIntensity = 0.5,
  onPubicHairIntensityChange,
  bodyCubicity = 1.0,
  onBodyCubicityChange,
  limbSizeMultiplier = 1.0,
  onLimbSizeMultiplierChange,
  onOpenMainMenu,
  onUpdateSpecificLimbWidth,
  limbScreenPositions,
  onToggleMuscleOverlay,
  isSymmetricAdjustment = true,
  onToggleSymmetry,
  initialTab,
}) => {
  const [tab, setTab] = useState<'clothing' | 'accessories' | 'contour' | 'anatomy' | 'face'>(
    initialTab || (previewAngle === 'face' ? 'face' : 'clothing')
  );

  React.useEffect(() => {
    if (isOpen) {
      if (previewAngle === 'face') {
        setTab('face');
      } else if (initialTab) {
        setTab(initialTab);
      }
    }
  }, [isOpen, previewAngle, initialTab]);
  const [clothingCategory, setClothingCategory] = useState<'shirt' | 'pants' | 'gloves' | 'skin'>('shirt');
  const [showLimbOverlay, setShowLimbOverlay] = useState<boolean>(false);

  const handleToggleMuscle = () => {
    const next = !showLimbOverlay;
    setShowLimbOverlay(next);
    if (next) {
      setTab('contour');
    }
    onToggleMuscleOverlay?.(next);
  };
  const [limbWidths, setLimbWidths] = useState<Record<string, number>>({
    cabeza: 1.0,
    cuello: 1.0,
    hombro_izq: 1.0,
    hombro_der: 1.0,
    brazo_izq: 1.0,
    brazo_der: 1.0,
    codo_izq: 1.0,
    codo_der: 1.0,
    antebrazo_izq: 1.0,
    antebrazo_der: 1.0,
    muneca_izq: 1.0,
    muneca_der: 1.0,
    mano_izq: 1.0,
    mano_der: 1.0,
    muslo_izq: 1.0,
    muslo_der: 1.0,
    rodilla_izq: 1.0,
    rodilla_der: 1.0,
    antepierna_izq: 1.0,
    antepierna_der: 1.0,
    tobillo_izq: 1.0,
    tobillo_der: 1.0,
    pie_izq: 1.0,
    pie_der: 1.0,
    pechobase: 1.0,
    torso: 1.0,
    ombligo: 1.0,
    pelvis: 1.0,
  });

  const handleLimbWidthChange = (key: string, newVal: number) => {
    const clamped = Math.min(3.0, Math.max(0.45, Number(newVal.toFixed(2))));
    setLimbWidths((prev) => ({
      ...prev,
      [key]: clamped,
    }));
    onUpdateSpecificLimbWidth?.(key, clamped);
  };

  const handleRandomizeAvatar = () => {
    // 1. Skin
    const randomSkin = SKIN_PALETTE[Math.floor(Math.random() * SKIN_PALETTE.length)].hex;
    onSkinColorChange(randomSkin);

    // 2. Gender & Anatomy
    const isFemale = Math.random() < 0.5;
    onToggleBustAndGlutes(isFemale);
    if (isFemale) {
      const gType = Math.random() < 0.6 ? 'female' : 'none';
      onGenitalTypeChange?.(gType);
      onGenitalFSizeChange?.(Number((0.8 + Math.random() * 0.6).toFixed(2)));
    } else {
      const gType = Math.random() < 0.6 ? 'male' : 'none';
      onGenitalTypeChange?.(gType);
      onGenitalMShaftLengthChange?.(Number((0.12 + Math.random() * 0.10).toFixed(2)));
      onGenitalMShaftThicknessChange?.(Number((0.035 + Math.random() * 0.025).toFixed(3)));
      onGenitalMPinkSizeChange?.(Number((0.8 + Math.random() * 0.5).toFixed(2)));
    }

    // 3. Clothing
    const hasS = Math.random() < 0.85;
    const randomShirtCol = CLOTHING_PALETTE[Math.floor(Math.random() * CLOTHING_PALETTE.length)].hex;
    onToggleShirt(hasS);
    onShirtColorChange(randomShirtCol);

    const hasP = Math.random() < 0.90;
    const randomPantsCol = CLOTHING_PALETTE[Math.floor(Math.random() * CLOTHING_PALETTE.length)].hex;
    onTogglePants?.(hasP);
    onPantsColorChange(randomPantsCol);

    const randomUnderwearCol = CLOTHING_PALETTE[Math.floor(Math.random() * CLOTHING_PALETTE.length)].hex;
    onUnderwearColorChange?.(randomUnderwearCol);

    const randomBootsCol = CLOTHING_PALETTE[Math.floor(Math.random() * CLOTHING_PALETTE.length)].hex;
    onBootsColorChange?.(randomBootsCol);

    // 4. Hair & Accessories
    const hairOptions = ['none', 'short', 'long', 'spiky', 'anime', 'curly', 'mohawk', 'ponytail', 'bun'];
    const randomHair = hairOptions[Math.floor(Math.random() * hairOptions.length)];
    const randomHairCol = CLOTHING_PALETTE[Math.floor(Math.random() * CLOTHING_PALETTE.length)].hex;
    onHairTypeChange?.(randomHair);
    onHairColorChange?.(randomHairCol);

    if (isFemale) {
      onBeardTypeChange?.('none');
    } else {
      const beardOptions = ['none', 'stubble', 'full', 'mustache', 'goatee'];
      const randomBeard = beardOptions[Math.floor(Math.random() * beardOptions.length)];
      onBeardTypeChange?.(randomBeard);
      onBeardColorChange?.(randomHairCol);
    }

    const hatOptions = ['none', 'none', 'cap', 'police', 'military', 'cowboy', 'beanie', 'flower_pink'];
    const randomHat = hatOptions[Math.floor(Math.random() * hatOptions.length)];
    const randomHatCol = CLOTHING_PALETTE[Math.floor(Math.random() * CLOTHING_PALETTE.length)].hex;
    onHatTypeChange?.(randomHat);
    onHatColorChange?.(randomHatCol);

    const glassesOptions = ['none', 'none', 'sunglasses', 'normal', 'tactical', 'cyberpunk'];
    const randomGlasses = glassesOptions[Math.floor(Math.random() * glassesOptions.length)];
    const randomGlassesCol = CLOTHING_PALETTE[Math.floor(Math.random() * CLOTHING_PALETTE.length)].hex;
    onGlassesTypeChange?.(randomGlasses);
    onGlassesColorChange?.(randomGlassesCol);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none flex justify-end p-3 sm:p-5">
      {/* Floating Modern Editor HUD Panel on the Right */}
      <div 
        id="avatar-editor-floating-panel"
        className="pointer-events-auto w-full max-w-[460px] h-full max-h-[96vh] flex flex-col rounded-3xl border border-slate-700/60 shadow-2xl shadow-black/80 overflow-hidden animate-in fade-in slide-in-from-right-8 duration-200"
      >
        {/* Header with Close */}
        <div className="flex items-center justify-between px-5 py-3 bg-gradient-to-r from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl border-b border-slate-700/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center shadow-sm bg-pink-500/20 border border-pink-500/40 text-pink-400">
              <User className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-black text-white tracking-wide">
                  Editor de Avatar
                </h2>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleRandomizeAvatar}
              className="px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-extrabold text-[11px] flex items-center gap-1.5 shadow-md shadow-purple-900/40 border border-purple-400/40 transition-all cursor-pointer active:scale-95"
              title="Generar avatar aleatorio con todos los estilos, prendas y anatomía"
            >
              <Dices className="w-3.5 h-3.5" />
              <span>Aleatorio</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center border border-slate-700 transition-all cursor-pointer active:scale-95"
              title="Cerrar Editor"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Cuadro de Vista Previa 3D Directo al Personaje (Cuerpo Completo & Rostro) */}
        <div className="p-3 border-b flex flex-col gap-2 relative bg-slate-950/30 border-slate-800/80">
          <div
            id="avatar-3d-preview-viewport"
            onWheel={(e) => {
              e.stopPropagation();
              onSetPreviewDistance?.(Math.min(6.0, Math.max(1.2, previewDistance + (e.deltaY > 0 ? 0.3 : -0.3))));
            }}
            className="relative w-full h-56 sm:h-64 rounded-2xl border-2 overflow-hidden shadow-lg select-none bg-transparent border-sky-400/70 shadow-sky-950/40"
          >
            {/* Viewfinder Corners */}
            <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 pointer-events-none border-sky-400" />
            <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 pointer-events-none border-sky-400" />
            <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 pointer-events-none border-sky-400" />
            <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 pointer-events-none border-sky-400" />

            {/* Muscle & Symmetry Overlay Controls (Botones cuadrados con emojis creados por ti) */}
            <div className="absolute top-2 left-2 z-20 pointer-events-auto flex items-center gap-2">
              <button
                type="button"
                onClick={handleToggleMuscle}
                className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl border backdrop-blur-md transition-all cursor-pointer active:scale-95 shadow-xl flex flex-col items-center justify-center p-1 ${
                  showLimbOverlay
                    ? 'bg-amber-500 text-white border-amber-300 ring-2 ring-amber-400/80 shadow-amber-500/50 scale-105'
                    : 'bg-slate-900/90 hover:bg-slate-800 text-amber-300 border-amber-500/60'
                }`}
                title="Mostrar / Ocultar Controles de Músculo por Extremidad"
              >
                <span className="text-base sm:text-lg leading-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">💪</span>
                <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-tight mt-0.5">Músculo</span>
              </button>

              <button
                type="button"
                onClick={onToggleSymmetry}
                className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl border backdrop-blur-md transition-all cursor-pointer active:scale-95 shadow-xl flex flex-col items-center justify-center p-1 ${
                  isSymmetricAdjustment
                    ? 'bg-cyan-600 text-white border-cyan-300 ring-2 ring-cyan-400/80 shadow-cyan-500/50 scale-105'
                    : 'bg-slate-900/90 hover:bg-slate-800 text-cyan-300 border-cyan-500/60'
                }`}
                title={
                  isSymmetricAdjustment
                    ? 'Simetría Activada: Modifica ambos lados simultáneamente'
                    : 'Simetría Desactivada: Modifica sólo esta extremidad'
                }
              >
                <span className="text-base sm:text-lg leading-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                  {isSymmetricAdjustment ? '🪞' : '⚖️'}
                </span>
                <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-tight mt-0.5">
                  {isSymmetricAdjustment ? 'Simetría' : 'Individual'}
                </span>
              </button>
            </div>

            {/* Limb Width Drag Handles Overlay */}
            {showLimbOverlay && (
              <div className="absolute inset-0 pointer-events-none z-30 select-none">
                {(
                  previewAngle === 'face'
                    ? [
                        { key: 'cabeza', label: 'Cabeza', top: '45%', left: '50%' },
                        { key: 'pechobase', label: 'Cuello/Pecho', top: '80%', left: '50%' },
                      ]
                    : previewAngle === 'side'
                    ? [
                        { key: 'cabeza', label: 'Cabeza', top: '12%', left: '50%' },
                        { key: 'pechobase', label: 'Pecho', top: '24%', left: '50%' },
                        { key: 'torso', label: 'Torso', top: '34%', left: '50%' },
                        { key: 'ombligo', label: 'Ombligo', top: '42%', left: '50%' },
                        { key: 'pelvis', label: 'Pelvis', top: '50%', left: '50%' },
                        { key: 'brazo_izq', label: 'Brazo I.', top: '30%', left: '42%' },
                        { key: 'antebrazo_izq', label: 'Anteb. I.', top: '45%', left: '38%' },
                        { key: 'brazo_der', label: 'Brazo D.', top: '30%', left: '58%' },
                        { key: 'antebrazo_der', label: 'Anteb. D.', top: '45%', left: '62%' },
                        { key: 'muslo_izq', label: 'Muslo I.', top: '58%', left: '45%' },
                        { key: 'antepierna_izq', label: 'Pierna I.', top: '75%', left: '45%' },
                        { key: 'tobillo_izq', label: 'Tobillo I.', top: '88%', left: '45%' },
                        { key: 'muslo_der', label: 'Muslo D.', top: '58%', left: '55%' },
                        { key: 'antepierna_der', label: 'Pierna D.', top: '75%', left: '55%' },
                        { key: 'tobillo_der', label: 'Tobillo D.', top: '88%', left: '55%' },
                      ]
                    : [
                        { key: 'cabeza', label: 'Cabeza', top: '10%', left: '50%' },
                        { key: 'cuello', label: 'Cuello', top: '18%', left: '50%' },
                        { key: 'pechobase', label: 'Pechobase', top: '25%', left: '50%' },
                        { key: 'torso', label: 'Torso', top: '34%', left: '50%' },
                        { key: 'ombligo', label: 'Ombligo', top: '42%', left: '50%' },
                        { key: 'pelvis', label: 'Pelvis', top: '50%', left: '50%' },

                        // Left Arm
                        { key: 'hombro_izq', label: 'Hombro Izq.', top: '23%', left: '38%' },
                        { key: 'brazo_izq', label: 'Brazo Izq.', top: '30%', left: '31%' },
                        { key: 'codo_izq', label: 'Codo Izq.', top: '38%', left: '26%' },
                        { key: 'antebrazo_izq', label: 'Antebrazo Izq.', top: '45%', left: '24%' },
                        { key: 'muneca_izq', label: 'Muñeca Izq.', top: '52%', left: '21%' },
                        { key: 'mano_izq', label: 'Mano Izq.', top: '59%', left: '19%' },

                        // Right Arm
                        { key: 'hombro_der', label: 'Hombro Der.', top: '23%', left: '62%' },
                        { key: 'brazo_der', label: 'Brazo Der.', top: '30%', left: '69%' },
                        { key: 'codo_der', label: 'Codo Der.', top: '38%', left: '74%' },
                        { key: 'antebrazo_der', label: 'Antebrazo Der.', top: '45%', left: '76%' },
                        { key: 'muneca_der', label: 'Muñeca Der.', top: '52%', left: '79%' },
                        { key: 'mano_der', label: 'Mano Der.', top: '59%', left: '81%' },

                        // Left Leg
                        { key: 'muslo_izq', label: 'Muslo Izq.', top: '58%', left: '42%' },
                        { key: 'rodilla_izq', label: 'Rodilla Izq.', top: '68%', left: '42%' },
                        { key: 'antepierna_izq', label: 'Antepierna Izq.', top: '76%', left: '42%' },
                        { key: 'tobillo_izq', label: 'Tobillo Izq.', top: '85%', left: '42%' },
                        { key: 'pie_izq', label: 'Pie Izq.', top: '92%', left: '42%' },

                        // Right Leg
                        { key: 'muslo_der', label: 'Muslo Der.', top: '58%', left: '58%' },
                        { key: 'rodilla_der', label: 'Rodilla Der.', top: '68%', left: '58%' },
                        { key: 'antepierna_der', label: 'Antepierna Der.', top: '76%', left: '58%' },
                        { key: 'tobillo_der', label: 'Tobillo Der.', top: '85%', left: '58%' },
                        { key: 'pie_der', label: 'Pie Der.', top: '92%', left: '58%' },
                      ]
                ).map((limb) => {
                  const projected = limbScreenPositions && (
                    limbScreenPositions[limb.key] ||
                    limbScreenPositions[limb.key + '_izq'] ||
                    limbScreenPositions[limb.key + '_der'] ||
                    limbScreenPositions[limb.key.replace('_izq', '')] ||
                    (limb.key === 'pechobase' ? limbScreenPositions['pecho'] : undefined)
                  );
                  const finalTop = projected?.top || limb.top;
                  const finalLeft = projected?.left || limb.left;
                  return (
                    <LimbWidthPointHandle
                      key={limb.key}
                      limbKey={limb.key}
                      label={limb.label}
                      top={finalTop}
                      left={finalLeft}
                      currentVal={limbWidths[limb.key] || 1.0}
                      onChange={handleLimbWidthChange}
                    />
                  );
                })}
              </div>
            )}
          </div>

          {/* Viewport container end */}
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800/80 bg-slate-900/95 backdrop-blur-xl px-2 pt-1 gap-1 overflow-x-auto no-scrollbar">
          {[
            { id: 'clothing', label: 'Ropa & Color', icon: Shirt },
            { id: 'accessories', label: 'Accesorios', icon: Sparkles },
            { id: 'contour', label: 'Forma 3D', icon: Layers },
            { id: 'anatomy', label: 'Anatomía & Fluidos', icon: Heart },
            { id: 'face', label: 'Rostro & Ojos', icon: Smile },
          ].map((item) => {
            const Icon = item.icon;
            const active = tab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setTab(item.id as any)}
                className={`flex-1 py-2 px-2.5 rounded-t-xl text-[11px] font-extrabold flex items-center justify-center gap-1.5 transition-all whitespace-nowrap cursor-pointer border-t border-x ${
                  active
                    ? 'bg-slate-800 text-pink-400 border-slate-700 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 border-transparent hover:bg-slate-800/40'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${active ? 'text-pink-400' : 'text-slate-400'}`} />
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Tab Contents */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-slate-200 text-xs custom-scrollbar bg-slate-950/95 backdrop-blur-xl">
          {/* TAB 1: CLOTHING & COLORS */}
          {tab === 'clothing' && (
            <div className="space-y-3.5">
              {/* Clothing Sub-Category Switcher */}
              <div className="grid grid-cols-4 gap-1.5 p-1 bg-slate-900/90 rounded-2xl border border-slate-800">
                {[
                  { id: 'shirt', label: 'Camisa', icon: Shirt, activeColor: 'text-sky-400 border-sky-500/40 bg-sky-950/40' },
                  { id: 'pants', label: 'Pantalones', icon: Layers, activeColor: 'text-indigo-400 border-indigo-500/40 bg-indigo-950/40' },
                  { id: 'gloves', label: 'Guantes', icon: Sparkles, activeColor: 'text-amber-400 border-amber-500/40 bg-amber-950/40' },
                  { id: 'skin', label: 'Piel', icon: Palette, activeColor: 'text-pink-400 border-pink-500/40 bg-pink-950/40' },
                ].map((cat) => {
                  const Icon = cat.icon;
                  const isSel = clothingCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setClothingCategory(cat.id as any)}
                      className={`py-2 px-1 rounded-xl text-[10.5px] font-black flex flex-col items-center justify-center gap-1 transition-all cursor-pointer border ${
                        isSel
                          ? `${cat.activeColor} shadow-sm scale-100 font-extrabold`
                          : 'text-slate-400 border-transparent hover:bg-slate-800/60 hover:text-slate-200'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{cat.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* 1. CAMISA CATEGORY */}
              {clothingCategory === 'shirt' && (
                <div className="space-y-3">
                  <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Shirt className="w-4 h-4 text-sky-400" />
                        <div>
                          <span className="font-extrabold text-white block">Prenda Superior / Camisa</span>
                          <span className="text-[10px] text-slate-400">Variabilidad de estilos, estampados y largo</span>
                        </div>
                      </div>
                      <button
                        onClick={() => onToggleShirt(!hasShirt)}
                        className={`px-3 py-1.5 rounded-xl font-black text-[11px] uppercase tracking-wider transition-all cursor-pointer ${
                          hasShirt ? 'bg-sky-500 text-white shadow-md shadow-sky-500/30' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                        }`}
                      >
                        {hasShirt ? 'Equipada' : 'Sin Camisa'}
                      </button>
                    </div>

                    {hasShirt && (
                      <div className="space-y-3 pt-1 border-t border-slate-800/80">
                        {/* Estilo / Patrón de Camisa */}
                        <div>
                          <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-1.5">
                            Estilo y Patrón de Prenda
                          </span>
                          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-1.5 max-h-48 overflow-y-auto pr-1">
                            {[
                              { id: 'solid', name: 'Liso', badge: 'Básico' },
                              { id: 'stripes', name: 'Rayas', badge: 'Náutico' },
                              { id: 'vertical_stripes', name: 'Vertical', badge: 'Béisbol' },
                              { id: 'checkered', name: 'Cuadros', badge: 'Leñador' },
                              { id: 'camo', name: 'Camuflaje', badge: 'Militar' },
                              { id: 'logo_star', name: 'Estrella', badge: 'Emblema' },
                              { id: 'logo_skull', name: 'Calavera', badge: 'Pirata' },
                              { id: 'varsity', name: 'Varsity', badge: 'Chaqueta' },
                              { id: 'hoodie', name: 'Sudadera', badge: 'Capucha' },
                              { id: 'polo', name: 'Polo', badge: 'Cuello' },
                              { id: 'tuxedo', name: 'Esmoquin', badge: 'Elegante' },
                              { id: 'hawaiian', name: 'Hawaiana', badge: 'Tropical' },
                              { id: 'flame', name: 'Llamas', badge: 'Fuego' },
                              { id: 'cyberpunk', name: 'Cyberpunk', badge: 'Neón' },
                              { id: 'tie_dye', name: 'Tie-Dye', badge: 'Espiral' },
                              { id: 'two_tone', name: 'Bicolor', badge: 'Mitad' },
                            ].map((st) => (
                              <button
                                key={st.id}
                                onClick={() => onShirtStyleChange?.(st.id as ShirtStyle)}
                                className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                                  shirtStyle === st.id
                                    ? 'bg-sky-950/60 border-sky-400 text-white shadow-sm ring-1 ring-sky-400'
                                    : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                                }`}
                              >
                                <span className="font-black text-[10px] block text-sky-300 truncate">{st.name}</span>
                                <span className="text-[8px] text-slate-400 block truncate">{st.badge}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Cobertura / Largo */}
                        <div>
                          <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-1.5">
                            Nivel de Cobertura / Largo de Prenda
                          </span>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                            {[
                              { level: 1, name: 'Pechobase Solo', desc: 'Top Corto / Bandeau' },
                              { level: 2, name: 'Pechobase + Torso', desc: 'Hasta Torso Medio' },
                              { level: 3, name: 'Cuerpo / Ombligo', desc: 'Sin Mangas (Todo el Tronco)' },
                              { level: 4, name: 'Con Hombro', desc: 'Manga Corta con Brazos' },
                              { level: 5, name: 'Con Antebrazo', desc: 'Manga 3/4 con Codos' },
                              { level: 6, name: 'Hasta Muñeca', desc: 'Manga Larga Completa' },
                            ].map((st) => (
                              <button
                                key={st.level}
                                onClick={() => onShirtCoverageLevelChange?.(st.level)}
                                className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                                  shirtCoverageLevel === st.level
                                    ? 'bg-sky-950/60 border-sky-400 text-white shadow-sm ring-1 ring-sky-400'
                                    : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                                }`}
                              >
                                <span className="font-black text-[10px] block text-sky-300">{st.name}</span>
                                <span className="text-[8.5px] text-slate-400 block leading-tight">{st.desc}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Color Primario */}
                        <div>
                          <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-1.5">
                            Color Primario / Base
                          </span>
                          <div className="grid grid-cols-5 gap-1.5">
                            {CLOTHING_PALETTE.map((c) => (
                              <button
                                key={c.name}
                                onClick={() => onShirtColorChange(c.hex)}
                                className={`h-7 rounded-xl border flex items-center justify-center transition-all cursor-pointer active:scale-95 ${
                                  shirtColorHex === c.hex ? 'border-sky-400 scale-105 shadow-md ring-2 ring-sky-400/50' : 'border-slate-700 hover:border-slate-500'
                                }`}
                                style={{ backgroundColor: `#${c.hex.toString(16).padStart(6, '0')}` }}
                                title={c.name}
                              >
                                {shirtColorHex === c.hex && <Check className="w-3.5 h-3.5 text-white mix-blend-difference" />}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Color Secundario / Detalles */}
                        <div>
                          <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-1.5">
                            Color Secundario (Rayas / Patrón / Estampado)
                          </span>
                          <div className="grid grid-cols-5 gap-1.5">
                            {CLOTHING_PALETTE.map((c) => (
                              <button
                                key={c.name}
                                onClick={() => onShirtSecondaryColorChange?.(c.hex)}
                                className={`h-7 rounded-xl border flex items-center justify-center transition-all cursor-pointer active:scale-95 ${
                                  shirtSecondaryColorHex === c.hex ? 'border-sky-400 scale-105 shadow-md ring-2 ring-sky-400/50' : 'border-slate-700 hover:border-slate-500'
                                }`}
                                style={{ backgroundColor: `#${c.hex.toString(16).padStart(6, '0')}` }}
                                title={c.name}
                              >
                                {shirtSecondaryColorHex === c.hex && <Check className="w-3.5 h-3.5 text-white mix-blend-difference" />}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* 2. PANTALONES CATEGORY */}
              {clothingCategory === 'pants' && (
                <div className="space-y-3">
                  <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Layers className="w-4 h-4 text-indigo-400" />
                        <div>
                          <span className="font-extrabold text-white block">Pantalones</span>
                          <span className="text-[10px] text-slate-400">Variabilidad de estilos, cortes y largos</span>
                        </div>
                      </div>
                      {onTogglePants && (
                        <button
                          onClick={() => onTogglePants(!hasPants)}
                          className={`px-3 py-1.5 rounded-xl font-black text-[11px] uppercase tracking-wider transition-all cursor-pointer ${
                            hasPants ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/30' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                          }`}
                        >
                          {hasPants ? 'Equipados' : 'Desactivados'}
                        </button>
                      )}
                    </div>

                    {hasPants && (
                      <div className="space-y-3 pt-1 border-t border-slate-800/80">
                        {/* Estilos de Pantalón */}
                        <div>
                          <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-1.5">
                            Estilo y Patrón de Pantalón
                          </span>
                          <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                            {[
                              { id: 'solid', name: 'Liso', badge: 'Clásico' },
                              { id: 'stripes', name: 'Rayas', badge: 'Deportivo' },
                              { id: 'camo', name: 'Camuflaje', badge: 'Táctico' },
                              { id: 'jeans', name: 'Jeans', badge: 'Denim' },
                              { id: 'sweatpants', name: 'Chándal', badge: 'Jogger' },
                              { id: 'cargo', name: 'Cargo', badge: 'Bolsillos' },
                            ].map((st) => (
                              <button
                                key={st.id}
                                onClick={() => onPantsStyleChange?.(st.id as any)}
                                className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                                  pantsStyle === st.id
                                    ? 'bg-indigo-950/60 border-indigo-400 text-white shadow-sm ring-1 ring-indigo-400'
                                    : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                                }`}
                              >
                                <span className="font-black text-[10px] block text-indigo-300">{st.name}</span>
                                <span className="text-[8px] text-slate-400 block">{st.badge}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Largo de Pantalón */}
                        <div>
                          <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-1.5">
                            Largo / Cobertura de Piernas
                          </span>
                          <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
                            {[
                              { level: 1, name: 'Minishort', desc: 'Cadera Alta' },
                              { level: 2, name: 'Shorts', desc: 'Medio Muslo' },
                              { level: 3, name: 'Bermudas', desc: 'Hasta Rodillas' },
                              { level: 4, name: 'Capri', desc: 'Pesquero' },
                              { level: 5, name: 'Pantalón Largo', desc: 'Hasta Tobillos' },
                            ].map((st) => (
                              <button
                                key={st.level}
                                onClick={() => onPantsCoverageLevelChange?.(st.level)}
                                className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                                  pantsCoverageLevel === st.level
                                    ? 'bg-indigo-950/60 border-indigo-400 text-white shadow-sm ring-1 ring-indigo-400'
                                    : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                                }`}
                              >
                                <span className="font-black text-[10px] block text-indigo-300">{st.name}</span>
                                <span className="text-[8.5px] text-slate-400 block leading-tight">{st.desc}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Color Primario */}
                        <div>
                          <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-1.5">
                            Color de Pantalón
                          </span>
                          <div className="grid grid-cols-5 gap-1.5">
                            {CLOTHING_PALETTE.map((c) => (
                              <button
                                key={c.name}
                                onClick={() => onPantsColorChange(c.hex)}
                                className={`h-7 rounded-xl border flex items-center justify-center transition-all cursor-pointer active:scale-95 ${
                                  pantsColorHex === c.hex ? 'border-indigo-400 scale-105 shadow-md ring-2 ring-indigo-400/50' : 'border-slate-700 hover:border-slate-500'
                                }`}
                                style={{ backgroundColor: `#${c.hex.toString(16).padStart(6, '0')}` }}
                                title={c.name}
                              >
                                {pantsColorHex === c.hex && <Check className="w-3.5 h-3.5 text-white mix-blend-difference" />}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Color Secundario */}
                        <div>
                          <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-1.5">
                            Color Secundario (Franjas / Costuras)
                          </span>
                          <div className="grid grid-cols-5 gap-1.5">
                            {CLOTHING_PALETTE.map((c) => (
                              <button
                                key={c.name}
                                onClick={() => onPantsSecondaryColorChange?.(c.hex)}
                                className={`h-7 rounded-xl border flex items-center justify-center transition-all cursor-pointer active:scale-95 ${
                                  pantsSecondaryColorHex === c.hex ? 'border-indigo-400 scale-105 shadow-md ring-2 ring-indigo-400/50' : 'border-slate-700 hover:border-slate-500'
                                }`}
                                style={{ backgroundColor: `#${c.hex.toString(16).padStart(6, '0')}` }}
                                title={c.name}
                              >
                                {pantsSecondaryColorHex === c.hex && <Check className="w-3.5 h-3.5 text-white mix-blend-difference" />}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Underwear & Boots inside Pants category */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-extrabold text-white text-[11px]">Ropa Interior</span>
                        {onToggleUnderwear && (
                          <button
                            onClick={() => onToggleUnderwear(!hasUnderwear)}
                            className={`px-2 py-0.5 rounded-lg text-[9px] font-black ${
                              hasUnderwear ? 'bg-rose-500 text-white' : 'bg-slate-800 text-slate-500'
                            }`}
                          >
                            {hasUnderwear ? 'ON' : 'OFF'}
                          </button>
                        )}
                      </div>
                      {hasUnderwear && onUnderwearColorChange && (
                        <div className="flex gap-1 overflow-x-auto pb-0.5">
                          {CLOTHING_PALETTE.slice(0, 5).map((c) => (
                            <button
                              key={c.name}
                              onClick={() => onUnderwearColorChange(c.hex)}
                              className="w-5 h-5 rounded-lg border border-slate-700 shrink-0"
                              style={{ backgroundColor: `#${c.hex.toString(16).padStart(6, '0')}` }}
                            />
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-extrabold text-white text-[11px]">Botas</span>
                        {onToggleBoots && (
                          <button
                            onClick={() => onToggleBoots(!hasBoots)}
                            className={`px-2 py-0.5 rounded-lg text-[9px] font-black ${
                              hasBoots ? 'bg-slate-700 text-white' : 'bg-slate-800 text-slate-500'
                            }`}
                          >
                            {hasBoots ? 'ON' : 'OFF'}
                          </button>
                        )}
                      </div>
                      {hasBoots && onBootsColorChange && (
                        <div className="flex gap-1 overflow-x-auto pb-0.5">
                          {CLOTHING_PALETTE.slice(0, 5).map((c) => (
                            <button
                              key={c.name}
                              onClick={() => onBootsColorChange(c.hex)}
                              className="w-5 h-5 rounded-lg border border-slate-700 shrink-0"
                              style={{ backgroundColor: `#${c.hex.toString(16).padStart(6, '0')}` }}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* 3. GUANTES CATEGORY */}
              {clothingCategory === 'gloves' && (
                <div className="space-y-3">
                  <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-amber-400" />
                        <div>
                          <span className="font-extrabold text-white block">Guantes</span>
                          <span className="text-[10px] text-slate-400">Variabilidad de estilos y protección de manos</span>
                        </div>
                      </div>
                      {onToggleGloves && (
                        <button
                          onClick={() => onToggleGloves(!hasGloves)}
                          className={`px-3 py-1.5 rounded-xl font-black text-[11px] uppercase tracking-wider transition-all cursor-pointer ${
                            hasGloves ? 'bg-amber-500 text-white shadow-md shadow-amber-500/30' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                          }`}
                        >
                          {hasGloves ? 'Equipados' : 'Desactivados'}
                        </button>
                      )}
                    </div>

                    {hasGloves && (
                      <div className="space-y-3 pt-1 border-t border-slate-800/80">
                        {/* Estilos de Guantes */}
                        <div>
                          <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-1.5">
                            Estilo y Modelo de Guantes
                          </span>
                          <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                            {[
                              { id: 'solid', name: 'Liso', badge: 'Básico' },
                              { id: 'stripes', name: 'Rayas', badge: 'Deportivo' },
                              { id: 'camo', name: 'Camuflaje', badge: 'Militar' },
                              { id: 'tactical', name: 'Táctico', badge: 'Nudillos' },
                              { id: 'fingerless', name: 'Sin Dedos', badge: 'Mitón' },
                              { id: 'leather', name: 'Cuero', badge: 'Hebillas' },
                            ].map((st) => (
                              <button
                                key={st.id}
                                onClick={() => onGlovesStyleChange?.(st.id as any)}
                                className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                                  glovesStyle === st.id
                                    ? 'bg-amber-950/60 border-amber-400 text-white shadow-sm ring-1 ring-amber-400'
                                    : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                                }`}
                              >
                                <span className="font-black text-[10px] block text-amber-300">{st.name}</span>
                                <span className="text-[8px] text-slate-400 block">{st.badge}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Cobertura de Guantes */}
                        <div>
                          <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-1.5">
                            Tipo de Cobertura / Largo
                          </span>
                          <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
                            {[
                              { level: 1, name: 'Mitones', desc: 'Solo Palma' },
                              { level: 2, name: 'Sin Dedos', desc: 'Nudillos' },
                              { level: 3, name: 'Muñequeras', desc: 'Muñecas' },
                              { level: 4, name: 'Clásicos', desc: 'Mano Completa' },
                              { level: 5, name: 'Guante Largo', desc: 'Hasta Brazo' },
                            ].map((st) => (
                              <button
                                key={st.level}
                                onClick={() => onGlovesCoverageLevelChange?.(st.level)}
                                className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                                  glovesCoverageLevel === st.level
                                    ? 'bg-amber-950/60 border-amber-400 text-white shadow-sm ring-1 ring-amber-400'
                                    : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                                }`}
                              >
                                <span className="font-black text-[10px] block text-amber-300">{st.name}</span>
                                <span className="text-[8.5px] text-slate-400 block leading-tight">{st.desc}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Color Primario */}
                        <div>
                          <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-1.5">
                            Color de Guantes
                          </span>
                          <div className="grid grid-cols-5 gap-1.5">
                            {CLOTHING_PALETTE.map((c) => (
                              <button
                                key={c.name}
                                onClick={() => onGlovesColorChange?.(c.hex)}
                                className={`h-7 rounded-xl border flex items-center justify-center transition-all cursor-pointer active:scale-95 ${
                                  glovesColorHex === c.hex ? 'border-amber-400 scale-105 shadow-md ring-2 ring-amber-400/50' : 'border-slate-700 hover:border-slate-500'
                                }`}
                                style={{ backgroundColor: `#${c.hex.toString(16).padStart(6, '0')}` }}
                                title={c.name}
                              >
                                {glovesColorHex === c.hex && <Check className="w-3.5 h-3.5 text-white mix-blend-difference" />}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Color Secundario */}
                        <div>
                          <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-1.5">
                            Color Secundario (Detalles / Acentos)
                          </span>
                          <div className="grid grid-cols-5 gap-1.5">
                            {CLOTHING_PALETTE.map((c) => (
                              <button
                                key={c.name}
                                onClick={() => onGlovesSecondaryColorChange?.(c.hex)}
                                className={`h-7 rounded-xl border flex items-center justify-center transition-all cursor-pointer active:scale-95 ${
                                  glovesSecondaryColorHex === c.hex ? 'border-amber-400 scale-105 shadow-md ring-2 ring-amber-400/50' : 'border-slate-700 hover:border-slate-500'
                                }`}
                                style={{ backgroundColor: `#${c.hex.toString(16).padStart(6, '0')}` }}
                                title={c.name}
                              >
                                {glovesSecondaryColorHex === c.hex && <Check className="w-3.5 h-3.5 text-white mix-blend-difference" />}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* 4. PIEL CATEGORY */}
              {clothingCategory === 'skin' && (
                <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="font-extrabold text-white flex items-center gap-1.5">
                      <Palette className="w-3.5 h-3.5 text-pink-400" /> Tono de Piel Base
                    </span>
                    <div
                      className="w-5 h-5 rounded-full border border-white/20 shadow-sm"
                      style={{ backgroundColor: `#${skinColorHex.toString(16).padStart(6, '0')}` }}
                    />
                  </div>
                  <div className="grid grid-cols-5 gap-1.5">
                    {SKIN_PALETTE.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => onSkinColorChange(c.hex)}
                        className={`h-7 rounded-xl border flex items-center justify-center transition-all cursor-pointer active:scale-95 ${
                          skinColorHex === c.hex ? 'border-pink-400 scale-105 shadow-md' : 'border-slate-700 hover:border-slate-500'
                        }`}
                        style={{ backgroundColor: `#${c.hex.toString(16).padStart(6, '0')}` }}
                        title={c.name}
                      >
                        {skinColorHex === c.hex && <Check className="w-3.5 h-3.5 text-slate-900 drop-shadow" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: ACCESSORIES */}
          {tab === 'accessories' && (
            <div className="space-y-4">
              {/* Hair */}
              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
                <span className="font-extrabold text-white block mb-2">Estilo de Cabello</span>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {[
                    { id: 'none', label: 'Sin Pelo' },
                    { id: 'classic', label: 'Clásico' },
                    { id: 'spiky', label: 'Anime Puntas' },
                    { id: 'long', label: 'Largo' },
                    { id: 'ponytail', label: 'Coleta' },
                    { id: 'afro', label: 'Afro' },
                  ].map((h) => (
                    <button
                      key={h.id}
                      onClick={() => onHairTypeChange?.(h.id)}
                      className={`py-2 px-2 rounded-xl font-bold text-center border transition-all cursor-pointer ${
                        hairType === h.id
                          ? 'bg-pink-500 text-white border-pink-400 shadow-md'
                          : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                      }`}
                    >
                      {h.label}
                    </button>
                  ))}
                </div>
                {hairType !== 'none' && onHairColorChange && (
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 block mb-1">Color del Cabello</span>
                    <div className="grid grid-cols-5 gap-1.5">
                      {CLOTHING_PALETTE.map((c) => (
                        <button
                          key={c.name}
                          onClick={() => onHairColorChange(c.hex)}
                          className={`h-7 rounded-xl border flex items-center justify-center ${
                            hairColorHex === c.hex ? 'border-pink-400 scale-105' : 'border-slate-700'
                          }`}
                          style={{ backgroundColor: `#${c.hex.toString(16).padStart(6, '0')}` }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Hat & Glasses */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <span className="font-extrabold text-white block mb-2">Sombrero</span>
                  <div className="flex flex-col gap-1.5">
                    {['none', 'cap', 'beanie', 'helmet', 'tophat'].map((type) => (
                      <button
                        key={type}
                        onClick={() => onHatTypeChange?.(type)}
                        className={`py-1.5 px-2 rounded-lg font-bold text-[11px] capitalize border ${
                          hatType === type ? 'bg-pink-500 text-white border-pink-400' : 'bg-slate-800 text-slate-300 border-slate-700'
                        }`}
                      >
                        {type === 'none' ? 'Sin Sombrero' : type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <span className="font-extrabold text-white block mb-2">Gafas / Lentes</span>
                  <div className="flex flex-col gap-1.5">
                    {['none', 'sunglasses', 'nerd', 'visor', 'vr'].map((type) => (
                      <button
                        key={type}
                        onClick={() => onGlassesTypeChange?.(type)}
                        className={`py-1.5 px-2 rounded-lg font-bold text-[11px] capitalize border ${
                          glassesType === type ? 'bg-pink-500 text-white border-pink-400' : 'bg-slate-800 text-slate-300 border-slate-700'
                        }`}
                      >
                        {type === 'none' ? 'Sin Lentes' : type}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CONTOUR & 3D FORM */}
          {tab === 'contour' && (
            <div className="space-y-4">
              {/* Joint & Envelope Style */}
              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
                <span className="font-extrabold text-white block mb-2">Estilo de Contorno y Juntas</span>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {[
                    { id: 'pseudo3d', label: 'Pseudo 3D' },
                    { id: 'blocky', label: 'Bloque Clásico' },
                    { id: 'cylinder', label: 'Cilindro Articulado' },
                  ].map((style) => (
                    <button
                      key={style.id}
                      onClick={() => onContourJointStyleChange(style.id as any)}
                      className={`py-2 px-2 rounded-xl font-bold text-center border text-[11px] ${
                        contourJointStyle === style.id
                          ? 'bg-pink-500 text-white border-pink-400 shadow-md'
                          : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                      }`}
                    >
                      {style.label}
                    </button>
                  ))}
                </div>

                {/* Contour Toggle & Slider */}
                <div className="flex items-center justify-between py-2 border-t border-slate-800">
                  <span className="font-bold text-slate-300">Capa de Contorno Esférico</span>
                  <button
                    onClick={() => onToggleContour(!contourEnabled)}
                    className={`px-3 py-1 rounded-xl font-black ${
                      contourEnabled ? 'bg-pink-500 text-white' : 'bg-slate-800 text-slate-500'
                    }`}
                  >
                    {contourEnabled ? 'ACTIVADO' : 'DESACTIVADO'}
                  </button>
                </div>

                {contourEnabled && (
                  <div className="pt-2">
                    <div className="flex justify-between text-[11px] font-bold text-slate-400 mb-1">
                      <span>Nivel de Contorno</span>
                      <span className="text-sky-400">{contourLevel.toFixed(2)}x</span>
                    </div>
                    <input
                      type="range"
                      min="0.1"
                      max="2.0"
                      step="0.05"
                      value={contourLevel}
                      onChange={(e) => onContourLevelChange(parseFloat(e.target.value))}
                      className="w-full accent-sky-400 cursor-pointer"
                    />
                  </div>
                )}
              </div>

              {/* Voxel Density & Shape */}
              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                <span className="font-extrabold text-white block">Geometría de Vóxeles</span>
                
                {onVoxelShapeChange && (
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onVoxelShapeChange('cube')}
                      className={`py-2 rounded-xl font-bold border ${
                        voxelShape === 'cube' ? 'bg-pink-500 text-white border-pink-400' : 'bg-slate-800 text-slate-300 border-slate-700'
                      }`}
                    >
                      Vóxeles Cúbicos
                    </button>
                    <button
                      onClick={() => onVoxelShapeChange('sphere')}
                      className={`py-2 rounded-xl font-bold border ${
                        voxelShape === 'sphere' ? 'bg-pink-500 text-white border-pink-400' : 'bg-slate-800 text-slate-300 border-slate-700'
                      }`}
                    >
                      Vóxeles Esféricos
                    </button>
                  </div>
                )}

                {onVoxelDensityChange && (
                  <div>
                    <div className="flex justify-between text-[11px] font-bold text-slate-400 mb-1">
                      <span>Densidad de Vóxeles</span>
                      <span className="text-pink-400">{voxelDensity.toFixed(1)}x</span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="2.5"
                      step="0.1"
                      value={voxelDensity}
                      onChange={(e) => onVoxelDensityChange(parseFloat(e.target.value))}
                      className="w-full accent-pink-400 cursor-pointer"
                    />
                  </div>
                )}

                {onLimbSizeMultiplierChange && (
                  <div>
                    <div className="flex justify-between text-[11px] font-bold text-slate-400 mb-1">
                      <span>Grosor General de Extremidades</span>
                      <span className="text-indigo-400">{limbSizeMultiplier.toFixed(2)}x</span>
                    </div>
                    <input
                      type="range"
                      min="0.6"
                      max="1.6"
                      step="0.05"
                      value={limbSizeMultiplier}
                      onChange={(e) => onLimbSizeMultiplierChange(parseFloat(e.target.value))}
                      className="w-full accent-indigo-400 cursor-pointer"
                    />
                  </div>
                )}
              </div>

              {/* Individual Muscle & Limb Proportions Sliders */}
              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2">
                  <MuscleIcon className="w-4 h-4 text-amber-400" />
                  <span className="font-extrabold text-white block">Grosor de Músculo por Extremidad</span>
                </div>

                {[
                  { key: 'cabeza', label: 'Cabeza' },
                  { key: 'cuello', label: 'Cuello' },
                  { key: 'hombro_izq', label: 'Hombro' },
                  { key: 'brazo_izq', label: 'Brazo' },
                  { key: 'codo_izq', label: 'Codo' },
                  { key: 'antebrazo_izq', label: 'Antebrazo' },
                  { key: 'muneca_izq', label: 'Muñeca' },
                  { key: 'mano_izq', label: 'Mano y Dedos' },
                  { key: 'muslo_izq', label: 'Muslos' },
                  { key: 'rodilla_izq', label: 'Pierna / Rodilla' },
                  { key: 'antepierna_izq', label: 'Antepierna' },
                  { key: 'tobillo_izq', label: 'Tobillo' },
                  { key: 'pie_izq', label: 'Pies y Dedos de Pies' },
                  { key: 'pechobase', label: 'Pechobase' },
                  { key: 'torso', label: 'Torso' },
                  { key: 'ombligo', label: 'Ombligo' },
                  { key: 'pelvis', label: 'Pelvis' },
                ].map((item) => (
                  <div key={item.key}>
                    <div className="flex justify-between text-[11px] font-bold text-slate-300 mb-1">
                      <span>{item.label}</span>
                      <span className="text-amber-400 font-mono">{(limbWidths[item.key] || 1.0).toFixed(2)}x</span>
                    </div>
                    <input
                      type="range"
                      min="0.45"
                      max="2.5"
                      step="0.05"
                      value={limbWidths[item.key] || 1.0}
                      onChange={(e) => handleLimbWidthChange(item.key, parseFloat(e.target.value))}
                      className="w-full accent-amber-400 cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: ANATOMY & FLUID EMISSION */}
          {tab === 'anatomy' && (
            <div className="space-y-4">
              {/* Bust & Glutes */}
              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="font-extrabold text-white block">Pechos y Glúteos 3D</span>
                    <p className="text-[11px] text-slate-400">Modelado anatómico con tetillas y glúteos</p>
                  </div>
                  <button
                    onClick={() => onToggleBustAndGlutes(!hasBustAndGlutes)}
                    className={`px-3 py-1.5 rounded-xl font-black text-[11px] transition-all cursor-pointer ${
                      hasBustAndGlutes ? 'bg-pink-500 text-white shadow-md' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    {hasBustAndGlutes ? 'ACTIVADO' : 'DESACTIVADO'}
                  </button>
                </div>
              </div>

              {/* Genital Type Selection */}
              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                <span className="font-extrabold text-white block">Tipo de Genitales</span>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'none', label: 'Ninguno' },
                    { id: 'male', label: 'Masculino' },
                    { id: 'female', label: 'Femenino' },
                  ].map((g) => (
                    <button
                      key={g.id}
                      onClick={() => onGenitalTypeChange?.(g.id as any)}
                      className={`py-2 rounded-xl font-bold border text-[11px] ${
                        genitalType === g.id
                          ? 'bg-rose-500 text-white border-rose-400 shadow-md'
                          : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                      }`}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>

                {/* Male Specific Controls */}
                {genitalType === 'male' && (
                  <div className="space-y-2.5 pt-2 border-t border-slate-800">
                    {onGenitalMShaftLengthChange && (
                      <div>
                        <div className="flex justify-between text-[11px] font-bold text-slate-400 mb-1">
                          <span>Longitud</span>
                          <span className="text-rose-400">{((genitalMShaftLength ?? 0.16) * 100).toFixed(0)} cm</span>
                        </div>
                        <input
                          type="range"
                          min="0.08"
                          max="0.45"
                          step="0.01"
                          value={genitalMShaftLength}
                          onChange={(e) => onGenitalMShaftLengthChange(parseFloat(e.target.value))}
                          className="w-full accent-rose-400 cursor-pointer"
                        />
                      </div>
                    )}
                    {onGenitalMShaftThicknessChange && (
                      <div>
                        <div className="flex justify-between text-[11px] font-bold text-slate-400 mb-1">
                          <span>Grosor</span>
                          <span className="text-rose-400">{((genitalMShaftThickness ?? 0.045) * 100).toFixed(1)} cm</span>
                        </div>
                        <input
                          type="range"
                          min="0.02"
                          max="0.10"
                          step="0.005"
                          value={genitalMShaftThickness}
                          onChange={(e) => onGenitalMShaftThicknessChange(parseFloat(e.target.value))}
                          className="w-full accent-rose-400 cursor-pointer"
                        />
                      </div>
                    )}
                    {onTriggerErection && (
                      <button
                        onClick={onTriggerErection}
                        className="w-full py-2 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-black rounded-xl shadow-md cursor-pointer transition-all active:scale-95"
                      >
                        🍆 Disparar Erección + Convulsión
                      </button>
                    )}
                  </div>
                )}

                {/* Female Specific Controls */}
                {genitalType === 'female' && onGenitalFSizeChange && (
                  <div className="pt-2 border-t border-slate-800">
                    <div className="flex justify-between text-[11px] font-bold text-slate-400 mb-1">
                      <span>Tamaño Vulva</span>
                      <span className="text-rose-400">{((genitalFSize ?? 0.08) * 100).toFixed(0)} mm</span>
                    </div>
                    <input
                      type="range"
                      min="0.04"
                      max="0.18"
                      step="0.01"
                      value={genitalFSize}
                      onChange={(e) => onGenitalFSizeChange(parseFloat(e.target.value))}
                      className="w-full accent-rose-400 cursor-pointer"
                    />
                  </div>
                )}
              </div>

              {/* Pubic Hair */}
              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-extrabold text-white">Vello Púbico</span>
                  {onPubicHairEnabledChange && (
                    <button
                      onClick={() => onPubicHairEnabledChange(!pubicHairEnabled)}
                      className={`px-3 py-1 rounded-xl font-black text-[11px] ${
                        pubicHairEnabled ? 'bg-amber-500 text-white' : 'bg-slate-800 text-slate-500'
                      }`}
                    >
                      {pubicHairEnabled ? 'ON' : 'OFF'}
                    </button>
                  )}
                </div>
                {pubicHairEnabled && onPubicHairIntensityChange && (
                  <div>
                    <input
                      type="range"
                      min="0.1"
                      max="1.0"
                      step="0.05"
                      value={pubicHairIntensity}
                      onChange={(e) => onPubicHairIntensityChange(parseFloat(e.target.value))}
                      className="w-full accent-amber-400 cursor-pointer"
                    />
                  </div>
                )}
              </div>

              {/* Realistic Fluid Controls */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-slate-900 via-rose-950/40 to-slate-900 border border-rose-800/40 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Droplets className="w-4 h-4 text-rose-400 animate-bounce" />
                    <span className="font-extrabold text-white">Motor de Fluidos Realistas</span>
                  </div>
                  <span className="text-[10px] font-bold text-rose-300">Pechos & Genitales</span>
                </div>
                <p className="text-[11px] text-slate-300">
                  Emite chorros de bloques encadenados con uniones y esferas continuas desde pechos y genitales.
                </p>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  {onTogglePlayerFluidEmission && (
                    <button
                      onClick={onTogglePlayerFluidEmission}
                      className={`py-2.5 px-3 rounded-xl font-black text-[11px] flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95 ${
                        isFluidEmitting
                          ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/50 animate-pulse'
                          : 'bg-slate-800 hover:bg-rose-600 text-slate-200 hover:text-white border border-slate-700'
                      }`}
                    >
                      <Droplets className="w-3.5 h-3.5" />
                      {isFluidEmitting ? '⚡ Chorro: ON (Desactivar)' : '⚡ Chorro: OFF (Activar)'}
                    </button>
                  )}
                  {onTriggerPlayerFluidBurst && (
                    <button
                      onClick={onTriggerPlayerFluidBurst}
                      className="py-2.5 px-3 rounded-xl font-black text-[11px] bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-md flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95"
                    >
                      <Flame className="w-3.5 h-3.5" />
                      Ráfaga de Chorro
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: FACE & 3D EYES */}
          {tab === 'face' && (
            <div className="space-y-4">
              {/* Face Feature Mode */}
              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                <span className="font-extrabold text-white block">Modo de Renderizado de Rostro</span>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'anime_canvas', label: 'Anime 2D Canvas' },
                    { id: '3d_mesh_eyes', label: 'Ojos 3D en Cuencas' },
                  ].map((mode) => (
                    <button
                      key={mode.id}
                      onClick={() => onFaceFeatureModeChange?.(mode.id as FaceFeatureMode)}
                      className={`py-2.5 px-2 rounded-xl font-bold border text-[11px] ${
                        faceFeatureMode === mode.id
                          ? 'bg-pink-500 text-white border-pink-400 shadow-md'
                          : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                      }`}
                    >
                      {mode.label}
                    </button>
                  ))}
                </div>

                {/* Eye Holes Toggle */}
                {onToggleEyeHoles && (
                  <div className="flex items-center justify-between py-2 border-t border-slate-800">
                    <span className="font-bold text-slate-300">Huecos de Cuencas Oculares</span>
                    <button
                      onClick={() => onToggleEyeHoles(!eyeHolesEnabled)}
                      className={`px-3 py-1 rounded-xl font-black text-[11px] ${
                        eyeHolesEnabled ? 'bg-pink-500 text-white' : 'bg-slate-800 text-slate-500'
                      }`}
                    >
                      {eyeHolesEnabled ? 'ACTIVADOS' : 'PLANOS'}
                    </button>
                  </div>
                )}

                {/* Face Float Depth Slider */}
                {onFaceFloatDepthChange && (
                  <div className="pt-2 border-t border-slate-800">
                    <div className="flex justify-between text-[11px] font-bold text-slate-400 mb-1">
                      <span>Profundidad de Flotación</span>
                      <span className="text-pink-400">{(faceFloatDepth * 1000).toFixed(1)} mm</span>
                    </div>
                    <input
                      type="range"
                      min="0.001"
                      max="0.008"
                      step="0.0005"
                      value={faceFloatDepth}
                      onChange={(e) => onFaceFloatDepthChange(parseFloat(e.target.value))}
                      className="w-full accent-pink-400 cursor-pointer"
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer with Done Button */}
        <div className="p-3.5 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between gap-3">
          <span className="text-[11px] text-slate-400 font-medium">Todos los cambios se aplican al instante</span>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 active:scale-95 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-pink-500/30 transition-all cursor-pointer"
          >
            Listo / Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
