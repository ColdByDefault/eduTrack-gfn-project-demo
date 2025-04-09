"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { supabase } from "@/lib/supabase"
import type { User, TimeRecord } from "@/types/user"

interface TimeHistoryProps {
  user: User
}

export function TimeHistory({ user }: TimeHistoryProps) {
  const [timeRecords, setTimeRecords] = useState<TimeRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchTimeRecords = async () => {
      setIsLoading(true)

      const { data, error } = await supabase
        .from("time_records")
        .select("*")
        .eq("user_id", user.id)
        .is("end_time", "not.null")
        .order("start_time", { ascending: false })
        .limit(10)

      if (error) {
        console.error("Error fetching time records:", error)
        return
      }

      setTimeRecords(data as TimeRecord[])
      setIsLoading(false)
    }

    fetchTimeRecords()
  }, [user.id])

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

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="text-center py-4">Loading...</div>
        ) : timeRecords.length === 0 ? (
          <div className="text-center py-4 text-gray-500">No time records found</div>
        ) : (
          <div className="space-y-4">
            {timeRecords.map((record) => (
              <div key={record.id} className="border-b pb-4 last:border-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{record.description || "Untitled Session"}</h3>
                    <p className="text-sm text-gray-500">
                      {formatDate(record.startTime)} • {formatTime(record.startTime)} - {formatTime(record.endTime!)}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-medium">{calculateDuration(record.startTime, record.endTime!)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
