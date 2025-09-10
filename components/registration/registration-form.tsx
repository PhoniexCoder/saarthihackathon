"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useAuth } from "@/contexts/auth-context"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, User, GraduationCap, Phone, AlertTriangle, Wifi, WifiOff } from "lucide-react"
import { checkNetworkConnectivity, retryWithBackoff } from "@/lib/firebase-utils"

interface RegistrationData {
  // Personal Details
  fullName: string
  phone: string
  gender: string
  age: string

  // Academic Details
  university: string
  degree: string
  yearOfStudy: string
  department: string

  // Emergency Contact
  emergencyContactName: string
  emergencyContactPhone: string

  // Declarations
  agreeRules: boolean
  consentMedia: boolean
  consentData: boolean
}

export function RegistrationForm() {
  const { user, userProfile, loading: authLoading, reloadUserProfile } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [currentStep, setCurrentStep] = useState(1)
  const [isOnline, setIsOnline] = useState(true)

  const [formData, setFormData] = useState<RegistrationData>({
    fullName: userProfile?.fullName || "",
    phone: userProfile?.phone || "",
    gender: "",
    age: "",
    university: userProfile?.university || "",
    degree: "",
    yearOfStudy: "",
    department: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    agreeRules: false,
    consentMedia: false,
    consentData: false,
  })

  // Check online status
  useEffect(() => {
    const checkOnlineStatus = async () => {
      const online = await checkNetworkConnectivity()
      setIsOnline(online)
    }

    const onlineHandler = () => checkOnlineStatus()
    const offlineHandler = () => setIsOnline(false)

    window.addEventListener('online', onlineHandler)
    window.addEventListener('offline', offlineHandler)
    checkOnlineStatus()

    return () => {
      window.removeEventListener('online', onlineHandler)
      window.removeEventListener('offline', offlineHandler)
    }
  }, [])

  // Prevent interaction if authentication is still loading
  useEffect(() => {
    if (authLoading) {
      setLoading(true)
    } else {
      setLoading(false)
    }
  }, [authLoading])

  const updateFormData = (field: keyof RegistrationData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const validateStep = (step: number): boolean => {
    // Helper regex
    const nameRegex = /^[A-Za-z ]+$/;
    const phoneRegex = /^\d{10}$/;
    const ageNum = Number(formData.age);
    const yearNum = Number(formData.yearOfStudy);
    // Trim all string fields for validation
    const fullName = formData.fullName.trim();
    const phone = formData.phone.trim();
    const gender = formData.gender.trim();
    const university = formData.university.trim();
    const degree = formData.degree.trim();
    const yearOfStudy = formData.yearOfStudy.trim();
    const department = formData.department.trim();
    const emergencyContactName = formData.emergencyContactName.trim();
    const emergencyContactPhone = formData.emergencyContactPhone.trim();

    switch (step) {
      case 1:
        return (
          !!fullName &&
          nameRegex.test(fullName) &&
          !!phone &&
          phoneRegex.test(phone) &&
          !!formData.age &&
          !isNaN(ageNum) &&
          ageNum >= 16 && ageNum <= 100 &&
          !!gender
        );
      case 2:
        return (
          !!university &&
          !!degree &&
          !!yearOfStudy &&
          !isNaN(yearNum) &&
          yearNum >= 1 && yearNum <= 6 &&
          !!department
        );
      case 3:
        return (
          !!emergencyContactName &&
          nameRegex.test(emergencyContactName) &&
          !!emergencyContactPhone &&
          phoneRegex.test(emergencyContactPhone) &&
          emergencyContactPhone !== phone // Emergency contact must be different
        );
      case 4:
        return formData.agreeRules && formData.consentMedia && formData.consentData
      default:
        return false;
    }
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4))
      setError("")
    } else {
      // Custom error messages for each step
      const nameRegex = /^[A-Za-z ]+$/;
      const phoneRegex = /^\d{10}$/;
      const ageNum = Number(formData.age);
      const yearNum = Number(formData.yearOfStudy);
      const fullName = formData.fullName.trim();
      const phone = formData.phone.trim();
      const gender = formData.gender.trim();
      const university = formData.university.trim();
      const degree = formData.degree.trim();
      const yearOfStudy = formData.yearOfStudy.trim();
      const department = formData.department.trim();
      const emergencyContactName = formData.emergencyContactName.trim();
      const emergencyContactPhone = formData.emergencyContactPhone.trim();
      switch (currentStep) {
        case 1:
          if (!fullName || !phone || !formData.age || !gender) {
            setError("Please fill in all required fields before proceeding.");
          } else if (!nameRegex.test(fullName)) {
            setError("Full name must contain only letters and spaces.");
          } else if (!phoneRegex.test(phone)) {
            setError("Phone number must be 10 digits.");
          } else if (isNaN(ageNum) || ageNum < 16 || ageNum > 100) {
            setError("Age must be a number between 16 and 100.");
          } else {
            setError("Invalid data in personal details.");
          }
          break;
        case 2:
          if (!university || !degree || !yearOfStudy || !department) {
            setError("Please fill in all academic details.");
          } else if (isNaN(yearNum) || yearNum < 1 || yearNum > 6) {
            setError("Year of study must be a number between 1 and 6.");
          } else {
            setError("Invalid data in academic details.");
          }
          break;
        case 3:
          if (!emergencyContactName || !emergencyContactPhone) {
            setError("Please fill in all required fields before proceeding.");
          } else if (!nameRegex.test(emergencyContactName)) {
            setError("Emergency contact name must contain only letters and spaces.");
          } else if (!phoneRegex.test(emergencyContactPhone)) {
            setError("Emergency contact phone must be 10 digits.");
          } else if (emergencyContactPhone === phone) {
            setError("Emergency contact phone must be different from your phone number.");
          } else {
            setError("Invalid data in emergency contact.");
          }
          break;
        case 4:
          setError("Please accept all declarations to proceed.");
          break;
        default:
          setError("Please fill in all required fields before proceeding.");
      }
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
    setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Check network connectivity
    const isConnected = await checkNetworkConnectivity()
    if (!isConnected) {
      setError("No internet connection. Please check your network and try again.")
      return
    }

    if (!validateStep(4)) {
      setError("Please complete all required fields and accept the declarations.")
      return
    }

    setLoading(true)
    setError("")

    try {
      if (!user) throw new Error("User not authenticated")

      // Clean undefined values from formData
      const cleanedData = Object.fromEntries(
        Object.entries({
          ...formData,
          age: Number.parseInt(formData.age),
          registrationComplete: true,
          registrationDate: new Date().toISOString(),
          role: "participant",
        }).filter(([_, v]) => v !== undefined)
      )

      // Use retry mechanism for network resilience
      await retryWithBackoff(async () => {
        const { setDoc, doc } = await import("firebase/firestore")
        await setDoc(doc(db, "users", user.uid), cleanedData, { merge: true })
      })

      // Reload user profile to get latest registrationComplete status
      if (typeof reloadUserProfile === 'function') {
        await reloadUserProfile();
      }

      // Redirect to dashboard or success page
      router.push("/dashboard")
    } catch (err: any) {
      console.error("Registration error:", err)
      setError(err.message || "Failed to submit registration. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 },
  }

  const steps = [
    { number: 1, title: "Personal Details", icon: User },
    { number: 2, title: "Academic Details", icon: GraduationCap },
    { number: 3, title: "Emergency Contact", icon: Phone },
    { number: 4, title: "Declarations", icon: AlertTriangle },
  ]

  return (
    <div className="max-w-2xl mx-auto">
      {/* Network Status Alert */}
      {!isOnline && (
        <Alert variant="destructive" className="mb-6">
          <WifiOff className="h-4 w-4" />
          <AlertDescription>
            You are currently offline. Please check your internet connection to complete registration.
          </AlertDescription>
        </Alert>
      )}

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isActive = currentStep === step.number
            const isCompleted = currentStep > step.number

            return (
              <div key={step.number} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                    isCompleted
                      ? "bg-primary border-primary text-primary-foreground"
                      : isActive
                        ? "border-primary text-primary"
                        : "border-muted-foreground text-muted-foreground"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="ml-3 hidden sm:block">
                  <p className={`text-sm font-medium ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-4 ${isCompleted ? "bg-primary" : "bg-muted"}`} />
                )}
              </div>
            )
          })}
        </div>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {React.createElement(steps[currentStep - 1].icon, { className: "w-5 h-5" })}
              {steps[currentStep - 1].title}
            </CardTitle>
            <CardDescription>
              Step {currentStep} of {steps.length}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Step 1: Personal Details */}
            {currentStep === 1 && (
              <motion.div {...fadeInUp} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => updateFormData("fullName", e.target.value)}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" value={user?.email || ""} disabled className="bg-muted" />
                    <p className="text-xs text-muted-foreground mt-1">Email cannot be changed after registration</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone Number (WhatsApp preferred) *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateFormData("phone", e.target.value)}
                      placeholder="+91 9876543210"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="age">Age *</Label>
                    <Input
                      id="age"
                      type="number"
                      min="16"
                      max="35"
                      value={formData.age}
                      onChange={(e) => updateFormData("age", e.target.value)}
                      placeholder="Enter your age"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="gender">Gender / Pronouns (Optional)</Label>
                  <Select value={formData.gender} onValueChange={(value) => updateFormData("gender", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your pronouns" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="he-him">He/Him</SelectItem>
                      <SelectItem value="she-her">She/Her</SelectItem>
                      <SelectItem value="they-them">They/Them</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                      <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </motion.div>
            )}

            {/* Step 2: Academic Details */}
            {currentStep === 2 && (
              <motion.div {...fadeInUp} className="space-y-4">
                <div>
                  <Label htmlFor="university">University / College Name *</Label>
                  <Input
                    id="university"
                    value={formData.university}
                    onChange={(e) => updateFormData("university", e.target.value)}
                    placeholder="Enter your university or college name"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="degree">Degree / Program *</Label>
                    <Select value={formData.degree} onValueChange={(value) => updateFormData("degree", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your degree" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="btech">B.Tech</SelectItem>
                        <SelectItem value="bsc">B.Sc</SelectItem>
                        <SelectItem value="bca">BCA</SelectItem>
                        <SelectItem value="be">B.E</SelectItem>
                        <SelectItem value="mtech">M.Tech</SelectItem>
                        <SelectItem value="msc">M.Sc</SelectItem>
                        <SelectItem value="mca">MCA</SelectItem>
                        <SelectItem value="mba">MBA</SelectItem>
                        <SelectItem value="phd">PhD</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="yearOfStudy">Year of Study *</Label>
                    <Select
                      value={formData.yearOfStudy}
                      onValueChange={(value) => updateFormData("yearOfStudy", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1st">1st Year</SelectItem>
                        <SelectItem value="2nd">2nd Year</SelectItem>
                        <SelectItem value="3rd">3rd Year</SelectItem>
                        <SelectItem value="final">Final Year</SelectItem>
                        <SelectItem value="pg">Postgraduate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="department">Department / Branch *</Label>
                  <Input
                    id="department"
                    value={formData.department}
                    onChange={(e) => updateFormData("department", e.target.value)}
                    placeholder="e.g., Computer Science, Electronics, Mechanical"
                    required
                  />
                </div>
              </motion.div>
            )}

            {/* Step 3: Emergency Contact */}
            {currentStep === 3 && (
              <motion.div {...fadeInUp} className="space-y-4">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Emergency Contact Information</h3>
                  <p className="text-sm text-muted-foreground">
                    Please provide emergency contact details of a family member or guardian who can be reached in case
                    of any emergency during the event.
                  </p>
                </div>

                <div>
                  <Label htmlFor="emergencyContactName">Emergency Contact Name *</Label>
                  <Input
                    id="emergencyContactName"
                    value={formData.emergencyContactName}
                    onChange={(e) => updateFormData("emergencyContactName", e.target.value)}
                    placeholder="Full name of emergency contact"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="emergencyContactPhone">Emergency Contact Phone Number *</Label>
                  <Input
                    id="emergencyContactPhone"
                    type="tel"
                    value={formData.emergencyContactPhone}
                    onChange={(e) => updateFormData("emergencyContactPhone", e.target.value)}
                    placeholder="+91 9876543210"
                    required
                  />
                </div>
              </motion.div>
            )}

            {/* Step 4: Declarations */}
            {currentStep === 4 && (
              <motion.div {...fadeInUp} className="space-y-6">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Terms and Declarations</h3>
                  <p className="text-sm text-muted-foreground">
                    Please read and accept the following declarations to complete your registration.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="agreeRules"
                      checked={formData.agreeRules}
                      onCheckedChange={(checked) => updateFormData("agreeRules", !!checked)}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <Label
                        htmlFor="agreeRules"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Agreement to Hackathon Rules & Code of Conduct *
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        I agree to abide by all hackathon rules, code of conduct, and event guidelines. I understand
                        that violation of these rules may result in disqualification.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="consentMedia"
                      checked={formData.consentMedia}
                      onCheckedChange={(checked) => updateFormData("consentMedia", !!checked)}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <Label
                        htmlFor="consentMedia"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Consent for Media Usage *
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        I consent to the use of my photos, videos, and other media captured during the event for
                        publicity, marketing, and promotional purposes.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="consentData"
                      checked={formData.consentData}
                      onCheckedChange={(checked) => updateFormData("consentData", !!checked)}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <Label
                        htmlFor="consentData"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Data Storage Consent *
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        I consent to the storage and processing of my personal data for event management, communication,
                        and related purposes as per the privacy policy.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <Button 
            type="button" 
            variant="outline" 
            onClick={prevStep} 
            disabled={currentStep === 1 || loading}
          >
            Previous
          </Button>

          {currentStep < 4 ? (
            <Button 
              type="button" 
              onClick={nextStep} 
              disabled={loading || !isOnline}
            >
              Next
            </Button>
          ) : (
            <Button 
              type="submit" 
              disabled={loading || !isOnline}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Complete Registration
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}
