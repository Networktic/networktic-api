"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import { SensorModel } from "@/components/3d/SensorModel";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function Hero() {
    return (
        <section className="relative w-full h-screen min-h-[800px] flex items-center bg-gradient-to-b from-[#0A192F] via-[#0D2137] to-[#0A192F] overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 pt-20">

                {/* Text Content */}
                <div className="flex flex-col justify-center space-y-8 z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-block px-4 py-1 rounded-full border border-[#00FF41]/30 bg-[#00FF41]/10 text-[#00FF41] font-mono text-sm mb-6">
                            MINCIENCIAS Group COL0219197 | Patent NC2022/0014133
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold font-mono text-white leading-tight">
                            INNOVACIÓN CON <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF41] to-[#FFD700]">
                                RAÍCES.
                            </span>
                        </h1>
                        <p className="text-gray-300 text-lg md:text-xl max-w-lg mt-6 font-sans">
                            Transforming agriculture into a high-precision science.
                            We integrate <span className="text-[#00FF41]">IoT Sensors</span>, <span className="text-[#FFD700]">AI Prediction</span>, and <span className="text-blue-400">Cyber-Defense</span> to guarantee global food security.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="flex flex-col sm:flex-row gap-4"
                    >
                        <button className="bg-[#00FF41] hover:bg-[#00CC33] text-[#0A192F] px-8 py-4 rounded-md font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(0,255,65,0.4)] hover:shadow-[0_0_25px_rgba(0,255,65,0.6)]">
                            EXPLORE OUR TECH <ArrowRight className="w-5 h-5" />
                        </button>
                        <button className="border border-[#2D3436] hover:border-[#FFD700] text-gray-300 hover:text-[#FFD700] px-8 py-4 rounded-md font-bold text-lg transition-all bg-[#0A192F]/50 backdrop-blur-sm">
                            VIEW PUBLICATIONS
                        </button>
                    </motion.div>
                </div>

                {/* 3D Visual */}
                <div className="relative h-[500px] lg:h-[700px] w-full">
                    <Canvas className="w-full h-full" camera={{ position: [0, 0, 5], fov: 45 }}>
                        <ambientLight intensity={0.5} />
                        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color="#00FF41" />
                        <pointLight position={[-10, -10, -10]} intensity={1} color="#FFD700" />

                        <SensorModel />

                        <Environment preset="city" />
                        <ContactShadows position={[0, -2.5, 0]} opacity={0.5} scale={10} blur={1} far={4} color="#00FF41" />
                        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
                    </Canvas>

                    {/* Decorative Elements */}
                    <div className="absolute bottom-10 right-10 p-4 bg-[#0A192F]/90 border border-[#00FF41]/30 backdrop-blur-md rounded-lg max-w-xs pointer-events-none">
                        <div className="flex gap-2 items-center mb-2">
                            <div className="w-2 h-2 rounded-full bg-[#00FF41] animate-pulse" />
                            <span className="text-[#00FF41] font-mono text-xs">LIVE SENSOR DATA</span>
                        </div>
                        <div className="font-mono text-white text-sm">
                            <div>Moisture: 32% (Optimal)</div>
                            <div>Nitrogen: 120 ppm</div>
                            <div>Signal: 5G Encrypted</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
