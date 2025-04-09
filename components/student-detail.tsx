"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { supabase } from "@/lib/supabase"
import type { Student, TimeRecord } from "@/types/user"

interface StudentDetailProps {
  studentId: string
}

export function StudentDetail({ studentId }: StudentDetailProps) {
  const [student, setStudent] = useState<Student | null>(null)
  const [timeRecords, setTimeRecords] = useState<TimeRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchStudentData = async () => {
      setIsLoading(true)

      // Fetch student details
      const { data: studentData, error: studentError } = await supabase
        .from("users")
        .select("*")
        .eq("id", studentId)
        .single()

      if (studentError) {
        console.error("Error fetching student:", studentError)
        return
      }

      // Fetch time records
      const { data: recordsData, error: recordsError } = await supabase
        .from("time_records")
        .select("*")
        .eq("user_id", studentId)
        .order("start_time", { ascending: false })

      if (recordsError) {
        console.error("Error fetching time records:", recordsError)
        return
      }

      setStudent({
        id: studentData.id,
        email: studentData.email,
        firstName: studentData.first_name,
        lastName: studentData.last_name,
      })

      setTimeRecords(recordsData as TimeRecord[])
      setIsLoading(false)
    }

    fetchStudentData()
  }, [studentId])

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

  const calculateDuration = (startTime: string, endTime: string | null) => {
    if (!endTime) return "In progress"

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
      if (record.endTime) {
        const start = new Date(record.startTime).getTime()
        const end = new Date(record.endTime).getTime()
        totalMs += end - start
      }
    })

    const hours = Math.floor(totalMs / (1000 * 60 * 60))
    const minutes = Math.floor((totalMs % (1000 * 60 * 60)) / (1000 * 60))

    return `${hours} hours ${minutes} minutes`
  }

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>
  }

  if (!student) {
    return <div className="text-center py-8">Student not found</div>
  }

  return (
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
          {timeRecords.length === 0 ? (
            <div className="text-center py-4 text-gray-500">No time records found</div>
          ) : (
            <div className="space-y-4">
              {timeRecords.map((record) => (
                <div key={record.id} className="border-b pb-4 last:border-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{record.description || "Untitled Session"}</h3>
                      <p className="text-sm text-gray-500">
                        {formatDate(record.startTime)} • {formatTime(record.startTime)}
                        {record.endTime && ` - ${formatTime(record.endTime)}`}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="font-medium">{calculateDuration(record.startTime, record.endTime)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
