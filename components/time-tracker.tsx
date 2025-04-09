"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { supabase } from "@/lib/supabase"
import type { User } from "@/types/user"

interface TimeTrackerProps {
  user: User
}

export function TimeTracker({ user }: TimeTrackerProps) {
  const [isTracking, setIsTracking] = useState(false)
  const [startTime, setStartTime] = useState<Date | null>(null)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [description, setDescription] = useState("")
  const [activeSession, setActiveSession] = useState<any>(null)

  // Check for active session on load
  useEffect(() => {
    const checkActiveSession = async () => {
      const { data, error } = await supabase
        .from("time_records")
        .select("*")
        .eq("user_id", user.id)
        .is("end_time", null)
        .order("start_time", { ascending: false })
        .limit(1)
        .single()

      if (data && !error) {
        setActiveSession(data)
        setIsTracking(true)
        setStartTime(new Date(data.start_time))
        setDescription(data.description || "")
      }
    }

    checkActiveSession()
  }, [user.id])

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

  const handleStartTracking = async () => {
    const now = new Date()
    setStartTime(now)
    setIsTracking(true)
    setElapsedTime(0)

    const { data, error } = await supabase
      .from("time_records")
      .insert({
        user_id: user.id,
        start_time: now.toISOString(),
        description: description || null,
      })
      .select()
      .single()

    if (error) {
      console.error("Error starting time tracking:", error)
      return
    }

    setActiveSession(data)
  }

  const handleStopTracking = async () => {
    if (!activeSession) return

    const now = new Date()

    const { error } = await supabase
      .from("time_records")
      .update({
        end_time: now.toISOString(),
      })
      .eq("id", activeSession.id)

    if (error) {
      console.error("Error stopping time tracking:", error)
      return
    }

    setIsTracking(false)
    setStartTime(null)
    setActiveSession(null)
    setDescription("")
  }

  return (
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
  )
}
