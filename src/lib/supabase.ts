import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'YOUR_SUPABASE_URL'
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY'

export const supabase = createClient(supabaseUrl, supabaseKey)

// Database Types
export type Profile = {
  id: string
  email: string
  full_name: string
  avatar_url?: string
  role: 'student' | 'parent' | 'teacher' | 'admin'
  created_at: string
  updated_at: string
}

export type Student = {
  id: string
  user_id: string
  student_number: string
  class_id: string
  level: string
  parent_id?: string
  created_at: string
}

export type Grade = {
  id: string
  student_id: string
  subject: string
  grade: number
  coefficient: number
  type: 'devoir' | 'controle' | 'examen'
  date: string
  teacher_id: string
  created_at: string
}

export type Schedule = {
  id: string
  class_id: string
  subject: string
  teacher_id: string
  day_of_week: number
  start_time: string
  end_time: string
  room: string
}

export type Attendance = {
  id: string
  student_id: string
  date: string
  status: 'present' | 'absent' | 'late' | 'excused'
  subject?: string
  notes?: string
}

export type Message = {
  id: string
  sender_id: string
  recipient_id: string
  subject: string
  content: string
  is_read: boolean
  created_at: string
  attachments?: string[]
}

export type Announcement = {
  id: string
  title: string
  content: string
  author_id: string
  target_audience: 'all' | 'students' | 'parents' | 'teachers'
  priority: 'low' | 'medium' | 'high'
  image_url?: string
  created_at: string
  expires_at?: string
}

export type Resource = {
  id: string
  title: string
  description?: string
  file_url: string
  file_type: string
  subject: string
  class_id: string
  teacher_id: string
  created_at: string
}