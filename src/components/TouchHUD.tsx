import React, { useState, useEffect } from 'react';
import {
  ArrowUp,
  Crosshair,
  Globe,
  RotateCcw,
  Settings,
  ShieldAlert,
  Skull,
  Sliders,
  Sparkles,
  Target,
  User,
  Zap,
  ZoomIn,
  ZoomOut,
  Shirt,
  Palette,
  Boxes,
  Droplet,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  Activity,
  Layers,
  Radio,
  Volume2,
  VolumeX,
  Plus,
  Footprints,
  Paintbrush,
  MessageSquare,
  Hand,
  Terminal,
} from 'lucide-react';
import { VirtualJoystick } from './VirtualJoystick';
import { HotPoseType } from '../types/physics3d';
import { WorkshopAvatarFaceBadge } from './WorkshopAvatarFaceBadge';

interface TouchHUDProps {
  activeHotNPCsInfo?: any[];
  onSetHotNPCPose?: (pose: HotPoseType, npcId?: string) => void;
  onMoveJoystick: (vector: { x: number; y: number }) => void;
  onJump: () => void;
  onRespawn: () => void;
  isAlive: boolean;
  cameraDistance: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
  hasWeapon: boolean;
  onDropWeapon?: () => void;
  isAiming: boolean;
  onToggleAim: () => void;
  isFreeCamAiming?: boolean;
  onToggleFreeCamAiming?: () => void;
  onShoot: () => void;
  shootCooldownRemaining?: number;
  onSpawnWeaponPickup: () => void;
  onSpawnSoldier: () => void;
  soldierCount: number;
  onSpawnDummy?: () => void;
  onSpawnRagdoll?: () => void;
  dummyCount?: number;
  onSpawnEvilDummy?: () => void;
  onSpawnZombie?: () => void;
  zombieCount?: number;
  onSpawnProp?: (type: string) => void;
  onSpawnLiquid?: (type: string, quantity: number) => void;
  onSpawnPool?: () => void;
  liquidQuantity?: number;
  onSetLiquidQuantity?: (val: number) => void;
  poolWaterHeight?: number;
  onSetPoolWaterHeight?: (val: number) => void;
  contourLevel: number;
  contourSmoothness?: number;
  contourEnabled: boolean;
  contourJointStyle?: 'pseudo3d' | 'blocky' | 'cylinder';
  onContourLevelChange: (level: number) => void;
  onContourSmoothnessChange?: (smoothness: number) => void;
  onToggleContour: () => void;
  onContourJointStyleChange?: (style: 'pseudo3d' | 'blocky' | 'cylinder') => void;
  startupBlockyRemaining?: number;
  voxelShape?: 'cube' | 'sphere';
  onVoxelShapeChange?: (shape: 'cube' | 'sphere') => void;
  voxelDensity?: number;
  onVoxelDensityChange?: (val: number) => void;
  hasBustAndGlutes?: boolean;
  onToggleBustAndGlutes?: (enabled: boolean) => void;
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
  onToggleRagdoll?: () => void;
  isWalkingRagdoll?: boolean;
  onToggleWalkingRagdoll?: () => void;
  onSpawnTentacle?: () => void;
  tentacleCount?: number;
  onSpawnCaveTentacle?: () => void;
  onSpawnWerewolf?: () => void;
  werewolfCount?: number;
  onSpawnWerewolfHot?: () => void;
  onSpawnDummyHot?: () => void;
  // Avatar Editor Props
  faceFeatureMode?: string;
  hasShirt?: boolean;
  shirtCoverageLevel?: number;
  shirtColorHex?: number;
  onToggleShirt?: (enabled: boolean) => void;
  onShirtCoverageLevelChange?: (level: number) => void;
  onShirtColorChange?: (colorHex: number) => void;
  skinColorHex?: number;
  onSkinColorChange?: (colorHex: number) => void;
  pantsColorHex?: number;
  onPantsColorChange?: (colorHex: number) => void;
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
  isSprinting?: boolean;
  onToggleSprint?: () => void;
  // Character Textures Config
  characterTexturesEnabled?: boolean;
  onToggleCharacterTextures?: (enabled: boolean) => void;
  // Adjunt System Config
  adjuntEnabled?: boolean;
  onToggleAdjunt?: (enabled: boolean) => void;
  // X-Ray & Acoustic Sound Wave Props
  xrayMode?: number;
  onXRayModeChange?: (mode: number) => void;
  showSoundWaves?: boolean;
  onToggleSoundWaves?: () => void;
  // Sandbox Stats Props
  intelligence?: number;
  onIntelligenceChange?: (val: number) => void;
  strength?: number;
  onStrengthChange?: (val: number) => void;
  speed?: number;
  onSpeedChange?: (val: number) => void;
  jumpPower?: number;
  onJumpPowerChange?: (val: number) => void;
  immunity?: number;
  onImmunityChange?: (val: number) => void;
  hearing?: number;
  onHearingChange?: (val: number) => void;
  resilience?: number;
  onResilienceChange?: (val: number) => void;
  reproduction?: number;
  onReproductionChange?: (val: number) => void;
  asesino?: number;
  onAsesinoChange?: (val: number) => void;
  psicopata?: number;
  onPsicopataChange?: (val: number) => void;
  amable?: number;
  onAmableChange?: (val: number) => void;
  onSpawnBlockHouse?: () => void;
  onSpawnObbyCourse?: () => void;
  isMuted?: boolean;
  onToggleMute?: () => void;
  onSpawnPaloRod?: () => void;
  onTriggerErection?: () => void;
  isFluidEmitting?: boolean;
  onTogglePlayerFluidEmission?: () => void;
  onTriggerPlayerFluidBurst?: () => void;
  // Emote Props
  activeEmote?: string | null;
  onTriggerEmote?: (emote: string | null) => void;
  // Cheats & Fly Mode Props
  isFlying?: boolean;
  onToggleFly?: () => void;
  onFlyAscend?: (active: boolean) => void;
  onFlyDescend?: (active: boolean) => void;
  isGodMode?: boolean;
  onToggleGodMode?: () => void;
  isZeroGravity?: boolean;
  onToggleZeroGravity?: () => void;
  onExplodeAllRagdolls?: () => void;
  onDuplicateProp?: () => void;
  // Map Selection Props
  activeMapId?: string;
  onSelectMap?: (mapId: string) => void;
  onRegenerateNeighborhood?: () => void;
  onRegenerateGenerateWorld?: () => void;
  onFocusCameraOnPlayer?: () => void;
  onFocusCameraOnFace?: () => void;
  // Avatar Editor Camera & Layout Props
  isAvatarEditorOpen?: boolean;
  onToggleAvatarEditor?: (
    isOpen: boolean,
    isWorkshop?: boolean,
    initialAngle?: 'front' | 'side' | 'back' | 'face',
    initialTab?: 'clothing' | 'accessories' | 'contour' | 'anatomy' | 'face'
  ) => void;
  isFaceFocusMode?: boolean;
  onToggleFaceFocusMode?: () => void;
  faceHudPerspective?: 'front' | 'threeQuarter' | 'side' | 'top' | 'back';
  onSetFaceHudPerspective?: (persp: 'front' | 'threeQuarter' | 'side' | 'top' | 'back') => void;
  onFaceHudOrbitDrag?: (deltaX: number, deltaY: number) => void;
  onRotateCameraToFront?: () => void;
  onRotateCameraToBack?: () => void;
  onRotateCameraToSide?: () => void;
  currentWeather?: 'day' | 'evening' | 'night' | 'rain' | 'storm';
  onWeatherChange?: (weather: 'day' | 'evening' | 'night' | 'rain' | 'storm') => void;
  // Main Menu & Multiplayer Props
  onOpenMainMenu?: () => void;
  isMultiplayer?: boolean;
  multiplayerRoomName?: string;
  multiplayerPlayerCount?: number;
  isPaintMode?: boolean;
  onTogglePaintMode?: () => void;
  paintHoleRadius?: number;
  onChangePaintHoleRadius?: (radius: number) => void;
  onOpenChat?: () => void;
  onSpawnPlayerDoll?: (playerName?: string) => void;
  onSpawnVoodooDoll?: (playerName?: string) => void;
  onSpawnMilkCarton?: (playerName?: string) => void;
  onArmJoystick?: (vector: { x: number; y: number }) => void;
  armGrabbedPart?: 'pechos' | 'genital' | null;
}

// Global console log and error capture singleton interceptor for the Log viewer
if (typeof window !== 'undefined') {
  if (!(window as any).__capturedLogs) {
    (window as any).__capturedLogs = [];
    const origLog = console.log;
    const origWarn = console.warn;
    const origError = console.error;

    console.log = (...args) => {
      origLog(...args);
      (window as any).__capturedLogs.push({
        type: 'log',
        time: new Date().toLocaleTimeString(),
        text: args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ')
      });
      if ((window as any).__capturedLogs.length > 300) (window as any).__capturedLogs.shift();
    };

    console.warn = (...args) => {
      origWarn(...args);
      (window as any).__capturedLogs.push({
        type: 'warn',
        time: new Date().toLocaleTimeString(),
        text: args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ')
      });
      if ((window as any).__capturedLogs.length > 300) (window as any).__capturedLogs.shift();
    };

    console.error = (...args) => {
      origError(...args);
      (window as any).__capturedLogs.push({
        type: 'error',
        time: new Date().toLocaleTimeString(),
        text: args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ')
      });
      if ((window as any).__capturedLogs.length > 300) (window as any).__capturedLogs.shift();
    };

    window.addEventListener('error', (e) => {
      (window as any).__capturedLogs.push({
        type: 'error',
        time: new Date().toLocaleTimeString(),
        text: `Error de ejecución: ${e.message} en ${e.filename}:${e.lineno}`
      });
      if ((window as any).__capturedLogs.length > 300) (window as any).__capturedLogs.shift();
    });
  }
}

export const TouchHUD: React.FC<TouchHUDProps> = ({
  activeHotNPCsInfo = [],
  onSetHotNPCPose,
  onMoveJoystick,
  onArmJoystick,
  armGrabbedPart = null,
  onJump,
  onRespawn,
  isAlive,
  cameraDistance,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  hasWeapon,
  onDropWeapon,
  isAiming,
  onToggleAim,
  isFreeCamAiming = false,
  onToggleFreeCamAiming,
  onShoot,
  shootCooldownRemaining = 0,
  onSpawnWeaponPickup,
  onSpawnSoldier,
  soldierCount,
  onSpawnDummy,
  onSpawnRagdoll,
  dummyCount = 0,
  onSpawnEvilDummy,
  onSpawnZombie,
  zombieCount = 0,
  onSpawnProp,
  onSpawnPlayerDoll,
  onSpawnVoodooDoll,
  onSpawnMilkCarton,
  onSpawnLiquid,
  onSpawnPool,
  liquidQuantity = 35,
  onSetLiquidQuantity,
  poolWaterHeight = 30,
  onSetPoolWaterHeight,
  contourLevel,
  contourSmoothness = 100,
  contourEnabled,
  contourJointStyle = 'cylinder',
  onContourLevelChange,
  onContourSmoothnessChange,
  onToggleContour,
  onContourJointStyleChange,
  startupBlockyRemaining = 0,
  voxelShape = 'cube',
  onVoxelShapeChange,
  voxelDensity = 2,
  onVoxelDensityChange,
  hasBustAndGlutes = false,
  onToggleBustAndGlutes,
  genitalType = 'none',
  onGenitalTypeChange,
  genitalMShaftLength = 1.0,
  onGenitalMShaftLengthChange,
  genitalMShaftThickness = 1.0,
  onGenitalMShaftThicknessChange,
  genitalMPinkSize = 1.0,
  onGenitalMPinkSizeChange,
  genitalFSize = 1.0,
  onGenitalFSizeChange,
  onToggleRagdoll,
  isWalkingRagdoll = false,
  onToggleWalkingRagdoll,
  onSpawnTentacle,
  tentacleCount = 0,
  onSpawnCaveTentacle,
  onSpawnWerewolf,
  werewolfCount = 0,
  onSpawnWerewolfHot,
  onSpawnDummyHot,
  faceFeatureMode = 'classic',
  hasShirt = false,
  shirtCoverageLevel = 5,
  shirtColorHex = 0x38bdf8,
  onToggleShirt,
  onShirtCoverageLevelChange,
  onShirtColorChange,
  skinColorHex = 0xf5d0b5,
  onSkinColorChange,
  pantsColorHex = 0x1e3a8a,
  onPantsColorChange,
  hairType = 'none',
  hairColorHex = 0x1c1917,
  onHairTypeChange,
  onHairColorChange,
  beardType = 'none',
  beardColorHex = 0x1c1917,
  onBeardTypeChange,
  onBeardColorChange,
  hatType = 'none',
  hatColorHex = 0xdc2626,
  onHatTypeChange,
  onHatColorChange,
  glassesType = 'none',
  glassesColorHex = 0x0f172a,
  onGlassesTypeChange,
  onGlassesColorChange,
  isSprinting = false,
  onToggleSprint,
  characterTexturesEnabled = false,
  onToggleCharacterTextures,
  xrayMode = 0,
  onXRayModeChange,
  showSoundWaves = true,
  onToggleSoundWaves,
  intelligence = 50,
  onIntelligenceChange,
  strength = 50,
  onStrengthChange,
  speed = 50,
  onSpeedChange,
  jumpPower = 50,
  onJumpPowerChange,
  immunity = 50,
  onImmunityChange,
  hearing = 50,
  onHearingChange,
  resilience = 50,
  onResilienceChange,
  reproduction = 50,
  onReproductionChange,
  asesino = 50,
  onAsesinoChange,
  psicopata = 50,
  onPsicopataChange,
  amable = 50,
  onAmableChange,
  onSpawnBlockHouse,
  onSpawnObbyCourse,
  isMuted = true,
  onToggleMute,
  activeEmote,
  onTriggerEmote,
  onSpawnPaloRod,
  onTriggerErection,
  isFluidEmitting = false,
  onTogglePlayerFluidEmission,
  onTriggerPlayerFluidBurst,
  isFlying = false,
  onToggleFly,
  onFlyAscend,
  onFlyDescend,
  isGodMode = false,
  onToggleGodMode,
  isZeroGravity = false,
  onToggleZeroGravity,
  onExplodeAllRagdolls,
  onDuplicateProp,
  activeMapId = 'neighborhood',
  onSelectMap,
  onRegenerateNeighborhood,
  onRegenerateGenerateWorld,
  onFocusCameraOnPlayer,
  onFocusCameraOnFace,
  isAvatarEditorOpen = false,
  onToggleAvatarEditor,
  isFaceFocusMode = false,
  onToggleFaceFocusMode,
  faceHudPerspective = 'front',
  onSetFaceHudPerspective,
  onFaceHudOrbitDrag,
  onRotateCameraToFront,
  onRotateCameraToBack,
  onRotateCameraToSide,
  currentWeather = 'day',
  onWeatherChange,
  onOpenMainMenu,
  isMultiplayer = false,
  multiplayerRoomName = 'Servidor #1',
  multiplayerPlayerCount = 1,
  isPaintMode = false,
  onTogglePaintMode,
  paintHoleRadius = 0.08,
  onChangePaintHoleRadius,
  onOpenChat,
}) => {
  const [showContourPanel, setShowContourPanel] = useState<boolean>(false);
  const [showAnatomyPanel, setShowAnatomyPanel] = useState<boolean>(false);
  const [showSandboxMenu, setShowSandboxMenu] = useState<boolean>(false);
  const [isRadialOpen, setIsRadialOpen] = useState<boolean>(false);
  const [isPluginsSubMenuOpen, setIsPluginsSubMenuOpen] = useState<boolean>(false);
  const [selectedPluginId, setSelectedPluginId] = useState<string | null>(null);
  const [pluginPlayerName, setPluginPlayerName] = useState<string>('');
  const [isLogOpen, setIsLogOpen] = useState<boolean>(false);
  const [logClicksCount, setLogClicksCount] = useState<number>(0);
  const [isLogUnlocked, setIsLogUnlocked] = useState<boolean>(() => {
    return localStorage.getItem('gorebox_log_unlocked') === 'true';
  });
  const [logFeedbackMessage, setLogFeedbackMessage] = useState<string | null>(null);

  const handleLogButtonClick = () => {
    if (isLogUnlocked) {
      setIsLogOpen(true);
      return;
    }
    const nextClicks = logClicksCount + 1;
    setLogClicksCount(nextClicks);
    if (nextClicks >= 20) {
      setIsLogUnlocked(true);
      localStorage.setItem('gorebox_log_unlocked', 'true');
      setIsLogOpen(true);
    }
  };

  const [copiedLogs, setCopiedLogs] = useState<boolean>(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [capturedLogs, setCapturedLogs] = useState<any[]>(() => (window as any).__capturedLogs || []);

  useEffect(() => {
    if (!isLogOpen) return;
    setCapturedLogs([...((window as any).__capturedLogs || [])]);
    const interval = setInterval(() => {
      setCapturedLogs([...((window as any).__capturedLogs || [])]);
    }, 1000);
    return () => clearInterval(interval);
  }, [isLogOpen]);
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

  const handleOpenAvatar = (open: boolean) => {
    onToggleAvatarEditor?.(open);
  };
  const [sandboxCategory, setSandboxCategory] = useState<'cheats' | 'maps' | 'stats' | 'npcs' | 'props' | 'climas'>('cheats');

  // Real-time FPS monitoring and Frame Rate adjustment state
  const [currentFps, setCurrentFps] = useState<number>(60);
  const [fpsLimitSetting, setFpsLimitSetting] = useState<string>(() => {
    return localStorage.getItem('gorebox_fps_limit') || '60';
  });

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let rafId: number;

    const loop = () => {
      frameCount++;
      const now = performance.now();
      if (now - lastTime >= 400) {
        const fps = Math.round((frameCount * 1000) / (now - lastTime));
        setCurrentFps(fps);
        frameCount = 0;
        lastTime = now;
      }
      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

    const handleFpsChange = () => {
      setFpsLimitSetting(localStorage.getItem('gorebox_fps_limit') || '60');
    };
    window.addEventListener('gorebox_fps_change', handleFpsChange);
    window.addEventListener('storage', handleFpsChange);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('gorebox_fps_change', handleFpsChange);
      window.removeEventListener('storage', handleFpsChange);
    };
  }, []);

  const handleSetFpsLimit = (val: string) => {
    setFpsLimitSetting(val);
    localStorage.setItem('gorebox_fps_limit', val);
    window.dispatchEvent(new Event('gorebox_fps_change'));
    window.dispatchEvent(new Event('storage'));
  };

  const shirtColorPalettes = [
    { name: 'Celeste', hex: 0x38bdf8, bg: 'bg-sky-400' },
    { name: 'Carmesí', hex: 0xe11d48, bg: 'bg-rose-600' },
    { name: 'Esmeralda', hex: 0x10b981, bg: 'bg-emerald-500' },
    { name: 'Púrpura', hex: 0x8b5cf6, bg: 'bg-purple-500' },
    { name: 'Negro', hex: 0x18181b, bg: 'bg-zinc-900' },
    { name: 'Blanco', hex: 0xf8fafc, bg: 'bg-slate-100' },
    { name: 'Naranja', hex: 0xf97316, bg: 'bg-orange-500' },
    { name: 'Amarillo', hex: 0xeab308, bg: 'bg-yellow-500' },
  ];

  const skinColorPalettes = [
    { name: 'Clara', hex: 0xf5d0b5, bg: 'bg-[#f5d0b5]' },
    { name: 'Beige', hex: 0xf0c8a0, bg: 'bg-[#f0c8a0]' },
    { name: 'Canela', hex: 0xdf9d76, bg: 'bg-[#df9d76]' },
    { name: 'Bronce', hex: 0xb87d4b, bg: 'bg-[#b87d4b]' },
    { name: 'Oscura', hex: 0x5c3826, bg: 'bg-[#5c3826]' },
    { name: 'Zombie', hex: 0x84cc16, bg: 'bg-lime-500' },
  ];

  const pantsColorPalettes = [
    { name: 'Azul Marino', hex: 0x1e3a8a, bg: 'bg-blue-900' },
    { name: 'Negro', hex: 0x18181b, bg: 'bg-zinc-900' },
    { name: 'Gris', hex: 0x64748b, bg: 'bg-slate-500' },
    { name: 'Militar', hex: 0x14532d, bg: 'bg-green-900' },
    { name: 'Café', hex: 0x78350f, bg: 'bg-amber-950' },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none z-30 flex flex-col justify-between p-2.5 sm:p-4 select-none touch-none overflow-hidden">
      {/* Center Aim Crosshair */}
      {isAiming && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="relative flex items-center justify-center">
            <div className="w-8 h-8 rounded-full border border-red-500/70 animate-pulse" />
            <div className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-md shadow-red-500" />
            <div className="absolute -top-3 w-0.5 h-2 bg-red-500/80" />
            <div className="absolute -bottom-3 w-0.5 h-2 bg-red-500/80" />
            <div className="absolute -left-3 w-2 h-0.5 bg-red-500/80" />
            <div className="absolute -right-3 w-2 h-0.5 bg-red-500/80" />
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TOP HEADER: Clean Sound Controls & Status Badges */}
      {/* ========================================================================= */}
      <div className="flex items-start justify-between w-full pointer-events-auto gap-2 max-w-5xl mx-auto px-2 pt-2">
        {/* Left: Main Menu & Sound Controls / Chat & Alternate Face View Box */}
        <div className="shrink-0 flex flex-col items-start gap-1.5 relative z-50">
          {/* Main Top Control Buttons Column (Rostro 3D stacked directly above Chat) */}
          <div className="w-22 sm:w-28 flex flex-col items-center gap-1">
            <button
              id="hud-btn-top-chat-face-dropdown"
              onClick={onToggleFaceFocusMode}
              className={`w-full py-1 rounded-xl text-[10px] font-black uppercase tracking-wide transition-all frutiger-aero-glass ${
                isFaceFocusMode
                  ? 'frutiger-pink ring-2 ring-pink-300 shadow-lg scale-105'
                  : 'frutiger-purple hover:scale-105'
              } active:scale-95 shadow-md group cursor-pointer flex items-center justify-center gap-1`}
              title="Vista Alterna / Rostro 3D (Cámara y Vista Previa en Vivo)"
            >
              <WorkshopAvatarFaceBadge className="w-4 h-4" skinColorHex={skinColorHex} shirtColorHex={shirtColorHex} faceFeatureMode={faceFeatureMode} hasShirt={hasShirt} />
              <span>Rostro 3D</span>
            </button>

            {onOpenChat && (
              <button
                id="hud-btn-top-chat"
                onClick={onOpenChat}
                className="w-full flex items-center justify-center gap-1.5 py-1.5 sm:py-2 rounded-2xl text-[12px] font-black uppercase tracking-wider transition-all frutiger-aero-glass frutiger-blue active:scale-95 cursor-pointer"
                title="Abrir Chat y Diálogos [Enter o T]"
              >
                <MessageSquare className="w-4 h-4 text-white" />
                <span>Chat</span>
              </button>
            )}
          </div>

          {/* Alternate Character / 3D Face Viewfinder Box */}
          {isFaceFocusMode && (
            <div className="w-48 sm:w-56 p-2 rounded-2xl bg-slate-900/95 backdrop-blur-md border-2 border-pink-400/60 shadow-2xl flex flex-col gap-1.5 pointer-events-auto animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between px-1">
                <span className="text-[10px] sm:text-[11px] font-black uppercase text-pink-300 tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-pink-400" /> Vista Alterna 3D
                </span>
                <button
                  onClick={onToggleFaceFocusMode}
                  className="w-5 h-5 rounded-full bg-slate-800 hover:bg-red-500 text-white flex items-center justify-center text-xs font-black cursor-pointer transition-colors"
                  title="Cerrar vista alternada"
                >
                  ×
                </button>
              </div>

              {/* Action row: Focus game camera on face & open face editor */}
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={() => onFocusCameraOnFace ? onFocusCameraOnFace() : onFocusCameraOnPlayer?.()}
                  className="py-1 px-1.5 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-extrabold text-[9px] uppercase flex items-center justify-center gap-1 shadow transition-all cursor-pointer active:scale-95"
                  title="Enfocar la cámara del juego directamente en la cara"
                >
                  <Target className="w-3 h-3" />
                  <span>Enfocar</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onToggleAvatarEditor?.(true, false, 'front', 'face');
                  }}
                  className="py-1 px-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-[9px] uppercase flex items-center justify-center gap-1 shadow transition-all cursor-pointer active:scale-95"
                  title="Abrir editor de avatar centrado de frente"
                >
                  <Palette className="w-3 h-3" />
                  <span>Editar</span>
                </button>
              </div>

              {/* Quick Perspective Selectors Bar */}
              <div className="flex items-center justify-between gap-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800">
                {(
                  [
                    { id: 'front', label: 'Frente' },
                    { id: 'threeQuarter', label: '3/4' },
                    { id: 'side', label: 'Perfil' },
                    { id: 'top', label: 'Arriba' },
                    { id: 'back', label: 'Atrás' },
                  ] as const
                ).map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => onSetFaceHudPerspective && onSetFaceHudPerspective(p.id)}
                    className={`flex-1 text-[8px] sm:text-[9px] font-black uppercase py-0.5 rounded-lg transition-all cursor-pointer ${
                      faceHudPerspective === p.id
                        ? 'bg-pink-600 text-white shadow ring-1 ring-pink-300 font-bold'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                    title={`Cambiar a perspectiva: ${p.label}`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              {/* The 3D scissor canvas viewport with pointer drag rotation */}
              <div
                id="face-hud-3d-preview-viewport"
                className="w-full h-28 sm:h-36 rounded-xl bg-slate-950 border border-slate-700/80 overflow-hidden relative shadow-inner flex items-center justify-center cursor-grab active:cursor-grabbing touch-none select-none"
                onPointerDown={(e) => {
                  const target = e.currentTarget;
                  try {
                    target.setPointerCapture(e.pointerId);
                  } catch (err) {}
                  let lastX = e.clientX;
                  let lastY = e.clientY;

                  const onMove = (moveEv: PointerEvent) => {
                    const dx = moveEv.clientX - lastX;
                    const dy = moveEv.clientY - lastY;
                    lastX = moveEv.clientX;
                    lastY = moveEv.clientY;
                    if (onFaceHudOrbitDrag) {
                      onFaceHudOrbitDrag(dx, dy);
                    }
                  };

                  const onUp = (upEv: PointerEvent) => {
                    try {
                      target.releasePointerCapture(upEv.pointerId);
                    } catch (err) {}
                    target.removeEventListener('pointermove', onMove as any);
                    target.removeEventListener('pointerup', onUp as any);
                    target.removeEventListener('pointercancel', onUp as any);
                  };

                  target.addEventListener('pointermove', onMove as any);
                  target.addEventListener('pointerup', onUp as any);
                  target.addEventListener('pointercancel', onUp as any);
                }}
              >
                {/* Subtle corner crosshairs / HUD guides */}
                <div className="absolute top-1.5 left-1.5 w-2.5 h-2.5 border-t-2 border-l-2 border-pink-400/70 pointer-events-none" />
                <div className="absolute top-1.5 right-1.5 w-2.5 h-2.5 border-t-2 border-r-2 border-pink-400/70 pointer-events-none" />
                <div className="absolute bottom-1.5 left-1.5 w-2.5 h-2.5 border-b-2 border-l-2 border-pink-400/70 pointer-events-none" />
                <div className="absolute bottom-1.5 right-1.5 w-2.5 h-2.5 border-b-2 border-r-2 border-pink-400/70 pointer-events-none" />
                
                <span className="absolute bottom-1 text-[7.5px] text-pink-300/80 font-bold pointer-events-none uppercase tracking-wider bg-black/40 px-1.5 rounded">
                  Arrastra para rotar 360°
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Center: '+' Radial Menu Button & Status Badges (Shifted more to center & right ->) */}
        <div className="flex-1 flex flex-col items-center justify-center gap-1.5 translate-x-8 sm:translate-x-16">
          <div className="flex items-center justify-center relative">
            {isRadialOpen && (
              <div
                className="fixed inset-0 z-40 bg-black/15 backdrop-blur-[1px]"
                onClick={() => setIsRadialOpen(false)}
              />
            )}
            <button
              id="hud-btn-top-center-plus"
              onClick={() => setIsRadialOpen(!isRadialOpen)}
              className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center transition-all frutiger-aero-glass ${
                isRadialOpen
                  ? 'frutiger-pink rotate-45 scale-105 ring-2 ring-pink-400/80 shadow-lg'
                  : 'frutiger-pink hover:scale-105'
              } active:scale-95 relative z-50 pointer-events-auto cursor-pointer`}
              title="Menú Rápido HUD (+)"
            >
              <Plus className="w-6 h-6 sm:w-7 sm:h-7 stroke-[3]" />
            </button>

            {isRadialOpen && (
              <div className="absolute top-14 left-1/2 -translate-x-1/2 z-[60] flex flex-col items-center gap-2 animate-in fade-in zoom-in-95 duration-150">
                {/* Horizontal Scrolling Menu Bar */}
                <div className="flex items-center gap-2.5 p-2 bg-slate-900/95 border border-purple-500/30 backdrop-blur-md rounded-2xl shadow-2xl max-w-[90vw] sm:max-w-[420px] overflow-x-auto whitespace-nowrap scrollbar-thin select-none">
                  {/* 0. Regresar al Menú Principal */}
                  {onOpenMainMenu && (
                    <button
                      type="button"
                      id="radial-btn-menu"
                      onClick={() => {
                        onOpenMainMenu();
                        setIsRadialOpen(false);
                      }}
                      className="flex flex-col items-center gap-1 p-2 bg-pink-600/20 hover:bg-pink-600/50 border border-pink-500/30 rounded-xl w-16 h-14 justify-center shadow-md hover:scale-105 active:scale-95 transition-all text-white cursor-pointer shrink-0"
                      title="Regresar al Menú Principal"
                    >
                      <Globe className="w-4 h-4 text-pink-300" />
                      <span className="text-[8px] font-black uppercase tracking-tight leading-none text-pink-200">Menú</span>
                    </button>
                  )}

                  {/* 1. Botón de Pintar (Paint Mode) */}
                  <button
                    type="button"
                    id="radial-btn-paint"
                    onClick={onTogglePaintMode}
                    className={`flex flex-col items-center gap-1 p-2 border rounded-xl w-16 h-14 justify-center shadow-md hover:scale-105 active:scale-95 transition-all text-white cursor-pointer shrink-0 ${
                      isPaintMode
                        ? 'bg-pink-600 border-pink-400 ring-2 ring-pink-300'
                        : 'bg-pink-600/20 border-pink-500/30 hover:bg-pink-600/50'
                    }`}
                    title="Pintar / Cortar Hueco"
                  >
                    <Paintbrush className="w-4 h-4 text-pink-300" />
                    <span className="text-[8px] font-black uppercase tracking-tight leading-none text-pink-200">Pintar</span>
                  </button>

                  {/* 2. Avatar */}
                  <button
                    type="button"
                    id="radial-btn-avatar"
                    onClick={() => {
                      handleOpenAvatar(true);
                      setShowSandboxMenu(false);
                      setShowAnatomyPanel(false);
                      setIsRadialOpen(false);
                      setIsPluginsSubMenuOpen(false);
                    }}
                    className="flex flex-col items-center gap-1 p-2 bg-purple-600/20 hover:bg-purple-600/50 border border-purple-500/30 rounded-xl w-16 h-14 justify-center shadow-md hover:scale-105 active:scale-95 transition-all text-white cursor-pointer shrink-0"
                    title="Abrir Editor de Avatar"
                  >
                    <WorkshopAvatarFaceBadge className="w-6 h-6" skinColorHex={skinColorHex} shirtColorHex={shirtColorHex} faceFeatureMode={faceFeatureMode} hasShirt={hasShirt} />
                    <span className="text-[8px] font-black uppercase tracking-tight leading-none text-purple-200">Avatar</span>
                  </button>

                  {/* 3. Sandbox */}
                  <button
                    type="button"
                    id="radial-btn-sandbox"
                    onClick={() => {
                      setShowSandboxMenu(true);
                      setShowAnatomyPanel(false);
                      setIsRadialOpen(false);
                      setIsPluginsSubMenuOpen(false);
                    }}
                    className="flex flex-col items-center gap-1 p-2 bg-orange-600/20 hover:bg-orange-600/50 border border-orange-500/30 rounded-xl w-16 h-14 justify-center shadow-md hover:scale-105 active:scale-95 transition-all text-white cursor-pointer shrink-0"
                    title="Abrir Menú Sandbox"
                  >
                    <Boxes className="w-4 h-4 text-orange-300" />
                    <span className="text-[8px] font-black uppercase tracking-tight leading-none text-orange-200">Sandbox</span>
                  </button>

                  {/* 4. Configuración */}
                  <button
                    type="button"
                    id="radial-btn-config"
                    onClick={() => {
                      setShowAnatomyPanel(true);
                      setShowSandboxMenu(false);
                      setIsRadialOpen(false);
                      setIsPluginsSubMenuOpen(false);
                    }}
                    className="flex flex-col items-center gap-1 p-2 bg-cyan-600/20 hover:bg-cyan-600/50 border border-cyan-500/30 rounded-xl w-16 h-14 justify-center shadow-md hover:scale-105 active:scale-95 transition-all text-white cursor-pointer shrink-0"
                    title="Abrir Configuración"
                  >
                    <Settings className="w-4 h-4 text-cyan-300" />
                    <span className="text-[8px] font-black uppercase tracking-tight leading-none text-cyan-200">Config</span>
                  </button>

                  {/* 5. Plugins */}
                  <button
                    type="button"
                    id="radial-btn-plugins"
                    onClick={() => {
                      setIsPluginsSubMenuOpen(!isPluginsSubMenuOpen);
                    }}
                    className={`flex flex-col items-center gap-1 p-2 border rounded-xl w-16 h-14 justify-center shadow-md hover:scale-105 active:scale-95 transition-all text-white cursor-pointer shrink-0 ${
                      isPluginsSubMenuOpen
                        ? 'bg-amber-600 border-amber-400'
                        : 'bg-amber-600/20 border-amber-500/30 hover:bg-amber-600/50'
                    }`}
                    title="Abrir Taller de Plugins"
                  >
                    <Zap className="w-4 h-4 text-amber-300 animate-pulse" />
                    <span className="text-[8px] font-black uppercase tracking-tight leading-none text-amber-200">Plugins</span>
                  </button>
                </div>

                {/* Controles del tamaño de hueco de Pintar dentro del menú + */}
                {isPaintMode && (
                  <div className="flex items-center gap-2 px-3.5 py-1.5 bg-slate-900/95 border border-pink-500/70 backdrop-blur-md rounded-full shadow-2xl text-white text-xs animate-in fade-in duration-150 pointer-events-auto">
                    <span className="font-bold text-pink-400 whitespace-nowrap text-[11px]">
                      Hueco: {Math.round((paintHoleRadius || 0.08) * 2 * 100)}cm
                    </span>
                    <input
                      type="range"
                      min="0.03"
                      max="0.25"
                      step="0.01"
                      value={paintHoleRadius || 0.08}
                      onChange={(e) => onChangePaintHoleRadius?.(parseFloat(e.target.value))}
                      className="w-24 sm:w-32 accent-pink-500 cursor-pointer h-1.5"
                    />
                  </div>
                )}

                {/* Vertical Plugins List (Opened below when Plugins clicked) */}
                {isPluginsSubMenuOpen && (
                  <div className="w-full max-w-[280px] bg-slate-950/95 border border-amber-500/40 rounded-2xl p-2.5 shadow-2xl flex flex-col gap-2 animate-in slide-in-from-top-3 duration-200 text-left">
                    <div className="text-[10px] font-black uppercase tracking-wider text-amber-400 border-b border-white/10 pb-1.5 flex items-center justify-between">
                      <span>⚡ PLUGINS INSTALADOS</span>
                      <button type="button" onClick={() => setIsPluginsSubMenuOpen(false)} className="text-zinc-500 hover:text-white">✕</button>
                    </div>

                    <div className="flex flex-col gap-1.5 max-h-48 overflow-y-auto scrollbar-thin pr-0.5">
                      {(() => {
                        const activeList = [
                          { id: 'plugin_doll', name: 'Doll from player', desc: 'Genera clon del jugador', icon: '🧸' },
                          { id: 'plugin_vudu', name: 'Vuduu Doll from player', desc: 'Muñeco vudú de tu vida', icon: '🎎' },
                          { id: 'plugin_milk', name: 'Milk spawner', desc: 'Genera cajas de leche', icon: '🥛' }
                        ].filter(item => localStorage.getItem(`gbox_${item.id}`) !== 'false');

                        if (activeList.length === 0) {
                          return (
                            <div className="text-[10px] font-bold text-zinc-500 text-center py-5 leading-relaxed">
                              No tienes plugins activos.<br/>Actívalos en el Taller de Plugins desde el Menú.
                            </div>
                          );
                        }

                        return activeList.map((item) => {
                          const owned = unlockedItems.includes(item.id);
                          const isSelected = selectedPluginId === item.id;

                          return (
                            <div 
                              key={item.id} 
                              className="flex flex-col p-1.5 rounded-lg bg-white/5 border border-white/5 hover:border-amber-500/20 transition-all gap-1.5"
                            >
                              <div className="flex items-center justify-between gap-2 w-full">
                                <div className="flex items-center gap-1.5">
                                  <div className="w-6 h-6 bg-zinc-50 border-[2px] border-black flex items-center justify-center shadow-inner relative overflow-hidden shrink-0 rounded text-xs">
                                    {item.icon}
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-[10px] font-bold text-slate-100">{item.name}</span>
                                    <span className="text-[8px] text-slate-400 font-semibold">{item.desc}</span>
                                  </div>
                                </div>

                                {owned ? (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      if (isSelected) {
                                        setSelectedPluginId(null);
                                      } else {
                                        setSelectedPluginId(item.id);
                                        setPluginPlayerName('');
                                      }
                                    }}
                                    className="px-2 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 shadow shadow-amber-500/30 rounded text-[8px] font-black uppercase transition-all active:scale-95 cursor-pointer whitespace-nowrap"
                                  >
                                    {isSelected ? 'CERRAR' : 'SELECCIONAR'}
                                  </button>
                                ) : (
                                  <span className="text-[8px] font-black text-rose-400 bg-rose-950/30 border border-rose-500/20 px-1.5 py-0.5 rounded">
                                    LCK 🔒
                                  </span>
                                )}
                              </div>

                              {/* Conditionally render input text field below the plugin item row */}
                              {isSelected && (
                                <div className="flex flex-col gap-1 mt-1 p-1.5 bg-amber-500/10 border border-amber-500/20 rounded-md">
                                  <span className="text-[7.5px] font-extrabold text-amber-300 uppercase tracking-wider">Nombre del Jugador:</span>
                                  <div className="flex items-center gap-1">
                                    <input
                                      type="text"
                                      value={pluginPlayerName}
                                      onChange={(e) => setPluginPlayerName(e.target.value)}
                                      placeholder="Escribe un nombre..."
                                      className="flex-1 bg-slate-900/90 text-white text-[9px] font-bold px-1.5 py-0.5 rounded border border-white/20 focus:outline-none focus:border-amber-500 pointer-events-auto"
                                      onClick={(e) => e.stopPropagation()}
                                      onKeyDown={(e) => {
                                        e.stopPropagation();
                                        if (e.key === 'Enter') {
                                          const targetName = pluginPlayerName.trim() || 'Player';
                                          if (item.id === 'plugin_doll' && onSpawnPlayerDoll) {
                                            onSpawnPlayerDoll(targetName);
                                          } else if (item.id === 'plugin_vudu' && onSpawnVoodooDoll) {
                                            onSpawnVoodooDoll(targetName);
                                          } else if (item.id === 'plugin_milk' && onSpawnMilkCarton) {
                                            onSpawnMilkCarton(targetName);
                                          }
                                          setSelectedPluginId(null);
                                          setPluginPlayerName('');
                                        }
                                      }}
                                    />
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        const targetName = pluginPlayerName.trim() || 'Player';
                                        if (item.id === 'plugin_doll' && onSpawnPlayerDoll) {
                                          onSpawnPlayerDoll(targetName);
                                        } else if (item.id === 'plugin_vudu' && onSpawnVoodooDoll) {
                                          onSpawnVoodooDoll(targetName);
                                        } else if (item.id === 'plugin_milk' && onSpawnMilkCarton) {
                                          onSpawnMilkCarton(targetName);
                                        }
                                        setSelectedPluginId(null);
                                        setPluginPlayerName('');
                                      }}
                                      className="px-2 py-0.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-[8px] font-black uppercase rounded cursor-pointer pointer-events-auto shrink-0"
                                    >
                                      SPAWN
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        });
                      })()}
                    </div>
                    <div className="text-[8px] text-center text-zinc-500 font-bold tracking-wide border-t border-white/5 pt-1.5">
                      Compra nuevos plugins en Taller ➔ Plugins
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Center: Startup Blocky Countdown or Multiplayer Status Badge */}
          {isMultiplayer ? (
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-slate-950/90 border border-emerald-500/50 text-emerald-300 shadow-xl backdrop-blur-md animate-pulse text-[10px] font-black uppercase tracking-wide">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>{multiplayerRoomName} ({multiplayerPlayerCount} Jugadores Reales)</span>
            </div>
          ) : startupBlockyRemaining > 0 ? (
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-2xl bg-amber-500/90 text-slate-950 border border-amber-300 shadow-xl backdrop-blur-md animate-pulse">
              <span className="text-xs font-black uppercase tracking-wider">
                🧱 Vista Cúbica Bloques: {startupBlockyRemaining.toFixed(1)}s
              </span>
            </div>
          ) : null}
        </div>

        {/* Right side spacer for top bar balance */}
        <div className="w-32 shrink-0 flex justify-end" />
      </div>

      {/* Sandbox Modal (Opened exclusively via Radial '+' Wheel) */}
      {showSandboxMenu && (
        <div
          id="sandbox-modal"
          className="absolute left-1/2 -translate-x-1/2 top-16 w-[92vw] sm:w-[420px] max-h-[75vh] bg-white border-2 border-slate-100 rounded-[2rem] shadow-2xl p-4.5 z-50 flex flex-col gap-3.5 animate-in fade-in zoom-in-95 duration-200 pointer-events-auto text-slate-800"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div className="flex items-center gap-2 text-orange-500 font-black text-xs uppercase tracking-wider">
              <Boxes className="w-4.5 h-4.5" />
              <span>Menú Sandbox</span>
            </div>
            <button
              onClick={() => setShowSandboxMenu(false)}
              className="text-[10px] font-black text-slate-500 hover:text-slate-800 px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200/60 transition-colors"
            >
              ✕ Cerrar
            </button>
          </div>

          <div className="flex gap-3 h-[42vh] overflow-hidden">
            {/* Left Column: Categories Navigation (Scrollable above and below) */}
            <div className="w-24 sm:w-28 flex flex-col gap-1.5 overflow-y-auto pr-1 border-r border-slate-150/60 shrink-0 scrollbar-none">
              {(['cheats', 'maps', 'stats', 'npcs', 'props', 'climas'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSandboxCategory(cat)}
                  className={`px-2.5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-tight transition-all text-left flex flex-col gap-0.5 justify-center border ${
                    cat === 'cheats'
                      ? sandboxCategory === 'cheats'
                        ? 'bg-blue-600 text-white border-blue-400 shadow-md shadow-blue-500/20'
                        : 'text-blue-600 bg-blue-50 border-blue-100 hover:bg-blue-100/70'
                      : cat === 'maps'
                        ? sandboxCategory === 'maps'
                          ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-500/20'
                          : 'text-emerald-600 bg-emerald-50 border-emerald-100 hover:bg-emerald-100/70'
                        : sandboxCategory === cat
                          ? 'bg-orange-500 text-white border-orange-400 shadow-md shadow-orange-500/20'
                          : 'text-slate-600 bg-slate-50 border-slate-100 hover:bg-slate-100 hover:text-slate-800'
                  }`}
                >
                  <span className="truncate">
                    {cat === 'cheats' ? '⚡ CHEATS' : cat === 'maps' ? '🗺️ MAPAS' : cat === 'climas' ? '⛅ CLIMAS' : cat === 'npcs' ? '🤖 NPCS' : cat === 'props' ? '🔨 PROPS' : '📊 STATS'}
                  </span>
                </button>
              ))}
            </div>

            {/* Right Column: Active Category Content Area */}
            <div className="flex-1 overflow-y-auto pl-1 scrollbar-thin space-y-3">
              <div className="grid grid-cols-2 gap-1.5">
                {/* CHEATS CATEGORY */}
                {sandboxCategory === 'cheats' && (
                  <div className="col-span-2 space-y-2.5 p-1">
                    <div className="text-[10px] font-black text-blue-600 uppercase tracking-wider mb-1 flex items-center justify-between">
                      <span>Trucos y Cheats Especiales</span>
                      <span className="text-[9px] text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-md border border-blue-100">Sandbox Azul</span>
                    </div>

                    {/* Modo Volar Card */}
                    <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-2.5 space-y-2 text-slate-800">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">🪽</span>
                          <div>
                            <div className="text-[11px] font-black text-slate-800">Modo Volar (Fly)</div>
                            <div className="text-[9px] font-bold text-slate-500">Vuela libremente sin gravedad</div>
                          </div>
                        </div>
                        <button
                          onClick={onToggleFly}
                          className={`px-2.5 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-tight transition-all ${
                            isFlying
                              ? 'bg-blue-600 text-white border border-blue-400 shadow-md shadow-blue-500/30'
                              : 'bg-slate-100 text-blue-600 border border-blue-100 hover:bg-blue-100/60'
                          }`}
                        >
                          {isFlying ? 'VOLANDO ON' : 'VOLAR OFF'}
                        </button>
                      </div>

                      {/* Botones rápidos de altitud cuando vuela */}
                      {isFlying && (
                        <div className="flex gap-1.5 pt-1">
                          <button
                            onMouseDown={() => onFlyAscend?.(true)}
                            onMouseUp={() => onFlyAscend?.(false)}
                            onTouchStart={() => onFlyAscend?.(true)}
                            onTouchEnd={() => onFlyAscend?.(false)}
                            className="flex-1 py-1 bg-blue-600 hover:bg-blue-500 text-white text-[9px] font-black uppercase rounded-lg border border-blue-400 active:scale-95"
                          >
                            ▲ Subir Altura
                          </button>
                          <button
                            onMouseDown={() => onFlyDescend?.(true)}
                            onMouseUp={() => onFlyDescend?.(false)}
                            onTouchStart={() => onFlyDescend?.(true)}
                            onTouchEnd={() => onFlyDescend?.(false)}
                            className="flex-1 py-1 bg-slate-100 hover:bg-slate-200 text-blue-600 text-[9px] font-black uppercase rounded-lg border border-blue-200 active:scale-95"
                          >
                            ▼ Bajar Altura
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Modo Dios (God Mode) */}
                    <div className="bg-slate-50 border border-slate-200/60 p-2.5 rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-base">🛡️</span>
                        <div>
                          <div className="text-[10px] font-black text-slate-800">Modo Dios (Inmortal)</div>
                          <div className="text-[8.5px] font-bold text-slate-500">Salud infinita y sin daño</div>
                        </div>
                      </div>
                      <button
                        onClick={onToggleGodMode}
                        className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase transition-all ${
                          isGodMode
                            ? 'bg-emerald-600 text-white border border-emerald-400'
                            : 'bg-slate-100 text-slate-500 border border-slate-200'
                        }`}
                      >
                        {isGodMode ? 'ACTIVO' : 'OFF'}
                      </button>
                    </div>

                    {/* Gravedad Cero */}
                    <div className="bg-slate-50 border border-slate-200/60 p-2.5 rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-base">🌌</span>
                        <div>
                          <div className="text-[10px] font-black text-slate-800">Gravedad Cero / Lunar</div>
                          <div className="text-[8.5px] font-bold text-slate-500">Objetos y ragdolls flotan</div>
                        </div>
                      </div>
                      <button
                        onClick={onToggleZeroGravity}
                        className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase transition-all ${
                          isZeroGravity
                            ? 'bg-purple-600 text-white border border-purple-400'
                            : 'bg-slate-100 text-slate-500 border border-slate-200'
                        }`}
                      >
                        {isZeroGravity ? 'ACTIVO' : 'OFF'}
                      </button>
                    </div>

                    {/* Super Velocidad + Super Salto botones rápidos */}
                    <div className="grid grid-cols-2 gap-1.5">
                      <button
                        onClick={() => {
                          onSpeedChange?.(speed >= 100 ? 50 : 100);
                        }}
                        className={`p-2 rounded-xl border flex flex-col items-center gap-0.5 text-center transition-all ${
                          speed >= 95
                            ? 'bg-amber-100 border-amber-400 text-amber-800'
                            : 'bg-slate-50 border-slate-200/60 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <span className="text-sm">⚡</span>
                        <span className="text-[9px] font-black uppercase">Super Velocidad</span>
                        <span className="text-[8px] text-amber-600 font-bold">{speed >= 95 ? 'MAX (100)' : 'Normal (50)'}</span>
                      </button>

                      <button
                        onClick={() => {
                          onJumpPowerChange?.(jumpPower >= 100 ? 50 : 100);
                        }}
                        className={`p-2 rounded-xl border flex flex-col items-center gap-0.5 text-center transition-all ${
                          jumpPower >= 95
                            ? 'bg-emerald-100 border-emerald-400 text-emerald-800'
                            : 'bg-slate-50 border-slate-200/60 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <span className="text-sm">🦘</span>
                        <span className="text-[9px] font-black uppercase">Mega Salto</span>
                        <span className="text-[8px] text-emerald-600 font-bold">{jumpPower >= 95 ? 'MAX (100)' : 'Normal (50)'}</span>
                      </button>
                    </div>

                    {/* Botón Caos Total */}
                    <button
                      onClick={onExplodeAllRagdolls}
                      className="w-full p-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 border border-red-400 text-white rounded-xl text-[9px] font-black uppercase flex items-center justify-center gap-1.5 active:scale-95 shadow-md shadow-red-500/10"
                    >
                      <span>💥</span>
                      <span>Impulso Explosivo a Todos</span>
                    </button>
                  </div>
                )}

                {/* MAPS CATEGORY */}
                {sandboxCategory === 'maps' && (
                  <div className="col-span-2 space-y-2.5 p-1 max-h-[38vh] overflow-y-auto scrollbar-thin">
                    <div className="text-[10px] font-black text-emerald-600 uppercase tracking-wider mb-1 flex items-center justify-between">
                      <span>Seleccionar Mapa & Entorno</span>
                      <span className="text-[9px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md border border-emerald-100">3D Sandbox</span>
                    </div>

                    {/* Mapa 1: Campo de Césped Verde */}
                    <div
                      className={`p-2.5 rounded-xl border transition-all flex flex-col gap-2 ${
                        activeMapId === 'lab' || activeMapId === 'grass_field'
                          ? 'bg-emerald-50 border-emerald-300 ring-2 ring-emerald-400/10 shadow-xs'
                          : 'bg-slate-50 border-slate-200/60 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        <span className="text-xl shrink-0">🌿</span>
                        <div>
                          <div className="text-[11px] font-black text-slate-800">Default Grass (Campo)</div>
                          <div className="text-[8.5px] font-semibold text-slate-500 leading-normal">Terreno amplio de césped verde para combate y pruebas físicas</div>
                        </div>
                      </div>
                      <button
                        onClick={() => onSelectMap?.('lab')}
                        className={`w-full py-1.5 rounded-lg text-[9px] font-black uppercase tracking-tight transition-all ${
                          activeMapId === 'lab' || activeMapId === 'grass_field'
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'bg-slate-200 hover:bg-emerald-600 text-slate-700 hover:text-white'
                        }`}
                      >
                        {activeMapId === 'lab' || activeMapId === 'grass_field' ? 'ACTIVO' : 'CARGAR MAPA'}
                      </button>
                    </div>

                    {/* Mapa 2: Césped 2 */}
                    <div
                      className={`p-2.5 rounded-xl border transition-all flex flex-col gap-2 ${
                        activeMapId === 'cesped2'
                          ? 'bg-emerald-50 border-emerald-300 ring-2 ring-emerald-400/10 shadow-xs'
                          : 'bg-slate-50 border-slate-200/60 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        <span className="text-xl shrink-0">🌱</span>
                        <div>
                          <div className="text-[11px] font-black text-slate-800">Césped 2 (Bloques Destruibles)</div>
                          <div className="text-[8.5px] font-semibold text-slate-500 leading-normal">Malla optimizada de bloques destruibles tiro a tiro</div>
                        </div>
                      </div>
                      <button
                        onClick={() => onSelectMap?.('cesped2')}
                        className={`w-full py-1.5 rounded-lg text-[9px] font-black uppercase tracking-tight transition-all ${
                          activeMapId === 'cesped2'
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'bg-slate-200 hover:bg-emerald-600 text-slate-700 hover:text-white'
                        }`}
                      >
                        {activeMapId === 'cesped2' ? 'ACTIVO' : 'CARGAR MAPA'}
                      </button>
                    </div>
                  </div>
                )}

                {/* STATS CATEGORY */}
                {sandboxCategory === 'stats' && (
                  <div className="col-span-2 space-y-2.5 p-1 max-h-[38vh] overflow-y-auto scrollbar-thin">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] font-black text-orange-600 uppercase tracking-wider sticky top-0 bg-white z-10 py-1">
                        Atributos NPC
                      </span>
                      <div className="flex items-center gap-1 shrink-0">
                        {[20, 50, 80, 100].map((presetVal) => (
                          <button
                            key={presetVal}
                            onClick={() => {
                              onIntelligenceChange?.(presetVal);
                              onStrengthChange?.(presetVal);
                              onSpeedChange?.(presetVal);
                              onJumpPowerChange?.(presetVal);
                              onImmunityChange?.(presetVal);
                              onHearingChange?.(presetVal);
                              onResilienceChange?.(presetVal);
                              onReproductionChange?.(presetVal);
                              onAsesinoChange?.(presetVal);
                              onPsicopataChange?.(presetVal);
                              onAmableChange?.(presetVal);
                            }}
                            className="px-1.5 py-0.5 rounded-md bg-slate-100 hover:bg-orange-500 text-slate-600 hover:text-white text-[8.5px] font-black border border-slate-200 transition-all"
                          >
                            {presetVal}
                          </button>
                        ))}
                      </div>
                    </div>
                    {[
                      {
                        group: 'Atributos Físicos',
                        items: [
                          { label: 'Fuerza', value: strength, onChange: onStrengthChange, color: 'from-red-600 via-rose-500 to-amber-400' },
                          { label: 'Velocidad', value: speed, onChange: onSpeedChange, color: 'from-amber-600 via-yellow-500 to-emerald-400' },
                          { label: 'Resistencia', value: resilience, onChange: onResilienceChange, color: 'from-rose-600 via-pink-500 to-purple-400' },
                          { label: 'Salto', value: jumpPower, onChange: onJumpPowerChange, color: 'from-emerald-600 via-teal-500 to-cyan-400' },
                          { label: 'Inmunidad', value: immunity, onChange: onImmunityChange, color: 'from-teal-600 via-cyan-500 to-sky-400' },
                        ]
                      },
                      {
                        group: 'Sentidos',
                        items: [
                          { label: 'Inteligencia', value: intelligence, onChange: onIntelligenceChange, color: 'from-purple-600 via-indigo-500 to-sky-400' },
                          { label: 'Instinto Sexual', value: reproduction, onChange: onReproductionChange, color: 'from-pink-600 via-rose-500 to-fuchsia-400' },
                          { label: 'Oído', value: hearing, onChange: onHearingChange, color: 'from-sky-600 via-blue-500 to-indigo-400' },
                        ]
                      },
                      {
                        group: 'Personalidad',
                        items: [
                          { label: 'Asesino', value: asesino, onChange: onAsesinoChange, color: 'from-red-600 to-red-500' },
                          { label: 'Psicópata', value: psicopata, onChange: onPsicopataChange, color: 'from-orange-600 to-red-500' },
                          { label: 'Amable', value: amable, onChange: onAmableChange, color: 'from-amber-400 to-yellow-300' },
                        ]
                      }
                    ].map((groupData) => (
                      <div key={groupData.group} className="mb-2">
                        <span className="text-[9px] font-black text-slate-400 mb-1 block">{groupData.group}</span>
                        <div className="space-y-1">
                          {groupData.items.map((st) => (
                            <div key={st.label} className="space-y-1 bg-slate-50 p-2 rounded-xl border border-slate-200/60">
                              <div className="flex justify-between items-center">
                                <span className="text-[10px] font-extrabold text-slate-700">{st.label}</span>
                                <span className="text-[10px] font-extrabold text-orange-600">{st.value}</span>
                              </div>
                              <div className="relative w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                <div
                                  className={`h-full bg-gradient-to-r ${st.color}`}
                                  style={{ width: `${Math.max(2, st.value)}%` }}
                                />
                              </div>
                              <input
                                type="range"
                                min="0"
                                max="100"
                                value={st.value}
                                onChange={(e) => st.onChange?.(parseInt(e.target.value))}
                                className="w-full h-1 cursor-pointer accent-orange-500 opacity-80"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* NPC CATEGORY */}
                {sandboxCategory === 'npcs' && (
                  <>
                    <button
                      onClick={onSpawnDummy}
                      className="flex flex-col items-center gap-1 p-2 rounded-xl bg-slate-50 border border-slate-200 hover:border-orange-500/50 transition-all group"
                    >
                      <User className="w-5 h-5 text-orange-500 group-hover:scale-110 transition-transform" />
                      <span className="text-[10px] font-bold text-slate-700">Dummy</span>
                    </button>
                    <button
                      onClick={onSpawnRagdoll}
                      className="flex flex-col items-center gap-1 p-2 rounded-xl bg-slate-50 border border-slate-200 hover:border-purple-500/50 transition-all group"
                      title="Generar Ragdoll funcional articulado con física"
                    >
                      <Activity className="w-5 h-5 text-purple-500 group-hover:scale-110 transition-transform" />
                      <span className="text-[10px] font-bold text-slate-700">Ragdoll</span>
                    </button>
                    <button
                      onClick={onSpawnEvilDummy}
                      className="flex flex-col items-center gap-1 p-2 rounded-xl bg-slate-50 border border-slate-200 hover:border-red-500/50 transition-all group"
                    >
                      <User className="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform" />
                      <span className="text-[10px] font-bold text-red-500">Evil Dummy</span>
                    </button>
                    <button
                      onClick={onSpawnSoldier}
                      className="flex flex-col items-center gap-1 p-2 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-500/50 transition-all group"
                    >
                      <ShieldAlert className="w-5 h-5 text-emerald-500 group-hover:scale-110 transition-transform" />
                      <span className="text-[10px] font-bold text-slate-700">Soldado</span>
                    </button>
                    <button
                      onClick={onSpawnZombie}
                      className="flex flex-col items-center gap-1 p-2 rounded-xl bg-slate-50 border border-slate-200 hover:border-lime-500/50 transition-all group"
                    >
                      <Skull className="w-5 h-5 text-lime-500 group-hover:scale-110 transition-transform" />
                      <span className="text-[10px] font-bold text-slate-700">Zombie</span>
                    </button>
                    <button
                      onClick={onSpawnTentacle}
                      className="flex flex-col items-center gap-1 p-2 rounded-xl bg-slate-50 border border-slate-200 hover:border-purple-500/50 transition-all group"
                    >
                      <Sparkles className="w-5 h-5 text-purple-500 group-hover:scale-110 transition-transform" />
                      <span className="text-[10px] font-bold text-slate-700">Tentáculos</span>
                    </button>
                    <button
                      onClick={onSpawnCaveTentacle}
                      className="flex flex-col items-center gap-1 p-2 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-500 transition-all group"
                    >
                      <Boxes className="w-5 h-5 text-slate-500 group-hover:scale-110 transition-transform" />
                      <span className="text-[10px] font-bold text-slate-700">Tubos Bloques</span>
                    </button>
                    <button
                      onClick={onSpawnWerewolf}
                      className="flex flex-col items-center gap-1 p-2 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-400 transition-all group"
                    >
                      <span className="text-xl group-hover:scale-110 transition-transform">🐺</span>
                      <span className="text-[10px] font-bold text-slate-700">Lobo</span>
                    </button>
                    <button
                      onClick={onSpawnWerewolfHot}
                      className="flex flex-col items-center gap-1 p-2 rounded-xl bg-slate-50 border border-slate-200 hover:border-rose-400 transition-all group"
                    >
                      <span className="text-xl group-hover:scale-110 transition-transform">🐺🌶️</span>
                      <span className="text-[10px] font-bold text-rose-500">Lobo Caliente</span>
                    </button>
                    <button
                      onClick={onSpawnDummyHot}
                      className="flex flex-col items-center gap-1 p-2 rounded-xl bg-slate-50 border border-slate-200 hover:border-pink-400 transition-all group"
                    >
                      <span className="text-xl group-hover:scale-110 transition-transform">🧍🌶️</span>
                      <span className="text-[10px] font-bold text-pink-500">Dummy Caliente</span>
                    </button>
                  </>
                )}

                {/* PROPS CATEGORY (Contiene SOLO el Martillo / Hammer) */}
                {sandboxCategory === 'props' && (
                  <button
                    onClick={() => onSpawnProp?.('block_hammer')}
                    className="flex flex-col items-center gap-2.5 p-4 rounded-2xl bg-slate-50 border border-orange-400/40 hover:border-orange-500 hover:bg-slate-100/95 transition-all text-center col-span-2 shadow-xs group"
                    title="Spawnea un Martillo de Bloques de alta resistencia física"
                  >
                    <span className="text-3xl group-hover:scale-115 transition-transform duration-200">🔨</span>
                    <div className="text-left flex flex-col items-center">
                      <span className="text-[11px] font-black text-slate-800">Martillo de Bloques (Hammer)</span>
                      <span className="text-[8.5px] text-slate-500 font-bold mt-0.5 text-center leading-normal">
                        Arma de sandbox física demoledora a dos manos
                      </span>
                    </div>
                  </button>
                )}

                {/* CLIMATES CATEGORY */}
                {sandboxCategory === 'climas' && (
                  <div className="col-span-2 space-y-2.5 p-1 max-h-[38vh] overflow-y-auto scrollbar-thin">
                    <div className="text-[10px] font-black text-orange-500 uppercase tracking-wider mb-1 flex items-center justify-between">
                      <span>Seleccionar Clima y Atmósfera</span>
                    </div>

                    <div className="grid grid-cols-1 gap-2">
                      {([
                        { id: 'day', name: 'Día Soleado', icon: '☀️', desc: 'Cielo brillante y sol radiante' },
                        { id: 'evening', name: 'Atardecer', icon: '🌆', desc: 'Luz naranja cálida y sombras largas' },
                        { id: 'night', name: 'Noche Cerrada', icon: '🌙', desc: 'Oscuridad total y luz de luna' },
                        { id: 'rain', name: 'Lluvia', icon: '🌧️', desc: 'Lluvia torrencial y nubes grises' },
                        { id: 'storm', name: 'Tormenta Eléctrica', icon: '⛈️', desc: 'Tormenta salvaje con relámpagos' }
                      ] as const).map((weather) => (
                        <button
                          key={weather.id}
                          onClick={() => onWeatherChange?.(weather.id)}
                          className={`flex items-center gap-3 p-2.5 rounded-xl border transition-all text-left group ${
                            currentWeather === weather.id
                              ? 'bg-orange-50 border-orange-400 text-slate-900 shadow-xs'
                              : 'bg-slate-50 border-slate-200/60 hover:border-slate-300 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <span className="text-xl group-hover:scale-110 transition-transform">{weather.icon}</span>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-black">{weather.name}</div>
                            <div className="text-[9px] text-slate-500 font-bold truncate">{weather.desc}</div>
                          </div>
                          {currentWeather === weather.id && (
                            <span className="text-[8px] bg-orange-500 text-white border border-orange-400 px-1.5 py-0.5 rounded-md font-bold">ACTIVO</span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Config Modal (Opened exclusively via Radial '+' Wheel) */}
      {showAnatomyPanel && (
        <div
          id="config-modal"
          className="absolute left-1/2 -translate-x-1/2 top-16 w-80 sm:w-96 max-h-[80vh] overflow-y-auto bg-slate-950/95 border border-sky-500/40 rounded-2xl shadow-2xl backdrop-blur-md p-3.5 z-50 flex flex-col gap-3 animate-in fade-in zoom-in-95 duration-200 pointer-events-auto scrollbar-thin"
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2 text-sky-400 font-black text-xs uppercase tracking-wider">
              <Settings className="w-4 h-4" />
              <span>Configuración del Juego</span>
            </div>
            <button onClick={() => setShowAnatomyPanel(false)} className="text-[10px] font-bold text-slate-400 hover:text-white px-2 py-0.5 rounded bg-slate-900 border border-slate-800">✕ Cerrar</button>
          </div>

          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 mb-1">Ajustes Rápidos</div>

              <div className="grid grid-cols-2 gap-1.5">
                {/* Log Button - Unlocks on 20 clicks without showing count */}
                <button
                  id="hud-btn-config-log"
                  onClick={handleLogButtonClick}
                  className={`flex flex-col items-center gap-1 p-2 rounded-xl border transition-all ${
                    isLogUnlocked ? 'bg-sky-950/60 border-sky-400 text-sky-200' : 'bg-slate-900 border-slate-800 text-slate-300'
                  }`}
                  title="Log"
                >
                  <Terminal className={`w-4 h-4 ${isLogUnlocked ? 'text-sky-400' : 'text-slate-400'}`} />
                  <span className="text-[10px] font-bold">Log</span>
                </button>
                {/* Ragdoll Toggle */}
                <button
                  onClick={onToggleRagdoll}
                  className={`flex flex-col items-center gap-1 p-2 rounded-xl border transition-all ${
                    !isAlive && !isWalkingRagdoll ? 'bg-rose-950/60 border-rose-500 text-rose-200' : 'bg-slate-900 border-slate-800 text-slate-300'
                  }`}
                >
                  <Zap className={`w-4 h-4 ${!isAlive && !isWalkingRagdoll ? 'text-rose-400' : 'text-slate-400'}`} />
                  <span className="text-[10px] font-bold">Ragdoll Caída: {!isAlive && !isWalkingRagdoll ? 'ON' : 'OFF'}</span>
                </button>

                {/* Ragdoll Walk Toggle */}
                <button
                  onClick={onToggleWalkingRagdoll}
                  className={`flex flex-col items-center gap-1 p-2 rounded-xl border transition-all ${
                    isWalkingRagdoll ? 'bg-amber-950/60 border-amber-400 text-amber-200 shadow-md shadow-amber-900/30' : 'bg-slate-900 border-slate-800 text-slate-300'
                  }`}
                >
                  <Footprints className={`w-4 h-4 ${isWalkingRagdoll ? 'text-amber-400 animate-pulse' : 'text-slate-400'}`} />
                  <span className="text-[10px] font-bold">Ragdoll Walk: {isWalkingRagdoll ? 'ON' : 'OFF'}</span>
                </button>

                {/* X-Ray Skeleton Layer Cycle */}
                <button
                  onClick={() => {
                    const nextMode = ((xrayMode + 1) % 5);
                    onXRayModeChange?.(nextMode);
                  }}
                  className={`flex flex-col items-center gap-1 p-2 rounded-xl border transition-all ${
                    xrayMode > 0 ? 'bg-cyan-950/60 border-cyan-400 text-cyan-200 shadow-md shadow-cyan-900/30' : 'bg-slate-900 border-slate-800 text-slate-300'
                  }`}
                >
                  <Layers className={`w-4 h-4 ${xrayMode > 0 ? 'text-cyan-400 animate-pulse' : 'text-slate-400'}`} />
                  <span className="text-[10px] font-bold">
                    {xrayMode === 0 ? 'Rayos X: Normal' : xrayMode === 1 ? 'X-Ray: Sin Piel' : xrayMode === 2 ? 'X-Ray: Esqueleto' : xrayMode === 3 ? 'X-Ray: Holograma' : 'Rayos X: Órganos'}
                  </span>
                </button>

                {/* Sound Waves Visualizer Toggle */}
                <button
                  onClick={onToggleSoundWaves}
                  className={`flex flex-col items-center gap-1 p-2 rounded-xl border transition-all ${
                    showSoundWaves ? 'bg-sky-950/60 border-sky-400 text-sky-200' : 'bg-slate-900 border-slate-800 text-slate-300'
                  }`}
                >
                  <Radio className={`w-4 h-4 ${showSoundWaves ? 'text-sky-400' : 'text-slate-400'}`} />
                  <span className="text-[10px] font-bold">Ondas Sonido: {showSoundWaves ? 'ON' : 'OFF'}</span>
                </button>

                {/* Pseudo-3D Panel Toggle */}
                <button
                  onClick={() => {
                    setShowContourPanel(!showContourPanel);
                    setShowAnatomyPanel(false);
                  }}
                  className={`flex flex-col items-center gap-1 p-2 rounded-xl border transition-all ${
                    contourEnabled ? 'bg-sky-950/60 border-sky-400 text-sky-200' : 'bg-slate-900 border-slate-800 text-slate-300'
                  }`}
                >
                  <Globe className="w-4 h-4 text-sky-400" />
                  <span className="text-[10px] font-bold">Pseudo-3D</span>
                </button>

                {/* Avatar Editor Toggle */}
                <button
                  onClick={() => {
                    handleOpenAvatar(true);
                    setShowAnatomyPanel(false);
                  }}
                  className="flex flex-col items-center gap-1 p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 transition-all"
                >
                  <WorkshopAvatarFaceBadge className="w-5 h-5" skinColorHex={skinColorHex} shirtColorHex={shirtColorHex} faceFeatureMode={faceFeatureMode} hasShirt={hasShirt} />
                  <span className="text-[10px] font-bold">Avatar</span>
                </button>

                {/* Pechos y Glúteos Toggle */}
                <button
                  onClick={() => onToggleBustAndGlutes?.(!hasBustAndGlutes)}
                  className={`flex flex-col items-center gap-1 p-2 rounded-xl border transition-all ${
                    hasBustAndGlutes ? 'bg-pink-950/60 border-pink-400 text-pink-200 shadow-md shadow-pink-900/30' : 'bg-slate-900 border-slate-800 text-slate-300'
                  }`}
                >
                  <Activity className={`w-4 h-4 ${hasBustAndGlutes ? 'text-pink-400 animate-pulse' : 'text-slate-400'}`} />
                  <span className="text-[10px] font-bold">Pechos/Glúteos: {hasBustAndGlutes ? 'ON' : 'OFF'}</span>
                </button>
              </div>

              {/* Anatomy & Textures Sub-options (inline) */}
              <div className="mt-2 border-t border-slate-800 pt-2 flex flex-col gap-2">
                <div className="flex flex-col gap-1.5 px-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-pink-300">Aparato Reproductor</span>
                    <div className="grid grid-cols-3 gap-1 p-0.5 bg-slate-900 rounded-lg border border-slate-800 pointer-events-auto">
                      {(['none', 'male', 'female'] as const).map(type => (
                        <button
                          key={type}
                          onClick={() => onGenitalTypeChange?.(type)}
                          className={`py-0.5 px-2 rounded text-[10px] font-bold transition-all ${
                            genitalType === type ? 'bg-pink-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          {type === 'none' ? 'X' : type === 'male' ? '♂' : '♀'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {genitalType === 'male' && (
                    <div className="flex flex-col gap-1.5 p-2 bg-slate-900/90 rounded-xl border border-pink-500/30 text-[10px]">
                      <div className="flex items-center justify-between text-slate-300">
                        <span>Largo Pene (M): {genitalMShaftLength.toFixed(1)}x</span>
                        <input
                          type="range"
                          min="0.4"
                          max="2.5"
                          step="0.1"
                          value={genitalMShaftLength}
                          onChange={(e) => onGenitalMShaftLengthChange?.(parseFloat(e.target.value))}
                          className="w-20 accent-pink-500 pointer-events-auto"
                        />
                      </div>
                      <div className="flex items-center justify-between text-slate-300">
                        <span>Grosor Pene (M): {genitalMShaftThickness.toFixed(1)}x</span>
                        <input
                          type="range"
                          min="0.5"
                          max="2.5"
                          step="0.1"
                          value={genitalMShaftThickness}
                          onChange={(e) => onGenitalMShaftThicknessChange?.(parseFloat(e.target.value))}
                          className="w-20 accent-pink-500 pointer-events-auto"
                        />
                      </div>
                      <div className="flex items-center justify-between text-slate-300">
                        <span>Cabeza Rosa (M): {genitalMPinkSize.toFixed(1)}x</span>
                        <input
                          type="range"
                          min="0.5"
                          max="2.5"
                          step="0.1"
                          value={genitalMPinkSize}
                          onChange={(e) => onGenitalMPinkSizeChange?.(parseFloat(e.target.value))}
                          className="w-20 accent-pink-500 pointer-events-auto"
                        />
                      </div>
                      <button
                        onClick={onTriggerErection}
                        className="mt-1 w-full py-1.5 rounded-lg bg-pink-600 text-white text-[10px] font-black uppercase tracking-widest shadow-md shadow-pink-900/40 hover:bg-pink-500 transition-all pointer-events-auto active:scale-95"
                      >
                        🍆 Erección
                      </button>
                    </div>
                  )}

                  {/* Fluid Emission Controls */}
                  <div className="flex flex-col gap-1 p-2 bg-gradient-to-r from-slate-900 to-rose-950/50 rounded-xl border border-rose-500/30 text-[10px]">
                    <span className="font-extrabold text-rose-300">Chorro de Fluidos (Pechos & Genitales)</span>
                    <div className="grid grid-cols-2 gap-1.5 pt-0.5">
                      {onTogglePlayerFluidEmission && (
                        <button
                          onClick={onTogglePlayerFluidEmission}
                          className={`py-1.5 rounded-lg font-black text-[9px] uppercase tracking-wider transition-all pointer-events-auto active:scale-95 ${
                            isFluidEmitting
                              ? 'bg-rose-500 text-white shadow-md shadow-rose-500/40 animate-pulse'
                              : 'bg-slate-800 text-rose-300 hover:bg-rose-600 hover:text-white border border-rose-800/40'
                          }`}
                        >
                          {isFluidEmitting ? '⚡ Chorro: ON (Desactivar)' : '⚡ Chorro: OFF (Activar)'}
                        </button>
                      )}
                      {onTriggerPlayerFluidBurst && (
                        <button
                          onClick={onTriggerPlayerFluidBurst}
                          className="py-1.5 rounded-lg bg-rose-600 text-white font-black text-[9px] uppercase tracking-wider shadow-md hover:bg-rose-500 transition-all pointer-events-auto active:scale-95"
                        >
                          💥 Ráfaga
                        </button>
                      )}
                    </div>
                  </div>

                  {genitalType === 'female' && (
                    <div className="flex flex-col gap-1.5 p-2 bg-slate-900/90 rounded-xl border border-pink-500/30 text-[10px]">
                      <div className="flex items-center justify-between text-slate-300">
                        <span>Tamaño Femenino: {genitalFSize.toFixed(1)}x</span>
                        <input
                          type="range"
                          min="0.5"
                          max="2.5"
                          step="0.1"
                          value={genitalFSize}
                          onChange={(e) => onGenitalFSizeChange?.(parseFloat(e.target.value))}
                          className="w-20 accent-pink-500 pointer-events-auto"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between px-1 p-2 bg-slate-900 rounded-xl border border-slate-800">
                  <span className="text-[10px] font-bold text-amber-300 uppercase tracking-tight">
                    Activate Characters Textures
                  </span>
                  <input
                    type="checkbox"
                    checked={characterTexturesEnabled}
                    onChange={(e) => onToggleCharacterTextures?.(e.target.checked)}
                    className="w-4 h-4 accent-amber-500 rounded cursor-pointer pointer-events-auto"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Contour Popover (when active) */}
          {showContourPanel && (
            <div className="absolute right-0 top-full mt-2 w-64 p-3 rounded-2xl bg-slate-950/95 border border-sky-500/40 shadow-2xl backdrop-blur-md z-50 flex flex-col gap-2 animate-in fade-in slide-in-from-top-2 duration-150 pointer-events-auto">
                <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-xs font-bold text-sky-200 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-sky-400" />
                    Pseudo-3D & Suavizado
                  </span>
                  <button onClick={() => setShowContourPanel(false)} className="text-[10px] text-slate-400">✕</button>
                </div>

                {/* Direct On/Off Toggle Switch */}
                <div className="flex items-center justify-between px-2 py-1.5 bg-slate-900 rounded-xl border border-slate-800">
                  <span className="text-[10px] font-bold text-sky-200 uppercase tracking-tight">
                    Activar Pseudo-3D: {contourEnabled ? 'SÍ' : 'NO'}
                  </span>
                  <input
                    type="checkbox"
                    checked={contourEnabled}
                    onChange={() => onToggleContour?.()}
                    className="w-4 h-4 accent-sky-500 rounded cursor-pointer pointer-events-auto"
                  />
                </div>
                
                <div className="flex flex-col gap-1.5 p-1 bg-slate-900/60 rounded-xl border border-slate-800">
                  <span className="text-[9px] font-bold text-slate-500 uppercase px-1">Estilo Uniones</span>
                  <div className="flex gap-1">
                    <button 
                      onClick={() => onContourJointStyleChange?.('cylinder')}
                      className="flex-1 py-1.5 text-[9px] font-bold rounded-lg transition-all bg-emerald-500 text-slate-950 font-black shadow-md shadow-emerald-500/30"
                    >
                      CILINDRO (ACTIVO)
                    </button>
                  </div>
                </div>

                {/* Suavidad (Mesh Smoothness) Slider */}
                <div className="space-y-1 mt-1">
                  <div className="flex justify-between items-center px-1">
                    <span className="text-[9px] font-bold text-sky-200 uppercase tracking-tighter">Suavidad: {contourSmoothness}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={contourSmoothness}
                    onChange={(e) => onContourSmoothnessChange?.(parseInt(e.target.value))}
                    className="w-full accent-emerald-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Esfericidad (Spherical Morph) Slider */}
                <div className="space-y-1 mt-1">
                  <div className="flex justify-between items-center px-1">
                    <span className="text-[9px] font-bold text-sky-200 uppercase tracking-tighter">Esfericidad: {contourLevel}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={contourLevel}
                    onChange={(e) => onContourLevelChange(parseInt(e.target.value))}
                    className="w-full accent-sky-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Voxel Density / Cubes Quantity Slider */}
                <div className="space-y-1 mt-1 p-1.5 bg-slate-900/80 rounded-xl border border-slate-800">
                  <div className="flex justify-between items-center px-1">
                    <span className="text-[9px] font-black text-amber-300 uppercase tracking-tighter">
                      Cubos por Extremidad: {voxelDensity === 1 ? '2 (1x2x1)' : voxelDensity === 2 ? '27 (División 3x3)' : voxelDensity === 3 ? '27 (División 3x3)' : voxelDensity === 4 ? '96 (4x6x4)' : '200 (5x8x5)'}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    step="1"
                    value={voxelDensity}
                    onChange={(e) => onVoxelDensityChange?.(parseInt(e.target.value))}
                    className="w-full accent-amber-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[8px] text-slate-400 px-1 font-semibold">
                    <span>- Menos</span>
                    <span className="text-amber-200 font-bold">27 (División 3x3)</span>
                    <span>+ Más</span>
                  </div>
                </div>

                <div className="flex justify-between text-[10px] font-bold">
                   <button onClick={() => onVoxelShapeChange?.('cube')} className={`flex-1 py-1 rounded ${voxelShape === 'cube' ? 'bg-sky-600 text-white' : 'text-slate-400'}`}>Cubo</button>
                   <button onClick={() => onVoxelShapeChange?.('sphere')} className={`flex-1 py-1 rounded ${voxelShape === 'sphere' ? 'bg-sky-600 text-white' : 'text-slate-400'}`}>Esfera</button>
                </div>
            </div>
          )}

          {/* Avatar is now managed in the dedicated side-by-side AvatarEditorModal */}
          {false && (
             <div className="fixed right-2 sm:right-5 top-12 bottom-3 w-80 sm:w-96 max-h-[88vh] p-3.5 rounded-2xl bg-slate-950/95 border border-indigo-500/50 shadow-2xl backdrop-blur-md z-50 flex flex-col gap-2.5 animate-in fade-in slide-in-from-right-3 duration-200 pointer-events-auto">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-xs font-black text-indigo-200 flex items-center gap-1.5 uppercase tracking-wide">
                    <Shirt className="w-4 h-4 text-sky-400" />
                    Editor de Avatar
                  </span>
                  <button onClick={() => handleOpenAvatar(false)} className="text-[10px] font-black uppercase text-slate-300 hover:text-white px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 hover:bg-slate-800 active:scale-95 transition-all">✕ Cerrar</button>
                </div>

                {/* Quick Camera Angle & Zoom Presets */}
                <div className="flex items-center justify-between gap-1 p-1.5 bg-slate-900/80 rounded-xl border border-slate-800 text-[9px] font-black">
                  <span className="text-[8px] uppercase text-slate-400 pl-1 font-bold">Cámara:</span>
                  <button
                    onClick={onRotateCameraToFront}
                    className="px-2 py-1 bg-indigo-900/60 hover:bg-indigo-700 text-indigo-200 rounded-lg border border-indigo-500/30 transition-all active:scale-95"
                    title="Ver de Frente"
                  >
                    👁️ Frente
                  </button>
                  <button
                    onClick={onRotateCameraToBack}
                    className="px-2 py-1 bg-indigo-900/60 hover:bg-indigo-700 text-indigo-200 rounded-lg border border-indigo-500/30 transition-all active:scale-95"
                    title="Ver de Espalda"
                  >
                    🔄 Espalda
                  </button>
                  <button
                    onClick={onRotateCameraToSide}
                    className="px-2 py-1 bg-indigo-900/60 hover:bg-indigo-700 text-indigo-200 rounded-lg border border-indigo-500/30 transition-all active:scale-95"
                    title="Ver de Perfil"
                  >
                    ↔️ Perfil
                  </button>
                  <div className="flex gap-1">
                    <button
                      onClick={onZoomIn}
                      className="px-1.5 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded-lg border border-slate-700 text-[10px]"
                      title="Acercar Cámara"
                    >
                      ➕
                    </button>
                    <button
                      onClick={onZoomOut}
                      className="px-1.5 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded-lg border border-slate-700 text-[10px]"
                      title="Alejar Cámara"
                    >
                      ➖
                    </button>
                  </div>
                </div>

                {/* Vertical Scroll Container ("scroll hacia abajo y arriba") */}
                <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-3 scrollbar-thin">
                  
                  {/* Item 1: Camisa / Vestimenta con Flechas y Vista Previa */}
                  <div className="flex flex-col gap-1.5 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-black text-indigo-300 uppercase tracking-tighter">1. Vestimenta (Camisa)</span>
                      <button
                        onClick={() => onToggleShirt?.(!hasShirt)}
                        className={`px-2 py-0.5 rounded text-[8px] font-black uppercase transition-all ${hasShirt ? 'bg-sky-500 text-black' : 'bg-slate-800 text-slate-400'}`}
                      >
                        {hasShirt ? 'Equipado' : 'Sin Camisa'}
                      </button>
                    </div>

                    {/* Navigation Arrow Controls & Preview */}
                    <div className="flex items-center justify-between gap-2 bg-slate-950/80 p-2 rounded-lg border border-slate-800">
                      <button
                        onClick={() => {
                          const idx = shirtColorPalettes.findIndex(c => c.hex === shirtColorHex);
                          const prev = idx <= 0 ? shirtColorPalettes.length - 1 : idx - 1;
                          onShirtColorChange?.(shirtColorPalettes[prev].hex);
                          if (!hasShirt) onToggleShirt?.(true);
                        }}
                        className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-white"
                        title="Anterior Camisa"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>

                      <div className="flex items-center gap-2 flex-1 justify-center">
                        <div
                          className={`w-5 h-5 rounded-md border border-white shadow-md ${
                            hasShirt ? (shirtColorPalettes.find(c => c.hex === shirtColorHex)?.bg || 'bg-sky-400') : 'bg-slate-700'
                          }`}
                        />
                        <span className="text-[10px] font-bold text-slate-200">
                          {hasShirt ? (shirtColorPalettes.find(c => c.hex === shirtColorHex)?.name || 'Personalizado') : 'Desequipado'}
                        </span>
                      </div>

                      <button
                        onClick={() => {
                          const idx = shirtColorPalettes.findIndex(c => c.hex === shirtColorHex);
                          const next = idx >= shirtColorPalettes.length - 1 ? 0 : idx + 1;
                          onShirtColorChange?.(shirtColorPalettes[next].hex);
                          if (!hasShirt) onToggleShirt?.(true);
                        }}
                        className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-white"
                        title="Siguiente Camisa"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Palette grid below */}
                    {hasShirt && (
                      <div className="flex flex-col gap-1 mt-1">
                        <div className="grid grid-cols-6 gap-0.5">
                          {[
                            { l: 1, label: 'Pecho' },
                            { l: 2, label: 'Torso' },
                            { l: 3, label: 'Ombligo' },
                            { l: 4, label: 'Hombro' },
                            { l: 5, label: 'Anteb.' },
                            { l: 6, label: 'Muñeca' },
                          ].map(st => (
                            <button
                              key={st.l}
                              onClick={() => onShirtCoverageLevelChange?.(st.l)}
                              className={`py-0.5 px-0.5 rounded text-[7.5px] font-black transition-all ${
                                (shirtCoverageLevel || 6) === st.l ? 'bg-sky-500 text-black shadow' : 'bg-slate-800 text-slate-400 hover:text-white'
                              }`}
                            >
                              {st.label}
                            </button>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-1 mt-0.5 justify-center">
                          {shirtColorPalettes.map(c => (
                            <button
                              key={c.hex}
                              onClick={() => onShirtColorChange?.(c.hex)}
                              className={`w-5 h-5 rounded-md border ${shirtColorHex === c.hex ? 'border-white scale-110 ring-2 ring-sky-400/50' : 'border-transparent opacity-80'} ${c.bg}`}
                              title={c.name}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Item 2: Color de Piel con Flechas y Vista Previa */}
                  <div className="flex flex-col gap-1.5 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-[9px] font-black text-indigo-300 uppercase tracking-tighter">2. Tono de Piel</span>
                    
                    <div className="flex items-center justify-between gap-2 bg-slate-950/80 p-2 rounded-lg border border-slate-800">
                      <button
                        onClick={() => {
                          const idx = skinColorPalettes.findIndex(c => c.hex === skinColorHex);
                          const prev = idx <= 0 ? skinColorPalettes.length - 1 : idx - 1;
                          onSkinColorChange?.(skinColorPalettes[prev].hex);
                        }}
                        className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-white"
                        title="Anterior Piel"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>

                      <div className="flex items-center gap-2 flex-1 justify-center">
                        <div
                          className={`w-5 h-5 rounded-full border border-white shadow-md ${
                            skinColorPalettes.find(c => c.hex === skinColorHex)?.bg || 'bg-pink-200'
                          }`}
                        />
                        <span className="text-[10px] font-bold text-slate-200">
                          {skinColorPalettes.find(c => c.hex === skinColorHex)?.name || 'Personalizado'}
                        </span>
                      </div>

                      <button
                        onClick={() => {
                          const idx = skinColorPalettes.findIndex(c => c.hex === skinColorHex);
                          const next = idx >= skinColorPalettes.length - 1 ? 0 : idx + 1;
                          onSkinColorChange?.(skinColorPalettes[next].hex);
                        }}
                        className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-white"
                        title="Siguiente Piel"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex justify-center gap-1.5 mt-1">
                      {skinColorPalettes.map(c => (
                        <button
                          key={c.hex}
                          onClick={() => onSkinColorChange?.(c.hex)}
                          className={`w-6 h-6 rounded-full border-2 ${skinColorHex === c.hex ? 'border-white scale-110 ring-2 ring-amber-400/50' : 'border-transparent opacity-80'} ${c.bg} transition-all`}
                          title={c.name}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Item 3: Pantalones con Flechas y Vista Previa */}
                  <div className="flex flex-col gap-1.5 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-[9px] font-black text-indigo-300 uppercase tracking-tighter">3. Color de Pantalón</span>

                    <div className="flex items-center justify-between gap-2 bg-slate-950/80 p-2 rounded-lg border border-slate-800">
                      <button
                        onClick={() => {
                          const idx = pantsColorPalettes.findIndex(c => c.hex === pantsColorHex);
                          const prev = idx <= 0 ? pantsColorPalettes.length - 1 : idx - 1;
                          onPantsColorChange?.(pantsColorPalettes[prev].hex);
                        }}
                        className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-white"
                        title="Anterior Pantalón"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>

                      <div className="flex items-center gap-2 flex-1 justify-center">
                        <div
                          className={`w-5 h-5 rounded-md border border-white shadow-md ${
                            pantsColorPalettes.find(c => c.hex === pantsColorHex)?.bg || 'bg-blue-900'
                          }`}
                        />
                        <span className="text-[10px] font-bold text-slate-200">
                          {pantsColorPalettes.find(c => c.hex === pantsColorHex)?.name || 'Personalizado'}
                        </span>
                      </div>

                      <button
                        onClick={() => {
                          const idx = pantsColorPalettes.findIndex(c => c.hex === pantsColorHex);
                          const next = idx >= pantsColorPalettes.length - 1 ? 0 : idx + 1;
                          onPantsColorChange?.(pantsColorPalettes[next].hex);
                        }}
                        className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-white"
                        title="Siguiente Pantalón"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Item 4: Genitales con Flechas y Vista Previa */}
                  <div className="flex flex-col gap-1.5 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-[9px] font-black text-indigo-300 uppercase tracking-tighter">4. Tipo de Genital</span>

                    <div className="flex items-center justify-between gap-2 bg-slate-950/80 p-2 rounded-lg border border-slate-800">
                      <button
                        onClick={() => {
                          const types = ['none', 'male', 'female'] as const;
                          const idx = types.indexOf((genitalType as any) ?? 'none');
                          const prev = idx <= 0 ? types.length - 1 : idx - 1;
                          onGenitalTypeChange?.(types[prev] as 'none' | 'male' | 'female');
                        }}
                        className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-white"
                        title="Anterior Genital"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>

                      <div className="flex items-center gap-2 flex-1 justify-center">
                        <span className="text-[10px] font-bold text-indigo-300 uppercase">
                          {genitalType === 'none' ? 'Ninguno' : genitalType === 'male' ? 'Macho (M)' : 'Hembra (F)'}
                        </span>
                      </div>

                      <button
                        onClick={() => {
                          const types = ['none', 'male', 'female'] as const;
                          const idx = types.indexOf((genitalType as any) ?? 'none');
                          const next = idx >= types.length - 1 ? 0 : idx + 1;
                          onGenitalTypeChange?.(types[next] as 'none' | 'male' | 'female');
                        }}
                        className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-white"
                        title="Siguiente Genital"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Sliders for Sizing */}
                    {genitalType === 'male' && (
                      <div className="flex flex-col gap-2 mt-1 bg-slate-950/60 p-2 rounded-lg border border-slate-800">
                        <span className="text-[8px] font-black text-indigo-400 uppercase">Ajustes Masculino</span>
                        <div className="space-y-1">
                          <div className="flex justify-between text-[9px] font-bold text-slate-300">
                            <span>Largo Palo</span>
                            <span className="text-sky-400 font-mono">{(genitalMShaftLength * 100).toFixed(0)}%</span>
                          </div>
                          <input
                            type="range" min="0.2" max="4.0" step="0.1" value={genitalMShaftLength}
                            onChange={(e) => onGenitalMShaftLengthChange?.(parseFloat(e.target.value))}
                            className="w-full accent-indigo-500 h-1 bg-slate-800 rounded cursor-pointer"
                          />
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-[9px] font-bold text-slate-300">
                            <span>Grosor Palo</span>
                            <span className="text-sky-400 font-mono">{(genitalMShaftThickness * 100).toFixed(0)}%</span>
                          </div>
                          <input
                            type="range" min="0.2" max="4.0" step="0.1" value={genitalMShaftThickness}
                            onChange={(e) => onGenitalMShaftThicknessChange?.(parseFloat(e.target.value))}
                            className="w-full accent-indigo-500 h-1 bg-slate-800 rounded cursor-pointer"
                          />
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-[9px] font-bold text-slate-300">
                            <span>Glande Rosa</span>
                            <span className="text-pink-400 font-mono">{(genitalMPinkSize * 100).toFixed(0)}%</span>
                          </div>
                          <input
                            type="range" min="0.2" max="4.0" step="0.1" value={genitalMPinkSize}
                            onChange={(e) => onGenitalMPinkSizeChange?.(parseFloat(e.target.value))}
                            className="w-full accent-pink-500 h-1 bg-slate-800 rounded cursor-pointer"
                          />
                        </div>
                      </div>
                    )}

                    {genitalType === 'female' && (
                      <div className="flex flex-col gap-2 mt-1 bg-slate-950/60 p-2 rounded-lg border border-slate-800">
                        <span className="text-[8px] font-black text-indigo-400 uppercase">Ajustes Femenino</span>
                        <div className="space-y-1">
                          <div className="flex justify-between text-[9px] font-bold text-slate-300">
                            <span>Parte Rosa (F)</span>
                            <span className="text-pink-400 font-mono">{(genitalFSize * 100).toFixed(0)}%</span>
                          </div>
                          <input
                            type="range" min="0.2" max="4.0" step="0.1" value={genitalFSize}
                            onChange={(e) => onGenitalFSizeChange?.(parseFloat(e.target.value))}
                            className="w-full accent-pink-500 h-1 bg-slate-800 rounded cursor-pointer"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Item 5: Estilo de Extremidades (Cilindros / Bloques / Pseudo-3D) */}
                  <div className="flex flex-col gap-1.5 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-[9px] font-black text-indigo-300 uppercase tracking-tighter">5. Extremidades & Articulaciones</span>

                    <div className="flex items-center justify-between gap-2 bg-slate-950/80 p-2 rounded-lg border border-slate-800">
                      <button
                        onClick={() => {
                          const styles = ['cylinder', 'pseudo3d', 'blocky'] as const;
                          const idx = styles.indexOf((contourJointStyle as any) ?? 'cylinder');
                          const prev = idx <= 0 ? styles.length - 1 : idx - 1;
                          onContourJointStyleChange?.(styles[prev] as 'cylinder' | 'blocky' | 'pseudo3d');
                        }}
                        className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-white"
                        title="Anterior Estilo"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>

                      <div className="flex items-center gap-2 flex-1 justify-center">
                        <span className="text-[10px] font-bold text-sky-300 uppercase">
                          {contourJointStyle === 'cylinder' ? 'Cilindros Pseudo-3D' : contourJointStyle === 'pseudo3d' ? 'Esferas / Caps' : 'Cúbico Bloque'}
                        </span>
                      </div>

                      <button
                        onClick={() => {
                          const styles = ['cylinder', 'pseudo3d', 'blocky'] as const;
                          const idx = styles.indexOf((contourJointStyle as any) ?? 'cylinder');
                          const next = idx >= styles.length - 1 ? 0 : idx + 1;
                          onContourJointStyleChange?.(styles[next] as 'cylinder' | 'blocky' | 'pseudo3d');
                        }}
                        className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-white"
                        title="Siguiente Estilo"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Item 6: Peinado / Cabello (Hair) */}
                  <div className="flex flex-col gap-1.5 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-[9px] font-black text-indigo-300 uppercase tracking-tighter">6. Peinado / Cabello</span>
                    
                    <div className="flex items-center justify-between gap-2 bg-slate-950/80 p-2 rounded-lg border border-slate-800">
                      <button
                        onClick={() => {
                          const types = ['none', 'short', 'long', 'mohawk', 'afro', 'spiky'];
                          const idx = types.indexOf(hairType);
                          const prev = idx <= 0 ? types.length - 1 : idx - 1;
                          onHairTypeChange?.(types[prev]);
                        }}
                        className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-white"
                        title="Anterior Cabello"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>

                      <div className="flex items-center gap-2 flex-1 justify-center">
                        <span className="text-[10px] font-bold text-slate-200">
                          {hairType === 'none' ? 'Sin Pelo' : hairType === 'short' ? 'Corto' : hairType === 'long' ? 'Largo' : hairType === 'mohawk' ? 'Cresta' : hairType === 'afro' ? 'Afro' : 'Picos'}
                        </span>
                      </div>

                      <button
                        onClick={() => {
                          const types = ['none', 'short', 'long', 'mohawk', 'afro', 'spiky'];
                          const idx = types.indexOf(hairType);
                          const next = idx >= types.length - 1 ? 0 : idx + 1;
                          onHairTypeChange?.(types[next]);
                        }}
                        className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-white"
                        title="Siguiente Cabello"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    {hairType !== 'none' && (
                      <div className="flex flex-wrap gap-1 mt-1 justify-center">
                        {[
                          { name: 'Negro', hex: 0x1c1917, bg: 'bg-stone-900' },
                          { name: 'Castaño Oscuro', hex: 0x451a03, bg: 'bg-amber-950' },
                          { name: 'Castaño Claro', hex: 0x78350f, bg: 'bg-amber-800' },
                          { name: 'Rubio', hex: 0xeab308, bg: 'bg-yellow-500' },
                          { name: 'Pelirrojo', hex: 0xb45309, bg: 'bg-orange-700' },
                          { name: 'Blanco', hex: 0xf1f5f9, bg: 'bg-slate-100' },
                          { name: 'Gris', hex: 0x64748b, bg: 'bg-slate-500' },
                          { name: 'Azul', hex: 0x0284c7, bg: 'bg-sky-600' },
                        ].map(c => (
                          <button
                            key={c.hex}
                            onClick={() => onHairColorChange?.(c.hex)}
                            className={`w-5 h-5 rounded-md border ${hairColorHex === c.hex ? 'border-white scale-110 ring-2 ring-sky-400/50' : 'border-transparent opacity-80'} ${c.bg}`}
                            title={c.name}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Item 7: Barba / Vello Facial (Beard) */}
                  <div className="flex flex-col gap-1.5 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-[9px] font-black text-indigo-300 uppercase tracking-tighter">7. Barba / Vello Facial</span>
                    
                    <div className="flex items-center justify-between gap-2 bg-slate-950/80 p-2 rounded-lg border border-slate-800">
                      <button
                        onClick={() => {
                          const types = ['none', 'stubble', 'full', 'mustache', 'goatee'];
                          const idx = types.indexOf(beardType);
                          const prev = idx <= 0 ? types.length - 1 : idx - 1;
                          onBeardTypeChange?.(types[prev]);
                        }}
                        className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-white"
                        title="Anterior Barba"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>

                      <div className="flex items-center gap-2 flex-1 justify-center">
                        <span className="text-[10px] font-bold text-slate-200">
                          {beardType === 'none' ? 'Afeitado' : beardType === 'stubble' ? 'Corta' : beardType === 'full' ? 'Completa' : beardType === 'mustache' ? 'Bigote' : 'Candado'}
                        </span>
                      </div>

                      <button
                        onClick={() => {
                          const types = ['none', 'stubble', 'full', 'mustache', 'goatee'];
                          const idx = types.indexOf(beardType);
                          const next = idx >= types.length - 1 ? 0 : idx + 1;
                          onBeardTypeChange?.(types[next]);
                        }}
                        className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-white"
                        title="Siguiente Barba"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    {beardType !== 'none' && (
                      <div className="flex flex-wrap gap-1 mt-1 justify-center">
                        {[
                          { name: 'Negro', hex: 0x1c1917, bg: 'bg-stone-900' },
                          { name: 'Castaño Oscuro', hex: 0x451a03, bg: 'bg-amber-950' },
                          { name: 'Castaño Claro', hex: 0x78350f, bg: 'bg-amber-800' },
                          { name: 'Rubio', hex: 0xeab308, bg: 'bg-yellow-500' },
                          { name: 'Pelirrojo', hex: 0xb45309, bg: 'bg-orange-700' },
                        ].map(c => (
                          <button
                            key={c.hex}
                            onClick={() => onBeardColorChange?.(c.hex)}
                            className={`w-5 h-5 rounded-md border ${beardColorHex === c.hex ? 'border-white scale-110 ring-2 ring-sky-400/50' : 'border-transparent opacity-80'} ${c.bg}`}
                            title={c.name}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Item 8: Sombreros & Gorras (Hat) */}
                  <div className="flex flex-col gap-1.5 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-[9px] font-black text-indigo-300 uppercase tracking-tighter">8. Sombreros & Gorras</span>
                    
                    <div className="flex items-center justify-between gap-2 bg-slate-950/80 p-2 rounded-lg border border-slate-800">
                      <button
                        onClick={() => {
                          const types = ['none', 'flower_pink', 'cap', 'police', 'military', 'cowboy', 'beanie'];
                          const idx = types.indexOf(hatType);
                          const prev = idx <= 0 ? types.length - 1 : idx - 1;
                          onHatTypeChange?.(types[prev]);
                        }}
                        className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-white"
                        title="Anterior Sombrero"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>

                      <div className="flex items-center gap-2 flex-1 justify-center">
                        <span className="text-[10px] font-bold text-slate-200">
                          {hatType === 'none' ? 'Sin Gorra' : hatType === 'flower_pink' ? '🌸 Flor Rosa' : hatType === 'cap' ? 'Gorra' : hatType === 'police' ? 'Policía' : hatType === 'military' ? 'Casco' : hatType === 'cowboy' ? 'Vaquero' : 'Chullo'}
                        </span>
                      </div>

                      <button
                        onClick={() => {
                          const types = ['none', 'flower_pink', 'cap', 'police', 'military', 'cowboy', 'beanie'];
                          const idx = types.indexOf(hatType);
                          const next = idx >= types.length - 1 ? 0 : idx + 1;
                          onHatTypeChange?.(types[next]);
                        }}
                        className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-white"
                        title="Siguiente Sombrero"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    {hatType !== 'none' && (
                      <div className="flex flex-wrap gap-1 mt-1 justify-center">
                        {[
                          { name: 'Rosa Flor', hex: 0xf472b6, bg: 'bg-pink-500' },
                          { name: 'Rojo', hex: 0xdc2626, bg: 'bg-red-600' },
                          { name: 'Negro', hex: 0x0f172a, bg: 'bg-slate-900' },
                          { name: 'Blanco', hex: 0xf8fafc, bg: 'bg-slate-100' },
                          { name: 'Militar', hex: 0x15803d, bg: 'bg-green-700' },
                          { name: 'Azul', hex: 0x1d4ed8, bg: 'bg-blue-700' },
                          { name: 'Amarillo', hex: 0xeab308, bg: 'bg-yellow-500' },
                        ].map(c => (
                          <button
                            key={c.hex}
                            onClick={() => onHatColorChange?.(c.hex)}
                            className={`w-5 h-5 rounded-md border ${hatColorHex === c.hex ? 'border-white scale-110 ring-2 ring-sky-400/50' : 'border-transparent opacity-80'} ${c.bg}`}
                            title={c.name}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Item 9: Lentes & Gafas (Glasses) */}
                  <div className="flex flex-col gap-1.5 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-[9px] font-black text-indigo-300 uppercase tracking-tighter">9. Lentes & Gafas</span>
                    
                    <div className="flex items-center justify-between gap-2 bg-slate-950/80 p-2 rounded-lg border border-slate-800">
                      <button
                        onClick={() => {
                          const types = ['none', 'normal', 'sunglasses', 'tactical', 'cyberpunk'];
                          const idx = types.indexOf(glassesType);
                          const prev = idx <= 0 ? types.length - 1 : idx - 1;
                          onGlassesTypeChange?.(types[prev]);
                        }}
                        className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-white"
                        title="Anterior Gafas"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>

                      <div className="flex items-center gap-2 flex-1 justify-center">
                        <span className="text-[10px] font-bold text-slate-200">
                          {glassesType === 'none' ? 'Sin Gafas' : glassesType === 'normal' ? 'Lentes' : glassesType === 'sunglasses' ? 'Gafas Sol' : glassesType === 'tactical' ? 'Tácticos' : 'Ciberpunk'}
                        </span>
                      </div>

                      <button
                        onClick={() => {
                          const types = ['none', 'normal', 'sunglasses', 'tactical', 'cyberpunk'];
                          const idx = types.indexOf(glassesType);
                          const next = idx >= types.length - 1 ? 0 : idx + 1;
                          onGlassesTypeChange?.(types[next]);
                        }}
                        className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-white"
                        title="Siguiente Gafas"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    {glassesType !== 'none' && (
                      <div className="flex flex-wrap gap-1 mt-1 justify-center">
                        {[
                          { name: 'Negro', hex: 0x0f172a, bg: 'bg-slate-900' },
                          { name: 'Rojo', hex: 0xdc2626, bg: 'bg-red-600' },
                          { name: 'Azul', hex: 0x0284c7, bg: 'bg-sky-600' },
                          { name: 'Blanco', hex: 0xf8fafc, bg: 'bg-slate-100' },
                          { name: 'Oro', hex: 0xeab308, bg: 'bg-yellow-500' },
                        ].map(c => (
                          <button
                            key={c.hex}
                            onClick={() => onGlassesColorChange?.(c.hex)}
                            className={`w-5 h-5 rounded-md border ${glassesColorHex === c.hex ? 'border-white scale-110 ring-2 ring-sky-400/50' : 'border-transparent opacity-80'} ${c.bg}`}
                            title={c.name}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                </div>
             </div>
          )}

      {/* ========================================================================= */}
      {/* ACTIVE HOT NPC AI EMOTIONS & POSE CONTROL WIDGET */}
      {/* ========================================================================= */}
      {activeHotNPCsInfo && activeHotNPCsInfo.length > 0 && (
        <div className="fixed top-16 right-3 z-40 max-w-xs sm:max-w-sm w-full animate-in fade-in slide-in-from-top-2 duration-200 pointer-events-auto">
          {activeHotNPCsInfo.map((npcInfo) => {
            const emotions = npcInfo.emotions;
            return (
              <div
                key={npcInfo.id}
                className="p-3 bg-slate-950/90 border border-rose-500/50 rounded-2xl shadow-2xl backdrop-blur-xl flex flex-col gap-2 text-white"
              >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-lg">🌶️</span>
                    <span className="text-xs font-black text-rose-300 uppercase tracking-tight">
                      {npcInfo.name}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-rose-950/80 border border-rose-500/40 text-[10px] font-black text-rose-200 capitalize">
                    {emotions?.currentMood || 'Apasionado'}
                  </span>
                </div>

                {/* AI Thought Bubble */}
                {emotions?.currentThought && (
                  <div className="p-2 rounded-xl bg-slate-900/90 border border-rose-500/20 flex items-start gap-1.5">
                    <span className="text-xs">💭</span>
                    <p className="text-[10px] text-rose-100 font-medium italic leading-tight">
                      "{emotions.currentThought}"
                    </p>
                  </div>
                )}

                {/* Emotional State Gauges */}
                {emotions && (
                  <div className="grid grid-cols-2 gap-1.5 pt-0.5">
                    <div className="flex flex-col gap-0.5 bg-slate-900/60 p-1.5 rounded-lg border border-slate-800">
                      <div className="flex justify-between text-[9px] font-bold text-slate-300">
                        <span>❤️ Pasión</span>
                        <span className="text-rose-400 font-mono">{Math.round(emotions.passionLevel * 100)}%</span>
                      </div>
                      <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-rose-600 to-pink-500 rounded-full transition-all duration-300"
                          style={{ width: `${emotions.passionLevel * 100}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-0.5 bg-slate-900/60 p-1.5 rounded-lg border border-slate-800">
                      <div className="flex justify-between text-[9px] font-bold text-slate-300">
                        <span>👑 Dominancia</span>
                        <span className="text-amber-400 font-mono">{Math.round(emotions.dominanceLevel * 100)}%</span>
                      </div>
                      <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-amber-600 to-yellow-400 rounded-full transition-all duration-300"
                          style={{ width: `${emotions.dominanceLevel * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Pose Selector Carousel / Chips */}
                <div className="flex flex-col gap-1 pt-1 border-t border-slate-800/80">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-wide">
                      Poses de la IA (Diagrama):
                    </span>
                    <span className="text-[9px] font-bold text-pink-300">
                      {npcInfo.pose}
                    </span>
                  </div>
                  <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-thin">
                    {[
                      { id: 'standing_lift_face_to_face', name: 'Elevado Frente', icon: '🧍‍♂️' },
                      { id: 'standing_hug_from_behind', name: 'Abrazo Atrás', icon: '🫂' },
                      { id: 'all_fours_grab', name: '4 Patas', icon: '🐾' },
                      { id: 'missionary_press', name: 'Misionero', icon: '🛏️' },
                      { id: 'mating_press_lift', name: 'Mating Press', icon: '🔥' },
                      { id: 'wheelbarrow_hold', name: 'Carretilla', icon: '🤸' },
                      { id: 'bridal_carry_cuddle', name: 'Cuna Nupcial', icon: '👰' },
                      { id: 'straddling_lap_front', name: 'Horcajadas Frente', icon: '🪑' },
                      { id: 'straddling_lap_back', name: 'Horcajadas Espalda', icon: '🧘' },
                      { id: 'lifted_tight_embrace', name: 'Abrazo Firme', icon: '💪' },
                      { id: 'chair_support_pose', name: 'Silla Soporte', icon: '🛋️' },
                      { id: 'bent_over_90_grab', name: 'Flexión 90°', icon: '📐' },
                      { id: 'spooning_side_cuddle', name: 'Cucharita', icon: '🥄' },
                      { id: 'shoulder_carry_pose', name: 'Al Hombro', icon: '🏋️' },
                    ].map((poseItem) => (
                      <button
                        key={poseItem.id}
                        onClick={() => onSetHotNPCPose?.(poseItem.id as HotPoseType, npcInfo.id)}
                        className={`px-2 py-1 rounded-lg text-[9px] font-bold whitespace-nowrap flex items-center gap-1 border transition-all ${
                          npcInfo.pose === poseItem.id
                            ? 'bg-rose-600 border-rose-300 text-white shadow-md shadow-rose-600/30'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <span>{poseItem.icon}</span>
                        <span>{poseItem.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ========================================================================= */}
      {/* BOTTOM CONTROLS: Ergonomic Thumb Zones for Vertical Screen */}
      {/* ========================================================================= */}
      {true && (
      <div className="flex items-end justify-between w-full pointer-events-auto pb-1 sm:pb-2">
        {/* Left Thumb: Movement Virtual Joystick + Sprint Button above it */}
        <div className="flex flex-col items-start pl-1 gap-1.5">
          <button
            id="hud-btn-sprint"
            onClick={onToggleSprint}
            className={`w-10 h-10 rounded-full font-black text-[8px] uppercase tracking-wider flex flex-col items-center justify-center transition-all frutiger-aero-glass ${
              isSprinting
                ? 'frutiger-orange text-white scale-105 shadow-orange-500/30'
                : 'frutiger-silver text-slate-700 active:scale-95'
            }`}
            title="Modo Correr (Activar / Desactivar)"
          >
            <Zap className={`w-3.5 h-3.5 ${isSprinting ? 'text-white fill-white' : 'text-slate-700'}`} />
            <span className="text-[7px] leading-none mt-0.5 font-bold">{isSprinting ? 'ON' : 'RUN'}</span>
          </button>
          <VirtualJoystick onMove={onMoveJoystick} size={95} label="MOVER" />
        </div>

        {/* Right Thumb: Action Quadrant (Fly, Walking Ragdoll, Ragdoll, Aim, Shoot, Jump) */}
        <div className="flex flex-col items-end gap-1.5 pr-1">
          {/* Ragdoll & Ragdoll Walk Container (Stacked Vertically, Walk above Standard) */}
          <div className="flex flex-col items-center gap-1">
            {/* Ragdoll Walk Button (Active standing ragdoll with loose limb physics) */}
            <button
              id="hud-btn-ragdoll-walk"
              onClick={() => {
                if (!isWalkingRagdoll) {
                  onToggleWalkingRagdoll?.();
                }
              }}
              className={`w-11 h-10 px-0.5 rounded-xl flex flex-col items-center justify-center active:scale-90 transition-all frutiger-aero-glass shadow-md ${
                isWalkingRagdoll
                  ? 'frutiger-orange text-white scale-105 ring-2 ring-amber-400/80 shadow-amber-500/40 cursor-default'
                  : 'frutiger-silver text-slate-700'
              }`}
              title="Ragdoll Walk: versión ragdoll que se mantiene parada y camina con brazos y piernas sueltas (no se puede desactivar directamente, activa Ragdoll estándar)"
            >
              <Footprints className={`w-3.5 h-3.5 ${isWalkingRagdoll ? 'text-white' : 'text-slate-700'}`} />
              <span className="text-[6.5px] font-black uppercase tracking-tighter text-center leading-tight mt-0.5 whitespace-nowrap">
                {isWalkingRagdoll ? 'Walk On' : 'Rag Walk'}
              </span>
            </button>

            {/* Standard Floppy Ragdoll Button */}
            <button
              id="hud-btn-ragdoll"
              onClick={onToggleRagdoll}
              className={`w-10 h-10 rounded-xl flex flex-col items-center justify-center active:scale-90 transition-all frutiger-aero-glass ${
                !isAlive && !isWalkingRagdoll
                  ? 'frutiger-red text-white scale-105 ring-2 ring-red-400/80'
                  : 'frutiger-silver text-slate-700'
              }`}
              title="Ragdoll: colapsar al suelo con físicas completas"
            >
              <Skull className={`w-4 h-4 ${!isAlive && !isWalkingRagdoll ? 'text-white' : 'text-slate-700'}`} />
              <span className="text-[7px] font-black uppercase tracking-tighter text-center leading-none">
                {!isAlive && !isWalkingRagdoll ? 'Rag On' : 'Ragdoll'}
              </span>
            </button>
          </div>

          {/* Aim & Free Cam Row */}
          <div className="flex items-center gap-1.5">
            {/* Free Cam button (if aiming) */}
            {isAiming && (
              <button
                id="hud-btn-free-cam"
                onClick={onToggleFreeCamAiming}
                className={`px-1.5 py-0.5 rounded-lg flex items-center gap-0.5 active:scale-90 transition-all text-[8px] font-black uppercase tracking-tight frutiger-aero-glass ${
                  isFreeCamAiming
                    ? 'frutiger-purple text-white'
                    : 'frutiger-silver text-slate-700'
                }`}
                title="Activar o desactivar movimiento libre de cámara mientras apuntas"
              >
                <RotateCcw className="w-2.5 h-2.5 text-white" />
                <span>Libre</span>
              </button>
            )}

            {/* Apuntar Button */}
            <button
              id="hud-btn-aim"
              onClick={onToggleAim}
              className={`w-10 h-10 rounded-xl flex flex-col items-center justify-center active:scale-90 transition-all frutiger-aero-glass ${
                isAiming
                  ? 'frutiger-orange text-white'
                  : 'frutiger-silver text-slate-700'
              }`}
              title="Apuntar con revólver"
            >
              <Crosshair className={`w-4 h-4 ${isAiming ? 'text-white' : 'text-slate-700'}`} />
              <span className="text-[7.5px] font-black uppercase tracking-tight">
                {isAiming ? 'Apuntando' : 'Apuntar'}
              </span>
            </button>
          </div>

          {/* Extra Virtual Joystick above Jump to control Arm / Hand and grabbed extremity ("salga un joystick extra arriba de salto que al mover la mano/brazo mueva esa extremidad rote") */}
          <div className="flex flex-col items-center mb-1">
            <VirtualJoystick
              onMove={(vec) => onArmJoystick?.(vec)}
              size={82}
              label={armGrabbedPart ? `AGARRE: ${armGrabbedPart === 'pechos' ? 'PECHOS' : 'GENITAL'}` : 'BRAZO/MANO'}
            />
          </div>

          {/* Primary Action Buttons: Jump / Fly Ascend / Descend + Shoot */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* If Flying, show Ascend (Subir) and Descend (Bajar) buttons */}
            {isFlying ? (
              <div className="flex flex-col gap-1">
                <button
                  id="hud-btn-fly-up"
                  onMouseDown={() => onFlyAscend?.(true)}
                  onMouseUp={() => onFlyAscend?.(false)}
                  onTouchStart={(e) => {
                    e.preventDefault();
                    onFlyAscend?.(true);
                  }}
                  onTouchEnd={(e) => {
                    e.preventDefault();
                    onFlyAscend?.(false);
                  }}
                  className="w-11 h-8 sm:w-12 sm:h-9 rounded-lg frutiger-aero-glass frutiger-blue text-white font-black flex items-center justify-center gap-0.5 active:scale-90 transition-all"
                  title="Subir Altura (Mantener)"
                >
                  <ArrowUp className="w-3 h-3 text-white" />
                  <span className="text-[7.5px] uppercase tracking-tighter font-black">Subir</span>
                </button>
                <button
                  id="hud-btn-fly-down"
                  onMouseDown={() => onFlyDescend?.(true)}
                  onMouseUp={() => onFlyDescend?.(false)}
                  onTouchStart={(e) => {
                    e.preventDefault();
                    onFlyDescend?.(true);
                  }}
                  onTouchEnd={(e) => {
                    e.preventDefault();
                    onFlyDescend?.(false);
                  }}
                  className="w-11 h-7 sm:w-12 sm:h-8 rounded-lg frutiger-aero-glass frutiger-silver text-slate-700 font-black flex items-center justify-center gap-0.5 active:scale-90 transition-all"
                  title="Bajar Altura (Mantener)"
                >
                  <span className="text-[7.5px] uppercase tracking-tighter font-black">▼ Bajar</span>
                </button>
              </div>
            ) : (
              /* SALTO (Jump) Button */
              <button
                id="hud-btn-jump"
                onClick={onJump}
                onTouchStart={(e) => {
                  e.preventDefault();
                  onJump();
                }}
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full font-black flex flex-col items-center justify-center active:scale-90 transition-all frutiger-aero-glass frutiger-green"
                title="Saltar"
              >
                <ArrowUp className="w-4 h-4 text-white" />
                <span className="text-[8px] uppercase tracking-wider font-extrabold mt-0.5">
                  Salto
                </span>
              </button>
            )}

            {/* DROP WEAPON / FISTS BUTTON */}
            {hasWeapon && (
              <button
                id="hud-btn-drop-weapon"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (onDropWeapon) onDropWeapon();
                }}
                onTouchStart={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (onDropWeapon) onDropWeapon();
                }}
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full font-bold flex flex-col items-center justify-center transition-all bg-slate-900/80 border border-amber-500/50 hover:bg-amber-600/30 text-amber-300 active:scale-95 shadow-md backdrop-blur-md"
                title="Soltar Arma y Usar Puños (Golpear)"
              >
                <Hand className="w-4 h-4 text-amber-400" />
                <span className="text-[7.5px] font-extrabold uppercase text-amber-300 mt-0.5">Soltar</span>
              </button>
            )}

            {/* ACTION Button (Punch or Shoot) */}
            <button
              id="hud-btn-shoot"
              disabled={hasWeapon ? shootCooldownRemaining > 0 : false}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onShoot();
              }}
              onTouchStart={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onShoot();
              }}
              className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full font-black flex flex-col items-center justify-center transition-all frutiger-aero-glass ${
                hasWeapon && shootCooldownRemaining > 0
                  ? 'frutiger-silver opacity-50 text-slate-500 cursor-not-allowed'
                  : 'frutiger-red text-white active:scale-90 shadow-lg'
              }`}
              title={hasWeapon ? "Disparar" : "Golpear"}
            >
              <Target className={`w-5 h-5 ${hasWeapon && shootCooldownRemaining > 0 ? 'text-slate-400' : 'text-white'}`} />
              <span className={`text-[8px] uppercase tracking-wider font-extrabold mt-0.5 text-center leading-tight ${hasWeapon && shootCooldownRemaining > 0 ? 'text-slate-400' : 'text-white'}`}>
                {hasWeapon ? 'Disparar' : 'Golpear'}
              </span>
            </button>
          </div>
        </div>
      </div>
      )}

      {/* Console Log Panel Modal */}
      {isLogOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm pointer-events-auto animate-in fade-in duration-200">
          <div className="w-full max-w-2xl bg-slate-950/95 border-2 border-blue-500/40 rounded-3xl p-5 shadow-2xl flex flex-col h-[70vh] max-h-[600px] select-none text-slate-100">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Terminal className="w-5 h-5 text-blue-400" />
                <h3 className="text-sm font-black uppercase tracking-wider text-blue-400">Consola del Desarrollador (Logs)</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const text = capturedLogs.map(l => `[${l.time}] [${l.type.toUpperCase()}] ${l.text}`).join('\n');
                    navigator.clipboard.writeText(text);
                    setCopiedLogs(true);
                    setTimeout(() => setCopiedLogs(false), 2000);
                  }}
                  className="px-3 py-1 rounded-xl text-[10px] font-bold uppercase transition-all frutiger-aero-glass frutiger-green hover:scale-105 active:scale-95 cursor-pointer"
                >
                  {copiedLogs ? '¡Copiado!' : 'Copiar todo'}
                </button>
                <button
                  onClick={() => {
                    (window as any).__capturedLogs = [];
                    setCapturedLogs([]);
                  }}
                  className="px-3 py-1 rounded-xl text-[10px] font-bold uppercase transition-all frutiger-aero-glass frutiger-red hover:scale-105 active:scale-95 cursor-pointer"
                >
                  Limpiar
                </button>
                <button
                  onClick={() => setIsLogOpen(false)}
                  className="px-3 py-1 rounded-xl text-[10px] font-bold uppercase transition-all frutiger-aero-glass frutiger-silver hover:scale-105 active:scale-95 cursor-pointer"
                >
                  Cerrar
                </button>
              </div>
            </div>

            {/* Logs list */}
            <div className="flex-1 overflow-y-auto mt-4 p-3 bg-slate-900/60 border border-slate-800 rounded-2xl font-mono text-[11px] scrollbar-thin flex flex-col gap-2">
              {capturedLogs.length === 0 ? (
                <div className="text-slate-500 text-center py-8 italic">No hay logs capturados aún...</div>
              ) : (
                capturedLogs.map((log, idx) => {
                  const isItemCopied = copiedIndex === idx;
                  return (
                    <div key={idx} className={`p-2.5 rounded-xl border leading-relaxed select-text flex items-start justify-between gap-3 ${
                      log.type === 'error'
                        ? 'bg-red-500/10 border-red-500/30 text-red-300'
                        : log.type === 'warn'
                        ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-300'
                        : 'bg-slate-800/30 border-slate-700/20 text-blue-200'
                    }`}>
                      <div className="flex-1 min-w-0">
                        <span className="text-slate-500 mr-2 text-[10px]">[{log.time}]</span>
                        <span className={`font-black uppercase text-[10px] px-1.5 py-0.5 rounded-md mr-2 ${
                          log.type === 'error' ? 'bg-red-500/20 text-red-400' : log.type === 'warn' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-blue-500/20 text-blue-400'
                        }`}>{log.type}</span>
                        <span className="break-all whitespace-pre-wrap">{log.text}</span>
                      </div>
                      <button
                        onClick={() => {
                          const formatted = `[${log.time}] [${log.type.toUpperCase()}] ${log.text}`;
                          navigator.clipboard.writeText(formatted);
                          setCopiedIndex(idx);
                          setTimeout(() => setCopiedIndex(null), 2000);
                        }}
                        className="shrink-0 px-2 py-1 rounded-lg text-[9px] font-bold uppercase transition-all bg-slate-800 hover:bg-slate-700 active:scale-95 border border-slate-700/40 cursor-pointer"
                        title="Copiar este log"
                      >
                        {isItemCopied ? '¡Copiado!' : 'Copiar'}
                      </button>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="pt-3 mt-3 border-t border-slate-900 text-[10px] text-slate-500 flex justify-between">
              <span>Se muestran los últimos 300 logs de consola.</span>
              <span>Usa el botón de copiar para reportar errores.</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
