"use client";
import { GSAPTextHover } from "@/components/effects/gsap-text-hover";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-background/70 backdrop-blur-lg border-b-2 border-transparent header-glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 relative">
          <div className="flex items-center space-x-3">
            <img src="/saarthi_log.png" alt="SAARTHI Logo" className="h-10 w-10 neon-glow" />
            <GSAPTextHover blendMode="difference" scaleAmount={1.05}>
              <span className="text-xl font-bold neon-glow">SAARTHI'25</span>
            </GSAPTextHover>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <GSAPTextHover blendMode="overlay" scaleAmount={1.1}>
              <a href="/" className="nav-link-tech">
                Home
              </a>
            </GSAPTextHover>
            <GSAPTextHover blendMode="overlay" scaleAmount={1.1}>
              <a href="/team" className="nav-link-tech">
                Team
              </a>
            </GSAPTextHover>
            <GSAPTextHover blendMode="overlay" scaleAmount={1.1}>
              <a href="/results" className="nav-link-tech">
                Results
              </a>
            </GSAPTextHover>
            <Button size="lg" className="text-lg px-8 py-3 ml-2" asChild>
              <a href="https://unstop.com/" target="_blank" rel="noopener noreferrer">
                Register Now
              </a>
            </Button>
          </div>
          {/* Animated border glow */}
          <div className="absolute inset-0 pointer-events-none header-glow-border"></div>
        </div>
      </div>
    </nav>
  );
}
