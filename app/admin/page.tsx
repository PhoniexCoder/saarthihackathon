import { Suspense } from "react"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { AdminDashboard } from "@/components/admin/admin-dashboard"

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-background">
      <Suspense
        fallback={<div className="flex items-center justify-center min-h-screen">Loading admin panel...</div>}
      >
        <ProtectedRoute requireAdmin>
          <AdminDashboard />
        </ProtectedRoute>
      </Suspense>
    </div>
  )
}
