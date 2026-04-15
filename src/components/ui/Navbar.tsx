"use client";

import Link from "next/link";
import { Menu, Cpu } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 w-full z-50 border-b border-[#2D3436]/50 bg-[#0A192F]/80 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="p-2 rounded-lg bg-[#00FF41]/10 border border-[#00FF41]/20 group-hover:bg-[#00FF41]/20 transition-colors">
                                <Cpu className="w-8 h-8 text-[#00FF41]" />
                            </div>
                            <span className="text-xl font-bold font-mono tracking-wider text-white">
                                NETWORK<span className="text-[#00FF41]">TIC</span>
                            </span>
                        </Link>
                    </div>

                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            {['Scientific Authority', 'Services', 'Software', 'Academy'].map((item) => (
                                <Link
                                    key={item}
                                    href={`#${item.toLowerCase().replace(' ', '-')}`}
                                    className="text-gray-300 hover:text-[#00FF41] px-3 py-2 rounded-md text-sm font-medium transition-colors font-mono"
                                >
                                    {item}
                                </Link>
                            ))}
                            <button className="bg-[#00FF41] hover:bg-[#00CC33] text-[#0A192F] px-4 py-2 rounded-md text-sm font-bold transition-all shadow-[0_0_10px_rgba(0,255,65,0.3)] hover:shadow-[0_0_20px_rgba(0,255,65,0.5)]">
                                CLIENT PORTAL
                            </button>
                        </div>
                    </div>

                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
                        >
                            <Menu className="h-6 w-6" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <div className={cn("md:hidden", isOpen ? "block" : "hidden")}>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-[#0A192F] border-b border-[#2D3436]">
                    {['Scientific Authority', 'Services', 'Software', 'Academy'].map((item) => (
                        <Link
                            key={item}
                            href={`#${item.toLowerCase().replace(' ', '-')}`}
                            className="text-gray-300 hover:text-[#00FF41] block px-3 py-2 rounded-md text-base font-medium font-mono"
                        >
                            {item}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
}
