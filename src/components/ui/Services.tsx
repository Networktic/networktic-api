"use client";

import { Sprout, ShieldCheck, Users, BrainCircuit } from "lucide-react";

const services = [
    {
        title: "AgTech & Digital Twins",
        desc: "Simulation of Nitrogen content and crop yield using Q1 research models.",
        icon: Sprout,
        color: "text-[#00FF41]",
        bg: "bg-[#00FF41]/10",
    },
    {
        title: "Cyber-Defense Agrícola",
        desc: "CISCO-grade protection for farm data, IoT nodes, and cloud infrastructure.",
        icon: ShieldCheck,
        color: "text-blue-400",
        bg: "bg-blue-400/10",
    },
    {
        title: "CT+I Academy",
        desc: "Training based on real-world SENA and Government project experience.",
        icon: Users,
        color: "text-purple-400",
        bg: "bg-purple-400/10",
    },
    {
        title: "Strategic Consulting",
        desc: "Digital transformation for Agribusiness (B2B) and Government (G2B).",
        icon: BrainCircuit,
        color: "text-[#FFD700]",
        bg: "bg-[#FFD700]/10",
    },
];

export function Services() {
    return (
        <section id="services" className="py-20 bg-[#0D2137] relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-16">
                    <h2 className="text-3xl md:text-5xl font-mono font-bold text-white mb-4">Strategic <span className="text-blue-400">Services</span></h2>
                    <div className="w-20 h-1 bg-blue-400 rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, idx) => (
                        <div key={idx} className="bg-[#0A192F]/50 backdrop-blur-sm p-6 rounded-xl border border-[#2D3436] hover:border-gray-500 transition-all hover:bg-[#0A192F]">
                            <div className={`w-12 h-12 rounded-lg ${service.bg} flex items-center justify-center mb-6`}>
                                <service.icon className={`w-6 h-6 ${service.color}`} />
                            </div>
                            <h3 className="text-lg font-bold text-white font-mono mb-3">{service.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {service.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
