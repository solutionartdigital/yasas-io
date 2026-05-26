import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars, Float, Html, MeshDistortMaterial, Line } from "@react-three/drei";
import * as THREE from "three";

// ── Brand palette — professional blue/cyan ─────────────────────────
const BLUE   = "#2563eb";
const CYAN   = "#06b6d4";
const INDIGO = "#4f46e5";
const PURPLE = "#7c3aed";
const GREEN  = "#22c55e";
const WHITE  = "#ffffff";
const DARK   = "#050c1a";

const CBLUE   = new THREE.Color(BLUE);
const CCYAN   = new THREE.Color(CYAN);
const CINDIGO = new THREE.Color(INDIGO);
const CPURPLE = new THREE.Color(PURPLE);
const CWHITE  = new THREE.Color(WHITE);

// ── Mouse-reactive camera ─────────────────────────────────────────
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
    camera.position.x += (mouse.current[0] * 1.2 - camera.position.x) * 0.03;
    camera.position.y += (-mouse.current[1] * 0.8 - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

// ── Holographic AI avatar core ─────────────────────────────────────
function HolographicAvatar() {
  const coreRef  = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const ring3Ref = useRef();
  const glow1Ref = useRef();
  const glow2Ref = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const pulse = 1 + Math.sin(t * 2.2) * 0.06;

    if (coreRef.current) {
      coreRef.current.scale.setScalar(pulse);
      coreRef.current.rotation.y += 0.008;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x += 0.006;
      ring1Ref.current.rotation.z += 0.004;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y += 0.009;
      ring2Ref.current.rotation.z -= 0.005;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x -= 0.004;
      ring3Ref.current.rotation.y += 0.007;
    }
    if (glow1Ref.current) glow1Ref.current.scale.setScalar(1 + Math.sin(t * 1.4) * 0.1);
    if (glow2Ref.current) glow2Ref.current.scale.setScalar(1 + Math.sin(t * 0.9 + 1) * 0.15);
  });

  return (
    <group>
      {/* Core sphere */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.7, 3]} />
        <MeshDistortMaterial
          color={BLUE} emissive={CYAN} emissiveIntensity={1.5}
          distort={0.25} speed={2.5} roughness={0} metalness={1}
          transparent opacity={0.92}
        />
      </mesh>

      {/* Orbit ring 1 */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.15, 0.012, 8, 100]} />
        <meshBasicMaterial color={CYAN} transparent opacity={0.7} />
      </mesh>

      {/* Orbit ring 2 */}
      <mesh ref={ring2Ref} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.4, 0.008, 8, 100]} />
        <meshBasicMaterial color={BLUE} transparent opacity={0.5} />
      </mesh>

      {/* Orbit ring 3 */}
      <mesh ref={ring3Ref} rotation={[Math.PI / 6, Math.PI / 4, 0]}>
        <torusGeometry args={[1.65, 0.005, 8, 100]} />
        <meshBasicMaterial color={INDIGO} transparent opacity={0.35} />
      </mesh>

      {/* Outer glow spheres */}
      <mesh ref={glow1Ref}>
        <sphereGeometry args={[1.0, 32, 32]} />
        <meshBasicMaterial color={BLUE} transparent opacity={0.05} />
      </mesh>
      <mesh ref={glow2Ref}>
        <sphereGeometry args={[1.55, 32, 32]} />
        <meshBasicMaterial color={CYAN} transparent opacity={0.03} />
      </mesh>
    </group>
  );
}

// ── Pulse waves expanding from avatar ─────────────────────────────
function PulseWave({ delay = 0, color = CYAN }) {
  const ref = useRef();
  const opacity = useRef({ val: 0 });

  useFrame((state) => {
    const t = (state.clock.elapsedTime + delay) % 3;
    const scale = 1 + t * 2.5;
    const op = Math.max(0, 0.4 - t * 0.14);
    if (ref.current) {
      ref.current.scale.setScalar(scale);
      ref.current.material.opacity = op;
    }
  });

  return (
    <mesh ref={ref}>
      <ringGeometry args={[0.98, 1.0, 64]} />
      <meshBasicMaterial color={color} transparent opacity={0.4} side={THREE.DoubleSide} />
    </mesh>
  );
}

// ── Animated particle field (blue tones) ──────────────────────────
function Particles({ count = 3000 }) {
  const ref = useRef();
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const palette = [CBLUE, CCYAN, CINDIGO, CPURPLE, CWHITE];
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const r     = 6 + Math.random() * 14;
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
  useFrame((_, dt) => { if (ref.current) ref.current.rotation.y += dt * 0.02; });
  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial size={0.045} vertexColors sizeAttenuation transparent opacity={0.75} />
    </points>
  );
}

// ── Orbiting data nodes (connected points) ─────────────────────────
function OrbitNode({ radius, speed, angle, color, yOffset = 0 }) {
  const ref = useRef();
  useFrame((state) => {
    const t = state.clock.elapsedTime * speed + angle;
    if (ref.current) {
      ref.current.position.x = Math.cos(t) * radius;
      ref.current.position.z = Math.sin(t) * radius;
      ref.current.position.y = yOffset + Math.sin(t * 2) * 0.15;
    }
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.055, 8, 8]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
}

// ── WhatsApp chat panel ────────────────────────────────────────────
const WA_MESSAGES = [
  { from: "client",  text: "Hi! Do you offer 24/7 support?" },
  { from: "ai",      text: "Yes! I'm your AI assistant, always online 🤖" },
  { from: "client",  text: "Can you book an appointment for me?" },
  { from: "ai",      text: "Absolutely! What date works best for you?" },
  { from: "client",  text: "Tomorrow at 10am please" },
  { from: "ai",      text: "✅ Booked! You'll get a confirmation shortly." },
];

function WhatsAppPanel({ position }) {
  const [count, setCount] = useState(1);
  useEffect(() => {
    const id = setInterval(() => setCount(c => c < WA_MESSAGES.length ? c + 1 : 1), 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <Float speed={0.6} floatIntensity={0.5} rotationIntensity={0.1}>
      <Html
        position={position}
        transform
        scale={0.38}
        style={{ pointerEvents: "none", userSelect: "none" }}
      >
        <div style={{
          width: 280, background: "#0e1621", borderRadius: 16,
          overflow: "hidden", fontFamily: "'Segoe UI', sans-serif",
          boxShadow: "0 8px 40px rgba(6,182,212,0.25), 0 2px 12px rgba(0,0,0,0.6)",
          border: "1px solid rgba(6,182,212,0.3)",
        }}>
          {/* Header */}
          <div style={{
            background: "linear-gradient(135deg, #128c7e, #075e54)",
            padding: "12px 16px", display: "flex", alignItems: "center", gap: 10,
          }}>
            <div style={{
              width: 38, height: 38, borderRadius: "50%",
              background: "linear-gradient(135deg, #25d366, #128c7e)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 18,
            }}>🤖</div>
            <div>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: 13 }}>ARIA · AI Agent</div>
              <div style={{ color: "#acf7c1", fontSize: 11 }}>● Online · Responding instantly</div>
            </div>
            <div style={{ marginLeft: "auto", color: "#25d366", fontSize: 20 }}>📞</div>
          </div>

          {/* Messages */}
          <div style={{ padding: "12px 10px", minHeight: 160, display: "flex", flexDirection: "column", gap: 8 }}>
            {WA_MESSAGES.slice(0, count).map((m, i) => (
              <div key={i} style={{
                alignSelf: m.from === "ai" ? "flex-start" : "flex-end",
                background: m.from === "ai" ? "#1f2c34" : "#005c4b",
                color: "#e9edef", padding: "8px 12px", borderRadius: 10,
                fontSize: 12, maxWidth: "82%",
                boxShadow: m.from === "ai"
                  ? "0 1px 8px rgba(37,99,235,0.2)"
                  : "0 1px 8px rgba(37,211,102,0.2)",
                animation: "fadeSlideIn 0.3s ease",
              }}>
                {m.text}
                {m.from === "ai" && (
                  <span style={{ fontSize: 10, color: "#8696a0", marginLeft: 8 }}>✓✓</span>
                )}
              </div>
            ))}
          </div>

          {/* Input bar */}
          <div style={{
            background: "#1f2c34", padding: "8px 12px",
            display: "flex", alignItems: "center", gap: 8, borderTop: "1px solid #2a3942",
          }}>
            <div style={{
              flex: 1, background: "#2a3942", borderRadius: 20, padding: "6px 14px",
              color: "#8696a0", fontSize: 12,
            }}>Type a message…</div>
            <div style={{
              width: 32, height: 32, borderRadius: "50%",
              background: "#00a884", display: "flex",
              alignItems: "center", justifyContent: "center", fontSize: 14,
            }}>🎤</div>
          </div>
        </div>
        <style>{`@keyframes fadeSlideIn { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:translateY(0); } }`}</style>
      </Html>
    </Float>
  );
}

// ── Incoming call notification ──────────────────────────────────────
const CALL_STATES = [
  { label: "Incoming call…", sub: "John D. · New inquiry", icon: "📞", color: "#22c55e" },
  { label: "AI answering…",  sub: "Qualifying lead",        icon: "🤖", color: "#2563eb" },
  { label: "Appointment set!", sub: "Booked for tomorrow",  icon: "✅", color: "#06b6d4" },
  { label: "SMS sent",       sub: "Confirmation delivered", icon: "💬", color: "#7c3aed" },
];

function CallNotification({ position }) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setStep(s => (s + 1) % CALL_STATES.length), 2500);
    return () => clearInterval(id);
  }, []);
  const s = CALL_STATES[step];

  return (
    <Float speed={0.5} floatIntensity={0.4} rotationIntensity={0.08}>
      <Html position={position} transform scale={0.32} style={{ pointerEvents: "none" }}>
        <div style={{
          width: 240, background: "rgba(5,12,26,0.95)",
          border: `1px solid ${s.color}55`,
          borderRadius: 14, padding: "14px 16px",
          fontFamily: "'Segoe UI', sans-serif",
          boxShadow: `0 8px 32px ${s.color}33`,
          display: "flex", alignItems: "center", gap: 12,
        }}>
          <div style={{
            width: 46, height: 46, borderRadius: "50%",
            background: `${s.color}22`, border: `2px solid ${s.color}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 20, flexShrink: 0,
          }}>{s.icon}</div>
          <div>
            <div style={{ color: s.color, fontWeight: 700, fontSize: 13 }}>{s.label}</div>
            <div style={{ color: "#94a3b8", fontSize: 11, marginTop: 2 }}>{s.sub}</div>
          </div>
          <div style={{
            marginLeft: "auto", fontSize: 9, color: s.color,
            background: `${s.color}22`, padding: "3px 8px", borderRadius: 99,
          }}>LIVE</div>
        </div>
      </Html>
    </Float>
  );
}

// ── Stats panel ─────────────────────────────────────────────────────
const STATS = [
  { label: "Calls Handled", value: "24/7", icon: "📞", color: "#06b6d4" },
  { label: "Leads Captured", value: "∞",   icon: "🎯", color: "#2563eb" },
  { label: "Response Time",  value: "<3s",  icon: "⚡", color: "#22c55e" },
  { label: "No-shows Cut",  value: "−67%", icon: "📅", color: "#7c3aed" },
];

function StatsPanel({ position }) {
  return (
    <Float speed={0.4} floatIntensity={0.35} rotationIntensity={0.06}>
      <Html position={position} transform scale={0.34} style={{ pointerEvents: "none" }}>
        <div style={{
          width: 220, background: "rgba(5,12,26,0.92)",
          border: "1px solid rgba(37,99,235,0.4)",
          borderRadius: 16, padding: "16px 14px",
          fontFamily: "'Segoe UI', sans-serif",
          boxShadow: "0 8px 40px rgba(37,99,235,0.2)",
        }}>
          <div style={{
            color: "#94a3b8", fontSize: 10, textTransform: "uppercase",
            letterSpacing: 1.5, marginBottom: 12,
          }}>AI Agent · Live metrics</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {STATS.map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                  width: 34, height: 34, borderRadius: 8,
                  background: `${s.color}18`, border: `1px solid ${s.color}44`,
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15,
                }}>{s.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: "#cbd5e1", fontSize: 11 }}>{s.label}</div>
                </div>
                <div style={{ color: s.color, fontWeight: 800, fontSize: 15 }}>{s.value}</div>
              </div>
            ))}
          </div>
          <div style={{
            marginTop: 14, paddingTop: 10,
            borderTop: "1px solid rgba(255,255,255,0.06)",
            display: "flex", alignItems: "center", gap: 6,
          }}>
            <div style={{
              width: 8, height: 8, borderRadius: "50%",
              background: "#22c55e", boxShadow: "0 0 6px #22c55e",
            }}/>
            <div style={{ color: "#22c55e", fontSize: 11 }}>All systems operational</div>
          </div>
        </div>
      </Html>
    </Float>
  );
}

// ── Mini floating feature badge ─────────────────────────────────────
function FeatureBadge({ position, icon, label, color }) {
  return (
    <Float speed={0.7} floatIntensity={0.6} rotationIntensity={0.1}>
      <Html position={position} transform scale={0.28} style={{ pointerEvents: "none" }}>
        <div style={{
          background: "rgba(5,12,26,0.9)",
          border: `1px solid ${color}55`,
          borderRadius: 99, padding: "8px 14px",
          display: "flex", alignItems: "center", gap: 8,
          fontFamily: "'Segoe UI', sans-serif",
          boxShadow: `0 4px 20px ${color}22`,
          whiteSpace: "nowrap",
        }}>
          <span style={{ fontSize: 16 }}>{icon}</span>
          <span style={{ color: "#e2e8f0", fontSize: 12, fontWeight: 600 }}>{label}</span>
        </div>
      </Html>
    </Float>
  );
}

// ── Glowing orbs (accent) ───────────────────────────────────────────
function GlowOrb({ position, color, radius = 0.5, speed = 1 }) {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * speed * 0.3;
      ref.current.rotation.z = state.clock.elapsedTime * speed * 0.2;
    }
  });
  return (
    <Float speed={speed} rotationIntensity={0.4} floatIntensity={0.9}>
      <mesh ref={ref} position={position}>
        <icosahedronGeometry args={[radius, 1]} />
        <MeshDistortMaterial
          color={color} emissive={color} emissiveIntensity={0.6}
          distort={0.4} speed={2} roughness={0.05} metalness={0.9}
          transparent opacity={0.82}
        />
      </mesh>
    </Float>
  );
}

// ── Horizontal scan line effect ─────────────────────────────────────
function ScanRing({ y, color = CYAN }) {
  const ref = useRef();
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ref.current) {
      ref.current.material.opacity = 0.15 + Math.sin(t * 2 + y) * 0.1;
    }
  });
  return (
    <mesh ref={ref} position={[0, y, 0]}>
      <ringGeometry args={[2.8, 2.82, 64]} />
      <meshBasicMaterial color={color} transparent opacity={0.15} side={THREE.DoubleSide} />
    </mesh>
  );
}

// ── Full Scene ──────────────────────────────────────────────────────
function Scene() {
  return (
    <>
      <CameraRig />
      <color attach="background" args={[DARK]} />
      <fog attach="fog" args={[DARK, 16, 32]} />

      {/* Lights */}
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 0]}    intensity={8}   color={BLUE}   />
      <pointLight position={[6, 4, -4]}   intensity={3}   color={CYAN}   />
      <pointLight position={[-6, -3, 3]}  intensity={2}   color={INDIGO} />
      <pointLight position={[0, 5, -2]}   intensity={1.5} color={PURPLE} />

      <Stars radius={90} depth={60} count={2000} factor={2.5} fade speed={0.3} />
      <Particles count={3000} />

      {/* Central AI avatar */}
      <HolographicAvatar />

      {/* Pulse waves */}
      <PulseWave delay={0}   color={CYAN}  />
      <PulseWave delay={1}   color={BLUE}  />
      <PulseWave delay={2}   color={INDIGO}/>

      {/* Scan lines */}
      <ScanRing y={0.8}  color={CYAN}   />
      <ScanRing y={0}    color={BLUE}   />
      <ScanRing y={-0.8} color={INDIGO} />

      {/* Orbiting nodes */}
      <OrbitNode radius={2.2} speed={0.4}  angle={0}          color={CYAN}   yOffset={0.3}  />
      <OrbitNode radius={2.2} speed={0.4}  angle={Math.PI}    color={BLUE}   yOffset={-0.3} />
      <OrbitNode radius={3.0} speed={-0.3} angle={Math.PI/2}  color={INDIGO} yOffset={0.5}  />
      <OrbitNode radius={3.0} speed={-0.3} angle={-Math.PI/2} color={PURPLE} yOffset={-0.5} />
      <OrbitNode radius={3.8} speed={0.2}  angle={1}          color={CYAN}   yOffset={0}    />
      <OrbitNode radius={3.8} speed={0.2}  angle={4}          color={BLUE}   yOffset={0.2}  />

      {/* Accent orbs */}
      <GlowOrb position={[-5.5,  2.0, -2]}  color={BLUE}   radius={0.55} speed={0.7}  />
      <GlowOrb position={[ 5.2, -1.8, -1]}  color={CYAN}   radius={0.45} speed={1.0}  />
      <GlowOrb position={[-3.0, -3.0,  1]}  color={INDIGO} radius={0.40} speed={0.8}  />
      <GlowOrb position={[ 4.0,  3.0, -3]}  color={PURPLE} radius={0.50} speed={1.2}  />

      {/* ── HTML overlay panels ── */}
      {/* WhatsApp chat — left */}
      <WhatsAppPanel position={[-4.8, 0.3, 0]} />

      {/* Stats panel — right */}
      <StatsPanel position={[4.8, 0.0, 0]} />

      {/* Call notification — top center */}
      <CallNotification position={[0, 3.8, -0.5]} />

      {/* Feature badges */}
      <FeatureBadge position={[-2.8,  3.2, -1]} icon="🤖" label="AI Voice Agent"    color={CYAN}   />
      <FeatureBadge position={[ 2.5,  3.0, -1]} icon="📲" label="WhatsApp Auto"     color="#25d366" />
      <FeatureBadge position={[-3.5, -3.2, -1]} icon="📅" label="Auto Booking"      color={BLUE}   />
      <FeatureBadge position={[ 3.2, -2.8, -1]} icon="🎯" label="Lead Capture"      color={PURPLE} />
    </>
  );
}

// ── Canvas export ──────────────────────────────────────────────────
export default function ThreeScene() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 52, near: 0.1, far: 100 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
