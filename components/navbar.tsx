"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import type { User } from "@/types/user"
import { Button } from "@/components/ui/button"
import { signOut } from "@/lib/auth"
import { useRouter } from "next/navigation"

interface NavbarProps {
  user: User
}

export function Navbar({ user }: NavbarProps) {
  const pathname = usePathname()
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut()
    router.push("/")
  }

  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href={user.role === "student" ? "/dashboard" : "/teacher"} className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-emerald-600"
              >
                <path d="M22 12A10 10 0 1 1 12 2a10 10 0 0 1 10 10Z" />
                <path d="M15 9h-6v6h6V9Z" />
              </svg>
              <span className="text-xl font-bold">EduTrack</span>
            </Link>

            <nav className="ml-10 flex items-center space-x-4">
              {user.role === "student" ? (
                <>
                  <Link
                    href="/dashboard"
                    className={`text-sm font-medium ${pathname === "/dashboard" ? "text-emerald-600" : "text-gray-500 hover:text-gray-900"}`}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/dashboard/history"
                    className={`text-sm font-medium ${pathname === "/dashboard/history" ? "text-emerald-600" : "text-gray-500 hover:text-gray-900"}`}
                  >
                    History
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/teacher"
                    className={`text-sm font-medium ${pathname === "/teacher" ? "text-emerald-600" : "text-gray-500 hover:text-gray-900"}`}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/teacher/students"
                    className={`text-sm font-medium ${pathname === "/teacher/students" ? "text-emerald-600" : "text-gray-500 hover:text-gray-900"}`}
                  >
                    Students
                  </Link>
                </>
              )}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-sm">
              <span className="text-gray-500">Signed in as </span>
              <span className="font-medium text-gray-900">
                {user.firstName} {user.lastName}
              </span>
            </div>
            <Button variant="outline" onClick={handleSignOut}>
              Sign out
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
