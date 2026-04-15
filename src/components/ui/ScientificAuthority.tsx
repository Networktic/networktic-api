"use client";

import { FileText, Award, BookOpen, ExternalLink } from "lucide-react";

const publications = [
    {
        type: "Patent",
        title: "Capacitive Sensor for Foliar Nitrogen Prediction",
        id: "NC2022/0014133",
        year: "2022",
        icon: Award,
    },
    {
        type: "Research Group",
        title: "MINCIENCIAS Classification A1",
        id: "COL0219197",
        year: "2024",
        icon: BookOpen,
    },
    {
        type: "Elsevier",
        title: "Deep Learning Models for Precision Irrigation in Tropical Crops",
        id: "J. Ag. Sci. Vol 45",
        year: "2023",
        icon: FileText,
    }
];

export function ScientificAuthority() {
    return (
        <section id="scientific-authority" className="py-20 bg-[#0A192F] relative border-t border-[#2D3436]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-mono font-bold text-white mb-4">Scientific <span className="text-[#FFD700]">Authority</span></h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Our innovations are not just code—they are backed by peer-reviewed science and recognized intellectual property.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {publications.map((item, idx) => (
                        <div key={idx} className="group bg-[#112240] p-8 rounded-2xl border border-[#2D3436] hover:border-[#FFD700] transition-all hover:-translate-y-2">
                            <div className="flex justify-between items-start mb-6">
                                <div className="p-3 bg-[#0A192F] rounded-lg border border-[#2D3436] group-hover:border-[#FFD700]/50 transition-colors">
                                    <item.icon className="w-8 h-8 text-[#FFD700]" />
                                </div>
                                <span className="font-mono text-xs text-[#00FF41] border border-[#00FF41]/30 px-2 py-1 rounded">
                                    {item.year}
                                </span>
                            </div>

                            <h3 className="text-xl font-bold text-white mb-2 font-mono h-16">{item.title}</h3>
                            <div className="flex justify-between items-center pt-4 border-t border-[#2D3436]">
                                <span className="text-sm text-gray-400 font-mono">{item.id}</span>
                                <button className="text-[#FFD700] hover:text-white transition-colors">
                                    <ExternalLink className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
