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
        <div className="flex flex-col items-center justify-center w-full">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 justify-center">
            {organizers.map((member, idx) => (
              <div
                key={idx}
                className="relative flex flex-col items-center bg-white/80 border border-gray-200 rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300 w-72 mx-auto overflow-hidden group"
                style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)' }}
              >
                {/* Top border accent */}
                <div className="w-full h-2 bg-gradient-to-r from-primary to-secondary mb-0" />
                {/* Profile image with floating LinkedIn icon - no negative margin, add top padding */}
                <div className="relative flex flex-col items-center pt-4 mb-2">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg z-10 bg-white"
                  />
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute -bottom-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-blue-100 transition-colors z-20"
                      title="LinkedIn"
                    >
                      <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.381-1.563 2.844-1.563 3.042 0 3.604 2.003 3.604 4.605v5.591z"/></svg>
                    </a>
                  )}
                </div>
                {/* Name and role */}
                <div className="flex flex-col items-center px-4 pb-5 pt-1 w-full">
                  <span className="text-lg font-bold text-gray-900 text-center truncate w-full" title={member.name}>{member.name}</span>
                  <span className="text-sm italic text-primary/80 text-center mt-1 mb-2 w-full truncate" title={member.role}>{member.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
