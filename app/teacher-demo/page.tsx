"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TeacherDashboard() {
  const [students, setStudents] = useState([
    {
      id: "00000000-0000-0000-0000-000000000002",
      firstName: "Jane",
      lastName: "Doe",
      email: "student@example.com",
    },
    {
      id: "00000000-0000-0000-0000-000000000003",
      firstName: "John",
      lastName: "Smith",
      email: "john.smith@example.com",
    },
    {
      id: "00000000-0000-0000-0000-000000000004",
      firstName: "Emily",
      lastName: "Johnson",
      email: "emily.j@example.com",
    },
  ])

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link href="/teacher-demo" className="flex items-center gap-2">
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
                <Link href="/teacher-demo" className="text-sm font-medium text-emerald-600">
                  Dashboard
                </Link>
                <Link href="/teacher-demo" className="text-sm font-medium text-gray-500 hover:text-gray-900">
                  Students
                </Link>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-sm">
                <span className="text-gray-500">Signed in as </span>
                <span className="font-medium text-gray-900">John Smith</span>
              </div>
              <Button variant="outline" onClick={() => (window.location.href = "/")}>
                Sign out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Teacher Dashboard</h1>
            <p className="text-gray-500">Monitor your students' progress and time tracking</p>
          </div>

          <Card className="w-full">
            <CardHeader>
              <CardTitle>Your Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {students.map((student) => (
                  <div key={student.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                    <div>
                      <h3 className="font-medium">
                        {student.firstName} {student.lastName}
                      </h3>
                      <p className="text-sm text-gray-500">{student.email}</p>
                    </div>
                    <Link
                      href={`/teacher-demo/student/${student.id}`}
                      className="text-sm font-medium text-emerald-600 hover:text-emerald-700"
                    >
                      View Details
                    </Link>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
