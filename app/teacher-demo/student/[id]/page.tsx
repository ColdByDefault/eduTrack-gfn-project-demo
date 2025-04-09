"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function StudentDetailPage() {
  const params = useParams()
  const studentId = params.id as string

  const [student, setStudent] = useState({
    id: studentId,
    firstName: "Jane",
    lastName: "Doe",
    email: "student@example.com",
  })

  const [timeRecords, setTimeRecords] = useState([
    {
      id: 1,
      description: "Math homework",
      startTime: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      endTime: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 2,
      description: "Science project",
      startTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      endTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 90 * 60 * 1000).toISOString(),
    },
    {
      id: 3,
      description: "History essay",
      startTime: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      endTime: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000).toISOString(),
    },
  ])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const calculateDuration = (startTime: string, endTime: string) => {
    const start = new Date(startTime).getTime()
    const end = new Date(endTime).getTime()
    const durationMs = end - start

    const hours = Math.floor(durationMs / (1000 * 60 * 60))
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60))

    return `${hours}h ${minutes}m`
  }

  const calculateTotalTime = () => {
    let totalMs = 0

    timeRecords.forEach((record) => {
      const start = new Date(record.startTime).getTime()
      const end = new Date(record.endTime).getTime()
      totalMs += end - start
    })

    const hours = Math.floor(totalMs / (1000 * 60 * 60))
    const minutes = Math.floor((totalMs % (1000 * 60 * 60)) / (1000 * 60))

    return `${hours} hours ${minutes} minutes`
  }

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
                <Link href="/teacher-demo" className="text-sm font-medium text-gray-500 hover:text-gray-900">
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
            <h1 className="text-2xl font-bold tracking-tight">Student Details</h1>
            <p className="text-gray-500">View detailed information about this student</p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>
                  {student.firstName} {student.lastName}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p>
                    <span className="font-medium">Email:</span> {student.email}
                  </p>
                  <p>
                    <span className="font-medium">Total Time:</span> {calculateTotalTime()}
                  </p>
                  <p>
                    <span className="font-medium">Sessions:</span> {timeRecords.length}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Time Records</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {timeRecords.map((record) => (
                    <div key={record.id} className="border-b pb-4 last:border-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{record.description}</h3>
                          <p className="text-sm text-gray-500">
                            {formatDate(record.startTime)} • {formatTime(record.startTime)} -{" "}
                            {formatTime(record.endTime)}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="font-medium">{calculateDuration(record.startTime, record.endTime)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
