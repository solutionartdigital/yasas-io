import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars, Float, MeshDistortMaterial, Line } from "@react-three/drei";
import * as THREE from "three";

// ── Brand colors ─────────────────────────────────────────────────
const PURPLE  = "#7B5CFF";
const ORANGE  = "#FF5A4D";
const AMBER   = "#FFB020";
const DPURPLE = "#3d1f8e";
const CPURPLE = new THREE.Color(PURPLE);
const CORANGE = new THREE.Color(ORANGE);
const CAMBER  = new THREE.Color(AMBER);

// ── Mouse-reactive camera parallax ───────────────────────────────
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
    camera.position.x += (mouse.current[0] * 1.4 - camera.position.x) * 0.035;
    camera.position.y += (-mouse.current[1] * 0.9 - camera.position.y) * 0.035;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

// ── 4 000 particle cloud ─────────────────────────────────────────
function Particles({ count = 4000 }) {
  const ref = useRef();

  // Build geometry manually to be compatible with all R3F versions
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const palette = [CPURPLE, CORANGE, CAMBER, new THREE.Color(DPURPLE), new THREE.Color("#ffffff")];
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const r     = 5 + Math.random() * 15;
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

  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.035;
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial size={0.055} vertexColors sizeAttenuation transparent opacity={0.9} />
    </points>
  );
}

// ── Central pulsing core ──────────────────────────────────────────
function Core() {
  const inner = useRef();
  const outer = useRef();
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const s = 1 + Math.sin(t * 1.8) * 0.10;
    if (inner.current) {
      inner.current.scale.setScalar(s);
      inner.current.rotation.y += 0.007;
      inner.current.rotation.x += 0.004;
    }
    if (outer.current) {
      outer.current.rotation.y -= 0.005;
      outer.current.rotation.z += 0.003;
    }
  });
  return (
    <group>
      <mesh ref={inner}>
        <icosahedronGeometry args={[0.55, 2]} />
        <MeshDistortMaterial
          color={PURPLE} emissive={PURPLE} emissiveIntensity={3}
          distort={0.3} speed={3} roughness={0} metalness={1}
        />
      </mesh>
      {/* wireframe shell */}
      <mesh ref={outer}>
        <icosahedronGeometry args={[0.88, 1]} />
        <meshBasicMaterial color={PURPLE} wireframe transparent opacity={0.18} />
      </mesh>
      {/* glow sphere */}
      <mesh>
        <sphereGeometry args={[1.1, 24, 24]} />
        <meshBasicMaterial color={PURPLE} transparent opacity={0.04} />
      </mesh>
    </group>
  );
}

// ── Floating distort orb ──────────────────────────────────────────
function GlowOrb({ position, color, speed = 1, distort = 0.45, radius = 0.7 }) {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * speed * 0.4;
      ref.current.rotation.z = state.clock.elapsedTime * speed * 0.3;
    }
  });
  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={1.1}>
      <mesh ref={ref} position={position}>
        <icosahedronGeometry args={[radius, 1]} />
        <MeshDistortMaterial
          color={color} emissive={color} emissiveIntensity={0.7}
          distort={distort} speed={2.5} roughness={0.05} metalness={0.9}
          transparent opacity={0.88}
        />
      </mesh>
    </Float>
  );
}

// ── Crystal octahedra ─────────────────────────────────────────────
function Crystal({ position, color, scale = 1, speed = 1 }) {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * speed;
      ref.current.rotation.y = state.clock.elapsedTime * speed * 0.7;
    }
  });
  return (
    <Float speed={speed * 0.7} floatIntensity={0.9}>
      <group position={position} scale={scale}>
        <mesh ref={ref}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color={color} emissive={color} emissiveIntensity={0.5}
            roughness={0.05} metalness={1} transparent opacity={0.75}
          />
        </mesh>
        <mesh scale={1.05}>
          <octahedronGeometry args={[1, 0]} />
          <meshBasicMaterial color={color} wireframe transparent opacity={0.2} />
        </mesh>
      </group>
    </Float>
  );
}

// ── Spinning orbit ring ───────────────────────────────────────────
function OrbitRing({ radius, tube, color, speed, rx = 0, rz = 0 }) {
  const ref = useRef();
  useFrame((_, dt) => { if (ref.current) ref.current.rotation.y += dt * speed; });
  return (
    <mesh ref={ref} rotation={[rx, 0, rz]}>
      <torusGeometry args={[radius, tube, 6, 90]} />
      <meshBasicMaterial color={color} wireframe transparent opacity={0.3} />
    </mesh>
  );
}

// ── DNA-like helix ────────────────────────────────────────────────
function Helix({ color, yOff = 0 }) {
  const ref = useRef();
  const pts = useMemo(() => {
    const p = [];
    for (let i = 0; i < 80; i++) {
      const t = (i / 80) * Math.PI * 4;
      p.push(new THREE.Vector3(Math.cos(t) * 2.8, (i / 80) * 5.5 - 2.75 + yOff, Math.sin(t) * 2.8));
    }
    return p;
  }, [yOff]);
  const nodes = pts.filter((_, i) => i % 8 === 0);
  useFrame((_, dt) => { if (ref.current) ref.current.rotation.y += dt * 0.28; });
  return (
    <group ref={ref}>
      <Line points={pts} color={color} lineWidth={1.4} transparent opacity={0.45} />
      {nodes.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.07, 6, 6]} />
          <meshBasicMaterial color={color} />
        </mesh>
      ))}
    </group>
  );
}

// ── Full scene ────────────────────────────────────────────────────
function Scene() {
  return (
    <>
      <CameraRig />
      <color attach="background" args={["#050b14"]} />
      <fog attach="fog" args={["#050b14", 14, 30]} />

      <ambientLight intensity={0.25} />
      <pointLight position={[0, 0, 0]}   intensity={6}   color={PURPLE} />
      <pointLight position={[5, 3, -4]}  intensity={2.5} color={ORANGE} />
      <pointLight position={[-5, -2, 3]} intensity={1.8} color={AMBER}  />

      <Stars radius={80} depth={60} count={2500} factor={3} fade speed={0.5} />
      <Particles count={3500} />
      <Core />

      <OrbitRing radius={2.3} tube={0.011} color={PURPLE} speed={0.33}  rx={Math.PI/5}   rz={0.3}  />
      <OrbitRing radius={3.1} tube={0.009} color={ORANGE} speed={-0.21} rx={Math.PI/3}   rz={-0.5} />
      <OrbitRing radius={3.9} tube={0.007} color={AMBER}  speed={0.17}  rx={-Math.PI/6}  rz={0.8}  />
      <OrbitRing radius={4.8} tube={0.005} color={DPURPLE} speed={-0.13} rx={Math.PI/7}  rz={1.2}  />

      <GlowOrb position={[-4.5,  1.8, -2]} color={PURPLE} speed={0.8}  distort={0.4} radius={0.7}  />
      <GlowOrb position={[ 4.2, -1.5, -1]} color={ORANGE} speed={1.1}  distort={0.6} radius={0.55} />
      <GlowOrb position={[-2.8, -2.5,  1]} color={AMBER}  speed={0.65} distort={0.3} radius={0.45} />
      <GlowOrb position={[ 3.5,  2.8, -3]} color={DPURPLE} speed={1.2} distort={0.5} radius={0.6}  />
      <GlowOrb position={[-1.5,  3.5, -2]} color={ORANGE} speed={0.9}  distort={0.7} radius={0.35} />

      <Crystal position={[-3.2,  0.5, -1]} color="#a78bfa" scale={0.44} speed={0.6} />
      <Crystal position={[ 3.8,  1.2,  0]} color="#fb923c" scale={0.38} speed={0.9} />
      <Crystal position={[-1.8, -3.0, -2]} color="#fbbf24" scale={0.33} speed={0.7} />
      <Crystal position={[ 2.2, -2.5,  1]} color="#c084fc" scale={0.48} speed={0.5} />

      <Helix color={PURPLE} yOff={0}   />
      <Helix color={ORANGE} yOff={0.5} />
    </>
  );
}

// ── Canvas export ─────────────────────────────────────────────────
export default function ThreeScene() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 55, near: 0.1, far: 100 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
