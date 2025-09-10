import { Suspense } from "react"
import { ResultsDisplay } from "@/components/results/results-display"

export default function ResultsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p>Loading results...</p>
            </div>
          </div>
        }
      >
        <ResultsDisplay />
      </Suspense>
    </div>
  )
}
