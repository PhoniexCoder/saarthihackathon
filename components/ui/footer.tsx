import { GSAPTextHover } from "@/components/effects/gsap-text-hover";

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-12 pb-6 mt-16 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-10 md:gap-0">
          {/* Branding & Logos */}
          <div className="flex flex-col items-center md:items-start md:w-1/3 mb-8 md:mb-0">
            <div className="flex items-center space-x-4 mb-4">
              <img src="/saarthi_log.png" alt="SAARTHI Logo" className="h-10 w-full object-contain" />
            </div>
            <p className="text-gray-400 text-sm text-center md:text-left max-w-xs">
              Innovating inclusive solutions for persons with disabilities through technology.<br />
              <span className="text-xs text-gray-500">Organised by Graphic Era Hill University</span>
            </p>
            <p>Powered by : </p>
            <img src="/ieeew.png" alt="IEEE SB GEHU Logo" className="h-20 w-30 object-contain ml-2" />
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start md:w-1/3 mb-8 md:mb-0">
            <h3 className="font-semibold mb-4 text-lg tracking-wide">Quick Links</h3>
            <ul className="space-y-2 text-base">
              {[
                { href: '/', label: 'Home' },
                { href: '/about', label: 'About' },
                { href: '/#themes', label: 'Problem Statements' },
                { href: 'https://unstop.com/', label: 'Register' },
                { href: '/sponsors', label: 'Sponsorship' },
                { href: '/#contact', label: 'Contact' },
              ].map(link => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-white hover:text-orange-500 focus:text-orange-500 transition-colors outline-none focus:underline px-2 py-1 rounded"
                    tabIndex={0}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="flex flex-col items-center md:items-end md:w-1/3">
            <h3 className="font-semibold mb-4 text-lg tracking-wide">Connect</h3>
            <div className="flex space-x-4 mb-2">
              <a
                href="https://www.linkedin.com/school/graphic-era-hill-university/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="rounded-full p-2 bg-gray-800 hover:bg-orange-500 focus:bg-orange-500 transition-colors text-gray-300 hover:text-white focus:text-white outline-none"
              >
                <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.381-1.563 2.844-1.563 3.042 0 3.604 2.003 3.604 4.605v5.591z"/></svg>
              </a>
              <a
                href="https://www.instagram.com/gehuofficial/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="rounded-full p-2 bg-gray-800 hover:bg-orange-500 focus:bg-orange-500 transition-colors text-gray-300 hover:text-white focus:text-white outline-none"
              >
                <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.069 1.646.069 4.85s-.011 3.584-.069 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.069-4.85.069s-3.584-.011-4.85-.069c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608-.058-1.266-.069-1.646-.069-4.85s.011-3.584.069-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.241-1.246 3.608-1.308 1.266-.058 1.646-.069 4.85-.069zm0-2.163c-3.259 0-3.667.012-4.947.07-1.276.058-2.687.334-3.678 1.325-.991.991-1.267 2.402-1.325 3.678-.058 1.28-.07 1.688-.07 4.947s.012 3.667.07 4.947c.058 1.276.334 2.687 1.325 3.678.991.991 2.402 1.267 3.678 1.325 1.28.058 1.688.07 4.947.07s3.667-.012 4.947-.07c1.276-.058 2.687-.334 3.678-1.325.991-.991 1.267-2.402 1.325-3.678.058-1.28.07-1.688.07-4.947s-.012-3.667-.07-4.947c-.058-1.276-.334-2.687-1.325-3.678-.991-.991-2.402-1.267-3.678-1.325-1.28-.058-1.688-.07-4.947-.07zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
              </a>
              <a
                href="https://twitter.com/gehuofficial"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="rounded-full p-2 bg-gray-800 hover:bg-orange-500 focus:bg-orange-500 transition-colors text-gray-300 hover:text-white focus:text-white outline-none"
              >
                <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557a9.93 9.93 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195a4.916 4.916 0 0 0-8.38 4.482c-4.083-.205-7.697-2.162-10.125-5.144a4.822 4.822 0 0 0-.664 2.475c0 1.708.87 3.216 2.188 4.099a4.904 4.904 0 0 1-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 0 1-2.224.084c.627 1.956 2.444 3.377 4.6 3.417a9.867 9.867 0 0 1-6.102 2.104c-.396 0-.787-.023-1.175-.069a13.945 13.945 0 0 0 7.548 2.212c9.057 0 14.009-7.513 14.009-14.009 0-.213-.005-.425-.014-.636A10.012 10.012 0 0 0 24 4.557z"/></svg>
              </a>
            </div>
            <span className="text-gray-400 text-xs">Follow us for updates</span>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            © 2025 SAARTHI Hackathon. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
