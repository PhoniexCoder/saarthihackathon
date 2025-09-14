"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import Header from "@/components/ui/header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trophy, Medal, Award, Star, Users, Calendar, ExternalLink } from "lucide-react"
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
		team: "Team Alpha",
		position: 1,
		project: "Accessible Navigation App",
		members: ["Priya Singh", "Rahul Verma"],
		photo: "/placeholder-logo.png",
	},
	{
		team: "Team Beta",
		position: 2,
		project: "Sign Language Translator",
		members: ["A. Sharma", "R. Kumar"],
		photo: "/placeholder-logo.png",
	},
	{
		team: "Team Gamma",
		position: 3,
		project: "Braille e-Reader",
		members: ["Sneha Patel", "Vikram Joshi"],
		photo: "/placeholder-logo.png",
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
				<div className="container mx-auto px-4 py-16 bg-white/40 backdrop-blur-md rounded-3xl shadow-xl">
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
						<div className="flex items-center justify-center space-x-2 mt-4 text-muted-foreground">
							<Calendar className="h-5 w-5" />
							<span>Results declared on 9 Nov 2025</span>
						</div>
					</motion.div>

					{/* Winners Grid */}
					{/*
					<motion.div
						className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
						variants={containerVariants}
						initial="hidden"
						animate="visible"
					>
						{staticResults.map((result, index) => (
							<motion.div key={index} variants={itemVariants}>
								<Card
									className={`relative overflow-hidden border-2 ${
										result.position <= 3 ? "border-primary shadow-lg" : "border-border"
									} hover:shadow-xl transition-all duration-300`}
								>
									<img src={result.photo} alt={result.team + " logo"} className="w-20 h-20 object-contain mx-auto mt-4 rounded-full border" />
									<CardHeader className="pb-4">
										<div className="flex items-center space-x-3 mb-3">
											{getPositionIcon(result.position)}
											<div>
												<CardTitle className="text-xl">{result.team}</CardTitle>
												<CardDescription className="text-sm">{result.project}</CardDescription>
											</div>
										</div>
										<Badge
											className={`w-fit bg-gradient-to-r ${getPositionGradient(result.position)} text-white border-0`}
										>
											{result.position === 1 ? "Winner" : result.position === 2 ? "Runner Up" : `Position #${result.position}`}
										</Badge>
									</CardHeader>
									<CardContent className="space-y-4">
										<div className="flex items-center space-x-2 text-muted-foreground">
											<Users className="h-4 w-4" />
											<span className="text-sm">Members: {result.members.join(", ")}</span>
										</div>
									</CardContent>
								</Card>
							</motion.div>
						))}
					</motion.div>
					*/}

					{/* Congratulations Section */}
					{/*
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
					*/}

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
