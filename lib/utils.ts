import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { PROGRAM_DURATION } from "./constants"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Helper function to calculate expiry year
export const calculateExpiryYear = (enrollmentYear: number, programType: string): number => {
  return enrollmentYear + (PROGRAM_DURATION[programType as keyof typeof PROGRAM_DURATION] || PROGRAM_DURATION.default)
}

// Generate random card number
export const generateRandomCardNumber = (): string => {
  return "C" + Math.floor(10000000 + Math.random() * 90000000).toString()
}

// Convert hex color to rgba
export const hexToRgba = (hex: string, alpha = 1): string => {
  const r = Number.parseInt(hex.slice(1, 3), 16)
  const g = Number.parseInt(hex.slice(3, 5), 16)
  const b = Number.parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

// Convert watermark color and opacity to rgba
export const getWatermarkColor = (color: string, opacity: string): string => {
  return hexToRgba(color, Number(opacity) / 100)
}

// Format validity date display
export const formatValidityDate = (dateStr: string): string => {
  if (!dateStr) return ""
  return dateStr.replace("-", "/")
}

// Handle card background image style, including opacity
export const getBackgroundImageStyle = (image: string, opacity: string, isBack = false) => {
  if (!image) return {}

  const adjustedOpacity = isBack ? Number(opacity) / 200 : Number(opacity) / 100

  return {
    backgroundImage: `url(${image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    opacity: adjustedOpacity,
  }
}

// Export to image functionality
export const exportToImage = (canvas: HTMLCanvasElement, fileName: string, type: string) => {
  const link = document.createElement("a")
  link.download = `${fileName}.${type}`
  link.href = canvas.toDataURL(`image/${type}`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// Validate input data validity
export const validateFormData = (formData: any): Record<string, string> => {
  const errors: Record<string, string> = {}

  // Required field validation
  if (!formData.fullName) errors.fullName = "Name cannot be empty"
  if (!formData.studentId) errors.studentId = "Student ID cannot be empty"
  if (!formData.faculty) errors.faculty = "Faculty cannot be empty"
  if (!formData.universityName) errors.universityName = "University name cannot be empty"

  // Date validation
  if (formData.validityStart && formData.validityEnd) {
    const startDate = new Date(formData.validityStart)
    const endDate = new Date(formData.validityEnd)
    if (startDate > endDate) {
      errors.validityEnd = "Validity end date must be later than start date"
    }
  }

  return errors
}

// Format date
export function formatDate(dateString: string): string {
  if (!dateString) return ""

  try {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return dateString

    // Format as YYYY/MM/DD format
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    return `${year}/${month.toString().padStart(2, "0")}/${day.toString().padStart(2, "0")}`
  } catch (error) {
    console.error("Date formatting error:", error)
    return dateString
  }
}
