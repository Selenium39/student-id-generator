import type React from "react"
// Existing types remain unchanged...

export type ExportQuality = "high" | "medium" | "low"

/**
 * Admission Letter Form Data
 */
export interface AdmissionLetterFormData {
  // University information
  universityName: string
  universityLogo: string
  universityAddress: string
  universityContact: string
  universityWebsite: string

  // Student information
  studentName: string
  studentId: string
  studentAddress: string
  studentEmail: string
  studentPhone: string

  // Admission information
  programName: string
  departmentName: string
  degreeType: string
  admissionDate: string
  programStartDate: string
  programDuration: string
  scholarshipInfo: string

  // Letter content
  letterTitle: string
  letterContent: string
  congratulatoryMessage: string
  nextStepsInfo: string

  // Signature information
  signatoryName: string
  signatoryTitle: string
  signatorySignature: string
  officialStamp: string

  // Design options
  headerColor: string
  textColor: string
  accentColor: string
  paperColor: string
  fontFamily: string

  // Watermark settings
  enableWatermark: boolean
  watermarkText: string
  watermarkColor: string
  watermarkOpacity: number
  watermarkSize: string
  watermarkAngle: string

  // Border settings
  enableBorder: boolean
  borderColor: string
  borderStyle: string

  // Export options
  pngQuality?: ExportQuality
}

/**
 * Transcript Course Data
 */
export interface TranscriptCourse {
  id: string
  courseCode: string
  courseName: string
  credits: number
  grade: string
  semester: string
  academicYear: string
  completed: boolean
}

/**
 * Transcript Form Data
 */
export interface TranscriptFormData {
  // University information
  universityName: string
  universityLogo: string
  universityAddress: string
  universityContact: string
  universityWebsite: string

  // Student information
  studentName: string
  studentId: string
  programName: string
  departmentName: string
  degreeType: string
  enrollmentDate: string
  expectedGraduationDate: string
  studentPhoto: string

  // Grade information
  courses: TranscriptCourse[]
  currentGPA: string
  totalCredits: number
  completedCredits: number

  // Issuance information
  issueDate: string
  registrarName: string
  registrarTitle: string
  registrarSignature: string

  // Design options
  headerColor: string
  tableHeaderColor: string
  textColor: string
  accentColor: string
  paperColor: string
  fontFamily: string

  // Watermark settings
  enableWatermark: boolean
  watermarkText: string
  watermarkColor: string
  watermarkOpacity: number
  watermarkSize: string
  watermarkAngle: string

  // Border settings
  enableBorder: boolean
  borderColor: string
  borderStyle: string

  // Display options
  showStudentPhoto: boolean
  showGradePoints: boolean
  showGradeScale: boolean
  showSemesterGPA: boolean

  // Export options
  pngQuality?: ExportQuality
}

// Transcript preview component properties
export interface TranscriptPreviewProps {
  formData: TranscriptFormData
  onChange: (name: string, value: string | boolean | number) => void
  onFileChange?: (e: React.ChangeEvent<HTMLInputElement>, field: string) => void
  onDownload?: (quality: string) => void
  previewRef?: React.RefObject<HTMLDivElement>
}

// Transcript form component properties
export interface TranscriptFormProps {
  formData: TranscriptFormData
  onChange: (name: string, value: string | boolean | number) => void
  onFileChange?: (e: React.ChangeEvent<HTMLInputElement>, field: string) => void
}

// Transcript course editor properties
export interface CourseGradeEditorProps {
  courses: TranscriptCourse[]
  onChange: (courses: TranscriptCourse[]) => void
}

// Admission letter preview component properties
export interface AdmissionLetterPreviewProps {
  formData: AdmissionLetterFormData
  onChange: (name: string, value: string | boolean | number) => void
  onFileChange?: (e: React.ChangeEvent<HTMLInputElement>, field: string) => void
  onDownload?: (quality: string) => void
  previewRef?: React.RefObject<HTMLDivElement>
}

// Admission letter form component properties
export interface AdmissionLetterFormProps {
  formData: AdmissionLetterFormData
  onChange: (name: string, value: string | boolean | number) => void
  onFileChange?: (e: React.ChangeEvent<HTMLInputElement>, field: string) => void
}
