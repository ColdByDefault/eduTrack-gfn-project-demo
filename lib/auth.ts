import { supabase } from "./supabase"
import type { User } from "@/types/user"

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw error
  return data
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export async function getCurrentUser(): Promise<User | null> {
  const {
    data: { session },
  } = await supabase.auth.getSession()
  if (!session) return null

  const { data, error } = await supabase.from("users").select("*, roles(name)").eq("id", session.user.id).single()

  if (error || !data) return null

  return {
    id: data.id,
    email: data.email,
    firstName: data.first_name,
    lastName: data.last_name,
    role: data.roles.name,
  }
}