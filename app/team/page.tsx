"use client"

import Header from "@/components/ui/header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { GSAPTextHover } from "@/components/effects/gsap-text-hover";

type Organizer = {
  name: string;
  role: string;
  email: string;
  image: string;
  linkedin?: string;
};

const organizers: Organizer[] = [
  {
    name: "Dr. A. Sharma",
    role: "Faculty Coordinator",
    email: "asharma@gehu.ac.in",
    image: "/placeholder-user.jpg",
    linkedin: "https://linkedin.com/in/asharma"
  },
  {
    name: "Priya Singh",
    role: "Student Lead",
    email: "priya.singh@gehu.ac.in",
    image: "/placeholder-user.jpg",
    linkedin: "https://linkedin.com/in/priyasingh"
  },
  {
    name: "Rahul Verma",
    role: "Design & Outreach",
    email: "rahul.verma@gehu.ac.in",
    image: "/placeholder-user.jpg"
  },
  // Add more members as needed
];

export default function TeamPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-background to-muted/60 pb-20 pt-16">
        {/* Hero Section */}
        <section className="w-full py-16 bg-gradient-to-r from-primary/80 to-secondary/80 text-center mb-12 shadow-lg">
          <h1 className="text-5xl font-extrabold tracking-tight text-white drop-shadow-lg mb-2">Meet the Organizing Team</h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">The passionate people making Saarthi Hackathon possible.</p>
        </section>

        {/* Team Grid */}
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {organizers.map((member, idx) => (
              <Card
                key={idx}
                className="flex flex-col items-center p-8 bg-white/90 shadow-xl hover:shadow-2xl transition-shadow duration-300 border-0 rounded-2xl group"
              >
                <div className="relative mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-28 h-28 rounded-full object-cover border-4 border-primary shadow-md group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader className="text-center p-0 mb-2">
                  <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">{member.name}</CardTitle>
                  <CardDescription className="text-base text-muted-foreground mb-1">{member.role}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-2 p-0">
                  <a
                    href={`mailto:${member.email}`}
                    className="text-blue-600 hover:underline text-sm flex items-center gap-1"
                    title="Email"
                  >
                    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 2v.01L12 13 4 6.01V6h16zM4 20v-9.99l7.99 7.99c.39.39 1.02.39 1.41 0L20 10.01V20H4z"/></svg>
                    {member.email}
                  </a>
                  {/* Example LinkedIn icon, add member.linkedin if available */}
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 hover:underline flex items-center gap-1 text-sm"
                      title="LinkedIn"
                    >
                      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.381-1.563 2.844-1.563 3.042 0 3.604 2.003 3.604 4.605v5.591z"/></svg>
                      LinkedIn
                    </a>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
