"use client"

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import PreviewContainer from "@/components/common/PreviewContainer"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { EXPORT_QUALITY_OPTIONS } from "@/lib/constants"
import type { AdmissionLetterPreviewProps } from "@/lib/types"
import { formatDate } from "@/lib/utils"

/**
 * Admission Letter Preview Component
 */
export default function AdmissionLetterPreview({
  formData,
  onChange,
  onDownload,
  previewRef,
}: AdmissionLetterPreviewProps) {
  // Handle download
  const handleDownload = () => {
    if (onDownload) {
      onDownload(formData.pngQuality || "high")
    }
  }

  // Handle quality change
  const handleQualityChange = (quality: string) => {
    onChange("pngQuality", quality)
  }

  // Format date string
  const formatDateString = (dateString: string) => {
    if (!dateString) return ""
    return formatDate(dateString)
  }

  // Render watermark
  const renderWatermark = () => {
    if (!formData.enableWatermark || !formData.watermarkText) return null

    const watermarkStyle = {
      position: "absolute" as const,
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      pointerEvents: "none" as const,
      zIndex: 10,
      overflow: "hidden",
    }

    // Create repeated watermark text
    const watermarks = []
    const rows = 10
    const cols = 10
    const fontSize = Number.parseInt(formData.watermarkSize)
    const angle = Number.parseInt(formData.watermarkAngle)

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        watermarks.push(
          <div
            key={`${i}-${j}`}
            style={{
              position: "absolute",
              top: `${(i * 100) / rows}%`,
              left: `${(j * 100) / cols}%`,
              transform: `rotate(${angle}deg)`,
              fontSize: `${fontSize}px`,
              color: formData.watermarkColor,
              opacity: formData.watermarkOpacity / 100,
              fontFamily: formData.fontFamily,
              whiteSpace: "nowrap",
            }}
          >
            {formData.watermarkText}
          </div>,
        )
      }
    }

    return <div style={watermarkStyle}>{watermarks}</div>
  }

  // Download button
  const downloadButton = (
    <div className="flex items-center gap-2">
      <Select value={formData.pngQuality || "high"} onValueChange={handleQualityChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select export quality" />
        </SelectTrigger>
        <SelectContent>
          {EXPORT_QUALITY_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button onClick={handleDownload}>
        <Download className="mr-2 h-4 w-4" />
        Download
      </Button>
    </div>
  )

  // Calculate border style
  const borderStyle = formData.enableBorder
    ? {
        border: `2px ${formData.borderStyle} ${formData.borderColor}`,
        padding: "2rem",
      }
    : { padding: "2rem" }

  // Generate signature style
  const signatureStyle = {
    fontFamily: "var(--font-handwriting)",
    fontSize: "1.5rem",
    marginBottom: "0.5rem",
    color: "#000",
  }

  return (
    <PreviewContainer title="Admission Letter Preview" actions={downloadButton}>
      <div
        ref={previewRef}
        className="w-full max-w-4xl mx-auto relative overflow-hidden"
        style={{
          backgroundColor: formData.paperColor,
          color: formData.textColor,
          fontFamily: formData.fontFamily,
          ...borderStyle,
        }}
      >
        {/* Watermark */}
        {renderWatermark()}

        {/* University Logo and Name */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            {formData.universityLogo && (
              <img
                src={formData.universityLogo || "/placeholder.svg"}
                alt="University Logo"
                className="h-16 w-16 object-contain"
              />
            )}
            <div>
              <h1 className="text-2xl font-bold" style={{ color: formData.headerColor }}>
                {formData.universityName}
              </h1>
              <p className="text-sm">{formData.universityAddress}</p>
            </div>
          </div>

          <div className="text-right text-sm">
            <p>{formData.universityContact}</p>
            <p>{formData.universityWebsite}</p>
          </div>
        </div>

        {/* Letter Title */}
        <div className="text-center mb-8">
          <h2
            className="text-3xl font-bold pb-2 border-b-2 inline-block"
            style={{ color: formData.headerColor, borderColor: formData.accentColor }}
          >
            {formData.letterTitle || "Letter of Admission"}
          </h2>
        </div>

        {/* Student Information */}
        <div className="mb-6">
          <p>
            <span className="font-semibold">Date: </span>
            {formatDateString(formData.admissionDate)}
          </p>
          <p>
            <span className="font-semibold">To: </span>
            {formData.studentName}
          </p>
          {formData.studentId && (
            <p>
              <span className="font-semibold">Student ID: </span>
              {formData.studentId}
            </p>
          )}
          {formData.studentAddress && (
            <p>
              <span className="font-semibold">Address: </span>
              {formData.studentAddress}
            </p>
          )}
        </div>

        {/* Letter Content */}
        <div className="mb-6 whitespace-pre-line">{formData.letterContent}</div>

        {/* Admission Details */}
        <div className="mb-6 p-4 rounded-md" style={{ backgroundColor: `${formData.accentColor}10` }}>
          <h3 className="text-lg font-semibold mb-2" style={{ color: formData.headerColor }}>
            Admission Details
          </h3>
          <ul className="space-y-1">
            <li>
              <span className="font-semibold">Program: </span>
              {formData.programName}
            </li>
            <li>
              <span className="font-semibold">Department: </span>
              {formData.departmentName}
            </li>
            <li>
              <span className="font-semibold">Degree: </span>
              {formData.degreeType}
            </li>
            <li>
              <span className="font-semibold">Duration: </span>
              {formData.programDuration}
            </li>
            <li>
              <span className="font-semibold">Start Date: </span>
              {formatDateString(formData.programStartDate)}
            </li>
            {formData.scholarshipInfo && (
              <li>
                <span className="font-semibold">Scholarship: </span>
                {formData.scholarshipInfo}
              </li>
            )}
          </ul>
        </div>

        {/* Congratulatory Message */}
        {formData.congratulatoryMessage && (
          <div className="mb-6 font-medium" style={{ color: formData.headerColor }}>
            {formData.congratulatoryMessage}
          </div>
        )}

        {/* Next Steps */}
        {formData.nextStepsInfo && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-2" style={{ color: formData.headerColor }}>
              Next Steps
            </h3>
            <div className="whitespace-pre-line">{formData.nextStepsInfo}</div>
          </div>
        )}

        {/* Signature Area */}
        <div className="mt-12 flex justify-end">
          <div className="text-right">
            <div className="font-handwriting" style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
              {formData.signatoryName}
            </div>
            <p>{formData.signatoryTitle}</p>
            <p>{formData.universityName}</p>
          </div>
        </div>
      </div>
    </PreviewContainer>
  )
}
