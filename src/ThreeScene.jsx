import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ── Palette ────────────────────────────────────────────────────────
const COL = {
  orangeHot : "#FF5A4D",
  amber     : "#FFB020",
  amberSoft : "#FF8C42",
  purple    : "#7B5CFF",
  purpleDeep: "#4B2BBB",
  purpleSoft: "#9B7FFF",
  bg        : "#05060f",
};

// ── Mouse camera parallax ──────────────────────────────────────────
function CameraRig() {
  const { camera } = useThree();
  const mouse = useRef([0, 0]);
  useEffect(() => {
    const h = (e) => {
      mouse.current = [
        (e.clientX / window.innerWidth  - 0.5) * 2,
        (e.clientY / window.innerHeight - 0.5) * 2,
      ];
    };
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);
  useFrame(() => {
    camera.position.x += (mouse.current[0] * 1.5 - camera.position.x) * 0.025;
    camera.position.y += (-mouse.current[1] * 0.8 - camera.position.y) * 0.025;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

// ── Glowing stream (tube along a CatmullRom curve) ─────────────────
function GlowStream({ pts, color, innerR = 0.018, outerR = 0.07, segments = 80, pulseSpeed = 1 }) {
  const innerRef = useRef();
  const outerRef = useRef();
  const seed = useRef(Math.random() * 10);

  const { curve, innerGeo, outerGeo } = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(pts.map(p => new THREE.Vector3(...p)));
    const innerGeo = new THREE.TubeGeometry(curve, segments, innerR, 6, false);
    const outerGeo = new THREE.TubeGeometry(curve, segments, outerR, 6, false);
    return { curve, innerGeo, outerGeo };
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime * pulseSpeed + seed.current;
    if (innerRef.current) {
      innerRef.current.material.opacity = 0.75 + Math.sin(t * 0.9) * 0.2;
    }
    if (outerRef.current) {
      outerRef.current.material.opacity = 0.06 + Math.sin(t * 0.7) * 0.025;
    }
  });

  return (
    <group>
      {/* Wide soft glow */}
      <mesh geometry={outerGeo} ref={outerRef}>
        <meshBasicMaterial color={color} transparent opacity={0.07} depthWrite={false} />
      </mesh>
      {/* Core bright line */}
      <mesh geometry={innerGeo} ref={innerRef}>
        <meshBasicMaterial color={color} transparent opacity={0.8} />
      </mesh>
    </group>
  );
}

// ── Particle traveling along a curve ──────────────────────────────
function StreamParticle({ curve, color, speed = 0.12, startOffset = 0, size = 0.055 }) {
  const ref = useRef();
  const lightRef = useRef();

  useFrame((state) => {
    const t = ((state.clock.elapsedTime * speed + startOffset) % 1);
    const pos = curve.getPoint(t);
    if (ref.current) ref.current.position.copy(pos);
    if (lightRef.current) lightRef.current.position.copy(pos);
  });

  return (
    <>
      <mesh ref={ref}>
        <sphereGeometry args={[size, 6, 6]} />
        <meshBasicMaterial color={color} transparent opacity={0.95} />
      </mesh>
      <pointLight ref={lightRef} color={color} intensity={1.2} distance={1.8} decay={2} />
    </>
  );
}

// ── Glowing node / intersection point ─────────────────────────────
function GlowNode({ position, color, size = 0.1 }) {
  const ref = useRef();
  const seed = useRef(Math.random() * 10);
  useFrame((state) => {
    const t = state.clock.elapsedTime + seed.current;
    if (ref.current) {
      const s = 1 + Math.sin(t * 1.8) * 0.25;
      ref.current.scale.setScalar(s);
      ref.current.material.opacity = 0.6 + Math.sin(t * 1.8) * 0.3;
    }
  });
  return (
    <>
      <mesh ref={ref} position={position}>
        <sphereGeometry args={[size, 8, 8]} />
        <meshBasicMaterial color={color} transparent opacity={0.8} />
      </mesh>
      <pointLight position={position} color={color} intensity={0.8} distance={2.5} decay={2} />
    </>
  );
}

// ── Floating bokeh particles ───────────────────────────────────────
function BokehParticles({ count = 500 }) {
  const ref = useRef();
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const cols = [
      new THREE.Color(COL.orangeHot),
      new THREE.Color(COL.amber),
      new THREE.Color(COL.purple),
      new THREE.Color(COL.purpleSoft),
      new THREE.Color("#ffffff"),
    ];
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 2] = -3 - Math.random() * 10;
      const c = cols[Math.floor(Math.random() * cols.length)];
      col[i * 3]     = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("color",    new THREE.BufferAttribute(col, 3));
    return g;
  }, [count]);

  useFrame((_, dt) => { if (ref.current) ref.current.rotation.z += dt * 0.003; });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial
        size={0.05} vertexColors sizeAttenuation
        transparent opacity={0.45}
      />
    </points>
  );
}

// ── All streams defined ────────────────────────────────────────────
const STREAM_DEFS = [
  // ── Orange/amber warm streams (sweeping from bottom-left upward) ──
  {
    pts: [[-18, -5, -7], [-12, -2, -5], [-7,  0, -3], [-1,  1.5, -1.5], [ 5,  2, -3], [12,  0, -5], [18, -1, -7]],
    color: COL.orangeHot, innerR: 0.022, outerR: 0.09, segments: 100, pulseSpeed: 0.8,
    particles: [{ speed: 0.10, startOffset: 0.0 }, { speed: 0.10, startOffset: 0.5 }],
  },
  {
    pts: [[-18, -3, -6], [-11,  0, -4], [-5,  1.5, -2], [ 0,  2.5, -1], [ 6,  3, -2.5], [13,  1, -4], [18,  2, -6]],
    color: COL.amber, innerR: 0.016, outerR: 0.065, segments: 90, pulseSpeed: 0.6,
    particles: [{ speed: 0.09, startOffset: 0.25 }, { speed: 0.09, startOffset: 0.75 }],
  },
  {
    pts: [[-18, -6, -8], [-12, -4, -6], [-6, -2, -4], [ 0, -0.5, -2], [ 6, -1, -4]],
    color: COL.amberSoft, innerR: 0.012, outerR: 0.05, segments: 70, pulseSpeed: 0.7,
    particles: [{ speed: 0.08, startOffset: 0.1 }],
  },
  {
    pts: [[-16, -1.5, -5], [-10,  0.5, -3], [-4,  1, -1.5], [ 2,  0.5, -1]],
    color: COL.amber, innerR: 0.009, outerR: 0.038, segments: 60, pulseSpeed: 1.1,
    particles: [{ speed: 0.13, startOffset: 0.6 }],
  },
  // ── Purple/indigo cool streams (right side + crossing arcs) ──────
  {
    pts: [[18, 4, -6], [12,  4.5, -4], [ 6,  3.5, -2], [ 0,  2, -1], [-5,  0.5, -2.5], [-12, -1, -5], [-18, -2, -7]],
    color: COL.purple, innerR: 0.018, outerR: 0.075, segments: 100, pulseSpeed: 0.9,
    particles: [{ speed: 0.11, startOffset: 0.15 }, { speed: 0.11, startOffset: 0.65 }],
  },
  {
    pts: [[18, 6, -7], [11,  6, -5], [ 5,  5, -3], [-1,  4, -2], [-7,  3, -3.5], [-14,  2, -6]],
    color: COL.purpleSoft, innerR: 0.014, outerR: 0.055, segments: 80, pulseSpeed: 0.7,
    particles: [{ speed: 0.09, startOffset: 0.4 }],
  },
  {
    pts: [[14, -1, -6], [ 8,  0.5, -4], [ 2,  0, -2], [-4, -1, -3.5], [-10, -2, -6]],
    color: COL.purpleDeep, innerR: 0.010, outerR: 0.04, segments: 60, pulseSpeed: 0.5,
    particles: [{ speed: 0.07, startOffset: 0.8 }],
  },
  {
    pts: [[10,  8, -8], [ 4,  6, -5], [-2,  5, -3], [-8,  4, -5], [-14,  3, -7]],
    color: COL.purple, innerR: 0.008, outerR: 0.032, segments: 55, pulseSpeed: 1.2,
    particles: [],
  },
];

// Node positions (where streams visually meet/cross)
const NODE_DEFS = [
  { pos: [-7,  0, -3],  color: COL.orangeHot, size: 0.12 },
  { pos: [-1,  1.5, -1.5], color: COL.amber,  size: 0.16 },
  { pos: [ 5,  2, -3],  color: COL.amber,     size: 0.10 },
  { pos: [ 0,  2, -1],  color: COL.purple,    size: 0.13 },
  { pos: [ 6,  3.5, -2], color: COL.purpleSoft, size: 0.11 },
  { pos: [-5,  0.5, -2.5], color: COL.purple, size: 0.09 },
  { pos: [-12, -2, -5], color: COL.orangeHot, size: 0.08 },
  { pos: [ 8,  0.5, -4], color: COL.purpleDeep, size: 0.07 },
];

// ── Scene composition ──────────────────────────────────────────────
function Scene() {
  // Pre-compute curves for particle animation
  const curves = useMemo(() =>
    STREAM_DEFS.map(s =>
      new THREE.CatmullRomCurve3(s.pts.map(p => new THREE.Vector3(...p)))
    ),
  []);

  return (
    <>
      <CameraRig />
      <color attach="background" args={[COL.bg]} />
      <fog attach="fog" args={[COL.bg, 18, 36]} />

      {/* Ambient + accent lights */}
      <ambientLight intensity={0.08} />
      <pointLight position={[-8, -2, 0]} intensity={4} color={COL.orangeHot} distance={20} decay={1.5} />
      <pointLight position={[10,  4, 0]} intensity={3} color={COL.purple}    distance={20} decay={1.5} />
      <pointLight position={[ 0,  0, 2]} intensity={1} color={COL.amber}     distance={12} decay={2}   />

      {/* Background bokeh */}
      <BokehParticles count={500} />

      {/* Glowing streams */}
      {STREAM_DEFS.map((s, i) => (
        <GlowStream key={i} pts={s.pts} color={s.color}
          innerR={s.innerR} outerR={s.outerR}
          segments={s.segments} pulseSpeed={s.pulseSpeed}
        />
      ))}

      {/* Particles traveling along streams */}
      {STREAM_DEFS.map((s, si) =>
        s.particles.map((p, pi) => (
          <StreamParticle
            key={`${si}-${pi}`}
            curve={curves[si]}
            color={s.color}
            speed={p.speed}
            startOffset={p.startOffset}
            size={0.05}
          />
        ))
      )}

      {/* Glowing nodes at intersections */}
      {NODE_DEFS.map((n, i) => (
        <GlowNode key={i} position={n.pos} color={n.color} size={n.size} />
      ))}
    </>
  );
}

// ── Canvas ─────────────────────────────────────────────────────────
export default function ThreeScene() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0.5, 10], fov: 70, near: 0.1, far: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
