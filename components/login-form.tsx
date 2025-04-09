"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      // For demo purposes, we'll just check the email and redirect
      if (email === "teacher@example.com") {
        // Redirect to teacher dashboard
        router.push("/teacher-demo")
      } else if (email === "student@example.com") {
        // Redirect to student dashboard
        router.push("/student-demo")
      } else {
        // For demo, show credentials hint
        setError("Please use teacher@example.com or student@example.com with any password")
      }
    } catch (err) {
      console.error(err)
      setError("Failed to sign in. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="p-3 text-sm bg-red-50 text-red-600 rounded-md">{error}</div>}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="m@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <Button variant="link" className="p-0 h-auto text-xs">
            Forgot password?
          </Button>
        </div>
        <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="remember" />
        <Label htmlFor="remember" className="text-sm font-normal">
          Remember me
        </Label>
      </div>
      <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={isLoading}>
        {isLoading ? "Logging in..." : "Login"}
      </Button>
      <div className="text-center text-sm">
        <span className="text-gray-500">Don't have an account? </span>
        <Button variant="link" className="p-0 h-auto">
          Contact administrator
        </Button>
      </div>
    </form>
  )
}
