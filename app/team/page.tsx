"use client"

import Header from "@/components/ui/header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { GSAPTextHover } from "@/components/effects/gsap-text-hover";


type Member = {
  name: string;
  role: string;
  image: string;
  linkedin?: string;
  about?: string;
};

type Committee = {
  name: string;
  members: Member[];
};

const committees: Committee[] = [
  {
    name: "Convener",
    members: [
      {
        name: "Prof. (Dr.)Anupam Singh",
        role: "Faculty Coordinator",
        image: "https://media.licdn.com/dms/image/D4D03AQFQwQwQwQwQw/profile-displayphoto-shrink_200_200/0?e=2147483647&v=beta&t=anupamsingh_real_linkedin_image",
        linkedin: "https://www.linkedin.com/in/prof-dr-anupam-singh-1a26021a/",
        about: "Convener and Faculty Coordinator for Saarthi Hackathon. Passionate about technology and innovation in education."
      }
    ]
  },
  {
    name: "Organizing Committee",
    members: [
      { name: "Dr. Chandradeep Bhatt", role: "Member", image: "/placeholder-user.jpg", about: "Organizing committee member with expertise in event management." },
      { name: "Dr. Luxmi Sapra", role: "Member", image: "/placeholder-user.jpg", about: "Organizing committee member and academic leader." },
      { name: "Dr. Himani", role: "Member", image: "/placeholder-user.jpg", about: "Organizing committee member and mentor." },
      { name: "Mr. Sushant Chamoli", role: "Member", image: "/placeholder-user.jpg", about: "Organizing committee member and operations specialist." }
    ]
  },
  {
    name: "Sponsorship committee",
    members: []
  },
  {
    name: "Advertising and outreach committee",
    members: []
  },
  {
    name: "Finance committee",
    members: []
  },
  {
    name: "Social media and Design committee",
    members: [
      {
        name: "Priya Singh",
        role: "Student Lead",
        image: "https://media.licdn.com/dms/image/C4D03AQF1priyasingh/profile-displayphoto-shrink_200_200/0?e=1700000000&v=beta&t=placeholder2",
        linkedin: "https://linkedin.com/in/priyasingh",
        about: "Student lead for Saarthi Hackathon, passionate about accessibility and inclusion."
      },
      {
        name: "Rahul Verma",
        role: "Design & Outreach",
        image: "/placeholder-user.jpg",
        about: "Handles design and outreach for the event."
      }
    ]
  },
  {
    name: "Cultural and stage committee",
    members: []
  },
  {
    name: "Discipline committee",
    members: []
  },
  {
    name: "Food committee",
    members: []
  },
  {
    name: "Technical committee",
    members: []
  },
  {
    name: "Judging committee",
    members: []
  }
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

        {/* Committees Rendered from Data Structure */}
        <div className="flex flex-col items-center justify-center w-full space-y-16">
          {committees.map((committee, idx) => (
            <div key={committee.name} className="w-full max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold text-primary mb-6 text-center">{committee.name}</h2>
              <div className="flex flex-wrap justify-center gap-8 min-h-[60px]">
                {committee.members.length > 0 ? (
                  committee.members.map((member, i) => (
                    <div
                      key={i}
                      className="relative flex flex-col items-center card-glass group transition-all duration-300 w-80 mx-auto"
                      style={{ overflow: 'visible', zIndex: 10 }}
                    >
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-28 h-28 bg-gradient-to-br from-primary/80 to-secondary/80 rounded-full blur-2xl opacity-40 z-0" />
                      <div className="relative flex flex-col items-center pt-8 mb-2 z-10">
                        <div className="relative w-24 h-24 drop-shadow-xl">
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-xl bg-white"
                          />
                          {member.linkedin && (
                            <a
                              href={member.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="absolute bottom-1 right-1 rounded-full p-1 bg-white/90 hover:bg-blue-100 transition-colors z-20 border border-gray-200 flex items-center justify-center shadow"
                              title="LinkedIn"
                              style={{ width: 32, height: 32 }}
                            >
                              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="12" fill="#0A66C2" />
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.381-1.563 2.844-1.563 3.042 0 3.604 2.003 3.604 4.605v5.591z" fill="#fff"/>
                              </svg>
                            </a>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col items-center px-6 pb-6 pt-2 w-full z-10">
                        <span className="text-xl font-extrabold text-gray-900 text-center truncate w-full" title={member.name}>{member.name}</span>
                        <span className="text-base font-medium text-primary/80 text-center mt-1 mb-2 w-full truncate" title={member.role}>{member.role}</span>
                      </div>
                      {/* About on hover */}
                      <div
                        className="absolute top-0 left-full ml-4 h-full w-64 bg-white/95 border border-gray-200 rounded-2xl shadow-2xl p-5 flex-col justify-center items-start opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 z-[9999] pointer-events-none group-hover:pointer-events-auto flex backdrop-blur-lg"
                        style={{ minHeight: '10rem' }}
                      >
                        <span className="font-semibold text-primary mb-2 text-lg">About</span>
                        <span className="text-gray-700 text-base leading-relaxed">{member.about || "No additional information provided."}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <span className="text-gray-400 italic">To be announced</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    <style jsx global>{`
      .card-glass {
        background: rgba(255,255,255,0.65);
        border-radius: 2rem;
        box-shadow: 0 8px 32px 0 rgba(31,38,135,0.15), 0 1.5px 8px 0 rgba(31,38,135,0.10);
        border: 1.5px solid rgba(255,255,255,0.25);
        backdrop-filter: blur(12px) saturate(1.2);
        transition: box-shadow 0.3s, transform 0.3s, border 0.3s;
        position: relative;
      }
      .card-glass:hover {
        box-shadow: 0 16px 48px 0 rgba(31,38,135,0.22), 0 4px 24px 0 rgba(31,38,135,0.10);
        border: 2px solid #3b82f6;
        transform: translateY(-8px) scale(1.035);
        z-index: 20;
      }
      .card-glass:active {
        transform: scale(0.98);
      }
    `}</style>
    </>
  );
}
