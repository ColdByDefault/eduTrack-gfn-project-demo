import type React from "react"
import { redirect } from "next/navigation"
import { createServerClient } from "@/lib/supabase-server"
import { Navbar } from "@/components/navbar"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createServerClient()

  // Get session
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/")
  }

  // Get user with role
  const { data: userData } = await supabase.from("users").select("*, roles(name)").eq("id", session.user.id).single()

  if (!userData || userData.roles.name !== "student") {
    redirect("/")
  }

  const user = {
    id: userData.id,
    email: userData.email,
    firstName: userData.first_name,
    lastName: userData.last_name,
    role: userData.roles.name,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} />
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  )
}
