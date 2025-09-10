"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, MapPin, Users, Trophy, Clock, Mail, Phone, ExternalLink, LogOut } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { LoginModal } from "@/components/auth/login-modal"
import { GSAPTextHover } from "@/components/effects/gsap-text-hover"
import { FlipCard } from "@/components/ui/flip-card"

export default function HomePage() {
  const { user, userProfile, logout } = useAuth()
  const [showLoginModal, setShowLoginModal] = useState(false)

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

  const handleRegisterClick = () => {
    if (user) {
      if (userProfile?.registrationComplete) {
        window.location.href = "/dashboard"
      } else {
        window.location.href = "/register"
      }
    } else {
      setShowLoginModal(true)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg"></div>
              <GSAPTextHover blendMode="difference" scaleAmount={1.05}>
                <span className="text-xl font-bold">SARTHI 2025</span>
              </GSAPTextHover>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <GSAPTextHover blendMode="overlay" scaleAmount={1.1}>
                <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About
                </a>
              </GSAPTextHover>
              <GSAPTextHover blendMode="overlay" scaleAmount={1.1}>
                <a href="#themes" className="text-muted-foreground hover:text-foreground transition-colors">
                  Themes
                </a>
              </GSAPTextHover>
              <GSAPTextHover blendMode="overlay" scaleAmount={1.1}>
                <a href="#schedule" className="text-muted-foreground hover:text-foreground transition-colors">
                  Schedule
                </a>
              </GSAPTextHover>
              <GSAPTextHover blendMode="overlay" scaleAmount={1.1}>
                <a href="#prizes" className="text-muted-foreground hover:text-foreground transition-colors">
                  Prizes
                </a>
              </GSAPTextHover>
              <GSAPTextHover blendMode="overlay" scaleAmount={1.1}>
                <a href="/results" className="text-muted-foreground hover:text-foreground transition-colors">
                  Results
                </a>
              </GSAPTextHover>
              <GSAPTextHover blendMode="overlay" scaleAmount={1.1}>
                <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </a>
              </GSAPTextHover>
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-muted-foreground">Welcome, {userProfile?.fullName || user.email}</span>
                  <Button variant="outline" size="sm" onClick={logout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                  <Button onClick={handleRegisterClick}>
                    {userProfile?.registrationComplete ? "Dashboard" : "Complete Registration"}
                  </Button>
                </div>
              ) : (
                <Button onClick={handleRegisterClick}>Register Now</Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-16 min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-muted-foreground">
  Inter-University Hackathon
</h2>
            <GSAPTextHover blendMode="screen" scaleAmount={1.2}>
              <h1 className="text-8xl md:text-9xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                SARTHI 2025
              </h1>
            </GSAPTextHover>
            <p className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-4xl mx-auto">
              Technology as an Enabler: Innovating Inclusive Solutions for Persons with Disabilities
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>8th - 9th November 2025</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>Graphic Era Hill University, Dehradun</span>
              </div>
            </div>

            {/* Countdown Timer */}
            <div className="grid grid-cols-4 gap-4 max-w-md mx-auto mb-8">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <FlipCard
                  key={unit + value} // Key changes when value changes, triggering animation
                  className="h-24 w-full"
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
              ))}
            </div>

            <GSAPTextHover blendMode="multiply" scaleAmount={1.05}>
              <Button size="lg" className="text-lg px-8 py-6" onClick={handleRegisterClick}>
                {user
                  ? userProfile?.registrationComplete
                    ? "Go to Dashboard"
                    : "Complete Registration"
                  : "Register Now"}
              </Button>
            </GSAPTextHover>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">About SARTHI 2025</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              SARTHI 2025 is an inter-university hackathon focused on developing innovative technological solutions that
              enhance accessibility and inclusion for persons with disabilities. Join us in creating technology that
              truly serves everyone.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
          >
            <motion.div variants={fadeInUp}>
              <Card>
                <CardHeader>
                  <Users className="w-12 h-12 text-primary mb-4" />
                  <CardTitle>Collaborative Innovation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Work with diverse teams to create solutions that address real-world accessibility challenges.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card>
                <CardHeader>
                  <Trophy className="w-12 h-12 text-secondary mb-4" />
                  <CardTitle>Impactful Solutions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Develop technology that makes a meaningful difference in the lives of persons with disabilities.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card>
                <CardHeader>
                  <Clock className="w-12 h-12 text-accent mb-4" />
                  <CardTitle>48-Hour Challenge</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Intensive 48-hour hackathon with mentorship, workshops, and networking opportunities.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
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

      {/* Schedule Section */}
      <section id="schedule" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Event Schedule</h2>
            <p className="text-lg text-muted-foreground">48 hours of innovation, collaboration, and impact</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div {...fadeInUp}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Day 1 - November 8th
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Registration & Check-in</span>
                    <Badge variant="outline">9:00 AM</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Opening Ceremony</span>
                    <Badge variant="outline">10:00 AM</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Team Formation</span>
                    <Badge variant="outline">11:00 AM</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Hacking Begins</span>
                    <Badge variant="outline">12:00 PM</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Mentor Sessions</span>
                    <Badge variant="outline">3:00 PM</Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Day 2 - November 9th
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Final Submissions</span>
                    <Badge variant="outline">10:00 AM</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Project Presentations</span>
                    <Badge variant="outline">11:00 AM</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Judging & Evaluation</span>
                    <Badge variant="outline">2:00 PM</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Awards Ceremony</span>
                    <Badge variant="outline">4:00 PM</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Closing Ceremony</span>
                    <Badge variant="outline">5:00 PM</Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Rules Section */}
      <section id="rules" className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Rules & Guidelines</h2>
            <p className="text-lg text-muted-foreground">Important guidelines for all participants</p>
          </motion.div>

          <motion.div {...fadeInUp}>
            <Card>
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Team Formation</h3>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      <li>Teams must consist of 2-4 members</li>
                      <li>Cross-university collaboration is encouraged</li>
                      <li>Team formation will be facilitated during the event</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3">Project Requirements</h3>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      <li>Solutions must address accessibility challenges</li>
                      <li>All code must be original and developed during the hackathon</li>
                      <li>Open source libraries and APIs are permitted</li>
                      <li>Final submission must include working prototype and presentation</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3">Code of Conduct</h3>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      <li>Respectful and inclusive behavior is mandatory</li>
                      <li>No harassment or discrimination will be tolerated</li>
                      <li>Collaboration and knowledge sharing are encouraged</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Prizes Section */}
      <section id="prizes" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Prizes & Recognition</h2>
            <p className="text-lg text-muted-foreground">Celebrating innovation and impact</p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
          >
            <motion.div variants={fadeInUp}>
              <Card className="text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-yellow-400 to-yellow-600"></div>
                <CardHeader className="pt-8">
                  <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                  <CardTitle className="text-2xl">First Place</CardTitle>
                  <CardDescription className="text-3xl font-bold text-primary">₹50,000</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Winner trophy, certificates, and mentorship opportunities</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-gray-400 to-gray-600"></div>
                <CardHeader className="pt-8">
                  <Trophy className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                  <CardTitle className="text-2xl">Second Place</CardTitle>
                  <CardDescription className="text-3xl font-bold text-primary">₹30,000</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Runner-up trophy, certificates, and recognition</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-600 to-amber-800"></div>
                <CardHeader className="pt-8">
                  <Trophy className="w-16 h-16 text-amber-600 mx-auto mb-4" />
                  <CardTitle className="text-2xl">Third Place</CardTitle>
                  <CardDescription className="text-3xl font-bold text-primary">₹20,000</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Third place trophy, certificates, and goodies</p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          <motion.div className="mt-12 text-center" {...fadeInUp}>
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>Special Recognition Awards</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4 text-left">
                  <div>
                    <h4 className="font-semibold">Most Innovative Solution</h4>
                    <p className="text-sm text-muted-foreground">₹10,000 + Certificate</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Best User Experience</h4>
                    <p className="text-sm text-muted-foreground">₹10,000 + Certificate</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Social Impact Award</h4>
                    <p className="text-sm text-muted-foreground">₹10,000 + Certificate</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Best Technical Implementation</h4>
                    <p className="text-sm text-muted-foreground">₹10,000 + Certificate</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Judges Section */}
      <section id="judges" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Esteemed Judges</h2>
            <p className="text-lg text-muted-foreground">Industry experts and accessibility advocates</p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
          >
            {[
              {
                name: "Dr. Sarah Johnson",
                role: "Accessibility Research Director",
                company: "Tech for Good Foundation",
              },
              { name: "Prof. Rajesh Kumar", role: "Computer Science Department", company: "IIT Delhi" },
              { name: "Ms. Priya Sharma", role: "Product Manager", company: "Microsoft Accessibility" },
            ].map((judge, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="text-center">
                  <CardHeader>
                    <div className="w-24 h-24 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mb-4"></div>
                    <CardTitle>{judge.name}</CardTitle>
                    <CardDescription>{judge.role}</CardDescription>
                    <p className="text-sm text-muted-foreground">{judge.company}</p>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section id="sponsors" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Sponsors & Partners</h2>
            <p className="text-lg text-muted-foreground">Supporting accessibility innovation</p>
          </motion.div>

          <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center" {...fadeInUp}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((sponsor) => (
              <div key={sponsor} className="bg-white p-6 rounded-lg shadow-sm flex items-center justify-center h-24">
                <div className="w-full h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground">Everything you need to know about SARTHI 2025</p>
          </motion.div>

          <motion.div {...fadeInUp}>
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1">
                <AccordionTrigger>Who can participate in SARTHI 2025?</AccordionTrigger>
                <AccordionContent>
                  SARTHI 2025 is open to all university and college students across India. Both undergraduate and
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
                  No, SARTHI 2025 is completely free to participate. This includes meals, accommodation (if needed), and
                  all event materials. Our sponsors make this possible to ensure accessibility for all students.
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
                  No, all development work must be done during the 48-hour hackathon period. However, you can research
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
                      <p className="text-muted-foreground">sarthi2025@gehu.ac.in</p>
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
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3443.175!2d78.0322!3d30.2849!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39092b6cf4b0c4d7%3A0x1b2b2b2b2b2b2b2b!2sGraphic%20Era%20Hill%20University!5e0!3m2!1sen!2sin!4v1635000000000!5m2!1sen!2sin"
                      width="100%"
                      height="200"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="rounded-lg"
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
                  <form className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Name</label>
                        <Input placeholder="Your full name" />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Email</label>
                        <Input type="email" placeholder="your.email@example.com" />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Message</label>
                      <Textarea placeholder="Your message here..." rows={5} />
                    </div>
                    <Button type="submit" className="w-full">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg"></div>
                <GSAPTextHover blendMode="difference" scaleAmount={1.05}>
                  <span className="text-xl font-bold">SARTHI 2025</span>
                </GSAPTextHover>
              </div>
              <p className="text-muted text-sm">
                Innovating inclusive solutions for persons with disabilities through technology.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <GSAPTextHover blendMode="overlay" scaleAmount={1.1}>
                    <a href="#about" className="text-muted hover:text-background transition-colors">
                      About
                    </a>
                  </GSAPTextHover>
                </li>
                <li>
                  <GSAPTextHover blendMode="overlay" scaleAmount={1.1}>
                    <a href="#themes" className="text-muted hover:text-background transition-colors">
                      Themes
                    </a>
                  </GSAPTextHover>
                </li>
                <li>
                  <GSAPTextHover blendMode="overlay" scaleAmount={1.1}>
                    <a href="#schedule" className="text-muted hover:text-background transition-colors">
                      Schedule
                    </a>
                  </GSAPTextHover>
                </li>
                <li>
                  <GSAPTextHover blendMode="overlay" scaleAmount={1.1}>
                    <a href="#prizes" className="text-muted hover:text-background transition-colors">
                      Prizes
                    </a>
                  </GSAPTextHover>
                </li>
                <li>
                  <GSAPTextHover blendMode="overlay" scaleAmount={1.1}>
                    <a href="/results" className="text-muted hover:text-background transition-colors">
                      Results
                    </a>
                  </GSAPTextHover>
                </li>
                <li>
                  <GSAPTextHover blendMode="overlay" scaleAmount={1.1}>
                    <a href="#contact" className="text-muted hover:text-background transition-colors">
                      Contact
                    </a>
                  </GSAPTextHover>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <GSAPTextHover blendMode="overlay" scaleAmount={1.1}>
                    <a href="#rules" className="text-muted hover:text-background transition-colors">
                      Rules
                    </a>
                  </GSAPTextHover>
                </li>
                <li>
                  <GSAPTextHover blendMode="overlay" scaleAmount={1.1}>
                    <a href="#faq" className="text-muted hover:text-background transition-colors">
                      FAQ
                    </a>
                  </GSAPTextHover>
                </li>
                <li>
                  <GSAPTextHover blendMode="overlay" scaleAmount={1.1}>
                    <a href="#contact" className="text-muted hover:text-background transition-colors">
                      Contact
                    </a>
                  </GSAPTextHover>
                </li>
                <li>
                  <GSAPTextHover blendMode="overlay" scaleAmount={1.1}>
                    <a href="#sponsors" className="text-muted hover:text-background transition-colors">
                      Sponsors
                    </a>
                  </GSAPTextHover>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Connect</h3>
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm" className="text-muted hover:text-background">
                  <ExternalLink className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-muted hover:text-background">
                  <ExternalLink className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-muted hover:text-background">
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t border-muted/20 mt-8 pt-8 text-center">
            <p className="text-muted text-sm">
              © 2025 SARTHI Hackathon. All rights reserved. Organized by Graphic Era Hill University.
            </p>
          </div>
        </div>
      </footer>

      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </div>
  )
}
