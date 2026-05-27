import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MeshDistortMaterial, Line } from "@react-three/drei";
import * as THREE from "three";

// ── Brand palette ──────────────────────────────────────────────────
const PURPLE  = "#7B5CFF";
const ORANGE  = "#FF5A4D";
const AMBER   = "#FFB020";
const DPURPLE = "#3d1f8e";
const CPURPLE = new THREE.Color(PURPLE);
const CORANGE = new THREE.Color(ORANGE);
const CAMBER  = new THREE.Color(AMBER);
const CDPURP  = new THREE.Color(DPURPLE);

// ── Mouse camera ───────────────────────────────────────────────────
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
    camera.position.x += (mouse.current[0] * 1.0 - camera.position.x) * 0.022;
    camera.position.y += (-mouse.current[1] * 0.65 - camera.position.y) * 0.022;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

// ── Central AI core ────────────────────────────────────────────────
function Core() {
  const inner = useRef();
  const outer = useRef();
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const s = 1 + Math.sin(t * 1.5) * 0.07;
    if (inner.current) {
      inner.current.scale.setScalar(s);
      inner.current.rotation.y += 0.005;
      inner.current.rotation.x += 0.003;
    }
    if (outer.current) {
      outer.current.rotation.y -= 0.003;
      outer.current.rotation.z += 0.002;
    }
  });
  return (
    <group>
      <mesh ref={inner}>
        <icosahedronGeometry args={[0.55, 2]} />
        <MeshDistortMaterial
          color={PURPLE} emissive={PURPLE} emissiveIntensity={2.8}
          distort={0.25} speed={2} roughness={0} metalness={1}
        />
      </mesh>
      <mesh ref={outer}>
        <icosahedronGeometry args={[0.85, 1]} />
        <meshBasicMaterial color={PURPLE} wireframe transparent opacity={0.12} />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.1, 24, 24]} />
        <meshBasicMaterial color={PURPLE} transparent opacity={0.03} />
      </mesh>
    </group>
  );
}

// ── Pulse wave from core ───────────────────────────────────────────
function PulseWave({ delay = 0, color = PURPLE }) {
  const ref = useRef();
  useFrame((state) => {
    const t = (state.clock.elapsedTime * 0.4 + delay) % 3;
    if (ref.current) {
      ref.current.scale.setScalar(1 + t * 4);
      ref.current.material.opacity = Math.max(0, 0.22 - t * 0.08);
    }
  });
  return (
    <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[0.9, 0.92, 64]} />
      <meshBasicMaterial color={color} transparent opacity={0.22} side={THREE.DoubleSide} />
    </mesh>
  );
}

// ── Neural network node ────────────────────────────────────────────
function NetworkNode({ position, color, size = 0.07 }) {
  const ref = useRef();
  const seed = useRef(Math.random() * 100);
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.elapsedTime + seed.current;
      ref.current.material.opacity = 0.5 + Math.sin(t * 1.2) * 0.3;
    }
  });
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[size, 8, 8]} />
      <meshBasicMaterial color={color} transparent opacity={0.7} />
    </mesh>
  );
}

// ── Data pulse along a connection ─────────────────────────────────
function DataPulse({ start, end, color, speed = 1, delay = 0 }) {
  const ref = useRef();
  const startV = useMemo(() => new THREE.Vector3(...start), []);
  const endV   = useMemo(() => new THREE.Vector3(...end),   []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = ((state.clock.elapsedTime * speed + delay) % 2) / 2; // 0→1
    const pos = startV.clone().lerp(endV, t);
    ref.current.position.set(pos.x, pos.y, pos.z);
    // fade in/out at endpoints
    const fade = Math.sin(t * Math.PI);
    ref.current.material.opacity = fade * 0.85;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.045, 6, 6]} />
      <meshBasicMaterial color={color} transparent opacity={0.8} />
    </mesh>
  );
}

// ── Full network graph ─────────────────────────────────────────────
function NeuralNetwork() {
  // Node positions — spread in 3D space, roughly around the core
  const nodes = useMemo(() => [
    // Inner ring (closer to core)
    { pos: [-2.2,  0.8, -0.5], color: PURPLE },
    { pos: [ 2.0,  1.0, -0.3], color: ORANGE },
    { pos: [ 0.3, -2.0,  0.4], color: AMBER  },
    { pos: [-1.0, -1.6, -0.8], color: PURPLE },
    { pos: [ 1.8, -0.8,  0.9], color: CORANGE },
    { pos: [-0.5,  2.2, -0.4], color: AMBER  },
    // Mid ring
    { pos: [-3.5,  1.5, -1.0], color: PURPLE },
    { pos: [ 3.2,  0.5, -0.5], color: ORANGE },
    { pos: [ 1.2, -3.2,  0.5], color: PURPLE },
    { pos: [-2.8, -1.8,  1.0], color: AMBER  },
    { pos: [ 0.0,  3.5, -0.8], color: ORANGE },
    { pos: [-1.5,  0.0, -3.0], color: PURPLE },
    { pos: [ 2.5,  2.5, -2.0], color: AMBER  },
    { pos: [-3.0, -0.5,  2.0], color: ORANGE },
    // Outer
    { pos: [-5.0,  2.0, -1.5], color: DPURPLE },
    { pos: [ 4.8, -1.0,  0.0], color: DPURPLE },
    { pos: [ 0.5, -4.5,  1.5], color: DPURPLE },
    { pos: [-1.0,  4.2, -2.0], color: DPURPLE },
    { pos: [ 3.5,  3.5, -2.5], color: DPURPLE },
    { pos: [-4.0, -3.0,  1.5], color: DPURPLE },
  ], []);

  // Connections: pairs of node indices that are "linked"
  const connections = useMemo(() => [
    [0, 1], [1, 4], [4, 2], [2, 3], [3, 0],   // inner ring
    [0, 5], [5, 1], [3, 5],                     // inner cross
    [0, 6], [1, 7], [2, 8], [3, 9], [4, 8],    // inner → mid
    [5, 10], [6, 9], [7, 12], [8, 9],
    [6, 14], [7, 15], [8, 16], [9, 19],         // mid → outer
    [10, 17], [12, 18], [13, 19],
    [11, 0], [11, 3], [11, 6],
  ], []);

  // Pulse definitions: pick ~12 connections and vary their speeds
  const pulses = useMemo(() => [
    { conn: [0,1],  color: PURPLE, speed: 0.45, delay: 0.0  },
    { conn: [1,4],  color: ORANGE, speed: 0.55, delay: 0.3  },
    { conn: [4,2],  color: AMBER,  speed: 0.40, delay: 0.7  },
    { conn: [2,3],  color: PURPLE, speed: 0.50, delay: 1.2  },
    { conn: [3,0],  color: ORANGE, speed: 0.38, delay: 0.5  },
    { conn: [0,6],  color: PURPLE, speed: 0.32, delay: 1.5  },
    { conn: [1,7],  color: AMBER,  speed: 0.42, delay: 0.9  },
    { conn: [5,10], color: ORANGE, speed: 0.35, delay: 0.2  },
    { conn: [7,12], color: PURPLE, speed: 0.28, delay: 1.8  },
    { conn: [6,14], color: AMBER,  speed: 0.25, delay: 0.4  },
    { conn: [8,16], color: ORANGE, speed: 0.30, delay: 1.1  },
    { conn: [10,17],color: PURPLE, speed: 0.22, delay: 0.6  },
  ], []);

  return (
    <group>
      {/* Connection lines */}
      {connections.map(([a, b], i) => {
        const pA = nodes[a]?.pos;
        const pB = nodes[b]?.pos;
        if (!pA || !pB) return null;
        const dist = new THREE.Vector3(...pA).distanceTo(new THREE.Vector3(...pB));
        const opacity = Math.max(0.04, 0.18 - dist * 0.02);
        return (
          <Line
            key={i}
            points={[pA, pB]}
            color={nodes[a].color}
            lineWidth={0.6}
            transparent
            opacity={opacity}
          />
        );
      })}

      {/* Nodes */}
      {nodes.map((n, i) => {
        const isOuter = i >= 14;
        return (
          <NetworkNode
            key={i}
            position={n.pos}
            color={n.color}
            size={isOuter ? 0.05 : i < 6 ? 0.09 : 0.07}
          />
        );
      })}

      {/* Data pulses */}
      {pulses.map((p, i) => {
        const [a, b] = p.conn;
        const pA = nodes[a]?.pos;
        const pB = nodes[b]?.pos;
        if (!pA || !pB) return null;
        return (
          <DataPulse
            key={i}
            start={pA}
            end={pB}
            color={p.color}
            speed={p.speed}
            delay={p.delay}
          />
        );
      })}
    </group>
  );
}

// ── Subtle floating particles (very sparse) ───────────────────────
function Particles({ count = 600 }) {
  const ref = useRef();
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const palette = [CPURPLE, CORANGE, CAMBER, CDPURP];
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const r     = 9 + Math.random() * 10;
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
  useFrame((_, dt) => { if (ref.current) ref.current.rotation.y += dt * 0.012; });
  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial size={0.04} vertexColors sizeAttenuation transparent opacity={0.4} />
    </points>
  );
}

// ── Slow rotating network group ────────────────────────────────────
function RotatingNetwork() {
  const ref = useRef();
  useFrame((_, dt) => {
    if (ref.current) {
      ref.current.rotation.y += dt * 0.04;
      ref.current.rotation.x += dt * 0.008;
    }
  });
  return (
    <group ref={ref}>
      <NeuralNetwork />
    </group>
  );
}

// ── Scene ──────────────────────────────────────────────────────────
function Scene() {
  return (
    <>
      <CameraRig />
      <color attach="background" args={["#081020"]} />
      <fog attach="fog" args={["#081020", 14, 30]} />

      <ambientLight intensity={0.15} />
      <pointLight position={[0, 0, 0]}   intensity={6}   color={PURPLE} />
      <pointLight position={[4, 3, -4]}  intensity={2.0} color={ORANGE} />
      <pointLight position={[-4, -2, 3]} intensity={1.4} color={AMBER}  />

      <Particles count={600} />

      <Core />
      <PulseWave delay={0}   color={PURPLE} />
      <PulseWave delay={1.5} color={ORANGE} />

      <RotatingNetwork />
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
