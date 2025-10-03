"use client"

import { motion } from "framer-motion"
import Header from "@/components/ui/header"
import Footer from "@/components/ui/footer"

const sponsors = [
	// {
	// 	name: "TechCorp",
	// 	about: "Leading technology solutions provider.",
	// 	logo: "/sponsors/techcorp.png",
	// },
	// {
	// 	name: "InnoSoft",
	// 	about: "Innovating accessibility for all.",
	// 	logo: "/sponsors/innosoft.png",
	// },
	// {
	// 	name: "EduNext",
	// 	about: "Empowering education through technology.",
	// 	logo: "/sponsors/edunext.png",
	// },
	// {
	// 	name: "HealthPlus",
	// 	about: "Healthcare innovation partner.",
	// 	logo: "/sponsors/healthplus.png",
	// },
	// {
	// 	name: "CodeBase",
	// 	about: "Supporting open-source communities.",
	// 	logo: "/sponsors/codebase.png",
	// },
	// {
	// 	name: "Visionary",
	// 	about: "Driving inclusive design.",
	// 	logo: "/sponsors/visionary.png",
	// },
	// {
	// 	name: "DataBridge",
	// 	about: "Connecting data for good.",
	// 	logo: "/sponsors/databridge.png",
	// },
	// {
	// 	name: "NextGen",
	// 	about: "Future-ready tech for everyone.",
	// 	logo: "/sponsors/nextgen.png",
	// },
]


export default function SponsorsPage() {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <section className="flex-1 max-w-7xl mx-auto px-2 sm:px-4 py-10 sm:py-20 flex flex-col items-center justify-center min-h-[80vh]">
          <motion.div
            className="text-center mb-10 sm:mb-16"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 sm:mb-6 text-primary drop-shadow-lg tracking-tight">
              Sponsors & Partners
            </h2>
            <p className="text-lg sm:text-2xl md:text-3xl font-semibold text-pink-600 mb-2 animate-pulse">
              Supporting Accessibility Innovation
            </p>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-10 items-stretch w-full justify-items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {sponsors.map((sponsor, idx) => (
              <motion.div
                key={sponsor.name}
                whileHover={{
                  scale: 1.07,
                  boxShadow: "0 8px 32px 0 rgba(236,72,153,0.18)",
                }}
                className="relative bg-gradient-to-br from-white via-blue-50 to-purple-50 rounded-xl shadow-2xl flex flex-col items-center justify-between h-56 p-0 transition-all duration-300 group overflow-hidden border-2 border-pink-300 w-full max-w-xs"
              >
                {/* Top colored bar */}
                <div className="w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
                {/* Sponsor logo in a rectangular badge */}
                <div className="flex-1 flex flex-col items-center justify-center w-full px-2 sm:px-4 py-4">
                  <div className="w-full flex items-center justify-center mb-3">
                    <div className="bg-gradient-to-r from-blue-100 via-white to-pink-100 rounded-md shadow-md px-2 sm:px-4 py-2 w-24 sm:w-32 h-12 sm:h-16 flex items-center justify-center border-2 border-blue-200">
                      <img
                        src={sponsor.logo}
                        alt={sponsor.name}
                        className="object-contain w-full h-full"
                        onError={(e) =>
                          (e.currentTarget.src = "/placeholder-user.jpg")
                        }
                      />
                    </div>
                  </div>
                  <div className="font-extrabold text-base sm:text-lg md:text-xl text-gray-900 text-center mb-1 uppercase tracking-wide">
                    {sponsor.name}
                  </div>
                  <div className="text-xs sm:text-base md:text-lg text-blue-700 text-center font-medium">
                    {sponsor.about}
                  </div>
                </div>
                {/* Bottom gradient bar */}
                <div className="w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
              </motion.div>
            ))}
          </motion.div>
        </section>
        {/* Call to Action Section */}
        <div className="w-full flex flex-col items-center justify-center mt-8 sm:mt-10 mb-10 sm:mb-20 px-2">
          <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl px-4 sm:px-10 py-8 sm:py-12 max-w-2xl w-full flex flex-col items-center border-2 border-pink-400">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-pink-600 mb-3 sm:mb-4 text-center drop-shadow-lg animate-pulse">
              Ready to Partner With Us?
            </h3>
            <p className="text-base sm:text-xl md:text-2xl font-semibold text-primary mb-6 sm:mb-8 text-center">
              Join us in creating{" "}
              <span className="text-pink-600 font-extrabold">
                India's most innovative hackathon experience
              </span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full justify-center">
              <a
                href="https://drive.google.com/file/d/1O0fOoe3c0oPdaJwUGvGNyCDe4x0jLW48/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 sm:px-8 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-pink-500 text-white font-bold text-base sm:text-lg shadow-lg hover:scale-105 transition-transform tracking-wide text-center"
              >
                Download Brochure
              </a>
              <a
                href="mailto:saarthi@gehu.ac.in?subject=Sponsor%20Enquiry%20for%20SAARTHI'25"
                className="inline-block px-6 sm:px-8 py-3 rounded-lg border-2 border-primary text-primary font-bold text-base sm:text-lg bg-white hover:bg-primary hover:text-white transition-colors shadow-lg tracking-wide text-center"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
}
