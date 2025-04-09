"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function StudentDashboard() {
  const [isTracking, setIsTracking] = useState(false)
  const [startTime, setStartTime] = useState<Date | null>(null)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [description, setDescription] = useState("")
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

  // Update elapsed time
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isTracking && startTime) {
      interval = setInterval(() => {
        const now = new Date()
        const elapsed = Math.floor((now.getTime() - startTime.getTime()) / 1000)
        setElapsedTime(elapsed)
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isTracking, startTime])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleStartTracking = () => {
    const now = new Date()
    setStartTime(now)
    setIsTracking(true)
    setElapsedTime(0)
  }

  const handleStopTracking = () => {
    if (!startTime) return

    const now = new Date()
    setIsTracking(false)

    // Add to time records
    const newRecord = {
      id: timeRecords.length + 1,
      description: description || "Untitled Session",
      startTime: startTime.toISOString(),
      endTime: now.toISOString(),
    }

    setTimeRecords([newRecord, ...timeRecords])
    setStartTime(null)
    setDescription("")
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const formatTimeFromDate = (dateString: string) => {
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

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link href="/student-demo" className="flex items-center gap-2">
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
                <Link href="/student-demo" className="text-sm font-medium text-emerald-600">
                  Dashboard
                </Link>
                <Link href="/student-demo/questions" className="text-sm font-medium text-gray-500 hover:text-gray-900">
                  Questions Pool
                </Link>
                <Link href="/student-demo" className="text-sm font-medium text-gray-500 hover:text-gray-900">
                  History
                </Link>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-sm">
                <span className="text-gray-500">Signed in as </span>
                <span className="font-medium text-gray-900">Jane Doe</span>
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
            <h1 className="text-2xl font-bold tracking-tight">Student Dashboard</h1>
            <p className="text-gray-500">Track your study time and view your progress</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Time Tracker</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-5xl font-mono font-bold mb-4">{formatTime(elapsedTime)}</div>
                  <div className="text-sm text-gray-500">
                    {isTracking ? "Currently tracking time..." : "Ready to start tracking"}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    placeholder="What are you working on?"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    disabled={isTracking}
                  />
                </div>
              </CardContent>
              <CardFooter>
                {isTracking ? (
                  <Button onClick={handleStopTracking} className="w-full bg-red-600 hover:bg-red-700">
                    Stop Tracking
                  </Button>
                ) : (
                  <Button onClick={handleStartTracking} className="w-full bg-emerald-600 hover:bg-emerald-700">
                    Start Tracking
                  </Button>
                )}
              </CardFooter>
            </Card>

            <Card className="w-full">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {timeRecords.map((record) => (
                    <div key={record.id} className="border-b pb-4 last:border-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{record.description}</h3>
                          <p className="text-sm text-gray-500">
                            {formatDate(record.startTime)} • {formatTimeFromDate(record.startTime)} -{" "}
                            {formatTimeFromDate(record.endTime)}
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

          <Card>
            <CardHeader>
              <CardTitle>Study Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Exam Questions Pool</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Practice with sample questions about general PC knowledge
                  </p>
                  <Link href="/student-demo/questions">
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Start Practicing</Button>
                  </Link>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Learning Materials</h3>
                  <p className="text-sm text-gray-500 mb-4">Access course materials and resources</p>
                  <Button className="w-full" variant="outline">
                    Browse Materials
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
