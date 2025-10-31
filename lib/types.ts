import type React from "react"
import type { ReactNode, RefObject } from "react"

export type ExportQuality = "high" | "medium" | "low"

export type CardOrientation = "portrait" | "landscape"
export type CardStyle = "modern" | "classic" | "minimal"
export type CodeType = "barcode" | "qrcode"

export interface IDCardFormData {
  fullName: string
  studentId: string
  faculty: string
  universityName: string
  validityStart: string
  validityEnd: string
  enrollmentYear: string
  programType: string
  photo: string
  logo: string
  cardColor: string
  textColor: string
  backgroundImage: string
  backgroundOpacity: string
  orientation: CardOrientation
  cardStyle: CardStyle
  codeType: CodeType
  cardNumber: string
  officialSignature: string
  realisticEffect: boolean
  pngQuality: string
  enableWatermark: boolean
  watermarkText: string
  watermarkColor: string
  watermarkOpacity: number
  watermarkSize: string
  watermarkAngle: string
  watermarkLineWidth: string
  universityAddress: string
  universityContact: string
  universityWebsite: string
  backEnabled: boolean
  termsOfUse: string
  termsText: string
  backTitle: string
  useCustomBack: boolean
  backContent: string
  emergencyContact: string
  accessList: string
  lostCardInfo: string
  returnInfo: string
  backLogo: string
  backLogoOpacity: string
  [key: string]: string | number | boolean
}

export interface FormComponentProps {
  formData: any
  onChange: (name: string, value: string | boolean | number | string[] | ScheduleCourse[]) => void
  onFileChange?: (e: React.ChangeEvent<HTMLInputElement>, field: string) => void
}

export interface CardComponentProps {
  formData: IDCardFormData
  cardStyle: string
  orientation: "portrait" | "landscape"
  barcodeRef?: React.RefObject<SVGSVGElement | null>
}

export interface CardElementsProps {
  formData: IDCardFormData
  children: ReactNode
}

export interface CardPreviewProps {
  formData: IDCardFormData
  showBack?: boolean
  onChange: (name: string, value: string | boolean) => void
  onFileChange?: (e: React.ChangeEvent<HTMLInputElement>, field: string) => void
  onDownload: (quality: string) => void
  previewRef?: RefObject<HTMLDivElement | null>
}

export interface ScheduleFormData {
  universityName: string
  universityLogo: string
  department: string
  fullName: string
  studentId: string
  major: string
  term: string
  academicYear: string
  scheduleTitle: string
  courses: ScheduleCourse[]
  showWeekends: boolean
  showInstructors: boolean
  showLocations: boolean
  showCourseType: boolean
  showCredits: boolean
  showNotes: boolean
  startHour: number
  endHour: number
  hourFormat: string
  headerColor: string
  tableHeaderColor: string
  textColor: string
  borderColor: string
  paperColor: string
  fontFamily: string
  enableWatermark: boolean
  watermarkText: string
  watermarkColor: string
  watermarkOpacity: number
  watermarkSize: string
  watermarkAngle: string
  pngQuality: string
  daysOfWeek?: string[]
}

export interface ScheduleCourse {
  id: string
  courseCode: string
  courseName: string
  instructor: string
  credits: number
  location: string
  building: string
  room: string
  startTime: string
  endTime: string
  days: string[]
  color: string
  mode: string
  type: string
  notes: string
}

export interface AdmissionLetterFormData {
  universityName: string
  universityLogo: string
  universityAddress: string
  universityContact: string
  universityWebsite: string
  studentName: string
  studentId: string
  studentAddress: string
  studentEmail: string
  studentPhone: string
  programName: string
  departmentName: string
  degreeType: string
  admissionDate: string
  programStartDate: string
  programDuration: string
  scholarshipInfo: string
  letterTitle: string
  letterContent: string
  congratulatoryMessage: string
  nextStepsInfo: string
  signatoryName: string
  signatoryTitle: string
  signatorySignature: string
  officialStamp: string
  headerColor: string
  textColor: string
  accentColor: string
  paperColor: string
  fontFamily: string
  enableWatermark: boolean
  watermarkText: string
  watermarkColor: string
  watermarkOpacity: number
  watermarkSize: string
  watermarkAngle: string
  enableBorder: boolean
  borderColor: string
  borderStyle: string
  pngQuality?: ExportQuality
}

export interface AdmissionLetterPreviewProps {
  formData: AdmissionLetterFormData
  onChange: (name: string, value: string | boolean | number) => void
  onFileChange?: (e: React.ChangeEvent<HTMLInputElement>, field: string) => void
  onDownload?: (quality: string) => void
  previewRef?: React.RefObject<HTMLDivElement>
}

export interface AdmissionLetterInfoFormProps {
  formData: AdmissionLetterFormData
  formErrors: Record<string, string>
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  onFileChange?: (e: React.ChangeEvent<HTMLInputElement>, field: string) => void
  onSubmit: (e: React.FormEvent) => void
}

export interface AdmissionLetterDesignFormProps {
  formData: AdmissionLetterFormData
  formErrors: Record<string, string>
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  onFileChange?: (e: React.ChangeEvent<HTMLInputElement>, field: string) => void
  onSubmit: (e: React.FormEvent) => void
}

export interface TranscriptFormData {
  universityName: string
  universityLogo: string
  universityAddress: string
  universityContact: string
  universityWebsite: string
  studentName: string
  studentId: string
  programName: string
  departmentName: string
  degreeType: string
  enrollmentDate: string
  expectedGraduationDate: string
  studentPhoto: string
  courses: TranscriptCourse[]
  currentGPA: string
  totalCredits: number
  completedCredits: number
  issueDate: string
  registrarName: string
  registrarTitle: string
  registrarSignature: string
  headerColor: string
  tableHeaderColor: string
  textColor: string
  accentColor: string
  paperColor: string
  fontFamily: string
  enableWatermark: boolean
  watermarkText: string
  watermarkColor: string
  watermarkOpacity: number
  watermarkSize: string
  watermarkAngle: string
  enableBorder: boolean
  borderColor: string
  borderStyle: string
  showStudentPhoto: boolean
  showGradePoints: boolean
  showGradeScale: boolean
  showSemesterGPA: boolean
  pngQuality?: ExportQuality
}

export interface TranscriptPreviewProps {
  formData: TranscriptFormData
  onChange: (name: string, value: string | boolean | number) => void
  onFileChange?: (e: React.ChangeEvent<HTMLInputElement>, field: string) => void
  onDownload?: (quality: string) => void
  previewRef?: React.RefObject<HTMLDivElement>
}

export interface TranscriptFormProps {
  formData: TranscriptFormData
  onChange: (name: string, value: string | boolean | number) => void
  onFileChange?: (e: React.ChangeEvent<HTMLInputElement>, field: string) => void
}

export interface CourseGradeEditorProps {
  courses: TranscriptCourse[]
  onChange: (courses: TranscriptCourse[]) => void
}

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

export interface CertificateFormData {
  universityName: string
  universityLogo: string
  fullName: string
  studentId: string
  birthDate: string
  nationality: string
  faculty: string
  major: string
  degreeType: string
  studyMode: string
  enrollmentDate: string
  expectedGraduationDate: string
  currentYear: string
  studentPhoto: string
  certificateTitle: string
  certificateContent: string
  issueDate: string
  validityPeriod: string
  issuerTitle: string
  issuerSignature: string
  contactInfo: string
  paperColor: string
  headerColor: string
  textColor: string
  fontFamily: string
  enableWatermark: boolean
  watermarkText: string
  watermarkOpacity: number
  watermarkColor: string
  watermarkSize: string
  watermarkAngle: string
  watermarkLineWidth: string
  enableBorder: boolean
  borderColor: string
  borderStyle: string
  enablePattern: boolean
  patternType: string
  patternColor: string
  patternOpacity: number
  patternSize: string
  patternPosition: string
  pngQuality: string
}

export interface CertificatePreviewProps {
  formData: CertificateFormData
  onDownload?: (quality: string) => void
  previewRef?: React.RefObject<HTMLDivElement>
}
