"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy } from "lucide-react"
import Header from "@/components/ui/header"
import Footer from "@/components/ui/footer"
import { useState } from "react";

export default function AboutPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  // Section state: "gehu", "cse", "ieee"
  const [aboutSection, setAboutSection] = useState<"gehu" | "cse" | "ieee">("gehu");

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <section className="flex-1 max-w-7xl mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-[80vh] gap-16">
        {/* Hero / Intro */}
        <div className="w-full flex flex-col items-center text-center mb-4">
          <motion.h1 initial={{opacity:0, y:30}} animate={{opacity:1, y:0}} transition={{duration:0.7}} className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4 drop-shadow-lg">
            SAARTHI'25
          </motion.h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-medium max-w-2xl mx-auto mb-4">
            Empowering Innovation. Enabling Accessibility. Inspiring Change.
          </p>
        </div>

        {/* What is SARTHI & Objectives */}
        <div className="w-full flex flex-col lg:flex-row gap-10 items-stretch justify-center">
          <div className="flex-1 min-w-[340px] rounded-2xl bg-white/80 dark:bg-white/10 shadow-md border border-white/30 p-7 md:p-10 flex flex-col items-center text-center mb-4 lg:mb-0">
            <h2 className="text-3xl font-bold mb-3 text-primary">What is SAARTHI?</h2>
            <p className="text-lg md:text-xl text-muted-foreground">
              SAARTHI is a 24-hour national-level hackathon hosted by Graphic Era Hill University, designed to foster inclusive innovation for Persons with Disabilities (PwDs). It brings together interdisciplinary teams to build tech-driven solutions that empower lives and promote accessibility.
            </p>
          </div>
          <div className="flex-1 min-w-[340px] rounded-2xl bg-white/80 dark:bg-white/10 shadow-md border border-white/30 p-5 md:p-6 flex flex-col items-center text-center justify-center min-h-0">
            <h3 className="text-2xl font-semibold mb-2 text-primary">Objectives</h3>
            <ul className="flex flex-col justify-center items-center gap-3 md:gap-4 text-muted-foreground text-lg md:text-xl w-full max-w-xs mx-auto text-center">
              <li className="flex items-center gap-3"><span className="text-primary font-bold text-2xl">•</span>Empathy-driven innovation</li>
              <li className="flex items-center gap-3"><span className="text-primary font-bold text-2xl">•</span>Assistive tech for real challenges</li>
              <li className="flex items-center gap-3"><span className="text-primary font-bold text-2xl">•</span>Inclusive design awareness</li>
              <li className="flex items-center gap-3"><span className="text-primary font-bold text-2xl">•</span>Mentorship & collaboration</li>
            </ul>
          </div>
        </div>

        {/* Event Highlights */}
  <div className="w-full rounded-2xl bg-white/70 dark:bg-white/10 shadow-md border border-white/30 p-8 md:p-16 flex flex-col items-center text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-primary">Event Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full">
            <div className="flex flex-col items-center">
              <span className="text-4xl mb-2">⏰</span>
              <h4 className="font-semibold text-lg mb-1">24-Hour Hackathon</h4>
              <p className="text-muted-foreground text-sm">Non-stop coding, creativity, and collaboration to solve real-world challenges.</p>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl mb-2">🤝</span>
              <h4 className="font-semibold text-lg mb-1">Mentorship & Networking</h4>
              <p className="text-muted-foreground text-sm">Guidance from industry experts and opportunities to connect with like-minded peers.</p>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl mb-2">💡</span>
              <h4 className="font-semibold text-lg mb-1">Inclusive Innovation</h4>
              <p className="text-muted-foreground text-sm">Focus on accessibility and impact for Persons with Disabilities (PwDs).</p>
            </div>
          </div>
        </div>

        {/* Vision & Why SAARTHI */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="rounded-2xl bg-white/80 dark:bg-white/10 shadow-md border border-white/30 p-10 flex flex-col items-center text-center min-h-[320px]">
            <span className="text-3xl mb-2">🌍</span>
            <h2 className="text-2xl font-semibold mb-2 text-primary">Our Vision</h2>
            <p className="text-muted-foreground">
              We envision a world where technology breaks barriers, not builds them. Our goal is to foster a culture of inclusion, accessibility, and opportunity for all—regardless of ability.
            </p>
          </div>
          <div className="rounded-2xl bg-white/80 dark:bg-white/10 shadow-md border border-white/30 p-10 flex flex-col items-center text-center min-h-[320px]">
            <span className="text-3xl mb-2">🧭</span>
            <h2 className="text-2xl font-semibold mb-2 text-primary">Why SAARTHI?</h2>
            <p className="text-muted-foreground">
              SAARTHI means "guide"—and that's what we aim to be: guiding the next generation of innovators to build solutions that truly make a difference. Our hackathon is a launchpad for ideas, friendships, and positive change.
            </p>
          </div>
        </div>

        {/* Prizes & Recognition Section */}
        <motion.div className="text-center mb-4" {...fadeInUp}>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Prizes & Recognition</h2>
          <p className="text-lg text-muted-foreground">Celebrating innovation and impact</p>
        </motion.div>
        <motion.div className="flex justify-center" {...fadeInUp}>
          <Card className="text-center relative overflow-hidden max-w-xl w-full">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-yellow-400 to-yellow-600"></div>
            <CardHeader className="pt-12 pb-8">
              <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-6" />
              <CardTitle className="text-4xl font-extrabold text-primary">₹1,00,000+</CardTitle>
              <CardDescription className="text-2xl font-semibold text-muted-foreground mt-2">Prize Pool</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-muted-foreground">Exciting cash prizes, trophies, certificates, and special awards for top teams!</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Call to Action */}
        <div className="w-full flex flex-col items-center text-center mt-8">
          <h3 className="text-2xl md:text-3xl font-bold mb-3 text-primary">Ready to make an impact?</h3>
          <p className="text-muted-foreground mb-4 max-w-xl mx-auto">Join us at SAARTHI'25, collaborate with brilliant minds, and help shape a more accessible future for everyone.</p>
          <a href="/register" className="inline-block px-8 py-3 rounded-full bg-primary text-white font-semibold shadow-lg hover:bg-primary/90 transition">Register for SAARTHI'25</a>
        </div>

        {/* About Section with Tabs */}
        <div className="w-full flex flex-col items-center">
          <div className="w-full max-w-5xl bg-white/90 dark:bg-white/10 rounded-3xl shadow-2xl border border-white/30 overflow-hidden flex flex-col items-center">
            {/* Tabs */}
            <div className="w-full flex justify-center gap-2 md:gap-6 bg-gradient-to-r from-blue-50 via-white to-pink-50 py-4">
              <button
                className={`px-4 py-2 rounded-full font-semibold transition ${
                  aboutSection === "gehu"
                    ? "bg-primary text-white shadow"
                    : "bg-white/80 text-primary hover:bg-primary/10"
                }`}
                onClick={() => setAboutSection("gehu")}
              >
                About Graphic Era Hill University
              </button>
              <button
                className={`px-4 py-2 rounded-full font-semibold transition ${
                  aboutSection === "cse"
                    ? "bg-primary text-white shadow"
                    : "bg-white/80 text-primary hover:bg-primary/10"
                }`}
                onClick={() => setAboutSection("cse")}
              >
                About CSE & SOC Department
              </button>
              <button
                className={`px-4 py-2 rounded-full font-semibold transition ${
                  aboutSection === "ieee"
                    ? "bg-primary text-white shadow"
                    : "bg-white/80 text-primary hover:bg-primary/10"
                }`}
                onClick={() => setAboutSection("ieee")}
              >
                About IEEE SB, GEHU
              </button>
            </div>
            {/* Image at the top */}
            <div className="w-full flex justify-center items-center min-h-[300px] bg-gradient-to-br from-blue-100 via-white to-pink-100">
              {aboutSection === "gehu" && (
                <img
                  src="/gehu_campus.png"
                  alt="Graphic Era Hill University Campus"
                  className="object-contain w-full max-h-[480px] p-4 md:p-8"
                  style={{ background: "white" }}
                />
              )}
              {aboutSection === "cse" && (
                <img
                  src="/cse_soc.png"
                  alt="CSE & SOC Department"
                  className="object-contain w-full max-h-[480px] p-4 md:p-8"
                  style={{ background: "white" }}
                />
              )}
              {aboutSection === "ieee" && (
                <img
                  src="/ieee_logo.png"
                  alt="IEEE Student Branch GEHU"
                  className="object-contain w-full max-h-[320px] p-4 md:p-8"
                  style={{ background: "white" }}
                />
              )}
            </div>
            {/* Content below image */}
            <div className="w-full flex flex-col justify-center gap-4 p-8 md:p-12 items-center text-center">
              {aboutSection === "gehu" && (
                <>
                  <h2 className="text-3xl font-extrabold text-primary mb-2">About Graphic Era Hill University</h2>
                  <p className="text-lg text-muted-foreground">
                    <span className="font-semibold text-primary">Graphic Era Hill University (GEHU)</span> is a leading private university in Dehradun, Uttarakhand, established in 2011 by Prof. (Dr.) Kamal Ghanshala. Recognized under Section 2(f) of the UGC Act, 1956, GEHU is dedicated to transforming lives through quality, holistic education and fostering a culture of innovation and research. With a vibrant campus community of over <span className="font-semibold text-primary">17,000 students</span>, GEHU is known for its modern infrastructure, dynamic academic environment, and commitment to preparing students for global challenges. The university has earned prestigious accolades, including <span className="font-semibold text-primary">TCS Priority College Status</span> and the <span className="font-semibold text-primary">QS I-GAUGE Gold Rating</span> in July 2025.
                  </p>
                  <div className="bg-white/95 dark:bg-white/10 rounded-xl shadow p-4 mt-2 w-full max-w-xl mx-auto">
                    <h3 className="text-xl font-semibold text-primary mb-2">Why GEHU?</h3>
                    <ul className="space-y-2 text-base md:text-lg text-gray-700 dark:text-gray-200 text-left">
                      <li className="flex items-center gap-2"><span>🏅</span>Nationally and internationally recognized for academic excellence</li>
                      <li className="flex items-center gap-2"><span>🤖</span>Strong focus on emerging technologies and interdisciplinary research</li>
                      <li className="flex items-center gap-2"><span>🚀</span>Robust startup incubation, entrepreneurship, and mentorship ecosystem</li>
                      <li className="flex items-center gap-2"><span>🌍</span>Extensive collaborations with top industries and global universities</li>
                      <li className="flex items-center gap-2"><span>💼</span>Outstanding placement records with leading recruiters</li>
                      <li className="flex items-center gap-2"><span>🌟</span>Active student life with diverse clubs, societies, and leadership opportunities</li>
                      <li className="flex items-center gap-2"><span>🎓</span>Distinguished alumni making an impact worldwide</li>
                    </ul>
                  </div>
                  <p className="text-base text-muted-foreground mt-2">
                    GEHU continues to inspire excellence by combining innovation, ethics, and leadership, empowering students to become changemakers in a dynamic world.
                  </p>
                </>
              )}
              {aboutSection === "cse" && (
                <>
                  <h2 className="text-3xl font-extrabold text-primary mb-2">About CSE & SOC Department</h2>
                  <p className="text-lg text-muted-foreground">
                    The Department of Computer Science & Engineering at Graphic Era Hill University has a long-standing history of providing exceptional educational, research, internship, and career opportunities to its students. The department has produced successful alumni who have become leaders in various world-class multi-national organizations. It actively organizes national events and international conferences, fostering a culture of innovation, knowledge exchange, and global exposure.
                    <br /><br />
                    The School of Computing at Graphic Era Hill University is a premier academic department that focuses on providing high-quality education and research opportunities in the field of Computer Applications.
                  </p>
                  <div className="bg-white/95 dark:bg-white/10 rounded-xl shadow p-4 mt-2 w-full max-w-xl mx-auto">
                    <h3 className="text-xl font-semibold text-primary mb-2">Key Highlights</h3>
                    <ul className="space-y-2 text-base md:text-lg text-gray-700 dark:text-gray-200 text-left">
                      <li className="flex items-center gap-2"><span>💻</span>Cutting-edge curriculum in AI, ML, IoT, and more</li>
                      <li className="flex items-center gap-2"><span>🏆</span>Active student chapters and coding clubs</li>
                      <li className="flex items-center gap-2"><span>🤝</span>Strong industry partnerships and internships</li>
                      <li className="flex items-center gap-2"><span>🔬</span>Research-driven faculty and student projects</li>
                      <li className="flex items-center gap-2"><span>🌟</span>Consistent placement records in top companies</li>
                    </ul>
                  </div>
                </>
              )}
              {aboutSection === "ieee" && (
                <>
                  <h2 className="text-3xl font-extrabold text-primary mb-2">About IEEE Student Branch GEHU</h2>
                  <p className="text-lg text-muted-foreground">
                    IEEE Student Branch, Graphic Era Hill University (IEEE-SB GEHU) is a vibrant platform for students to explore cutting-edge technology, innovation, and professional development. The branch organizes workshops, technical talks, coding competitions, hackathons, and research activities, enabling students to gain practical skills and industry exposure. IEEE-SB GEHU fosters collaboration, networking, and leadership, empowering members to contribute to the global engineering community while enhancing their technical and soft skills.
                    <br /><br />
                    <span className="font-semibold text-primary">AutoCom</span>, the International Conference on Automation and Computation organized by the branch, brings together global experts, researchers, and students to share insights on emerging technologies such as AI, cybersecurity, and assistive solutions. Events like AutoCom reflect the branch’s commitment to promoting cutting-edge research and fostering meaningful collaborations.
                  </p>
                  <div className="bg-white/95 dark:bg-white/10 rounded-xl shadow p-4 mt-2 w-full max-w-xl mx-auto">
                    <h3 className="text-xl font-semibold text-primary mb-2">IEEE at GEHU</h3>
                    <ul className="space-y-2 text-base md:text-lg text-gray-700 dark:text-gray-200 text-left">
                      <li className="flex items-center gap-2"><span>🌐</span>Access to global IEEE resources and publications</li>
                      <li className="flex items-center gap-2"><span>🤝</span>Collaboration with industry and academia</li>
                      <li className="flex items-center gap-2"><span>🚀</span>Participation in technical events, conferences, and international symposiums like AutoCom</li>
                      <li className="flex items-center gap-2"><span>🏆</span>Recognition and awards for outstanding contributions</li>
                      <li className="flex items-center gap-2"><span>🌟</span>Leadership and professional development opportunities</li>
                    </ul>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
