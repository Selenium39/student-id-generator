import type {
  CardStyle,
  CardOrientation,
  CodeType,
  IDCardFormData,
  CertificateFormData,
  ScheduleFormData,
  ScheduleCourse,
  AdmissionLetterFormData,
  TranscriptFormData,
  TranscriptCourse,
} from "./types"

// Default card orientation
export const DEFAULT_CARD_ORIENTATION: CardOrientation = "landscape"

// Default card style
export const DEFAULT_CARD_STYLE: CardStyle = "modern"

// Default code type
export const DEFAULT_CODE_TYPE: CodeType = "barcode"

// Export quality options
export const EXPORT_QUALITY_OPTIONS = [
  { label: "Standard Quality (Smaller file)", value: "low" },
  { label: "High Quality", value: "medium" },
  { label: "Ultra HD (Recommended)", value: "high" },
  { label: "Maximum Quality (Large file)", value: "ultra" },
]

// Card orientation options
export const CARD_ORIENTATION_OPTIONS = [
  { label: "Portrait", value: "portrait" },
  { label: "Landscape (Credit Card Size)", value: "landscape" },
]

// Card style options
export const CARD_STYLE_OPTIONS = [{ label: "Modern", value: "modern" }]

// Code type options
export const CODE_TYPE_OPTIONS = [
  { label: "Barcode", value: "barcode" },
  { label: "QR Code", value: "qrcode" },
]

// Program type options
export const PROGRAM_TYPE_OPTIONS = [
  { label: "Bachelor", value: "Bachelor" },
  { label: "Master", value: "Master" },
  { label: "PhD", value: "PhD" },
]

// Degree type options
export const DEGREE_TYPE_OPTIONS = [
  { label: "Bachelor's Degree", value: "Bachelor" },
  { label: "Master's Degree", value: "Master" },
  { label: "PhD", value: "PhD" },
]

// Study mode options
export const STUDY_MODE_OPTIONS = [
  { label: "Full-time", value: "Full-time" },
  { label: "Part-time", value: "Part-time" },
]

// Font options
export const FONT_FAMILY_OPTIONS = [
  { label: "Times New Roman", value: "Times New Roman, serif" },
  { label: "Arial", value: "Arial, sans-serif" },
  { label: "Georgia", value: "Georgia, serif" },
  { label: "Calibri", value: "Calibri, sans-serif" },
  { label: "Garamond", value: "Garamond, serif" },
  { label: "Palatino", value: "Palatino Linotype, Book Antiqua, Palatino, serif" },
  { label: "Century Gothic", value: "Century Gothic, sans-serif" },
  { label: "Tahoma", value: "Tahoma, sans-serif" },
]

// Border style options
export const BORDER_STYLE_OPTIONS = [
  { label: "Solid", value: "solid" },
  { label: "Dashed", value: "dashed" },
  { label: "Dotted", value: "dotted" },
  { label: "Double", value: "double" },
]

// Pattern type options
export const PATTERN_TYPE_OPTIONS = [
  { label: "Corner Pattern", value: "corner" },
  { label: "Border Pattern", value: "border" },
  { label: "Background Pattern", value: "background" },
  { label: "Badge Style", value: "badge" },
]

// Pattern position options
export const PATTERN_POSITION_OPTIONS = [
  { label: "All Positions", value: "all" },
  { label: "Top Only", value: "top" },
  { label: "Bottom Only", value: "bottom" },
  { label: "Left Only", value: "left" },
  { label: "Right Only", value: "right" },
  { label: "Corners Only", value: "corners" },
]

// Standard duration for various programs
export const PROGRAM_DURATION = {
  Bachelor: 4,
  Master: 2,
  PhD: 4,
  default: 4,
}

// Default form data
export const DEFAULT_FORM_DATA: IDCardFormData = {
  // Personal information
  fullName: "Emily Johnson",
  studentId: "2023001001",
  faculty: "School of Computer Science",
  universityName: "International University",
  validityStart: new Date().toISOString().split("T")[0],
  validityEnd: new Date(new Date().setFullYear(new Date().getFullYear() + 4)).toISOString().split("T")[0],
  enrollmentYear: new Date().getFullYear().toString(),
  programType: "Bachelor",
  photo: "/placeholder.svg?height=150&width=120",
  logo: "/placeholder.svg?height=60&width=60",
  cardColor: "#1e40af",
  textColor: "#ffffff",
  backgroundImage: "/placeholder.svg?height=90&width=140",
  backgroundOpacity: "30",

  // Card options
  orientation: DEFAULT_CARD_ORIENTATION,
  cardStyle: DEFAULT_CARD_STYLE,
  codeType: DEFAULT_CODE_TYPE,
  cardNumber: "C" + Math.floor(10000000 + Math.random() * 90000000).toString(), // Card number
  officialSignature: "S. Davis", // Registrar signature
  realisticEffect: false, // Realistic texture effect
  pngQuality: "high", // PNG export quality: low, medium, high, ultra

  // Watermark settings
  enableWatermark: true,
  watermarkText: "AUTHENTIC",
  watermarkColor: "#000000",
  watermarkOpacity: 3, // Watermark opacity (percentage, here represents 3%)
  watermarkSize: "14", // Watermark size level
  watermarkAngle: "-30", // Watermark angle
  watermarkLineWidth: "20", // Diagonal line width

  // University information
  universityAddress: "123 University Avenue, Boston, MA 02115",
  universityContact: "(617) 555-1234",
  universityWebsite: "www.university.edu",

  // Back settings
  backEnabled: true,
  termsOfUse:
    "This card must be carried while on campus. Violation of university policies may result in card revocation.",
  termsText: "Terms and Conditions",
  backTitle: "Student ID Card Information",
  useCustomBack: false,
  backContent: "Thank you for using our student ID system.",
  emergencyContact: "(617) 555-4321",
  accessList: "Library, Cafeteria, Dormitory, Computer Labs, Gym",
  lostCardInfo: "If found, please return to the University Lost & Found Office or call the number below.",
  returnInfo: "",
  backLogo: "/placeholder.svg?height=60&width=60",
  backLogoOpacity: "70",
}

// Default certificate data
export const DEFAULT_CERTIFICATE_DATA: CertificateFormData = {
  // Basic information
  universityName: "International University",
  universityLogo: "/placeholder.svg?height=80&width=80",
  fullName: "Emily Johnson",
  studentId: "2023001001",
  birthDate: "1998-05-15",
  nationality: "United States",
  faculty: "School of Computer Science",
  major: "Computer Science",
  degreeType: "Bachelor",
  studyMode: "Full-time",
  enrollmentDate: "2023-09-01",
  expectedGraduationDate: "2027-06-30",
  currentYear: "First Year",
  studentPhoto: "",

  // Certificate details
  certificateTitle: "Certificate of Enrollment",

  // Certificate content
  certificateContent:
    "This is to certify that the above-named student is currently enrolled as a student in good standing at International University. The student is making satisfactory progress towards their degree.",

  // Issuance information
  issueDate: new Date().toISOString().split("T")[0],
  validityPeriod: "6 months",
  issuerTitle: "Registrar",
  issuerSignature: "Jane Smith",

  // Contact information
  contactInfo:
    "For verification of this certificate, please contact the Office of the Registrar at registrar@internationaluniversity.edu or call +1 (617) 555-1234.",

  // Design options
  paperColor: "#ffffff",
  headerColor: "#1e40af",
  textColor: "#000000",
  fontFamily: "Times New Roman, serif",
  enableWatermark: false,
  watermarkText: "OFFICIAL DOCUMENT",
  watermarkOpacity: 5,
  watermarkColor: "#000000",
  watermarkSize: "14",
  watermarkAngle: "-30",
  watermarkLineWidth: "20",
  enableBorder: true,
  borderColor: "#1e40af",
  borderStyle: "solid",

  // Pattern settings
  enablePattern: true,
  patternType: "corner",
  patternColor: "#1e40af",
  patternOpacity: 15,
  patternSize: "30",
  patternPosition: "all",

  // Export options
  pngQuality: "high",
}

// Days of week options
export const DAYS_OF_WEEK_OPTIONS = [
  { label: "Monday", value: "Monday" },
  { label: "Tuesday", value: "Tuesday" },
  { label: "Wednesday", value: "Wednesday" },
  { label: "Thursday", value: "Thursday" },
  { label: "Friday", value: "Friday" },
  { label: "Saturday", value: "Saturday" },
  { label: "Sunday", value: "Sunday" },
]

// Course mode options
export const COURSE_MODE_OPTIONS = [
  { label: "In-Person", value: "In-Person" },
  { label: "Online", value: "Online" },
  { label: "Hybrid", value: "Hybrid" },
]

// Course type options
export const COURSE_TYPE_OPTIONS = [
  { label: "Lecture", value: "Lecture" },
  { label: "Seminar", value: "Seminar" },
  { label: "Lab", value: "Lab" },
  { label: "Tutorial", value: "Tutorial" },
  { label: "Workshop", value: "Workshop" },
]

// Course color options
export const COURSE_COLOR_OPTIONS = [
  { label: "Blue", value: "#3b82f6" },
  { label: "Green", value: "#10b981" },
  { label: "Red", value: "#ef4444" },
  { label: "Purple", value: "#8b5cf6" },
  { label: "Orange", value: "#f97316" },
  { label: "Pink", value: "#ec4899" },
  { label: "Cyan", value: "#06b6d4" },
  { label: "Yellow", value: "#eab308" },
  { label: "Indigo", value: "#4f46e5" },
  { label: "Teal", value: "#14b8a6" },
]

// Time format options
export const HOUR_FORMAT_OPTIONS = [
  { label: "12-hour (AM/PM)", value: "12h" },
  { label: "24-hour", value: "24h" },
]

// Default course data
const DEFAULT_COURSES: ScheduleCourse[] = [
  {
    id: "1",
    courseCode: "CS101",
    courseName: "Introduction to Computer Science",
    instructor: "Prof. John Smith",
    credits: 3,
    location: "Science Building",
    building: "SCI",
    room: "101",
    startTime: "09:00",
    endTime: "10:30",
    days: ["Monday", "Wednesday"],
    color: "#3b82f6",
    mode: "In-Person",
    type: "Lecture",
    notes: "Bring your laptop to every class",
  },
  {
    id: "2",
    courseCode: "MATH201",
    courseName: "Calculus II",
    instructor: "Dr. Sarah Johnson",
    credits: 4,
    location: "Mathematics Building",
    building: "MATH",
    room: "305",
    startTime: "11:00",
    endTime: "12:30",
    days: ["Tuesday", "Thursday"],
    color: "#10b981",
    mode: "In-Person",
    type: "Lecture",
    notes: "",
  },
  {
    id: "3",
    courseCode: "CS101L",
    courseName: "Intro to CS Lab",
    instructor: "TA Michael Brown",
    credits: 1,
    location: "Computer Lab",
    building: "SCI",
    room: "B12",
    startTime: "14:00",
    endTime: "16:00",
    days: ["Friday"],
    color: "#3b82f6",
    mode: "In-Person",
    type: "Lab",
    notes: "",
  },
  {
    id: "4",
    courseCode: "ENG105",
    courseName: "Academic Writing",
    instructor: "Prof. Emily Davis",
    credits: 3,
    location: "Online",
    building: "",
    room: "",
    startTime: "15:30",
    endTime: "17:00",
    days: ["Monday", "Wednesday"],
    color: "#ef4444",
    mode: "Online",
    type: "Seminar",
    notes: "Zoom link will be provided in the course portal",
  },
]

// Default schedule data
export const DEFAULT_SCHEDULE_DATA: ScheduleFormData = {
  // Basic information
  universityName: "International University",
  universityLogo: "/placeholder.svg?height=80&width=80",
  department: "School of Computer Science",
  fullName: "Emily Johnson",
  studentId: "2023001001",
  major: "Computer Science",
  term: "Fall 2023",
  academicYear: "2023-2024",

  // Schedule settings
  scheduleTitle: "Course Schedule",
  courses: DEFAULT_COURSES,

  // Display options
  showWeekends: false,
  showInstructors: true,
  showLocations: true,
  showCourseType: true,
  showCredits: true,
  showNotes: true,

  // Time settings
  startHour: 8,
  endHour: 20,
  hourFormat: "12h",

  // Design options
  headerColor: "#1e40af",
  tableHeaderColor: "#e2e8f0",
  textColor: "#000000",
  borderColor: "#cbd5e1",
  paperColor: "#ffffff",
  fontFamily: "Arial, sans-serif",

  // Watermark settings
  enableWatermark: true,
  watermarkText: "OFFICIAL SCHEDULE",
  watermarkColor: "#000000",
  watermarkOpacity: 3,
  watermarkSize: "14",
  watermarkAngle: "-30",

  // Export options
  pngQuality: "high",
}

// Default admission letter data
export const DEFAULT_ADMISSION_LETTER_DATA: AdmissionLetterFormData = {
  // University information
  universityName: "International University",
  universityLogo: "/placeholder.svg?height=80&width=80",
  universityAddress: "123 University Avenue, Boston, MA 02115",
  universityContact: "(617) 555-1234",
  universityWebsite: "www.university.edu",

  // Student information
  studentName: "Emily Johnson",
  studentId: "2023001001",
  studentAddress: "456 Student Street, Boston, MA 02116",
  studentEmail: "emily.johnson@email.com",
  studentPhone: "(617) 555-5678",

  // Admission information
  programName: "Computer Science",
  departmentName: "School of Computer Science",
  degreeType: "Bachelor",
  admissionDate: new Date().toISOString().split("T")[0],
  programStartDate: "2023-09-01",
  programDuration: "4 years",
  scholarshipInfo: "Merit Scholarship: $5,000 per year",

  // Letter content
  letterTitle: "Letter of Admission",
  letterContent:
    "Dear Emily Johnson,\n\nWe are pleased to inform you that you have been accepted to the Computer Science program at International University for the Fall 2023 semester. Your academic achievements and personal qualities have impressed our admissions committee, and we believe you will make valuable contributions to our university community.\n\nYour admission is for the Bachelor's degree program in Computer Science, which is a 4-year program. Classes will begin on September 1, 2023.",
  congratulatoryMessage:
    "Congratulations on your acceptance! We look forward to welcoming you to our campus and supporting your academic journey.",
  nextStepsInfo:
    "To confirm your enrollment, please complete the following steps:\n1. Submit your enrollment confirmation by June 1, 2023\n2. Pay the enrollment deposit of $500\n3. Register for orientation (August 25-28, 2023)\n4. Complete housing application (if applicable)\n\nAdditional information regarding these steps will be sent to your email.",

  // Signature information
  signatoryName: "Dr. Robert Anderson",
  signatoryTitle: "Dean of Admissions",
  signatorySignature: "",
  officialStamp: "",

  // Design options
  headerColor: "#1e40af",
  textColor: "#000000",
  accentColor: "#4f46e5",
  paperColor: "#ffffff",
  fontFamily: "Times New Roman, serif",

  // Watermark settings
  enableWatermark: true,
  watermarkText: "OFFICIAL ADMISSION",
  watermarkColor: "#000000",
  watermarkOpacity: 3,
  watermarkSize: "14",
  watermarkAngle: "-30",

  // Border settings
  enableBorder: true,
  borderColor: "#1e40af",
  borderStyle: "solid",

  // Export options
  pngQuality: "high",
}

// Default transcript course data
const DEFAULT_TRANSCRIPT_COURSES: TranscriptCourse[] = [
  {
    id: "1",
    courseCode: "CS101",
    courseName: "Introduction to Computer Science",
    credits: 3,
    grade: "A",
    semester: "Fall",
    academicYear: "2022-2023",
    completed: true,
  },
  {
    id: "2",
    courseCode: "MATH201",
    courseName: "Calculus I",
    credits: 4,
    grade: "B+",
    semester: "Fall",
    academicYear: "2022-2023",
    completed: true,
  },
  {
    id: "3",
    courseCode: "ENG105",
    courseName: "Academic Writing",
    credits: 3,
    grade: "A-",
    semester: "Fall",
    academicYear: "2022-2023",
    completed: true,
  },
  {
    id: "4",
    courseCode: "PHYS101",
    courseName: "Physics for Scientists and Engineers",
    credits: 4,
    grade: "B",
    semester: "Fall",
    academicYear: "2022-2023",
    completed: true,
  },
  {
    id: "5",
    courseCode: "CS102",
    courseName: "Data Structures and Algorithms",
    credits: 3,
    grade: "A",
    semester: "Spring",
    academicYear: "2022-2023",
    completed: true,
  },
  {
    id: "6",
    courseCode: "MATH202",
    courseName: "Calculus II",
    credits: 4,
    grade: "B+",
    semester: "Spring",
    academicYear: "2022-2023",
    completed: true,
  },
  {
    id: "7",
    courseCode: "CS201",
    courseName: "Computer Organization",
    credits: 3,
    grade: "A-",
    semester: "Spring",
    academicYear: "2022-2023",
    completed: true,
  },
  {
    id: "8",
    courseCode: "STAT201",
    courseName: "Statistics for Computer Science",
    credits: 3,
    grade: "B+",
    semester: "Spring",
    academicYear: "2022-2023",
    completed: true,
  },
  {
    id: "9",
    courseCode: "CS210",
    courseName: "Database Systems",
    credits: 3,
    grade: "A",
    semester: "Fall",
    academicYear: "2023-2024",
    completed: true,
  },
  {
    id: "10",
    courseCode: "CS220",
    courseName: "Software Engineering",
    credits: 3,
    grade: "A-",
    semester: "Fall",
    academicYear: "2023-2024",
    completed: true,
  },
  {
    id: "11",
    courseCode: "CS230",
    courseName: "Operating Systems",
    credits: 3,
    grade: "B+",
    semester: "Fall",
    academicYear: "2023-2024",
    completed: true,
  },
  {
    id: "12",
    courseCode: "CS240",
    courseName: "Computer Networks",
    credits: 3,
    grade: "In Progress",
    semester: "Spring",
    academicYear: "2023-2024",
    completed: false,
  },
]

// Default transcript data
export const DEFAULT_TRANSCRIPT_DATA: TranscriptFormData = {
  // University information
  universityName: "International University",
  universityLogo: "/placeholder.svg?height=80&width=80",
  universityAddress: "123 University Avenue, Boston, MA 02115",
  universityContact: "(617) 555-1234",
  universityWebsite: "www.university.edu",

  // Student information
  studentName: "Emily Johnson",
  studentId: "2023001001",
  programName: "Computer Science",
  departmentName: "School of Computer Science",
  degreeType: "Bachelor",
  enrollmentDate: "2022-09-01",
  expectedGraduationDate: "2026-06-30",
  studentPhoto: "/placeholder.svg?height=150&width=120",

  // Grade information
  courses: DEFAULT_TRANSCRIPT_COURSES,
  currentGPA: "3.75",
  totalCredits: 36,
  completedCredits: 33,

  // Issuance information
  issueDate: new Date().toISOString().split("T")[0],
  registrarName: "Dr. Jane Smith",
  registrarTitle: "University Registrar",
  registrarSignature: "",

  // Design options
  headerColor: "#1e40af",
  tableHeaderColor: "#e2e8f0",
  textColor: "#000000",
  accentColor: "#4f46e5",
  paperColor: "#ffffff",
  fontFamily: "Times New Roman, serif",

  // Watermark settings
  enableWatermark: true,
  watermarkText: "OFFICIAL TRANSCRIPT",
  watermarkColor: "#000000",
  watermarkOpacity: 3,
  watermarkSize: "14",
  watermarkAngle: "-30",

  // Border settings
  enableBorder: true,
  borderColor: "#1e40af",
  borderStyle: "solid",

  // Display options
  showStudentPhoto: true,
  showGradePoints: true,
  showGradeScale: true,
  showSemesterGPA: true,

  // Export options
  pngQuality: "high",
}

// Grade points corresponding to grade levels
export const GRADE_POINTS = {
  "A+": 4.0,
  A: 4.0,
  "A-": 3.7,
  "B+": 3.3,
  B: 3.0,
  "B-": 2.7,
  "C+": 2.3,
  C: 2.0,
  "C-": 1.7,
  "D+": 1.3,
  D: 1.0,
  F: 0.0,
  P: null, // Pass, not counted in GPA
  NP: null, // No Pass, not counted in GPA
  I: null, // Incomplete
  W: null, // Withdrawal
  "In Progress": null, // Currently taking
}

// Grade level options
export const GRADE_OPTIONS = [
  { label: "A+", value: "A+" },
  { label: "A", value: "A" },
  { label: "A-", value: "A-" },
  { label: "B+", value: "B+" },
  { label: "B", value: "B" },
  { label: "B-", value: "B-" },
  { label: "C+", value: "C+" },
  { label: "C", value: "C" },
  { label: "C-", value: "C-" },
  { label: "D+", value: "D+" },
  { label: "D", value: "D" },
  { label: "F", value: "F" },
  { label: "P (Pass)", value: "P" },
  { label: "NP (No Pass)", value: "NP" },
  { label: "I (Incomplete)", value: "I" },
  { label: "W (Withdrawal)", value: "W" },
  { label: "In Progress", value: "In Progress" },
]

// Semester options
export const SEMESTER_OPTIONS = [
  { label: "Fall", value: "Fall" },
  { label: "Spring", value: "Spring" },
  { label: "Summer", value: "Summer" },
  { label: "Winter", value: "Winter" },
]
