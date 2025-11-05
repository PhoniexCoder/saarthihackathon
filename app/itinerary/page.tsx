"use client";

import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import { Calendar, MapPin, Clock, Users, Mic, Coffee, Code, Award, Moon, Sunrise, Utensils, FileCheck, Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ItineraryPage() {
  const days = [
    {
      title: "Day 1",
      date: "8th November 2025 (Saturday)",
      color: "from-blue-600 to-cyan-500",
      icon: <Sunrise className="w-6 h-6" />,
      entries: [
        { time: "07:00 AM – 08:30 AM", title: "Arrival of Participants", icon: <Users className="w-5 h-5" /> },
        { time: "08:30 AM – 09:30 AM", title: "Registration & Kit Distribution", icon: <FileCheck className="w-5 h-5" /> },
        { time: "09:30 AM – 10:00 AM", title: "Reallocation to Prof. K.P. Nautiyal Auditorium", icon: <MapPin className="w-5 h-5" /> },
        { 
          time: "10:00 AM – 12:00 PM", 
          title: "Opening Ceremony – Inaugural Address & Orientation",
          icon: <Mic className="w-5 h-5" />,
          subItems: [
            "Guest Arrival",
            "Welcome Address & Bouquet Presentation",
            "Lamp Lighting & Saraswati Vandana",
            "Speech by Hon'ble Vice Chancellor",
            "Presentation: About Uttarakhand",
            "Musical Performance by Team Nandas",
            "Address by HoD, CSE & Glimpses of Previous Hackathon"
          ]
        },
        { time: "12:00 PM – 01:30 PM", title: "Hackathon Commences (Round 0)", icon: <Code className="w-5 h-5" />, highlight: true },
        { time: "01:30 PM – 02:30 PM", title: "Lunch Break", icon: <Utensils className="w-5 h-5" /> },
        { time: "02:30 PM – 04:30 PM", title: "Hackathon Continues", icon: <Code className="w-5 h-5" /> },
        { time: "04:30 PM – 05:00 PM", title: "Tea Break", icon: <Coffee className="w-5 h-5" /> },
        { time: "05:00 PM – 06:00 PM", title: "Coding Continues", icon: <Code className="w-5 h-5" /> },
        { time: "06:00 PM – 09:00 PM", title: "Round 1 – Mid Evaluation", icon: <Award className="w-5 h-5" />, highlight: true },
        { time: "08:30 PM – 10:00 PM", title: "Dinner & Networking", icon: <Utensils className="w-5 h-5" /> },
        { time: "10:00 PM Onwards", title: "Overnight Hacking", icon: <Moon className="w-5 h-5" />, highlight: true },
      ],
    },
    {
      title: "Day 2",
      date: "9th November 2025 (Sunday)",
      color: "from-purple-600 to-pink-500",
      icon: <Moon className="w-6 h-6" />,
      entries: [
        { time: "10:00 PM (8th Nov) – 02:00 AM", title: "Overnight Hacking (continued)", icon: <Moon className="w-5 h-5" /> },
        { time: "02:00 AM – 06:30 AM", title: "Round 2 – Prototype Evaluation", icon: <Award className="w-5 h-5" />, highlight: true },
        { time: "06:30 AM – 07:00 AM", title: "Reallocation to Hostels", icon: <MapPin className="w-5 h-5" /> },
        { time: "07:00 AM – 08:00 AM", title: "Freshen Up & Rest", icon: <Clock className="w-5 h-5" /> },
        { time: "08:00 AM – 08:30 AM", title: "Reallocation to GEHU Campus", icon: <MapPin className="w-5 h-5" /> },
        { time: "08:30 AM – 09:30 AM", title: "Breakfast / Refreshments", icon: <Coffee className="w-5 h-5" /> },
        { time: "09:30 AM – 10:30 AM", title: "Final Development & Submission Phase", icon: <FileCheck className="w-5 h-5" />, highlight: true },
        { time: "10:30 AM – 12:00 PM", title: "Final Evaluation", icon: <Award className="w-5 h-5" />, highlight: true },
        { 
          time: "12:00 PM – 02:00 PM", 
          title: "Closing and Award Ceremony",
          icon: <Trophy className="w-5 h-5" />,
          highlight: true,
          subItems: [
            "Arrival of Dignitaries",
            "Valediction Sessions",
            "Chief Guest Address",
            "Cultural Performance",
            "Result Announcements & Prize Distribution",
            "Vote of Thanks"
          ]
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Page Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <Badge className="px-4 py-2 text-sm bg-gradient-to-r from-blue-600 to-purple-600 border-0">
              ⚡ SAARTHI'25
            </Badge>
          </div>
          <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Event Itinerary
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            24 hours of innovation, coding, and collaboration
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Badge variant="outline" className="px-5 py-2.5 text-base border-2">
              <Calendar className="w-4 h-4 mr-2" />
              8th - 9th November 2025
            </Badge>
            <Badge variant="outline" className="px-5 py-2.5 text-base border-2">
              <MapPin className="w-4 h-4 mr-2" />
              GEHU, Dehradun
            </Badge>
          </div>
        </div>

        {/* Days Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {days.map((day, dayIdx) => (
            <Card key={dayIdx} className="shadow-xl border-2 hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
              <CardHeader className={`bg-gradient-to-r ${day.color} text-white py-6`}>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {day.icon}
                    <div>
                      <div className="text-2xl font-bold">{day.title}</div>
                      <div className="text-sm opacity-90 font-normal">{day.date}</div>
                    </div>
                  </div>
                  <Clock className="w-6 h-6 opacity-80" />
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 bg-white">
                <div className="space-y-3">
                  {day.entries.map((entry, idx) => (
                    <div 
                      key={idx} 
                      className={`
                        border-l-4 pl-4 py-3 rounded-r-lg transition-all duration-200
                        ${entry.highlight 
                          ? 'border-primary bg-primary/5 hover:bg-primary/10' 
                          : 'border-gray-300 hover:border-primary/50 hover:bg-gray-50'
                        }
                      `}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`mt-0.5 ${entry.highlight ? 'text-primary' : 'text-gray-500'}`}>
                          {entry.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <span className={`text-xs font-bold px-2 py-1 rounded ${
                              entry.highlight 
                                ? 'bg-primary text-white' 
                                : 'bg-gray-200 text-gray-700'
                            }`}>
                              {entry.time}
                            </span>
                            {entry.highlight && (
                              <Badge className="text-xs bg-amber-500 border-0">Key Event</Badge>
                            )}
                          </div>
                          <h4 className="font-semibold text-base">{entry.title}</h4>
                          {entry.subItems && (
                            <ul className="ml-0 mt-2 space-y-1 bg-gray-50 p-3 rounded">
                              {entry.subItems.map((sub, subIdx) => (
                                <li key={subIdx} className="text-xs text-muted-foreground flex items-start gap-2">
                                  <span className="text-primary mt-0.5">▸</span>
                                  <span>{sub}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <a
              href="/"
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold hover:shadow-xl hover:scale-105 transition-all text-lg"
            >
              ← Back to Home
            </a>
            <a
              href="/guidelines"
              className="px-8 py-4 rounded-xl bg-white border-2 border-primary text-primary font-bold hover:bg-primary hover:text-white hover:shadow-xl hover:scale-105 transition-all text-lg"
            >
              View Guidelines →
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}