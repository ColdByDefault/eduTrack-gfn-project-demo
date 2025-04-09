import { createServerClient } from "@/lib/supabase-server"
import { StudentList } from "@/components/student-list"

export default async function TeacherDashboard() {
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
        <h1 className="text-2xl font-bold tracking-tight">Teacher Dashboard</h1>
        <p className="text-gray-500">Monitor your students' progress and time tracking</p>
      </div>

      <div className="grid gap-6">
        <StudentList user={user} />
      </div>
    </div>
  )
}
