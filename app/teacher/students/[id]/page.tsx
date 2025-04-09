import { createServerClient } from "@/lib/supabase-server"
import { StudentDetail } from "@/components/student-detail"

export default async function StudentDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const supabase = createServerClient()

  // Get session
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return null
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Student Details</h1>
        <p className="text-gray-500">View detailed information about this student</p>
      </div>

      <StudentDetail studentId={params.id} />
    </div>
  )
}
