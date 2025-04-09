"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { supabase } from "@/lib/supabase"
import type { User, Student } from "@/types/user"

interface StudentListProps {
  user: User
}

export function StudentList({ user }: StudentListProps) {
  const [students, setStudents] = useState<Student[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchStudents = async () => {
      setIsLoading(true)

      const { data, error } = await supabase
        .from("teacher_student_relation")
        .select(`
          student_id,
          students:student_id(
            id,
            email,
            first_name,
            last_name
          )
        `)
        .eq("teacher_id", user.id)

      if (error) {
        console.error("Error fetching students:", error)
        return
      }

      const formattedStudents = data.map((item) => ({
        id: item.students.id,
        email: item.students.email,
        firstName: item.students.first_name,
        lastName: item.students.last_name,
      }))

      setStudents(formattedStudents)
      setIsLoading(false)
    }

    fetchStudents()
  }, [user.id])

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Your Students</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="text-center py-4">Loading...</div>
        ) : students.length === 0 ? (
          <div className="text-center py-4 text-gray-500">No students found</div>
        ) : (
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
                  href={`/teacher/students/${student.id}`}
                  className="text-sm font-medium text-emerald-600 hover:text-emerald-700"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
