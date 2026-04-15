import { Navbar } from "@/components/ui/Navbar";
import { Hero } from "@/components/ui/Hero";
import { Footer } from "@/components/ui/Footer";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { ScientificAuthority } from "@/components/ui/ScientificAuthority";
import { Services } from "@/components/ui/Services";
import { VoiceChat } from "@/components/ui/VoiceChat";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0A192F] selection:bg-[#00FF41] selection:text-[#0A192F]">
      <Navbar />
      <Hero />
      <section id="dashboard-preview" className="relative z-20 -mt-20">
        <Dashboard />
      </section>
      <ScientificAuthority />
      <Services />
      <Footer />
      <VoiceChat />
    </main>
  );
}
