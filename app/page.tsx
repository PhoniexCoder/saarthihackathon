"use client"

import { useState, useEffect, useRef } from "react"
// Keyframes for subtle shake and glow
const shakeKeyframes = `
@keyframes shake {
  0% { transform: translateX(0); box-shadow: 0 0 0 0 #60a5fa; }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); box-shadow: 0 0 16px 4px #60a5fa55; }
  20%, 40%, 60%, 80% { transform: translateX(4px); box-shadow: 0 0 24px 8px #60a5fa88; }
  100% { transform: translateX(0); box-shadow: 0 0 0 0 #60a5fa; }
}
`;
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, MapPin, Users, Trophy, Clock, Mail, Phone } from "lucide-react"
import { GSAPTextHover } from "@/components/effects/gsap-text-hover"
import { FlipCard } from "@/components/ui/flip-card"
import Header from "@/components/ui/header"
import Footer from "@/components/ui/footer"
import BackgroundElements from "@/components/ui/background-elements"
import ReactFullpage from "@fullpage/react-fullpage";

// Judges data should be an array, not an object
const judges = [
  {
    name: "Dr. Sarah Johnson",
    role: "Accessibility Research Director",
    company: "Tech for Good Foundation",
    image: "/placeholder-user.jpg",
  },
  {
    name: "Prof. Rajesh Kumar",
    role: "Computer Science Department",
    company: "IIT Delhi",
    image: "/placeholder-user.jpg",
  },
  {
    name: "Ms. Priya Sharma",
    role: "Product Manager",
    company: "Microsoft Accessibility",
    image: "/placeholder-user.jpg",
  },
];

// Timeline data should be an array, not an object
const timeline = [
  { date: "25 Sept 2025", event: "Hackathon goes live on Unstop platform" },
  { date: "1 Oct 2025", event: "Participant registration opens and PPT submissions Begins" },
  { date: "10 Oct 2025", event: "PPT submission closes" },
  { date: "15 Oct 2025", event: "Results of PPT round announced" },
  { date: "20 Oct 2025", event: "Final registration fee payment" },
  { date: "1 Nov 2025", event: "Submission of NOC and ID proof (soft copy)" },
  { date: "8-9 Nov 2025", event: "National-level Hackathon at GEHU, Dehradun" },
];

export default function HomePage() {
  const [shake, setShake] = useState(false);
  const shakeTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Inject shake keyframes and utility only once (client-side)
    if (typeof window !== 'undefined') {
      if (!document.getElementById('shake-keyframes')) {
        const style = document.createElement('style');
        style.id = 'shake-keyframes';
        style.innerHTML = shakeKeyframes + `\n.animate-shake { animation: shake 0.6s cubic-bezier(.36,.07,.19,.97) both; }`;
        document.head.appendChild(style);
      }
    }
    // Trigger shake every 5 seconds
    const interval = setInterval(() => {
      setShake(true);
      if (shakeTimeout.current) clearTimeout(shakeTimeout.current);
      shakeTimeout.current = setTimeout(() => setShake(false), 600);
    }, 5000);
    return () => {
      clearInterval(interval);
      if (shakeTimeout.current) clearTimeout(shakeTimeout.current);
    };
  }, []);
  // Contact form state
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactLoading, setContactLoading] = useState(false);
  const [contactSuccess, setContactSuccess] = useState("");
  const [contactError, setContactError] = useState("");

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const targetDate = new Date("2025-11-08T00:00:00").getTime()

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }



  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <BackgroundElements />
      <Header />

      {/* Hero Section */}
      <section className="pt-16 min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-lg sm:text-2xl md:text-3xl font-bold mb-4 text-muted-foreground">
              National Level Hackathon
            </h2>
            <GSAPTextHover blendMode="screen" scaleAmount={1.2}>
              <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                SAARTHI'25
              </h1>
            </GSAPTextHover>
            <p className="text-base sm:text-lg md:text-2xl text-muted-foreground mb-4 max-w-4xl mx-auto">
              Technology as an Enabler: Innovating Inclusive Solutions for Persons with Disabilities
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>8th - 9th November 2025</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>Graphic Era Hill University, Dehradun</span>
              </div>
            </div>
            {/* Add this below the date/location */}
            <div className="mb-8">
              <span className="block text-primary font-semibold text-base sm:text-lg">
                Organised by Department of Computer Science & Engineering and School of Computing, GEHU
              </span>
            </div>
            
            {/* Countdown Timer */}
            <div className="flex flex-row gap-4 max-w-2xl mx-auto mb-8 justify-center items-center flex-wrap sm:flex-nowrap">
              {Object.entries(timeLeft).map(([unit, value], idx) => {
                // Only animate the seconds card every second
                const [prev, setPrev] = useState(value);
                const [rotation, setRotation] = useState(0);
                useEffect(() => {
                  if (prev !== value) {
                    setRotation(r => r + 180);
                    setPrev(value);
                  }
                }, [value]);
                return (
                  <FlipCard
                    key={unit}
                    className="h-24 w-20 min-w-[5rem]"
                    rotation={rotation}
                    axis="y"
                    front={
                      <Card className="h-full w-full bg-white border border-gray-300 rounded-xl flex flex-col justify-center items-center p-2">
                        <CardContent className="p-0">
                          <div className="text-2xl md:text-3xl font-bold text-primary">{value}</div>
                          <div className="text-sm text-muted-foreground capitalize">{unit}</div>
                        </CardContent>
                      </Card>
                    }
                    back={
                      <Card className="h-full w-full bg-white border border-gray-300 rounded-xl flex flex-col justify-center items-center p-2">
                        <CardContent className="p-0">
                          <div className="text-2xl md:text-3xl font-bold text-primary">{value}</div>
                          <div className="text-sm text-muted-foreground capitalize">{unit}</div>
                        </CardContent>
                      </Card>
                    }
                  />
                );
              })}
            </div>

            <GSAPTextHover blendMode="multiply" scaleAmount={1.05}>
              <Button
                size="lg"
                className={`text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 transition-transform ${shake ? 'animate-shake ring-4 ring-blue-400/40' : ''}`}
                asChild
              >
                <a href="https://unstop.com/" target="_blank" rel="noopener noreferrer">Register Now</a>
              </Button>
            </GSAPTextHover>

          </motion.div>
        </div>
      </section>


      {/* Themes Section */}
      <section id="themes" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Hackathon Themes</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Choose from these focus areas to create innovative accessibility solutions
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
          >
            {[
              {
                title: "Assistive Technology",
                description: "Develop tools and devices that assist persons with disabilities in daily activities",
              },
              {
                title: "Digital Accessibility",
                description: "Create inclusive digital experiences and accessible web/mobile applications",
              },
              {
                title: "Communication Aids",
                description: "Build solutions that enhance communication for people with speech or hearing impairments",
              },
              {
                title: "Mobility Solutions",
                description:
                  "Design technology to improve mobility and navigation for persons with physical disabilities",
              },
              {
                title: "Educational Tools",
                description: "Develop inclusive learning platforms and educational accessibility tools",
              },
              {
                title: "Employment Solutions",
                description: "Create technology that enhances employment opportunities and workplace accessibility",
              },
            ].map((theme, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{theme.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{theme.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Tracks Section (move this OUTSIDE of Themes Section) */}
      <section id="tracks" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center text-primary">
            Tracks
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: "🚶",
                title: "Track 1: Smart Mobility & Navigation",
                desc: "IoT-based smart canes, wheelchair automation with sensors, wearable haptic bands for navigation.",
                features:
                  "Hardware: Smart mobility devices | Software: AI obstacle detection, AR/VR navigation systems",
                border: "border-green-400",
              },
              {
                icon: "🎓",
                title: "Track 2: Inclusive Education Tools",
                desc: "Refreshable Braille displays, tactile tablets, 3D printed learning aids.",
                features:
                  "Hardware: Educational devices | Software: AI-driven personalized learning, AR/VR immersive education",
                border: "border-blue-400",
              },
              {
                icon: "👀",
                title: "Track 3: Visual, Hearing & Cognitive Accessibility",
                desc: "Personalization features for users with visual, hearing, or cognitive challenges.",
                features:
                  "Features: high-contrast & dyslexia-friendly modes, adjustable text size, simplified content, plain language summaries.",
                border: "border-indigo-400",
              },
              {
                icon: "🖥",
                title: "Track 4: Core Web Accessibility & Assistive Tech Integration",
                desc: "Building websites that align with WCAG standards and work with assistive technologies.",
                features:
                  "Focus: keyboard navigation, ARIA usage, semantic HTML, compatibility with screen readers, braille displays, and switch devices.",
                border: "border-purple-400",
              },
              {
                icon: "📡",
                title: "Track 5: IoT for Accessibility",
                desc: "Leverage IoT to create connected environments for independent living.",
                features:
                  "Examples: smart home automation, voice-controlled appliances, sensor-based alerts, remote monitoring.",
                border: "border-pink-400",
              },
              {
                icon: "🌐",
                title: "Track 6: Multilingual & Cultural Inclusivity",
                desc: "Making the web accessible across languages, scripts, and cultural contexts.",
                features:
                  "Features: language toggles, RTL (right-to-left) support, local-language TTS/voice commands.",
                border: "border-cyan-400",
              },
              {
                icon: "🩺",
                title: "Track 7: Healthcare & Rehabilitation Technologies",
                desc: "Prosthetics with sensors, robotic exoskeletons, wearable health trackers.",
                features:
                  "Hardware: smart prosthetics | Software: AI-driven physiotherapy apps, VR-based rehabilitation.",
                border: "border-red-400",
              },
              {
                icon: "💼",
                title: "Track 8: Employment & Workplace Accessibility",
                desc: "Tools that make workplaces more inclusive for persons with disabilities.",
                features:
                  "Hardware: adaptive keyboards | Software: accessibility testing tools, job-matching platforms.",
                border: "border-teal-400",
              },
              {
                icon: "📢",
                title: "Track 9: Policy, Awareness & Community Solutions",
                desc: "Platforms and tools to promote accessibility awareness and rights.",
                features:
                  "Examples: accessibility auditing tools, advocacy platforms, volunteer networks.",
                border: "border-emerald-400",
              },
              {
                icon: "💡",
                title: "Track 10: Open Innovation for Disabilities & Accessibility",
                desc: "Any creative solution that addresses challenges faced by persons with disabilities and promotes accessibility.",
                features:
                  "Examples: novel assistive devices, inclusive apps, awareness platforms, or any impactful idea that doesn't fit other tracks.",
                border: "border-orange-400",
              },
            ].map((track, idx, arr) => {
              // For the last card, if odd number of tracks, center it
              if (idx === arr.length - 1 && arr.length % 2 !== 0) {
                return (
                  <div
                    key={idx}
                    className={`md:col-span-2 flex justify-center`}
                  >
                    <div
                      className={`relative bg-gradient-to-br from-white via-blue-50 to-pink-50 rounded-xl shadow-xl p-6 flex flex-col gap-3 border-l-8 ${track.border} hover:scale-[1.03] hover:shadow-2xl transition-transform duration-300 max-w-xl w-full`}
                    >
                      <span className="text-4xl mb-2 drop-shadow-lg">{track.icon}</span>
                      <h4 className="font-extrabold text-lg md:text-xl text-primary mb-1">
                        {track.title}
                      </h4>
                      <p className="text-base text-gray-700 mb-1">{track.desc}</p>
                      <p className="text-sm text-muted-foreground">{track.features}</p>
                    </div>
                  </div>
                );
              }
              // Default card
              return (
                <div
                  key={idx}
                  className={`relative bg-gradient-to-br from-white via-blue-50 to-pink-50 rounded-xl shadow-xl p-6 flex flex-col gap-3 border-l-8 ${track.border} hover:scale-[1.03] hover:shadow-2xl transition-transform duration-300`}
                >
                  <span className="text-4xl mb-2 drop-shadow-lg">{track.icon}</span>
                  <h4 className="font-extrabold text-lg md:text-xl text-primary mb-1">
                    {track.title}
                  </h4>
                  <p className="text-base text-gray-700 mb-1">{track.desc}</p>
                  <p className="text-sm text-muted-foreground">{track.features}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section id="schedule" className="py-20 bg-muted/30 min-h-screen">
        <div className="max-w-3xl w-full mx-auto flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Event Schedule</h2>
          <p className="text-lg text-muted-foreground mb-8 text-center">
            24 hours of innovation, collaboration, and impact
          </p>
        </div>
        <div className="relative w-full max-w-3xl mx-auto">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-2 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 opacity-80 rounded-full z-0" />
          <ul className="relative z-10">
            {timeline.map((item, idx) => (
              <motion.li
                key={idx}
                className={`
                  flex items-center w-full mb-16 last:mb-0
                  ${idx % 2 === 0 ? "justify-start" : "justify-end"}
                  group
                `}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -80 : 80 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, delay: idx * 0.1 }}
              >
                {/* Timeline content card */}
                <div className={`
                  w-full sm:w-[48%] bg-white/90 backdrop-blur-lg rounded-xl shadow-xl px-6 py-4
                  flex flex-col gap-2
                  ${idx % 2 === 0 ? "ml-0 sm:ml-8 text-left" : "mr-0 sm:mr-8 text-right"}
                  border border-blue-100
                  transition-transform duration-300 group-hover:scale-[1.03]
                `}>
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="w-5 h-5 text-primary" />
                    <span className="font-semibold text-primary text-base">{item.date}</span>
                  </div>
                  <div className="text-lg font-semibold text-gray-900">{item.event}</div>
                </div>
                {/* Timeline dot */}
                <div className="relative z-10 flex flex-col items-center">
                  <span className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 border-4 border-white shadow-lg flex items-center justify-center text-white text-base font-bold absolute left-1/2 -translate-x-1/2 -top-3">
                    {idx + 1}
                  </span>
                  {/* Connecting line (only if not last) */}
                  {idx !== timeline.length - 1 && (
                    <span className="w-1 h-12 bg-gradient-to-b from-blue-400 via-purple-400 to-pink-400 opacity-60 rounded-full mt-6"></span>
                  )}
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* Judges Section 
      <section id="judges" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Esteemed Judges</h2>
            <p className="text-lg text-muted-foreground">Industry experts and accessibility advocates</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {judges.map((judge, idx) => (
              <div
                key={idx}
                className="relative bg-gradient-to-br from-blue-50 via-white to-purple-100 rounded-3xl shadow-2xl flex flex-col items-center p-8 transition-transform hover:-translate-y-3 hover:shadow-blue-300/40 hover:shadow-2xl duration-300 group overflow-hidden"
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-40 h-40 bg-gradient-to-tr from-blue-400 via-purple-400 to-pink-400 opacity-30 blur-2xl rounded-full z-0"></div>
                <div className="relative z-10 mb-4">
                  <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-primary shadow-lg ring-4 ring-blue-200 group-hover:ring-pink-200 transition-all duration-300 bg-white">
                    <img
                      src={judge.image}
                      alt={judge.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="text-center z-10">
                  <div className="font-extrabold text-xl text-gray-900 mb-1 group-hover:text-primary transition-colors duration-300">{judge.name}</div>
                  <div className="text-primary font-medium mb-1">{judge.role}</div>
                  <div className="text-muted-foreground text-sm">{judge.company}</div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-b-3xl opacity-80"></div>
              </div>
            ))}
          </div>
        </div>
      </section>*/}

      {/* Collaborate With Us Section */}
      <section id="collaborate" className="py-16">
        <div className="max-w-xl mx-auto px-4">
          <motion.div
            {...fadeInUp}
            className="rounded-2xl shadow-xl border-2 border-primary bg-white/95 flex flex-col items-center p-8"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500 text-center">
              Collaborate With Us
            </h2>
            <p className="text-base md:text-lg text-gray-700 mb-7 text-center">
              We're looking for <span className="text-primary font-semibold">sponsors, judges, mentors, and community partners</span> to help make <span className="text-pink-600 font-semibold">SAARTHI'25</span> a massive success.<br />
              <span className="font-semibold text-primary">Interested?</span> Let's collaborate!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              <a
                href="/sponsors"
                className="flex-1 inline-block px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-pink-500 text-white font-bold text-base shadow hover:scale-105 transition-transform text-center"
              >
                Become a Sponsor
              </a>
              <a
                href="mailto:saarthi@gehu.ac.in?subject=Mentor/Judge%20Enquiry%20for%20SAARTHI'25"
                className="flex-1 inline-block px-6 py-3 rounded-lg border-2 border-primary text-primary font-bold text-base bg-white hover:bg-primary hover:text-white transition-colors shadow text-center"
              >
                Join as Mentor/Judge
              </a>
            </div>
          </motion.div>
        </div>
      </section>


      {/* FAQ Section */}
      <section id="faq" className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground">Everything you need to know about SAARTHI'25</p>
          </motion.div>

          <motion.div {...fadeInUp}>
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1">
                <AccordionTrigger>Who can participate in SAARTHI'25?</AccordionTrigger>
                <AccordionContent>
                  SAARTHI'25 is open to all university and college students across India. Both undergraduate and
                  postgraduate students can participate. Cross-university teams are encouraged to promote collaboration.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>What should I bring to the hackathon?</AccordionTrigger>
                <AccordionContent>
                  Bring your laptop, chargers, any hardware you might need, and your creativity! We'll provide meals,
                  snacks, and a comfortable workspace. Don't forget to bring your student ID for verification.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>Are there any participation fees?</AccordionTrigger>
                <AccordionContent>
                  A nominal participation fee of ₹600 per participant is applicable for teams qualifying for the final round, to be paid online by 1st November 2025.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>How are projects evaluated?</AccordionTrigger>
                <AccordionContent>
                  Projects are evaluated based on innovation, technical implementation, user experience, social impact,
                  and presentation quality. Our panel of expert judges will assess each project fairly and provide
                  constructive feedback.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>Can I work on my project before the hackathon?</AccordionTrigger>
                <AccordionContent>
                  No, all development work must be done during the 24-hour hackathon period. However, you can research
                  ideas, plan your approach, and prepare any necessary accounts or tools beforehand.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Get In Touch</h2>
            <p className="text-lg text-muted-foreground">Have questions? We're here to help!</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div {...fadeInUp}>
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>Reach out to us for any queries</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-4">
                    <Mail className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-muted-foreground">saarthi@gehu.ac.in</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Phone className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-muted-foreground">+91 135 2643000</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <MapPin className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">Address</p>
                      <p className="text-muted-foreground">
                        Graphic Era Hill University
                        <br />
                        Bell Road, Clement Town
                        <br />
                        Dehradun, Uttarakhand 248002
                      </p>
                    </div>
                  </div>

                  <div className="pt-4">
                    <iframe
                      src="https://www.google.com/maps?q=30.273633412971506,77.99979116210066&t=k&z=17&output=embed"
                      width="100%"
                      height="350"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="rounded-lg shadow-lg"
                      title="Graphic Era Hill University Map"
                    ></iframe>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Send us a Message</CardTitle>
                  <CardDescription>We'll get back to you as soon as possible</CardDescription>
                </CardHeader>
                <CardContent>
                  <form
                    className="space-y-4"
                    onSubmit={async (e) => {
                      e.preventDefault();
                      setContactSuccess("");
                      setContactError("");
                      if (!contactName || !contactEmail || !contactMessage) {
                        setContactError("All fields are required.");
                        return;
                      }
                      setContactLoading(true);
                      try {
                        const res = await fetch("/api/messages", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ name: contactName, email: contactEmail, message: contactMessage }),
                        });
                        const data = await res.json();
                        if (res.ok && data.success) {
                          setContactSuccess("Message sent successfully! We'll get back to you soon.");
                          setContactName("");
                          setContactEmail("");
                          setContactMessage("");
                        } else {
                          setContactError(data.error || "Failed to send message.");
                        }
                      } catch (err) {
                        setContactError("Failed to send message. Please try again later.");
                      } finally {
                        setContactLoading(false);
                      }
                    }}
                  >
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Name</label>
                        <Input
                          placeholder="Your full name"
                          value={contactName}
                          onChange={e => setContactName(e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Email</label>
                        <Input
                          type="email"
                          placeholder="your.email@example.com"
                          value={contactEmail}
                          onChange={e => setContactEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Message</label>
                      <Textarea
                        placeholder="Your message here..."
                        rows={5}
                        value={contactMessage}
                        onChange={e => setContactMessage(e.target.value)}
                        required
                      />
                    </div>
                    {contactError && (
                      <div className="text-red-500 text-sm">{contactError}</div>
                    )}
                    {contactSuccess && (
                      <div className="text-green-600 text-sm">{contactSuccess}</div>
                    )}
                    <Button type="submit" className="w-full" disabled={contactLoading}>
                      {contactLoading ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
