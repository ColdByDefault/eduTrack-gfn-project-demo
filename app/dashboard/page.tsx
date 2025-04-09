import { createServerClient } from "@/lib/supabase-server"
import { TimeTracker } from "@/components/time-tracker"
import { TimeHistory } from "@/components/time-history"

export default async function StudentDashboard() {
  const supabase = createServerClient()

  // Get session
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return null
  }

  // Get user with role
  const { data: userData } = await supabase.from("users").select("*, roles(name)").eq("id", session.user.id).single()

  const user = {
    id: userData.id,
    email: userData.email,
    firstName: userData.first_name,
    lastName: userData.last_name,
    role: userData.roles.name,
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Student Dashboard</h1>
        <p className="text-gray-500">Track your study time and view your progress</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <TimeTracker user={user} />
        <TimeHistory user={user} />
      </div>
    </div>
  )
}
