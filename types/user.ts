export interface User {
  id: string
  email: string
  firstName: string | null
  lastName: string | null
  role: "student" | "teacher"
}

export interface TimeRecord {
  id: number
  userId: string
  startTime: string
  endTime: string | null
  description: string | null
  createdAt: string
  updatedAt: string
}

export interface Student {
  id: string
  email: string
  firstName: string | null
  lastName: string | null
  timeRecords?: TimeRecord[]
}