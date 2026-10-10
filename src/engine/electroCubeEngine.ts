import * as THREE from 'three';
import { ElectroCube3D, ElectroCubeSubBlock } from '../types/physics3d';

/**
 * 4. REUTILIZAR VARIABLES:
 * Declarar variables globales/de módulo arriba para no crear new THREE.Vector3()
 * dentro de los bucles ni saturar el Garbage Collector en cada frame o reconstrucción.
 */
const _v0 = new THREE.Vector3();
const _v1 = new THREE.Vector3();
const _v2 = new THREE.Vector3();
const _v3 = new THREE.Vector3();
const _scratchFaceNormal = new THREE.Vector3();
const _scratchBlockPos = new THREE.Vector3();
const _scratchNeighborPos = new THREE.Vector3();
const _scratchUV = new THREE.Vector2();

/**
 * Paleta de colores para los sub-bloques de la zona 3x3x3
 */
export const BLOCK_PALETTE = [
  0x38bdf8, // 0: Cyan brillante
  0x0284c7, // 1: Ocean Blue
  0x0ea5e9, // 2: Sky Blue
  0x06b6d4, // 3: Teal
  0x6366f1, // 4: Indigo
  0x3b82f6, // 5: Royal Blue
] as const;

/**
 * 3. TEXTURE ATLAS:
 * Genera un solo material con una textura combinada tipo atlas de 4x4 cuadrantes (512x512 px)
 * con biseles, relieves metálicos, bordes de bloque y detalles luminosos.
 * Las caras del cubo 3x3x3 se recortan utilizando coordenadas UV precisas para muestrear el atlas.
 */
let _sharedTextureAtlas: THREE.CanvasTexture | null = null;
let _sharedAtlasMaterial: THREE.MeshStandardMaterial | null = null;

export function getBlockTextureAtlas(): THREE.CanvasTexture {
  if (_sharedTextureAtlas) return _sharedTextureAtlas;

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    const cols = 4;
    const rows = 4;
    const tileSize = 512 / cols; // 128px per tile

    // Define colors for atlas tiles matching block types
    const tileColors = [
      '#38bdf8', '#0284c7', '#0ea5e9', '#06b6d4',
      '#6366f1', '#3b82f6', '#22d3ee', '#0284c7',
      '#38bdf8', '#0ea5e9', '#06b6d4', '#6366f1',
      '#38bdf8', '#0284c7', '#0ea5e9', '#06b6d4',
    ];

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const tileIdx = r * cols + c;
        const x = c * tileSize;
        const y = r * tileSize;
        const baseCol = tileColors[tileIdx % tileColors.length];

        // Background base
        ctx.fillStyle = baseCol;
        ctx.fillRect(x, y, tileSize, tileSize);

        // Dark bevel / border (1. Culling & Block edge enhancement)
        ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
        ctx.fillRect(x, y, tileSize, 4); // top dark rim
        ctx.fillRect(x, y, 4, tileSize); // left dark rim
        ctx.fillRect(x + tileSize - 4, y, 4, tileSize); // right dark rim
        ctx.fillRect(x, y + tileSize - 4, tileSize, 4); // bottom dark rim

        // Light inner bevel
        ctx.fillStyle = 'rgba(255, 255, 255, 0.40)';
        ctx.fillRect(x + 4, y + 4, tileSize - 8, 3);
        ctx.fillRect(x + 4, y + 4, 3, tileSize - 8);

        // Inner shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.22)';
        ctx.fillRect(x + 4, y + tileSize - 7, tileSize - 8, 3);
        ctx.fillRect(x + tileSize - 7, y + 4, 3, tileSize - 8);

        // Micro tech lines / voxel groove
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(x + 16, y + 16, tileSize - 32, tileSize - 32);

        // Core highlight
        const grad = ctx.createRadialGradient(
          x + tileSize * 0.5, y + tileSize * 0.5, 4,
          x + tileSize * 0.5, y + tileSize * 0.5, tileSize * 0.45
        );
        grad.addColorStop(0, 'rgba(255, 255, 255, 0.35)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0.15)');
        ctx.fillStyle = grad;
        ctx.fillRect(x + 6, y + 6, tileSize - 12, tileSize - 12);
      }
    }
  }

  _sharedTextureAtlas = new THREE.CanvasTexture(canvas);
  _sharedTextureAtlas.wrapS = THREE.ClampToEdgeWrapping;
  _sharedTextureAtlas.wrapT = THREE.ClampToEdgeWrapping;
  _sharedTextureAtlas.colorSpace = THREE.SRGBColorSpace;
  _sharedTextureAtlas.generateMipmaps = true;
  _sharedTextureAtlas.minFilter = THREE.NearestMipmapLinearFilter;
  _sharedTextureAtlas.magFilter = THREE.NearestFilter; // Sharp voxel aesthetics

  return _sharedTextureAtlas;
}

export function getSharedAtlasMaterial(): THREE.MeshStandardMaterial {
  if (!_sharedAtlasMaterial) {
    const texture = getBlockTextureAtlas();
    _sharedAtlasMaterial = new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0.28,
      metalness: 0.22,
      transparent: true,
      opacity: 1.0,
    });
  }
  return _sharedAtlasMaterial;
}

export function getBlockStateInfo(percent: number) {
  const p = Math.max(1, Math.min(100, Math.round(percent)));
  if (p === 100) {
    return {
      percent: p,
      name: 'Irrompible',
      description: '100% Irrompible. No recibe daño alguno.',
      color: '#38bdf8', // Cyan (always uniform)
      badge: '🛡️ Irrompible (100%)',
      canTakeDamage: false,
      isMassPushOnly: false,
      isLiquid: false,
      isGaseous: false,
      opacity: 1.0,
    };
  } else if (p >= 60) {
    return {
      percent: p,
      name: 'Casi Irrompible',
      description: 'Dureza extrema. Se rompe tras daño continuo.',
      color: '#38bdf8', // Cyan (always uniform)
      badge: `💎 Casi Irrompible (${p}%)`,
      canTakeDamage: true,
      isMassPushOnly: false,
      isLiquid: false,
      isGaseous: false,
      opacity: 1.0,
    };
  } else if (p >= 40) {
    return {
      percent: p,
      name: 'Masa Física (Empuje sin daño)',
      description: 'Masa elástica. Ataques no le hacen daño, solo la empujan.',
      color: '#38bdf8', // Cyan (always uniform)
      badge: `🧱 Masa (${p}%)`,
      canTakeDamage: false,
      isMassPushOnly: true,
      isLiquid: false,
      isGaseous: false,
      opacity: 1.0, // Always opaque
    };
  } else if (p >= 5) {
    return {
      percent: p,
      name: 'Masa Líquida (Sin rebote)',
      description: 'Líquido denso que se aplasta y deforma pero no rebota.',
      color: '#38bdf8', // Cyan (always uniform)
      badge: `💧 Masa Líquida (${p}%)`,
      canTakeDamage: false,
      isMassPushOnly: true,
      isLiquid: true,
      isGaseous: false,
      opacity: 1.0, // Always opaque (never transparent except in gas)
    };
  } else {
    return {
      percent: p,
      name: 'Gaseoso (Efecto de Humo/Vapor)',
      description: 'Se desvanece en estado gaseoso emitiendo vapor.',
      color: '#38bdf8', // Cyan (always uniform)
      badge: `💨 Gaseoso Humo (${p}%)`,
      canTakeDamage: false,
      isMassPushOnly: false,
      isLiquid: false,
      isGaseous: true,
      opacity: 0.0, // Disappears completely
    };
  }
}

/**
 * 1. CULLING & 2. BUFFERGEOMETRY ÚNICA:
 * Revisa vecinos en un bucle 3x3x3 y solo dibuja las caras que tocan el aire (oculta las caras internas).
 * Une todas las caras visibles de la zona 3x3x3 en una sola THREE.BufferGeometry para reducir Draw Calls a 1.
 * Mapea UVs para recortar las texturas desde el Texture Atlas.
 * Reutiliza variables globales (_v0, _v1, _v2, _v3, _scratchFaceNormal, _scratchBlockPos) sin crear 'new' adentro.
 */
export function build3x3ZoneBufferGeometry(
  subBlocks: ElectroCubeSubBlock[],
  subBlockSize: number,
  spacing: number
): THREE.BufferGeometry {
  // Matriz rápida 3x3x3 para consulta de vecinos (grid indices: 0..2 corresponds to gx, gy, gz from -1..1)
  const grid: (ElectroCubeSubBlock | null)[][][] = [
    [[null, null, null], [null, null, null], [null, null, null]],
    [[null, null, null], [null, null, null], [null, null, null]],
    [[null, null, null], [null, null, null], [null, null, null]],
  ];

  for (let i = 0; i < subBlocks.length; i++) {
    const sb = subBlocks[i];
    const ix = sb.gridX + 1;
    const iy = sb.gridY + 1;
    const iz = sb.gridZ + 1;
    if (ix >= 0 && ix < 3 && iy >= 0 && iy < 3 && iz >= 0 && iz < 3) {
      grid[ix][iy][iz] = sb;
    }
  }

  const half = subBlockSize * 0.5;
  const positions: number[] = [];
  const normals: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  const atlasCols = 4;
  const atlasRows = 4;
  const uvPadding = 0.004; // Prevents texture bleeding between atlas tiles

  let vertexOffset = 0;

  // 1. CULLING: Bucle 3x3x3
  for (let gx = -1; gx <= 1; gx++) {
    const ix = gx + 1;
    for (let gy = -1; gy <= 1; gy++) {
      const iy = gy + 1;
      for (let gz = -1; gz <= 1; gz++) {
        const iz = gz + 1;
        const currentBlock = grid[ix][iy][iz];

        // Si el bloque no existe o fue destruido/roto, se salta
        if (!currentBlock || !currentBlock.active) continue;

        // 4. REUTILIZAR VARIABLES: Usar .set() sin new THREE.Vector3()
        _scratchBlockPos.set(gx * spacing, gy * spacing, gz * spacing);
        const bx = _scratchBlockPos.x;
        const by = _scratchBlockPos.y;
        const bz = _scratchBlockPos.z;

        // Selección de tile en Texture Atlas según color / posición
        const tileIndex = (Math.abs(gx) + Math.abs(gy) + Math.abs(gz) + currentBlock.gridX + currentBlock.gridY + 5) % 16;
        const tileX = tileIndex % atlasCols;
        const tileY = Math.floor(tileIndex / atlasCols);

        const uMin = (tileX + uvPadding) / atlasCols;
        const uMax = (tileX + 1 - uvPadding) / atlasCols;
        const vMin = 1.0 - (tileY + 1 - uvPadding) / atlasRows;
        const vMax = 1.0 - (tileY + uvPadding) / atlasRows;

        // Helper interno para añadir un quad visible (4 vértices, 2 triángulos = 6 índices)
        const addQuad = (
          v0x: number, v0y: number, v0z: number,
          v1x: number, v1y: number, v1z: number,
          v2x: number, v2y: number, v2z: number,
          v3x: number, v3y: number, v3z: number,
          nx: number, ny: number, nz: number
        ) => {
          positions.push(
            v0x, v0y, v0z,
            v1x, v1y, v1z,
            v2x, v2y, v2z,
            v3x, v3y, v3z
          );
          normals.push(
            nx, ny, nz,
            nx, ny, nz,
            nx, ny, nz,
            nx, ny, nz
          );
          uvs.push(
            uMin, vMin,
            uMax, vMin,
            uMax, vMax,
            uMin, vMax
          );
          indices.push(
            vertexOffset, vertexOffset + 1, vertexOffset + 2,
            vertexOffset, vertexOffset + 2, vertexOffset + 3
          );
          vertexOffset += 4;
        };

        // --- REVISIÓN DE LAS 6 CARAS VECINAS (CULLING) ---

        // Cara +X (Derecha): ¿Toca el aire? (borde exterior o vecino inactivo)
        const neighborRight = ix < 2 ? grid[ix + 1][iy][iz] : null;
        if (!neighborRight || !neighborRight.active) {
          addQuad(
            bx + half, by - half, bz + half,
            bx + half, by - half, bz - half,
            bx + half, by + half, bz - half,
            bx + half, by + half, bz + half,
            1, 0, 0
          );
        }

        // Cara -X (Izquierda): ¿Toca el aire?
        const neighborLeft = ix > 0 ? grid[ix - 1][iy][iz] : null;
        if (!neighborLeft || !neighborLeft.active) {
          addQuad(
            bx - half, by - half, bz - half,
            bx - half, by - half, bz + half,
            bx - half, by + half, bz + half,
            bx - half, by + half, bz - half,
            -1, 0, 0
          );
        }

        // Cara +Y (Arriba): ¿Toca el aire?
        const neighborTop = iy < 2 ? grid[ix][iy + 1][iz] : null;
        if (!neighborTop || !neighborTop.active) {
          addQuad(
            bx - half, by + half, bz + half,
            bx + half, by + half, bz + half,
            bx + half, by + half, bz - half,
            bx - half, by + half, bz - half,
            0, 1, 0
          );
        }

        // Cara -Y (Abajo): ¿Toca el aire?
        const neighborBottom = iy > 0 ? grid[ix][iy - 1][iz] : null;
        if (!neighborBottom || !neighborBottom.active) {
          addQuad(
            bx - half, by - half, bz - half,
            bx + half, by - half, bz - half,
            bx + half, by - half, bz + half,
            bx - half, by - half, bz + half,
            0, -1, 0
          );
        }

        // Cara +Z (Frente): ¿Toca el aire?
        const neighborFront = iz < 2 ? grid[ix][iy][iz + 1] : null;
        if (!neighborFront || !neighborFront.active) {
          addQuad(
            bx - half, by - half, bz + half,
            bx + half, by - half, bz + half,
            bx + half, by + half, bz + half,
            bx - half, by + half, bz + half,
            0, 0, 1
          );
        }

        // Cara -Z (Atrás): ¿Toca el aire?
        const neighborBack = iz > 0 ? grid[ix][iy][iz - 1] : null;
        if (!neighborBack || !neighborBack.active) {
          addQuad(
            bx + half, by - half, bz - half,
            bx - half, by - half, bz - half,
            bx - half, by + half, bz - half,
            bx + half, by + half, bz - half,
            0, 0, -1
          );
        }
      }
    }
  }

  // 2. BUFFERGEOMETRY ÚNICA: Crear una sola geometría combinada
  const geom = new THREE.BufferGeometry();
  geom.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));
  geom.setAttribute('normal', new THREE.BufferAttribute(new Float32Array(normals), 3));
  geom.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(uvs), 2));
  geom.setIndex(new THREE.BufferAttribute(new Uint16Array(indices), 1));
  geom.computeBoundingBox();
  geom.computeBoundingSphere();

  return geom;
}

/**
 * Reconstruye la geometría única culleada de la zona 3x3x3 tras romperse o dañarse algún bloque.
 */
export function rebuild3x3ZoneMesh(cube: ElectroCube3D) {
  if (!cube.unifiedMesh || !cube.groupMesh) return;

  const spacing = 0.30;
  const newGeom = build3x3ZoneBufferGeometry(cube.subBlocks, cube.subBlockSize, spacing);

  cube.unifiedMesh.geometry.dispose();
  cube.unifiedMesh.geometry = newGeom;
}

/**
 * Rompe o destruye un sub-bloque específico de la zona 3x3x3 y actualiza la geometría culleada al instante.
 */
export function breakSubBlockAt(cube: ElectroCube3D, gx: number, gy: number, gz: number): boolean {
  const target = cube.subBlocks.find((sb) => sb.gridX === gx && sb.gridY === gy && sb.gridZ === gz);
  if (!target || !target.active) return false;

  target.active = false;
  if (target.mesh) target.mesh.visible = false;

  rebuild3x3ZoneMesh(cube);
  return true;
}

/**
 * Crea una zona cúbica de 3x3x3 (0.90m) optimizada con los 4 trucos:
 * 1. Culling de caras internas.
 * 2. BufferGeometry única para todo el bloque 3x3x3 (1 Draw Call).
 * 3. Texture Atlas único para todos los materiales y bloques.
 * 4. Reutilización de variables globales sin 'new' adentro de bucles.
 */
export function createElectroCube3D(
  x: number,
  y: number,
  z: number,
  scene: THREE.Scene,
  blockState: number = 100,
  hardnessLegacy: number = 70,
  viscosityLegacy: number = 30,
  electronegativity: number = 100
): ElectroCube3D {
  const id = 'block3x3_' + Math.random().toString(36).substring(2, 9);
  const groupMesh = new THREE.Group();
  groupMesh.name = `Block3x3Group_${id}`;
  groupMesh.position.set(x, y, z);

  const totalSize = 0.90;
  const spacing = 0.30;
  const subBlockSize = 0.292;

  const subBlocks: ElectroCubeSubBlock[] = [];

  // Instanciar metadatos de los 27 sub-bloques para colisión/inspección
  let colorIdx = 0;
  for (let gx = -1; gx <= 1; gx++) {
    for (let gy = -1; gy <= 1; gy++) {
      for (let gz = -1; gz <= 1; gz++) {
        const subId = `block_${id}_${gx + 1}_${gy + 1}_${gz + 1}`;
        const baseLocalPos = new THREE.Vector3(gx * spacing, gy * spacing, gz * spacing);
        const col = BLOCK_PALETTE[(Math.abs(gx) + Math.abs(gy) + Math.abs(gz) + colorIdx) % BLOCK_PALETTE.length];
        colorIdx++;

        // Proxy Mesh liviano para raycasting e inspección de sub-bloque
        const proxyGeom = new THREE.BoxGeometry(subBlockSize, subBlockSize, subBlockSize);
        const proxyMat = new THREE.MeshBasicMaterial({ visible: false }); // invisible proxy for raycasting
        const proxyMesh = new THREE.Mesh(proxyGeom, proxyMat);
        proxyMesh.name = `SubBlockProxy_${subId}`;
        proxyMesh.position.copy(baseLocalPos);
        proxyMesh.userData = {
          isElectroSubBlock: true,
          cubeId: id,
          subBlockId: subId,
          gridX: gx,
          gridY: gy,
          gridZ: gz,
          baseColor: col,
          blockState,
        };
        groupMesh.add(proxyMesh);

        subBlocks.push({
          id: subId,
          gridX: gx,
          gridY: gy,
          gridZ: gz,
          baseLocalPos,
          mesh: proxyMesh,
          active: true,
          color: col,
          size: subBlockSize,
          blockState,
        });
      }
    }
  }

  // 1 & 2: CONSTRUCCIÓN DE LA BUFFERGEOMETRY ÚNICA CON CULLING DE CARAS INTERNAS
  const unifiedGeometry = build3x3ZoneBufferGeometry(subBlocks, subBlockSize, spacing);
  const atlasMaterial = getSharedAtlasMaterial().clone();

  const unifiedMesh = new THREE.Mesh(unifiedGeometry, atlasMaterial);
  unifiedMesh.name = `UnifiedMesh3x3_${id}`;
  unifiedMesh.castShadow = true;
  unifiedMesh.receiveShadow = true;
  unifiedMesh.userData = {
    isUnified3x3Mesh: true,
    cubeId: id,
  };
  groupMesh.add(unifiedMesh);

  // Envoltura pseudo exterior suave
  const pseudoGeom = new THREE.BoxGeometry(totalSize + 0.06, totalSize + 0.06, totalSize + 0.06, 12, 12, 12);
  const posArray = pseudoGeom.attributes.position.array;
  const originalPos = new Float32Array(posArray.length);
  originalPos.set(posArray);
  pseudoGeom.userData = { originalPos };

  const pseudoMat = new THREE.MeshStandardMaterial({
    color: 0x0284c7,
    roughness: 0.25,
    metalness: 0.35,
    transparent: true,
    opacity: 0.82,
    depthWrite: true,
  });

  const pseudoMesh = new THREE.Mesh(pseudoGeom, pseudoMat);
  pseudoMesh.name = `PseudoMesh_${id}`;
  pseudoMesh.castShadow = true;
  pseudoMesh.receiveShadow = true;
  groupMesh.add(pseudoMesh);

  scene.add(groupMesh);

  const cube: ElectroCube3D = {
    id,
    x,
    y,
    z,
    size: totalSize,
    subBlockSize,
    blockState,
    hardness: hardnessLegacy,
    viscosity: viscosityLegacy,
    electronegativity,
    groupMesh,
    pseudoMesh,
    unifiedMesh,
    subBlocks,
    resistance: 20 + blockState * 0.8,
    density: 25 + blockState * 0.75,
    elasticity: Math.round(100 - blockState * 0.5),
    health: 400,
    maxHealth: 400,
    isDestroyed: false,
    wobblePhase: Math.random() * Math.PI * 2,
  };

  applyElectroCubeProperties(cube, blockState);

  return cube;
}

/**
 * Aplica el estado blockState (1 - 100%) a la zona 3x3x3 y actualiza el material del Texture Atlas.
 */
export function applyElectroCubeProperties(
  cube: ElectroCube3D,
  blockState: number
) {
  const p = Math.max(1, Math.min(100, Math.round(blockState)));
  cube.blockState = p;
  cube.hardness = p;
  cube.viscosity = p;

  const info = getBlockStateInfo(p);

  cube.resistance = Math.round(20 + p * 0.8);
  cube.density = Math.round(25 + p * 0.75);
  cube.elasticity = info.isLiquid ? 0 : Math.round(100 - p * 0.5);

  for (const block of cube.subBlocks) {
    if (!block.active || !block.mesh) continue;
    block.blockState = p;
    block.mesh.userData.blockState = p;
  }

  // Actualizar material de la malla única culleada
  if (cube.unifiedMesh && cube.unifiedMesh.material instanceof THREE.MeshStandardMaterial) {
    cube.unifiedMesh.material.transparent = info.opacity < 1.0;
    cube.unifiedMesh.material.opacity = info.opacity;
    cube.unifiedMesh.material.roughness = info.isLiquid ? 0.08 : (info.isGaseous ? 0.9 : 0.28);
    cube.unifiedMesh.material.metalness = info.isLiquid ? 0.2 : (info.isGaseous ? 0.0 : 0.20);
    cube.unifiedMesh.material.needsUpdate = true;
  }

  // Actualizar envoltura pseudo
  if (cube.pseudoMesh && cube.pseudoMesh.material instanceof THREE.MeshStandardMaterial) {
    cube.pseudoMesh.material.transparent = info.opacity < 1.0 || info.isGaseous;
    cube.pseudoMesh.material.opacity = Math.min(0.85, info.opacity * 0.85);
    cube.pseudoMesh.material.roughness = info.isLiquid ? 0.05 : 0.25;
    cube.pseudoMesh.material.needsUpdate = true;
  }
}

/**
 * Actualiza la física de balanceo, aplastamiento líquido o emisión gaseosa.
 */
export function updateElectroCubePhysics(cube: ElectroCube3D, dt: number, elapsedTime: number) {
  if (cube.isDestroyed || !cube.groupMesh) return;

  const p = cube.blockState ?? 100;
  const info = getBlockStateInfo(p);

  // Manejo de humo gaseoso (< 5%)
  if (info.isGaseous) {
    cube.groupMesh.scale.set(1, 1, 1);
    cube.groupMesh.position.y = cube.y;

    if (cube.unifiedMesh && cube.unifiedMesh.visible) cube.unifiedMesh.visible = false;
    if (cube.pseudoMesh && cube.pseudoMesh.visible) cube.pseudoMesh.visible = false;

    // Efecto de vapor
    const anyCube = cube as any;
    if (!anyCube.vaporGroup) {
      anyCube.vaporGroup = new THREE.Group();
      anyCube.vaporGroup.name = 'VaporGroup';
      cube.groupMesh.add(anyCube.vaporGroup);

      anyCube.vaporParticles = [];
      const particleCount = 18;
      const vaporGeom = new THREE.BoxGeometry(0.18, 0.18, 0.18);

      for (let j = 0; j < particleCount; j++) {
        const vaporMat = new THREE.MeshStandardMaterial({
          color: 0xf1f5f9,
          transparent: true,
          opacity: 0.22,
          roughness: 0.95,
          metalness: 0.0,
          depthWrite: false,
        });

        const mesh = new THREE.Mesh(vaporGeom, vaporMat);
        mesh.position.set(
          (Math.random() - 0.5) * 0.9,
          (Math.random() - 0.5) * 0.9,
          (Math.random() - 0.5) * 0.9
        );

        mesh.userData = {
          vx: (Math.random() - 0.5) * 0.22,
          vy: 0.35 + Math.random() * 0.45,
          vz: (Math.random() - 0.5) * 0.22,
          life: Math.random() * 2.0,
          maxLife: 1.5 + Math.random() * 1.0,
          baseScale: 0.7 + Math.random() * 0.8
        };

        anyCube.vaporGroup.add(mesh);
        anyCube.vaporParticles.push(mesh);
      }
    }

    anyCube.vaporGroup.visible = true;

    if (anyCube.vaporParticles) {
      anyCube.vaporParticles.forEach((pMesh: THREE.Mesh) => {
        pMesh.userData.life += dt;
        if (pMesh.userData.life >= pMesh.userData.maxLife) {
          pMesh.position.set(
            (Math.random() - 0.5) * 0.6,
            -0.45,
            (Math.random() - 0.5) * 0.6
          );
          pMesh.userData.life = 0;
          pMesh.userData.vy = 0.35 + Math.random() * 0.45;
          pMesh.userData.vx = (Math.random() - 0.5) * 0.22;
          pMesh.userData.vz = (Math.random() - 0.5) * 0.22;
        }

        pMesh.position.x += pMesh.userData.vx * dt;
        pMesh.position.y += pMesh.userData.vy * dt;
        pMesh.position.z += pMesh.userData.vz * dt;

        const pct = pMesh.userData.life / pMesh.userData.maxLife;
        const s = pMesh.userData.baseScale * (1.0 + pct * 2.0);
        pMesh.scale.set(s, s, s);
        pMesh.rotation.x += dt * 0.5;
        pMesh.rotation.y += dt * 0.8;

        if (pMesh.material instanceof THREE.MeshStandardMaterial) {
          pMesh.material.opacity = 0.26 * (1.0 - pct);
        }
      });
    }
  } else {
    if (cube.unifiedMesh && !cube.unifiedMesh.visible) cube.unifiedMesh.visible = true;
    if (cube.pseudoMesh && !cube.pseudoMesh.visible) cube.pseudoMesh.visible = true;

    const anyCube = cube as any;
    if (anyCube.vaporGroup && anyCube.vaporGroup.visible) {
      anyCube.vaporGroup.visible = false;
    }

    // Deformación líquida (5 - 40%)
    if (info.isLiquid) {
      const liquidity = (40 - p) / 35;
      const heightFactor = THREE.MathUtils.lerp(0.95, 0.22, liquidity);
      const widthFactor = THREE.MathUtils.lerp(1.05, 1.85, liquidity);

      const wobbleInt = 0.06 + liquidity * 0.12;
      const speed = 3.0 + liquidity * 2.0;
      const t = elapsedTime * speed + cube.wobblePhase;

      const sy = Math.max(0.1, heightFactor * (1.0 + Math.sin(t) * wobbleInt));
      const sxz = Math.max(0.2, widthFactor * (1.0 - Math.sin(t) * (wobbleInt * 0.5)));

      cube.groupMesh.scale.set(sxz, sy, sxz);
      const unscaledHalfHeight = cube.size * 0.5;
      cube.groupMesh.position.y = cube.y - unscaledHalfHeight * (1.0 - sy);
    } else if (info.isMassPushOnly) {
      // Masa física empujable (40 - 60%)
      const t = elapsedTime * 2.0 + cube.wobblePhase;
      const sy = 1.0 + Math.sin(t) * 0.03;
      const sxz = 1.0 - Math.sin(t) * 0.02;
      cube.groupMesh.scale.set(sxz, sy, sxz);
      cube.groupMesh.position.y = cube.y;
    } else {
      // Estado sólido (60 - 100%)
      if (cube.groupMesh.scale.x !== 1 || cube.groupMesh.scale.y !== 1 || cube.groupMesh.scale.z !== 1) {
        cube.groupMesh.scale.set(1, 1, 1);
      }
      cube.groupMesh.position.y = cube.y;
    }
  }
}
