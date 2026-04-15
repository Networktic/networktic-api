"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere, Cylinder, Float } from "@react-three/drei";
import * as THREE from "three";

export function SensorModel() {
    const group = useRef<THREE.Group>(null);
    const mesh = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (group.current) {
            group.current.rotation.y += 0.005;
            group.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
        }
    });

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <group ref={group}>
                {/* Core Sensor Body */}
                <Cylinder args={[1, 1, 4, 32]} position={[0, 0, 0]}>
                    <meshStandardMaterial color="#2D3436" metalness={0.8} roughness={0.2} />
                </Cylinder>

                {/* Glowing Rings (Capacitive Plates) */}
                <Cylinder args={[1.05, 1.05, 0.2, 32]} position={[0, 1, 0]}>
                    <meshStandardMaterial color="#00FF41" emissive="#00FF41" emissiveIntensity={2} toneMapped={false} />
                </Cylinder>
                <Cylinder args={[1.05, 1.05, 0.2, 32]} position={[0, 0, 0]}>
                    <meshStandardMaterial color="#00FF41" emissive="#00FF41" emissiveIntensity={2} toneMapped={false} />
                </Cylinder>
                <Cylinder args={[1.05, 1.05, 0.2, 32]} position={[0, -1, 0]}>
                    <meshStandardMaterial color="#00FF41" emissive="#00FF41" emissiveIntensity={2} toneMapped={false} />
                </Cylinder>

                {/* Data Field Sphere */}
                <Sphere args={[2, 32, 32]} ref={mesh}>
                    <MeshDistortMaterial
                        color="#0A192F"
                        attach="material"
                        distort={0.4}
                        speed={2}
                        roughness={0}
                        transparent
                        opacity={0.3}
                        wireframe
                    />
                </Sphere>
            </group>
        </Float>
    );
}
