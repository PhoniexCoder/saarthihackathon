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
    name: "Patrons",
    members: [
      {
        name: "Prof. (Dr.) Kamal Ghanshala",
        role: "Founder President Graphic Era Group of Institutions",
        image: "./kg.jpg",
        linkedin: "https://www.linkedin.com/in/kamal-ghanshala"
      },
      {
        name: "Prof. (Dr.) Amit R. Bhatt",
        role: "Vice Chancellor at the Graphic Era Hill University, Dehradun",
        image: "./ab.jpg",
        linkedin: "https://www.linkedin.com/in/dr-amit-bhatt-03019216/"
      }
    ]
  },
  {
    name: "Convener",
    members: [
      {
        name: "Prof. (Dr.)Anupam Singh",
        role: "Head of Department of CSE and SOC, Graphic Era Hill University, Dehradun",
        image: "./as.jpg",
        linkedin: "https://www.linkedin.com/in/prof-dr-anupam-singh-1a26021a/",
        about: "Convener and Head of Department of CSE and SOC, Graphic Era Hill University, Dehradun."
      }
    ]
  },
  {
    name: "Organizing Committee",
    members: [
      { name: "Dr. Chandradeep Bhatt", role: "Faculty Coordinator", image: "/CD_sir.jpg",linkedin:"https://www.linkedin.com/in/dr-chandradeep-bhatt-8b64a2b0/"},
      { name: "Dr. Luxmi Sapra", role: "Faculty Coordinator", image: "/LS.jpg",linkedin:"https://www.linkedin.com/in/dr-luxmi-sapra-b36399168/"},
      { name: "Dr. Himani Maheshwari", role: "Faculty Coordinator", image: "/HM.jpg",linkedin:"https://www.linkedin.com/in/himani-maheshwari-aa64281a"},
      { name: "Mr. Sushant Chamoli", role: "Faculty Coordinator", image: "/SC.jpg",linkedin:"https://www.linkedin.com/in/sushant-chamoli-33a57550/"}
    ]
  },
  {
    name: "Student Committee",
    members: [
      { name: "Anshul Panwar", role: "Student Member", image: "/AP.jpg", linkedin: "https://www.linkedin.com/in/anshul-panwar-21aa3233b/", about: "Attended Graphic Era Hill University." },
      { name: "Srishti Rana", role: "Student Member", image: "/SR.jpg", linkedin: "https://www.linkedin.com/in/srishti-rana-ab4641305/", about: "B.Tech CSE (AI-DS) | AI and Data Science Practitioner" },
      { name: "Prins Kanyal", role: "Student Member", image: "/pk.jpg", linkedin: "https://www.linkedin.com/in/prins-kanyal", about: "Handling sponsorships and partnerships." },
      { name: "Priyanshu Solanki", role: "Student Member", image: "/PS.jpg", linkedin: "https://www.linkedin.com/in/priyanshu-solanki-625b81301", about: "Overseeing marketing and promotions." }
    ]
  }
];

export default function TeamPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-background to-muted/60 pb-20 pt-16">
        {/* Hero Section */}
        <section className="w-full py-10 sm:py-16 bg-gradient-to-r from-primary/80 to-secondary/80 text-center mb-8 sm:mb-12 shadow-lg">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white drop-shadow-lg mb-2">
            Meet the Organizing Team
          </h1>
          <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto">
            The passionate people making Saarthi Hackathon possible.
          </p>
        </section>

        {/* Committees Rendered from Data Structure */}
        <div className="flex flex-col items-center justify-center w-full space-y-10 sm:space-y-16 px-2 sm:px-0">
          {committees.map((committee) => (
            <div key={committee.name} className="w-full max-w-5xl mx-auto">
              <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4 sm:mb-6 text-center">
                {committee.name}
              </h2>
              <div className="w-full flex justify-center">
                <div
                  className={`
                    grid gap-6 sm:gap-8 min-h-[60px] w-full
                    place-items-center
                    ${
                      committee.members.length === 1
                        ? "grid-cols-1"
                        : committee.members.length === 2
                        ? "grid-cols-1 xs:grid-cols-2"
                        : committee.members.length === 3
                        ? "grid-cols-1 xs:grid-cols-2 md:grid-cols-3"
                        : "grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                    }
                  `}
                >
                  {committee.members.length > 0 ? (
                    committee.members.map((member, i) => {
                      const cardMinHeight = "16rem";
                      return (
                        <div
                          key={i}
                          className="group w-72 sm:w-80 mx-auto relative card-glass transition-all duration-300 overflow-hidden"
                          style={{ zIndex: 10, minHeight: cardMinHeight }}
                        >
                          <div className="flex flex-col items-center w-full">
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 sm:w-28 h-24 sm:h-28 bg-gradient-to-br from-primary/80 to-secondary/80 rounded-full blur-2xl opacity-40 z-0" />
                            <div className="relative flex flex-col items-center pt-8 mb-2 z-10">
                              <div className="relative w-20 h-20 sm:w-24 sm:h-24 drop-shadow-xl">
                                <img
                                  src={member.image}
                                  alt={member.name}
                                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-4 border-white shadow-xl bg-white"
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
                            <div className="flex flex-col items-center px-4 sm:px-6 pb-6 pt-2 w-full z-10">
                              <span className="text-lg sm:text-xl font-extrabold text-gray-900 text-center w-full break-words" title={member.name}>{member.name}</span>
                              <span className="text-sm sm:text-base font-medium text-primary/80 text-center mt-1 mb-2 w-full break-words" title={member.role}>{member.role}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <span className="text-gray-400 italic">To be announced</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
