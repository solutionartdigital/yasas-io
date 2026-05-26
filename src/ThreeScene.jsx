import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars, Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

// ── Original brand palette ─────────────────────────────────────────
const PURPLE  = "#7B5CFF";
const ORANGE  = "#FF5A4D";
const AMBER   = "#FFB020";
const DPURPLE = "#3d1f8e";
const CPURPLE = new THREE.Color(PURPLE);
const CORANGE = new THREE.Color(ORANGE);
const CAMBER  = new THREE.Color(AMBER);
const CDPURP  = new THREE.Color(DPURPLE);
const CWHITE  = new THREE.Color("#aaaacc");

// ── Subtle mouse camera ──────────────────────────────────────────
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
    camera.position.x += (mouse.current[0] * 1.2 - camera.position.x) * 0.025;
    camera.position.y += (-mouse.current[1] * 0.7 - camera.position.y) * 0.025;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

// ── Sparse particle cloud (subtle, not overwhelming) ────────────────
function Particles({ count = 1200 }) {
  const ref = useRef();
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const palette = [CPURPLE, CORANGE, CAMBER, CDPURP, CWHITE];
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const r     = 8 + Math.random() * 14;
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3]     = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("color",    new THREE.BufferAttribute(col, 3));
    return g;
  }, [count]);
  useFrame((_, dt) => { if (ref.current) ref.current.rotation.y += dt * 0.018; });
  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial size={0.05} vertexColors sizeAttenuation transparent opacity={0.55} />
    </points>
  );
}

// ── Central pulsing core ─────────────────────────────────────────
function Core() {
  const inner = useRef();
  const outer = useRef();
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const s = 1 + Math.sin(t * 1.6) * 0.08;
    if (inner.current) {
      inner.current.scale.setScalar(s);
      inner.current.rotation.y += 0.006;
      inner.current.rotation.x += 0.003;
    }
    if (outer.current) {
      outer.current.rotation.y -= 0.004;
      outer.current.rotation.z += 0.002;
    }
  });
  return (
    <group>
      <mesh ref={inner}>
        <icosahedronGeometry args={[0.6, 2]} />
        <MeshDistortMaterial
          color={PURPLE} emissive={PURPLE} emissiveIntensity={2.5}
          distort={0.28} speed={2.5} roughness={0} metalness={1}
        />
      </mesh>
      <mesh ref={outer}>
        <icosahedronGeometry args={[0.9, 1]} />
        <meshBasicMaterial color={PURPLE} wireframe transparent opacity={0.14} />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.2, 24, 24]} />
        <meshBasicMaterial color={PURPLE} transparent opacity={0.035} />
      </mesh>
    </group>
  );
}

// ── Pulse wave ring ───────────────────────────────────────────────
function PulseWave({ delay = 0, color = PURPLE }) {
  const ref = useRef();
  useFrame((state) => {
    const t = (state.clock.elapsedTime * 0.5 + delay) % 3;
    const scale = 1 + t * 3.5;
    const op = Math.max(0, 0.28 - t * 0.1);
    if (ref.current) {
      ref.current.scale.setScalar(scale);
      ref.current.material.opacity = op;
    }
  });
  return (
    <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[0.95, 0.97, 64]} />
      <meshBasicMaterial color={color} transparent opacity={0.28} side={THREE.DoubleSide} />
    </mesh>
  );
}

// ── Orbit ring ─────────────────────────────────────────────────────
function OrbitRing({ radius, tube, color, speed, rx = 0, rz = 0 }) {
  const ref = useRef();
  useFrame((_, dt) => { if (ref.current) ref.current.rotation.y += dt * speed; });
  return (
    <mesh ref={ref} rotation={[rx, 0, rz]}>
      <torusGeometry args={[radius, tube, 6, 90]} />
      <meshBasicMaterial color={color} wireframe transparent opacity={0.25} />
    </mesh>
  );
}

// ── Floating distort orb ──────────────────────────────────────────
function GlowOrb({ position, color, speed = 1, distort = 0.4, radius = 0.5 }) {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * speed * 0.35;
      ref.current.rotation.z = state.clock.elapsedTime * speed * 0.25;
    }
  });
  return (
    <Float speed={speed} rotationIntensity={0.4} floatIntensity={0.9}>
      <mesh ref={ref} position={position}>
        <icosahedronGeometry args={[radius, 1]} />
        <MeshDistortMaterial
          color={color} emissive={color} emissiveIntensity={0.6}
          distort={distort} speed={2} roughness={0.05} metalness={0.9}
          transparent opacity={0.80}
        />
      </mesh>
    </Float>
  );
}

// ── Scene ──────────────────────────────────────────────────────────
function Scene() {
  return (
    <>
      <CameraRig />
      <color attach="background" args={["#081020"]} />
      <fog attach="fog" args={["#081020", 16, 32]} />

      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 0]}   intensity={7}   color={PURPLE} />
      <pointLight position={[5, 3, -4]}  intensity={2.5} color={ORANGE} />
      <pointLight position={[-5, -2, 3]} intensity={1.8} color={AMBER}  />

      {/* Sparse star field — distant, not overwhelming */}
      <Stars radius={100} depth={50} count={1500} factor={2.5} fade speed={0.3} />
      <Particles count={1000} />

      {/* Core */}
      <Core />

      {/* Pulse waves */}
      <PulseWave delay={0} color={PURPLE} />
      <PulseWave delay={2} color={ORANGE} />

      {/* Clean orbit rings */}
      <OrbitRing radius={2.4} tube={0.010} color={PURPLE} speed={0.3}  rx={Math.PI/5}   rz={0.3}  />
      <OrbitRing radius={3.2} tube={0.008} color={ORANGE} speed={-0.2} rx={Math.PI/3}   rz={-0.5} />
      <OrbitRing radius={4.2} tube={0.006} color={AMBER}  speed={0.15} rx={-Math.PI/6}  rz={0.8}  />

      {/* A few accent orbs — not too many */}
      <GlowOrb position={[-5.0,  1.8, -2]}  color={PURPLE} speed={0.7}  distort={0.4} radius={0.55} />
      <GlowOrb position={[ 4.5, -1.5, -1]}  color={ORANGE} speed={1.0}  distort={0.5} radius={0.45} />
      <GlowOrb position={[-2.5, -2.8,  1]}  color={AMBER}  speed={0.6}  distort={0.3} radius={0.38} />
      <GlowOrb position={[ 3.8,  2.5, -3]}  color={DPURPLE} speed={1.1} distort={0.45} radius={0.42} />
    </>
  );
}

// ── Canvas ─────────────────────────────────────────────────────────
export default function ThreeScene() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 9], fov: 52, near: 0.1, far: 100 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
