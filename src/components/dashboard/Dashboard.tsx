"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Activity, Droplet, Sun, Wind, Wifi } from "lucide-react";
import { cn } from "@/lib/utils";

const SensorCard = ({ title, value, unit, icon: Icon, color, status }: any) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="bg-[#0A192F]/80 backdrop-blur-md border border-[#2D3436] p-6 rounded-xl shadow-lg relative overflow-hidden group"
    >
        <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity", color === "green" ? "bg-[#00FF41]" : "bg-[#FFD700]")} />
        <div className="flex justify-between items-start mb-4">
            <div className={cn("p-2 rounded-lg", color === "green" ? "bg-[#00FF41]/10 text-[#00FF41]" : "bg-[#FFD700]/10 text-[#FFD700]")}>
                <Icon className="w-6 h-6" />
            </div>
            <div className="flex items-center gap-1">
                <div className={cn("w-2 h-2 rounded-full animate-pulse", status === "Optimal" ? "bg-[#00FF41]" : "bg-[#FFD700]")} />
                <span className="text-xs font-mono text-gray-400">{status}</span>
            </div>
        </div>
        <h3 className="text-gray-400 font-mono text-sm uppercase tracking-wider">{title}</h3>
        <div className="mt-2 flex items-baseline gap-1">
            <span className="text-3xl font-bold text-white font-mono">{value}</span>
            <span className="text-sm text-gray-500 font-mono">{unit}</span>
        </div>
    </motion.div>
);

export function Dashboard() {
    const [data, setData] = useState({
        moisture: 32,
        temp: 24,
        nitrogen: 120,
        humidity: 65
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setData(prev => ({
                moisture: prev.moisture + (Math.random() * 2 - 1),
                temp: prev.temp + (Math.random() * 0.5 - 0.25),
                nitrogen: prev.nitrogen + (Math.random() * 5 - 2.5),
                humidity: prev.humidity + (Math.random() * 2 - 1)
            }));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="bg-[#112240] border border-[#2D3436] rounded-2xl p-8 shadow-2xl relative overflow-hidden">
                {/* Glow Effect */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#00FF41] blur-[100px] opacity-10 rounded-full pointer-events-none" />

                <div className="flex flex-col md:flex-row justify-between items-end mb-10 relative z-10">
                    <div>
                        <h2 className="text-3xl text-white font-mono font-bold mb-2">LIVE CROP INTELLIGENCE</h2>
                        <p className="text-gray-400">Real-time data from NetworkTIC IoT Node #84: Yopal, Casanare.</p>
                    </div>
                    <div className="flex items-center gap-2 text-[#00FF41] bg-[#00FF41]/10 px-3 py-1 rounded-full font-mono text-sm mt-4 md:mt-0">
                        <Wifi className="w-4 h-4" />
                        <span>CONNECTED • 5ms Latency</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                    <SensorCard
                        title="Soil Moisture"
                        value={data.moisture.toFixed(1)}
                        unit="%"
                        icon={Droplet}
                        color="green"
                        status="Optimal"
                    />
                    <SensorCard
                        title="Ambient Temp"
                        value={data.temp.toFixed(1)}
                        unit="°C"
                        icon={Sun}
                        color="yellow"
                        status="Normal"
                    />
                    <SensorCard
                        title="Nitrogen Level"
                        value={data.nitrogen.toFixed(0)}
                        unit="ppm"
                        icon={Activity}
                        color="green"
                        status="High Efficiency"
                    />
                    <SensorCard
                        title="Air Humidity"
                        value={data.humidity.toFixed(1)}
                        unit="%"
                        icon={Wind}
                        color="yellow"
                        status="Monitor"
                    />
                </div>

                {/* Simulated Graph Line */}
                <div className="mt-8 h-32 w-full bg-[#0A192F] rounded-lg border border-[#2D3436] relative flex items-end px-4 overflow-hidden">
                    <div className="absolute inset-x-0 bottom-0 h-full opacity-20 bg-[repeating-linear-gradient(45deg,#00FF41_0px,#00FF41_1px,transparent_1px,transparent_10px)]" />
                    {/* Simple CSS Bar Chart Simulation */}
                    <div className="flex items-end justify-between w-full h-full gap-1 pt-4">
                        {[...Array(40)].map((_, i) => (
                            <div
                                key={i}
                                className="w-full bg-[#00FF41]"
                                style={{
                                    height: `${30 + Math.random() * 50}%`,
                                    opacity: 0.5 + Math.random() * 0.5
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
