"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import Header from "@/components/ui/header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Trophy,
  Medal,
  Award,
  Star,
  Users,
  Calendar,
  ExternalLink,
  CheckCircle2,
  Mail,
  Wallet,
  Clock,
  ListChecks,
} from "lucide-react"
import { motion } from "framer-motion"

// Animated background elements (blobs, SVGs)
function BackgroundElements() {
	return (
		<div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
			{/* Blurred gradient blobs */}
			<div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 opacity-30 rounded-full blur-3xl animate-pulse-slow" />
			<div className="absolute bottom-[-10%] right-[-10%] w-[350px] h-[350px] bg-gradient-to-tr from-purple-300 via-blue-200 to-cyan-300 opacity-20 rounded-full blur-2xl animate-pulse-slower" />
			{/* SVG tech lines */}
			<svg className="absolute left-1/4 top-0 w-2/3 h-40 opacity-20" viewBox="0 0 600 100" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M0 80 Q150 20 300 80 T600 80" stroke="#7C3AED" strokeWidth="4" fill="none" />
				<circle cx="300" cy="80" r="8" fill="#2563EB" />
			</svg>
			<svg className="absolute right-0 bottom-0 w-1/2 h-32 opacity-10" viewBox="0 0 400 80" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M0 40 Q100 0 200 40 T400 40" stroke="#0EA5E9" strokeWidth="3" fill="none" />
			</svg>
		</div>
	);
}

const staticResults = [
	{
		team: "ABS",
		position: 1,
		members: ["Bhavya Agarwal", "Anushka Negi", "Saurabh singh", "Ayushman chauhan"],
		college: "Graphic Era Hill University",
		photo: "/ABS.jpg",
	},
	{
		team: "ORBIS",
		position: 2,
		members: ["Subhranshu Mohanty", "Ayush Duttatreya Panigrahi", "Debjeet Ghosh"],
		college: "Birla Global University, Bhimtal",
		photo: "/ORBIS.jpg",
	},
	{
		team: "NUERONAV",
		position: 3,
		members: ["Shubham Gangari", "Saurabh Kaintura", "Anshika Bijalwan", "Ashish Gond"],
		college: "Swami Rama Himalayan University",
		photo: "/neuro.jpg",
	},
	{
		team: "TECHNITI 6.0",
		position: 4,
		members: ["Sarthak Pundit", "Saksham Godryal", "Suraj Singh Bhandari"],
		college: "Graphic Era Hill University",
		photo: "/Techniti.jpg",
		specialAward: "Most Inclusive Tech Solution",
		
	},
	{
		team: "THE ENDURANCE",
		position: 5,
		members: ["Anuj Mishra", "Gauri Shankar", "kunal", "Akshat Gupta"],
		college: "The Institute of Chartered Financial Analysts of India University, Dehradun",
		photo: "/T202.jpg",
		specialAward: "Most Sustainable Assistive Idea",
	},
	{
		team: "AgroCode",
		position: 6,
		members: ["Vivek Bartwal", "Manavata Joshi", "Vidish Bijalwan", "Akshay Rana"],
		college: "Graphic Era Hill University",
		photo: "/agrocode.jpg",
		specialAward: "Best Startup Idea",
	},
];

export function ResultsDisplay() {
	// Helper functions and animation variants
	const getPositionIcon = (position: number) => {
		switch (position) {
			case 1:
				return <Trophy className="h-8 w-8 text-yellow-500" />
			case 2:
				return <Medal className="h-8 w-8 text-gray-400" />
			case 3:
				return <Award className="h-8 w-8 text-amber-600" />
			case 4:
				return <Star className="h-8 w-8 text-green-500" />
			case 5:
				return <Star className="h-8 w-8 text-emerald-500" />
			case 6:
				return <Star className="h-8 w-8 text-cyan-500" />
			default:
				return <Star className="h-8 w-8 text-blue-500" />
		}
	}
	const getPositionGradient = (position: number) => {
		switch (position) {
			case 1:
				return "from-yellow-400 to-yellow-600"
			case 2:
				return "from-gray-300 to-gray-500"
			case 3:
				return "from-amber-400 to-amber-600"
			case 4:
				return "from-green-400 to-green-600"
			case 5:
				return "from-emerald-400 to-emerald-600"
			case 6:
				return "from-cyan-400 to-cyan-600"
			default:
				return "from-blue-400 to-blue-600"
		}
	}
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
			},
		},
	}
	const itemVariants = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: {
				duration: 0.5,
			},
		},
	}
	return (
		<>
			<Header />
			<BackgroundElements />
			<div className="min-h-screen">
				<div className="container mx-auto px-4 py-24 bg-white/40 backdrop-blur-md rounded-3xl shadow-xl">
					{/* Header */}
					<motion.div
						className="text-center mb-16"
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
					>
						<div className="mb-8 text-center">
							<h1
								className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent drop-shadow-lg mb-2"
								style={{ letterSpacing: '0.03em' }}
							>
								SAARTHI'25 Results
							</h1>
							<div className="mx-auto w-32 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full opacity-70" />
						</div>
						<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
							Celebrating innovation in accessibility technology and inclusive design
						</p>
						<div className="flex flex-col items-center justify-center gap-2 mt-4 text-muted-foreground">
							<div className="flex items-center space-x-2">
								<Calendar className="h-5 w-5" />
								<span>Round 1 Results announced on <span className="font-semibold text-primary">17 Oct 2025</span></span>
							</div>
							<div className="flex items-center space-x-2">
								<Calendar className="h-5 w-5" />
								<span>Final Results declared on <span className="font-semibold text-pink-600">9 Nov 2025</span></span>
							</div>
						</div>
					</motion.div>

					{/* Status & Next Steps */}
					<motion.section
						className="mb-12"
						initial={{ opacity: 0, y: 12 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
					>
						<div className="relative overflow-hidden rounded-2xl border bg-white/90 dark:bg-white/10 shadow-md p-6 md:p-8">
							<div className="absolute inset-0 -z-10 opacity-30 bg-gradient-to-r from-green-200 via-blue-200 to-pink-200 blur-3xl" />
							<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
								<div className="flex items-center gap-3">
									<span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-green-100 text-green-700">
										<CheckCircle2 className="h-6 w-6" />
									</span>
									<div>
										<p className="text-sm uppercase tracking-wider text-green-700 font-semibold">Status</p>
										<h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
											PPT Round Submissions Reviewed
										</h3>
									</div>
								</div>
								<Badge className="w-fit bg-green-600 text-white hover:bg-green-600/90">
									✅ All PPTs Reviewed
								</Badge>
							</div>

							<div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
								{/* Shortlisted Teams */}
								<div className="rounded-xl border bg-white/80 dark:bg-white/5 p-4 md:p-5">
									<div className="flex items-center gap-2 mb-2">
										<Mail className="h-5 w-5 text-blue-600" />
										<h4 className="font-semibold">Shortlisted Teams</h4>
									</div>
									<p className="text-sm text-muted-foreground">
										Emails have been sent to all shortlisted teams. Please check your inbox (and spam) for confirmation and next steps.
									</p>
								</div>

								{/* Participation Fee */}
								<div className="rounded-xl border bg-white/80 dark:bg-white/5 p-4 md:p-5">
									<div className="flex items-center gap-2 mb-2">
										<Wallet className="h-5 w-5 text-rose-600" />
										<h4 className="font-semibold">Participation Fee</h4>
									</div>
									<p className="text-sm text-muted-foreground">
										Complete the <span className="font-semibold">₹600</span> registration fee to confirm your spot.
									</p>
									<div className="mt-2 inline-flex items-center gap-2 rounded-full bg-rose-50 text-rose-700 border border-rose-200 px-3 py-1 text-xs font-semibold">
										<Clock className="h-4 w-4" />
										Deadline: 22 Oct 2025
									</div>
								</div>

								{/* Waiting List Policy */}
								<div className="rounded-xl border bg-white/80 dark:bg-white/5 p-4 md:p-5">
									<div className="flex items-center gap-2 mb-2">
										<ListChecks className="h-5 w-5 text-purple-600" />
										<h4 className="font-semibold">Waiting List Policy</h4>
									</div>
									<p className="text-sm text-muted-foreground">
										If a shortlisted team misses the payment deadline, we’ll invite teams from the waiting list to participate.
									</p>
								</div>
							</div>
						</div>
					</motion.section>

					{/* Winners Grid */}
					
					<motion.div
						className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
						variants={containerVariants}
						initial="hidden"
						animate="visible"
					>
						{staticResults.map((result, index) => (
							<motion.div 
								key={index} 
								variants={itemVariants}
								whileHover={{ scale: 1.02 }}
								transition={{ duration: 0.3 }}
							>
								<Card className="relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white h-full">
									{/* Position Badge - Top Corner */}
									<div className="absolute top-4 left-4 z-20">
										<div className={`flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br ${getPositionGradient(result.position)} shadow-lg`}>
											{getPositionIcon(result.position)}
										</div>
									</div>
									
									{/* Team Image */}
									<div className="relative h-56 overflow-hidden">
										<img 
											src={result.photo} 
											alt={result.team} 
											className="w-full h-full object-cover"
										/>
										<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
										
										{/* Team Name Overlay */}
										<div className="absolute bottom-0 left-0 right-0 p-4">
											<h3 className="text-2xl font-bold text-white drop-shadow-lg">{result.team}</h3>
											<p className="text-sm text-white/90 mt-1">{result.project}</p>
										</div>
									</div>
									
									{/* Card Content */}
									<div className="p-2 space-y-4">
										{/* Award Badge */}
										<div className="flex items-center justify-center">
											<Badge className={`bg-gradient-to-r ${getPositionGradient(result.position)} text-white border-0 px-4 py-1.5 text-sm font-semibold`}>
												{result.position === 1 
													? "🏆 Winner" 
													: result.position === 2 
													? "🥈 Runner Up" 
													: result.position === 3 
													? "🥉 Second Runner Up"
													: 'specialAward' in result 
													? result.specialAward 
													: `Position #${result.position}`}
											</Badge>
										</div>
										
										{/* Members */}
										<div className="space-y-2">
											<div className="flex items-center gap-2 text-gray-700">
												<Users className="h-4 w-4" />
												<span className="text-xs font-semibold uppercase tracking-wide">Team Members</span>
											</div>
											<div className="text-sm text-gray-600 leading-relaxed">
												{result.members.join(", ")}
											</div>
										</div>
										
										{/* College */}
										<div className="pt-3 border-t border-gray-100">
											<div className="flex items-center gap-2 text-gray-700">
												<Calendar className="h-4 w-4" />
												<span className="text-sm font-medium">{result.college}</span>
											</div>
										</div>
									</div>
								</Card>
							</motion.div>
						))}
					</motion.div>

					{/* Congratulations Section */}
					<motion.div
						className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white"
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.6, delay: 0.8 }}
					>
						<Trophy className="h-16 w-16 mx-auto mb-4 text-yellow-300" />
						<h2 className="text-3xl font-bold mb-4">Congratulations to All Participants!</h2>
						<p className="text-lg opacity-90 max-w-2xl mx-auto">
							Thank you for your incredible innovations in accessibility technology. Your projects are making the world
							more inclusive and accessible for everyone.
						</p>
					</motion.div>
					

					{/* Footer */}
					<motion.div
						className="text-center mt-16 text-muted-foreground"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.6, delay: 1 }}
					>
						<p>SAARTHI 2025 - Empowering Innovation in Accessibility</p>
					</motion.div>
				</div>
			</div>
		</>
	)
}
