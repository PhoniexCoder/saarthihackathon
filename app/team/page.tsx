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
        role: "Head of Department",
        image: "./as.jpg",
        linkedin: "https://www.linkedin.com/in/prof-dr-anupam-singh-1a26021a/",
        about: "Convener and Head of Department of CSE and SOC for Saarthi Hackathon. Passionate about technology and innovation in education."
      }
    ]
  },
  {
    name: "Organizing Committee",
    members: [
      { name: "Dr. Chandradeep Bhatt", role: "Faculty Coordinator", image: "/cd_sir.jpg",linkedin:"https://www.linkedin.com/in/dr-chandradeep-bhatt-8b64a2b0/", about: "Organizing committee member with expertise in event management." },
      { name: "Dr. Luxmi Sapra", role: "Faculty Coordinator", image: "/placeholder-user.jpg", about: "Organizing committee member and academic leader." },
      { name: "Dr. Himani", role: "Faculty Coordinator", image: "/placeholder-user.jpg", about: "Organizing committee member and mentor." },
      { name: "Mr. Sushant Chamoli", role: "Faculty Coordinator", image: "/SC.jpg", about: "Organizing committee member and operations specialist." }
    ]
  },
  {
    name: "Student Committee",
    members: [
      { name: "Anshul Panwar", role: "Student Member", image: "/AP.jpg", linkedin: "https://www.linkedin.com/in/anshulpanwar", about: "Lead organizer coordinating all student activities." },
      { name: "Srishti Rana", role: "Student Member", image: "/SR.jpg", linkedin: "https://www.linkedin.com/in/srishti-rana-ab4641305/", about: "B.Tech CSE (AI-DS) | AI and Data Science Practitioner" },
      { name: "Prins Kanyal", role: "Student Member", image: "/placeholder-user.jpg", linkedin: "https://www.linkedin.com/in/catherinelee", about: "Handling sponsorships and partnerships." },
      { name: "Priyanshu", role: "Student Member", image: "/placeholder-user.jpg", linkedin: "https://www.linkedin.com/in/davidkim", about: "Overseeing marketing and promotions." }
    ]
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
              <div
                className={
                  ["Organizing Committee", "Student Committee"].includes(committee.name)
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 min-h-[60px]"
                    : "flex flex-wrap justify-center gap-8 min-h-[60px]"
                }
              >
                {committee.members.length > 0 ? (
                  committee.members.map((member, i) => {
                    return (
                      <div
                        key={i}
                        className="group w-80 mx-auto relative card-glass transition-all duration-300 overflow-hidden"
                        style={{ zIndex: 10, minHeight: '20rem' }}
                      >
                        <div className="flex flex-col items-center w-full">
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
                            <span className="text-xl font-extrabold text-gray-900 text-center w-full break-words" title={member.name}>{member.name}</span>
                            <span className="text-base font-medium text-primary/80 text-center mt-1 mb-2 w-full break-words" title={member.role}>{member.role}</span>
                          </div>
                        </div>
                        {/* About Section: Expand inside card on hover only */}
                        <div className="about-expand max-h-0 opacity-0 group-hover:max-h-60 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto overflow-hidden transition-all duration-500 bg-white/95 rounded-b-2xl shadow-2xl backdrop-blur-lg px-6 py-4 flex flex-col items-center mt-0">
                          <span className="font-semibold text-primary mb-2 text-lg">About</span>
                          <span className="text-gray-700 text-base leading-relaxed text-center">{member.about || "No additional information provided."}</span>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <span className="text-gray-400 italic">To be announced</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>

    </>
  );
}
