import { createServerClient } from "@/lib/supabase-server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TimeHistory } from "@/components/time-history"

export default async function HistoryPage() {
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
        <h1 className="text-2xl font-bold tracking-tight">Time History</h1>
        <p className="text-gray-500">View your complete time tracking history</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Time Records</CardTitle>
        </CardHeader>
        <CardContent>
          <TimeHistory user={user} />
        </CardContent>
      </Card>
    </div>
  )
}
