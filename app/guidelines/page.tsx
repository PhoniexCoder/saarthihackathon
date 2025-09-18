"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Users, FileEdit, ShieldCheck, BookOpen, Laptop2, Star, Award, Accessibility, UserCheck } from "lucide-react"
import Header from "@/components/ui/header"
import Footer from "@/components/ui/footer"

export default function GuidelinesPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 w-full flex flex-col items-center py-24 px-4">
        <motion.div className="text-center mb-12" {...fadeInUp}>
          <ShieldCheck className="w-14 h-14 mx-auto text-orange-400 mb-4" />
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-2 tracking-tight">Rules & Guidelines</h1>
          <p className="text-lg md:text-xl text-muted-foreground font-medium max-w-2xl mx-auto">Please read these carefully to ensure a fair, inclusive, and impactful event for everyone.</p>
        </motion.div>
  <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* General Eligibility */}
          <Card className="shadow-md border bg-white/90 dark:bg-white/10">
            <CardContent className="py-8 px-6 md:px-10">
              <div className="flex items-center gap-3 mb-3">
                <UserCheck className="w-7 h-7 text-blue-600" />
                <h2 className="text-lg md:text-xl font-bold text-blue-700 dark:text-blue-300">General Eligibility</h2>
              </div>
              <ul className="list-disc list-inside space-y-2 text-base text-muted-foreground ml-2">
                <li>Open to students from recognized universities across India.</li>
                <li>Participants must be enrolled in UG or PG programs in CS, IT, or allied disciplines.</li>
                <li>Team size: Minimum 3, Maximum 4 members.</li>
                <li>Cross-disciplinary teams are encouraged.</li>
              </ul>
            </CardContent>
          </Card>
          {/* Registration & Participation */}
          <Card className="shadow-md border bg-white/90 dark:bg-white/10">
            <CardContent className="py-8 px-6 md:px-10">
              <div className="flex items-center gap-3 mb-3">
                <FileEdit className="w-7 h-7 text-blue-500" />
                <h2 className="text-lg md:text-xl font-bold text-blue-700 dark:text-blue-300">Registration & Participation</h2>
              </div>
              <ul className="list-disc list-inside space-y-2 text-base text-muted-foreground ml-2">
                <li>All teams must register through the official SAARTHI website before the deadline.</li>
                <li>Each team must submit a brief idea proposal during registration.</li>
                <li>Shortlisted teams will receive confirmation via email and must confirm attendance.</li>
              </ul>
            </CardContent>
          </Card>
          {/* Code of Conduct */}
          <Card className="shadow-md border bg-white/90 dark:bg-white/10">
            <CardContent className="py-8 px-6 md:px-10">
              <div className="flex items-center gap-3 mb-3">
                <ShieldCheck className="w-7 h-7 text-orange-500" />
                <h2 className="text-lg md:text-xl font-bold text-orange-700 dark:text-orange-300">Code of Conduct</h2>
              </div>
              <ul className="list-disc list-inside space-y-2 text-base text-muted-foreground ml-2">
                <li>Respect all participants, mentors, and organizers.</li>
                <li>Maintain professionalism and inclusivity throughout the event.</li>
                <li>Harassment, discrimination, or disruptive behavior will result in disqualification.</li>
              </ul>
            </CardContent>
          </Card>
          {/* Project Guidelines */}
          <Card className="shadow-md border bg-white/90 dark:bg-white/10">
            <CardContent className="py-8 px-6 md:px-10">
              <div className="flex items-center gap-3 mb-3">
                <BookOpen className="w-7 h-7 text-green-600" />
                <h2 className="text-lg md:text-xl font-bold text-green-700 dark:text-green-300">Project Guidelines</h2>
              </div>
              <ul className="list-disc list-inside space-y-2 text-base text-muted-foreground ml-2">
                <li>Projects must align with the theme: Accessibility & Inclusion for PwDs.</li>
                <li>All code and assets must be developed during the hackathon period.</li>
                <li>Use of open-source libraries is permitted with proper attribution.</li>
                <li>Plagiarism or pre-submitted work will lead to disqualification.</li>
              </ul>
            </CardContent>
          </Card>
          {/* Technical Requirements */}
          <Card className="shadow-md border bg-white/90 dark:bg-white/10">
            <CardContent className="py-8 px-6 md:px-10">
              <div className="flex items-center gap-3 mb-3">
                <Laptop2 className="w-7 h-7 text-purple-600" />
                <h2 className="text-lg md:text-xl font-bold text-purple-700 dark:text-purple-300">Technical Requirements</h2>
              </div>
              <ul className="list-disc list-inside space-y-2 text-base text-muted-foreground ml-2">
                <li>Teams must bring their own laptops and development tools.</li>
                <li>Internet access will be provided at the venue.</li>
                <li>Teams are responsible for backing up their work regularly.</li>
              </ul>
            </CardContent>
          </Card>
          {/* Judging & Evaluation */}
          <Card className="shadow-md border bg-white/90 dark:bg-white/10">
            <CardContent className="py-8 px-6 md:px-10">
              <div className="flex items-center gap-3 mb-3">
                <Star className="w-7 h-7 text-yellow-500" />
                <h2 className="text-lg md:text-xl font-bold text-yellow-700 dark:text-yellow-300">Judging & Evaluation</h2>
              </div>
              <ul className="list-disc list-inside space-y-2 text-base text-muted-foreground ml-2">
                <li>Projects will be judged based on:</li>
                <ul className="list-disc list-inside ml-6 space-y-1 text-base text-muted-foreground">
                  <li>Innovation & Originality</li>
                  <li>Relevance to PwD Challenges</li>
                  <li>Technical Implementation</li>
                  <li>Feasibility & Usability</li>
                  <li>Presentation & Social Impact</li>
                </ul>
                <li>Judges’ decisions are final and binding.</li>
              </ul>
            </CardContent>
          </Card>
          {/* Intellectual Property */}
          <Card className="shadow-md border bg-white/90 dark:bg-white/10">
            <CardContent className="py-8 px-6 md:px-10">
              <div className="flex items-center gap-3 mb-3">
                <Award className="w-7 h-7 text-pink-500" />
                <h2 className="text-lg md:text-xl font-bold text-pink-700 dark:text-pink-300">Intellectual Property</h2>
              </div>
              <ul className="list-disc list-inside space-y-2 text-base text-muted-foreground ml-2">
                <li>Teams retain ownership of their projects.</li>
                <li>By participating, teams grant organizers the right to showcase their work for promotional and educational purposes.</li>
              </ul>
            </CardContent>
          </Card>
          {/* Awards & Recognition */}
          <Card className="shadow-md border bg-white/90 dark:bg-white/10">
            <CardContent className="py-8 px-6 md:px-10">
              <div className="flex items-center gap-3 mb-3">
                <Award className="w-7 h-7 text-green-600" />
                <h2 className="text-lg md:text-xl font-bold text-green-700 dark:text-green-300">Awards & Recognition</h2>
              </div>
              <ul className="list-disc list-inside space-y-2 text-base text-muted-foreground ml-2">
                <li>Winning teams will receive certificates, cash prizes, and mentorship opportunities.</li>
                <li>Special recognition may be given for creativity, social impact, and technical excellence.</li>
              </ul>
            </CardContent>
          </Card>
          {/* Safety & Accessibility */}
          <Card className="shadow-md border bg-white/90 dark:bg-white/10">
            <CardContent className="py-8 px-6 md:px-10">
              <div className="flex items-center gap-3 mb-3">
                <Accessibility className="w-7 h-7 text-blue-500" />
                <h2 className="text-lg md:text-xl font-bold text-blue-700 dark:text-blue-300">Safety & Accessibility</h2>
              </div>
              <ul className="list-disc list-inside space-y-2 text-base text-muted-foreground ml-2">
                <li>The venue will be equipped with basic accessibility features.</li>
                <li>Participants with special needs are encouraged to inform organizers in advance for support arrangements.</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
