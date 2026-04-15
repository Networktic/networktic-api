import { Linkedin, Mail, MapPin } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-[#0A192F] border-t border-[#2D3436] py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <span className="text-xl font-bold font-mono tracking-wider text-white">
                            NETWORK<span className="text-[#00FF41]">TIC</span>
                        </span>
                        <p className="mt-4 text-gray-400 text-sm max-w-sm">
                            Innovación con Raíces. Transforming agriculture through Precision AI, IoT, and Scientific Research.
                            <br />
                            MINCIENCIAS Group COL0219197.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-white font-mono font-bold mb-4">Solutions</h3>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li><a href="#" className="hover:text-[#00FF41]">AgriculTIC Enterprise</a></li>
                            <li><a href="#" className="hover:text-[#00FF41]">Fertirriego App</a></li>
                            <li><a href="#" className="hover:text-[#00FF41]">Cyber-Defense</a></li>
                            <li><a href="#" className="hover:text-[#00FF41]">Digital Twins</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-mono font-bold mb-4">Contact</h3>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-[#FFD700]" />
                                <span>Yopal, Casanare, Colombia</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-[#FFD700]" />
                                <span>contacto@networktic.com</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Linkedin className="w-4 h-4 text-[#FFD700]" />
                                <span>NetworkTIC S.A.S.</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-[#2D3436] text-center text-gray-500 text-xs font-mono">
                    &copy; 2026 NetworkTIC S.A.S. All rights reserved. Patent NC2022/0014133.
                </div>
            </div>
        </footer>
    );
}
